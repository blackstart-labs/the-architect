# 14 — Troubleshooting & FAQ

Common solutions for local development and build inquiries.

---

## 1. WebGL Canvas Not Initializing

- **Symptom**: Black screen inside the 3D viewport.
- **Fix**: Ensure hardware acceleration is enabled in your browser settings and that the parent container has explicit `height` dimensions.

---

## 2. ScrollTrigger Jumps or Misalignment

- **Symptom**: Pinning section jumps abruptly during rapid scroll.
- **Fix**: Call `ScrollTrigger.refresh()` after dynamic content loads or images finish loading.

---

## 3. Node.js Version Incompatibility

- **Symptom**: `SyntaxError: Unexpected token '?'` or module resolution errors.
- **Fix**: Ensure Node.js 20+ is active. If using NVM, run `nvm use 22`.

---

## 4. Port Conflicts (e.g. Port 5173 In Use)

- **Symptom**: `Port 5173 is in use, trying another one...`
- **Fix**: Pass an explicit port to the dev command:
  ```bash
  npm run dev -- --port 5175
  ```
