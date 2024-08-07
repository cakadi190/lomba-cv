import { PrismaClient, WifiSpeed, CafePrice } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
import { Open08To23, Open08To24, Open09To02, Open09To22, Open09To23, Open09To24, Open10To22, Open10To23, Open13To22, Open24Hours } from '../../components/time.ts';

const prisma = new PrismaClient();

const imagePath = (imageName: string) => `/images/coffee-shops/${imageName}.webp`;

interface CoffeePlace {
  name: string;
  address: string;
  description: string;
  map_coordinate: string;
  map_url: string;
  image?: string | null;
  wifi_provider: string;
  park_fee: number;
  price: CafePrice;
  wifi_speed: WifiSpeed;
  region: string;
  recomended?: boolean;
  open?: string;
  close?: string;
}

const coffeePlacesData: CoffeePlace[] = [
  {
    name: 'Floe Coffee & Space',
    address: 'Jl. Raya Ngawi - Caruban No.KM 2, Nglarangan, Karangasri, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63218',
    description: 'Tempat ngopi paling asik di pinggir kota dengan menu yang relatif murah untuk warga Kabupaten Ngawi dan tempat yang strategis di pinggiran Kota Ngawi.',
    map_coordinate: '-7.407694141624345, 111.46570697169916',
    map_url: 'https://maps.app.goo.gl/bDB1DoQoiiWzwu7Q6',
    image: imagePath('floe'),
    wifi_provider: 'biznet',
    park_fee: 0,
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    recomended: true,
    ...Open24Hours,
  },
  {
    name: 'The Real Coffee and Eatery',
    address: 'Dungus, Karangasri, Ngawi, Ngawi Regency, East Java 63218Jl. Raya Ngawi - Caruban No.KM 2, Nglarangan, Karangasri, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63218',
    description: 'Tempat ngopi paling asik di pinggir kota dengan menu yang relatif murah untuk warga Kabupaten Ngawi dan tempat yang strategis di pinggiran Kota Ngawi.',
    map_coordinate: '-7.404721230883661, 111.4615439504678',
    map_url: 'https://maps.app.goo.gl/NSEMj2r1KzbNLPFA8',
    image: imagePath('the-real'),
    wifi_provider: 'telkom',
    park_fee: 0,
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    ...Open10To23,
  },
  {
    name: 'Adess Pool & Adess Cafe',
    address: 'Jl. Teuku Umar, Kerek, Margomulyo, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63211',
    description: 'Tempat ngopi dengan wisata kolam renang yang berdekatan. Cocok untuk bersantai bersama keluarga atau teman, sambil menikmati berbagai pilihan kopi dan makanan ringan.',
    map_coordinate: '-7.401708930975215, 111.44213703743462',
    map_url: 'https://maps.app.goo.gl/EV6MEStDMbEUedzEA',
    image: imagePath('ades-cafe'),
    wifi_provider: 'telkom',
    park_fee: 2000,
    recomended: true,
    price: CafePrice.CHEAP,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    ...Open10To22,
  },
  {
    name: 'Glory Coffinery',
    address: 'Jl. Trunojoyo, RT.04/RW.03, Kerek, Margomulyo, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63217',
    description: 'Glory Coffinery menawarkan suasana yang nyaman dengan pilihan kopi berkualitas. Tempat ini cocok untuk bersantai atau bekerja dengan akses WiFi yang cukup baik. Biaya parkir yang terjangkau menambah kenyamanan pengunjung.',
    map_coordinate: '-7.404868320662563, 111.44049531386896',
    map_url: 'https://maps.app.goo.gl/mFHi4V6NA3aHHcMm8',
    image: imagePath('glory-coffeenary'),
    wifi_provider: 'telkom',
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    ...Open24Hours,
  },
  {
    name: 'Portafighter #1 Ngawi',
    address: 'Jl. Brawijaya No.13, Kerek, Margomulyo, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63271',
    description: 'Portafighter #1 Ngawi adalah tempat yang cocok untuk para pecinta kopi. Dengan akses WiFi yang memadai dan lokasi yang strategis, kafe ini menawarkan pengalaman ngopi yang menyenangkan tanpa biaya parkir.',
    map_coordinate: '-7.408397476493666, 111.4421515691249',
    map_url: 'https://maps.app.goo.gl/DuK2vPBqSJawYTni7',
    image: imagePath('porta#1'),
    park_fee: 0,
    price: CafePrice.CHEAP,
    wifi_provider: 'telkom',
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    ...Open24Hours,
  },
  {
    name: 'THX Coffee',
    address: 'Jl. Ahmad Yani No.5, Beran I, Beran, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63216',
    description: 'THX Coffee menghadirkan suasana yang tenang dengan berbagai pilihan kopi. Kafe ini dilengkapi dengan WiFi yang cukup baik, menjadikannya tempat yang ideal untuk bekerja atau bersantai tanpa biaya parkir.',
    map_coordinate: '-7.420078593519739, 111.44153738052064',
    map_url: 'https://maps.app.goo.gl/Wfyd2EN5DwRRLmDV9',
    image: imagePath('thx'),
    park_fee: 0,
    price: CafePrice.MEDIUM,
    wifi_provider: 'telkom',
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Ngawi',
    ...Open13To22,
  },

  {
    name: 'Ikio Coffee',
    address: 'Jl. Eka Karya No.1, Mojorejo, Kec. Taman, Kota Madiun, Jawa Timur 63139',
    description: 'Kafe dengan suasana yang nyaman dan tenang, cocok untuk bekerja atau bersantai dengan teman. Menawarkan berbagai jenis kopi dan makanan ringan.',
    map_coordinate: '-7.636885279376751, 111.53253765672265',
    map_url: 'https://maps.app.goo.gl/c1962JA6Yv32Absb8',
    image: imagePath('ikio'),
    park_fee: 2000,
    wifi_provider: 'biznet',
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.STRONG,
    region: 'Madiun',
    recomended: true,
    ...Open08To23,
  },
  {
    name: 'Warung Kopi Semilir',
    address: 'Jl. Letkol Suwarno No.17, Kanigoro, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63118',
    description: 'Warung Kopi Semilir menawarkan suasana yang nyaman dan sejuk, ideal untuk bersantai sambil menikmati secangkir kopi. Dilengkapi dengan WiFi yang memadai dan bebas biaya parkir, tempat ini menjadi pilihan tepat bagi para pengunjung yang mencari ketenangan.',
    map_coordinate: '-7.63678717594058, 111.53988206582551',
    map_url: 'https://maps.app.goo.gl/9EXqVzTGjjcttF637',
    image: imagePath('semilir-madiun'),
    park_fee: 0,
    wifi_provider: 'telkom',
    price: CafePrice.CHEAP,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Madiun',
    ...Open08To24,
  },
  {
    name: 'Balen Coffee',
    address: 'Jl. Kemiri No.19, Taman, Kec. Taman, Kota Madiun, Jawa Timur 63118',
    description: 'Balen Coffee adalah tempat yang nyaman untuk menikmati kopi dengan suasana yang tenang. Dilengkapi dengan WiFi kuat dari Biznet dan tanpa biaya parkir, tempat ini cocok untuk bekerja atau bersantai. Harga kopi yang ditawarkan juga cukup terjangkau.',
    map_coordinate: '-7.636568780590796, 111.52380906969479',
    map_url: 'https://maps.app.goo.gl/BmbTCvdSRCkXrnzAA',
    image: imagePath('balen-coffee'),
    park_fee: 0,
    wifi_provider: 'biznet',
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.STRONG,
    region: 'Madiun',
    ...Open09To23,
  },
  {
    name: 'Belle Coffee and Chill',
    address: 'Jl. Kemiri No.22A, Kejuron, Kec. Taman, Kota Madiun, Jawa Timur 63132',
    description: 'Belle Coffee and Chill menawarkan suasana yang nyaman dan santai untuk menikmati berbagai pilihan kopi. Dengan WiFi kuat dari Biznet dan bebas biaya parkir, tempat ini ideal untuk bekerja atau bersantai bersama teman-teman. Harga kopi yang ditawarkan berada di kisaran sedang.',
    map_coordinate: '-7.6365096214267085, 111.52348108307392',
    map_url: 'https://maps.app.goo.gl/uuk5Q5zkJnKqVuoX6',
    image: imagePath('belle'),
    park_fee: 0,
    wifi_provider: 'biznet',
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.STRONG,
    region: 'Madiun',
    ...Open10To23,
  },
  {
    name: 'Green Belly Coffee and Space',
    address: 'Jl. Kapuas No.47, Taman, Kec. Taman, Kota Madiun, Jawa Timur 63131',
    description: 'Green Belly Coffee and Space menyediakan tempat yang nyaman untuk menikmati kopi dengan WiFi yang cukup baik dari Telkom. Bebas biaya parkir dan harga kopi yang terjangkau membuat tempat ini cocok untuk bekerja atau bersantai bersama teman-teman.',
    map_coordinate: '-7.640923760960542, 111.52030283731126',
    map_url: 'https://maps.app.goo.gl/jstUskJjyoZzd2q38',
    image: imagePath('green-belly-madiun'),
    park_fee: 0,
    wifi_provider: 'telkom',
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Madiun',
    ...Open09To23,
  },

  {
    name: 'The Weekend',
    address: 'Jl. Tegalgondo No.221A, Wunutsari, Tegalgondo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152',
    description: 'The Weekend adalah tempat nongkrong yang nyaman dengan suasana santai dan modern. Menawarkan WiFi yang kuat dari Biznet, tempat ini sangat cocok untuk bekerja atau bersantai di akhir pekan. Bebas biaya parkir juga menjadi nilai tambah bagi pengunjung.',
    map_coordinate: '-7.915055950552338, 112.59205980285974',
    map_url: 'https://maps.app.goo.gl/GeMyCKSuLe3akSzt8',
    image: imagePath('the-weekend'),
    park_fee: 0,
    wifi_provider: 'biznet',
    price: CafePrice.EXPENSIVE,
    wifi_speed: WifiSpeed.STRONG,
    region: 'Malang',
    recomended: true,
    ...Open09To24,
  },
  {
    name: 'Semusim Cafe',
    address: 'Jl. MT. Haryono No.110, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145',
    description: 'Tempat ngopi dan workspace untuk mahasiswa POLINEMA dan Universitas Brawijaya yang harganya relatif murah di kantong mahasiswa.',
    map_coordinate: '-7.947019659957446, 112.6133933353694',
    map_url: 'https://maps.app.goo.gl/iQRcqcYjyTZAiDc67',
    image: imagePath('semusim'),
    park_fee: 2000,
    wifi_provider: 'telkom',
    price: CafePrice.MEDIUM,
    wifi_speed: WifiSpeed.STRONG,
    recomended: true,
    region: 'Malang',
    ...Open09To02,
  },
  {
    name: 'Kopi Studio 24 Srimaya',
    address: 'Jl. Balai Desa Kepuharjo, Kedawung, Ngijo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152',
    description: 'Tempat ngopi dan workspace untuk yang kerja di daerah Karang Ploso dan sekitarnya.',
    map_coordinate: '-7.912667124019404, 112.61938581487722',
    map_url: 'https://maps.app.goo.gl/ZVRvAZateWPp72uq8',
    image: imagePath('kopstud-srimaya'),
    park_fee: 0,
    price: CafePrice.CHEAP,
    wifi_provider: 'biznet',
    wifi_speed: WifiSpeed.STRONG,
    recomended: false,
    region: 'Malang',
    ...Open24Hours,
  },
  {
    name: 'Kopi Studio 24 Sigura-Gura',
    address: 'Jl. Sigura - Gura No.33, Karangbesuki, Kec. Sukun, Kota Malang, Jawa Timur 65149',
    description: 'Tempat ngopi dan workspace untuk yang kerja di daerah Sigura-Gura dan sekitarnya.',
    map_coordinate: '-7.912667124019404, 112.61938581487722',
    map_url: 'https://maps.app.goo.gl/ZVRvAZateWPp72uq8',
    image: imagePath('kopstud-sigura-gura'),
    park_fee: 0,
    price: CafePrice.CHEAP,
    wifi_provider: 'biznet',
    wifi_speed: WifiSpeed.STRONG,
    recomended: true,
    region: 'Malang',
    ...Open24Hours,
  },
  {
    name: 'Studio Bakso & Kopi Studio 24 Suhat',
    address: 'Jl. Soekarno Hatta, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141',
    description: 'Tempat ngopi dan workspace untuk mahasiswa POLINEMA dan Universitas Brawijaya yang harganya relatif murah di kantong mahasiswa.',
    map_coordinate: '-7.94568223495749, 112.61961240771295',
    map_url: 'https://maps.app.goo.gl/FbaA4hD5rUYSu3hy7',
    image: imagePath('kopstud-suhat'),
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_provider: 'biznet',
    wifi_speed: WifiSpeed.STRONG,
    region: 'Malang',
    recomended: true,
    ...Open24Hours,
  },
  {
    name: 'Warung Kopie Sarkawie',
    address: 'Jl. Wisnu Wardhana No.25, Candirenggo, Kec. Singosari, Kabupaten Malang, Jawa Timur 65153',
    description: 'Warung Kopie Sarkawie menawarkan suasana yang nyaman dengan kopi khas lokal. Tempat ini cocok untuk bersantai atau bekerja dengan akses WiFi yang kuat dan berbagai pilihan kopi serta makanan ringan.',
    map_coordinate: '-7.885407976176824, 112.66457997979296',
    map_url: 'https://maps.app.goo.gl/NPhLaw7DmR9RKfdi8',
    image: imagePath('sarkawie-shs'),
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_provider: 'telkom',
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Malang',
    ...Open09To22,
  },
  {
    name: 'TWCE Cafe & Eatery',
    address: 'Sebelah cucian mobil, Jl. Saxophone, Tunggulwulung, Kota Malang, Jawa Timur 65143',
    description: "TWCE Cafe & Eatery adalah tempat yang nyaman untuk menikmati berbagai macam makanan dan minuman di Malang. Terletak di area yang strategis, cocok untuk bertemu teman atau sekadar bersantai.",
    map_coordinate: '-7.926177311423704, 112.60539100204018',
    map_url: 'https://maps.app.goo.gl/7VRdnnMG3ur2HWfj7',
    image: imagePath('twce-coffee'),
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_provider: 'telkom',
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Malang',
    recomended: true,
    ...Open24Hours,
  },
  {
    name: 'Warkop Antara',
    address: 'Jl. Saxophone, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143',
    description: "Warkop Antara adalah tempat yang ideal untuk menikmati kopi dan suasana yang santai di Malang. Dengan harga terjangkau dan fasilitas WiFi dari Telkom, cocok untuk pekerjaan atau bersantai sepanjang hari.",
    map_coordinate: '-7.924402295940105, 112.60341239239271',
    map_url: 'https://maps.app.goo.gl/tQ4tDSsBQ4L8WwGn6',
    image: imagePath('antara'),
    park_fee: 0,
    price: CafePrice.CHEAP,
    wifi_provider: 'telkom',
    wifi_speed: WifiSpeed.MEDIUM,
    region: 'Malang',
    ...Open24Hours,
  },

  {
    name: 'SETITI Coffee Shop Klaten',
    address: 'Jl. Pemuda No.295, Mlinjon, Tonggalan, Kec. Klaten Tengah, Kabupaten Klaten, Jawa Tengah 57412',
    description: "SETITI Coffee Shop merupakan tempat yang cocok untuk menikmati kopi dengan suasana yang nyaman di Klaten. Disediakan WiFi dari Biznet dengan kecepatan yang kuat, tempat ini juga menawarkan berbagai pilihan makanan dan minuman.",
    map_coordinate: '-7.713044114964349, 110.59335567416215',
    map_url: 'https://maps.app.goo.gl/kq36wfJNWy2g8xNx6',
    image: imagePath('setiti'),
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_provider: 'biznet',
    wifi_speed: WifiSpeed.STRONG,
    region: 'Klaten',
    recomended: true,
    ...Open08To23,
  },
  {
    name: 'Awor Coffee Klaten',
    address: 'Jl. Merbabu No.5, Gayamprit, Kec. Klaten Sel., Kabupaten Klaten, Jawa Tengah 57412',
    description: "Awor Coffee adalah tempat yang tepat untuk menikmati kopi berkualitas dan suasana yang tenang di Klaten. Dengan WiFi dari Biznet dan jam operasional dari pagi hingga malam, cocok untuk rapat santai atau pertemuan informal.",
    map_coordinate: '-7.713044114964349, 110.59335567416215',
    map_url: 'https://maps.app.goo.gl/kq36wfJNWy2g8xNx6',
    image: imagePath('awor-coffee-klt'),
    park_fee: 2000,
    price: CafePrice.MEDIUM,
    wifi_provider: 'biznet',
    wifi_speed: WifiSpeed.STRONG,
    region: 'Klaten',
    ...Open08To23,
  },
];

async function seedCoffeePlaces() {
  await truncateTable('coffee_places');

  for (const place of coffeePlacesData) {
    await prisma.coffee_places.create({
      data: place,
    });
  }
}

export default seedCoffeePlaces;
