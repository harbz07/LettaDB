# LettaDB Workspace

Organized project for Letta agents, quickstarts, and frontend dashboards.

## Structure
- `src/` – Vite + React UI (partition planner, observability, agent roster).
- `scripts/` – Node/TS utilities (`quickstart.ts` for Letta agent bootstrap).
- `docs/` – Project docs and agent references (`agent-instructions-letta.md`, `starter-agents.md`).
  - `docs/ui/` – UI component guides (Gruvbox UI notes).
- `examples/` – Standalone code samples.
  - `examples/gruvbox/` – Gruvbox component library and sample app.
- `env.ts` – Typed env loader (reads `.env`).
- `.env.example` – Copy to `.env` and fill secrets.

## Commands
- `npm run dev` – Start frontend.
- `npm run build` / `npm run preview` – Build/preview frontend.
- `npm run quickstart` – Run Letta agent quickstart (requires `LETTA_API_KEY`; set `LETTA_BASE_URL` if self-hosted).
- `npm run typecheck` – TypeScript check.

## Notes
- Keep secrets in `.env` (git-ignored).
- Quickstart uses model `openai/gpt-4.1` and embedding `openai/text-embedding-3-small`.
