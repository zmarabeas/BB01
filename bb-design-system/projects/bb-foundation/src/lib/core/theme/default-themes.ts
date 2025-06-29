import { ThemeConfig, ThemeRegistry } from './theme.interface';

/**
 * Default theme configurations for the B01 foundation
 */
export const DEFAULT_THEMES: ThemeRegistry = {
  coastal: {
    name: 'coastal',
    displayName: '🌊 Coastal',
    icon: '🌊',
    description: 'Ocean-inspired blues and natural tones for a calming interface',
    category: 'nature',
    colors: {
      primary: '#1b9aaa',    // Blue Munsell
      primaryLight: '#4db6c7',
      primaryDark: '#006d7a',
      secondary: '#dddbcb',  // Bone
      secondaryLight: '#f0eee0',
      secondaryDark: '#c4c2b2',
      surface: '#f5f1e3',    // Old Lace  
      surfaceLight: '#faf8f0',
      surfaceDark: '#e8e4d6',
      neutral: '#dddbcb',    // Bone
      text: '#050505',       // Black
      background: '#ffffff',  // White
      error: '#d32f2f',
      warning: '#f57c00',
      success: '#388e3c',
      info: '#1976d2',
      outline: '#e0e0e0',
      textSecondary: '#757575',
      textDisabled: '#bdbdbd'
    }
  },
  
  icarus: {
    name: 'icarus',
    displayName: '☀️ Icarus',
    icon: '☀️',
    description: 'Warm golden yellows with earthy tones for an energetic feel',
    category: 'warm',
    colors: {
      primary: '#f0a202',    // Gamboge (Golden Yellow)
      primaryLight: '#ffb74d',
      primaryDark: '#c17900',
      secondary: '#a15e49',  // Redwood
      secondaryLight: '#c17a5f',
      secondaryDark: '#7d4535',
      surface: '#aedcc0',    // Celadon (Light Green)
      surfaceLight: '#c8e8d4',
      surfaceDark: '#8fc4a3',
      neutral: '#ac8887',    // Rosy Brown
      text: '#373d20',       // Drab Dark Brown
      background: '#ffffff',  // White
      error: '#d32f2f',
      warning: '#f57c00',
      success: '#388e3c',
      info: '#1976d2',
      outline: '#d0d0d0',
      textSecondary: '#5a5a5a',
      textDisabled: '#a0a0a0'
    }
  },
  
  'midnight-lightning': {
    name: 'midnight-lightning',
    displayName: '⚡ Midnight Lightning',
    icon: '⚡',
    description: 'Electric purples with bright yellow accents for a dynamic interface',
    category: 'electric',
    colors: {
      primary: '#52489c',    // Ultra Violet
      primaryLight: '#7b6fb3',
      primaryDark: '#3a2f7a',
      secondary: '#ffc145',  // Xanthous (Bright Yellow)
      secondaryLight: '#ffd54f',
      secondaryDark: '#f57f17',
      surface: '#d5dfe5',    // Alice Blue
      surfaceLight: '#e8f0f6',
      surfaceDark: '#b8c8d1',
      neutral: '#542e71',    // Eminence (Purple)
      text: '#0c0f0a',       // Night (Almost Black)
      background: '#ffffff',  // White
      error: '#d32f2f',
      warning: '#f57c00',
      success: '#388e3c',
      info: '#1976d2',
      outline: '#d5dfe5',
      textSecondary: '#666666',
      textDisabled: '#999999'
    }
  },
  
  'future-house': {
    name: 'future-house',
    displayName: '🏡 Future House',
    icon: '🏡',
    description: 'Professional blues with warm accents for modern applications',
    category: 'professional',
    colors: {
      primary: '#0b3954',    // Prussian Blue
      primaryLight: '#1e5a7a',
      primaryDark: '#052a3a',
      secondary: '#bf4e30',  // Jasper (Red-Orange)
      secondaryLight: '#d17a5f',
      secondaryDark: '#a03a24',
      surface: '#f2efc7',    // Lemon Chiffon
      surfaceLight: '#f8f6d9',
      surfaceDark: '#e6e3b5',
      neutral: '#5c7457',    // Reseda Green
      text: '#2c5530',       // Cal Poly Green
      background: '#ffffff',  // White
      error: '#d32f2f',
      warning: '#f57c00',
      success: '#388e3c',
      info: '#1976d2',
      outline: '#e0e0e0',
      textSecondary: '#4a5c4a',
      textDisabled: '#a5a5a5'
    }
  },
  
  'wedding-adjacent': {
    name: 'wedding-adjacent',
    displayName: '💒 Wedding Adjacent',
    icon: '💒',
    description: 'Elegant greens and lavenders for sophisticated interfaces',
    category: 'elegant',
    colors: {
      primary: '#538083',    // Myrtle Green
      primaryLight: '#7ba0a3',
      primaryDark: '#3a5a5d',
      secondary: '#2a7f62',  // Viridian
      secondaryLight: '#4a9f82',
      secondaryDark: '#1e5a42',
      surface: '#dfd9e2',    // Lavender Web
      surfaceLight: '#f0ecf3',
      surfaceDark: '#c8c0c9',
      neutral: '#c3acce',    // Lilac
      text: '#89909f',       // Cool Gray
      background: '#ffffff',  // White
      error: '#d32f2f',
      warning: '#f57c00',
      success: '#388e3c',
      info: '#1976d2',
      outline: '#dfd9e2',
      textSecondary: '#a0a7b0',
      textDisabled: '#c0c7d0'
    }
  }
};

/**
 * Get all default theme names
 */
export const DEFAULT_THEME_NAMES = Object.keys(DEFAULT_THEMES);

/**
 * Get default theme by name
 */
export function getDefaultTheme(name: string): ThemeConfig | undefined {
  return DEFAULT_THEMES[name];
}

/**
 * Check if a theme name is a default theme
 */
export function isDefaultTheme(name: string): boolean {
  return name in DEFAULT_THEMES;
}