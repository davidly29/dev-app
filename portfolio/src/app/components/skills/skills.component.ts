import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../data/portfolio.data';
import { Skill } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div class="section-label">// 02</div>
        <h2 class="section-title">Skills & Stack</h2>

        <div class="categories">
          <div class="category" *ngFor="let cat of categories">
            <h3 class="cat-title">
              <span class="cat-prefix">—</span> {{ cat.label }}
            </h3>
            <div class="skill-list">
              <div class="skill-item" *ngFor="let skill of getByCategory(cat.key); let i = index"
                [style.animation-delay]="(i * 0.05) + 's'">
                <div class="skill-top">
                  <span class="skill-icon">{{ skill.icon }}</span>
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level-label">{{ levelLabel(skill.level) }}</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-fill" [style.width]="(skill.level / 5 * 100) + '%'"
                    [style.background]="barColor(skill.level)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .categories {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 40px;
    }
    .cat-title {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 20px;
      font-weight: 400;
      .cat-prefix { color: var(--accent); margin-right: 6px; }
    }
    .skill-list { display: flex; flex-direction: column; gap: 14px; }
    .skill-item {
      animation: fadeInUp 0.4s ease both;
    }
    .skill-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .skill-icon { font-size: 14px; width: 20px; text-align: center; }
    .skill-name {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text);
      flex: 1;
    }
    .skill-level-label {
      font-size: 10px;
      color: var(--text-dim);
      letter-spacing: 0.05em;
    }
    .skill-bar {
      height: 3px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
    }
    .skill-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];

  categories = [
    { key: 'language',  label: 'Languages'  },
    { key: 'framework', label: 'Frameworks' },
    { key: 'tool',      label: 'Tools'      },
    { key: 'concept',   label: 'Concepts'   },
  ];

  constructor(private data: PortfolioDataService) {}

  ngOnInit() {
    this.skills = this.data.getSkills();
  }

  getByCategory(cat: string): Skill[] {
    return this.skills.filter(s => s.category === cat);
  }

  levelLabel(level: number): string {
    return ['', 'beginner', 'learning', 'solid', 'advanced', 'expert'][level] ?? '';
  }

  barColor(level: number): string {
    if (level >= 5) return 'var(--accent)';
    if (level >= 4) return '#00ffc8';
    if (level >= 3) return '#00b8ff';
    return 'var(--text-dim)';
  }
}
