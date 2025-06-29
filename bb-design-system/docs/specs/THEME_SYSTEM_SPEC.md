# B01 Theme System Technical Specification

## Overview

This document provides the technical specification for the B01 Material Design theme system. It covers the implementation details, APIs, and technical patterns used to apply dynamic theming to Angular Material components.

## Architecture Overview

### Core Components

1. **Theme Service** - Manages theme state and CSS custom property updates
2. **Theme Interface** - TypeScript definitions for theme configuration
3. **Design Tokens** - SCSS variables and CSS custom properties
4. **Material Overrides** - CSS rules that theme Material components
5. **Theme Utilities** - Helper functions and mixins

### Technology Stack

- **Angular 19**: Latest Angular framework with standalone components
- **Angular Material 19**: Material Design component library
- **TypeScript**: Type-safe theme configuration and service
- **SCSS**: Advanced CSS preprocessing for mixins and tokens
- **CSS Custom Properties**: Runtime theme switching
- **Tailwind CSS**: Utility-first CSS (optional integration)

## Theme Service Implementation

### Service Interface

```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Reactive state management
  currentTheme = signal<ThemeName>('coastal');
  isDarkMode = signal<boolean>(false);
  themeMode = signal<ThemeMode>('light');

  // Public API
  changeTheme(themeName: ThemeName): void;
  toggleDarkMode(): void;
  setThemeMode(mode: ThemeMode): void;
  getCurrentTheme(): ThemeConfig;
  getAllThemes(): ThemeConfig[];

  // Computed properties
  get computedThemeClasses(): string[];
  get themeColors(): ThemeColors;
}
```

### Theme State Management

#### Signal-Based Reactivity
```typescript
// Reactive theme state
currentTheme = signal<ThemeName>('coastal');
isDarkMode = signal<boolean>(false);

// Effect for CSS updates
constructor() {
  effect(() => {
    this.updateCSSVariables();
  });
}
```

#### Local Storage Persistence
```typescript
private readonly THEME_KEY = 'bb-theme';
private readonly MODE_KEY = 'bb-mode';

private savePreferences(): void {
  localStorage.setItem(this.THEME_KEY, this.currentTheme());
  localStorage.setItem(this.MODE_KEY, this.themeMode());
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
    this.checkSystemDarkMode();
  }
}
```

#### System Dark Mode Detection
```typescript
private checkSystemDarkMode(): void {
  if (typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);
    this.themeMode.set(prefersDark ? 'dark' : 'light');
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.themeMode() === 'auto') {
          this.isDarkMode.set(e.matches);
        }
      });
  }
}
```

## Theme Configuration System

### Theme Interface Definition

```typescript
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
}

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  icon: string;
  colors: ThemeColors;
  
  // Optional theme metadata
  description?: string;
  category?: string;
  author?: string;
  version?: string;
}

export type ThemeName = 
  | 'coastal' 
  | 'icarus' 
  | 'midnight-lightning' 
  | 'future-house' 
  | 'wedding-adjacent'
  | string; // Allow custom theme names

export type ThemeMode = 'light' | 'dark' | 'auto';
```

### Theme Registry

```typescript
export const THEMES: Record<ThemeName, ThemeConfig> = {
  coastal: {
    name: 'coastal',
    displayName: '🌊 Coastal',
    icon: '🌊',
    description: 'Ocean-inspired blues and natural tones',
    colors: {
      primary: '#1b9aaa',
      primaryLight: '#4db6c7',
      primaryDark: '#006d7a',
      secondary: '#dddbcb',
      surface: '#f5f1e3',
      background: '#ffffff',
      text: '#050505',
      success: '#388e3c',
      warning: '#f57c00',
      error: '#d32f2f',
      info: '#1976d2',
      neutral: '#dddbcb'
    }
  },
  // ... other theme configurations
};
```

## CSS Custom Property System

### Dynamic CSS Updates

```typescript
private updateCSSVariables(): void {
  if (typeof document === 'undefined') return;

  const theme = this.getCurrentTheme();
  const isDark = this.isDarkMode();
  const root = document.documentElement;

  // Apply theme colors as CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (value) {
      root.style.setProperty(`--bb-${key}`, value);
    }
  });

  // Apply mode-specific overrides
  if (isDark) {
    this.applyDarkModeOverrides(root);
  } else {
    this.applyLightModeOverrides(root, theme);
  }

  // Update document classes
  root.classList.toggle('bb-dark', isDark);
  root.setAttribute('data-bb-theme', theme.name);
}
```

### Dark Mode Implementation

```typescript
private applyDarkModeOverrides(root: HTMLElement): void {
  // Dark mode color overrides
  const darkModeColors = {
    '--bb-background': '#121212',
    '--bb-surface': '#1e1e1e',
    '--bb-surfaceLight': '#2d2d2d',
    '--bb-surfaceDark': '#0a0a0a',
    '--bb-text': '#ffffff',
    '--bb-neutral': '#424242',
    
    // Material Design dark mode integration
    '--mdc-theme-surface': '#1e1e1e',
    '--mdc-theme-background': '#121212',
    '--mdc-theme-on-surface': '#ffffff',
    '--mdc-theme-on-background': '#ffffff',
  };

  Object.entries(darkModeColors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}
```

