# 03 — Content Management

All website content is organized into modular TypeScript domain modules located in `src/content/`. There is **no monolithic data file or database**.

---

## Directory Organization

```text
src/content/
├── site/site.config.ts          # Studio identity, office coordinates, nav links
├── home/home.content.ts         # 13-stage construction telemetry data
├── projects/                    # Individual project case studies
│   ├── index.ts
│   ├── project-001.ts
│   └── ...
├── services/                    # Engineering capabilities and scopes
│   ├── index.ts
│   ├── structural-engineering.ts
│   └── ...
├── experience/experience.ts     # Career timeline, PE/SE licenses, codes
├── testimonials/testimonials.ts # Verifiable client & peer endorsements
├── journal/                     # Whitepapers, research monographs, formulas
└── contact/contact.config.ts    # RFP types, dispatch office details
```

Each module is typed with strict interfaces in `src/lib/types/`, providing IDE autocompletion and compile-time error checking.
