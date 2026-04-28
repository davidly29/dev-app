import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <a class="logo" href="#">
          <span class="bracket">[</span>dev<span class="accent">.</span>folio<span class="bracket">]</span>
        </a>
        <ul class="nav-links">
          <li><a href="#videos">videos</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#courses">courses</a></li>
          <li><a class="cta" href="mailto:hello@devfolio.dev">hire_me()</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 20px 32px;
      transition: all 200ms ease;
      background: transparent;
    }
    nav.scrolled {
      background: rgba(10,10,10,0.92);
      backdrop-filter: blur(12px);
      padding: 14px 32px;
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-family: var(--font-mono);
      font-size: 15px;
      color: var(--text);
      text-decoration: none;
      font-weight: 700;
      .bracket { color: var(--text-dim); }
      .accent   { color: var(--accent); }
    }
    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
      a {
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--text-mid);
        text-decoration: none;
        letter-spacing: 0.05em;
        transition: color var(--transition);
        &:hover { color: var(--text); }
      }
      a.cta {
        color: var(--accent);
        border: 1px solid var(--accent);
        padding: 6px 14px;
        border-radius: var(--radius);
        &:hover {
          background: var(--accent);
          color: var(--bg);
        }
      }
    }
  `]
})
export class NavbarComponent {
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
