import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { htmlCssJS, jqueryBootstrap, kotlinJava, laravelFullstackNonSPABootstrap, nuxt, php } from '../../components/techstack.ts';
import { truncateTable } from './util/truncate_tables.ts';

interface PortfolioItem {
  name: string;
  slug: string;
  image: string;
  techstack: string[];
  shortDesc: string;
  desc?: string | null;
  demoLink?: string | null;
  sourceCode?: string | null;
  private?: boolean;
};

const myPortofolio: PortfolioItem[] = 
[
  {
    "name": "SiTiket",
    "slug": "ticket-hypenamic",
    "image": "/images/portofolio/ticket-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Aplikasi ini adalah platform pemesanan tiket konser yang memudahkan pengguna untuk membeli dan memesan tiket ke konser favorit mereka. Dengan antarmuka yang intuitif dan fitur-fitur yang user-friendly, aplikasi ini memastikan proses pemesanan tiket menjadi cepat, mudah, dan aman.",
    "desc": "<p>SiTiket adalah aplikasi pemesanan tiket yang dirancang untuk memberikan kemudahan dalam memesan tiket secara online. Aplikasi ini dilengkapi dengan berbagai fitur seperti pencarian tiket, pemilihan kursi, dan pembayaran online yang aman.</p>\n           <p>Dengan teknologi Laravel sebagai backend dan Bootstrap untuk tampilan frontend, SiTiket menawarkan pengalaman pengguna yang responsif dan mudah digunakan. Pengguna dapat dengan mudah menemukan dan memesan tiket untuk berbagai acara dengan beberapa klik saja.</p>\n           <p>Proyek ini bertujuan untuk memudahkan proses pemesanan tiket bagi pengguna serta membantu penyelenggara acara dalam mengelola penjualan tiket secara efisien dan terorganisir.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Siperpus PHP Native",
    "slug": "siperpus",
    "image": "/images/portofolio/siperpus-front.png",
    "techstack": [...php, ...jqueryBootstrap],
    "shortDesc": "Sistem ini adalah sistem informasi perpustakaan berbasis PHP native yang dirancang untuk mempermudah pengelolaan data buku, anggota perpustakaan, dan peminjaman buku. Dengan sistem ini, administrasi perpustakaan menjadi lebih efisien dan pengguna dapat dengan mudah mencari serta meminjam buku yang mereka inginkan.",
    "desc": "<p>Siperpus adalah sistem informasi perpustakaan yang dikembangkan menggunakan PHP native. Sistem ini menyediakan fitur-fitur seperti pencarian buku, manajemen anggota, peminjaman dan pengembalian buku, serta laporan statistik perpustakaan.</p>\n           <p>Dikembangkan dengan jQuery, Bootstrap, HTML, CSS, dan PHP, Siperpus menawarkan antarmuka yang sederhana dan mudah digunakan. Fitur pencarian yang canggih memudahkan pengguna dalam menemukan buku yang mereka cari, sementara sistem manajemen membantu pustakawan dalam mengelola koleksi buku.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi operasional perpustakaan dan memberikan kemudahan akses informasi bagi anggota perpustakaan, sehingga mendukung kegiatan literasi dan edukasi.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Sistem Sewa Laptop",
    "slug": "sisfo-sewa-laptop",
    "image": "/images/portofolio/sewa-laptop-front.png",
    "techstack": [...jqueryBootstrap, ...php],
    "shortDesc": "Aplikasi manajemen penyewaan laptop dirancang untuk mengelola proses penyewaan, pengembalian, inventaris, perawatan, pembayaran, dan pelaporan secara efisien, memastikan penyewaan laptop berjalan lancar dan transparan bagi pengguna.",
    "desc": "<p>Sistem Sewa Laptop adalah aplikasi yang dirancang untuk memudahkan manajemen penyewaan laptop. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran penyewa, pengelolaan jadwal penyewaan, dan pelaporan kondisi laptop.</p>\n           <p>Dikembangkan menggunakan jQuery, Bootstrap, dan PHP, aplikasi ini menawarkan antarmuka yang user-friendly dan responsif. Pengguna dapat dengan mudah mengelola proses penyewaan, mulai dari pemesanan hingga pengembalian laptop.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dalam manajemen penyewaan laptop, mengurangi risiko kehilangan atau kerusakan, serta memberikan pengalaman yang lebih baik bagi penyewa dan pengelola.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "PMB Eltibiz",
    "slug": "ppdb-mahasiswa",
    "image": "/images/portofolio/ppdb-login.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Ssistem penerimaan mahasiswa baru untuk Eltibiz adalah platform digital yang memfasilitasi pendaftaran, seleksi, dan pengumuman hasil bagi calon mahasiswa. Dengan fitur formulir pendaftaran online, pengelolaan dokumen, ujian seleksi daring, serta integrasi sistem pembayaran, sistem ini dirancang untuk meningkatkan efisiensi dan transparansi dalam proses penerimaan mahasiswa baru Eltibiz.",
    "desc": "<p>PMB Eltibiz adalah sistem penerimaan mahasiswa baru yang dirancang untuk mempermudah proses pendaftaran dan seleksi. Sistem ini menawarkan fitur-fitur seperti pendaftaran online, upload dokumen, dan verifikasi data secara digital.</p>\n           <p>Dibangun dengan Laravel dan Bootstrap, sistem ini memastikan proses yang efisien dan user-friendly bagi calon mahasiswa dan panitia penerimaan. Pengguna dapat dengan mudah mengikuti setiap tahap pendaftaran melalui antarmuka yang intuitif.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dan transparansi dalam proses penerimaan mahasiswa baru, serta menyediakan pengalaman yang lebih baik bagi calon mahasiswa dalam menjalani proses pendaftaran.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Perkopian Duniawi",
    "slug": "perkopian-duniawi",
    "image": "/images/portofolio/perkopian-duniawi-show.png",
    "techstack": kotlinJava,
    "shortDesc": "Aplikasi mobile untuk komunitas pecinta kopi dengan Kotlin adalah platform yang memungkinkan para pengguna untuk berinteraksi, berbagi informasi seputar kopi, mencari tempat kopi terdekat, serta mengikuti event dan aktivitas komunitas. Aplikasi ini dirancang untuk memberikan pengalaman yang menyenangkan dan informatif bagi para pecinta kopi.",
    "desc": "<p>Perkopian Duniawi adalah aplikasi mobile yang dirancang khusus untuk komunitas pecinta kopi. Aplikasi ini menyediakan fitur-fitur seperti pencarian kedai kopi, ulasan pengguna, dan forum diskusi antar pecinta kopi.</p>\n           <p>Dibangun dengan Kotlin dan Java untuk platform Android, aplikasi ini menawarkan pengalaman pengguna yang lancar dan interaktif. Pengguna dapat dengan mudah menemukan kedai kopi terbaik di sekitar mereka dan berbagi pengalaman dengan komunitas lainnya.</p>\n           <p>Proyek ini bertujuan untuk menghubungkan para pecinta kopi dalam satu platform, memberikan informasi yang bermanfaat, serta memperkaya pengalaman mereka dalam menjelajahi dunia kopi.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Sistem Data Organisasi",
    "slug": "sistem-data-organisasi",
    "image": "/images/portofolio/sidasi-back.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Sistem manajemen data organisasi adalah platform yang dirancang untuk mengelola berbagai aspek operasional dan administratif dalam sebuah organisasi. Sistem ini mencakup pengelolaan data anggota organisasi, struktur hierarki, kegiatan, dan dokumentasi penting lainnya. Dengan menggunakan teknologi terkini seperti Laravel untuk backend dan antarmuka pengguna yang responsif, sistem ini memungkinkan organisasi untuk mengoptimalkan efisiensi, transparansi, dan kolaborasi internal.",
    "desc": "<p>Sistem Data Organisasi adalah aplikasi yang dirancang untuk membantu manajemen data dalam suatu organisasi. Aplikasi ini menyediakan fitur-fitur seperti pengelolaan data anggota, jadwal kegiatan, dan dokumentasi acara.</p>\n           <p>Dikembangkan dengan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang intuitif dan mudah digunakan. Pengguna dapat dengan mudah mengakses dan mengelola data organisasi secara efisien.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi operasional organisasi dan memastikan data tersimpan dengan aman serta mudah diakses oleh anggota yang berwenang.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "SUPEDES (Surat Pengantar Desa)",
    "slug": "supedes",
    "image": "/images/portofolio/supedes-data.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Aplikasi untuk pengelolaan surat pengantar desa adalah platform digital yang dikembangkan untuk mempermudah proses pembuatan, pengelolaan, dan pelacakan surat pengantar dari dan untuk penduduk desa. Aplikasi ini menyediakan fitur seperti pembuatan surat secara online, pencatatan riwayat surat, pengiriman elektronik, dan integrasi dengan sistem administrasi desa untuk memastikan proses administrasi berjalan efisien dan transparan.",
    "desc": "<p>SUPEDES adalah aplikasi yang dirancang untuk memudahkan pengelolaan surat pengantar di tingkat desa. Aplikasi ini menyediakan fitur-fitur seperti pembuatan surat pengantar, verifikasi, dan arsip surat secara digital.</p>\n           <p>Dibangun menggunakan Laravel dan Bootstrap, aplikasi ini memastikan proses yang cepat dan efisien dalam pembuatan dan pengelolaan surat pengantar. Antarmuka yang user-friendly memudahkan perangkat desa dalam menjalankan tugas administrasi.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi administrasi di tingkat desa, mengurangi penggunaan kertas, dan menyediakan arsip digital yang mudah diakses dan aman.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "SIPDATA Pemuda Boyolali",
    "slug": "sipdata-pemuda-boyolali",
    "image": "/images/portofolio/sipdata-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Sistem informasi ini dirancang untuk mengelola data Pemuda MTA di Kabupaten Boyolali, mencakup data kepemudaan, guru daerah, dan anggota MTA Boyolali. Dengan sistem ini, pengelolaan informasi menjadi lebih terstruktur dan mudah diakses, sehingga mempermudah koordinasi dan administrasi internal organisasi.",
    "desc": "<p>SIPDATA Pemuda Boyolali adalah aplikasi yang dirancang untuk mengelola data pemuda di Boyolali. Aplikasi ini menyediakan fitur-fitur seperti pencatatan data pribadi, aktivitas, dan prestasi pemuda di wilayah tersebut.</p>\n           <p>Dibangun dengan menggunakan Laravel dan Bootstrap, aplikasi ini memastikan pengelolaan data yang efisien dan aman. Pengguna dapat dengan mudah mengakses dan memperbarui data melalui antarmuka yang intuitif.</p>\n           <p>Proyek ini bertujuan untuk memberikan dukungan yang lebih baik bagi pengembangan pemuda di Boyolali, serta menyediakan data yang akurat untuk perencanaan program-program pemuda.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Append Disperindag",
    "slug": "append-disperindag",
    "image": "/images/portofolio/append-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Aplikasi untuk pengelolaan data industri dan perdagangan adalah platform digital yang dirancang untuk mengintegrasikan dan mengelola informasi terkait industri dan perdagangan secara efisien. Aplikasi ini menyediakan fitur seperti pengumpulan data industri, analisis pasar, pelacakan inventaris, manajemen rantai pasokan, dan pemantauan kinerja bisnis. Dengan menggunakan aplikasi ini, pengguna dapat mengoptimalkan operasi mereka, meningkatkan transparansi, dan mengambil keputusan yang lebih tepat berdasarkan data yang akurat dan terkini.",
    "desc": "<p>Append Disperindag adalah aplikasi yang dirancang untuk membantu Dinas Perindustrian dan Perdagangan dalam mengelola data industri dan perdagangan. Aplikasi ini menyediakan fitur-fitur seperti pencatatan data usaha, monitoring, dan pelaporan.</p>\n           <p>Dikembangkan dengan menggunakan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang mudah digunakan dan fungsional. Pengguna dapat dengan mudah menginput dan mengakses data yang diperlukan untuk analisis dan pengambilan keputusan.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dan akurasi pengelolaan data di Dinas Perindustrian dan Perdagangan, serta memberikan dukungan yang lebih baik untuk sektor industri dan perdagangan di daerah.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Siternak BBIB Singosari",
    "slug": "siternak",
    "image": "/images/portofolio/siternak-home.png",
    "techstack": [...php, ...jqueryBootstrap],
    "shortDesc": "Sistem Informasi Terintegrasi untuk BBIB Singosari yang mana proyek ini juga diinisasi berkat tugas magang di PT Humma Teknologi Indonesia yang mana dikerjakan dengan PHP Native dan juga dengan template Sneat Bootstrap 5.",
    "desc": "<p>Siternak BBIB Singosari adalah sistem informasi terintegrasi yang dirancang khusus untuk Balai Besar Inseminasi Buatan (BBIB) Singosari. Proyek ini bertujuan untuk mempermudah manajemen data terkait inseminasi buatan, termasuk pendataan ternak, jadwal inseminasi, dan pelaporan hasil. Sistem ini dibangun menggunakan teknologi PHP, jQuery, Bootstrap, serta HTML, CSS, dan JavaScript untuk tampilan yang responsif dan user-friendly.</p><p>Sistem ini menyediakan fitur-fitur utama seperti manajemen data ternak, pencatatan riwayat inseminasi, serta pembuatan laporan yang bisa diakses dengan mudah oleh para pengguna. Dengan interface yang intuitif, pengguna dapat mengakses informasi secara cepat dan efisien, sehingga proses pengambilan keputusan dapat dilakukan dengan lebih baik. Selain itu, sistem ini juga dilengkapi dengan modul keamanan yang memastikan data yang disimpan aman dan terlindungi dari akses yang tidak sah.</p><p>Proyek ini juga mencakup pelatihan bagi staf BBIB Singosari untuk memastikan mereka dapat menggunakan sistem ini dengan optimal. Dengan adanya Siternak, diharapkan proses manajemen inseminasi buatan di BBIB Singosari menjadi lebih efisien, terstruktur, dan terintegrasi, mendukung peningkatan produktivitas dan kualitas pelayanan yang diberikan oleh BBIB Singosari.</p><p>Proyek ini juga diinisasi berkat tugas magang di PT Humma Teknologi Indonesia yang mana dikerjakan dengan PHP Native dan juga dengan template Sneat Bootstrap 5.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Personal Website Cak Adi",
    "slug": "cakadi-web",
    "image": "/images/portofolio/cakadi-home.png",
    "techstack": [...nuxt, ...jqueryBootstrap, 'devicon:supabase', 'devicon:vercel'],
    "shortDesc": "Juara 🏆 #3 Maroon Day UTDI 2024. Situs pribadi untuk Cak Adi yang dirancang untuk menampilkan informasi tentang Cak Adi, termasuk portofolio, blog, dan kontak. Situs ini berfungsi sebagai platform untuk Cak Adi berbagi pengalaman dan karya-karyanya.",
    "desc": "<p>Personal Website Cak Adi adalah situs pribadi yang dirancang untuk menampilkan informasi tentang Cak Adi, termasuk portofolio, blog, dan kontak. Situs ini berfungsi sebagai platform untuk Cak Adi berbagi pengalaman dan karya-karyanya.</p>\n           <p>Dikembangkan dengan jQuery, Bootstrap, Nuxt, Supabase, dan Vercel, situs ini menawarkan tampilan yang modern dan responsif. Pengguna dapat dengan mudah menavigasi melalui berbagai bagian situs untuk mengetahui lebih banyak tentang Cak Adi.</p>\n           <p>Proyek ini bertujuan untuk memperkuat kehadiran online Cak Adi, memudahkan orang lain menemukan dan berinteraksi dengan Cak Adi, serta menampilkan karya-karya terbaiknya dalam satu platform.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Sisfo PKL Hummatech",
    "slug": "hummatech-pkl",
    "image": "/images/portofolio/pkl-hummatech-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Sisfo PKL Hummatech adalah aplikasi yang dirancang untuk mempermudah pengelolaan Praktik Kerja Lapangan (PKL) di Hummatech. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran peserta, monitoring, dan pelaporan hasil PKL.",
    "desc": "<p>Sisfo PKL Hummatech adalah aplikasi yang dirancang untuk mempermudah pengelolaan Praktik Kerja Lapangan (PKL) di Hummatech. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran peserta, monitoring, dan pelaporan hasil PKL.</p>\n           <p>Dibangun menggunakan Laravel dan Bootstrap, aplikasi ini menawarkan antarmuka yang user-friendly dan efisien. Peserta PKL dan pengelola dapat dengan mudah mengakses dan mengelola informasi terkait PKL melalui aplikasi ini.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan efisiensi dalam pengelolaan PKL, memastikan semua data tercatat dengan baik, dan memberikan pengalaman yang lebih baik bagi peserta PKL.</p>",
    "demoLink": "https://pkl.hummatech.com",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Sistem Pemilihan Ketua OSIS",
    "slug": "pilketos-smp",
    "image": "/images/portofolio/pilketos-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Sistem ini adalah platform pemilihan ketua OSIS secara online yang dibangun dengan Laravel 8. Website ini memungkinkan siswa untuk memilih calon ketua OSIS dengan mudah dan transparan, serta dilengkapi dengan fitur keamanan untuk memastikan integritas proses pemilihan.",
    "desc": "<p>Sistem Pemilihan Ketua OSIS adalah aplikasi yang dirancang untuk memfasilitasi pemilihan ketua OSIS secara online. Aplikasi ini menyediakan fitur-fitur seperti pendaftaran calon, kampanye digital, dan pemungutan suara secara elektronik.</p>\n           <p>Dibangun dengan Laravel dan Bootstrap, aplikasi ini memastikan proses pemilihan yang transparan dan adil. Pengguna dapat dengan mudah mengikuti seluruh proses pemilihan melalui antarmuka yang user-friendly.</p>\n           <p>Proyek ini bertujuan untuk memodernisasi proses pemilihan ketua OSIS, meningkatkan partisipasi siswa, dan memastikan hasil pemilihan yang cepat dan akurat.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Siperpus Laravel",
    "slug": "siperpus-laravel",
    "image": "/images/portofolio/siperpus-home.png",
    "techstack": [...php, ...jqueryBootstrap],
    "shortDesc": "Sistem Informasi Perpustakaan Berbasis Laravel adalah aplikasi yang dibangun menggunakan framework Laravel untuk mengelola operasional perpustakaan secara efisien. Aplikasi ini mencakup fitur-fitur seperti manajemen data buku, peminjaman, pengembalian, dan manajemen anggota perpustakaan. Dengan antarmuka yang responsif dan fitur keamanan yang terintegrasi, sistem ini membantu meningkatkan produktivitas dan pengalaman pengguna dalam mengakses layanan perpustakaan.",
    "desc": "<p>Siperpus Laravel adalah sistem informasi perpustakaan berbasis web yang dikembangkan menggunakan framework Laravel. Proyek ini dirancang untuk mengelola kegiatan operasional sebuah perpustakaan secara efisien, termasuk manajemen koleksi buku, data anggota, peminjaman dan pengembalian buku, serta pelaporan aktivitas perpustakaan.</p><p>Proyek ini menggunakan teknologi Laravel sebagai basis utama untuk backend yang kuat dan efisien. Untuk tampilan frontend, digunakan kombinasi HTML, CSS, dan JavaScript dengan bantuan Bootstrap untuk memastikan antarmuka yang responsif dan mudah digunakan. Siperpus Laravel menyediakan berbagai fitur seperti pencarian buku, manajemen anggota, integrasi dengan sistem peminjaman dan pengembalian buku, serta dashboard admin untuk melihat statistik dan laporan.</p><p>Dengan fokus pada keamanan data dan performa, Siperpus Laravel juga dilengkapi dengan mekanisme otentikasi yang kuat dan manajemen izin pengguna. Hal ini memastikan bahwa akses ke informasi sensitif seperti data anggota dan transaksi perpustakaan hanya dapat dilakukan oleh pihak yang berwenang.</p>",
    "demoLink": "https://siperpus.cakadi.id",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Humma E-Sport",
    "slug": "humma-e-sport",
    "image": "/images/portofolio/humma-esport-home.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Proyek Humma E-Sport adalah platform e-sport yang dirancang khusus untuk menyediakan tempat dan menyelenggarakan berbagai ajang kompetisi e-sport. Platform ini dibangun menggunakan teknologi Laravel untuk backend yang kuat dan Bootstrap untuk antarmuka yang responsif dan menarik.",
    "desc": "<p>Proyek Humma E-Sport merupakan platform inovatif yang dirancang untuk komunitas e-sport. Menggunakan teknologi Laravel sebagai back-end dan Bootstrap untuk front-end, platform ini menawarkan pengalaman pengguna yang responsif dan dinamis. Platform ini dirancang untuk memenuhi kebutuhan berbagai pengguna, mulai dari pemain hingga penonton, dengan fitur-fitur canggih seperti streaming langsung, statistik permainan, dan forum komunitas.</p> \n             <p>Platform ini juga dilengkapi dengan sistem manajemen turnamen yang komprehensif, memungkinkan penyelenggara turnamen untuk mengatur pertandingan, mengelola pendaftaran, dan melacak hasil secara real-time. Selain itu, Humma E-Sport menawarkan profil pengguna yang dapat disesuaikan, memungkinkan pemain untuk menunjukkan prestasi mereka dan berinteraksi dengan komunitas. Dengan menggunakan teknologi terkini, platform ini memastikan kinerja yang optimal dan keamanan data yang tinggi.</p> \n             <p>Selain fitur utama tersebut, Humma E-Sport juga mengintegrasikan berbagai alat analitik untuk membantu pemain dan tim dalam menganalisis kinerja mereka. Alat ini menyediakan wawasan mendalam yang dapat digunakan untuk meningkatkan strategi permainan. Dengan desain yang intuitif dan fungsionalitas yang kuat, Humma E-Sport berupaya menjadi destinasi utama bagi para penggemar e-sport di seluruh dunia.</p>",
    "demoLink": null,
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "SIDEKA (Sistem Informasi Dewan Kerja)",
    "slug": "sideka",
    "image": "/images/portofolio/sideka-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Sistem informasi untuk Dewan Kerja yang berfungsi sebagai alat monitor dan evaluasi Dewan Kerja se-Kwarda Jatim adalah platform digital yang dirancang untuk mengelola dan mengevaluasi kinerja Dewan Kerja di seluruh wilayah Kwarda Jatim. Dengan sistem ini, memungkinkan untuk melakukan monitoring secara efektif terhadap aktivitas dan capaian yang dilakukan oleh Dewan Kerja, serta menyediakan data yang akurat dan terintegrasi untuk keperluan evaluasi dan perbaikan kinerja.",
    "desc": "<p>SIDEKA adalah sistem informasi yang dirancang untuk membantu Dewan Kerja dalam mengelola kegiatan dan anggota. Aplikasi ini menyediakan fitur-fitur seperti manajemen keanggotaan, pengelolaan jadwal kegiatan, dan dokumentasi acara.</p>\n           <p>Dikembangkan menggunakan Laravel dan Bootstrap, SIDEKA menawarkan antarmuka yang user-friendly dan mudah diakses. Fitur-fitur yang lengkap membantu Dewan Kerja dalam mengatur kegiatan dengan lebih efektif dan efisien.</p>\n           <p>Proyek ini bertujuan untuk mendukung Dewan Kerja dalam menjalankan tugas dan fungsi mereka dengan lebih baik, serta meningkatkan koordinasi dan komunikasi antar anggota.</p>",
    "demoLink": "https://sideka.cakadi.id",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Landing Page KawalCovid - Deptics 2021 Project",
    "slug": "deptics-project",
    "image": "/images/portofolio/kawal-covid-main.png",
    "techstack": [...htmlCssJS, ...jqueryBootstrap],
    "shortDesc": "Juara #1 🏆 Deptics Unipma Competition, Landing page untuk kampanye kawal Covid-19 adalah halaman web yang dirancang khusus untuk menyebarkan informasi terkini tentang langkah-langkah pencegahan Covid-19, statistik terbaru, dan sumber daya penting seperti petunjuk vaksinasi dan cara menjaga kesehatan. Dengan desain yang menarik dan mudah dinavigasi, landing page ini bertujuan untuk edukasi masyarakat serta mempromosikan kesadaran akan pentingnya mematuhi protokol kesehatan selama pandemi Covid-19.",
    "desc": "<p>Landing Page KawalCovid dibuat sebagai bagian dari kampanye untuk meningkatkan kesadaran masyarakat tentang pentingnya protokol kesehatan selama pandemi Covid-19. Halaman ini menyediakan informasi terbaru mengenai perkembangan kasus, tips kesehatan, dan panduan pencegahan.</p>\n           <p>Dikembangkan dengan jQuery, Bootstrap, HTML, CSS, dan JavaScript, halaman ini menampilkan informasi dengan cara yang jelas dan mudah dipahami. Pengguna dapat dengan cepat menemukan informasi yang mereka butuhkan mengenai Covid-19.</p>\n           <p>Proyek ini bertujuan untuk mendukung upaya pemerintah dan organisasi kesehatan dalam memerangi Covid-19 dengan menyediakan sumber informasi yang dapat diandalkan dan mudah diakses oleh masyarakat luas.</p>",
    "demoLink": "https://deptics2021.portofolio.cakadi.id/",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Landing Page Musem Trinil",
    "slug": "museum-trinil",
    "image": "/images/portofolio/museum-trinil-front.png",
    "techstack": [...nuxt, ...jqueryBootstrap, 'devicon:supabase', 'devicon:vercel'],
    "shortDesc": "Juara 🏆 #5 NIFC Universitas Muhammadiyah Riau 2024. Landing Page Museum Trinil adalah halaman utama yang dirancang untuk memberikan informasi lengkap tentang Museum Trinil. Halaman ini menampilkan sejarah museum, koleksi yang dimiliki, dan informasi kunjungan.",
    "desc": "<p>Landing Page Museum Trinil adalah halaman utama yang dirancang untuk memberikan informasi lengkap tentang Museum Trinil. Halaman ini menampilkan sejarah museum, koleksi yang dimiliki, dan informasi kunjungan.</p>\n           <p>Dikembangkan menggunakan jQuery, Bootstrap, Nuxt, dan Vercel, halaman ini menawarkan tampilan yang menarik dan informatif. Pengguna dapat dengan mudah menavigasi halaman dan menemukan informasi yang mereka butuhkan.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan kesadaran dan minat masyarakat terhadap Museum Trinil, serta mempermudah pengunjung dalam merencanakan kunjungan mereka ke museum.</p>",
    "demoLink": "https://nifc2024.portofolio.cakadi.id/",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Landing Page Hummatech",
    "slug": "hummatech-landing-page",
    "image": "/images/portofolio/hummatech-front.png",
    "techstack": laravelFullstackNonSPABootstrap,
    "shortDesc": "Landing Page Hummatech adalah halaman utama yang dirancang untuk menampilkan informasi tentang perusahaan teknologi Hummatech. Halaman ini berfungsi sebagai wajah online perusahaan, menampilkan layanan, produk, dan informasi kontak.",
    "desc": "<p>Landing Page Hummatech adalah halaman utama yang dirancang untuk menampilkan informasi tentang perusahaan teknologi Hummatech. Halaman ini berfungsi sebagai wajah online perusahaan, menampilkan layanan, produk, dan informasi kontak.</p>\n           <p>Dibangun dengan Laravel dan Bootstrap, halaman ini memastikan tampilan yang profesional dan responsif. Pengguna dapat dengan mudah menavigasi dan menemukan informasi yang mereka butuhkan tentang Hummatech.</p>\n           <p>Proyek ini bertujuan untuk memperkuat kehadiran online Hummatech, meningkatkan visibilitas perusahaan, dan menarik calon pelanggan dan mitra bisnis melalui tampilan yang profesional dan informatif.</p>",
    "demoLink": "https://www.hummatech.com",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Visit Ngawi 2024",
    "slug": "visit-ngawi-2024",
    "image": "/images/portofolio/visit-ngawi-front.png",
    "techstack": [...jqueryBootstrap, 'devicon:vercel', ...htmlCssJS],
    "shortDesc": "Juara #3 🏆 Fostifest UMS Surakarta 2023, Visit Ngawi 2024 adalah landing page yang dirancang untuk mempromosikan destinasi wisata di Ngawi. Halaman ini menampilkan informasi lengkap tentang tempat-tempat wisata, acara, dan aktivitas yang dapat dinikmati pengunjung di Ngawi.",
    "desc": "<p>Visit Ngawi 2024 adalah landing page yang dirancang untuk mempromosikan destinasi wisata di Ngawi. Halaman ini menampilkan informasi lengkap tentang tempat-tempat wisata, acara, dan aktivitas yang dapat dinikmati pengunjung di Ngawi.</p>\n           <p>Dikembangkan menggunakan jQuery, Bootstrap, dan Vercel, halaman ini menawarkan tampilan yang menarik dan responsif. Pengguna dapat dengan mudah menemukan informasi yang mereka butuhkan untuk merencanakan kunjungan mereka ke Ngawi.</p>\n           <p>Proyek ini bertujuan untuk meningkatkan daya tarik wisata Ngawi, menarik lebih banyak wisatawan, dan mendukung pertumbuhan ekonomi lokal melalui sektor pariwisata.</p>",
    "demoLink": "https://fostifest2023.portofolio.cakadi.id/",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Landing Sirus",
    "slug": "sirus",
    "image": "/images/portofolio/sirus-front.png",
    "techstack": [...nuxt, ...jqueryBootstrap, 'devicon:supabase', 'devicon:vercel'],
    "shortDesc": "Juara 🏆 #1 Intechfest 2020, Landing page tema kesehatan untuk Intechfest 2020, yang meraih juara pertama, adalah halaman web yang didesain khusus untuk memberikan informasi terkait tempat fasilitas kesehatan (faskes) dan bantuan medis dalam upaya mengurangi dampak COVID-19. Halaman ini mencakup peta lokasi faskes, informasi kontak penting, panduan kesehatan, dan sumber daya terkait COVID-19 seperti vaksinasi dan tes. Dengan desain yang responsif dan fokus pada kebutuhan pengguna, landing page ini bertujuan untuk memberikan akses cepat dan akurat terhadap informasi kesehatan yang penting selama pandemi.",
    "desc": "<p>Landing Sirus adalah halaman utama untuk platform Sirus, yang dirancang untuk memberikan informasi mendetail tentang layanan dan fitur yang ditawarkan. Halaman ini bertujuan untuk menarik calon pengguna dan investor dengan desain yang profesional dan informatif.</p>\n           <p>Dikembangkan menggunakan Nuxt dan Bootstrap, halaman ini memastikan performa yang cepat dan responsif, serta tampilan yang menarik di berbagai perangkat. Fitur interaktif dan navigasi yang mudah membantu pengunjung menemukan informasi yang mereka butuhkan dengan cepat.</p>\n           <p>Proyek ini difokuskan pada peningkatan kesadaran merek dan pengenalan produk, serta mendorong konversi pengunjung menjadi pengguna atau investor melalui desain yang efektif dan konten yang informatif.</p>",
    "demoLink": "https://intechfest2020.portofolio.cakadi.id/",
    "sourceCode": null,
    "private": false,
  },
  {
    "name": "Landing Page Toko Online - BytesFest 2021 Project",
    "slug": "bytesfest-project",
    "image": "/images/portofolio/bytesfest-front.png",
    "techstack": [...htmlCssJS, ...jqueryBootstrap],
    "shortDesc": "Juara #1 🏆 Bytesfest UNS 2020, Landing page untuk toko online dalam event BytesFest 2021, yang meraih peringkat 3 dalam ajang tersebut, adalah halaman web khusus yang dikembangkan untuk mempromosikan dan memperkenalkan toko online kepada pengunjung acara BytesFest 2021. Halaman ini dirancang dengan desain menarik dan informatif, menampilkan produk-produk unggulan toko online serta menyoroti keunggulan dan penawaran spesial selama event. Dengan fokus pada navigasi yang intuitif dan tata letak yang menarik, landing page ini bertujuan untuk meningkatkan minat pengunjung dan memperkuat branding toko online dalam kompetisi BytesFest 2021.",
    "desc": "<p>Landing Page Toko Online ini dikembangkan sebagai bagian dari proyek BytesFest 2021. Halaman ini dirancang untuk menampilkan produk-produk unggulan toko online dan menarik perhatian pengunjung dengan desain yang menarik dan interaktif.</p>\n           <p>Menggunakan teknologi jQuery, Bootstrap, HTML, CSS, dan JavaScript, halaman ini menawarkan pengalaman browsing yang mulus dan responsif di berbagai perangkat. Desain yang modern dan fungsional memastikan produk ditampilkan dengan cara yang menarik dan mudah diakses.</p>\n           <p>Proyek ini berfokus pada meningkatkan visibilitas dan daya tarik toko online, serta meningkatkan konversi pengunjung menjadi pembeli melalui tampilan yang profesional dan user-friendly.</p>",
    "demoLink": "https://bytesfest2020.portofolio.cakadi.id/",
    "sourceCode": null,
    "private": false,
  }
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
