import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Better in Binary Design System</h1>
        <nav>
          <a routerLink="/">Home</a>
          <a routerLink="/components">Components</a>
          <a routerLink="/documentation">Documentation</a>
        </nav>
      </header>
      
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <p>&copy; 2024 Better in Binary. Built with Angular.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .app-header {
      background: #1e293b;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .app-header nav {
      display: flex;
      gap: 2rem;
    }
    
    .app-header nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
    }
    
    .app-header nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .app-main {
      flex: 1;
      padding: 2rem;
    }
    
    .app-footer {
      background: #f1f5f9;
      padding: 1rem 2rem;
      text-align: center;
      color: #64748b;
    }
  `]
})
export class AppComponent {
  title = 'Better in Binary Design System';
} 