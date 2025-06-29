import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutComponent
  ],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'B01 Foundation Template';
  
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Theme service will automatically load saved preferences
    // or detect system preferences on initialization
    console.log('App initialized with theme:', this.themeService.currentTheme());
  }
}