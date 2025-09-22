import { type Db, MongoClient } from "mongodb"

/**
 * Simple MongoDB database client with singleton pattern
 * Leverages MongoDB's built-in connection pooling
 */

class DatabaseClient {
	private static instance: DatabaseClient
	private client: MongoClient | null = null
	private db: Db | null = null

	private constructor() {}

	/**
	 * Get singleton instance of DatabaseClient
	 */
	public static getInstance(): DatabaseClient {
		if (!DatabaseClient.instance) {
			DatabaseClient.instance = new DatabaseClient()
		}
		return DatabaseClient.instance
	}

	/**
	 * Get MongoDB client instance
	 */
	public async getClient(): Promise<MongoClient> {
		if (!this.client) {
			const mongoUrl = process.env.MONGODB_URI
			if (!mongoUrl) {
				throw new Error("MONGODB_URI environment variable is required")
			}

			this.client = new MongoClient(mongoUrl)
			await this.client.connect()
		}

		return this.client
	}

	/**
	 * Get database instance
	 */
	public async getDatabase(): Promise<Db> {
		if (!this.db) {
			const client = await this.getClient()
			const dbName = process.env.MONGODB_DB_NAME || "nghiep-hung-website"
			this.db = client.db(dbName)
		}

		return this.db
	}

	/**
	 * Close database connection
	 */
	public async close(): Promise<void> {
		if (this.client) {
			await this.client.close()
			this.client = null
			this.db = null
		}
	}
}

// Export singleton instance
const databaseClient = DatabaseClient.getInstance()

/**
 * Get MongoDB database instance
 * Uses singleton pattern to ensure single connection
 */
export async function getDatabase(): Promise<Db> {
	return await databaseClient.getDatabase()
}

/**
 * Get MongoDB client instance
 */
export async function getClient(): Promise<MongoClient> {
	return await databaseClient.getClient()
}

/**
 * Close database connection
 */
export async function closeDatabase(): Promise<void> {
	await databaseClient.close()
}
