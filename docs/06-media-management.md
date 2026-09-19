# 06 — Media Management

The Engineering Portfolio System supports modern, lightweight, high-fidelity media formats.

---

## Supported Media Types

- **Images**: `.webp`, `.avif`, `.png`, `.jpg`, `.svg`
- **Video**: `.mp4`, `.webm`
- **3D Models**: `.glb`, `.gltf`
- **Vector Drawings**: `.svg`

---

## Recommended Asset Dimensions

| Usage                    | Format                 | Max Dimensions  | Target Size |
| ------------------------ | ---------------------- | --------------- | ----------- |
| Project Hero             | WebP / AVIF            | 1920 × 1080 px  | < 250 KB    |
| Technical Detail         | WebP / AVIF            | 1200 × 800 px   | < 150 KB    |
| Architectural Schematics | SVG                    | Vector Scalable | < 50 KB     |
| 3D GLB Models            | GLB (Draco compressed) | N/A             | < 2.5 MB    |

---

## Static Assets Directory

Place your project photos, drawings, and 3D files in `static/`:

```text
static/
├── images/
│   ├── projects/
│   └── site/
├── models/
│   └── construction-tower.glb
└── drawings/
    └── structural-plan.svg
```

In components and content files, reference them starting from the root slash:

```typescript
url: '/images/projects/apex-tower-hero.webp';
```
