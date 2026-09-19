# 12 — Production Deployment

The project is built on SvelteKit with `@sveltejs/adapter-auto`, supporting zero-configuration deployment to all major cloud hosts.

---

## Supported Hosting Platforms

### 1. Vercel

Connect your Git repository to Vercel. SvelteKit automatically detects the platform and deploys serverless edge functions.

### 2. Cloudflare Pages

To deploy to Cloudflare Pages, install `@sveltejs/adapter-cloudflare` and update `svelte.config.js`:

```bash
npm install -D @sveltejs/adapter-cloudflare
```

### 3. Node.js Docker Container

For self-hosted Linux servers or Kubernetes:

```bash
npm install -D @sveltejs/adapter-node
```

Update `svelte.config.js` to use `adapter-node`, then run:

```bash
npm run build
node build
```

---

## Production Security Headers

The file `src/hooks.server.ts` automatically attaches:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
