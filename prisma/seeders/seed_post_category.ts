import { db } from "../db.js";

const postData = async () => {
  const posts = await db.orm.posts.select("_id").all();
  return posts.map((post) => post._id);
};

const postCategoryData = async () => {
  const categories = await db.orm.post_categories.select("_id").all();
  return categories.map((category) => category._id);
};

// Same pattern as seed_portofolio_category.ts — categories are referenced by
// `categoryIds: ObjectId[]` directly on the Post document, so this seeder
// pushes the relevant category id into each target post's `categoryIds`.
async function seedPostCategoryLinks() {
  const ids = await postData();
  const categories = await postCategoryData();

  const postCategoryLinks = [
    { postId: ids[0], categoryId: categories[0] },
    { postId: ids[1], categoryId: categories[1] },
    { postId: ids[2], categoryId: categories[2] },
  ];

  for (const link of postCategoryLinks) {
    if (!link.postId || !link.categoryId) continue;
    await db.orm.posts
      .where({ _id: link.postId })
      .update((p) => [p.categoryIds.push(link.categoryId)]);
  }
}

export default seedPostCategoryLinks;
