/**
 * Color utility functions for the B01 foundation
 */

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface HSVColor {
  h: number;
  s: number;
  v: number;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number): string => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Convert hex to HSL
 */
export function hexToHsl(hex: string): HSLColor | null {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HSVColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (diff !== 0) {
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(h: number, s: number, v: number): RGBColor {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const c = v * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (h >= 1/6 && h < 2/6) {
    r = x; g = c; b = 0;
  } else if (h >= 2/6 && h < 3/6) {
    r = 0; g = c; b = x;
  } else if (h >= 3/6 && h < 4/6) {
    r = 0; g = x; b = c;
  } else if (h >= 4/6 && h < 5/6) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

/**
 * Get relative luminance of a color (for contrast calculations)
 */
export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const sRGBtoLin = (colorChannel: number): number => {
    const c = colorChannel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLin = sRGBtoLin(rgb.r);
  const gLin = sRGBtoLin(rgb.g);
  const bLin = sRGBtoLin(rgb.b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function isAccessible(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const contrast = getContrastRatio(foreground, background);
  const threshold = level === 'AAA' ? 7 : 4.5;
  return contrast >= threshold;
}

/**
 * Lighten a color by percentage
 */
export function lighten(color: string, percentage: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  const newLightness = Math.min(100, hsl.l + percentage);
  return hslToHex(hsl.h, hsl.s, newLightness);
}

/**
 * Darken a color by percentage
 */
export function darken(color: string, percentage: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  const newLightness = Math.max(0, hsl.l - percentage);
  return hslToHex(hsl.h, hsl.s, newLightness);
}

/**
 * Saturate a color by percentage
 */
export function saturate(color: string, percentage: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  const newSaturation = Math.min(100, hsl.s + percentage);
  return hslToHex(hsl.h, newSaturation, hsl.l);
}

/**
 * Desaturate a color by percentage
 */
export function desaturate(color: string, percentage: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  const newSaturation = Math.max(0, hsl.s - percentage);
  return hslToHex(hsl.h, newSaturation, hsl.l);
}

/**
 * Adjust hue of a color by degrees
 */
export function adjustHue(color: string, degrees: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;

  const newHue = (hsl.h + degrees + 360) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
}

/**
 * Get complementary color
 */
export function complement(color: string): string {
  return adjustHue(color, 180);
}

/**
 * Mix two colors together by percentage
 */
export function mix(color1: string, color2: string, percentage: number = 50): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const weight = percentage / 100;
  const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
  const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
  const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);

  return rgbToHex(r, g, b);
}

/**
 * Generate a color palette from a base color
 */
export function generatePalette(baseColor: string): Record<string, string> {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return {};

  return {
    '50': hslToHex(hsl.h, hsl.s, 95),
    '100': hslToHex(hsl.h, hsl.s, 90),
    '200': hslToHex(hsl.h, hsl.s, 80),
    '300': hslToHex(hsl.h, hsl.s, 70),
    '400': hslToHex(hsl.h, hsl.s, 60),
    '500': baseColor, // Base color
    '600': hslToHex(hsl.h, hsl.s, 40),
    '700': hslToHex(hsl.h, hsl.s, 30),
    '800': hslToHex(hsl.h, hsl.s, 20),
    '900': hslToHex(hsl.h, hsl.s, 10),
    '950': hslToHex(hsl.h, hsl.s, 5)
  };
}

/**
 * Validate if string is a valid color
 */
export function isValidColor(color: string): boolean {
  const style = new Option().style;
  style.color = color;
  return style.color !== '';
}

/**
 * Convert any color format to hex
 */
export function toHex(color: string): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return color;

  ctx.fillStyle = color;
  return ctx.fillStyle;
}

/**
 * Get readable text color for background
 */
export function getReadableTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio('#ffffff', backgroundColor);
  const blackContrast = getContrastRatio('#000000', backgroundColor);
  
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}