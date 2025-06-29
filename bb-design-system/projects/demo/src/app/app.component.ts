import { Component } from '@angular/core';
import { ThemeDemoComponent } from './components/theme-demo/theme-demo.component';
import { ThemeDemoHeaderComponent } from './components/theme-demo-header/theme-demo-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeDemoComponent, ThemeDemoHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {} 