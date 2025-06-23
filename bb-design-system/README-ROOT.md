# Better in Binary Design System

A comprehensive Angular Material design system that embodies Better in Binary's techy modern aesthetic while maintaining maximum customizability for future projects.

## 🎨 Design Philosophy

**Better in Binary** creates interfaces that feel **intelligently human** - where sophisticated technology serves people through elegant, intuitive design. Every design decision makes users feel empowered, not overwhelmed.

### Core Design Principles

- **Human-Centric Technology**: Technology serves users, not the other way around
- **Techy Modern Aesthetic**: Clean geometry with subtle tech-inspired details
- **Sophisticated Color Palettes**: Signature tech accent colors with professional blues and grays
- **Purposeful Animations**: Smooth, digital-native interactions that feel natural
- **Modern Typography**: Balancing readability with modern character
- **Interactive Elements**: Components that respond intelligently to user intent

## 🚀 Features

- **Angular Material Foundation**: Built on robust, accessible Material components
- **Tailwind CSS Integration**: Seamless utility-first styling approach
- **Custom Theme System**: Runtime theme switching and project-specific customization
- **Modular Design**: Tree-shakeable components for optimal bundle sizes
- **Future-Proof Architecture**: Built to scale and integrate with additional services
- **Comprehensive Documentation**: Clear examples and implementation guides

## 📦 Installation

```bash
npm install @better-in-binary/bb-ui
```

## 🛠️ Quick Start

### 1. Import Components

```typescript
import { BBButtonComponent, BBCardComponent } from "@better-in-binary/bb-ui";

@Component({
  imports: [BBButtonComponent, BBCardComponent],
  template: `
    <bb-button variant="tech" size="large"> Get Started </bb-button>

    <bb-card variant="elevated">
      <div card-title>Welcome</div>
      <p>Start building with Better in Binary!</p>
    </bb-card>
  `,
})
export class MyComponent {}
```

### 2. Configure Tailwind CSS

Add the Better in Binary design tokens to your `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bb-primary": {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          // ... more shades
        },
        "bb-tech": {
          500: "#06b6d4",
          // ... signature tech accent
        },
        // ... more color tokens
      },
    },
  },
};
```

### 3. Import Design Tokens

```scss
@import "@better-in-binary/bb-ui/tokens/design-tokens.scss";
```

## 🎯 Components

### Button Component

```typescript
<bb-button
  variant="tech"
  size="large"
  icon="rocket_launch"
  (onClick)="handleClick()">
  Launch App
</bb-button>
```

**Variants**: `primary`, `secondary`, `tech`, `outline`, `ghost`, `danger`, `success`, `warning`
**Sizes**: `small`, `medium`, `large`

### Card Component

```typescript
<bb-card variant="elevated" interactive>
  <div card-title>Interactive Card</div>
  <div card-subtitle>Click to explore</div>
  <p>This card has hover effects and can be clicked.</p>
  <div card-actions>
    <bb-button variant="primary">Action</bb-button>
  </div>
</bb-card>
```

**Variants**: `default`, `elevated`, `outlined`

## 🎨 Theming

### Runtime Theme Switching

```typescript
import { BBThemeService } from '@better-in-binary/bb-ui';

constructor(private themeService: BBThemeService) {}

// Update theme colors
this.themeService.updateTheme({
  colors: {
    primary: '#custom-primary-color',
    tech: '#custom-tech-color'
  }
});

// Toggle dark mode
this.themeService.toggleDarkMode();
```

### CSS Custom Properties

All design tokens are available as CSS custom properties:

```css
.my-component {
  background-color: var(--bb-primary-500);
  color: var(--bb-surface);
  padding: var(--bb-component-padding-md);
  border-radius: var(--bb-radius-md);
  box-shadow: var(--bb-shadow-lg);
}
```

## 📚 Documentation

- [Design Tokens](./docs/DESIGN_TOKENS.md) - Complete design token specifications
- [Component Guidelines](./docs/COMPONENT_GUIDELINES.md) - Component design patterns and standards
- [Project Plan](./docs/PROJECT_PLAN.md) - Development roadmap and architecture

## 🏗️ Project Structure

```
bb-design-system/
├── docs/                          # Project documentation
├── projects/
│   ├── bb-ui/                    # Main library package
│   │   ├── src/lib/
│   │   │   ├── core/             # Theme system, tokens, utilities
│   │   │   ├── components/       # Wrapped Material components
│   │   │   ├── directives/       # Custom directives
│   │   │   └── services/         # Theming, configuration services
│   │   └── public-api.ts
│   └── demo/                     # Demo application
├── angular.json
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Development

### Prerequisites

- Node.js 18+
- Angular CLI 17+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd bb-design-system

# Install dependencies
npm install

# Start the demo application
npm start

# Build the library
npm run build:bb-ui

# Run tests
npm test
```

### Demo Application

The demo application showcases all components and features:

```bash
npm start
```

Visit `http://localhost:4200` to explore the design system.

## 🎨 Design Tokens

### Color System

- **Primary**: Professional blues (#3b82f6)
- **Secondary**: Sophisticated grays (#64748b)
- **Tech Accent**: Signature tech color (#06b6d4)
- **Semantic**: Success, warning, error states
- **Surface**: Background and surface colors

### Typography

- **Font Families**: Inter (sans), JetBrains Mono (mono)
- **Font Sizes**: 12px to 60px scale
- **Font Weights**: 300 to 800 range
- **Line Heights**: Optimized for readability

### Spacing

- **Base Scale**: 4px to 128px
- **Component Padding**: Small, medium, large variants
- **Responsive**: Adapts to different screen sizes

### Animations

- **Duration**: 75ms to 1000ms
- **Easing**: Custom tech curves for smooth interactions
- **Transitions**: Consistent across all components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/better-in-binary/bb-ui/issues)
- 💬 [Discussions](https://github.com/better-in-binary/bb-ui/discussions)

## 🎯 Roadmap

- [ ] Additional form components (inputs, selects, checkboxes)
- [ ] Navigation components (app bars, side nav, breadcrumbs)
- [ ] Data display components (tables, lists, chips)
- [ ] Feedback components (snackbars, dialogs, progress indicators)
- [ ] Advanced theming system with presets
- [ ] Storybook integration
- [ ] Performance optimizations
- [ ] Additional utility components

---

Built with ❤️ by the Better in Binary team
