import { randomUUID } from "node:crypto";
import { type Db, MongoClient } from "mongodb";
import type { ProjectDocument } from "src/server/projects/project.type";

const TEST_DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const TEST_DB_PREFIX = "nghiep-hung-test";

/**
 * Isolated test database instance
 * Each test file should create its own instance for parallel execution safety
 */
export class TestDatabase {
	private client: MongoClient | null = null;
	private db: Db | null = null;
	private readonly dbName: string;

	/**
	 * Create a new isolated test database
	 * @param testId - Optional identifier for the database (defaults to random UUID)
	 */
	constructor(testId?: string) {
		this.dbName = `${TEST_DB_PREFIX}-${testId || randomUUID()}`;
	}

	/**
	 * Connect to the isolated test database
	 */
	async connect(): Promise<Db> {
		if (!this.client) {
			this.client = new MongoClient(TEST_DB_URI);
			await this.client.connect();
		}
		if (!this.db) {
			this.db = this.client.db(this.dbName);
		}
		return this.db;
	}

	/**
	 * Get database instance (must call connect first)
	 */
	getDb(): Db {
		if (!this.db) {
			throw new Error("Database not connected. Call connect() first.");
		}
		return this.db;
	}

	/**
	 * Get the database name
	 */
	getDatabaseName(): string {
		return this.dbName;
	}

	/**
	 * Seed projects collection with test data
	 */
	async seedProjects(projects: ProjectDocument[]): Promise<void> {
		const database = await this.connect();
		const collection = database.collection<ProjectDocument>("projects");

		if (projects.length > 0) {
			await collection.insertMany(projects);
		}
	}

	/**
	 * Clear all data from all collections
	 */
	async clear(): Promise<void> {
		const database = await this.connect();
		const collections = await database.listCollections().toArray();

		for (const collection of collections) {
			await database.collection(collection.name).deleteMany({});
		}
	}

	/**
	 * Drop the entire test database and close connection
	 * Call this in afterAll to clean up
	 */
	async destroy(): Promise<void> {
		if (this.db) {
			await this.db.dropDatabase();
		}
		if (this.client) {
			await this.client.close();
			this.client = null;
			this.db = null;
		}
	}
}

/**
 * Create an isolated test database instance
 * @param testId - Optional identifier (e.g., test file name)
 * @returns TestDatabase instance
 */
export function createTestDatabase(testId?: string): TestDatabase {
	return new TestDatabase(testId);
}
