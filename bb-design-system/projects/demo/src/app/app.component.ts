import { Component } from '@angular/core';
import { ThemeDemoComponent } from './components/theme-demo/theme-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeDemoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {} 