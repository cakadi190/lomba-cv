import { PixelConverterError } from "~~/exceptions/PixelConverterError";

/**
 * Mengonversi nilai dengan satuan panjang (seperti px, rem, em) menjadi nilai piksel numerik.
 *
 * Catatan penting:
 * - Jika tipe input adalah `number`, nilai tersebut dikembalikan langsung sebagai piksel.
 * - Satuan `rem` dikonversi berdasarkan ukuran fonta root (`document.documentElement`), dengan fallback `16px` saat SSR.
 * - Satuan `em` tidak dapat dikonversi secara statis karena memerlukan konteks elemen induk, sehingga akan melempar galat.
 *
 * @param value - Nilai yang akan dikonversi (mis. `24`, `"1.5rem"`, `"32px"`).
 * @returns Nilai numerik dalam satuan piksel (px).
 * @throws {@link PixelConverterError} Jika format nilai tidak dikenal, satuan tidak didukung, atau satuan memerlukan konteks dinamis (seperti `em`).
 */
export function toPx(value: string | number): number {
  if (typeof value === "number") return value;

  const match = value.trim().match(/^(-?\d*\.?\d+)(px|rem|em)?$/);
  if (!match) {
    throw new PixelConverterError(
      `Cannot convert statically! Unrecognized unit value: "${value}"`,
    );
  }

  const num = parseFloat(match[1]);
  const unit = match[2] ?? "px";

  switch (unit) {
    case "px":
      return num;
    case "rem": {
      const rootFontSize =
        typeof document !== "undefined"
          ? parseFloat(getComputedStyle(document.documentElement).fontSize)
          : 16;
      return num * rootFontSize;
    }
    case "em":
      throw new PixelConverterError(
        `Cannot convert statically! The "${unit}" unit requires parent element context`,
      );
    default:
      throw new PixelConverterError(`Unsupported unit: ${unit}`);
  }
}
