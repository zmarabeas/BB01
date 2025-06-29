/**
 * Theme exports for B01 Foundation
 */

// Export default themes
export { DEFAULT_THEMES, DEFAULT_THEME_NAMES, getDefaultTheme, isDefaultTheme } from '../core/theme/default-themes';

// Export theme interfaces
export type { ThemeConfig, ThemeColors, ThemeName, ThemeMode, ThemeRegistry } from '../core/theme/theme.interface';

// Re-export for convenience
export * from '../core/theme/default-themes';