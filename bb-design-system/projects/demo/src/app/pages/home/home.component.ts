import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Better in Binary</h1>
          <p class="hero-subtitle">
            A comprehensive Angular Material design system that embodies techy modern aesthetics 
            while maintaining maximum customizability for future projects.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" (click)="scrollToFeatures()">
              Explore Features
            </button>
            <button class="btn btn-secondary" (click)="scrollToComponents()">
              View Components
            </button>
          </div>
        </div>
      </section>

      <section class="features-section" id="features">
        <h2 class="section-title">Design System Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Techy Modern Aesthetic</h3>
            <p>Clean, geometric forms with subtle tech-inspired details and sophisticated color palettes.</p>
          </div>
          <div class="feature-card">
            <h3>Angular Material Foundation</h3>
            <p>Built on robust, accessible Material components with enhanced functionality.</p>
          </div>
          <div class="feature-card">
            <h3>Tailwind Integration</h3>
            <p>Seamless utility-first styling approach with custom design tokens.</p>
          </div>
          <div class="feature-card">
            <h3>Customizable Theming</h3>
            <p>Runtime theme switching and project-specific configuration presets.</p>
          </div>
          <div class="feature-card">
            <h3>Modular Design</h3>
            <p>Tree-shakeable components ensuring optimal bundle sizes and performance.</p>
          </div>
          <div class="feature-card">
            <h3>Future-Proof</h3>
            <p>Designed to scale and integrate with additional services seamlessly.</p>
          </div>
        </div>
      </section>

      <section class="components-section" id="components">
        <h2 class="section-title">Component Preview</h2>
        
        <div class="component-showcase">
          <h3>Buttons</h3>
          <div class="button-grid">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-tech">Tech</button>
            <button class="btn btn-outline">Outline</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-danger">Danger</button>
          </div>
        </div>

        <div class="component-showcase">
          <h3>Cards</h3>
          <div class="card-grid">
            <div class="card">
              <h4>Default Card</h4>
              <p>Standard card with subtle styling and clean design.</p>
              <button class="btn btn-primary btn-sm">Action</button>
            </div>
            <div class="card card-elevated">
              <h4>Elevated Card</h4>
              <p>Card with enhanced shadow and visual prominence.</p>
              <button class="btn btn-tech btn-sm">Action</button>
            </div>
            <div class="card card-outlined">
              <h4>Outlined Card</h4>
              <p>Card with border emphasis for visual definition.</p>
              <button class="btn btn-outline btn-sm">Action</button>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Explore our comprehensive component library and start building with Better in Binary.</p>
          <div class="cta-actions">
            <button class="btn btn-tech btn-large" (click)="navigateToComponents()">
              View All Components
            </button>
            <button class="btn btn-outline btn-large" (click)="navigateToDocumentation()">
              Read Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-section {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 1rem;
      margin-bottom: 4rem;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 3rem;
      color: #1e293b;
    }

    .features-section {
      padding: 4rem 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .feature-card p {
      color: #64748b;
      line-height: 1.6;
    }

    .components-section {
      padding: 4rem 0;
    }

    .component-showcase {
      margin-bottom: 4rem;
    }

    .component-showcase h3 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #1e293b;
    }

    .button-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid #e2e8f0;
    }

    .card-elevated {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .card-outlined {
      border: 2px solid #e2e8f0;
    }

    .card h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .card p {
      color: #64748b;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .cta-section {
      text-align: center;
      padding: 4rem 0;
      background: #f8fafc;
      border-radius: 1rem;
      margin-top: 4rem;
    }

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .cta-content p {
      font-size: 1.125rem;
      color: #64748b;
      margin-bottom: 2rem;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1rem;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }

    .btn-tech {
      background: #06b6d4;
      color: white;
    }

    .btn-tech:hover {
      background: #0891b2;
    }

    .btn-outline {
      background: transparent;
      color: #374151;
      border: 2px solid #d1d5db;
    }

    .btn-outline:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .btn-ghost {
      background: transparent;
      color: #374151;
    }

    .btn-ghost:hover {
      background: #f3f4f6;
    }

    .btn-danger {
      background: #dc2626;
      color: white;
    }

    .btn-danger:hover {
      background: #b91c1c;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }

      .button-grid {
        justify-content: center;
      }
    }
  `]
})
export class HomeComponent {
  scrollToFeatures() {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToComponents() {
    const element = document.getElementById('components');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToComponents() {
    console.log('Navigate to components page');
  }

  navigateToDocumentation() {
    console.log('Navigate to documentation page');
  }
} 