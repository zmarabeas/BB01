/**
 * Color interface for theme configuration
 */
export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight?: string;
  primaryDark?: string;
  
  // Secondary colors
  secondary: string;
  secondaryLight?: string;
  secondaryDark?: string;
  
  // Surface colors
  surface: string;
  surfaceLight?: string;
  surfaceDark?: string;
  
  // Background and text
  background: string;
  text: string;
  
  // Semantic colors
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  
  // Neutral colors
  neutral?: string;
  outline?: string;
  
  // Text variants
  textSecondary?: string;
  textDisabled?: string;
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  name: string;
  displayName: string;
  icon: string;
  description?: string;
  category?: string;
  author?: string;
  version?: string;
  colors: ThemeColors;
  
  // Optional theme metadata
  tags?: string[];
  isCustom?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Theme name type - can be extended for custom themes
 */
export type ThemeName = string;

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Theme registry interface
 */
export interface ThemeRegistry {
  [key: string]: ThemeConfig;
}

/**
 * Theme service configuration
 */
export interface ThemeServiceConfig {
  defaultTheme?: string;
  enableSystemMode?: boolean;
  persistTheme?: boolean;
  storageKey?: string;
  modeStorageKey?: string;
  validateThemes?: boolean;
  debug?: boolean;
  enableFallbacks?: boolean;
  strictMode?: boolean;
}

/**
 * CSS custom property update interface
 */
export interface CSSPropertyUpdate {
  property: string;
  value: string;
}

/**
 * Theme change event interface
 */
export interface ThemeChangeEvent {
  previousTheme: string;
  currentTheme: string;
  isDarkMode: boolean;
  timestamp: Date;
}