## Material Component Theming

### Component-Specific Overrides

#### Button Theming
```scss
// Material button overrides
.mat-mdc-raised-button {
  &.mat-primary {
    --mdc-protected-button-container-color: var(--bb-primary);
    --mdc-protected-button-label-text-color: var(--bb-surface);
    
    &:hover {
      --mdc-protected-button-container-color: var(--bb-primaryDark);
    }
  }
  
  &.mat-accent {
    --mdc-protected-button-container-color: var(--bb-secondary);
  }
}

.mat-mdc-outlined-button {
  &.mat-primary {
    --mdc-outlined-button-outline-color: var(--bb-primary);
    --mdc-outlined-button-label-text-color: var(--bb-primary);
    
    &:hover {
      --mdc-outlined-button-hover-state-layer-color: var(--bb-primary);
      --mdc-outlined-button-hover-state-layer-opacity: 0.08;
    }
  }
}
```

#### Form Field Theming
```scss
.mat-mdc-form-field {
  // Outline appearance
  &.mat-form-field-appearance-outline {
    .mdc-notched-outline__leading,
    .mdc-notched-outline__notch,
    .mdc-notched-outline__trailing {
      border-color: var(--bb-outline);
    }
    
    &.mat-focused {
      .mdc-notched-outline__leading,
      .mdc-notched-outline__notch,
      .mdc-notched-outline__trailing {
        border-color: var(--bb-primary);
        border-width: 2px;
      }
    }
  }
  
  // Label theming
  .mat-mdc-form-field-label {
    color: var(--bb-text);
    
    &.mat-mdc-form-field-label-disabled {
      color: var(--bb-text-disabled);
    }
  }
}
```

#### Card Theming
```scss
.mat-mdc-card {
  --mdc-elevated-card-container-color: var(--bb-surface);
  --mdc-elevated-card-container-shadow: var(--bb-shadow-md);
  
  .mat-mdc-card-header .mat-mdc-card-title {
    color: var(--bb-text);
  }
  
  .mat-mdc-card-content {
    color: var(--bb-text);
  }
}
```

### Comprehensive Component Coverage

#### Navigation Components
```scss
// Tabs
.mat-mdc-tab-group {
  --mdc-secondary-navigation-tab-container-color: var(--bb-surface);
  
  .mat-mdc-tab {
    --mdc-secondary-navigation-tab-label-text-color: var(--bb-text);
    
    &.mdc-tab--active {
      --mdc-secondary-navigation-tab-label-text-color: var(--bb-primary);
    }
  }
  
  .mat-mdc-tab-header {
    border-bottom: 1px solid var(--bb-outline);
  }
}

// Toolbar
.mat-toolbar {
  background-color: var(--bb-surface);
  color: var(--bb-text);
  
  &.mat-primary {
    background-color: var(--bb-primary);
    color: var(--bb-surface);
  }
}
```

#### Data Display Components
```scss
// Table
.mat-mdc-table {
  background-color: var(--bb-surface);
  
  .mat-mdc-header-row {
    background-color: var(--bb-surfaceLight);
  }
  
  .mat-mdc-row {
    border-bottom-color: var(--bb-outline);
    
    &:hover {
      background-color: var(--bb-surfaceLight);
    }
  }
  
  .mat-mdc-cell,
  .mat-mdc-header-cell {
    color: var(--bb-text);
  }
}

// Chips
.mat-mdc-chip {
  --mdc-chip-container-color: var(--bb-surfaceLight);
  --mdc-chip-label-text-color: var(--bb-text);
  
  &.mat-mdc-chip-selected {
    --mdc-chip-container-color: var(--bb-primary);
    --mdc-chip-label-text-color: var(--bb-surface);
  }
}
```

## Design Token Implementation

### SCSS Token System

```scss
// Color tokens
:root {
  // Primary palette
  --bb-primary-50: #{$bb-primary-50};
  --bb-primary-100: #{$bb-primary-100};
  --bb-primary-200: #{$bb-primary-200};
  --bb-primary-300: #{$bb-primary-300};
  --bb-primary-400: #{$bb-primary-400};
  --bb-primary-500: #{$bb-primary-500}; // Main primary
  --bb-primary-600: #{$bb-primary-600};
  --bb-primary-700: #{$bb-primary-700};
  --bb-primary-800: #{$bb-primary-800};
  --bb-primary-900: #{$bb-primary-900};
  --bb-primary-950: #{$bb-primary-950};
  
  // Dynamic theme colors (updated by ThemeService)
  --bb-primary: var(--bb-primary-500);
  --bb-primaryLight: var(--bb-primary-400);
  --bb-primaryDark: var(--bb-primary-600);
}
```

### Utility Mixins

