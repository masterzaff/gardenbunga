<h2 align="center">GardenBunga: Efficient Hybrid Sequence Modeling for Indonesian Speech Synthesis via Multilingual Knowledge Transfer</h2>

<p align="center">
  <a href="https://www.python.org/downloads/release/python-3110/"><img src="https://img.shields.io/badge/Python-3.11-blue.svg" alt="Python 3.11"></a>
  <a href="https://pytorch.org/get-started/locally/"><img src="https://img.shields.io/badge/PyTorch-2.8.0-ee4c2c.svg" alt="PyTorch 2.8.0"></a>
  <a href="https://developer.nvidia.com/cuda-toolkit"><img src="https://img.shields.io/badge/CUDA-12.8-76b900.svg" alt="CUDA 12.8"></a>
  <a href="https://github.com/state-spaces/mamba"><img src="https://img.shields.io/badge/Mamba-2.3.1-6f42c1.svg" alt="Mamba 2.3.1"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/Language-Indonesian%20TTS-orange.svg" alt="Indonesian TTS">
  <img src="https://img.shields.io/badge/Research-Hybrid%20DiT--Mamba-black.svg" alt="Hybrid DiT-Mamba">
</p>

<p align="center">
  This repository contains the Gardenbunga frontend application built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.
</p>

<table align="center">
  <tr>
    <th>Name</th>
    <th>NRP</th>
    <th>Campus</th>
  </tr>
  <tr>
    <td>Muhammad Dzaky Haidar</td>
    <td>5054251039</td>
    <td>Sepuluh Nopember Institute of Technology</td>
  </tr>
  <tr>
    <td>Benedictus Ryu Gunawan</td>
    <td>5054251001</td>
    <td>Sepuluh Nopember Institute of Technology</td>
  </tr>
  <tr>
    <td>Muhammad Irzam Hafis Fabiansyah</td>
    <td>5054251024</td>
    <td>Sepuluh Nopember Institute of Technology</td>
  </tr>
</table>

## 1. Project Purpose

This app is a content-focused frontend that combines rich typography, motion, and mathematical rendering (KaTeX) inside a single-page React application.

## 2. Technical Stack

- Runtime: React 18 + TypeScript
- Build tool: Vite 5
- Router: react-router-dom 6
- Styling: Tailwind CSS + CSS variables + shadcn/ui + Radix UI
- Testing: Vitest + Testing Library + jsdom
- Linting: ESLint 9 + typescript-eslint
- Utility libraries: class-variance-authority, clsx, tailwind-merge, zod

## 3. Prerequisites

- Node.js 18.18+ (Node.js 20+ recommended)
- npm 9+ (or Bun if preferred)

## 4. Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Default dev URL:

- http://localhost:8080

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Optional Bun workflow:

```bash
bun install
bun run dev
```

## 5. Scripts

- `npm run dev`: start local Vite server
- `npm run build`: build production assets to `dist/`
- `npm run build:dev`: development-mode build
- `npm run preview`: serve built assets locally
- `npm run lint`: run ESLint checks
- `npm run test`: run Vitest in CI mode
- `npm run test:watch`: run Vitest in watch mode

## 6. Repository Structure

- `src/main.tsx`: application bootstrap and global CSS imports
- `src/App.tsx`: routing and route composition
- `src/pages/`: route-level pages (`Index`, `NotFound`)
- `src/components/`: app-specific reusable components
- `src/components/ui/`: shadcn/ui primitives
- `src/hooks/`: reusable hooks
- `src/lib/`: shared utilities (for example `cn` in `utils.ts`)
- `src/test/`: test setup and examples
- `public/`: static assets copied as-is

## 7. Coding Guidelines

- Use functional React components and hooks.
- Keep components focused: UI primitives in `src/components/ui/`, page sections in `src/components/`.
- Use TypeScript interfaces/props types for all component APIs.
- Use import alias `@/` for files under `src/`.
- Use `cn(...)` from `src/lib/utils.ts` to merge class names.
- Keep side effects in `useEffect` with proper cleanup.
- When adding routes, update `src/App.tsx` and keep the catch-all route last.
- Prefer composition over very large components.

## 8. Styling and Design System Guidelines

- Use Tailwind utility classes first, then shared CSS layers in `src/index.css` when needed.
- Keep all theme values in CSS custom properties (`:root` and `.dark`).
- Reuse existing semantic tokens: `--primary`, `--accent`, `--border`, and related foreground tokens.
- Keep motion effects meaningful and lightweight to avoid jank on low-end devices.
- Preserve typography hierarchy already established by heading and body font definitions.

## 9. Quality Gates (Before Merge)

Run all checks locally before opening a PR:

```bash
npm run lint
npm run test
npm run build
```

PR checklist:

- Lint passes with no new warnings that impact behavior.
- Tests pass, and new logic has tests where practical.
- Production build completes.
- UI changes are validated on desktop and mobile breakpoints.
- No secrets or private keys committed.

## 10. Deployment Notes

This project uses a production base path in `vite.config.ts`:

- Production base URL: `/gardenbunga/`

If deploying under a different subpath or domain root, update the `base` setting accordingly.

## 11. Activating the Kaggle Inference Server

Target notebook: https://www.kaggle.com/code/xzaps0/infero-full

Use this flow to activate the inference server and connect it to this frontend.

1. Open the notebook while logged in to Kaggle.
2. If editing is blocked, click **Copy & Edit**.
3. In notebook settings, enable **Internet** and choose the required accelerator (GPU/CPU) based on model size.
4. Run all setup/import cells first so dependencies and model weights are loaded.
5. Run the server start cell (look for commands using `uvicorn`, `FastAPI`, `flask`, or `gradio.launch`).
6. Ensure the server binds to `0.0.0.0` and uses a fixed port (commonly `7860` or `8000`).

Example server patterns:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

```python
demo.launch(server_name="0.0.0.0", server_port=7860, share=True)
```

7. If the notebook uses a tunnel (for example ngrok), configure the token in Kaggle Secrets and run the tunnel cell to get a public URL.
8. Confirm server readiness by checking notebook logs and opening a health endpoint (for example `/health` or `/docs`) when available.
9. Point this frontend to the inference URL via environment variable (recommended pattern):

```bash
VITE_INFERENCE_API_BASE=https://your-public-inference-url
```

10. Restart local frontend after updating environment values.

### Kaggle Troubleshooting

- If the notebook URL returns 404, verify the notebook is public and the slug is correct.
- If requests fail after inactivity, Kaggle runtime may have stopped; restart runtime and rerun server cells.
- If you get connection refused, confirm the server process is still running and bound to `0.0.0.0`.

## 12. Security and Secrets

- Never commit `.env` files containing secrets.
- Use Kaggle Secrets for tokens (for example tunnel/auth tokens).
- Keep API keys outside source control and inject at runtime.
