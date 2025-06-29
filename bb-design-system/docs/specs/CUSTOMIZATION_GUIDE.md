# B01 Foundation Customization Guide

## Overview

This guide covers all aspects of customizing the B01 Material Design theme foundation for your specific project needs. Learn how to create custom themes, modify existing ones, and extend the foundation with project-specific requirements.

## Customization Levels

### 1. Token Override (Easiest)
Override design tokens to quickly customize colors, spacing, typography, etc.

### 2. Theme Creation (Moderate)
Create completely new theme configurations with custom color palettes.

### 3. Component Extension (Advanced)
Extend the foundation with custom components and styling patterns.

### 4. Foundation Modification (Expert)
Modify the core foundation for specialized requirements.

## Token Override Customization

### Color Token Override

#### Basic Color Override
```scss
// custom-overrides.scss
:root {
  // Override primary color palette
  --bb-primary-500: #6366f1;  // Your brand primary
  --bb-primary-400: #8b5cf6;  // Lighter variant
  --bb-primary-600: #4f46e5;  // Darker variant
  
  // Override secondary colors
  --bb-secondary-500: #f59e0b;
  --bb-secondary-400: #fbbf24;
  --bb-secondary-600: #d97706;
  
  // Override semantic colors
  --bb-success: #10b981;
  --bb-warning: #f59e0b;
  --bb-error: #ef4444;
  --bb-info: #06b6d4;
}
```

#### Project-Specific Color System
```scss
// brand-colors.scss
:root {
  // Brand color palette
  --brand-primary: #1a365d;    // Navy blue
  --brand-secondary: #2d3748;  // Charcoal
  --brand-accent: #ed8936;     // Orange
  --brand-neutral: #e2e8f0;    // Light gray
  
  // Map brand colors to foundation tokens
  --bb-primary: var(--brand-primary);
  --bb-secondary: var(--brand-secondary);
  --bb-tech: var(--brand-accent);
  --bb-surface: var(--brand-neutral);
  
  // Computed variations
  --bb-primaryLight: color-mix(in srgb, var(--brand-primary) 70%, white);
  --bb-primaryDark: color-mix(in srgb, var(--brand-primary) 80%, black);
}
```

### Typography Customization

#### Font Family Override
```scss
// custom-typography.scss
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  // Override font families
  --bb-font-family-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --bb-font-family-display: 'Poppins', sans-serif;
  --bb-font-family-mono: 'Fira Code', 'JetBrains Mono', monospace;
  
  // Custom font weights
  --bb-font-light: 300;
  --bb-font-normal: 400;
  --bb-font-medium: 500;
  --bb-font-semibold: 600;
  --bb-font-bold: 700;
  
  // Custom font sizes for your brand
  --bb-text-xs: 0.75rem;   // 12px
  --bb-text-sm: 0.875rem;  // 14px
  --bb-text-base: 1rem;    // 16px
  --bb-text-lg: 1.25rem;   // 20px
  --bb-text-xl: 1.5rem;    // 24px
  --bb-text-2xl: 2rem;     // 32px
  --bb-text-3xl: 2.5rem;   // 40px
}
```

#### Typography Scale Customization
```scss
// Define custom typography scale
:root {
  // Modular scale with 1.25 ratio
  --bb-text-xs: 0.64rem;    // 10.24px
  --bb-text-sm: 0.8rem;     // 12.8px
  --bb-text-base: 1rem;     // 16px
  --bb-text-lg: 1.25rem;    // 20px
  --bb-text-xl: 1.563rem;   // 25.008px
  --bb-text-2xl: 1.953rem;  // 31.248px
  --bb-text-3xl: 2.441rem;  // 39.056px
  
  // Custom line heights
  --bb-leading-tight: 1.2;
  --bb-leading-normal: 1.5;
  --bb-leading-relaxed: 1.75;
}
```

### Spacing Customization

