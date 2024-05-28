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
  {
    name: "SUPEDES (Surat Pengantar Desa)",
    slug: "supedes",
    image: "/images/portofolio/supedes-data.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    desc: "Website untuk mengelola pengajuan surat pengantar desa secara daring dengan Laravel 8 dan Bootstrap basic template.",
  },
  {
    name: "Landing Sirus",
    slug: "sirus",
    image: "/images/portofolio/sirus-front.png",
    techstack: [...nuxt, 'devicon:bootstrap'],
    desc: "Website halaman landing page untuk perlombaan IntechFest 2021 di Politeknik Negeri Bali dan mendapatkan peringkat 🏆 #1 (pertama) dalam perlombaan tersebut.",
  },
  {
    name: "SIDEKA (Sistem Informasi Dewan Kerja)",
    slug: "sideka",
    image: "/images/portofolio/sideka-front.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    desc: "Sistem Informasi untuk mengelola dan memonitor seluruh aktifitas kegiatan di Dewan Kerja seluruh Jawa Timur.",
  },
  {
    name: 'Deptics 2021 Project',
    slug: 'deptics-project',
    image: '/images/portofolio/kawal-covid-main.png',
    techstack: [...jqueryBootstrap, ...htmlCssJS],
    desc: 'Website perlombaan desain web dengan tema pandemi COVID-19 pada perlombaan Deptics UNIPMA Madiun dan mendapatkan peringkat 1 dalam lomba tersebut.',
  },
  {
    name: 'Append Disperindag',
    slug: 'append-disperindag',
    image: '/images/portofolio/append-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    desc: 'Website untuk manajemen data pemerataan bantuan dari pemerintah untuk para pelaku UMKM di Provinsi Papua.',
  },
  {
    name: 'Sistem Pemilihan Ketua OSIS',
    slug: 'pilketos-smp',
    image: '/images/portofolio/pilketos-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    desc: 'Website untuk manajemen menjalankan kegiatan pemilihan OSIS pada suatu sekolah menengah pertama secara daring.',
  },
  {
    name: 'BytesFest 2021 Project',
    slug: 'bytesfest-project',
    image: '/images/portofolio/bytesfest-front.png',
    techstack: [...jqueryBootstrap, ...htmlCssJS],
    desc: 'Website perlombaan desain web dalam bentuk toko online pada perlombaan BytesFest UNS 2021 dan mendapatkan peringkat 1 dalam lomba tersebut.',
  },
  {
    name: 'PMB Eltibiz',
    slug: 'ppdb-mahasiswa',
    image: '/images/portofolio/ppdb-login.png',
    techstack: laravelFullstackNonSPABootstrap,
    desc: 'Sistem Website untuk mengelola Penerimaan Mahasiswa Baru, dan ini adalah proyek kolaborasi dengan tugas akhir seorang mahasiswa.',
  },
  {
    name: 'SiTiket',
    slug: 'ticket-hypenamic',
    image: '/images/portofolio/ticket-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    desc: 'Sistem Website untuk menjual dan mengelola data penjualan tiket sebuah event seperti konser musik, acara amal dan lainnya.',
  },
];

async function seedPortofolio() {
  truncateTable('portfolios');

  for (const item of myPortofolio) {
    await prisma.portfolios.create({
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
