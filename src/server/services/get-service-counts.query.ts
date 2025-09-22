/**
 * Query to get service counts by status
 */

import { getDatabase } from "src/lib/database";
import type { ServiceDocument, ServiceStatus } from "./service.type";

/**
 * Get service count by status
 * @returns Promise that resolves to an object with service counts by status
 */
export async function getServiceCounts(): Promise<Record<ServiceStatus, number>> {
	try {
		const db = await getDatabase();
		const pipeline = [
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
				},
			},
		];

		const results = await db.collection<ServiceDocument>("services").aggregate(pipeline).toArray();

		const counts: Record<ServiceStatus, number> = {
			active: 0,
			draft: 0,
			archived: 0,
		};

		results.forEach((result) => {
			if (result._id in counts) {
				counts[result._id as ServiceStatus] = result.count;
			}
		});

		return counts;
	} catch (error) {
		console.error("Error fetching service counts:", error);
		throw new Error("Failed to fetch service counts");
	}
}