```scss
// Theme color application
@mixin apply-theme-colors($theme-map) {
  @each $key, $value in $theme-map {
    --bb-#{$key}: #{$value};
  }
}

// Component theming mixin
@mixin theme-component($component-name, $color-properties...) {
  .#{$component-name} {
    @each $property in $color-properties {
      #{$property}: var(--bb-#{$property});
    }
  }
}

// Dark mode variant
@mixin dark-mode-variant {
  :root.bb-dark & {
    @content;
  }
}
```

## Integration APIs

### Component Integration

```typescript
// Theme-aware component
@Component({
  selector: 'bb-themed-component',
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./themed-component.scss']
})
export class ThemedComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  constructor(private themeService: ThemeService) {}
  
  get computedClasses(): string {
    return [
      'bb-themed-component',
      `bb-themed-component--${this.variant}`,
      `bb-themed-component--${this.size}`,
      this.themeService.isDarkMode() ? 'bb-dark' : 'bb-light'
    ].join(' ');
  }
  
  get themeColors(): ThemeColors {
    return this.themeService.getCurrentTheme().colors;
  }
}
```

### Directive Integration

```typescript
@Directive({
  selector: '[bbThemed]'
})
export class ThemedDirective implements OnInit {
  @Input() bbThemed: string = 'primary';
  
  constructor(
    private el: ElementRef,
    private themeService: ThemeService
  ) {}
  
  ngOnInit(): void {
    effect(() => {
      this.applyThemeStyles();
    });
  }
  
  private applyThemeStyles(): void {
    const theme = this.themeService.getCurrentTheme();
    const element = this.el.nativeElement;
    
    element.style.setProperty('--component-primary', theme.colors.primary);
    element.style.setProperty('--component-secondary', theme.colors.secondary);
  }
}
```

## Performance Considerations

### CSS Custom Property Performance
- Minimal performance impact for dynamic theming
- CSS custom properties are efficiently handled by modern browsers
- Property updates trigger only necessary repaints

### Theme Switching Optimization
```typescript
private updateCSSVariables(): void {
  // Batch DOM updates to prevent layout thrashing
  requestAnimationFrame(() => {
    const updates = this.calculateCSSUpdates();
    this.applyCSSUpdates(updates);
  });
}

private calculateCSSUpdates(): Record<string, string> {
  const theme = this.getCurrentTheme();
  const updates: Record<string, string> = {};
  
  // Calculate all updates first
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (value) {
      updates[`--bb-${key}`] = value;
    }
  });
  
  return updates;
}
```

## Testing Strategy

### Unit Testing

```typescript
describe('ThemeService', () => {
  let service: ThemeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });
  
  it('should change theme correctly', () => {
    service.changeTheme('coastal');
    expect(service.currentTheme()).toBe('coastal');
  });
  
  it('should update CSS variables', () => {
    service.changeTheme('coastal');
    const rootStyle = document.documentElement.style;
    expect(rootStyle.getPropertyValue('--bb-primary')).toBeTruthy();
  });
  
  it('should persist theme selection', () => {
    service.changeTheme('icarus');
    expect(localStorage.getItem('bb-theme')).toBe('icarus');
  });
});
```

### Integration Testing

```typescript
describe('Material Component Theming', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let themeService: ThemeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MatButtonModule],
      providers: [ThemeService]
    });
    
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });
  
  it('should apply theme to Material buttons', () => {
    themeService.changeTheme('coastal');
    fixture.detectChanges();
    
    const button = fixture.debugElement.query(By.css('.mat-mdc-raised-button'));
    const computedStyle = getComputedStyle(button.nativeElement);
    
    expect(computedStyle.getPropertyValue('--mdc-protected-button-container-color'))
      .toContain('#1b9aaa'); // Coastal primary color
  });
});
```

## Migration and Upgrade Path

### From Existing Theme System
1. **Extract Theme Configuration**: Move theme definitions to new interface
2. **Update Service**: Migrate to signal-based reactive service
3. **CSS Migration**: Convert to CSS custom property system
4. **Component Updates**: Apply new theming patterns

### Version Compatibility
- Semantic versioning for theme system updates
- Backward compatibility for theme configurations
- Clear migration guides for breaking changes

## Future Enhancements

### Planned Features
1. **Theme Builder UI**: Visual theme creation interface
2. **Color Palette Generator**: Automatic palette generation from brand colors
3. **Theme Validation**: Runtime theme validation and warnings
4. **Animation Theming**: Consistent animation timing and easing
5. **Accessibility Enhancements**: Better contrast ratio management
6. **Theme Marketplace**: Shareable theme configurations

### Technical Roadmap
1. **Performance Optimization**: Further optimize CSS custom property updates
2. **TypeScript Enhancements**: Stricter typing for theme configurations
3. **Testing Improvements**: Automated visual regression testing
4. **Documentation**: Interactive documentation with live examples
5. **Tooling**: CLI tools for theme generation and validation

This technical specification provides the foundation for implementing a robust, performant, and maintainable theme system for Angular Material applications.