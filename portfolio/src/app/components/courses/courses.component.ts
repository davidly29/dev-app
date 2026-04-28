import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../data/portfolio.data';
import { Course, CourseSection, CourseLesson } from '../../models/portfolio.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="courses" class="section">
      <div class="container">
        <div class="section-label">// 03</div>
        <h2 class="section-title">Courses</h2>

        <div class="courses-layout">

          <!-- Course Selector -->
          <aside class="course-sidebar">
            <div class="sidebar-label">select course</div>
            <div class="course-tabs">
              <button
                *ngFor="let course of courses"
                class="course-tab"
                [class.active]="activeCourseId() === course.id"
                (click)="selectCourse(course.id)">
                <span class="tab-dot" [style.background]="course.color"></span>
                <div class="tab-info">
                  <span class="tab-title">{{ course.title }}</span>
                  <span class="tab-meta">{{ course.language }} · {{ course.level }}</span>
                </div>
              </button>
            </div>
          </aside>

          <!-- Course Tree View -->
          <div class="course-detail" *ngIf="activeCourse() as course">
            <div class="course-header">
              <div class="course-lang-badge" [style.background]="course.color + '22'"
                [style.border-color]="course.color + '66'">
                <span [style.color]="course.color">{{ course.language }}</span>
              </div>
              <h3 class="course-name">{{ course.title }}</h3>
              <p class="course-desc">{{ course.description }}</p>
              <div class="course-meta-row">
                <span class="meta-chip">⏱ {{ course.totalDuration }}</span>
                <span class="meta-chip">📶 {{ course.level }}</span>
                <span class="meta-chip">📂 {{ course.sections.length }} sections</span>
                <span class="meta-chip">
                  🎬 {{ totalLessons(course) }} lessons
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill"
                  [style.width]="progressPercent(course) + '%'"
                  [style.background]="course.color">
                </div>
              </div>
              <div class="progress-label">
                {{ completedLessons(course) }} / {{ totalLessons(course) }} completed
                ({{ progressPercent(course) }}%)
              </div>
            </div>

            <!-- Tree View -->
            <div class="tree-root">
              <div class="tree-section" *ngFor="let section of course.sections; let si = index">

                <!-- Section Node -->
                <div class="tree-node section-node" (click)="toggleSection(course.id, section.id)">
                  <span class="tree-toggle">
                    {{ isSectionExpanded(course.id, section.id) ? '▾' : '▸' }}
                  </span>
                  <span class="node-icon">📁</span>
                  <span class="node-label">{{ section.title }}</span>
                  <span class="node-count">{{ section.lessons.length }} lessons</span>
                  <span class="section-progress"
                    [style.color]="course.color">
                    {{ sectionProgress(section) }}%
                  </span>
                </div>

                <!-- Lesson Nodes -->
                <div class="tree-children"
                  [class.expanded]="isSectionExpanded(course.id, section.id)">
                  <div
                    *ngFor="let lesson of section.lessons; let li = index; let last = last"
                    class="tree-node lesson-node"
                    [class.completed]="lesson.completed"
                    (click)="toggleLesson(lesson)">

                    <span class="tree-line">{{ last ? '└' : '├' }}</span>
                    <span class="lesson-type-icon">{{ typeIcon(lesson.type) }}</span>
                    <span class="node-label">{{ lesson.title }}</span>
                    <span class="lesson-duration">{{ lesson.duration }}</span>
                    <span class="lesson-status" [class.done]="lesson.completed">
                      {{ lesson.completed ? '✓' : '○' }}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div class="course-cta">
              <button class="enroll-btn" [style.background]="course.color">
                Start Learning →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .courses-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 32px;
      align-items: start;
    }

    /* ── Sidebar ── */
    .course-sidebar {
      position: sticky;
      top: 80px;
    }
    .sidebar-label {
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 12px;
    }
    .course-tabs { display: flex; flex-direction: column; gap: 6px; }
    .course-tab {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 14px;
      cursor: pointer;
      text-align: left;
      transition: all var(--transition);
      &:hover { border-color: var(--text-dim); }
      &.active {
        border-color: var(--accent);
        background: rgba(200,255,0,0.04);
      }
    }
    .tab-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tab-info { display: flex; flex-direction: column; gap: 2px; }
    .tab-title {
      font-family: var(--font-display);
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
    }
    .tab-meta { font-size: 10px; color: var(--text-dim); }

    /* ── Course Detail ── */
    .course-detail {
      background: var(--bg-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    .course-header {
      padding: 28px;
      border-bottom: 1px solid var(--border);
    }
    .course-lang-badge {
      display: inline-block;
      border: 1px solid;
      border-radius: var(--radius);
      padding: 3px 10px;
      font-size: 11px;
      font-family: var(--font-mono);
      margin-bottom: 12px;
    }
    .course-name {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 8px;
    }
    .course-desc {
      font-size: 13px;
      color: var(--text-mid);
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .course-meta-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .meta-chip {
      background: var(--bg-3);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 4px 10px;
      font-size: 11px;
      color: var(--text-mid);
    }
    .progress-bar {
      height: 3px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 6px;
    }
    .progress-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s ease;
    }
    .progress-label {
      font-size: 11px;
      color: var(--text-dim);
    }

    /* ── Tree View ── */
    .tree-root { padding: 20px 28px; }
    .tree-section { margin-bottom: 4px; }

    .tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 10px;
      border-radius: var(--radius);
      cursor: pointer;
      transition: background var(--transition);
      font-family: var(--font-mono);
      font-size: 13px;
      &:hover { background: var(--bg-3); }
    }

    .section-node {
      color: var(--text);
      font-weight: 600;
      .tree-toggle { color: var(--accent); font-size: 12px; width: 14px; }
      .node-icon   { font-size: 14px; }
      .node-label  { flex: 1; }
      .node-count  { font-size: 10px; color: var(--text-dim); }
      .section-progress { font-size: 11px; font-weight: 700; }
    }

    .tree-children {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      &.expanded { max-height: 800px; }
    }

    .lesson-node {
      padding-left: 28px;
      color: var(--text-mid);
      font-size: 12px;
      &.completed { color: var(--text-dim); text-decoration: line-through; }
      .tree-line         { color: var(--border); width: 10px; }
      .lesson-type-icon  { font-size: 12px; width: 18px; }
      .node-label        { flex: 1; }
      .lesson-duration   { font-size: 10px; color: var(--text-dim); }
      .lesson-status {
        font-size: 12px;
        color: var(--text-dim);
        &.done { color: var(--accent); }
      }
    }

    .course-cta {
      padding: 20px 28px;
      border-top: 1px solid var(--border);
    }
    .enroll-btn {
      padding: 12px 28px;
      border: none;
      border-radius: var(--radius);
      color: var(--bg);
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: opacity var(--transition);
      &:hover { opacity: 0.85; }
    }

    @media (max-width: 768px) {
      .courses-layout { grid-template-columns: 1fr; }
      .course-sidebar { position: static; }
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  activeCourseId = signal('');
  expandedSections = signal<Record<string, boolean>>({});

  constructor(private data: PortfolioDataService) {}

  ngOnInit() {
    this.courses = this.data.getCourses();
    if (this.courses.length) {
      this.activeCourseId.set(this.courses[0].id);
      // Pre-expand first section of each course
      const expanded: Record<string, boolean> = {};
      this.courses.forEach(c =>
        c.sections.forEach((s, i) => {
          expanded[`${c.id}__${s.id}`] = i === 0;
        })
      );
      this.expandedSections.set(expanded);
    }
  }

  activeCourse(): Course | undefined {
    return this.courses.find(c => c.id === this.activeCourseId());
  }

  selectCourse(id: string): void {
    this.activeCourseId.set(id);
  }

  toggleSection(courseId: string, sectionId: string): void {
    const key = `${courseId}__${sectionId}`;
    const current = { ...this.expandedSections() };
    current[key] = !current[key];
    this.expandedSections.set(current);
  }

  isSectionExpanded(courseId: string, sectionId: string): boolean {
    return !!this.expandedSections()[`${courseId}__${sectionId}`];
  }

  toggleLesson(lesson: CourseLesson): void {
    lesson.completed = !lesson.completed;
  }

  totalLessons(course: Course): number {
    return course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
  }

  completedLessons(course: Course): number {
    return course.sections.reduce(
      (sum, s) => sum + s.lessons.filter(l => l.completed).length, 0
    );
  }

  progressPercent(course: Course): number {
    const total = this.totalLessons(course);
    if (!total) return 0;
    return Math.round((this.completedLessons(course) / total) * 100);
  }

  sectionProgress(section: CourseSection): number {
    if (!section.lessons.length) return 0;
    return Math.round(
      (section.lessons.filter(l => l.completed).length / section.lessons.length) * 100
    );
  }

  typeIcon(type: string): string {
    return { video: '▶', exercise: '⌨', quiz: '?' }[type] ?? '•';
  }
}
