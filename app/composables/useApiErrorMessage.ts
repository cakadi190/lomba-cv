interface ApiErrorMessage {
  imgSrc: string;
  title: string;
  text: string;
}

export function useApiErrorMessage(statusCode?: number | null): ApiErrorMessage {
  switch (statusCode) {
    case 401:
      return {
        imgSrc: "/images/errors/404.svg",
        title: "Sesi Anda Berakhir",
        text: "Silakan masuk kembali untuk melanjutkan.",
      };
    case 404:
      return {
        imgSrc: "/images/errors/404.svg",
        title: "Tidak Ditemukan",
        text: "Konten yang Anda cari tidak tersedia atau sudah dihapus.",
      };
    default:
      return {
        imgSrc: "/images/errors/404.svg",
        title: "Ups, Terjadi Kesalahan",
        text: "Saat ini kami sedang memperbaiki kesalahan ini.",
      };
  }
}
