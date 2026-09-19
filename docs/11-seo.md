# 11 — SEO & Structured Metadata

The Engineering Portfolio System includes automated search engine optimization and structured metadata.

---

## Capabilities

- **Dynamic XML Sitemap**: Generated automatically at `/sitemap.xml` incorporating all projects, services, whitepapers, and static routes.
- **Crawler Directives**: Managed at `/robots.txt` pointing search crawlers to the sitemap.
- **Unique Titles & Meta Descriptions**: Rendered per project and service page via `<svelte:head>`.
- **Social Graph Tags**: OpenGraph and Twitter Card tags configured for all case studies.

---

## Adding Schema.org JSON-LD

To inject structured data (e.g. `schema.org/Person` or `schema.org/ProfessionalService`), add a `<script type="application/ld+json">` tag inside `<svelte:head>` in `src/routes/+layout.svelte`.
