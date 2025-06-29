# BB Foundation Architecture Documentation

## Overview

BB Foundation is a comprehensive Angular Material Design theme system that provides direct theming capabilities for Angular Material components without wrapping or reimplementing them. The system is built as a reusable Angular library (`@bb/foundation`) that can be integrated into any Angular project.

## System Architecture

### Core Components

```
@bb/foundation/
├── core/
│   ├── theme/
│   │   ├── theme.service.ts        # Reactive theme management
│   │   ├── theme.interface.ts      # TypeScript definitions
│   │   └── default-themes.ts       # Built-in theme configurations
│   ├── tokens/
│   │   ├── _colors.scss           # Color design tokens
│   │   ├── _typography.scss       # Typography scale
│   │   ├── _spacing.scss          # Spacing system
│   │   ├── _shadows.scss          # Shadow definitions
│   │   └── _animations.scss       # Animation tokens
│   └── mixins/                    # SCSS utility mixins
├── styles/
│   ├── _material-theming.scss     # Angular Material component theming
│   ├── _base.scss                 # Base styles and resets
│   ├── _utilities.scss            # Utility classes
│   └── foundation.scss            # Main stylesheet entry
├── utils/
│   ├── color-utils.ts             # Color manipulation utilities
│   └── theme-utils.service.ts     # Theme validation and utilities
└── bb-foundation.module.ts        # Angular module with providers
```

## Key Architectural Principles

### 1. Direct Material Theming
- **No Component Wrapping**: Angular Material components are themed directly using CSS custom properties
- **Runtime Theme Switching**: Themes can be changed dynamically without recompiling
- **Accessibility Preserved**: All Angular Material accessibility features remain intact
- **API Compatibility**: Full compatibility with Angular Material APIs

### 2. Reactive Theme Management

The `ThemeService` uses Angular Signals for reactive state management:

```typescript
// Reactive signals
readonly currentTheme = signal<ThemeName>('coastal');
readonly isDarkMode = signal<boolean>(false);
readonly themeMode = signal<ThemeMode>('light');

// Computed values
readonly currentThemeConfig = computed(() => this.getTheme(this.currentTheme()));
readonly themeColors = computed(() => this.currentThemeConfig()?.colors);
```

### 3. CSS Custom Properties Strategy

The system uses a hierarchical CSS custom property system:

```scss
// Base theme tokens
:root {
  --bb-primary: #1b9aaa;
  --bb-secondary: #dddbcb;
  --bb-surface: #f5f1e3;
  --bb-background: #ffffff;
  --bb-text: #050505;
}

// Material component integration
.mat-mdc-raised-button.mat-primary {
  --mdc-protected-button-container-color: var(--bb-primary);
  --mdc-protected-button-label-text-color: var(--bb-surface);
}
```

### 4. Design Token System

**Color Tokens:**
- Primary/Secondary color scales with light/dark variants
- Semantic colors (success, warning, error, info)
- Surface colors for backgrounds and cards
- Text colors with hierarchy (primary, secondary, disabled)

**Typography Tokens:**
- Consistent font scales and weights
- Line height and letter spacing values
- Responsive typography utilities

**Spacing Tokens:**
- 8px-based spacing scale
- Component-specific spacing patterns
- Responsive spacing utilities

## Integration Patterns

### Basic Integration

```typescript
// app.config.ts
import { BbFoundationModule } from '@bb/foundation';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BbFoundationModule.forRoot()),
    // other providers...
  ]
};
```

### Advanced Configuration

```typescript
// With custom configuration
importProvidersFrom(BbFoundationModule.forRoot({
  defaultTheme: 'coastal',
  enableSystemMode: true,
  persistTheme: true,
  storageKey: 'my-app-theme',
  validateThemes: true
}))
```

### Using the Theme Service

```typescript
@Component({...})
export class MyComponent {
  private themeService = inject(ThemeService);
  
  // Access reactive theme state
  currentTheme = this.themeService.currentTheme;
  isDarkMode = this.themeService.isDarkMode;
  
  // Change themes
  changeTheme(themeName: ThemeName) {
    this.themeService.changeTheme(themeName);
  }
  
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
```

## Theme System

### Built-in Themes

The foundation includes 5 carefully designed themes:

1. **Coastal** - Blue ocean-inspired palette
2. **Icarus** - Warm golden and earth tones
3. **Midnight Lightning** - Electric purple and yellow
4. **Future House** - Tech blue with organic accents
5. **Wedding Adjacent** - Elegant green and lavender

