import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="noise"></div>
      <div class="hero-content">
        <div class="status-pill">
          <span class="dot"></span>
          available for work
        </div>
        <h1>
          I teach<br>
          <span class="accent">programming</span><br>
          languages.
        </h1>
        <p class="subtitle">
          Video tutorials, deep dives, and structured courses<br>
          on systems languages, web platforms, and beyond.
        </p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">{{ videoCount }}</span>
            <span class="stat-label">// videos</span>
          </div>
          <div class="stat">
            <span class="stat-num">{{ skillCount }}+</span>
            <span class="stat-label">// technologies</span>
          </div>
          <div class="stat">
            <span class="stat-num">{{ courseCount }}</span>
            <span class="stat-label">// courses</span>
          </div>
        </div>
        <div class="hero-cta">
          <a href="#videos" class="btn-primary">browse videos ↓</a>
          <a href="#courses" class="btn-ghost">view courses</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-block">
          <div class="code-header">
            <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
            <span class="filename">portfolio.ts</span>
          </div>
          <pre class="code-body"><code><span class="kw">const</span> <span class="var">dev</span> <span class="op">=</span> <span class="sym">&#123;</span>
  name<span class="op">:</span>    <span class="str">"Alex Morgan"</span><span class="op">,</span>
  focus<span class="op">:</span>   <span class="str">"teaching languages"</span><span class="op">,</span>
  stack<span class="op">:</span>   <span class="sym">[</span>
    <span class="str">"TypeScript"</span><span class="op">,</span>
    <span class="str">"Rust"</span><span class="op">,</span>
    <span class="str">"Go"</span><span class="op">,</span>
    <span class="str">"Python"</span><span class="op">,</span>
  <span class="sym">]</span><span class="op">,</span>
  videos<span class="op">:</span>  <span class="num">{{ videoCount }}</span><span class="op">,</span>
  courses<span class="op">:</span> <span class="num">{{ courseCount }}</span><span class="op">,</span>
<span class="sym">&#125;</span><span class="op">;</span>

<span class="kw">export default</span> dev<span class="op">;</span><span class="cursor">█</span></code></pre>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 120px 32px 80px;
      position: relative;
      overflow: hidden;
      max-width: 1100px;
      margin: 0 auto;
      gap: 60px;
    }
    .noise {
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
    }
    .hero-content {
      flex: 1;
      z-index: 1;
      animation: fadeInUp 0.6s ease both;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--border);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 11px;
      color: var(--text-mid);
      margin-bottom: 28px;
      .dot {
        width: 6px; height: 6px;
        background: var(--accent);
        border-radius: 50%;
        animation: blink 2s infinite;
      }
    }
    h1 {
      font-size: clamp(40px, 6vw, 80px);
      line-height: 1.0;
      margin-bottom: 24px;
      .accent { color: var(--accent); }
    }
    .subtitle {
      color: var(--text-mid);
      font-size: 14px;
      line-height: 1.7;
      margin-bottom: 40px;
    }
    .hero-stats {
      display: flex;
      gap: 36px;
      margin-bottom: 40px;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .stat-num {
        font-family: var(--font-display);
        font-size: 32px;
        font-weight: 800;
        color: var(--text);
      }
      .stat-label {
        font-size: 11px;
        color: var(--accent);
        letter-spacing: 0.05em;
      }
    }
    .hero-cta {
      display: flex;
      gap: 16px;
      a {
        font-family: var(--font-mono);
        font-size: 13px;
        padding: 12px 24px;
        border-radius: var(--radius);
        text-decoration: none;
        transition: all var(--transition);
      }
      .btn-primary {
        background: var(--accent);
        color: var(--bg);
        font-weight: 700;
        &:hover { opacity: 0.85; }
      }
      .btn-ghost {
        border: 1px solid var(--border);
        color: var(--text-mid);
        &:hover { border-color: var(--text-mid); color: var(--text); }
      }
    }
    .hero-visual {
      flex: 1;
      z-index: 1;
      animation: fadeInUp 0.6s 0.2s ease both;
      opacity: 0;
      animation-fill-mode: forwards;
    }
    .code-block {
      background: var(--bg-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    }
    .code-header {
      background: var(--bg-3);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid var(--border);
      .dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        &.r { background: #ff5f57; }
        &.y { background: #febc2e; }
        &.g { background: #28c840; }
      }
      .filename {
        margin-left: 8px;
        font-size: 11px;
        color: var(--text-dim);
      }
    }
    .code-body {
      padding: 24px;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.8;
      overflow-x: auto;
      code {
        .kw  { color: #c792ea; }
        .var { color: #82aaff; }
        .op  { color: var(--text-dim); }
        .sym { color: var(--text-mid); }
        .str { color: #c3e88d; }
        .num { color: #f78c6c; }
        .cursor { color: var(--accent); animation: blink 1s infinite; }
      }
    }
    @media (max-width: 768px) {
      .hero { flex-direction: column; padding-top: 100px; }
      .hero-visual { width: 100%; }
    }
  `]
})
export class HeroComponent {
  videoCount = 6;
  skillCount = 14;
  courseCount = 3;
}
