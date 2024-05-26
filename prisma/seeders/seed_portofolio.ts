import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { htmlCssJS, jqueryBootstrap, kotlinJava, laravelFullstackNonSPABootstrap, nuxt } from '../../components/techstack.ts';
import { truncateTable } from './util/truncate_tables.ts';

const myPortofolio = [
  {
    name: "SIPDATA Pemuda Boyolali",
    slug: "sipdata-pemuda-boyolali",
    image: "/images/portofolio/sipdata-front.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    desc: "Sistem Informasi database Pemuda MTA Cabang Boyolali untuk memonitor segala aktifitas kajian hingga manajemen dari Perwakilan hingga ke Cabang.",
  },
  {
    name: "Personal Website Cak Adi",
    slug: "cakadi-web",
    image: "/images/portofolio/cakadi-home.png",
    techstack: [...jqueryBootstrap, ...nuxt],
    desc: "Website pribadi Cak Adi menampilkan portofolio, blog, dan kontak, dirancang untuk memperkenalkan keterampilan dan proyek terbaru Cak Adi secara profesional dan informatif.",
  },
  {
    name: "Siperpus PHP Native",
    slug: "siperpus",
    image: "/images/portofolio/siperpus-front.png",
    techstack: ["devicon:php", ...jqueryBootstrap, ...htmlCssJS],
    desc: "Sistem perpustakaan berbasis PHP Native untuk mengelola data buku, anggota, peminjaman, dan pengembalian dengan antarmuka sederhana yang memudahkan administrasi perpustakaan.",
  },
  {
    name: "Sistem Sewa Laptop",
    slug: "sisfo-sewa-laptop",
    image: "/images/portofolio/sewa-laptop-front.png",
    techstack: [...jqueryBootstrap, "devicon:php"],
    desc: "Aplikasi manajemen penyewaan laptop berbasis web yang memudahkan proses booking, pengelolaan inventaris, dan pelacakan pengembalian.",
  },
  {
    name: "Perkopian Duniawi",
    slug: "perkopian-duniawi",
    image: "/images/portofolio/perkopian-duniawi-show.png",
    techstack: [...kotlinJava, "devicon:android"],
    desc: "Aplikasi mobile untuk para pecinta kopi, menyediakan informasi kafe terdekat, ulasan, dan rekomendasi menu kopi terbaik.",
  },
  {
    name: "Sistem Data Organisasi",
    slug: "sistem-data-organisasi",
    image: "/images/portofolio/sidasi-back.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    desc: "Platform manajemen data organisasi berbasis Laravel untuk mengelola anggota, kegiatan, dan dokumentasi dengan antarmuka intuitif.",
  },
];

async function seedPortofolio() {
  truncateTable('portfolio');

  for (const item of myPortofolio) {
    await prisma.portfolio.create({
      data: {
        name: item.name,
        slug: item.slug,
        image: item.image,
        techstack: JSON.stringify(item.techstack),
        desc: item.desc,
      },
    });
  }
}

export default seedPortofolio;
