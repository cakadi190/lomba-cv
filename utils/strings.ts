/**
 * Generates a random string of the specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} A random string of the specified length.
 */
export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

/**
 * Mengonversi nomor telepon yang disimpan dalam ref Vue menjadi tautan WhatsApp.
 * @param {Ref<string>} phone - Ref Vue yang berisi nomor telepon.
 * @returns {string} Tautan WhatsApp yang sesuai dengan nomor telepon yang disediakan.
 */
export const convertToWhatsAppLink = (phone: any): string => {
  const phoneNumber = phone.replace(/\D/g, '');
  const formattedPhoneNumber = phoneNumber.startsWith('0') ? '62' + phoneNumber.substring(1) : '62' + phoneNumber;
  return `https://wa.me/${formattedPhoneNumber}`;
};

export const refToString = (string: Ref<any>): string => {
  return string.value;
};