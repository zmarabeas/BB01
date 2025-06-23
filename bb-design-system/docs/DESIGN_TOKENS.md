# Better in Binary Design Tokens

## Overview

Design tokens are the foundational visual elements that define the Better in Binary design system. They ensure consistency across all components and enable easy customization for different projects.

## Color System

### Primary Colors

```css
:root {
  /* Core Brand Colors */
  --bb-primary-50: #eff6ff;
  --bb-primary-100: #dbeafe;
  --bb-primary-200: #bfdbfe;
  --bb-primary-300: #93c5fd;
  --bb-primary-400: #60a5fa;
  --bb-primary-500: #3b82f6; /* Primary */
  --bb-primary-600: #2563eb; /* Primary Variant */
  --bb-primary-700: #1d4ed8;
  --bb-primary-800: #1e40af;
  --bb-primary-900: #1e3a8a;
  --bb-primary-950: #172554;
}
```

### Secondary Colors

```css
:root {
  /* Secondary Colors */
  --bb-secondary-50: #f8fafc;
  --bb-secondary-100: #f1f5f9;
  --bb-secondary-200: #e2e8f0;
  --bb-secondary-300: #cbd5e1;
  --bb-secondary-400: #94a3b8;
  --bb-secondary-500: #64748b; /* Secondary */
  --bb-secondary-600: #475569;
  --bb-secondary-700: #334155;
  --bb-secondary-800: #1e293b;
  --bb-secondary-900: #0f172a;
  --bb-secondary-950: #020617;
}
```

### Tech Accent Colors

```css
:root {
  /* Signature Tech Accent */
  --bb-tech-50: #ecfeff;
  --bb-tech-100: #cffafe;
  --bb-tech-200: #a5f3fc;
  --bb-tech-300: #67e8f9;
  --bb-tech-400: #22d3ee;
  --bb-tech-500: #06b6d4; /* Tech Accent */
  --bb-tech-600: #0891b2;
  --bb-tech-700: #0e7490;
  --bb-tech-800: #155e75;
  --bb-tech-900: #164e63;
  --bb-tech-950: #083344;
}
```

### Semantic Colors

```css
:root {
  /* Success Colors */
  --bb-success-50: #ecfdf5;
  --bb-success-100: #d1fae5;
  --bb-success-500: #10b981; /* Success */
  --bb-success-600: #059669;
  --bb-success-700: #047857;

  /* Warning Colors */
  --bb-warning-50: #fffbeb;
  --bb-warning-100: #fef3c7;
  --bb-warning-500: #f59e0b; /* Warning */
  --bb-warning-600: #d97706;
  --bb-warning-700: #b45309;

  /* Error Colors */
  --bb-error-50: #fef2f2;
  --bb-error-100: #fee2e2;
  --bb-error-500: #ef4444; /* Error */
  --bb-error-600: #dc2626;
  --bb-error-700: #b91c1c;

  /* Info Colors */
  --bb-info: var(--bb-tech-500);
}
```

### Surface Colors

```css
:root {
  /* Surface & Background */
  --bb-surface: #ffffff;
  --bb-surface-variant: #f8fafc;
  --bb-surface-elevated: #ffffff;
  --bb-surface-overlay: rgba(255, 255, 255, 0.8);

  --bb-background: #f1f5f9;
  --bb-background-alt: #f8fafc;

  /* Outline & Borders */
  --bb-outline: #e2e8f0;
  --bb-outline-variant: #cbd5e1;
  --bb-outline-focus: var(--bb-primary-500);
}
```

## Typography System

### Font Families

```css
:root {
  /* Font Stacks */
  --bb-font-family-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
  --bb-font-family-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  --bb-font-family-display: "Inter", sans-serif;
}
```

### Font Sizes

```css
:root {
  /* Font Sizes */
  --bb-text-xs: 0.75rem; /* 12px */
  --bb-text-sm: 0.875rem; /* 14px */
  --bb-text-base: 1rem; /* 16px */
  --bb-text-lg: 1.125rem; /* 18px */
  --bb-text-xl: 1.25rem; /* 20px */
  --bb-text-2xl: 1.5rem; /* 24px */
  --bb-text-3xl: 1.875rem; /* 30px */
  --bb-text-4xl: 2.25rem; /* 36px */
  --bb-text-5xl: 3rem; /* 48px */
  --bb-text-6xl: 3.75rem; /* 60px */
}
```

### Font Weights

```css
:root {
  /* Font Weights */
  --bb-font-light: 300;
  --bb-font-normal: 400;
  --bb-font-medium: 500;
  --bb-font-semibold: 600;
  --bb-font-bold: 700;
  --bb-font-extrabold: 800;
}
```

### Line Heights

```css
:root {
  /* Line Heights */
  --bb-leading-none: 1;
  --bb-leading-tight: 1.25;
  --bb-leading-snug: 1.375;
  --bb-leading-normal: 1.5;
  --bb-leading-relaxed: 1.625;
  --bb-leading-loose: 2;
}
```

## Spacing System

### Base Spacing

```css
:root {
  /* Spacing Scale */
  --bb-space-0: 0;
  --bb-space-1: 0.25rem; /* 4px */
  --bb-space-2: 0.5rem; /* 8px */
  --bb-space-3: 0.75rem; /* 12px */
  --bb-space-4: 1rem; /* 16px */
  --bb-space-5: 1.25rem; /* 20px */
  --bb-space-6: 1.5rem; /* 24px */
  --bb-space-8: 2rem; /* 32px */
  --bb-space-10: 2.5rem; /* 40px */
  --bb-space-12: 3rem; /* 48px */
  --bb-space-16: 4rem; /* 64px */
  --bb-space-20: 5rem; /* 80px */
  --bb-space-24: 6rem; /* 96px */
  --bb-space-32: 8rem; /* 128px */
}
```

