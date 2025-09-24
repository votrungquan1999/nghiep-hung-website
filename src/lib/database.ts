import { type Db, MongoClient } from "mongodb";

/**
 * Simple MongoDB database client with singleton pattern
 * Leverages MongoDB's built-in connection pooling
 */

class DatabaseClient {
	private static instance: DatabaseClient;
	private client: MongoClient | null = null;
	private db: Db | null = null;

	private constructor() {}

	/**
	 * Get singleton instance of DatabaseClient
	 */
	public static getInstance(): DatabaseClient {
		if (!DatabaseClient.instance) {
			DatabaseClient.instance = new DatabaseClient();
		}
		return DatabaseClient.instance;
	}

	/**
	 * Build MongoDB connection string with optional username and password
	 * @returns Complete MongoDB connection URI
	 */
	private buildConnectionString(): string {
		const mongoUri = process.env.MONGODB_URI;
		const mongoUsername = process.env.MONGODB_USERNAME;
		const mongoPassword = process.env.MONGODB_PASSWORD;

		if (!mongoUri) {
			throw new Error("MONGODB_URI environment variable is required");
		}

		// If username and password are provided, inject them into the URI
		if (mongoUsername && mongoPassword) {
			// Parse the URI to inject credentials
			const url = new URL(mongoUri);
			url.username = mongoUsername;
			url.password = mongoPassword;
			return url.toString();
		}

		// Return the original URI if no credentials are provided
		return mongoUri;
	}

	/**
	 * Get MongoDB client instance
	 */
	public async getClient(): Promise<MongoClient> {
		if (!this.client) {
			const connectionString = this.buildConnectionString();
			this.client = new MongoClient(connectionString);
			await this.client.connect();
		}

		return this.client;
	}

	/**
	 * Get database instance
	 */
	public async getDatabase(): Promise<Db> {
		if (!this.db) {
			const client = await this.getClient();
			const dbName = process.env.MONGODB_DBNAME || "nghiep-hung-website";
			this.db = client.db(dbName);
		}

		return this.db;
	}

	/**
	 * Close database connection
	 */
	public async close(): Promise<void> {
		if (this.client) {
			await this.client.close();
			this.client = null;
			this.db = null;
		}
	}
}

// Export singleton instance
const databaseClient = DatabaseClient.getInstance();

/**
 * Get MongoDB database instance
 * Uses singleton pattern to ensure single connection
 */
export async function getDatabase(): Promise<Db> {
	return await databaseClient.getDatabase();
}

/**
 * Get MongoDB client instance
 */
export async function getClient(): Promise<MongoClient> {
	return await databaseClient.getClient();
}

/**
 * Close database connection
 */
export async function closeDatabase(): Promise<void> {
	await databaseClient.close();
}
