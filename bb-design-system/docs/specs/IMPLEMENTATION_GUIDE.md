# B01 Foundation Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the B01 Material Design theme foundation in your Angular projects. Whether you're starting a new project or integrating into an existing one, this guide will help you get up and running quickly.

## Quick Start

### New Project Setup

#### 1. Install Foundation Package
```bash
# Install the foundation package (when available)
npm install @bb/foundation

# Or clone and link locally during development
git clone <foundation-repo>
cd foundation
npm link
cd your-project
npm link @bb/foundation
```

#### 2. Install Dependencies
```bash
# Required peer dependencies
npm install @angular/material @angular/cdk @angular/animations
npm install tailwindcss postcss autoprefixer
```

#### 3. Configure Angular Material
```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // Required for Material animations
  ]
};
```

#### 4. Import Foundation Styles
```scss
// styles.scss
@import '@bb/foundation/styles/foundation';

// Or import specific parts
@import '@bb/foundation/tokens/tokens';
@import '@bb/foundation/styles/material-themes';
```

#### 5. Set Up Theme Service
```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@bb/foundation';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Foundation will automatically load saved theme or system preference
    console.log('Current theme:', this.themeService.currentTheme());
  }
}
```

### Existing Project Integration

#### 1. Install Foundation
```bash
npm install @bb/foundation
```

#### 2. Update Existing Styles
```scss
// In your main styles.scss, add foundation imports
@import '@bb/foundation/styles/foundation';

// If you have existing Material theming, you may need to adjust:
// Remove or comment out custom Material theme imports
// @import '@angular/material/prebuilt-themes/indigo-pink.css'; // Remove this

// Keep your existing custom styles - they should work alongside foundation
```

#### 3. Integrate Theme Service
```typescript
// Update your main component or service
import { ThemeService } from '@bb/foundation';

@Component({
  // ... existing component config
})
export class YourComponent {
  constructor(private themeService: ThemeService) {}

  // Your existing methods work as before
  // Add theme switching capabilities
  switchTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
}
```

## Detailed Implementation

### Theme Service Usage

#### Basic Theme Operations
```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '@bb/foundation';

@Component({
  selector: 'app-theme-controls',
  template: `
    <div class="theme-controls">
      <h3>Theme Controls</h3>
      
      <!-- Theme Selection -->
      <div class="theme-selector">
        <label>Choose Theme:</label>
        <select [value]="themeService.currentTheme()" 
                (change)="onThemeChange($event)">
          <option *ngFor="let theme of availableThemes" 
                  [value]="theme.name">
            {{ theme.displayName }}
          </option>
        </select>
      </div>
      
      <!-- Dark Mode Toggle -->
      <div class="mode-controls">
        <label>
          <input type="checkbox" 
                 [checked]="themeService.isDarkMode()"
                 (change)="themeService.toggleDarkMode()">
          Dark Mode
        </label>
      </div>
      
      <!-- Mode Selection -->
      <div class="mode-selector">
        <label>Mode:</label>
        <select [value]="themeService.themeMode()" 
                (change)="onModeChange($event)">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>
    </div>
  `
})
export class ThemeControlsComponent {
  themeService = inject(ThemeService);
  
  get availableThemes() {
    return this.themeService.getAllThemes();
  }
  
  onThemeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.themeService.changeTheme(target.value);
  }
  
  onModeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.themeService.setThemeMode(target.value as 'light' | 'dark' | 'auto');
  }
}
```

