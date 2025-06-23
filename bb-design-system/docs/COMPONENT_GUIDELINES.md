# Better in Binary Component Guidelines

## Overview

This document outlines the design principles, patterns, and standards for creating components in the Better in Binary design system. All components should embody our techy modern aesthetic while maintaining excellent usability and accessibility.

## Design Principles

### 1. Human-Centric Technology

- **Technology serves users**, not the other way around
- **Reduce cognitive load** - make complex things feel simple
- **Anticipate user needs** - design flows that feel natural
- **Build trust through transparency** - clear actions, predictable outcomes

### 2. Techy Modern Aesthetic

- **Clean geometry** with subtle tech-inspired details
- **Sophisticated color palettes** featuring signature tech accents
- **Purposeful animations** that feel digital-native, never gratuitous
- **Modern typography** balancing readability with character
- **Interactive elements** that respond intelligently to user intent

## Component Architecture

### Base Structure

All components should follow this basic structure:

```typescript
@Component({
  selector: 'bb-[component-name]',
  template: `
    <!-- Component template -->
  `,
  styleUrls: ['./[component-name].component.scss'],
  encapsulation: ViewEncapsulation.None // Allow theme customization
})
export class BB[ComponentName]Component implements OnInit {
  // Inputs for customization
  @Input() variant: ComponentVariant = 'default';
  @Input() size: ComponentSize = 'medium';
  @Input() disabled = false;

  // Outputs for events
  @Output() action = new EventEmitter<any>();

  // Computed classes
  get computedClasses(): string {
    return this.themeService.getComponentClasses(this.variant, this.size);
  }

  constructor(private themeService: BBThemeService) {}
}
```

### Component Variants

Each component should support multiple variants:

```typescript
type ComponentVariant =
  | "primary" // Default brand color
  | "secondary" // Secondary brand color
  | "tech" // Signature tech accent
  | "outline" // Outlined style
  | "ghost" // Minimal style
  | "danger" // Error/destructive actions
  | "success" // Success states
  | "warning"; // Warning states
```

### Component Sizes

Standard size variants for all components:

```typescript
type ComponentSize =
  | "small" // Compact for dense layouts
  | "medium" // Default size
  | "large"; // Prominent for important actions
```

## Styling Standards

### CSS Architecture

```scss
// Component base styles
.bb-[component-name] {
  // Base styles using design tokens
  font-family: var(--bb-font-family-sans);
  transition: var(--bb-transition-normal);

  // Variant styles
  &--primary {
    background-color: var(--bb-primary-500);
    color: var(--bb-surface);

    &:hover {
      background-color: var(--bb-primary-600);
      box-shadow: var(--bb-glow-primary);
    }
  }

  &--tech {
    background-color: var(--bb-tech-500);
    color: var(--bb-surface);

    &:hover {
      background-color: var(--bb-tech-600);
      box-shadow: var(--bb-glow-tech);
    }
  }

  // Size variants
  &--small {
    padding: var(--bb-component-padding-sm);
    font-size: var(--bb-text-sm);
  }

  &--medium {
    padding: var(--bb-component-padding-md);
    font-size: var(--bb-text-base);
  }

  &--large {
    padding: var(--bb-component-padding-lg);
    font-size: var(--bb-text-lg);
  }

  // States
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: 2px solid var(--bb-outline-focus);
    outline-offset: 2px;
  }
}
```

### Animation Standards

```scss
// Hover animations
.bb-[component-name] {
  transition: var(--bb-transition-tech);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--bb-shadow-lg);
  }

  &:active {
    transform: translateY(0);
    transition: var(--bb-transition-fast);
  }
}

// Loading states
.bb-[component-name]--loading {
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
```

## Component Categories

### 1. Navigation Components

#### App Bar

```typescript
@Component({
  selector: "bb-app-bar",
  template: `
    <mat-toolbar [class]="computedClasses">
      <div class="bb-app-bar__brand">
        <ng-content select="[brand]"></ng-content>
      </div>
      <div class="bb-app-bar__actions">
        <ng-content select="[actions]"></ng-content>
      </div>
    </mat-toolbar>
  `,
})
export class BBAppBarComponent {
  @Input() elevated = false;
  @Input() transparent = false;
}
```

