import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { htmlCssJS, jqueryBootstrap, kotlinJava, laravelFullstackNonSPABootstrap, nuxt } from '../../components/techstack.ts';
import { truncateTable } from './util/truncate_tables.ts';

interface PortfolioItem {
  name: string;
  slug: string;
  image: string;
  techstack: string[];
  shortDesc: string;
  desc: string | null;
};

const myPortofolio: PortfolioItem[] = [
  {
    name: 'SiTiket',
    slug: 'ticket-hypenamic',
    image: '/images/portofolio/ticket-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Aplikasi pemesanan tiket konser yang mana memudahkan orang untuk membeli dan memesan tiket ke konser favoritnya.",
    desc: `<p>SiTiket adalah aplikasi pemesanan tiket yang dirancang untuk memberikan kemudahan dalam memesan tiket secara online. Aplikasi ini dilengkapi dengan berbagai fitur seperti pencarian tiket, pemilihan kursi, dan pembayaran online yang aman.</p>
           <p>Dengan teknologi Laravel sebagai backend dan Bootstrap untuk tampilan frontend, SiTiket menawarkan pengalaman pengguna yang responsif dan mudah digunakan. Pengguna dapat dengan mudah menemukan dan memesan tiket untuk berbagai acara dengan beberapa klik saja.</p>
           <p>Proyek ini bertujuan untuk memudahkan proses pemesanan tiket bagi pengguna serta membantu penyelenggara acara dalam mengelola penjualan tiket secara efisien dan terorganisir.</p>`,
  },
  {
    name: 'Landing Page Toko Online - BytesFest 2021 Project',
    slug: 'bytesfest-project',
    image: '/images/portofolio/bytesfest-front.png',
    techstack: [...jqueryBootstrap, ...htmlCssJS],
    shortDesc: "Landing page untuk toko online dalam event BytesFest 2021 yang mana meraih peringkat 3 dalam ajang tersebut.",
    desc: `<p>Landing Page Toko Online ini dikembangkan sebagai bagian dari proyek BytesFest 2021. Halaman ini dirancang untuk menampilkan produk-produk unggulan toko online dan menarik perhatian pengunjung dengan desain yang menarik dan interaktif.</p>
           <p>Menggunakan teknologi jQuery, Bootstrap, HTML, CSS, dan JavaScript, halaman ini menawarkan pengalaman browsing yang mulus dan responsif di berbagai perangkat. Desain yang modern dan fungsional memastikan produk ditampilkan dengan cara yang menarik dan mudah diakses.</p>
           <p>Proyek ini berfokus pada meningkatkan visibilitas dan daya tarik toko online, serta meningkatkan konversi pengunjung menjadi pembeli melalui tampilan yang profesional dan user-friendly.</p>`,
  },
  {
    name: 'Landing Page KawalCovid - Deptics 2021 Project',
    slug: 'deptics-project',
    image: '/images/portofolio/kawal-covid-main.png',
    techstack: [...jqueryBootstrap, ...htmlCssJS],
    shortDesc: "Landing page untuk kampanye kawal Covid-19.",
    desc: `<p>Landing Page KawalCovid dibuat sebagai bagian dari kampanye untuk meningkatkan kesadaran masyarakat tentang pentingnya protokol kesehatan selama pandemi Covid-19. Halaman ini menyediakan informasi terbaru mengenai perkembangan kasus, tips kesehatan, dan panduan pencegahan.</p>
           <p>Dikembangkan dengan jQuery, Bootstrap, HTML, CSS, dan JavaScript, halaman ini menampilkan informasi dengan cara yang jelas dan mudah dipahami. Pengguna dapat dengan cepat menemukan informasi yang mereka butuhkan mengenai Covid-19.</p>
           <p>Proyek ini bertujuan untuk mendukung upaya pemerintah dan organisasi kesehatan dalam memerangi Covid-19 dengan menyediakan sumber informasi yang dapat diandalkan dan mudah diakses oleh masyarakat luas.</p>`,
  },
  {
    name: "Landing Sirus",
    slug: "sirus",
    image: "/images/portofolio/sirus-front.png",
    techstack: [...nuxt, 'devicon:bootstrap'],
    shortDesc: "Landing page untuk platform Sirus.",
    desc: `<p>Landing Sirus adalah halaman utama untuk platform Sirus, yang dirancang untuk memberikan informasi mendetail tentang layanan dan fitur yang ditawarkan. Halaman ini bertujuan untuk menarik calon pengguna dan investor dengan desain yang profesional dan informatif.</p>
           <p>Dikembangkan menggunakan Nuxt dan Bootstrap, halaman ini memastikan performa yang cepat dan responsif, serta tampilan yang menarik di berbagai perangkat. Fitur interaktif dan navigasi yang mudah membantu pengunjung menemukan informasi yang mereka butuhkan dengan cepat.</p>
           <p>Proyek ini difokuskan pada peningkatan kesadaran merek dan pengenalan produk, serta mendorong konversi pengunjung menjadi pengguna atau investor melalui desain yang efektif dan konten yang informatif.</p>`,
  },
  {
    name: 'PMB Eltibiz',
    slug: 'ppdb-mahasiswa',
    image: '/images/portofolio/ppdb-login.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Sistem penerimaan mahasiswa baru untuk Eltibiz.",
    desc: `<p>PMB Eltibiz adalah sistem penerimaan mahasiswa baru yang dirancang untuk mempermudah proses pendaftaran dan seleksi. Sistem ini menawarkan fitur-fitur seperti pendaftaran online, upload dokumen, dan verifikasi data secara digital.</p>
           <p>Dibangun dengan Laravel dan Bootstrap, sistem ini memastikan proses yang efisien dan user-friendly bagi calon mahasiswa dan panitia penerimaan. Pengguna dapat dengan mudah mengikuti setiap tahap pendaftaran melalui antarmuka yang intuitif.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dan transparansi dalam proses penerimaan mahasiswa baru, serta menyediakan pengalaman yang lebih baik bagi calon mahasiswa dalam menjalani proses pendaftaran.</p>`,
  },
  {
    name: "Siperpus PHP Native",
    slug: "siperpus",
    image: "/images/portofolio/siperpus-front.png",
    techstack: ["devicon:php", ...jqueryBootstrap, ...htmlCssJS],
    shortDesc: "Sistem informasi perpustakaan berbasis PHP native.",
    desc: `<p>Siperpus adalah sistem informasi perpustakaan yang dikembangkan menggunakan PHP native. Sistem ini menyediakan fitur-fitur seperti pencarian buku, manajemen anggota, peminjaman dan pengembalian buku, serta laporan statistik perpustakaan.</p>
           <p>Dikembangkan dengan jQuery, Bootstrap, HTML, CSS, dan PHP, Siperpus menawarkan antarmuka yang sederhana dan mudah digunakan. Fitur pencarian yang canggih memudahkan pengguna dalam menemukan buku yang mereka cari, sementara sistem manajemen membantu pustakawan dalam mengelola koleksi buku.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi operasional perpustakaan dan memberikan kemudahan akses informasi bagi anggota perpustakaan, sehingga mendukung kegiatan literasi dan edukasi.</p>`,
  },
  {
    name: "Sistem Sewa Laptop",
    slug: "sisfo-sewa-laptop",
    image: "/images/portofolio/sewa-laptop-front.png",
    techstack: [...jqueryBootstrap, "devicon:php"],
    shortDesc: "Aplikasi untuk manajemen penyewaan laptop.",
    desc: `<p>Sistem Sewa Laptop adalah aplikasi yang dirancang untuk memudahkan manajemen penyewaan laptop. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran penyewa, pengelolaan jadwal penyewaan, dan pelaporan kondisi laptop.</p>
           <p>Dikembangkan menggunakan jQuery, Bootstrap, dan PHP, aplikasi ini menawarkan antarmuka yang user-friendly dan responsif. Pengguna dapat dengan mudah mengelola proses penyewaan, mulai dari pemesanan hingga pengembalian laptop.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dalam manajemen penyewaan laptop, mengurangi risiko kehilangan atau kerusakan, serta memberikan pengalaman yang lebih baik bagi penyewa dan pengelola.</p>`,
  },
  {
    name: "Perkopian Duniawi",
    slug: "perkopian-duniawi",
    image: "/images/portofolio/perkopian-duniawi-show.png",
    techstack: [...kotlinJava, "devicon:android"],
    shortDesc: "Aplikasi mobile untuk komunitas pecinta kopi.",
    desc: `<p>Perkopian Duniawi adalah aplikasi mobile yang dirancang khusus untuk komunitas pecinta kopi. Aplikasi ini menyediakan fitur-fitur seperti pencarian kedai kopi, ulasan pengguna, dan forum diskusi antar pecinta kopi.</p>
           <p>Dibangun dengan Kotlin dan Java untuk platform Android, aplikasi ini menawarkan pengalaman pengguna yang lancar dan interaktif. Pengguna dapat dengan mudah menemukan kedai kopi terbaik di sekitar mereka dan berbagi pengalaman dengan komunitas lainnya.</p>
           <p>Proyek ini bertujuan untuk menghubungkan para pecinta kopi dalam satu platform, memberikan informasi yang bermanfaat, serta memperkaya pengalaman mereka dalam menjelajahi dunia kopi.</p>`,
  },
  {
    name: "Sistem Data Organisasi",
    slug: "sistem-data-organisasi",
    image: "/images/portofolio/sidasi-back.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    shortDesc: "Sistem manajemen data organisasi.",
    desc: `<p>Sistem Data Organisasi adalah aplikasi yang dirancang untuk membantu manajemen data dalam suatu organisasi. Aplikasi ini menyediakan fitur-fitur seperti pengelolaan data anggota, jadwal kegiatan, dan dokumentasi acara.</p>
           <p>Dikembangkan dengan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang intuitif dan mudah digunakan. Pengguna dapat dengan mudah mengakses dan mengelola data organisasi secara efisien.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi operasional organisasi dan memastikan data tersimpan dengan aman serta mudah diakses oleh anggota yang berwenang.</p>`,
  },
  {
    name: "SUPEDES (Surat Pengantar Desa)",
    slug: "supedes",
    image: "/images/portofolio/supedes-data.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    shortDesc: "Aplikasi untuk pengelolaan surat pengantar desa.",
    desc: `<p>SUPEDES adalah aplikasi yang dirancang untuk memudahkan pengelolaan surat pengantar di tingkat desa. Aplikasi ini menyediakan fitur-fitur seperti pembuatan surat pengantar, verifikasi, dan arsip surat secara digital.</p>
           <p>Dibangun menggunakan Laravel dan Bootstrap, aplikasi ini memastikan proses yang cepat dan efisien dalam pembuatan dan pengelolaan surat pengantar. Antarmuka yang user-friendly memudahkan perangkat desa dalam menjalankan tugas administrasi.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi administrasi di tingkat desa, mengurangi penggunaan kertas, dan menyediakan arsip digital yang mudah diakses dan aman.</p>`,
  },
  {
    name: 'Append Disperindag',
    slug: 'append-disperindag',
    image: '/images/portofolio/append-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Aplikasi untuk pengelolaan data industri dan perdagangan.",
    desc: `<p>Append Disperindag adalah aplikasi yang dirancang untuk membantu Dinas Perindustrian dan Perdagangan dalam mengelola data industri dan perdagangan. Aplikasi ini menyediakan fitur-fitur seperti pencatatan data usaha, monitoring, dan pelaporan.</p>
           <p>Dikembangkan dengan menggunakan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang mudah digunakan dan fungsional. Pengguna dapat dengan mudah menginput dan mengakses data yang diperlukan untuk analisis dan pengambilan keputusan.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dan akurasi pengelolaan data di Dinas Perindustrian dan Perdagangan, serta memberikan dukungan yang lebih baik untuk sektor industri dan perdagangan di daerah.</p>`,
  },
  {
    name: 'Sistem Pemilihan Ketua OSIS',
    slug: 'pilketos-smp',
    image: '/images/portofolio/pilketos-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Sistem untuk pemilihan ketua OSIS secara online.",
    desc: `<p>Sistem Pemilihan Ketua OSIS adalah aplikasi yang dirancang untuk memfasilitasi pemilihan ketua OSIS secara online. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran calon, kampanye digital, dan pemungutan suara secara elektronik.</p>
           <p>Dibangun dengan Laravel dan Bootstrap, aplikasi ini memastikan proses pemilihan yang transparan dan adil. Pengguna dapat dengan mudah mengikuti seluruh proses pemilihan melalui antarmuka yang user-friendly.</p>
           <p>Proyek ini bertujuan untuk memodernisasi proses pemilihan ketua OSIS, meningkatkan partisipasi siswa, dan memastikan hasil pemilihan yang cepat dan akurat.</p>`,
  },
  {
    name: "SIDEKA (Sistem Informasi Dewan Kerja)",
    slug: "sideka",
    image: "/images/portofolio/sideka-front.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    shortDesc: "Sistem informasi untuk Dewan Kerja.",
    desc: `<p>SIDEKA adalah sistem informasi yang dirancang untuk membantu Dewan Kerja dalam mengelola kegiatan dan anggota. Aplikasi ini menyediakan fitur-fitur seperti manajemen keanggotaan, pengelolaan jadwal kegiatan, dan dokumentasi acara.</p>
           <p>Dikembangkan menggunakan Laravel dan Bootstrap, SIDEKA menawarkan antarmuka yang user-friendly dan mudah diakses. Fitur-fitur yang lengkap membantu Dewan Kerja dalam mengatur kegiatan dengan lebih efektif dan efisien.</p>
           <p>Proyek ini bertujuan untuk mendukung Dewan Kerja dalam menjalankan tugas dan fungsi mereka dengan lebih baik, serta meningkatkan koordinasi dan komunikasi antar anggota.</p>`,
  },
  {
    name: "SIPDATA Pemuda Boyolali",
    slug: "sipdata-pemuda-boyolali",
    image: "/images/portofolio/sipdata-front.png",
    techstack: [...laravelFullstackNonSPABootstrap],
    shortDesc: "Sistem informasi untuk data pemuda di Boyolali.",
    desc: `<p>SIPDATA Pemuda Boyolali adalah aplikasi yang dirancang untuk mengelola data pemuda di Boyolali. Aplikasi ini menyediakan fitur-fitur seperti pencatatan data pribadi, aktivitas, dan prestasi pemuda di wilayah tersebut.</p>
           <p>Dibangun dengan menggunakan Laravel dan Bootstrap, aplikasi ini memastikan pengelolaan data yang efisien dan aman. Pengguna dapat dengan mudah mengakses dan memperbarui data melalui antarmuka yang intuitif.</p>
           <p>Proyek ini bertujuan untuk memberikan dukungan yang lebih baik bagi pengembangan pemuda di Boyolali, serta menyediakan data yang akurat untuk perencanaan program-program pemuda.</p>`,
  },
  {
    name: "Visit Ngawi 2024",
    slug: "visit-ngawi-2024",
    image: "/images/portofolio/visit-ngawi-front.png",
    techstack: [...jqueryBootstrap, "devicon:vercel"],
    shortDesc: "Landing page promosi wisata Ngawi 2024.",
    desc: `<p>Visit Ngawi 2024 adalah landing page yang dirancang untuk mempromosikan destinasi wisata di Ngawi. Halaman ini menampilkan informasi lengkap tentang tempat-tempat wisata, acara, dan aktivitas yang dapat dinikmati pengunjung di Ngawi.</p>
           <p>Dikembangkan menggunakan jQuery, Bootstrap, dan Vercel, halaman ini menawarkan tampilan yang menarik dan responsif. Pengguna dapat dengan mudah menemukan informasi yang mereka butuhkan untuk merencanakan kunjungan mereka ke Ngawi.</p>
           <p>Proyek ini bertujuan untuk meningkatkan daya tarik wisata Ngawi, menarik lebih banyak wisatawan, dan mendukung pertumbuhan ekonomi lokal melalui sektor pariwisata.</p>`,
  },
  {
    name: 'Landing Page Hummatech',
    slug: 'hummatech-landing-page',
    image: '/images/portofolio/hummatech-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Landing page untuk perusahaan teknologi Hummatech.",
    desc: `<p>Landing Page Hummatech adalah halaman utama yang dirancang untuk menampilkan informasi tentang perusahaan teknologi Hummatech. Halaman ini berfungsi sebagai wajah online perusahaan, menampilkan layanan, produk, dan informasi kontak.</p>
           <p>Dibangun dengan Laravel dan Bootstrap, halaman ini memastikan tampilan yang profesional dan responsif. Pengguna dapat dengan mudah menavigasi dan menemukan informasi yang mereka butuhkan tentang Hummatech.</p>
           <p>Proyek ini bertujuan untuk memperkuat kehadiran online Hummatech, meningkatkan visibilitas perusahaan, dan menarik calon pelanggan dan mitra bisnis melalui tampilan yang profesional dan informatif.</p>`,
  },
  {
    name: 'Sisfo PKL Hummatech',
    slug: 'hummatech-pkl',
    image: '/images/portofolio/pkl-hummatech-front.png',
    techstack: laravelFullstackNonSPABootstrap,
    shortDesc: "Sistem informasi untuk pengelolaan PKL di Hummatech.",
    desc: `<p>Sisfo PKL Hummatech adalah aplikasi yang dirancang untuk mempermudah pengelolaan Praktik Kerja Lapangan (PKL) di Hummatech. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran peserta, monitoring, dan pelaporan hasil PKL.</p>
           <p>Dibangun menggunakan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang user-friendly dan efisien. Peserta PKL dan pengelola dapat dengan mudah mengakses dan mengelola informasi terkait PKL melalui aplikasi ini.</p>
           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dalam pengelolaan PKL, memastikan semua data tercatat dengan baik, dan memberikan pengalaman yang lebih baik bagi peserta PKL.</p>`,
  },
  {
    name: "Landing Page Musem Trinil",
    slug: "museum-trinil",
    image: "/images/portofolio/museum-trinil-front.png",
    techstack: [...jqueryBootstrap, ...nuxt, "devicon:vercel"],
    shortDesc: "Landing page untuk Museum Trinil.",
    desc: `<p>Landing Page Museum Trinil adalah halaman utama yang dirancang untuk memberikan informasi lengkap tentang Museum Trinil. Halaman ini menampilkan sejarah museum, koleksi yang dimiliki, dan informasi kunjungan.</p>
           <p>Dikembangkan menggunakan jQuery, Bootstrap, Nuxt, dan Vercel, halaman ini menawarkan tampilan yang menarik dan informatif. Pengguna dapat dengan mudah menavigasi halaman dan menemukan informasi yang mereka butuhkan.</p>
           <p>Proyek ini bertujuan untuk meningkatkan kesadaran dan minat masyarakat terhadap Museum Trinil, serta mempermudah pengunjung dalam merencanakan kunjungan mereka ke museum.</p>`,
  },
  {
    name: "Personal Website Cak Adi",
    slug: "cakadi-web",
    image: "/images/portofolio/cakadi-home.png",
    techstack: [...jqueryBootstrap, ...nuxt, "devicon:supabase", "devicon:vercel"],
    shortDesc: "Situs pribadi untuk Cak Adi.",
    desc: `<p>Personal Website Cak Adi adalah situs pribadi yang dirancang untuk menampilkan informasi tentang Cak Adi, termasuk portofolio, blog, dan kontak. Situs ini berfungsi sebagai platform untuk Cak Adi berbagi pengalaman dan karya-karyanya.</p>
           <p>Dikembangkan dengan jQuery, Bootstrap, Nuxt, Supabase, dan Vercel, situs ini menawarkan tampilan yang modern dan responsif. Pengguna dapat dengan mudah menavigasi melalui berbagai bagian situs untuk mengetahui lebih banyak tentang Cak Adi.</p>
           <p>Proyek ini bertujuan untuk memperkuat kehadiran online Cak Adi, memudahkan orang lain menemukan dan berinteraksi dengan Cak Adi, serta menampilkan karya-karya terbaiknya dalam satu platform.</p>`,
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
        shortDesc: item.shortDesc,
        desc: item.desc,
      },
    });
  }
}

export { myPortofolio };
export default seedPortofolio;
