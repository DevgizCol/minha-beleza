# OSMER (Minha Beleza) — Agentic Development Environment (ADE) & Protocol

> **Estándar de Producción**: Nivel Ultra-Premium ($50,000 USD Digital Experience).
> **Filosofía de Código**: *Ponytail Strict YAGNI* (The Laziest Senior Developer: Cero bloat, cero dependencias redundantes, máximo aprovechamiento de la plataforma web nativa y React 19).
> **Gobernanza**: Multi-agente orquestado, auditoría determinista T0, tests E2E con Playwright y despliegue CI/CD 100% Free Tier estable.

---

## 1. La Escalera de la Pereza Senior (Ponytail Ladder)

Antes de escribir cualquier línea de código o sugerir un nuevo paquete, cada agente debe evaluar estrictamente:

1. **¿Es estrictamente necesario que exista?** $\rightarrow$ Si no, descártalo.
2. **¿Ya existe en esta base de código?** $\rightarrow$ Reutiliza, no reescribas ni dupliques.
3. **¿La biblioteca estándar de Node/TS o Web APIs lo resuelven?** $\rightarrow$ Usa Web APIs nativas (`crypto.randomUUID()`, `AudioContext`, `Intl.NumberFormat`, `IntersectionObserver`, `dialog`, `localStorage`).
4. **¿Una característica nativa de CSS/HTML lo logra?** $\rightarrow$ Usa CSS variables, `backdrop-filter`, `accent-color`, `@keyframes` en vez de librerías de 150KB.
5. **¿Ya está instalado el paquete?** $\rightarrow$ Usa lo que hay (`lucide-react`, `canvas-confetti`).
6. **¿Se resuelve en una línea limpia?** $\rightarrow$ Escríbelo en una línea.
7. **Solo entonces**: Escribe el mínimo código modular, tipado y accesible que cumpla el objetivo con excelencia.

*Excepción sagrada: Accesibilidad (a11y), contraste WCAG, validación de inputs y manejo resiliente de errores NUNCA se sacrifican.*

---

## 2. Roles del Enjambre de Agentes

- **Orquestador Principal**: Define la arquitectura global, la coherencia de estado y la integración de servicios.
- **Especialista UI/UX Haute Horlogerie / Luxury Spa**: Garantiza que cada componente transmita una experiencia de ultra-lujo (Cinzel + Cormorant Garamond + Plus Jakarta Sans, paleta Obsidian & Champagne Gold, Bento grids asimétricos, microinteracciones a 60fps).
- **Auditor Determinista T0 & E2E (Playwright)**: Ejecuta tests automáticos de regresión visual, pruebas de flujo de reserva de citas, validación de tipos TypeScript y verificación de accesibilidad.
- **DevOps & Release Engineer**: Administra el repositorio Git, GitHub Actions, despliegue estático sin costo en GitHub Pages / Cloudflare Pages / Vercel, y la persistencia híbrida (API Vite + LocalStorage fallback).

---

## 3. Comandos de la Suite ADE

```bash
# Desarrollo local con mock API integrado
npm run dev

# Compilación de producción optimizada
npm run build

# Auditoría determinista completa (Lint + Typecheck + a11y)
npm run ade:audit

# Pruebas End-to-End con Playwright
npm run ade:test

# Lanzamiento de Playwright con UI visual
npm run ade:test:ui
```
