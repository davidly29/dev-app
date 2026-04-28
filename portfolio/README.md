# dev.folio — Angular Developer Portfolio

A terminal-aesthetic portfolio site built with **Angular 17** and **TypeScript** (standalone components, signals API).

## Features

| Section | Description |
|---------|-------------|
| **Hero** | Animated intro with live code block and stats |
| **Videos** | Filterable video grid by programming language |
| **Skills** | Categorised skill bars (languages, frameworks, tools, concepts) |
| **Courses** | Interactive tree-view with section collapse, lesson completion tracking, and progress bars |

---

## Quick Start

### Prerequisites
- **Node.js** ≥ 18  →  [nodejs.org](https://nodejs.org)
- **npm** ≥ 9 (bundled with Node)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# App will be live at http://localhost:4200
```

### Build for production

```bash
npm run build
# Output in dist/dev-portfolio/
```

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/        # Sticky nav with scroll detection
│   │   ├── hero/          # Landing section with code block
│   │   ├── videos/        # Filterable video card grid
│   │   ├── skills/        # Skill bars by category
│   │   └── courses/       # Tree-view course browser
│   ├── models/
│   │   └── portfolio.model.ts   # TypeScript interfaces
│   ├── data/
│   │   └── portfolio.data.ts    # Mock data service (swap for API)
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
└── styles/
    └── global.scss        # Design tokens, typography, animations
```

---

## Customising Your Content

All content lives in **`src/app/data/portfolio.data.ts`**. Edit the three methods:

- `getVideos()` — add your video entries
- `getSkills()` — update your skill set and levels (1–5)
- `getCourses()` — define course sections and lessons

---

## Recommended Open Source IDEs

### 1. VS Code ⭐ (Best choice)
> Free, fast, best Angular/TypeScript support available.

- **Download**: [code.visualstudio.com](https://code.visualstudio.com)
- **Must-have extensions**:
  - `Angular Language Service` (official — autocomplete in templates)
  - `ESLint`
  - `Prettier - Code formatter`
  - `Angular Snippets` by John Papa

```bash
# Install extensions from terminal
code --install-extension angular.ng-template
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

---

### 2. Zed
> Blazing fast, GPU-accelerated, built-in AI pair programmer.

- **Download**: [zed.dev](https://zed.dev) (Mac/Linux; Windows in preview)
- Good TypeScript support out of the box, great for speed-focused devs.

---

### 3. Neovim + LazyVim
> Terminal-based, fully configurable, zero mouse required.

- **Setup**: [lazyvim.org](https://www.lazyvim.org)
- Add `typescript-language-server` and `angular-language-server` via Mason.
- Best for devs who live in the terminal.

---

### 4. Helix
> Modal editor like Neovim but with sane defaults — no plugin config needed.

- **Download**: [helix-editor.com](https://helix-editor.com)
- LSP support built-in, just install `typescript-language-server`.

---

## Tech Decisions

| Choice | Reason |
|--------|--------|
| Angular 17 standalone components | No NgModule boilerplate |
| Signals API (`signal`, `computed`) | Reactive state without RxJS overhead for simple cases |
| SCSS with CSS variables | Easy theming, design tokens in one place |
| `inject()` / constructor DI | Standard Angular DI for the data service |

---

## Adding Real Data

Replace `PortfolioDataService` methods with HTTP calls:

```typescript
// src/app/data/portfolio.data.ts
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>('/api/videos');
  }
}
```

Then update `app.config.ts` to include `provideHttpClient()`.
