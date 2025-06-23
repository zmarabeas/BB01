import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BBThemeService, ComponentVariant, ComponentSize } from '../../core/services/theme.service';

export type ButtonVariant = ComponentVariant;
export type ButtonSize = ComponentSize;

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
  selector: 'bb-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button 
      mat-button 
      [class]="computedClasses"
      [disabled]="disabled"
      [type]="type"
      [attr.aria-label]="ariaLabel"
      (click)="onClick.emit($event)">
      <mat-icon *ngIf="icon && iconPosition === 'start'" class="bb-button__icon bb-button__icon--start">
        {{ icon }}
      </mat-icon>
      <span class="bb-button__label" *ngIf="label">{{ label }}</span>
      <ng-content></ng-content>
      <mat-icon *ngIf="icon && iconPosition === 'end'" class="bb-button__icon bb-button__icon--end">
        {{ icon }}
      </mat-icon>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BBButtonComponent {
  /**
   * The label text for the button
   */
  @Input() label?: string;

  /**
   * The visual variant of the button
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * The size of the button
   * @default 'medium'
   */
  @Input() size: ButtonSize = 'medium';

  /**
   * Optional icon name from Material Icons
   */
  @Input() icon?: string;

  /**
   * Position of the icon relative to the label
   * @default 'start'
   */
  @Input() iconPosition: 'start' | 'end' = 'start';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled = false;

  /**
   * The type of button
   * @default 'button'
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Accessibility label for screen readers
   */
  @Input() ariaLabel?: string;

  /**
   * Whether to show loading state
   * @default false
   */
  @Input() loading = false;

  /**
   * Emitted when the button is clicked
   */
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor(private themeService: BBThemeService) {}

  /**
   * Get computed CSS classes for the button
   */
  get computedClasses(): string {
    const baseClasses = this.themeService.getButtonClasses(this.variant, this.size);
    const loadingClass = this.loading ? 'bb-button--loading' : '';
    const disabledClass = this.disabled ? 'bb-button--disabled' : '';
    
    return `${baseClasses} ${loadingClass} ${disabledClass}`.trim();
  }
} 