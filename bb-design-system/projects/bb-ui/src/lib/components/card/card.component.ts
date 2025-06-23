import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BBThemeService } from '../../core/services/theme.service';

export type CardVariant = 'default' | 'elevated' | 'outlined';

/**
 * BB Card Component
 * 
 * A versatile card component that extends Angular Material's card
 * with Better in Binary's techy modern styling.
 * 
 * @example
 * ```html
 * <bb-card variant="elevated">
 *   <div card-title>Card Title</div>
 *   <div card-subtitle>Card Subtitle</div>
 *   <p>Card content goes here...</p>
 *   <div card-actions>
 *     <bb-button>Action</bb-button>
 *   </div>
 * </bb-card>
 * ```
 */
@Component({
  selector: 'bb-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BBCardComponent {
  /**
   * The visual variant of the card
   * @default 'default'
   */
  @Input() variant: CardVariant = 'default';

  /**
   * Whether to show the card header
   * @default true
   */
  @Input() showHeader = true;

  /**
   * Whether to show the card actions area
   * @default false
   */
  @Input() showActions = false;

  /**
   * Whether the card is interactive (clickable)
   * @default false
   */
  @Input() interactive = false;

  /**
   * Whether the card is loading
   * @default false
   */
  @Input() loading = false;

  constructor(private themeService: BBThemeService) {}

  /**
   * Get computed CSS classes for the card
   */
  get computedClasses(): string {
    const baseClasses = this.themeService.getCardClasses(this.variant);
    const interactiveClass = this.interactive ? 'bb-card--interactive' : '';
    const loadingClass = this.loading ? 'bb-card--loading' : '';
    
    return `${baseClasses} ${interactiveClass} ${loadingClass}`.trim();
  }
} 