# Better in Binary Design System

A comprehensive Angular Material wrapper library with a techy modern aesthetic, featuring Tailwind CSS integration, custom theming, and accessibility-first design.

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bb-design-system

# Install dependencies
npm install

# Build the library
npm run build:lib

# Start the demo application
npm run start:demo
```

### Usage

```typescript
import { BBButtonComponent, BBCardComponent } from "bb-ui";

@Component({
  imports: [BBButtonComponent, BBCardComponent],
  template: `
    <bb-button variant="primary" size="large"> Get Started </bb-button>

    <bb-card variant="elevated">
      <div class="p-4">
        <h5>Card Title</h5>
        <p>Card content goes here</p>
      </div>
    </bb-card>
  `,
})
export class MyComponent {}
```

## 📁 Project Structure

```
bb-design-system/
├── docs/                          # Documentation
│   ├── angular/                   # Angular reference docs
│   ├── COMPONENT_GUIDELINES.md    # Component development guidelines
│   ├── DESIGN_TOKENS.md          # Design system tokens
│   ├── IMPLEMENTATION_SUMMARY.md # Implementation overview
│   └── PROJECT_PLAN.md           # Project planning docs
├── projects/
│   ├── bb-ui/                    # Main design system library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/   # UI components
│   │   │   │   │   ├── button/   # BB Button component
│   │   │   │   │   └── card/     # BB Card component
│   │   │   │   └── core/         # Core services and tokens
│   │   │   │       ├── services/ # Theme and configuration services
│   │   │   │       └── tokens/   # Design tokens and variables
│   │   │   └── public-api.ts     # Library exports
│   │   └── package.json
│   └── demo/                     # Demo application
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/        # Demo pages
│       │   │   │   └── home/     # Home page component
│       │   │   └── app.*         # Main app files
│       │   └── styles.scss       # Global styles
│       └── package.json
├── angular.json                  # Angular workspace configuration
├── package.json                  # Root package.json
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🎨 Design Philosophy

Better in Binary Design System embodies a **techy modern aesthetic** where sophisticated technology serves people through elegant, intuitive design. Every design decision makes users feel empowered, not overwhelmed.

### Core Principles

- **Human-Centric Technology**: Technology serves users, not the other way around
- **Reduce Cognitive Load**: Make complex things feel simple
- **Anticipate User Needs**: Design flows that feel natural
- **Build Trust Through Transparency**: Clear actions, predictable outcomes

### Visual Standards

- **Clean Geometry**: Subtle tech-inspired details
- **Sophisticated Color Palettes**: Professional blues, sophisticated grays with tech accents
- **Purposeful Animations**: Digital-native, never gratuitous
- **Modern Typography**: Balancing readability with character
- **Interactive Elements**: Intelligent response to user intent

## 🧩 Components

### BB Button

A versatile button component extending Angular Material with Better in Binary styling.

```typescript
// Variants
<bb-button variant="primary">Primary</bb-button>
<bb-button variant="secondary">Secondary</bb-button>
<bb-button variant="tech">Tech</bb-button>
<bb-button variant="success">Success</bb-button>
<bb-button variant="warning">Warning</bb-button>
<bb-button variant="danger">Danger</bb-button>

// Sizes
<bb-button size="small">Small</bb-button>
<bb-button size="medium">Medium</bb-button>
<bb-button size="large">Large</bb-button>

// With Icons
<bb-button variant="primary" icon="rocket_launch" iconPosition="start">
  Launch
</bb-button>

// States
<bb-button variant="primary" disabled>Disabled</bb-button>
<bb-button variant="primary" loading>Loading</bb-button>
```

### BB Card

A flexible card component with multiple variants and styling options.

```typescript
// Variants
<bb-card variant="default">Default Card</bb-card>
<bb-card variant="elevated">Elevated Card</bb-card>
<bb-card variant="outlined">Outlined Card</bb-card>
<bb-card variant="tech">Tech Card</bb-card>
```

## 🎯 Features

### ✅ Built on Angular Material

- Leverage Angular Material's accessibility and component foundation
- Enhanced with Better in Binary styling and functionality
- Maintains Material Design principles with custom aesthetics

### ✅ Tailwind CSS Integration

- Full Tailwind CSS integration with custom design tokens
- Utility-first styling approach
- Responsive design out of the box

### ✅ Custom Theming System

- Runtime theme switching
- CSS custom properties for easy customization
- Project-specific configuration presets

### ✅ Modular Architecture

- Tree-shakeable components
- Standalone component architecture
- Import only what you need

### ✅ Accessibility First

- WCAG AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### ✅ TypeScript Support

- Full type definitions
- IntelliSense support
- Compile-time error checking

## 🛠 Development

### Prerequisites

- Node.js 18+
- Angular CLI 17+
- npm or yarn

### Development Commands

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Build the library in watch mode
npm run build:lib:watch

# Start the demo application
npm run start:demo

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

### Adding New Components

1. Create component in `projects/bb-ui/src/lib/components/`
2. Follow the component guidelines in `docs/COMPONENT_GUIDELINES.md`
3. Add component to `projects/bb-ui/src/public-api.ts`
4. Update demo application to showcase the component
5. Add tests and documentation

### Theming

The design system uses CSS custom properties for theming. See `docs/DESIGN_TOKENS.md` for detailed information about available tokens and customization options.

## 📚 Documentation

- [Component Guidelines](docs/COMPONENT_GUIDELINES.md) - How to create and maintain components
- [Design Tokens](docs/DESIGN_TOKENS.md) - Design system tokens and theming
- [Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [Project Plan](docs/PROJECT_PLAN.md) - Project roadmap and planning

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the component guidelines
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

- [ ] Additional components (Input, Select, Modal, etc.)
- [ ] Advanced theming system
- [ ] Storybook integration
- [ ] Performance optimizations
- [ ] Internationalization support
- [ ] Additional demo pages
- [ ] Component testing utilities

---

**Better in Binary Design System** - Where sophisticated technology serves people through elegant, intuitive design.
# BB01
