// nuxt/utils/colors.ts

/**
 * Generates a random color in hexadecimal format.
 * @returns {string} Random hexadecimal color.
 */
export const getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16);

/**
 * Generates a random RGB color.
 * @returns {string} Random RGB color.
 */
export const getRandomRGBColor = (): string => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

/**
 * Generates a random RGBA color with a specified alpha value.
 * @param {number} alpha - Alpha value (0 to 1).
 * @returns {string} Random RGBA color.
 */
export const getRandomRGBAColor = (alpha: number): string => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${alpha})`;

/**
 * Converts a hexadecimal color to RGB format.
 * @param {string} hex - Hexadecimal color string (e.g., '#RRGGBB').
 * @returns {string} RGB color string.
 */
export const hexToRgb = (hex: string): string => {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  return `rgb(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255})`;
};

/**
 * Converts an RGB color to hexadecimal format.
 * @param {number} r - Red value (0 to 255).
 * @param {number} g - Green value (0 to 255).
 * @param {number} b - Blue value (0 to 255).
 * @returns {string} Hexadecimal color string.
 */
export const rgbToHex = (r: number, g: number, b: number): string => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

/**
 * Converts an RGB color to HSL format.
 * @param {number} r - Red value (0 to 255).
 * @param {number} g - Green value (0 to 255).
 * @param {number} b - Blue value (0 to 255).
 * @returns {[number, number, number]} Array containing HSL values.
 */
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
};

/**
 * Converts an HSL color to RGB format.
 * @param {number} h - Hue value (0 to 1).
 * @param {number} s - Saturation value (0 to 1).
 * @param {number} l - Lightness value (0 to 1).
 * @returns {string} RGB color string.
 */
export const hslToRgb = (h: number, s: number, l: number): string => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
};

/**
 * Determines whether text color should be white or black based on contrast with the background color.
 * @param {string} hexColor - Hexadecimal color string (e.g., '#RRGGBB').
 * @param {string} white - Hexadecimal color string for white.
 * @param {string} black - Hexadecimal color string for black.
 * @returns {string} Either white or black as the recommended text color.
 */
export const getColorContrastText = (hexColor: string, white: string = '#fff', black: string = '#000'): string => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate YIQ (luminance) value
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Determine text color based on contrast
  return yiq >= 128 ? black : white;
};
