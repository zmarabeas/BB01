# B01 Material Design Theme Foundation Specification

## Overview

The B01 project provides a foundational theming system for Angular Material Design applications. Rather than wrapping Material components, this system applies consistent, customizable themes directly to Angular Material components through CSS custom properties and SCSS mixins.

## Architecture Principles

### 1. Direct Material Theming
- Apply themes directly to Angular Material components using CSS custom properties
- No component wrapping or re-implementation required
- Maintain full Angular Material functionality and accessibility
- Enable runtime theme switching without component changes

### 2. Token-Based Design System
- Comprehensive design token system for consistent theming
- CSS custom properties for dynamic theme switching
- SCSS variables for build-time customization
- Semantic color naming that adapts to different themes

### 3. Project-Agnostic Foundation
- Core foundation can be installed as npm package or copied into projects
- Easy customization for project-specific requirements
- Minimal setup required to get started
- Clear separation between foundation and project-specific customizations

## Current System Analysis

### Existing Strengths
1. **Angular 19 + Material 19**: Modern Angular with latest Material Design components
2. **Tailwind Integration**: Utility-first CSS framework alongside Material Design
3. **Theme Service**: Dynamic theme switching with localStorage persistence
4. **Design Tokens**: Well-defined color palettes and spacing system
5. **Comprehensive Demo**: All major Material components demonstrated

### Areas for Foundation Enhancement
1. **Package Structure**: Need library structure for reusable distribution
2. **Documentation**: Comprehensive implementation and customization guides
3. **Project Template**: Ready-to-use starter template
4. **SCSS Mixins**: Helper utilities for consistent theming patterns
5. **Component Coverage**: Ensure all Material components are properly themed

## Foundation Architecture

### Directory Structure
```
bb-design-system/
├── src/lib/                         # Foundation library source
│   ├── core/                        # Core foundation files
│   │   ├── theme/                   # Theme system
│   │   │   ├── theme.service.ts     # Theme service
│   │   │   ├── theme.interface.ts   # Theme interfaces
│   │   │   └── default-themes.ts    # Default theme configurations
│   │   ├── tokens/                  # Design tokens
│   │   │   ├── _colors.scss         # Color tokens
│   │   │   ├── _typography.scss     # Typography tokens
│   │   │   ├── _spacing.scss        # Spacing tokens
│   │   │   └── _tokens.scss         # All tokens import
│   │   ├── mixins/                  # SCSS utilities
│   │   │   ├── _material-overrides.scss  # Material component overrides
│   │   │   ├── _theme-mixins.scss   # Theme application mixins
│   │   │   └── _utilities.scss      # Utility mixins
│   │   └── styles/                  # Foundation styles
│   │       ├── _base.scss           # Base styles
│   │       ├── _material-themes.scss # Material component theming
│   │       └── foundation.scss      # Main foundation stylesheet
│   ├── themes/                      # Predefined themes
│   │   ├── coastal.theme.ts         # Coastal theme
│   │   ├── icarus.theme.ts          # Icarus theme
│   │   └── [other-themes].theme.ts  # Additional themes
│   └── utils/                       # Utility services and helpers
│       ├── theme-utils.service.ts   # Theme utility functions
│       └── color-utils.ts           # Color manipulation utilities
├── specs/                           # Complete documentation
├── projects/
│   ├── demo/                        # Foundation demo application
│   └── starter-template/            # Ready-to-use project template
└── dist/                           # Built foundation library
```

## Component Theming Strategy

### Material Component Coverage
The foundation provides consistent theming for all Angular Material components:

#### Form Controls
- MatButton (all variants: raised, flat, outlined, stroked, fab, mini-fab)
- MatFormField (all appearances: outline, fill, standard)
- MatInput, MatTextarea
- MatSelect, MatAutocomplete
- MatCheckbox, MatRadioButton
- MatSlider, MatSlideToggle
- MatDatepicker

#### Navigation
- MatTabs, MatTabGroup
- MatSidenav, MatDrawer
- MatToolbar, MatMenu
- MatPaginator
- MatStepper

#### Layout
- MatCard
- MatExpansionPanel
- MatList, MatListItem
- MatDivider
- MatGridList

#### Data Display
- MatTable (with sorting, pagination)
- MatTree
- MatChip, MatChipList

#### Feedback
- MatProgressBar, MatProgressSpinner
- MatSnackBar
- MatDialog
- MatTooltip
- MatBadge

### Theming Approach
Each component receives theme styles through:
1. **CSS Custom Properties**: For dynamic theme switching
2. **SCSS Mixins**: For build-time customization
3. **Material Theme Integration**: Proper integration with Angular Material theming

