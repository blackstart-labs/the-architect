# 01 — Installation & Local Development

This guide covers setting up the **Engineering Portfolio System** in local and staging environments.

---

## Prerequisites

- **Node.js**: Version 20.0.0 or later (v22.x LTS recommended)
- **Package Manager**: `bun` (v1.2+) or `npm` (v10+)
- **Browser**: Modern Chromium, Firefox, or Safari supporting WebGL 2.0

---

## Quickstart Setup

1. **Clone or Extract the Repository**:

   ```bash
   cd the-architect
   ```

2. **Install Dependencies**:

   ```bash
   # Using bun:
   bun install

   # Or using npm:
   npm install
   ```

3. **Start the Local Development Server**:

   ```bash
   # Using bun / npm:
   npm run dev
   ```

   The local server will start at `http://localhost:5173`.

4. **Run TypeScript Diagnostic Check**:

   ```bash
   npm run check
   ```

5. **Build for Production**:

   ```bash
   npm run build
   ```

6. **Preview Production Bundle**:
   ```bash
   npm run preview
   ```

---

## Verification Commands

| Command             | Action                                                           |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Boots hot-reloading Vite dev server                              |
| `npm run build`     | Compiles client and server bundles with `@sveltejs/adapter-auto` |
| `npm run check`     | Runs Svelte compiler and TypeScript typechecks                   |
| `npm run test:unit` | Executes Vitest unit tests                                       |
| `npm run test:e2e`  | Executes Playwright end-to-end user flow tests                   |
| `npm run lint`      | Runs Prettier and ESLint validation                              |
