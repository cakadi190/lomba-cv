import { PrismaClient } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
const prisma = new PrismaClient();

const awardData = [
  {
    event: "Maroon Day - Universitas Teknologi Digital Indonesia (d/h STMIK AKAKOM Yogyakarta)",
    award: "Web Design Competition - 3rd Place (National)",
    icon: "fa6-solid:trophy",
    year: 2024,
    rank: 3,
    date: new Date("2024-05-25"),
  },
  {
    event: "NIFC - Universitas Muhammadiyah Riau",
    award: "Web Design Competition - 5th Place (National)",
    icon: "fa6-solid:trophy",
    year: 2024,
    rank: 5,
    date: new Date("2024-05-22"),
  },
  {
    event: "Fostifest - Universitas Muhammadiyah Surakarta",
    award: "Web Design Competition - 3rd Place (National)",
    icon: "fa6-solid:trophy",
    year: 2023,
    rank: 3,
    date: new Date("2023-10-29"),
  },
  {
    event: "BSDMP Kominfo Surabaya",
    award: "Junior Web Developer Certification - Graduated (National)",
    icon: "mdi:certificate",
    year: 2023,
    rank: null,
    date: null,
  },
  {
    event: "ByTesFest - Universitas Sebelas Maret",
    award: "Web Design Competition - 4th Place (National)",
    icon: "fa6-solid:trophy",
    year: 2022,
    rank: 4,
    date: null,
  },
  {
    event: "IntechFest - Politeknik Negeri Bali",
    award: "Web Design Competition - 1st Place (National)",
    icon: "fa6-solid:trophy",
    year: 2021,
    rank: 1,
    date: new Date("2021-10-03"),
  },
  {
    event: "Deptics - Universitas PGRI Madiun",
    award: "Web Design Competition - 1st Place (National)",
    icon: "fa6-solid:trophy",
    year: 2021,
    rank: 1,
    date: new Date("2020-03-20"),
  },
  {
    event: "ByTesFest - Universitas Sebelas Maret",
    award: "Web Design Competition - 1st Place (National)",
    icon: "fa6-solid:trophy",
    year: 2020,
    rank: 1,
    date: null,
  },
  {
    event: "LDP 2020 - OSIS SMA Negeri 1 Ponorogo",
    award: "Lomba Desain Poster 2020 - 3rd Place (East Java Regional)",
    icon: "fa6-solid:trophy",
    year: 2020,
    rank: 3,
    date: null,
  },
];

async function seedAwards() {
  truncateTable('awards');

  for (const award of awardData) {
    await prisma.awards.create({
      data: award,
    });
  }
}

export default seedAwards;