## Design Token System

### Color System
```scss
// Primary palette with full spectrum
--bb-primary-50: #eff6ff;
--bb-primary-100: #dbeafe;
// ... through ...
--bb-primary-950: #172554;

// Semantic colors
--bb-success: #10b981;
--bb-warning: #f59e0b;
--bb-error: #ef4444;
--bb-info: #06b6d4;
```

### Typography System
```scss
// Font families
--bb-font-family-sans: 'Inter', sans-serif;
--bb-font-family-mono: 'JetBrains Mono', monospace;

// Font sizes and weights
--bb-text-xs: 0.75rem;
--bb-text-sm: 0.875rem;
// ... full scale ...

--bb-font-light: 300;
--bb-font-normal: 400;
// ... through extrabold
```

### Spacing and Layout
```scss
// Spacing scale
--bb-space-1: 0.25rem;
--bb-space-2: 0.5rem;
// ... consistent scale ...

// Component-specific spacing
--bb-component-padding-sm: var(--bb-space-2) var(--bb-space-3);
--bb-component-padding-md: var(--bb-space-3) var(--bb-space-4);
```

## Theme Configuration

### Theme Interface
```typescript
interface ThemeConfig {
  name: string;
  displayName: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    background: string;
    text: string;
    // ... extended color palette
  };
}
```

### Theme Service Features
- Dynamic theme switching
- localStorage persistence
- System preference detection
- Dark/light mode support
- CSS custom property updates
- Theme validation

## Integration Patterns

### Basic Integration
```typescript
// In your module or component
import { ThemeService } from '@bb/foundation';

// Use theme service
constructor(private themeService: ThemeService) {}

// Switch themes
this.themeService.changeTheme('coastal');
this.themeService.toggleDarkMode();
```

### SCSS Integration
```scss
// Import foundation
@import '@bb/foundation/styles/foundation';

// Use design tokens
.my-component {
  background-color: var(--bb-primary-500);
  padding: var(--bb-component-padding-md);
  border-radius: var(--bb-radius-md);
}
```

## Customization Capabilities

### Project-Level Customization
1. **Color Override**: Replace color tokens for brand-specific theming
2. **Typography Override**: Custom font families and sizing
3. **Component Styling**: Additional component-specific styles
4. **New Themes**: Create completely new theme configurations

### Theme Creation
```typescript
const customTheme: ThemeConfig = {
  name: 'brand-theme',
  displayName: 'Brand Theme',
  icon: '🎨',
  colors: {
    primary: '#your-brand-color',
    // ... complete color configuration
  }
};
```

## Build and Distribution

### Library Build
- Angular library package (`ng-packagr`)
- NPM package distribution
- Peer dependencies: Angular, Angular Material, Tailwind CSS
- TypeScript definitions included

### Project Template
- Complete Angular project setup
- Foundation pre-configured
- Example components
- Development scripts
- Build configuration

## Migration Path

### From Current Structure
1. **Extract Core**: Move theme system to library structure
2. **Create Packages**: Build distributable packages
3. **Update Demo**: Refactor demo to use foundation library
4. **Documentation**: Create comprehensive guides
5. **Templates**: Provide ready-to-use project templates

### For New Projects
1. **Install Foundation**: `npm install @bb/foundation`
2. **Import Styles**: Add foundation stylesheet
3. **Configure Theme**: Set up theme service
4. **Customize**: Override tokens as needed

## Next Steps

1. **Restructure Library**: Create proper Angular library structure
2. **Extract Theme System**: Move core theming to reusable library
3. **Create Documentation**: Comprehensive implementation guides
4. **Build Templates**: Ready-to-use project templates
5. **Package Distribution**: NPM package for easy installation
6. **Testing**: Ensure all Material components are properly themed
7. **Examples**: Provide real-world implementation examples

## Success Criteria

### Foundation Quality
- [ ] All Angular Material components properly themed
- [ ] Dynamic theme switching works seamlessly
- [ ] Dark/light mode support
- [ ] Accessibility maintained
- [ ] Performance optimized

### Developer Experience
- [ ] Easy installation and setup
- [ ] Comprehensive documentation
- [ ] Clear customization patterns
- [ ] TypeScript support
- [ ] IDE integration

### Project Reusability
- [ ] Drop-in foundation for new projects
- [ ] Minimal configuration required
- [ ] Easy brand customization
- [ ] Scalable architecture
- [ ] Clear upgrade path

This foundation provides a solid base for consistent, customizable Material Design theming across multiple projects while maintaining the full power and accessibility of Angular Material components.