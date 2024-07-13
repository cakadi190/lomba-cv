/**
 * Memotong teks menjadi sejumlah kata maksimum.
 * @param {string} text - Teks yang akan dipotong.
 * @param {number} limit - Batas jumlah kata maksimum.
 * @returns {string} Teks yang dipotong.
 */
export const limitWords = (text: string, limit: number): string => {
  return text.split(" ").slice(0, limit).join(" ") + (text.split(" ").length > limit ? "..." : "");
};

/**
 * Memotong teks menjadi sejumlah karakter maksimum.
 * @param {string} text - Teks yang akan dipotong.
 * @param {number} limit - Batas jumlah karakter maksimum.
 * @returns {string} Teks yang dipotong.
 */
export const limitChars = (text: string, limit: number): string => {
  return text.slice(0, limit) + (text.length > limit ? "..." : "");
};

/**
 * Memotong teks menjadi sejumlah baris maksimum.
 * @param {string} text - Teks yang akan dipotong.
 * @param {number} limit - Batas jumlah baris maksimum.
 * @returns {string} Teks yang dipotong.
 */
export const limitLines = (text: string, limit: number): string => {
  return text.split("\n").slice(0, limit).join("\n") + (text.split("\n").length > limit ? "..." : "");
};

/**
 * Memotong teks menjadi sejumlah karakter maksimum.
 * @param {string} text - Teks yang akan dipotong.
 * @param {number} limit - Batas jumlah karakter maksimum.
 * @returns {string} Teks yang dipotong.
 */
export const truncate = (str: string, limit: number, end: string = '...'): string => {
  if (str.length <= limit) {
    return str;
  }
  return str.substring(0, limit) + end;
};

/**
 * Mengubah huruf pertama teks menjadi huruf besar.
 * @param {string} text - Teks yang akan diubah.
 * @returns {string} Teks dengan huruf pertama yang diubah menjadi huruf besar.
 */
export const capitalize = (text: string): string => {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Mengubah semua huruf teks menjadi huruf kecil.
 * @param {string} text - Teks yang akan diubah.
 * @returns {string} Teks dengan semua huruf menjadi huruf kecil.
 */
export const lowerCase = (text: string): string => {
  if (text.length === 0) return text;
  return text.toLowerCase();
};

/**
 * Mengubah semua huruf teks menjadi huruf besar.
 * @param {string} text - Teks yang akan diubah.
 * @returns {string} Teks dengan semua huruf menjadi huruf besar.
 */
export const upperCase = (text: string): string => {
  if (text.length === 0) return text;
  return text.toUpperCase();
};

/**
 * Menghapus spasi kosong dari awal dan akhir teks.
 * @param {string} text - Teks yang akan dipotong.
 * @returns {string} Teks tanpa spasi kosong di awal dan akhir.
 */
export const trim = (text: string): string => {
  return text.trim();
};

/**
 * Format a number as a currency string.
 *
 * @param {number} amount - The number to be formatted.
 * @param {string} [currency='IDR'] - The currency code (e.g. 'USD', 'EUR', etc.).
 * @param {number} [decimalPlaces=2] - The number of decimal places to display.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (a: number, c: string = 'IDR', l: string = 'id-ID', d: number = 2) => new Intl.NumberFormat(l, { style: 'currency', currency: c, minimumFractionDigits: d, maximumFractionDigits: d }).format(a);