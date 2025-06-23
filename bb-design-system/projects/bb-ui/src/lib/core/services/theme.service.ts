import { Injectable } from '@angular/core';

// Component variant types
export type ComponentVariant = 
  | 'primary'    // Default brand color
  | 'secondary'  // Secondary brand color
  | 'tech'       // Signature tech accent
  | 'outline'    // Outlined style
  | 'ghost'      // Minimal style
  | 'danger'     // Error/destructive actions
  | 'success'    // Success states
  | 'warning';   // Warning states

// Component size types
export type ComponentSize = 
  | 'small'   // Compact for dense layouts
  | 'medium'  // Default size
  | 'large';  // Prominent for important actions

// Theme configuration interface
export interface BBThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    tech: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
  spacing: {
    padding: string;
    margin: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BBThemeService {
  private currentTheme: BBThemeConfig = this.getDefaultTheme();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Get the default theme configuration
   */
  private getDefaultTheme(): BBThemeConfig {
    return {
      colors: {
        primary: 'var(--bb-primary-500)',
        secondary: 'var(--bb-secondary-500)',
        tech: 'var(--bb-tech-500)',
        success: 'var(--bb-success-500)',
        warning: 'var(--bb-warning-500)',
        error: 'var(--bb-error-500)'
      },
      typography: {
        fontFamily: 'var(--bb-font-family-sans)',
        fontSize: 'var(--bb-text-base)',
        fontWeight: 'var(--bb-font-medium)'
      },
      spacing: {
        padding: 'var(--bb-component-padding-md)',
        margin: 'var(--bb-component-margin-md)'
      },
      animations: {
        duration: 'var(--bb-duration-200)',
        easing: 'var(--bb-ease-out)'
      }
    };
  }

  /**
   * Initialize the theme system
   */
  private initializeTheme(): void {
    // Load saved theme from localStorage if available
    const savedTheme = localStorage.getItem('bb-theme');
    if (savedTheme) {
      try {
        this.currentTheme = { ...this.getDefaultTheme(), ...JSON.parse(savedTheme) };
        this.applyTheme();
      } catch (error) {
        console.warn('Failed to load saved theme, using default:', error);
      }
    }
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    const root = document.documentElement;
    
    // Apply color tokens
    Object.entries(this.currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--bb-${key}`, value);
    });

    // Apply typography tokens
    Object.entries(this.currentTheme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--bb-${key}`, value);
    });

    // Apply spacing tokens
    Object.entries(this.currentTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--bb-${key}`, value);
    });

    // Apply animation tokens
    Object.entries(this.currentTheme.animations).forEach(([key, value]) => {
      root.style.setProperty(`--bb-${key}`, value);
    });
  }

  /**
   * Update the theme configuration
   */
  updateTheme(config: Partial<BBThemeConfig>): void {
    this.currentTheme = { ...this.currentTheme, ...config };
    this.applyTheme();
    
    // Save to localStorage
    localStorage.setItem('bb-theme', JSON.stringify(this.currentTheme));
  }

  /**
   * Reset theme to default
   */
  resetTheme(): void {
    this.currentTheme = this.getDefaultTheme();
    this.applyTheme();
    localStorage.removeItem('bb-theme');
  }

  /**
   * Get computed classes for a component based on variant and size
   */
  getComponentClasses(variant: ComponentVariant, size: ComponentSize): string {
    const baseClasses = 'bb-component';
    const variantClasses = `bb-component--${variant}`;
    const sizeClasses = `bb-component--${size}`;
    
    return `${baseClasses} ${variantClasses} ${sizeClasses}`.trim();
  }

  /**
   * Get button-specific classes
   */
  getButtonClasses(variant: ComponentVariant, size: ComponentSize): string {
    const baseClasses = 'bb-button';
    const variantClasses = `bb-button--${variant}`;
    const sizeClasses = `bb-button--${size}`;
    
    return `${baseClasses} ${variantClasses} ${sizeClasses}`.trim();
  }

  /**
   * Get input-specific classes
   */
  getInputClasses(variant: ComponentVariant, size: ComponentSize): string {
    const baseClasses = 'bb-input';
    const variantClasses = `bb-input--${variant}`;
    const sizeClasses = `bb-input--${size}`;
    
    return `${baseClasses} ${variantClasses} ${sizeClasses}`.trim();
  }

  /**
   * Get card-specific classes
   */
  getCardClasses(variant: 'default' | 'elevated' | 'outlined'): string {
    const baseClasses = 'bb-card';
    const variantClasses = `bb-card--${variant}`;
    
    return `${baseClasses} ${variantClasses}`.trim();
  }

  /**
   * Get color value for a variant
   */
  getColorForVariant(variant: ComponentVariant): string {
    const colorMap: Record<ComponentVariant, string> = {
      primary: this.currentTheme.colors.primary,
      secondary: this.currentTheme.colors.secondary,
      tech: this.currentTheme.colors.tech,
      outline: 'transparent',
      ghost: 'transparent',
      danger: this.currentTheme.colors.error,
      success: this.currentTheme.colors.success,
      warning: this.currentTheme.colors.warning
    };

    return colorMap[variant] || this.currentTheme.colors.primary;
  }

  /**
   * Get background color for a variant
   */
  getBackgroundColorForVariant(variant: ComponentVariant): string {
    const bgColorMap: Record<ComponentVariant, string> = {
      primary: this.currentTheme.colors.primary,
      secondary: this.currentTheme.colors.secondary,
      tech: this.currentTheme.colors.tech,
      outline: 'transparent',
      ghost: 'transparent',
      danger: this.currentTheme.colors.error,
      success: this.currentTheme.colors.success,
      warning: this.currentTheme.colors.warning
    };

    return bgColorMap[variant] || this.currentTheme.colors.primary;
  }

  /**
   * Get border color for a variant
   */
  getBorderColorForVariant(variant: ComponentVariant): string {
    const borderColorMap: Record<ComponentVariant, string> = {
      primary: this.currentTheme.colors.primary,
      secondary: this.currentTheme.colors.secondary,
      tech: this.currentTheme.colors.tech,
      outline: this.currentTheme.colors.primary,
      ghost: 'transparent',
      danger: this.currentTheme.colors.error,
      success: this.currentTheme.colors.success,
      warning: this.currentTheme.colors.warning
    };

    return borderColorMap[variant] || 'transparent';
  }

  /**
   * Get text color for a variant
   */
  getTextColorForVariant(variant: ComponentVariant): string {
    const textColorMap: Record<ComponentVariant, string> = {
      primary: 'var(--bb-surface)',
      secondary: 'var(--bb-surface)',
      tech: 'var(--bb-surface)',
      outline: this.currentTheme.colors.primary,
      ghost: this.currentTheme.colors.primary,
      danger: 'var(--bb-surface)',
      success: 'var(--bb-surface)',
      warning: 'var(--bb-surface)'
    };

    return textColorMap[variant] || 'var(--bb-surface)';
  }

  /**
   * Get current theme configuration
   */
  getCurrentTheme(): BBThemeConfig {
    return { ...this.currentTheme };
  }

  /**
   * Toggle between light and dark mode
   */
  toggleDarkMode(): void {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bb-color-scheme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bb-color-scheme', 'dark');
    }
  }

  /**
   * Set color scheme (light/dark)
   */
  setColorScheme(scheme: 'light' | 'dark' | 'auto'): void {
    const root = document.documentElement;
    
    // Remove existing classes
    root.classList.remove('light', 'dark');
    
    if (scheme === 'auto') {
      // Let CSS media query handle it
      localStorage.removeItem('bb-color-scheme');
    } else {
      root.classList.add(scheme);
      localStorage.setItem('bb-color-scheme', scheme);
    }
  }

  /**
   * Get current color scheme
   */
  getColorScheme(): 'light' | 'dark' | 'auto' {
    const saved = localStorage.getItem('bb-color-scheme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'auto';
  }
} 