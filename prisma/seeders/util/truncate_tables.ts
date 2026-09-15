import { db } from "../../db.js";

export type CollectionName =
  | "users"
  | "educations"
  | "organizations"
  | "careers"
  | "portfolio_categories"
  | "awards"
  | "portfolios"
  | "coffee_places"
  | "posts"
  | "post_categories";

export const truncateTable = async (
  collectionName: CollectionName,
): Promise<void> => {
  const runtime = await db.runtime();
  const plan = db.query.from(collectionName).deleteAll();
  await runtime.query(plan);
};