#### Side Navigation

```typescript
@Component({
  selector: "bb-side-nav",
  template: `
    <mat-sidenav-container [class]="computedClasses">
      <mat-sidenav #sidenav [mode]="mode" [opened]="opened">
        <ng-content select="[nav-content]"></ng-content>
      </mat-sidenav>
      <mat-sidenav-content>
        <ng-content select="[main-content]"></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class BBSideNavComponent {
  @Input() mode: "over" | "push" | "side" = "side";
  @Input() opened = true;
  @Input() width = "250px";
}
```

### 2. Layout Components

#### Card

```typescript
@Component({
  selector: "bb-card",
  template: `
    <mat-card [class]="computedClasses">
      <mat-card-header *ngIf="showHeader">
        <mat-card-title>
          <ng-content select="[card-title]"></ng-content>
        </mat-card-title>
        <mat-card-subtitle>
          <ng-content select="[card-subtitle]"></ng-content>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions *ngIf="showActions">
        <ng-content select="[card-actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
})
export class BBCardComponent {
  @Input() variant: "default" | "elevated" | "outlined" = "default";
  @Input() showHeader = true;
  @Input() showActions = false;
}
```

#### Grid

```typescript
@Component({
  selector: "bb-grid",
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `,
})
export class BBGridComponent {
  @Input() columns: number = 12;
  @Input() gap: "small" | "medium" | "large" = "medium";
  @Input() responsive = true;
}
```

### 3. Form Components

#### Input

```typescript
@Component({
  selector: "bb-input",
  template: `
    <mat-form-field [class]="computedClasses">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [required]="required"
        (input)="onInput.emit($event)"
        (blur)="onBlur.emit($event)"
        (focus)="onFocus.emit($event)"
      />
      <mat-icon matSuffix *ngIf="icon">{{ icon }}</mat-icon>
      <mat-error *ngIf="error">{{ error }}</mat-error>
    </mat-form-field>
  `,
})
export class BBInputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: "text" | "email" | "password" | "number" = "text";
  @Input() icon?: string;
  @Input() error?: string;
  @Input() disabled = false;
  @Input() required = false;

  @Output() onInput = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
}
```

#### Button

```typescript
@Component({
  selector: "bb-button",
  template: `
    <button
      mat-button
      [class]="computedClasses"
      [disabled]="disabled"
      [type]="type"
      (click)="onClick.emit($event)"
    >
      <mat-icon *ngIf="icon" [class]="iconPosition">{{ icon }}</mat-icon>
      <span>{{ label }}</span>
      <ng-content></ng-content>
    </button>
  `,
})
export class BBButtonComponent {
  @Input() label?: string;
  @Input() variant: ButtonVariant = "primary";
  @Input() size: ButtonSize = "medium";
  @Input() icon?: string;
  @Input() iconPosition: "start" | "end" = "start";
  @Input() disabled = false;
  @Input() type: "button" | "submit" | "reset" = "button";

  @Output() onClick = new EventEmitter<MouseEvent>();
}
```

### 4. Feedback Components

#### Snackbar

```typescript
@Component({
  selector: "bb-snackbar",
  template: `
    <div [class]="computedClasses" role="alert">
      <div class="bb-snackbar__content">
        <mat-icon *ngIf="icon" class="bb-snackbar__icon">{{ icon }}</mat-icon>
        <span class="bb-snackbar__message">{{ message }}</span>
      </div>
      <button
        *ngIf="showAction"
        mat-button
        class="bb-snackbar__action"
        (click)="onAction.emit()"
      >
        {{ actionText }}
      </button>
    </div>
  `,
})
export class BBSnackbarComponent {
  @Input() message: string = "";
  @Input() variant: "success" | "warning" | "error" | "info" = "info";
  @Input() icon?: string;
  @Input() showAction = false;
  @Input() actionText = "Dismiss";
  @Input() duration = 4000;

