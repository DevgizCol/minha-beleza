# 🏛️ MINHA BELEZA — Santuario Digital de Alta Estética & ADE

[![ADE T0 Quality Audit](https://img.shields.io/badge/ADE%20Audit-100%25%20Aprobado-gold?style=for-the-badge&logo=shield)](https://github.com)
[![Architecture: Ponytail YAGNI](https://img.shields.io/badge/YAGNI-Ponytail%20Strict-purple?style=for-the-badge)](https://github.com/DietrichGebert/ponytail)
[![Testing: Playwright](https://img.shields.io/badge/E2E-Playwright%20Tested-green?style=for-the-badge&logo=playwright)](https://playwright.dev)
[![Stack: 100% Free Tier](https://img.shields.io/badge/Stack-100%25%20Free%20Tier-blue?style=for-the-badge)](https://github.com)

> **Producción Digital Nivel $50,000 USD**  
> Santuario residencial de masoterapia clínica y cosmetología de autor en Laureles (Medellín), concebido bajo los estándares de alta costura digital (*Aman Resorts, Cheval Blanc Paris, Dior Spa*) con una arquitectura **Ponytail YAGNI** antifrágil, cero sobre-ingeniería y 120 FPS fluidos.

---

## 🌟 1. Pilares de la Experiencia Visual ($50k Production Tier)

1. **Obsidian Depth & Real Gold Leaf**:
   - Paleta cromática profunda (`#070709` y `#0E0C16`) que absorbe la luz como piedra basáltica, combinada con foil satinado de pan de oro (`#D4AF37`, `#F7E7A9`) y subtonos amatista difusos.
   - Oclusión ambiental multicapa (sombras de 4 niveles) y glassmorphism ultra-fino (`backdrop-filter: blur(24px)`).
2. **Tríada Tipográfica Editorial**:
   - `Cinzel`: Titulares monumentales con tracking expansivo en caja alta.
   - `Cormorant Garamond` (Itálica): Narrativa sensorial, evocación y citas de autor.
   - `Plus Jakarta Sans`: Números tabulares alineados para tarifas, tiempos y telemetría de interfaz.
3. **Bento Grid Asimétrico & Microinteracciones**:
   - Catálogo interactivo con etiquetas Signature, filtros instantáneos y modal inmersivo de protocolo clínico.
4. **Motor de Reservas "The Sanctuary Pathway" & Luxury Boarding Pass**:
   - Flujo sin fricción de 3 pasos con cálculo de disponibilidad en vivo.
   - Confirmación tipo billete de club privado con troquelado digital, código criptográfico (`MB-XXXX`), confeti dorado y botones inmediatos para sincronizar con Google Calendar y WhatsApp Concierge.
5. **Atmósfera Háptica & Zen Audio procedural (Web Audio API Nativo)**:
   - Micro-ticks de cristal y campana armónica afinada a 528Hz sin añadir ni un solo byte de archivos `.mp3` pesados.
6. **Selector de Divisa Dinámico**:
   - Alternancia en vivo entre Pesos Colombianos (`COP`), Dólares (`USD`) y Euros (`EUR`).

---

## 🛠️ 2. Arquitectura ADE & Principios Ponytail YAGNI

El proyecto incorpora un **Agentic Development Environment (ADE)** gobernado por las reglas de [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail):
- **Cero dependencias superfluas**: Aprovechamiento extremo de React 19 nativo y Web APIs estándar (`crypto.randomUUID`, `Intl.NumberFormat`, `localStorage`, `dialog`, `AudioContext`).
- **Composite-only animations**: Garantía de 120 FPS en pantallas móviles Retina/ProMotion sin saltos de layout (`CLS = 0.000`).
- **Resiliencia de Datos Híbrida**: En desarrollo utiliza el plugin API de Vite; en despliegues estáticos (GitHub Pages / Cloudflare) conmuta automáticamente a LocalStorage para garantizar que la reserva y administración sigan funcionando 100% interactivas sin requerir backend de pago.

---

## 🚀 3. Comandos de la Suite ADE

```bash
# Iniciar entorno de desarrollo
npm run dev

# Compilar producción optimizada (Check TypeScript estricto)
npm run build

# Ejecutar Auditoría Determinista ADE T0
npm run ade:audit

# Ejecutar suite de pruebas End-to-End con Playwright
npm run ade:test

# Modo visual interactivo de Playwright
npm run ade:test:ui
```

---

## 📦 4. Despliegue 100% Free Tier Estable

El archivo `.github/workflows/ci.yml` automatiza el ciclo de vida completo sin ningún costo recurrente:
1. **Validación T0**: Ejecuta `npm run ade:audit` para asegurar cero regresiones.
2. **Pruebas E2E**: Ejecuta Playwright en Chromium headless.
3. **Despliegue a GitHub Pages**: Publica el build estático automáticamente en tu dominio de GitHub (`https://<tu-usuario>.github.io/<repo>`).

---

## 🔐 5. Guía Paso a Paso para Conectar con tu GitHub

Para subir este proyecto a tu cuenta personal de GitHub, sigue estos 3 sencillos pasos:

### Opción A (Recomendada: GitHub CLI)
Si tienes `gh` instalado:
```bash
gh auth login
gh repo create minha-beleza --public --source=. --remote=origin --push
```

### Opción B (Con Personal Access Token - PAT)
1. Ve a [GitHub Settings > Developer Settings > Personal Access Tokens (Classic)](https://github.com/settings/tokens).
2. Genera un nuevo token con los scopes `repo` y `workflow`.
3. Crea un repositorio vacío en GitHub llamado `minha-beleza`.
4. Ejecuta en tu terminal:
```bash
cd /home/danielg21/Documentos/DanielG/2026/DevGiz/Osmer
git remote add origin https://<TU_USUARIO_GITHUB>:<TU_TOKEN>@github.com/<TU_USUARIO_GITHUB>/minha-beleza.git
git push -u origin main
```
5. En la configuración del repositorio en GitHub:
   - Ve a **Settings > Pages**.
   - En **Build and deployment > Source**, selecciona **GitHub Actions**.
   - ¡Listo! En menos de 2 minutos tu sitio estará en vivo a nivel mundial con certificado SSL y CDN global gratuito de por vida.
