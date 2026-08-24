# HELM

HELM is the frontend prototype for an **AI Developer Command Center** built for the iQOO Hackathon 2026.

The current repository focuses on the product experience: a responsive desktop/mobile command-center interface that demonstrates the intended workflow, project views, approval surfaces, architecture story, and execution lifecycle.

> **Prototype status:** the UI is interactive, but repository indexing, AI execution, sandbox commands, Git operations, CI/CD, voice processing, and production telemetry shown in the demo are currently simulated frontend states unless explicitly connected to backend services later.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Run locally

Requirements:

- Node.js 20+
- npm

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── access-modal.tsx
│   ├── agent-execution.tsx
│   ├── agent-terminal.tsx
│   ├── architecture-section.tsx
│   ├── autonomy-section.tsx
│   ├── collaboration-section.tsx
│   ├── command-palette.tsx
│   ├── mobile-command-center.tsx
│   ├── project-brain.tsx
│   └── ...
└── lib/
    └── utils.ts
```

## Product flow represented by the prototype

**Connect → Understand → Ask → Plan → Approve → Execute → Verify → Ship**

The frontend is intentionally organized around the future HELM product surfaces:

- Command Center
- Project Brain
- Agent execution lifecycle
- Permission and autonomy controls
- Mobile command surface
- Collaboration
- Architecture and model layers
- Ship/deployment story

## Repository

https://github.com/gandhaarjoshi412/helm

## Notes for contributors

Keep prototype/demo data clearly distinguishable from live system state. Avoid presenting simulated network, repository, deployment, or security operations as if they are already backed by production services.

When backend capabilities are added, prefer replacing existing simulated state inside the current components rather than duplicating the UI in parallel.
