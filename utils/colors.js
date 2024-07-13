"use strict";
// nuxt/utils/colors.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorContrastText = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.getRandomRGBAColor = exports.getRandomRGBColor = exports.getRandomColor = void 0;
/**
 * Generates a random color in hexadecimal format.
 * @returns {string} Random hexadecimal color.
 */
var getRandomColor = function () { return '#' + Math.floor(Math.random() * 16777215).toString(16); };
exports.getRandomColor = getRandomColor;
/**
 * Generates a random RGB color.
 * @returns {string} Random RGB color.
 */
var getRandomRGBColor = function () { return "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")"); };
exports.getRandomRGBColor = getRandomRGBColor;
/**
 * Generates a random RGBA color with a specified alpha value.
 * @param {number} alpha - Alpha value (0 to 1).
 * @returns {string} Random RGBA color.
 */
var getRandomRGBAColor = function (alpha) { return "rgba(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(alpha, ")"); };
exports.getRandomRGBAColor = getRandomRGBAColor;
/**
 * Converts a hexadecimal color to RGB format.
 * @param {string} hex - Hexadecimal color string (e.g., '#RRGGBB').
 * @returns {string} RGB color string.
 */
var hexToRgb = function (hex) {
    hex = hex.replace(/^#/, '');
    var bigint = parseInt(hex, 16);
    return "rgb(".concat((bigint >> 16) & 255, ", ").concat((bigint >> 8) & 255, ", ").concat(bigint & 255, ")");
};
exports.hexToRgb = hexToRgb;
/**
 * Converts an RGB color to hexadecimal format.
 * @param {number} r - Red value (0 to 255).
 * @param {number} g - Green value (0 to 255).
 * @param {number} b - Blue value (0 to 255).
 * @returns {string} Hexadecimal color string.
 */
var rgbToHex = function (r, g, b) { return "#".concat(((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)); };
exports.rgbToHex = rgbToHex;
/**
 * Converts an RGB color to HSL format.
 * @param {number} r - Red value (0 to 255).
 * @param {number} g - Green value (0 to 255).
 * @param {number} b - Blue value (0 to 255).
 * @returns {[number, number, number]} Array containing HSL values.
 */
var rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
};
exports.rgbToHsl = rgbToHsl;
/**
 * Converts an HSL color to RGB format.
 * @param {number} h - Hue value (0 to 1).
 * @param {number} s - Saturation value (0 to 1).
 * @param {number} l - Lightness value (0 to 1).
 * @returns {string} RGB color string.
 */
var hslToRgb = function (h, s, l) {
    var r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return "rgb(".concat(Math.round(r * 255), ", ").concat(Math.round(g * 255), ", ").concat(Math.round(b * 255), ")");
};
exports.hslToRgb = hslToRgb;
/**
 * Determines whether text color should be white or black based on contrast with the background color.
 * @param {string} hexColor - Hexadecimal color string (e.g., '#RRGGBB').
 * @param {string} white - Hexadecimal color string for white.
 * @param {string} black - Hexadecimal color string for black.
 * @returns {string} Either white or black as the recommended text color.
 */
var getColorContrastText = function (hexColor, white, black) {
    if (white === void 0) { white = '#fff'; }
    if (black === void 0) { black = '#000'; }
    // Convert hex color to RGB
    var r = parseInt(hexColor.slice(1, 3), 16);
    var g = parseInt(hexColor.slice(3, 5), 16);
    var b = parseInt(hexColor.slice(5, 7), 16);
    // Calculate YIQ (luminance) value
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // Determine text color based on contrast
    return yiq >= 128 ? black : white;
};
exports.getColorContrastText = getColorContrastText;
