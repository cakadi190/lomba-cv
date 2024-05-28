import { PrismaClient } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
const prisma = new PrismaClient();

const careerData = [
  {
    position: "Magang Fullstack Web Developer",
    company: "PT Humma Teknologi Indonesia",
    location: "Karangploso, Kab. Malang, Jawa Timur",
    startDate: new Date("2023-02-01"),
    endDate: null,
  },
  {
    position: "Chief Technology Officer & Co-Founder",
    company: "PT Buat Usaha Digital Indonesia",
    location: "Slawi, Kab. Tegal, Jawa Tengah",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-12-01"),
  },
  {
    position: "Junior Fullstack Web Developer",
    company: "Asean Fintech Group Ltd.",
    location: "Semarang Tengah, Kota Semarang, Jawa Tengah",
    startDate: new Date("2021-11-01"),
    endDate: new Date("2022-02-01"),
  },
  {
    position: "Pemilik Bisnis",
    company: "Ahsana Digital Intermedia (Dulu Dikenal Sebagai Dasa Kreativa Studio)",
    location: "Taman, Kota Madiun, Jawa Timur",
    startDate: new Date("2021-02-01"),
    endDate: null,
  },
  {
    position: "Frontend Web Developer",
    company: "CV Dokternet Indonesia",
    location: "Waru, Sidoarjo, Jawa Timur",
    startDate: new Date("2021-10-01"),
    endDate: new Date("2021-11-01"),
  },
  {
    position: "Desainer Grafis",
    company: "Artografi Indonesia",
    location: "Bayemtaman, Magetan, Jawa Timur",
    startDate: new Date("2020-11-01"),
    endDate: new Date("2021-01-01"),
  },
];

async function seedCareers() {
  truncateTable('careers');

  for (const career of careerData) {
    await prisma.careers.create({
      data: career,
    });
  }
}

export default seedCareers;