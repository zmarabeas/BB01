# Better in Binary Design System

A standardized Angular Material + Tailwind base project with comprehensive theming capabilities.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the demo application
npm start
# or
npm run start:demo

# Open your browser to http://localhost:4200
```

## 🎨 What's Included

✅ **5 Beautiful Themes** with dark mode support  
✅ **Complete Material Design** component showcase  
✅ **Standardized Styling** and spacing  
✅ **Responsive Design** that works everywhere  
✅ **Type-Safe Architecture** with full TypeScript

## 🎯 Project Structure

```
bb-design-system/
├── projects/
│   └── demo/                    # Demo application
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   └── theme-demo/    # Theme showcase component
│       │   │   ├── interfaces/
│       │   │   │   └── theme.interface.ts  # Theme definitions
│       │   │   ├── services/
│       │   │   │   └── theme.service.ts     # Theme management
│       │   │   └── app.component.ts
│       │   ├── styles.scss              # Global styles
│       │   └── main.ts
│       └── package.json
├── docs/                        # Documentation
├── package.json
└── angular.json
```

## 🎨 Theme System

The project includes 5 beautiful themes:

- 🌊 **Coastal** - Blue and bone colors
- ☀️ **Icarus** - Golden yellow and redwood
- ⚡ **Midnight Lightning** - Ultra violet and xanthous
- 🏡 **Future House** - Prussian blue and jasper
- 💒 **Wedding Adjacent** - Myrtle green and viridian

Each theme supports both light and dark modes with automatic system preference detection.

## 🧩 Component Showcase

The demo includes comprehensive examples of:

- **Buttons & Actions** - All button variants, toggles, icons with badges
- **Forms & Inputs** - Form fields, checkboxes, radio buttons, sliders, progress bars
- **Data Display** - Tables, cards, chips with sample data
- **Navigation** - Steppers, expansion panels, menus

## 🛠 Available Scripts

- `npm start` - Start the demo application
- `npm run start:demo` - Start the demo application (explicit)
- `npm run build` - Build the demo for production
- `npm run build:demo` - Build the demo for production (explicit)
- `npm test` - Run tests
- `npm run test:demo` - Run tests (explicit)

## 📚 Documentation

See the [docs](./docs/) folder for comprehensive documentation:

- [Project Plan](./docs/PROJECT_PLAN.md) - Complete overview and usage instructions
- [Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md) - Technical details
- [Design Tokens](./docs/DESIGN_TOKENS.md) - Design system specifications
- [Component Guidelines](./docs/COMPONENT_GUIDELINES.md) - Development patterns

## 🎯 Using This Base Project

This project serves as a **template** for new Better in Binary projects:

1. **Copy the structure** to your new project
2. **Import the theme service** and interfaces
3. **Apply the global styles** for consistent theming
4. **Customize themes** in the theme interface
5. **Add your components** following the established patterns

## 🏆 Success Metrics

✅ **Completed Goals**

- Clean, standardized Angular base project
- Comprehensive theme system with 5 themes
- Dark mode support
- Complete Material Design component showcase
- Responsive design
- Consistent styling and spacing
- Type-safe theme management
- Local storage persistence

🎯 **Ready for Production**

- Stable Angular 19 foundation
- Professional UI components
- Scalable architecture
- Developer-friendly setup
- Comprehensive documentation

---

**This project now serves as the perfect foundation for all Better in Binary projects, providing a standardized, themeable, and professional starting point.**
