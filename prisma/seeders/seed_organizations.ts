import { PrismaClient } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
const prisma = new PrismaClient();

const organizationData = [
  {
    orgName: "UKM PALS",
    desc: "Wakil Ketua 2",
    period: "2024 - Sekarang",
  },
  {
    orgName: "UKM PALS",
    desc: "Divisi Kominfo",
    period: "2023 - 2024",
  },
  {
    orgName: "Dewan Kerja Daerah Jawa Timur",
    desc: "Panitia Sangga Kerja Divisi Humas dan Publikasi",
    period: "2022 - 2023",
  },
  {
    orgName: "Humas Dewan Kerja Nasional",
    desc: "Divisi Website",
    period: "2022 - 2023",
  },
  {
    orgName: "Winscout SMASA Ngawi",
    desc: "Bidang Bimbingan Dan Pengembangan (HUMAS dan Publikasi)",
    period: "2021 - 2022",
  },
  {
    orgName: "Artesis SMASA NGAWI",
    desc: "Bidang Humas dan Teknologi Informasi dan Publikasi",
    period: "2021 - 2022",
  },
  {
    orgName: "Dewan Penggalang SMP Negeri 1 Padas",
    desc: "Divisi Perlengkapan dan Persiapan Kegiatan",
    period: "2016 - 2017",
  },
];

async function seedOrganizations() {
  truncateTable('educations');
  
  for (const organization of organizationData) {
    await prisma.organizations.create({
      data: organization,
    });
  }
}

export default seedOrganizations;