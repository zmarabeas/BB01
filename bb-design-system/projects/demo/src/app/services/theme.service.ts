import { Injectable, signal, effect } from '@angular/core';
import { THEMES, ThemeName, ThemeMode, ThemeConfig } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'demo-theme';
  private readonly MODE_KEY = 'demo-mode';

  // Signals for reactive theme management
  currentTheme = signal<ThemeName>('coastal');
  isDarkMode = signal<boolean>(false);
  themeMode = signal<ThemeMode>('light');

  constructor() {
    // Load saved preferences from localStorage
    this.loadSavedPreferences();
    
    // Effect to update CSS variables when theme or mode changes
    effect(() => {
      this.updateCSSVariables();
    });
  }

  private loadSavedPreferences(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeName;
    const savedMode = localStorage.getItem(this.MODE_KEY) as ThemeMode;
    
    if (savedTheme && THEMES[savedTheme]) {
      this.currentTheme.set(savedTheme);
    }
    
    if (savedMode) {
      this.themeMode.set(savedMode);
      this.isDarkMode.set(savedMode === 'dark');
    } else {
      // Check system preference for dark mode
      this.checkSystemDarkMode();
    }
  }

  private checkSystemDarkMode(): void {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      this.themeMode.set(prefersDark ? 'dark' : 'light');
    }
  }

  changeTheme(themeName: ThemeName): void {
    if (THEMES[themeName]) {
      this.currentTheme.set(themeName);
      localStorage.setItem(this.THEME_KEY, themeName);
    }
  }

  toggleDarkMode(): void {
    const newMode = this.isDarkMode() ? 'light' : 'dark';
    this.isDarkMode.set(!this.isDarkMode());
    this.themeMode.set(newMode);
    localStorage.setItem(this.MODE_KEY, newMode);
  }

  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    
    if (mode === 'auto') {
      this.checkSystemDarkMode();
    } else {
      this.isDarkMode.set(mode === 'dark');
    }
    
    localStorage.setItem(this.MODE_KEY, mode);
  }

  getCurrentTheme(): ThemeConfig {
    return THEMES[this.currentTheme()];
  }

  getAllThemes(): ThemeConfig[] {
    return Object.values(THEMES);
  }

  private updateCSSVariables(): void {
    if (typeof document === 'undefined') return;

    const theme = this.getCurrentTheme();
    const isDark = this.isDarkMode();
    const root = document.documentElement;
    const body = document.body;

    // Apply all theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // Apply dark mode adjustments
    if (isDark) {
      // Dark mode color overrides
      root.style.setProperty('--background', '#121212');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--surface', '#1e1e1e');
      root.style.setProperty('--surfaceLight', '#2d2d2d');
      root.style.setProperty('--surfaceDark', '#0a0a0a');
      root.style.setProperty('--neutral', '#424242');
      
      // Material Design dark mode colors
      root.style.setProperty('--mat-background-color', '#121212');
      root.style.setProperty('--mat-card-background-color', '#1e1e1e');
      root.style.setProperty('--mat-toolbar-background-color', '#2d2d2d');
      root.style.setProperty('--mat-hover-color', '#2a2a2a');
      root.style.setProperty('--mat-text-color', '#ffffff');
      root.style.setProperty('--mat-text-secondary', '#b0b0b0');
      root.style.setProperty('--mat-text-disabled', '#666666');
      root.style.setProperty('--mat-divider-color', '#424242');
      
      // Dark mode Material colors
      root.style.setProperty('--mat-primary-color', '#90caf9');
      root.style.setProperty('--mat-primary-dark', '#42a5f5');
      root.style.setProperty('--mat-accent-color', '#ffab91');
      root.style.setProperty('--mat-warn-color', '#ef5350');
      root.style.setProperty('--mat-warning-color', '#ffb74d');
    } else {
      // Light mode Material colors
      root.style.setProperty('--mat-background-color', '#fafafa');
      root.style.setProperty('--mat-card-background-color', '#ffffff');
      root.style.setProperty('--mat-toolbar-background-color', '#f5f5f5');
      root.style.setProperty('--mat-hover-color', '#f0f0f0');
      root.style.setProperty('--mat-text-color', '#212121');
      root.style.setProperty('--mat-text-secondary', '#757575');
      root.style.setProperty('--mat-text-disabled', '#bdbdbd');
      root.style.setProperty('--mat-divider-color', '#e0e0e0');
      
      // Light mode Material colors
      root.style.setProperty('--mat-primary-color', theme.colors.primary);
      root.style.setProperty('--mat-primary-dark', theme.colors.primaryDark || theme.colors.primary);
      root.style.setProperty('--mat-accent-color', theme.colors.secondary);
      root.style.setProperty('--mat-warn-color', theme.colors.error || '#f44336');
      root.style.setProperty('--mat-warning-color', theme.colors.warning || '#ff9800');
    }

    // Update document class for global styling
    root.classList.toggle('dark', isDark);
    body.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', theme.name);
  }
} 