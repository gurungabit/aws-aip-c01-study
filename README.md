# AWS AIP-C01 Study & Practice Exam

Study materials and a full-featured practice exam app for the **AWS Certified AI Practitioner - Generative AI (AIP-C01)** certification.

## What's Included

- **Practice Exam App** - Full SPA practice exam simulator (TanStack Router + IndexedDB)
- **Study Docs** - 12 in-app study guides covering all exam domains, services, and concepts (with Mermaid diagrams)

## Practice Exam App

A complete exam simulator with **450 questions across 6 versions**, styled to match real AWS Skill Builder exam questions.

### Features

- 6 distinct exam versions (75 questions each) with unique scenarios
- AWS Skill Builder question style (scenario-based, multi-service solutions)
- Domain score breakdowns (D1-D5 weighted per official exam guide)
- Scaled scoring (100-1000, 750 to pass)
- 180-minute timer (persists across page refreshes)
- Flag questions for review
- Full exam history with per-domain performance tracking
- Side-by-side question/explanation layout
- Review mode with filter by correct/incorrect/flagged/domain
- Export/import exam data across devices
- Built-in study docs with Mermaid diagram support

### Exam Domains

| Domain | Weight | Questions |
|--------|--------|-----------|
| D1: FM Integration, Data & Compliance | 31% | 23 |
| D2: Implementation & Integration | 26% | 20 |
| D3: Safety, Security & Governance | 20% | 15 |
| D4: Operational Efficiency | 12% | 9 |
| D5: Testing & Troubleshooting | 11% | 8 |

### Tech Stack

- [TanStack Router](https://tanstack.com/router) (React SPA router)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [idb](https://github.com/nicolo-ribaudo/idb) (client-side storage)
- [Tailwind CSS v4](https://tailwindcss.com/) (custom zinc dark theme)
- [Marked](https://marked.js.org/) + [Mermaid](https://mermaid.js.org/) (docs rendering)
- TypeScript + Vite

### Getting Started

```bash
# Prerequisites: Node.js 20+

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Project Structure

```
src/
  data/
    questions.ts          # Question interface & version index
    questions-v1.ts       # Version 1 (75 questions)
    questions-v2.ts       # Version 2 (75 questions)
    questions-v3.ts       # Version 3 (75 questions)
    questions-v4.ts       # Version 4 (75 questions)
    questions-v5.ts       # Version 5 (75 questions)
    questions-v6.ts       # Version 6 (75 questions)
    docs.ts               # Study doc metadata
  routes/
    __root.tsx            # Root layout (header, nav)
    index.tsx             # Dashboard (stats, version selector, history)
    exam.tsx              # Exam page (timer, questions, answers)
    results.$id.tsx       # Results page (score, domain breakdown)
    review.$id.tsx        # Review page (filter, navigate, explanations)
    docs.tsx              # Docs layout
    docs.index.tsx        # Docs listing page
    docs.$slug.tsx        # Individual doc viewer (Markdown + Mermaid)
  components/
    ConfirmModal.tsx      # Reusable confirm dialog
    Explanation.tsx       # Formatted explanation panel
  storage/
    db.ts                 # IndexedDB connection
    exams.ts              # Exam CRUD operations
    types.ts              # Storage types
    index.ts              # Storage exports
  styles/
    app.css               # Custom theme tokens + component styles
public/
  docs/                   # Markdown study guides (12 files)
```
