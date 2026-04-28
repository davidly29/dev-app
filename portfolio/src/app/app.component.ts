import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { VideosComponent } from './components/videos/videos.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CoursesComponent } from './components/courses/courses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, VideosComponent, SkillsComponent, CoursesComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-videos></app-videos>
      <app-skills></app-skills>
      <app-courses></app-courses>
    </main>
    <footer class="site-footer">
      <div class="container">
        <span class="dim">// built with Angular + TypeScript</span>
        <span class="accent">{{ year }}</span>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      border-top: 1px solid var(--border);
      padding: 24px 0;
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      .dim   { color: var(--text-dim); }
      .accent { color: var(--accent); }
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
}