#### Custom Spacing Scale
```scss
// custom-spacing.scss
:root {
  // Custom spacing based on 8px grid
  --bb-space-0: 0;
  --bb-space-1: 0.125rem;  // 2px
  --bb-space-2: 0.25rem;   // 4px
  --bb-space-3: 0.5rem;    // 8px
  --bb-space-4: 0.75rem;   // 12px
  --bb-space-5: 1rem;      // 16px
  --bb-space-6: 1.5rem;    // 24px
  --bb-space-8: 2rem;      // 32px
  --bb-space-10: 2.5rem;   // 40px
  --bb-space-12: 3rem;     // 48px
  --bb-space-16: 4rem;     // 64px
  
  // Component-specific spacing
  --bb-component-padding-xs: var(--bb-space-2) var(--bb-space-3);
  --bb-component-padding-sm: var(--bb-space-3) var(--bb-space-4);
  --bb-component-padding-md: var(--bb-space-4) var(--bb-space-6);
  --bb-component-padding-lg: var(--bb-space-6) var(--bb-space-8);
}
```

## Theme Creation

### Creating Custom Themes

#### Basic Theme Configuration
```typescript
// themes/corporate-theme.ts
import { ThemeConfig } from '@bb/foundation';

export const corporateTheme: ThemeConfig = {
  name: 'corporate',
  displayName: '🏢 Corporate',
  icon: '🏢',
  description: 'Professional corporate styling with trust-building colors',
  category: 'business',
  author: 'Your Organization',
  version: '1.0.0',
  colors: {
    // Primary corporate blue
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    primaryDark: '#1e3a8a',
    
    // Secondary neutral
    secondary: '#64748b',
    secondaryLight: '#94a3b8',
    secondaryDark: '#475569',
    
    // Professional surface colors
    surface: '#ffffff',
    surfaceLight: '#f8fafc',
    surfaceDark: '#f1f5f9',
    
    // Background and text
    background: '#fafafa',
    text: '#1e293b',
    
    // Semantic colors
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',
    info: '#0284c7',
    
    // Neutral colors
    neutral: '#6b7280'
  }
};
```

#### Creative Theme Configuration
```typescript
// themes/creative-theme.ts
export const creativeTheme: ThemeConfig = {
  name: 'creative',
  displayName: '🎨 Creative',
  icon: '🎨',
  description: 'Vibrant and inspiring colors for creative projects',
  colors: {
    // Vibrant purple primary
    primary: '#7c3aed',
    primaryLight: '#8b5cf6',
    primaryDark: '#6d28d9',
    
    // Complementary orange
    secondary: '#f59e0b',
    secondaryLight: '#fbbf24',
    secondaryDark: '#d97706',
    
    // Creative surfaces
    surface: '#fefefe',
    surfaceLight: '#faf5ff',
    surfaceDark: '#f3f4f6',
    
    background: '#fafafa',
    text: '#111827',
    
    // Creative semantic colors
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0891b2',
    
    neutral: '#9ca3af'
  }
};
```

### Dynamic Theme Generation

#### Color Palette Generator
```typescript
// utils/theme-generator.ts
import { ThemeConfig, ThemeColors } from '@bb/foundation';

export class ThemeGenerator {
  /**
   * Generate a complete theme from a primary color
   */
  static generateFromPrimaryColor(
    primaryColor: string,
    themeName: string,
    displayName: string
  ): ThemeConfig {
    const colors = this.generateColorPalette(primaryColor);
    
    return {
      name: themeName,
      displayName,
      icon: '🎨',
      description: `Auto-generated theme from ${primaryColor}`,
      colors
    };
  }
  
  /**
   * Generate harmonious color palette
   */
  private static generateColorPalette(primaryColor: string): ThemeColors {
    // Convert hex to HSL for manipulation
    const hsl = this.hexToHsl(primaryColor);
    
    return {
      primary: primaryColor,
      primaryLight: this.adjustLightness(primaryColor, 20),
      primaryDark: this.adjustLightness(primaryColor, -20),
      
      // Generate complementary secondary color
      secondary: this.getComplementaryColor(primaryColor),
      secondaryLight: this.adjustLightness(this.getComplementaryColor(primaryColor), 20),
      secondaryDark: this.adjustLightness(this.getComplementaryColor(primaryColor), -20),
      
      // Neutral surfaces
      surface: '#ffffff',
      surfaceLight: '#f8fafc',
      surfaceDark: '#f1f5f9',
      
      background: '#fafafa',
      text: '#1f2937',
      
      // Standard semantic colors
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0284c7',
      
      neutral: '#6b7280'
    };
  }
  
  private static hexToHsl(hex: string): { h: number; s: number; l: number } {
    // Implementation for hex to HSL conversion
    // ... color conversion logic
  }
  
  private static adjustLightness(color: string, percent: number): string {
    // Implementation for lightness adjustment
    // ... color manipulation logic
  }
  
  private static getComplementaryColor(color: string): string {
    // Implementation for complementary color generation
    // ... complementary color logic
  }
}
```

