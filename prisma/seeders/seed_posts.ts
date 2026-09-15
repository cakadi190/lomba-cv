import { db } from "../db.js";
import { truncateTable } from "./util/truncate_tables.js";

interface PostItem {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
}

const myPosts: PostItem[] = [
  {
    title: "Membangun Fullstack App dengan Nuxt dan Prisma",
    slug: "membangun-fullstack-app-dengan-nuxt-dan-prisma",
    excerpt:
      "Cerita dan pengalaman membangun aplikasi fullstack menggunakan Nuxt di sisi frontend dan Prisma sebagai lapisan data.",
    content:
      "<p>Nuxt dan Prisma adalah kombinasi yang sangat produktif untuk membangun aplikasi fullstack modern. Dalam artikel ini saya membahas bagaimana kedua tools ini saling melengkapi.</p>",
    coverImage: null,
    tags: ["Nuxt", "Prisma ORM", "Fullstack Development", "JavaScript"],
    published: true,
  },
  {
    title: "Tips Menulis Kode yang Mudah Dipelihara",
    slug: "tips-menulis-kode-yang-mudah-dipelihara",
    excerpt:
      "Beberapa prinsip sederhana yang saya pakai supaya kode tetap rapi dan mudah dirawat dalam jangka panjang.",
    content:
      "<p>Menulis kode yang mudah dipelihara bukan soal seberapa pintar solusinya, tapi seberapa mudah orang lain (atau diri sendiri di masa depan) memahami dan mengubahnya.</p>",
    coverImage: null,
    tags: ["Clean Code", "Best Practice", "SOLID", "tips & trik"],
    published: true,
  },
  {
    title: "Pengalaman Ikut Kompetisi Pengembangan Web",
    slug: "pengalaman-ikut-kompetisi-pengembangan-web",
    excerpt:
      "Cerita di balik layar mengikuti beberapa kompetisi pengembangan web dan pelajaran yang saya dapat.",
    content:
      "<p>Mengikuti kompetisi pengembangan web mengajarkan saya banyak hal, mulai dari manajemen waktu hingga cara mempresentasikan produk dengan baik.</p>",
    coverImage: null,
    tags: ["Kompetisi Web", "Pengalaman Pribadi", "Hackathon 2024", "cerita"],
    published: true,
  },
];

async function seedPosts() {
  await truncateTable("posts");

  for (const item of myPosts) {
    const now = new Date();
    await db.orm.posts.create({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      coverImage: item.coverImage ?? null,
      tags: item.tags,
      published: item.published,
      publishedAt: item.published ? now : null,
      categoryIds: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }
}

export { myPosts };
export default seedPosts;
