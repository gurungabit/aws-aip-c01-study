# AWS AIP-C01 Study & Practice Exam

Study materials and a full-featured practice exam app for the **AWS Certified AI Practitioner - Generative AI (AIP-C01)** certification.

## What's Included

- **`exam-app/`** - Full-stack practice exam application (TanStack Start + SQLite)
- **`quiz.html`** - Standalone 20-question quick quiz (open in browser)
- **`c01-answers.md`** - Detailed answers to AWS Skill Builder sample questions
- **`co1.md`** - Study notes and topic coverage

## Practice Exam App

A complete exam simulator with **375 questions across 5 versions**, styled to match real AWS Skill Builder exam questions.

### Features

- 5 distinct exam versions (75 questions each) with unique scenarios
- AWS Skill Builder question style (scenario-based, multi-service solutions)
- Domain score breakdowns (D1-D5 weighted per official exam guide)
- Scaled scoring (100-1000, 750 to pass)
- 180-minute timer (persists across page refreshes)
- Flag questions for review
- Full exam history with per-domain performance tracking
- Side-by-side question/explanation layout
- Review mode with filter by correct/incorrect/flagged/domain

### Exam Domains

| Domain | Weight | Questions |
|--------|--------|-----------|
| D1: FM Integration, Data & Compliance | 31% | 23 |
| D2: Implementation & Integration | 26% | 20 |
| D3: Safety, Security & Governance | 20% | 15 |
| D4: Operational Efficiency | 12% | 9 |
| D5: Testing & Troubleshooting | 11% | 8 |

### Tech Stack

- [TanStack Start](https://tanstack.com/start) (React full-stack framework)
- [Drizzle ORM](https://orm.drizzle.team/) + [libSQL](https://github.com/tursodatabase/libsql) (SQLite)
- [Tailwind CSS v4](https://tailwindcss.com/) (custom zinc dark theme)
- TypeScript

### Getting Started

```bash
# Prerequisites: Node.js 20+

# Navigate to the exam app
cd exam-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:3000**.

The SQLite database (`exam.db`) is created automatically on first run.

### Project Structure

```
exam-app/
  src/
    data/
      questions.ts          # Question interface & version index
      questions-v1.ts       # Version 1 (75 questions)
      questions-v2.ts       # Version 2 (75 questions)
      questions-v3.ts       # Version 3 (75 questions)
      questions-v4.ts       # Version 4 (75 questions)
      questions-v5.ts       # Version 5 (75 questions)
    routes/
      __root.tsx            # Root layout (header, nav)
      index.tsx             # Dashboard (stats, version selector, history)
      exam.tsx              # Exam page (timer, questions, answers)
      results.$id.tsx       # Results page (score, domain breakdown)
      review.$id.tsx        # Review page (filter, navigate, explanations)
    server/
      db.ts                 # Database connection + auto-migration
      functions.ts          # Server functions (CRUD for exams/answers)
    components/
      ConfirmModal.tsx       # Reusable confirm dialog
      Explanation.tsx        # Formatted explanation panel
    styles/
      app.css               # Custom theme tokens + component styles
  drizzle/
    schema.ts              # Database schema (exams + exam_answers)
```
