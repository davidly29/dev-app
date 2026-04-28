import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../data/portfolio.data';
import { Video } from '../../models/portfolio.model';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="videos" class="section">
      <div class="container">
        <div class="section-label">// 01</div>
        <div class="section-header">
          <h2 class="section-title">Language Videos</h2>
          <div class="filter-bar">
            <button
              *ngFor="let lang of allLanguages()"
              [class.active]="activeFilter() === lang"
              (click)="setFilter(lang)"
              class="filter-btn">
              {{ lang }}
            </button>
          </div>
        </div>

        <div class="video-grid">
          <article
            *ngFor="let video of filteredVideos(); let i = index"
            class="video-card"
            [style.animation-delay]="(i * 0.07) + 's'">
            <div class="thumb" [style.background]="langColor(video.language)">
              <span class="lang-glyph">{{ langGlyph(video.language) }}</span>
              <div class="duration-badge">{{ video.duration }}</div>
            </div>
            <div class="card-body">
              <div class="card-meta">
                <span class="tag accent">{{ video.language }}</span>
                <span class="year">{{ video.year }}</span>
              </div>
              <h3 class="card-title">{{ video.title }}</h3>
              <p class="card-desc">{{ video.description }}</p>
              <div class="card-tags">
                <span class="tag" *ngFor="let t of video.tags.slice(1)">{{ t }}</span>
              </div>
              <button class="watch-btn">▶ watch now</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 48px;
      .section-title { margin-bottom: 0; }
    }
    .filter-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .filter-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 6px 14px;
      border-radius: var(--radius);
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: 11px;
      transition: all var(--transition);
      &:hover, &.active {
        border-color: var(--accent);
        color: var(--accent);
        background: rgba(200,255,0,0.05);
      }
    }
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .video-card {
      background: var(--bg-2);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      transition: all var(--transition);
      animation: fadeInUp 0.5s ease both;
      &:hover {
        border-color: var(--accent);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      }
    }
    .thumb {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      opacity: 0.85;
    }
    .lang-glyph {
      font-size: 48px;
      filter: grayscale(0.3);
    }
    .duration-badge {
      position: absolute;
      bottom: 10px; right: 10px;
      background: rgba(0,0,0,0.7);
      color: var(--text);
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 3px;
      font-family: var(--font-mono);
    }
    .card-body { padding: 20px; }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .year { font-size: 11px; color: var(--text-dim); }
    }
    .card-title {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .card-desc {
      font-size: 12px;
      color: var(--text-mid);
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .card-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .watch-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 8px 16px;
      border-radius: var(--radius);
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: 11px;
      transition: all var(--transition);
      width: 100%;
      &:hover {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--bg);
      }
    }
  `]
})
export class VideosComponent implements OnInit {
  private allVideos: Video[] = [];
  activeFilter = signal('All');

  constructor(private data: PortfolioDataService) {}

  ngOnInit() {
    this.allVideos = this.data.getVideos();
  }

  allLanguages = computed(() => {
    const langs = [...new Set(this.allVideos.map(v => v.language))];
    return ['All', ...langs];
  });

  filteredVideos = computed(() => {
    if (this.activeFilter() === 'All') return this.allVideos;
    return this.allVideos.filter(v => v.language === this.activeFilter());
  });

  setFilter(lang: string): void {
    this.activeFilter.set(lang);
  }

  langColor(lang: string): string {
    const map: Record<string, string> = {
      TypeScript: 'linear-gradient(135deg, #1a2a4a, #3178c6)',
      Rust:       'linear-gradient(135deg, #2a1a1a, #ce412b)',
      Python:     'linear-gradient(135deg, #1a2a1a, #306998)',
      Go:         'linear-gradient(135deg, #1a2a2a, #00add8)',
      JavaScript: 'linear-gradient(135deg, #2a2a1a, #f0db4f)',
      Zig:        'linear-gradient(135deg, #1a1a2a, #f7a41d)',
    };
    return map[lang] ?? 'linear-gradient(135deg, var(--bg-2), var(--bg-3))';
  }

  langGlyph(lang: string): string {
    const map: Record<string, string> = {
      TypeScript: '𝙏𝙎', Rust: '🦀', Python: '🐍',
      Go: '⚡', JavaScript: '𝙅𝙎', Zig: '⚙️',
    };
    return map[lang] ?? '⌨️';
  }
}
