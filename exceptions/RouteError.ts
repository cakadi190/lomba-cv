/**
 * Galat yang dilempar oleh helper rute ketika terjadi kesalahan pembentukan URL,
 * mis. nama rute tidak terdaftar atau parameter wajib tidak terisi.
 *
 * Selalu memiliki prefix `[RouteError]` pada pesannya agar mudah dikenali di log.
 *
 * @example
 * throw new RouteError("Nama rute tidak atau belum terdefinisi.");
 * // -> [RouteError]: Nama rute tidak atau belum terdefinisi.
 */
export class RouteError extends Error {
  /** Nama galat, dipakai sebagai penanda saat dicocokkan di log maupun pengecekan tipe. */
  override readonly name = "RouteError";

  /**
   * Membuat instance {@link RouteError} dengan pesan yang sudah diberi prefix.
   *
   * @param message - Pesan galat tanpa prefix; prefix `[RouteError]` ditambahkan otomatis.
   */
  constructor(message: string) {
    super(`[RouteError]: ${message}`);
    Object.setPrototypeOf(this, RouteError.prototype);
  }
}