### Custom Theme Creation

```typescript
const customTheme: ThemeConfig = {
  name: 'custom',
  displayName: '🎨 Custom',
  icon: '🎨',
  colors: {
    primary: '#2196f3',
    secondary: '#ff5722',
    surface: '#f5f5f5',
    background: '#ffffff',
    text: '#212121',
    // ... additional colors
  }
};

// Register the theme
themeService.registerTheme(customTheme);
themeService.changeTheme('custom');
```

### Dark Mode System

Dark mode is handled through intelligent color overrides:

```scss
// Automatic dark mode adjustments
:root.bb-dark {
  --bb-background: #121212;
  --bb-surface: #1e1e1e;
  --bb-text: #ffffff;
  --bb-textSecondary: #b0b0b0;
}
```

## Performance Considerations

### Optimized CSS Updates
- CSS variables are updated in batches using `requestAnimationFrame`
- Computed signals minimize unnecessary recalculations
- Efficient theme switching without DOM reconstruction

### Bundle Optimization
- Tree-shakable design token imports
- Modular SCSS architecture
- Minimal runtime overhead

### Memory Management
- Proper cleanup of event listeners
- Efficient observable patterns
- No memory leaks in theme switching

## Migration Guide

### From Demo-Based System

The previous demo application had its own theme service. Migration involves:

1. **Remove old theme files:**
   ```bash
   rm -rf src/app/services/theme.service.ts
   rm -rf src/app/interfaces/theme.interface.ts
   ```

2. **Install BB Foundation:**
   ```typescript
   // Replace local imports
   import { ThemeService } from '@bb/foundation';
   ```

3. **Update app configuration:**
   ```typescript
   // Add to app.config.ts
   importProvidersFrom(BbFoundationModule.forRoot())
   ```

### From Other Theme Systems

BB Foundation can coexist with other theming solutions but works best as the primary theme system.

## Development Guidelines

### Adding New Themes
1. Define theme colors following the `ThemeColors` interface
2. Test accessibility with WCAG AA compliance
3. Validate with theme validation service
4. Add to default themes or register dynamically

### Extending Material Component Support
1. Identify Material component CSS custom properties
2. Map to BB Foundation design tokens
3. Add to `_material-theming.scss`
4. Test across all built-in themes

### Contributing Guidelines
1. Follow established CSS custom property naming (`--bb-*`)
2. Maintain TypeScript strict mode compliance
3. Add unit tests for new functionality
4. Update documentation for new features

## Future Roadmap

### Phase 1 - Foundation Stability
- ✅ Core theme service implementation
- ✅ Material component integration
- ✅ Built-in theme collection
- 🔄 Bug fixes and optimizations

### Phase 2 - Enhanced Developer Experience
- 🔄 Theme validation and debugging tools
- ⏳ VS Code extension for theme development
- ⏳ Storybook integration
- ⏳ Theme preview and testing utilities

### Phase 3 - Advanced Features
- ⏳ Animation theme tokens
- ⏳ Component variant system
- ⏳ Advanced accessibility features
- ⏳ Theme marketplace integration

### Phase 4 - Ecosystem Integration
- ⏳ Framework adapters (React, Vue)
- ⏳ Design tool plugins (Figma, Sketch)
- ⏳ CI/CD integration tools
- ⏳ Enterprise features

## Troubleshooting

### Common Issues

**Theme not applying:**
- Verify `BbFoundationModule.forRoot()` is imported
- Check console for theme validation errors
- Ensure CSS custom properties are properly loaded

**Performance issues:**
- Avoid frequent theme switching in loops
- Use computed signals instead of manual subscriptions
- Check for CSS selector specificity conflicts

**TypeScript errors:**
- Ensure proper imports from `@bb/foundation`
- Check TypeScript path mapping in `tsconfig.json`
- Verify theme name types match `ThemeName` union

### Debug Mode

Enable debug logging:

```typescript
BbFoundationModule.forRoot({
  debug: true, // Enables console logging
  validateThemes: true // Validates all theme operations
})
```

## Support and Community

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: Up-to-date docs at `/docs/`
- **Examples**: Sample implementations in `/projects/demo/`
- **Community**: Join discussions for best practices and tips

---

*This architecture documentation reflects the current state of BB Foundation as of the latest refactor. The system is designed to be both powerful and approachable, enabling teams to create beautiful, consistent Material Design applications with minimal setup.*