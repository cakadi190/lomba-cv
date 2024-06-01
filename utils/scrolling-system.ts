/**
 * Menggulir ke bagian atas halaman dengan animasi.
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Getting current page offset
 */
export const getCurrentPageOffset = (): number => window.pageYOffset ?? window.scrollY;

/**
 * Menggulir ke elemen dengan ID tertentu dengan animasi.
 * @param {string} targetId - ID dari elemen yang menjadi target scroll.
 */
export const scrollTo = (targetId: string): void => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.error(`Element with ID ${targetId} not found.`);
  }
};
