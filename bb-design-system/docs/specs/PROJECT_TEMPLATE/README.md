# B01 Foundation Project Template

## Overview

This template provides a ready-to-use Angular project pre-configured with the B01 Material Design theme foundation. Use this as a starting point for new projects that need consistent, customizable theming.

## Features

✅ Angular 19 with standalone components  
✅ Angular Material 19 pre-configured  
✅ B01 foundation theme system integrated  
✅ Tailwind CSS for utility styling  
✅ TypeScript configuration  
✅ SCSS setup with design tokens  
✅ Example components and layouts  
✅ Theme switching functionality  
✅ Responsive design patterns  
✅ Accessibility best practices  

## Quick Start

### 1. Clone Template
```bash
# Copy template to your project
cp -r PROJECT_TEMPLATE/ my-new-project/
cd my-new-project/

# Initialize git repository
git init
git add .
git commit -m "Initial commit with B01 foundation"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Project
```bash
# Update package.json with your project details
npm pkg set name="my-project-name"
npm pkg set description="My project description"
npm pkg set version="1.0.0"

# Update angular.json project name
# Edit angular.json and replace "bb-foundation-template" with your project name
```

### 4. Start Development
```bash
npm start
```

Visit `http://localhost:4200` to see your themed application.

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── layout/         # Layout components (header, sidebar, etc.)
│   │   ├── theme-switcher/ # Theme switching component
│   │   └── ui/             # Common UI components
│   ├── pages/              # Application pages/routes
│   │   ├── dashboard/      # Dashboard page
│   │   └── settings/       # Settings page
│   ├── services/           # Application services
│   │   └── theme.service.ts # Extended theme service
│   ├── shared/             # Shared utilities and types
│   │   ├── interfaces/     # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   ├── styles/             # Global styles and theme customizations
│   │   ├── _components.scss # Component-specific styles
│   │   ├── _overrides.scss  # Foundation overrides
│   │   └── _variables.scss  # Project variables
│   ├── app.component.*     # Root component
│   ├── app.config.ts       # Application configuration
│   └── app.routes.ts       # Application routing
├── assets/                 # Static assets
├── environments/           # Environment configurations
├── styles.scss            # Global styles entry point
├── index.html             # HTML entry point
└── main.ts                # Application bootstrap
```

## Customization

### Theme Customization
```scss
// src/styles/_overrides.scss
:root {
  // Override foundation colors with your brand colors
  --bb-primary: #your-primary-color;
  --bb-secondary: #your-secondary-color;
  
  // Custom project colors
  --project-brand: #your-brand-color;
  --project-accent: #your-accent-color;
}
```

### Component Customization
```typescript
// src/app/components/ui/button.component.ts
// Extend foundation components with project-specific variants
@Component({
  selector: 'app-button',
  template: `
    <bb-button [variant]="computedVariant" [size]="size">
      <ng-content></ng-content>
    </bb-button>
  `
})
export class AppButtonComponent {
  @Input() variant: 'brand' | 'accent' | 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  get computedVariant() {
    // Map project variants to foundation variants
    switch (this.variant) {
      case 'brand': return 'primary';
      case 'accent': return 'secondary';
      default: return this.variant;
    }
  }
}
```

## Available Scripts

```bash
# Development
npm start              # Start development server
npm run build          # Build for production
npm run watch          # Build and watch for changes

# Testing
npm test               # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run e2e            # Run end-to-end tests

# Linting
npm run lint           # Lint TypeScript and SCSS
npm run lint:fix       # Fix linting issues automatically

# Theme Development
npm run theme:validate # Validate custom themes
npm run theme:build    # Build theme assets
```

## Environment Configuration

### Development
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  features: {
    themeCustomization: true,
    darkMode: true,
    analytics: false
  }
};
```

### Production
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.yourproject.com',
  features: {
    themeCustomization: false,
    darkMode: true,
    analytics: true
  }
};
```

## Example Components

### Layout Component
The template includes a responsive layout component with:
- Header with navigation and theme switcher
- Sidebar with collapsible menu
- Main content area
- Footer with project information

### Theme Switcher
Pre-built theme switching component that allows users to:
- Switch between available themes
- Toggle dark/light mode
- Set system preference mode

### Dashboard
Example dashboard page showing:
- Cards with themed styling
- Data tables with Material components
- Charts with theme-aware colors
- Form elements with consistent styling

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
```bash
# The dist/ folder contains the built application
# Deploy to your preferred hosting service:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod --dir dist
# - Firebase: firebase deploy
# - AWS S3: aws s3 sync dist/ s3://your-bucket
```

### Docker Deployment
```dockerfile
# Dockerfile included in template
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Best Practices

### File Organization
- Group related files in feature folders
- Use barrel exports (index.ts) for clean imports
- Keep components small and focused
- Separate concerns (data, presentation, logic)

### Styling Guidelines
- Use design tokens for consistent spacing and colors
- Prefer CSS custom properties for dynamic theming
- Use SCSS mixins for reusable patterns
- Follow BEM naming convention for custom CSS

### TypeScript Best Practices
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use enums for constant values
- Implement proper error handling

### Performance Optimization
- Use OnPush change detection where appropriate
- Implement lazy loading for feature modules
- Optimize bundle size with tree shaking
- Use trackBy functions in *ngFor directives

## Troubleshooting

### Common Issues

#### Theme Not Applying
1. Check that foundation styles are imported in styles.scss
2. Verify theme service is properly configured
3. Ensure CSS custom properties are being set

#### Build Errors
1. Clear node_modules and reinstall dependencies
2. Check Angular and TypeScript version compatibility
3. Verify all imports are correctly typed

#### Performance Issues
1. Enable production mode for final builds
2. Implement lazy loading for large components
3. Use Angular DevTools to profile performance

### Getting Help

- Check the [Implementation Guide](../IMPLEMENTATION_GUIDE.md)
- Review the [Customization Guide](../CUSTOMIZATION_GUIDE.md)
- Search existing issues in the B01 foundation repository
- Create new issue with detailed reproduction steps

## License

This template is provided under the same license as the B01 foundation system.

## Contributing

To contribute improvements to this template:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy coding with B01 Foundation! 🚀**