### Component Spacing

```css
:root {
  /* Component Specific Spacing */
  --bb-component-padding-sm: var(--bb-space-2) var(--bb-space-3);
  --bb-component-padding-md: var(--bb-space-3) var(--bb-space-4);
  --bb-component-padding-lg: var(--bb-space-4) var(--bb-space-6);

  --bb-component-margin-sm: var(--bb-space-2);
  --bb-component-margin-md: var(--bb-space-4);
  --bb-component-margin-lg: var(--bb-space-6);
}
```

## Border Radius System

```css
:root {
  /* Border Radius */
  --bb-radius-none: 0;
  --bb-radius-sm: 0.125rem; /* 2px */
  --bb-radius-md: 0.375rem; /* 6px */
  --bb-radius-lg: 0.5rem; /* 8px */
  --bb-radius-xl: 0.75rem; /* 12px */
  --bb-radius-2xl: 1rem; /* 16px */
  --bb-radius-3xl: 1.5rem; /* 24px */
  --bb-radius-full: 9999px;
}
```

## Shadow System

```css
:root {
  /* Shadows */
  --bb-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --bb-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 /
          0.1);
  --bb-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 /
          0.1);
  --bb-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 /
          0.1);

  /* Tech Glow Effects */
  --bb-glow-primary: 0 0 20px rgb(37 99 235 / 0.3);
  --bb-glow-tech: 0 0 20px rgb(6 182 212 / 0.3);
  --bb-glow-success: 0 0 20px rgb(16 185 129 / 0.3);
  --bb-glow-warning: 0 0 20px rgb(245 158 11 / 0.3);
  --bb-glow-error: 0 0 20px rgb(239 68 68 / 0.3);
}
```

## Animation System

### Duration

```css
:root {
  /* Animation Durations */
  --bb-duration-75: 75ms;
  --bb-duration-100: 100ms;
  --bb-duration-150: 150ms;
  --bb-duration-200: 200ms;
  --bb-duration-300: 300ms;
  --bb-duration-400: 400ms;
  --bb-duration-500: 500ms;
  --bb-duration-700: 700ms;
  --bb-duration-1000: 1000ms;
}
```

### Easing Functions

```css
:root {
  /* Easing Curves */
  --bb-ease-linear: linear;
  --bb-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --bb-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --bb-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Custom Tech Easing */
  --bb-ease-tech: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --bb-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Transitions

```css
:root {
  /* Common Transitions */
  --bb-transition-fast: all var(--bb-duration-150) var(--bb-ease-out);
  --bb-transition-normal: all var(--bb-duration-200) var(--bb-ease-out);
  --bb-transition-slow: all var(--bb-duration-300) var(--bb-ease-out);
  --bb-transition-tech: all var(--bb-duration-200) var(--bb-ease-tech);
}
```

## Z-Index System

```css
:root {
  /* Z-Index Scale */
  --bb-z-dropdown: 1000;
  --bb-z-sticky: 1020;
  --bb-z-fixed: 1030;
  --bb-z-modal-backdrop: 1040;
  --bb-z-modal: 1050;
  --bb-z-popover: 1060;
  --bb-z-tooltip: 1070;
  --bb-z-toast: 1080;
}
```

## Breakpoint System

```css
:root {
  /* Breakpoints */
  --bb-breakpoint-sm: 640px;
  --bb-breakpoint-md: 768px;
  --bb-breakpoint-lg: 1024px;
  --bb-breakpoint-xl: 1280px;
  --bb-breakpoint-2xl: 1536px;
}
```

## Usage Examples

### Component Theming

```scss
.bb-button {
  background-color: var(--bb-primary-500);
  color: var(--bb-surface);
  padding: var(--bb-component-padding-md);
  border-radius: var(--bb-radius-md);
  font-family: var(--bb-font-family-sans);
  font-weight: var(--bb-font-medium);
  transition: var(--bb-transition-normal);

  &:hover {
    background-color: var(--bb-primary-600);
    box-shadow: var(--bb-glow-primary);
  }
}
```

### Responsive Design

```scss
.bb-card {
  padding: var(--bb-space-4);

  @media (min-width: var(--bb-breakpoint-md)) {
    padding: var(--bb-space-6);
  }

  @media (min-width: var(--bb-breakpoint-lg)) {
    padding: var(--bb-space-8);
  }
}
```

### Animation

```scss
.bb-button-tech {
  transition: var(--bb-transition-tech);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--bb-glow-tech);
  }
}
```

## Token Naming Convention

### Format

- `--bb-{category}-{variant}-{scale}`

### Examples

- `--bb-primary-500` - Primary color at 500 scale
- `--bb-text-lg` - Large text size
- `--bb-space-4` - Medium spacing
- `--bb-radius-md` - Medium border radius
- `--bb-shadow-lg` - Large shadow
- `--bb-transition-normal` - Normal transition
- `--bb-glow-tech` - Tech accent glow effect

## Customization Guidelines

### Adding New Tokens

1. Follow the established naming convention
2. Provide a clear, semantic name
3. Include comments explaining the token's purpose
4. Consider the token's relationship to existing tokens
5. Test the token across different components

### Modifying Existing Tokens

1. Ensure backward compatibility when possible
2. Update related tokens to maintain consistency
3. Test changes across the entire component library
4. Document the change and its impact

### Project-Specific Overrides

```css
/* Project-specific theme override */
:root {
  --bb-primary-500: #custom-color;
  --bb-tech-500: #custom-tech-color;
}
```
