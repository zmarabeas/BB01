import { Injectable, signal, effect, computed, Inject, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { 
  ThemeConfig, 
  ThemeMode, 
  ThemeName, 
  ThemeRegistry, 
  ThemeServiceConfig,
  ThemeChangeEvent,
  CSSPropertyUpdate,
  ThemeValidationResult 
} from './theme.interface';
import { DEFAULT_THEMES } from './default-themes';

/**
 * Configuration token for ThemeService
 */
export const THEME_SERVICE_CONFIG = 'THEME_SERVICE_CONFIG';

/**
 * Enhanced theme service for managing application themes
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly config: ThemeServiceConfig;
  private readonly themeRegistry: ThemeRegistry = { ...DEFAULT_THEMES };
  
  // Storage keys
  private readonly THEME_KEY: string;
  private readonly MODE_KEY: string;
  
  // Reactive state
  readonly currentTheme = signal<ThemeName>('coastal');
  readonly isDarkMode = signal<boolean>(false);
  readonly themeMode = signal<ThemeMode>('light');
  
  // Computed values
  readonly currentThemeConfig = computed(() => this.getTheme(this.currentTheme()));
  readonly availableThemes = computed(() => Object.values(this.themeRegistry));
  readonly themeColors = computed(() => this.currentThemeConfig()?.colors);
  
  // Observables
  private readonly themeChangeSubject = new Subject<ThemeChangeEvent>();
  readonly themeChange$ = this.themeChangeSubject.asObservable();
  
  constructor(
    @Optional() @Inject(THEME_SERVICE_CONFIG) config?: ThemeServiceConfig
  ) {
    this.config = {
      defaultTheme: 'coastal',
      enableSystemMode: true,
      persistTheme: true,
      storageKey: 'bb-theme',
      modeStorageKey: 'bb-mode',
      validateThemes: true,
      debug: false,
      enableFallbacks: true,
      strictMode: false,
      ...config
    };
    
    this.THEME_KEY = this.config.storageKey!;
    this.MODE_KEY = this.config.modeStorageKey!;
    
    this.initialize();
  }
  
  private initialize(): void {
    this.logDebug('Initializing BB Foundation Theme Service');
    
    // Load saved preferences
    this.loadSavedPreferences();
    
    // Set up reactive CSS updates
    effect(() => {
      this.updateCSSVariables();
    });
    
    // Listen for system theme changes
    if (this.config.enableSystemMode && typeof window !== 'undefined') {
      this.setupSystemThemeListener();
    }
    
    // Force initial CSS application after DOM is ready
    if (typeof document !== 'undefined') {
      // Use setTimeout to ensure DOM is fully loaded
      setTimeout(() => {
        this.logDebug('Applying initial theme CSS variables');
        this.updateCSSVariables();
      }, 0);
    }
  }
  
  /**
   * Change the current theme
   */
  changeTheme(themeName: ThemeName): void {
    this.logDebug(`changeTheme called with: ${themeName}`);
    const previousTheme = this.currentTheme();
    
    if (!this.themeRegistry[themeName]) {
      const message = `Theme "${themeName}" not found in registry`;
      this.logError(message);
      this.logDebug('Available themes:', Object.keys(this.themeRegistry));
      
      if (this.config.enableFallbacks && themeName !== this.config.defaultTheme) {
        this.logDebug(`Falling back to default theme: ${this.config.defaultTheme}`);
        this.changeTheme(this.config.defaultTheme!);
      }
      return;
    }
    
    if (this.config.validateThemes) {
      const validation = this.validateTheme(this.themeRegistry[themeName]);
      if (!validation.isValid) {
        const message = 'Theme validation failed';
        this.logError(message, validation.errors);
        
        if (this.config.strictMode) {
          throw new Error(`${message}: ${validation.errors.join(', ')}`);
        }
        
        if (this.config.enableFallbacks && themeName !== this.config.defaultTheme) {
          this.logDebug(`Validation failed, falling back to default theme`);
          this.changeTheme(this.config.defaultTheme!);
        }
        return;
      }
    }
    
    try {
      this.currentTheme.set(themeName);
      
      if (this.config.persistTheme) {
        this.saveThemePreference(themeName);
      }
      
      this.logDebug(`Theme changed from ${previousTheme} to ${themeName}`);
      
      // Emit theme change event
      this.themeChangeSubject.next({
        previousTheme,
        currentTheme: themeName,
        isDarkMode: this.isDarkMode(),
        timestamp: new Date()
      });
    } catch (error) {
      this.logError('Failed to change theme', error);
      
      if (this.config.enableFallbacks && themeName !== this.config.defaultTheme) {
        this.logDebug('Attempting fallback to default theme');
        this.changeTheme(this.config.defaultTheme!);
      }
    }
  }
  
  /**
   * Toggle between light and dark mode
   */
  toggleDarkMode(): void {
    const currentMode = this.isDarkMode() ? 'dark' : 'light';
    const newMode: ThemeMode = this.isDarkMode() ? 'light' : 'dark';
    this.logDebug(`toggleDarkMode called: ${currentMode} -> ${newMode}`);
    this.setThemeMode(newMode);
  }
  
  /**
   * Set the theme mode (light, dark, or auto)
   */
  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    
    if (mode === 'auto') {
      this.checkSystemDarkMode();
    } else {
      this.isDarkMode.set(mode === 'dark');
    }
    
    if (this.config.persistTheme) {
      this.saveModePreference(mode);
    }
  }
  
  /**
   * Register a new theme
   */
  registerTheme(theme: ThemeConfig): void {
    if (this.config.validateThemes) {
      const validation = this.validateTheme(theme);
      if (!validation.isValid) {
        console.error('Theme registration failed:', validation.errors);
        return;
      }
    }
    
    this.themeRegistry[theme.name] = { ...theme };
  }
  
  /**
   * Register multiple themes
   */
  registerThemes(themes: ThemeRegistry): void {
    Object.values(themes).forEach(theme => {
      this.registerTheme(theme);
    });
  }
  
  /**
   * Unregister a theme
   */
  unregisterTheme(themeName: string): void {
    if (this.currentTheme() === themeName) {
      console.warn('Cannot unregister currently active theme');
      return;
    }
    
    delete this.themeRegistry[themeName];
  }
  
  /**
   * Get a specific theme configuration
   */
  getTheme(themeName: string): ThemeConfig | undefined {
    return this.themeRegistry[themeName];
  }
  
  /**
   * Get all available themes
   */
  getAllThemes(): ThemeConfig[] {
    return Object.values(this.themeRegistry);
  }
  
  /**
   * Apply a custom theme temporarily (not saved to registry)
   */
  applyCustomTheme(theme: ThemeConfig): void {
    const tempThemeName = `__temp_${Date.now()}`;
    const tempTheme = { ...theme, name: tempThemeName };
    
    this.registerTheme(tempTheme);
    this.changeTheme(tempThemeName);
  }
  
  /**
   * Reset to default theme
   */
  resetToDefault(): void {
    this.changeTheme(this.config.defaultTheme!);
    this.setThemeMode('light');
  }
  
  /**
   * Validate theme configuration
   */
  validateTheme(theme: ThemeConfig): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required fields
    if (!theme.name) errors.push('Theme name is required');
    if (!theme.displayName) errors.push('Display name is required');
    if (!theme.colors) errors.push('Colors configuration is required');
    
    // Color validation
    if (theme.colors) {
      const requiredColors = ['primary', 'secondary', 'surface', 'background', 'text'];
      requiredColors.forEach(color => {
        if (!theme.colors[color as keyof typeof theme.colors]) {
          errors.push(`Required color '${color}' is missing`);
        }
      });
      
      // Color format validation
      Object.entries(theme.colors).forEach(([key, value]) => {
        if (value && typeof value === 'string' && !this.isValidColor(value)) {
          errors.push(`Invalid color format for '${key}': ${value}`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Get current theme CSS custom properties
   */
  getThemeCustomProperties(): Record<string, string> {
    const theme = this.currentThemeConfig();
    if (!theme) return {};
    
    const properties: Record<string, string> = {};
    
    // Base theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value) {
        properties[`--bb-${key}`] = value;
      }
    });
    
    return properties;
  }
  
  private loadSavedPreferences(): void {
    if (!this.config.persistTheme || typeof localStorage === 'undefined') {
      return;
    }
    
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeName;
    const savedMode = localStorage.getItem(this.MODE_KEY) as ThemeMode;
    
    if (savedTheme && this.themeRegistry[savedTheme]) {
      this.currentTheme.set(savedTheme);
    } else {
      this.currentTheme.set(this.config.defaultTheme!);
    }
    
    if (savedMode) {
      this.themeMode.set(savedMode);
      if (savedMode === 'auto') {
        this.checkSystemDarkMode();
      } else {
        this.isDarkMode.set(savedMode === 'dark');
      }
    } else {
      this.checkSystemDarkMode();
    }
  }
  
  private saveThemePreference(themeName: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, themeName);
    }
  }
  
  private saveModePreference(mode: ThemeMode): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.MODE_KEY, mode);
    }
  }
  
  private checkSystemDarkMode(): void {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      
      if (this.themeMode() === 'auto') {
        // Don't change themeMode, keep it as 'auto'
      } else {
        this.themeMode.set(prefersDark ? 'dark' : 'light');
      }
    }
  }
  
  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (this.themeMode() === 'auto') {
        this.isDarkMode.set(e.matches);
      }
    });
  }
  
  private updateCSSVariables(): void {
    if (typeof document === 'undefined') return;
    
    try {
      const theme = this.currentThemeConfig();
      if (!theme) {
        this.logWarn('No theme configuration found, skipping CSS update');
        return;
      }
      
      const isDark = this.isDarkMode();
      const root = document.documentElement;
      
      this.logDebug(`Updating CSS variables for theme: ${theme.name}, dark mode: ${isDark}`);
      
      // Batch CSS updates for performance
      const updates = this.calculateCSSUpdates(theme, isDark);
      this.applyCSSUpdates(updates);
      
      // Update document classes and attributes
      root.classList.toggle('bb-dark', isDark);
      root.classList.toggle('bb-light', !isDark);
      root.setAttribute('data-bb-theme', theme.name);
      
      if (document.body) {
        document.body.classList.toggle('bb-dark', isDark);
        document.body.classList.toggle('bb-light', !isDark);
      }
      
      this.logDebug(`CSS variables updated successfully`);
    } catch (error) {
      this.recoverFromError(error, 'updateCSSVariables');
    }
  }
  
  private calculateCSSUpdates(theme: ThemeConfig, isDark: boolean): CSSPropertyUpdate[] {
    const updates: CSSPropertyUpdate[] = [];
    
    // Base theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value) {
        updates.push({ property: `--bb-${key}`, value });
      }
    });
    
    // Mode-specific overrides
    if (isDark) {
      updates.push(
        { property: '--bb-background', value: '#121212' },
        { property: '--bb-surface', value: '#1e1e1e' },
        { property: '--bb-surfaceLight', value: '#2d2d2d' },
        { property: '--bb-surfaceDark', value: '#0a0a0a' },
        { property: '--bb-text', value: '#ffffff' },
        { property: '--bb-textSecondary', value: '#b0b0b0' },
        { property: '--bb-textDisabled', value: '#666666' },
        { property: '--bb-outline', value: '#424242' },
        { property: '--bb-outline-variant', value: '#5a5a5a' },
        { property: '--bb-neutral-800', value: '#2d2d2d' },
        { property: '--bb-tech', value: theme.colors.secondary || '#06b6d4' }
      );
    } else {
      updates.push(
        { property: '--bb-background', value: theme.colors.background },
        { property: '--bb-surface', value: theme.colors.surface },
        { property: '--bb-text', value: theme.colors.text },
        { property: '--bb-textSecondary', value: '#757575' },
        { property: '--bb-textDisabled', value: '#bdbdbd' },
        { property: '--bb-outline', value: '#e0e0e0' },
        { property: '--bb-outline-variant', value: '#c4c4c4' },
        { property: '--bb-neutral-800', value: '#424242' },
        { property: '--bb-tech', value: theme.colors.secondary || '#06b6d4' }
      );
    }
    
    // Add common design tokens that may be missing
    updates.push(
      // Shadow and glow effects
      { property: '--bb-glow-primary', value: `0 0 20px ${theme.colors.primary}20` },
      { property: '--bb-shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
      { property: '--bb-shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      { property: '--bb-shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
      { property: '--bb-shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
      { property: '--bb-shadow-2xl', value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
      { property: '--bb-card-shadow', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' },
      { property: '--bb-card-shadow-hover', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      { property: '--bb-dropdown-shadow', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
      { property: '--bb-modal-shadow', value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
      { property: '--bb-tooltip-shadow', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      
      // Typography
      { property: '--bb-font-weight-medium', value: '500' },
      { property: '--bb-font-weight-semibold', value: '600' },
      
      // Transitions
      { property: '--bb-card-transition', value: 'all 0.2s ease-in-out' }
    );
    
    return updates;
  }
  
  private applyCSSUpdates(updates: CSSPropertyUpdate[]): void {
    requestAnimationFrame(() => {
      try {
        const root = document.documentElement;
        let successCount = 0;
        let errorCount = 0;
        
        updates.forEach(({ property, value }) => {
          try {
            root.style.setProperty(property, value);
            successCount++;
          } catch (error) {
            this.logWarn(`Failed to set CSS property ${property}: ${value}`, error);
            errorCount++;
          }
        });
        
        this.logDebug(`Applied ${successCount} CSS properties, ${errorCount} failed`);
        
        if (errorCount > 0 && this.config.strictMode) {
          throw new Error(`Failed to apply ${errorCount} CSS properties`);
        }
      } catch (error) {
        this.recoverFromError(error, 'applyCSSUpdates');
      }
    });
  }
  
  private isValidColor(color: string): boolean {
    try {
      const style = new Option().style;
      style.color = color;
      return style.color !== '';
    } catch {
      return false;
    }
  }
  
  /**
   * Enhanced logging methods with debug support
   */
  private logDebug(message: string, ...args: any[]): void {
    if (this.config.debug) {
      console.log(`[BB Foundation Debug] ${message}`, ...args);
    }
  }
  
  private logError(message: string, ...args: any[]): void {
    console.error(`[BB Foundation Error] ${message}`, ...args);
  }
  
  private logWarn(message: string, ...args: any[]): void {
    console.warn(`[BB Foundation Warning] ${message}`, ...args);
  }
  
  /**
   * Enhanced error recovery methods
   */
  private recoverFromError(error: any, context: string): void {
    this.logError(`Error in ${context}`, error);
    
    if (this.config.enableFallbacks) {
      this.logDebug(`Attempting error recovery for ${context}`);
      
      // Reset to default theme if current theme is corrupted
      if (this.currentTheme() !== this.config.defaultTheme) {
        this.logDebug('Resetting to default theme due to error');
        this.currentTheme.set(this.config.defaultTheme!);
      }
      
      // Reset to light mode if dark mode is causing issues
      if (this.isDarkMode()) {
        this.logDebug('Disabling dark mode due to error');
        this.isDarkMode.set(false);
        this.themeMode.set('light');
      }
    }
  }
  
  /**
   * Validate system state and recover if needed (public API)
   */
  validateSystemState(): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check if current theme exists
    if (!this.themeRegistry[this.currentTheme()]) {
      issues.push(`Current theme "${this.currentTheme()}" not found in registry`);
    }
    
    // Check if default theme exists
    if (!this.themeRegistry[this.config.defaultTheme!]) {
      issues.push(`Default theme "${this.config.defaultTheme}" not found in registry`);
    }
    
    // Check if CSS custom properties are being applied
    if (typeof document !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const primaryColor = rootStyle.getPropertyValue('--bb-primary');
      if (!primaryColor) {
        issues.push('CSS custom properties not detected - theme may not be applying');
      }
    }
    
    const isValid = issues.length === 0;
    
    if (!isValid) {
      this.logWarn('System state validation failed', issues);
      
      if (this.config.enableFallbacks) {
        this.logDebug('Attempting system state recovery');
        this.recoverFromError(new Error('System state validation failed'), 'validateSystemState');
      }
    }
    
    return { isValid, issues };
  }
}