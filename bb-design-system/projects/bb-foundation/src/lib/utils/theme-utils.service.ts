import { Injectable } from '@angular/core';
import { ThemeConfig, ThemeColors, ThemeValidationResult } from '../core/theme/theme.interface';

/**
 * Utility service for theme-related operations
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeUtilsService {

  /**
   * Generate a complementary color from a base color
   */
  getComplementaryColor(color: string): string {
    const hsl = this.hexToHsl(color);
    const complementaryHue = (hsl.h + 180) % 360;
    return this.hslToHex(complementaryHue, hsl.s, hsl.l);
  }

  /**
   * Generate analogous colors from a base color
   */
  getAnalogousColors(color: string, offset: number = 30): { left: string; right: string } {
    const hsl = this.hexToHsl(color);
    const leftHue = (hsl.h - offset + 360) % 360;
    const rightHue = (hsl.h + offset) % 360;
    
    return {
      left: this.hslToHex(leftHue, hsl.s, hsl.l),
      right: this.hslToHex(rightHue, hsl.s, hsl.l)
    };
  }

  /**
   * Generate a triadic color scheme from a base color
   */
  getTriadicColors(color: string): { color1: string; color2: string } {
    const hsl = this.hexToHsl(color);
    const hue1 = (hsl.h + 120) % 360;
    const hue2 = (hsl.h + 240) % 360;
    
    return {
      color1: this.hslToHex(hue1, hsl.s, hsl.l),
      color2: this.hslToHex(hue2, hsl.s, hsl.l)
    };
  }

  /**
   * Lighten a color by a percentage
   */
  lightenColor(color: string, percentage: number): string {
    const hsl = this.hexToHsl(color);
    const newLightness = Math.min(100, hsl.l + percentage);
    return this.hslToHex(hsl.h, hsl.s, newLightness);
  }

  /**
   * Darken a color by a percentage
   */
  darkenColor(color: string, percentage: number): string {
    const hsl = this.hexToHsl(color);
    const newLightness = Math.max(0, hsl.l - percentage);
    return this.hslToHex(hsl.h, hsl.s, newLightness);
  }

  /**
   * Adjust saturation of a color
   */
  adjustSaturation(color: string, percentage: number): string {
    const hsl = this.hexToHsl(color);
    const newSaturation = Math.max(0, Math.min(100, hsl.s + percentage));
    return this.hslToHex(hsl.h, newSaturation, hsl.l);
  }

  /**
   * Get contrast ratio between two colors
   */
  getContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Check if a color combination meets WCAG AA accessibility standards
   */
  isAccessibleCombination(foreground: string, background: string): boolean {
    const contrast = this.getContrastRatio(foreground, background);
    return contrast >= 4.5;
  }

  /**
   * Generate accessible text color for a given background
   */
  getAccessibleTextColor(backgroundColor: string): string {
    const whiteContrast = this.getContrastRatio('#ffffff', backgroundColor);
    const blackContrast = this.getContrastRatio('#000000', backgroundColor);
    
    return whiteContrast > blackContrast ? '#ffffff' : '#000000';
  }

  /**
   * Generate a complete color palette from a primary color
   */
  generateColorPalette(primaryColor: string): ThemeColors {
    const complementary = this.getComplementaryColor(primaryColor);
    const analogous = this.getAnalogousColors(primaryColor);
    
    return {
      primary: primaryColor,
      primaryLight: this.lightenColor(primaryColor, 20),
      primaryDark: this.darkenColor(primaryColor, 20),
      
      secondary: analogous.right,
      secondaryLight: this.lightenColor(analogous.right, 20),
      secondaryDark: this.darkenColor(analogous.right, 20),
      
      surface: '#ffffff',
      surfaceLight: '#f8fafc',
      surfaceDark: '#f1f5f9',
      
      background: '#ffffff',
      text: '#1f2937',
      
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      
      neutral: '#6b7280',
      outline: '#e5e7eb',
      textSecondary: '#6b7280',
      textDisabled: '#9ca3af'
    };
  }

  /**
   * Validate theme configuration
   */
  validateTheme(theme: ThemeConfig): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!theme.name) errors.push('Theme name is required');
    if (!theme.displayName) errors.push('Display name is required');
    if (!theme.colors) errors.push('Colors configuration is required');

    if (theme.colors) {
      // Required colors validation
      const requiredColors = ['primary', 'secondary', 'surface', 'background', 'text'];
      requiredColors.forEach(colorKey => {
        if (!theme.colors[colorKey as keyof ThemeColors]) {
          errors.push(`Required color '${colorKey}' is missing`);
        }
      });

      // Color format validation
      Object.entries(theme.colors).forEach(([key, value]) => {
        if (value && !this.isValidColor(value)) {
          errors.push(`Invalid color format for '${key}': ${value}`);
        }
      });

      // Accessibility warnings
      if (theme.colors.primary && theme.colors.surface) {
        const contrast = this.getContrastRatio(theme.colors.primary, theme.colors.surface);
        if (contrast < 4.5) {
          warnings.push(`Low contrast ratio (${contrast.toFixed(2)}) between primary and surface colors`);
        }
      }

      if (theme.colors.text && theme.colors.background) {
        const contrast = this.getContrastRatio(theme.colors.text, theme.colors.background);
        if (contrast < 4.5) {
          warnings.push(`Low contrast ratio (${contrast.toFixed(2)}) between text and background colors`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Convert hex color to HSL
   */
  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    // Remove hash if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

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
   * Convert HSL to hex color
   */
  private hslToHex(h: number, s: number, l: number): string {
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

    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Get relative luminance of a color
   */
  private getLuminance(color: string): number {
    // Remove hash if present
    color = color.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;

    // Apply gamma correction
    const sRGBtoLin = (colorChannel: number): number => {
      if (colorChannel <= 0.03928) {
        return colorChannel / 12.92;
      } else {
        return Math.pow((colorChannel + 0.055) / 1.055, 2.4);
      }
    };

    const rLin = sRGBtoLin(r);
    const gLin = sRGBtoLin(g);
    const bLin = sRGBtoLin(b);

    // Calculate luminance
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  }

  /**
   * Check if a string is a valid color
   */
  private isValidColor(color: string): boolean {
    const style = new Option().style;
    style.color = color;
    return style.color !== '';
  }
}