#### Reactive Theme Handling
```typescript
import { Component, computed, effect } from '@angular/core';
import { ThemeService } from '@bb/foundation';

@Component({
  selector: 'app-themed-component',
  template: `
    <div [class]="componentClasses()">
      <h2>Themed Component</h2>
      <p>This component reacts to theme changes</p>
      
      <!-- Using theme colors directly -->
      <div class="color-display">
        <div class="color-box" 
             [style.background-color]="currentColors().primary">
          Primary
        </div>
        <div class="color-box" 
             [style.background-color]="currentColors().secondary">
          Secondary
        </div>
      </div>
    </div>
  `,
  styles: [`
    .themed-component {
      padding: 1rem;
      border-radius: 8px;
      background-color: var(--bb-surface);
      color: var(--bb-text);
      border: 1px solid var(--bb-outline);
    }
    
    .color-box {
      width: 100px;
      height: 50px;
      display: inline-block;
      margin: 0.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
    }
  `]
})
export class ThemedComponent {
  private themeService = inject(ThemeService);
  
  // Computed properties that react to theme changes
  componentClasses = computed(() => [
    'themed-component',
    this.themeService.isDarkMode() ? 'dark-mode' : 'light-mode',
    `theme-${this.themeService.currentTheme()}`
  ].join(' '));
  
  currentColors = computed(() => this.themeService.getCurrentTheme().colors);
  
  constructor() {
    // Effect runs when theme changes
    effect(() => {
      console.log('Theme changed to:', this.themeService.currentTheme());
      console.log('Dark mode:', this.themeService.isDarkMode());
    });
  }
}
```

### Using Design Tokens

#### In SCSS
```scss
// Component styles using design tokens
.my-component {
  // Color tokens
  background-color: var(--bb-surface);
  color: var(--bb-text);
  border: 1px solid var(--bb-outline);
  
  // Spacing tokens
  padding: var(--bb-space-4);
  margin: var(--bb-space-2);
  
  // Typography tokens
  font-family: var(--bb-font-family-sans);
  font-size: var(--bb-text-base);
  font-weight: var(--bb-font-medium);
  
  // Border radius tokens
  border-radius: var(--bb-radius-md);
  
  // Shadow tokens
  box-shadow: var(--bb-shadow-md);
  
  // Transition tokens
  transition: var(--bb-transition-normal);
  
  &:hover {
    box-shadow: var(--bb-shadow-lg);
    transform: translateY(-2px);
  }
  
  // Dark mode handling
  &.dark-mode {
    background-color: var(--bb-surface-dark);
  }
}

// Responsive design with breakpoint tokens
.responsive-component {
  padding: var(--bb-space-4);
  
  @media (min-width: var(--bb-breakpoint-md)) {
    padding: var(--bb-space-6);
  }
  
  @media (min-width: var(--bb-breakpoint-lg)) {
    padding: var(--bb-space-8);
  }
}
```

#### In Component Templates
```html
<!-- Using utility classes -->
<div class="bg-bb-surface text-bb-text p-bb-4 rounded-bb-md">
  <h2 class="text-bb-xl font-bb-semibold text-bb-primary">
    Styled with Utility Classes
  </h2>
</div>

<!-- Using CSS custom properties directly -->
<div [style.background-color]="'var(--bb-primary)'"
     [style.color]="'var(--bb-surface)'"
     [style.padding]="'var(--bb-space-4)'">
  Direct CSS Custom Properties
</div>
```

### Material Component Integration

#### Pre-themed Components
```html
<!-- These components automatically use foundation themes -->
<mat-card>
  <mat-card-header>
    <mat-card-title>Foundation Themed Card</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card automatically uses the current theme colors.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-raised-button color="primary">Primary Action</button>
    <button mat-button>Secondary Action</button>
  </mat-card-actions>
</mat-card>

<!-- Form with themed inputs -->
<form class="theme-form">
  <mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput placeholder="Enter your name">
  </mat-form-field>
  
  <mat-form-field appearance="outline">
    <mat-label>Email</mat-label>
    <input matInput type="email" placeholder="Enter your email">
  </mat-form-field>
  
  <mat-form-field appearance="outline">
    <mat-label>Category</mat-label>
    <mat-select>
      <mat-option value="option1">Option 1</mat-option>
      <mat-option value="option2">Option 2</mat-option>
    </mat-select>
  </mat-form-field>
  
  <button mat-raised-button color="primary" type="submit">
    Submit
  </button>
</form>
```

