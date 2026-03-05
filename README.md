# Case Workbench (Frontend MVP)

A small React frontend project to “get back in the game” for an interview: list → details → edit flows, with realistic UI states and a mocked “AI suggestions” panel.

## What it does (current)
- ✅ **Cases List** page (`/cases`) with a table
- ✅ **Case Details** page (`/cases/:caseId`)
- ✅ **Search + Status filter** on the list (debounced)
- ✅ **Edit flow** on details (Status + Assignee) with Save/Cancel and simulated delay

## What it will do (next)
- ⏭ Persist edits globally so the list updates (Context + reducer store)
- ⏭ “AI Suggestions” panel: Apply/Reject suggestions + Activity log
- ⏭ Loading/Empty/Error states (simulated API)
- ⏭ Minimal tests for core flows

---

## Tech stack
- React (Create React App)
- React Router
- Plain CSS / inline styles (kept minimal on purpose)

---

## Getting started

### 1) Install + run
```bash
npm install
npm start
