import { db } from "../../db.js";

// Mongo collection names, matching the `db.orm.<collection>` keys emitted
// from contract.prisma's `@@map(...)` storage names.
export type CollectionName =
  | "users"
  | "educations"
  | "organizations"
  | "careers"
  | "portfolio_categories"
  | "awards"
  | "portfolios"
  | "coffee_places";

/**
 * Deletes every document in the given Mongo collection.
 *
 * Mongo has no foreign-key constraints to disable/enable around this (unlike
 * the old Postgres truncate helper), so this is a straight bulk delete.
 *
 * @since 1.0.1
 * @async
 * @function
 * @param {CollectionName} collectionName - The collection to clear.
 */
export const truncateTable = async (
  collectionName: CollectionName,
): Promise<void> => {
  // `db.orm.<collection>.deleteAll()` is the ORM's unqualified-write escape
  // hatch (no preceding `.where(...)` needed) for clearing every document in
  // the collection.
  await db.orm[collectionName].deleteAll();
};
