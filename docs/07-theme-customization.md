# 07 — Theme Customization

The system enforces an architectural design language inspired by structural plans, technical drafting linework, and restrained monochrome surfaces.

---

## Approved Color Palette

Defined in `src/routes/layout.css` via Tailwind v4 `@theme`:

```css
@theme {
	/* Architectural Dark Canvas */
	--color-arch-black: #000000;
	--color-arch-graphite: #121212;
	--color-arch-charcoal: #181818;
	--color-arch-surface: #1f1f1f;
	--color-arch-elevated: #272727;
	--color-arch-border: #313131;

	/* Disciplined Technical Accent */
	--color-arch-accent: #e5a93c; /* Technical Amber */
	--color-arch-accent-muted: #a37525;
	--color-arch-accent-light: #f7d070;
}
```

### Changing the Accent Color

To switch from Technical Amber to Safety Cadmium Orange or Blueprint Cyan, modify `--color-arch-accent` in `src/routes/layout.css`:

- **Blueprint Cyan**: `#0EA5E9`
- **Cadmium Safety Orange**: `#E05A2B`
- **Architectural Brass**: `#D4AF37`

---

## Typography

Approved font families:

- **Headings**: `Manrope` or `Geist` (with tight tracking `-0.03em`)
- **Body**: `Geist` or `Manrope`
- **Metadata & Calculations**: `Geist Mono`

> **Note**: As per the engineering design standard, **italic typography is strictly disabled** across all components.