  @Output() onAction = new EventEmitter<void>();
}
```

#### Dialog

```typescript
@Component({
  selector: "bb-dialog",
  template: `
    <div class="bb-dialog-overlay" (click)="onBackdropClick.emit()">
      <div [class]="computedClasses" role="dialog">
        <div class="bb-dialog__header">
          <h2 class="bb-dialog__title">{{ title }}</h2>
          <button
            *ngIf="showClose"
            mat-icon-button
            class="bb-dialog__close"
            (click)="onClose.emit()"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div class="bb-dialog__content">
          <ng-content></ng-content>
        </div>
        <div class="bb-dialog__actions" *ngIf="showActions">
          <ng-content select="[dialog-actions]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class BBDialogComponent {
  @Input() title: string = "";
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() showClose = true;
  @Input() showActions = true;

  @Output() onClose = new EventEmitter<void>();
  @Output() onBackdropClick = new EventEmitter<void>();
}
```

## Accessibility Standards

### ARIA Attributes

```typescript
// Example of proper ARIA implementation
@Component({
  selector: "bb-toggle",
  template: `
    <button
      [class]="computedClasses"
      [attr.aria-pressed]="checked"
      [attr.aria-label]="ariaLabel"
      role="switch"
      (click)="toggle()"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class BBToggleComponent {
  @Input() checked = false;
  @Input() ariaLabel?: string;

  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
```

### Keyboard Navigation

```typescript
// Example of keyboard support
@Component({
  selector: "bb-dropdown",
  template: `
    <div [class]="computedClasses" tabindex="0" (keydown)="onKeyDown($event)">
      <ng-content></ng-content>
    </div>
  `,
})
export class BBDropdownComponent {
  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        this.toggle();
        break;
      case "Escape":
        this.close();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.focusNext();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.focusPrevious();
        break;
    }
  }
}
```

## Testing Standards

### Unit Tests

```typescript
describe("BBButtonComponent", () => {
  let component: BBButtonComponent;
  let fixture: ComponentFixture<BBButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BBButtonComponent],
      providers: [BBThemeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BBButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply correct classes based on variant", () => {
    component.variant = "tech";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");
    expect(button.classList.contains("bb-button--tech")).toBe(true);
  });

  it("should emit click event", () => {
    spyOn(component.onClick, "emit");
    const button = fixture.nativeElement.querySelector("button");

    button.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
describe("BBButton Integration", () => {
  it("should work with form submission", () => {
    // Test button in form context
  });

  it("should work with keyboard navigation", () => {
    // Test keyboard accessibility
  });

  it("should work with screen readers", () => {
    // Test ARIA attributes
  });
});
```

## Documentation Standards

### Component Documentation

````typescript
/**
 * BB Button Component
 *
 * A versatile button component that extends Angular Material's button
 * with Better in Binary's techy modern styling.
 *
 * @example
 * ```html
 * <bb-button variant="tech" size="large" (onClick)="handleClick()">
 *   Get Started
 * </bb-button>
 * ```
 */
@Component({
  selector: "bb-button",
  // ... component implementation
})
export class BBButtonComponent {
  /**
   * The visual variant of the button
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = "primary";

  /**
   * The size of the button
   * @default 'medium'
   */
  @Input() size: ButtonSize = "medium";

  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled = false;

  /**
   * Emitted when the button is clicked
   */
  @Output() onClick = new EventEmitter<MouseEvent>();
}
````

## Performance Guidelines

### Bundle Size Optimization

- Use tree-shaking friendly exports
- Implement lazy loading for large components
- Minimize dependencies
- Use CSS-in-JS sparingly

### Runtime Performance

- Use OnPush change detection strategy
- Implement trackBy functions for lists
- Avoid unnecessary DOM manipulations
- Use virtual scrolling for large lists

### Memory Management

- Properly unsubscribe from observables
- Clean up event listeners
- Dispose of timers and intervals
- Use weak references where appropriate