#### Usage Example
```typescript
// Using the theme generator
const brandColor = '#6366f1';
const customTheme = ThemeGenerator.generateFromPrimaryColor(
  brandColor,
  'brand-generated',
  '🚀 Brand Generated'
);

// Register the generated theme
themeService.registerTheme(customTheme);
```

## Component Extension

### Custom Component Theming

#### Themed Button Component
```typescript
// components/themed-button.component.ts
@Component({
  selector: 'bb-button',
  template: `
    <button 
      [class]="computedClasses"
      [disabled]="disabled"
      (click)="onClick($event)">
      
      <mat-icon *ngIf="icon && iconPosition === 'left'">{{ icon }}</mat-icon>
      
      <span class="button-content">
        <ng-content></ng-content>
      </span>
      
      <mat-icon *ngIf="icon && iconPosition === 'right'">{{ icon }}</mat-icon>
      
      <mat-spinner 
        *ngIf="loading" 
        class="button-spinner"
        diameter="16">
      </mat-spinner>
    </button>
  `,
  styleUrls: ['./themed-button.component.scss']
})
export class ThemedButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  
  @Output() buttonClick = new EventEmitter<MouseEvent>();
  
  private themeService = inject(ThemeService);
  
  get computedClasses(): string {
    return [
      'bb-button',
      `bb-button--${this.variant}`,
      `bb-button--${this.size}`,
      this.fullWidth ? 'bb-button--full-width' : '',
      this.loading ? 'bb-button--loading' : '',
      this.themeService.isDarkMode() ? 'bb-dark' : ''
    ].filter(Boolean).join(' ');
  }
  
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
```

#### Component Styles
```scss
// themed-button.component.scss
.bb-button {
  // Base button styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--bb-space-2);
  
  border: none;
  border-radius: var(--bb-radius-md);
  font-family: var(--bb-font-family-sans);
  font-weight: var(--bb-font-medium);
  
  transition: var(--bb-transition-normal);
  cursor: pointer;
  position: relative;
  
  // Prevent text selection
  user-select: none;
  
  // Focus styles
  &:focus {
    outline: 2px solid var(--bb-primary);
    outline-offset: 2px;
  }
  
  // Size variants
  &--sm {
    padding: var(--bb-space-2) var(--bb-space-3);
    font-size: var(--bb-text-sm);
    min-height: 32px;
  }
  
  &--md {
    padding: var(--bb-space-3) var(--bb-space-4);
    font-size: var(--bb-text-base);
    min-height: 40px;
  }
  
  &--lg {
    padding: var(--bb-space-4) var(--bb-space-6);
    font-size: var(--bb-text-lg);
    min-height: 48px;
  }
  
  // Variant styles
  &--primary {
    background-color: var(--bb-primary);
    color: var(--bb-surface);
    
    &:hover:not(:disabled) {
      background-color: var(--bb-primaryDark);
      box-shadow: var(--bb-glow-primary);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  &--secondary {
    background-color: var(--bb-secondary);
    color: var(--bb-text);
    
    &:hover:not(:disabled) {
      background-color: var(--bb-secondaryDark);
    }
  }
  
  &--outline {
    background-color: transparent;
    color: var(--bb-primary);
    border: 1px solid var(--bb-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--bb-primary);
      color: var(--bb-surface);
    }
  }
  
  &--ghost {
    background-color: transparent;
    color: var(--bb-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--bb-surfaceLight);
    }
  }
  
  &--danger {
    background-color: var(--bb-error);
    color: var(--bb-surface);
    
    &:hover:not(:disabled) {
      background-color: var(--bb-error-dark, color-mix(in srgb, var(--bb-error) 80%, black));
    }
  }
  
  // Full width
  &--full-width {
    width: 100%;
  }
  
  // Loading state
  &--loading {
    color: transparent;
    
    .button-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  // Disabled state
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  // Dark mode adjustments
  .bb-dark & {
    &--secondary {
      background-color: var(--bb-surfaceDark);
      color: var(--bb-text);
    }
    
    &--ghost:hover:not(:disabled) {
      background-color: var(--bb-surfaceDark);
    }
  }
}
```

