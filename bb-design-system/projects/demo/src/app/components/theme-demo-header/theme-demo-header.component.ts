import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService, DEFAULT_THEMES, ThemeName } from '@bb/foundation';

@Component({
  selector: 'app-theme-demo-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="flex items-center space-x-3">
      <!-- Theme Selector -->
      <mat-form-field appearance="outline" class="w-40">
        <mat-label>Theme</mat-label>
        <mat-select [value]="themeService.currentTheme()" (selectionChange)="changeTheme($event.value)">
          @for (theme of availableThemes; track theme.name) {
            <mat-option [value]="theme.name">
              {{ theme.displayName }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <!-- Dark Mode Toggle -->
      <button 
        mat-icon-button 
        (click)="toggleDarkMode()"
        [matTooltip]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
        <mat-icon>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    mat-form-field {
      font-size: 14px;
    }
    
    .mat-mdc-form-field {
      margin-bottom: 0;
    }
  `]
})
export class ThemeDemoHeaderComponent {
  themeService = inject(ThemeService);
  
  availableThemes = Object.values(DEFAULT_THEMES);

  changeTheme(themeName: ThemeName): void {
    this.themeService.changeTheme(themeName);
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}