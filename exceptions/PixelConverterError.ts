/**
 * Galat yang dilempar oleh helper konversi piksel ketika terjadi kesalahan konversi nilai satuan,
 * mis. format tidak dikenal atau satuan tidak didukung.
 *
 * Selalu memiliki prefix `[PixelConverterError]` pada pesannya agar mudah dikenali di log.
 *
 * @example
 * throw new PixelConverterError("Nilai satuan tidak dikenal.");
 * // -> [PixelConverterError]: Nilai satuan tidak dikenal.
 */
export class PixelConverterError extends Error {
  /** Nama galat, dipakai sebagai penanda saat dicocokkan di log maupun pengecekan tipe. */
  override readonly name = "PixelConverterError";

  /**
   * Membuat instance {@link PixelConverterError} dengan pesan yang sudah diberi prefix.
   *
   * @param message - Pesan galat tanpa prefix; prefix `[PixelConverterError]` ditambahkan otomatis.
   */
  constructor(message: string) {
    super(`[PixelConverterError]: ${message}`);
    Object.setPrototypeOf(this, PixelConverterError.prototype);
  }
}