### Custom Form Components

#### Themed Input Component
```typescript
// components/themed-input.component.ts
@Component({
  selector: 'bb-input',
  template: `
    <div class="bb-input-container">
      <label *ngIf="label" class="bb-input-label">
        {{ label }}
        <span *ngIf="required" class="required-indicator">*</span>
      </label>
      
      <div class="bb-input-wrapper" [class]="wrapperClasses">
        <mat-icon *ngIf="prefixIcon" class="bb-input-icon bb-input-icon--prefix">
          {{ prefixIcon }}
        </mat-icon>
        
        <input
          #inputElement
          class="bb-input-field"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          [attr.aria-describedby]="helpText ? inputId + '-help' : null"
          [attr.aria-invalid]="hasError"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()">
        
        <mat-icon *ngIf="suffixIcon" class="bb-input-icon bb-input-icon--suffix">
          {{ suffixIcon }}
        </mat-icon>
      </div>
      
      <div *ngIf="helpText" class="bb-input-help" [id]="inputId + '-help'">
        {{ helpText }}
      </div>
      
      <div *ngIf="errorMessage && hasError" class="bb-input-error">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styleUrls: ['./themed-input.component.scss']
})
export class ThemedInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: string = 'text';
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() helpText?: string;
  @Input() errorMessage?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  @Output() valueChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>();
  
  value: string = '';
  focused: boolean = false;
  hasError: boolean = false;
  inputId: string = `bb-input-${Math.random().toString(36).substr(2, 9)}`;
  
  private themeService = inject(ThemeService);
  
  // ControlValueAccessor implementation
  onChange = (value: string) => {};
  onTouched = () => {};
  
  get wrapperClasses(): string {
    return [
      'bb-input-wrapper--base',
      `bb-input-wrapper--${this.size}`,
      this.focused ? 'bb-input-wrapper--focused' : '',
      this.hasError ? 'bb-input-wrapper--error' : '',
      this.disabled ? 'bb-input-wrapper--disabled' : '',
      this.themeService.isDarkMode() ? 'bb-dark' : ''
    ].filter(Boolean).join(' ');
  }
  
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
  
  onFocus(): void {
    this.focused = true;
    this.inputFocus.emit();
  }
  
  onBlur(): void {
    this.focused = false;
    this.onTouched();
    this.inputBlur.emit();
  }
  
  writeValue(value: string): void {
    this.value = value || '';
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

## Advanced Customization

### SCSS Mixin Library

#### Component Theming Mixins
```scss
// mixins/component-theming.scss

// Apply consistent button theming
@mixin bb-button-theme($variant: primary) {
  padding: var(--bb-component-padding-md);
  border-radius: var(--bb-radius-md);
  font-family: var(--bb-font-family-sans);
  font-weight: var(--bb-font-medium);
  transition: var(--bb-transition-normal);
  border: none;
  cursor: pointer;
  
  @if $variant == primary {
    background-color: var(--bb-primary);
    color: var(--bb-surface);
    
    &:hover {
      background-color: var(--bb-primaryDark);
      box-shadow: var(--bb-glow-primary);
    }
  } @else if $variant == secondary {
    background-color: var(--bb-secondary);
    color: var(--bb-text);
    
    &:hover {
      background-color: var(--bb-secondaryDark);
    }
  }
}

// Apply consistent card theming
@mixin bb-card-theme {
  background-color: var(--bb-surface);
  border: 1px solid var(--bb-outline);
  border-radius: var(--bb-radius-lg);
  box-shadow: var(--bb-shadow-md);
  padding: var(--bb-space-6);
  color: var(--bb-text);
  
  &:hover {
    box-shadow: var(--bb-shadow-lg);
  }
}

// Apply consistent form field theming
@mixin bb-form-field-theme {
  .bb-form-field {
    display: flex;
    flex-direction: column;
    gap: var(--bb-space-2);
    
    label {
      font-weight: var(--bb-font-medium);
      color: var(--bb-text);
      font-size: var(--bb-text-sm);
    }
    
    input, textarea, select {
      padding: var(--bb-space-3);
      border: 1px solid var(--bb-outline);
      border-radius: var(--bb-radius-md);
      font-family: var(--bb-font-family-sans);
      background-color: var(--bb-surface);
      color: var(--bb-text);
      transition: var(--bb-transition-normal);
      
      &:focus {
        outline: none;
        border-color: var(--bb-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--bb-primary) 20%, transparent);
      }
      
      &::placeholder {
        color: var(--bb-text-muted, color-mix(in srgb, var(--bb-text) 60%, transparent));
      }
    }
  }
}
```

#### Responsive Design Mixins
```scss
// mixins/responsive.scss

// Responsive breakpoint mixins
@mixin bb-mobile {
  @media (max-width: calc(var(--bb-breakpoint-sm) - 1px)) {
    @content;
  }
}

@mixin bb-tablet {
  @media (min-width: var(--bb-breakpoint-sm)) and (max-width: calc(var(--bb-breakpoint-lg) - 1px)) {
    @content;
  }
}

@mixin bb-desktop {
  @media (min-width: var(--bb-breakpoint-lg)) {
    @content;
  }
}

// Container mixin with responsive padding
@mixin bb-container {
  max-width: var(--bb-breakpoint-xl);
  margin: 0 auto;
  padding: 0 var(--bb-space-4);
  
  @include bb-tablet {
    padding: 0 var(--bb-space-6);
  }
  
  @include bb-desktop {
    padding: 0 var(--bb-space-8);
  }
}
```

### Theme Validation

#### Theme Validator Service
```typescript
// services/theme-validator.service.ts
@Injectable()
export class ThemeValidatorService {
  
  validateTheme(theme: ThemeConfig): ThemeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Validate required fields
    if (!theme.name) errors.push('Theme name is required');
    if (!theme.displayName) errors.push('Display name is required');
    if (!theme.colors) errors.push('Colors configuration is required');
    
    // Validate colors
    if (theme.colors) {
      this.validateColors(theme.colors, errors, warnings);
    }
    
    // Validate accessibility
    this.validateAccessibility(theme, warnings);
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  private validateColors(colors: ThemeColors, errors: string[], warnings: string[]): void {
    const requiredColors = ['primary', 'secondary', 'surface', 'background', 'text'];
    
    requiredColors.forEach(color => {
      if (!colors[color as keyof ThemeColors]) {
        errors.push(`Required color '${color}' is missing`);
      } else {
        if (!this.isValidColor(colors[color as keyof ThemeColors] as string)) {
          errors.push(`Invalid color format for '${color}'`);
        }
      }
    });
  }
  
  private validateAccessibility(theme: ThemeConfig, warnings: string[]): void {
    if (theme.colors.primary && theme.colors.surface) {
      const contrast = this.calculateContrast(theme.colors.primary, theme.colors.surface);
      if (contrast < 4.5) {
        warnings.push(`Low contrast ratio (${contrast.toFixed(2)}) between primary and surface colors`);
      }
    }
  }
  
  private isValidColor(color: string): boolean {
    const style = new Option().style;
    style.color = color;
    return style.color !== '';
  }
  
  private calculateContrast(color1: string, color2: string): number {
    // Implementation for WCAG contrast ratio calculation
    // ... contrast calculation logic
    return 0; // Placeholder
  }
}

interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

## Best Practices

### Theme Organization

#### File Structure
```
themes/
├── base/
│   ├── tokens.scss          # Base design tokens
│   ├── mixins.scss          # Reusable mixins
│   └── variables.scss       # SCSS variables
├── presets/
│   ├── corporate.theme.ts   # Corporate theme
│   ├── creative.theme.ts    # Creative theme
│   ├── minimal.theme.ts     # Minimal theme
│   └── index.ts            # Theme exports
├── custom/
│   ├── brand-overrides.scss # Project-specific overrides
│   └── custom-components.scss # Custom component styles
└── themes.module.ts         # Theme module configuration
```

#### Theme Configuration Module
```typescript
// themes/themes.module.ts
import { NgModule } from '@angular/core';
import { ThemeService } from '@bb/foundation';
import * as presetThemes from './presets';

@NgModule({
  providers: [
    {
      provide: 'THEME_CONFIG',
      useValue: {
        themes: presetThemes,
        defaultTheme: 'corporate',
        persistTheme: true,
        enableSystemMode: true
      }
    }
  ]
})
export class ThemesModule {}
```

### Performance Optimization

#### Lazy Loading Themes
```typescript
// Lazy load theme assets
const loadThemeAssets = async (themeName: string) => {
  const themeModule = await import(`./themes/${themeName}.theme`);
  const cssModule = await import(`./themes/${themeName}.scss`);
  
  return {
    config: themeModule.default,
    styles: cssModule.default
  };
};
```

#### CSS Custom Property Optimization
```scss
// Group related properties for better performance
:root {
  // Color properties (updated together)
  --bb-primary: #{$primary};
  --bb-primary-light: #{$primary-light};
  --bb-primary-dark: #{$primary-dark};
  
  // Typography properties (updated together)
  --bb-font-family: #{$font-family};
  --bb-font-size-base: #{$font-size-base};
  --bb-line-height-base: #{$line-height-base};
}
```

### Testing Customizations

#### Theme Testing Component
```typescript
// testing/theme-test.component.ts
@Component({
  selector: 'app-theme-test',
  template: `
    <div class="theme-test-container">
      <h2>Theme Test Suite</h2>
      
      <!-- Test all button variants -->
      <section class="test-section">
        <h3>Buttons</h3>
        <bb-button variant="primary">Primary</bb-button>
        <bb-button variant="secondary">Secondary</bb-button>
        <bb-button variant="outline">Outline</bb-button>
        <bb-button variant="ghost">Ghost</bb-button>
        <bb-button variant="danger">Danger</bb-button>
      </section>
      
      <!-- Test form elements -->
      <section class="test-section">
        <h3>Form Elements</h3>
        <bb-input label="Text Input" placeholder="Enter text"></bb-input>
        <bb-input label="Email Input" type="email" placeholder="Enter email"></bb-input>
      </section>
      
      <!-- Test cards -->
      <section class="test-section">
        <h3>Cards</h3>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Sample Card</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            Card content with themed colors.
          </mat-card-content>
        </mat-card>
      </section>
    </div>
  `,
  styleUrls: ['./theme-test.component.scss']
})
export class ThemeTestComponent {}
```

### Documentation

#### Theme Documentation Template
```markdown
# [Theme Name] Theme

## Overview
Brief description of the theme, its intended use case, and design philosophy.

## Color Palette
- **Primary**: #6366f1 - Used for main actions and branding
- **Secondary**: #64748b - Used for secondary actions and content
- **Success**: #10b981 - Used for success states and positive actions
- **Warning**: #f59e0b - Used for warning states and caution
- **Error**: #ef4444 - Used for error states and destructive actions

## Typography
- **Primary Font**: Inter
- **Display Font**: Inter
- **Monospace Font**: JetBrains Mono

## Usage Guidelines
- Use primary color for main call-to-action buttons
- Secondary color for supporting content and navigation
- Maintain sufficient contrast ratios (4.5:1 minimum)

## Customization
```scss
// Override specific colors
:root {
  --bb-primary: #your-brand-color;
  --bb-secondary: #your-secondary-color;
}
```

## Examples
[Include screenshots or live examples of the theme in use]
```

This customization guide provides comprehensive coverage of all customization possibilities, from simple token overrides to advanced theme creation and component extension. Use these patterns to create unique, branded experiences while maintaining the solid foundation of the B01 system.