#### Custom Component Theming
```typescript
// Creating a custom themed component
@Component({
  selector: 'app-custom-button',
  template: `
    <button [class]="buttonClasses" 
            [disabled]="disabled"
            (click)="onClick()">
      <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
      <span>{{ label }}</span>
    </button>
  `,
  styles: [`
    .custom-button {
      padding: var(--bb-space-3) var(--bb-space-4);
      border-radius: var(--bb-radius-md);
      border: none;
      font-family: var(--bb-font-family-sans);
      font-weight: var(--bb-font-medium);
      transition: var(--bb-transition-normal);
      cursor: pointer;
      
      display: inline-flex;
      align-items: center;
      gap: var(--bb-space-2);
      
      // Primary variant
      &.primary {
        background-color: var(--bb-primary);
        color: var(--bb-surface);
        
        &:hover:not(:disabled) {
          background-color: var(--bb-primaryDark);
          box-shadow: var(--bb-glow-primary);
        }
      }
      
      // Secondary variant
      &.secondary {
        background-color: var(--bb-secondary);
        color: var(--bb-text);
        
        &:hover:not(:disabled) {
          background-color: var(--bb-secondaryDark);
        }
      }
      
      // Outline variant
      &.outline {
        background-color: transparent;
        color: var(--bb-primary);
        border: 1px solid var(--bb-primary);
        
        &:hover:not(:disabled) {
          background-color: var(--bb-primary);
          color: var(--bb-surface);
        }
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  `]
})
export class CustomButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();
  
  get buttonClasses(): string {
    return `custom-button ${this.variant}`;
  }
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
```

## Advanced Usage

### Custom Theme Creation

#### Define Custom Theme
```typescript
// custom-themes.ts
import { ThemeConfig } from '@bb/foundation';

export const customThemes: Record<string, ThemeConfig> = {
  'brand-theme': {
    name: 'brand-theme',
    displayName: '🎨 Brand Theme',
    icon: '🎨',
    description: 'Custom brand colors and styling',
    colors: {
      primary: '#6366f1',      // Brand primary
      primaryLight: '#8b5cf6',
      primaryDark: '#4f46e5',
      secondary: '#f59e0b',    // Brand secondary
      secondaryLight: '#fbbf24',
      secondaryDark: '#d97706',
      surface: '#ffffff',
      surfaceLight: '#f8fafc',
      surfaceDark: '#f1f5f9',
      background: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      neutral: '#6b7280'
    }
  }
};
```

#### Register Custom Theme
```typescript
// app.config.ts or theme setup
import { ThemeService } from '@bb/foundation';
import { customThemes } from './custom-themes';

@Injectable()
export class CustomThemeService extends ThemeService {
  constructor() {
    super();
    // Register custom themes
    this.registerThemes(customThemes);
  }
}

// Provide custom service
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    { provide: ThemeService, useClass: CustomThemeService }
  ]
};
```

### Runtime Theme Modification

```typescript
// Dynamic theme modification
@Component({
  selector: 'app-theme-customizer',
  template: `
    <div class="theme-customizer">
      <h3>Theme Customizer</h3>
      
      <!-- Color pickers for theme modification -->
      <div class="color-inputs">
        <label>
          Primary Color:
          <input type="color" 
                 [value]="currentPrimary()"
                 (change)="updatePrimary($event)">
        </label>
        
        <label>
          Secondary Color:
          <input type="color" 
                 [value]="currentSecondary()"
                 (change)="updateSecondary($event)">
        </label>
      </div>
      
      <button mat-button (click)="resetTheme()">
        Reset to Default
      </button>
    </div>
  `
})
export class ThemeCustomizerComponent {
  private themeService = inject(ThemeService);
  
  currentPrimary = computed(() => 
    this.themeService.getCurrentTheme().colors.primary
  );
  
  currentSecondary = computed(() => 
    this.themeService.getCurrentTheme().colors.secondary
  );
  
  updatePrimary(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateThemeColor('primary', target.value);
  }
  
  updateSecondary(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateThemeColor('secondary', target.value);
  }
  
  private updateThemeColor(colorKey: string, color: string): void {
    // Create modified theme
    const currentTheme = this.themeService.getCurrentTheme();
    const modifiedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: color
      }
    };
    
    // Apply modified theme
    this.themeService.applyCustomTheme(modifiedTheme);
  }
  
  resetTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme());
  }
}
```

## Best Practices

### Performance Optimization

#### Lazy Loading Themes
```typescript
// Lazy load theme configurations
@Injectable()
export class LazyThemeService {
  private loadedThemes = new Map<string, ThemeConfig>();
  
  async loadTheme(themeName: string): Promise<ThemeConfig> {
    if (this.loadedThemes.has(themeName)) {
      return this.loadedThemes.get(themeName)!;
    }
    
    // Dynamically import theme
    const themeModule = await import(`./themes/${themeName}.theme`);
    const theme = themeModule.default;
    
    this.loadedThemes.set(themeName, theme);
    return theme;
  }
}
```

#### Efficient CSS Updates
```typescript
// Batch CSS custom property updates
private batchCSSUpdates(updates: Record<string, string>): void {
  requestAnimationFrame(() => {
    const root = document.documentElement;
    Object.entries(updates).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  });
}
```

### Accessibility

#### High Contrast Support
```scss
// High contrast theme support
@media (prefers-contrast: high) {
  :root {
    --bb-outline: #000000;
    --bb-text: #000000;
    --bb-surface: #ffffff;
  }
  
  .bb-dark {
    --bb-outline: #ffffff;
    --bb-text: #ffffff;
    --bb-surface: #000000;
  }
}
```

#### Focus Management
```scss
// Enhanced focus styles
.mat-mdc-button:focus,
.mat-mdc-form-field:focus-within {
  outline: 2px solid var(--bb-primary);
  outline-offset: 2px;
}
```

### Testing

#### Theme Testing
```typescript
// Test theme integration
describe('Theme Integration', () => {
  let themeService: ThemeService;
  let fixture: ComponentFixture<TestComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    
    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(TestComponent);
  });
  
  it('should apply theme colors to components', () => {
    themeService.changeTheme('coastal');
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('.themed-element');
    const computedStyle = getComputedStyle(element);
    
    expect(computedStyle.getPropertyValue('--bb-primary'))
      .toBe('#1b9aaa');
  });
});
```

## Troubleshooting

### Common Issues

#### Theme Not Applying
1. **Check imports**: Ensure foundation styles are imported
2. **CSS order**: Foundation styles should come after Angular Material
3. **Build configuration**: Verify SCSS compilation settings

#### Performance Issues
1. **Too many theme switches**: Debounce theme changes
2. **Large theme files**: Consider lazy loading
3. **CSS custom property support**: Check browser compatibility

#### Integration Problems
1. **Conflicting styles**: Use CSS specificity or `!important` carefully
2. **Missing dependencies**: Ensure all peer dependencies are installed
3. **Version compatibility**: Check Angular and Material versions

### Debugging

#### Debug Theme State
```typescript
// Add debugging to theme service
@Injectable()
export class DebugThemeService extends ThemeService {
  changeTheme(themeName: string): void {
    console.log('Changing theme from', this.currentTheme(), 'to', themeName);
    super.changeTheme(themeName);
    console.log('Theme changed. Current colors:', this.getCurrentTheme().colors);
  }
}
```

#### CSS Debugging
```scss
// Debug CSS custom properties
.debug-theme {
  &::before {
    content: 'Primary: ' var(--bb-primary) ', Secondary: ' var(--bb-secondary);
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem;
    font-size: 0.75rem;
    z-index: 9999;
  }
}
```

This implementation guide provides comprehensive coverage of how to integrate and use the B01 foundation in real-world projects. Follow these patterns and best practices to create consistent, maintainable, and performant themed applications.