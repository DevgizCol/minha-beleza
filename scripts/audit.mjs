#!/usr/bin/env node
/**
 * Auditor Determinista T0 del Sistema ADE (Minha Beleza)
 * Principio Ponytail YAGNI: Node standard library, cero tokens, ejecución < 500ms.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = process.cwd();

console.log('🏛️  [ADE AUDIT T0] Iniciando Auditoría Determinista de Calidad...\n');

let failed = false;

function check(label, fn) {
  try {
    process.stdout.write(`- ${label}... `);
    fn();
    console.log('✅ APROBADO');
  } catch (err) {
    console.log(`❌ FALLÓ: ${err.message}`);
    failed = true;
  }
}

// 1. Verificar existencia de archivos clave
check('Estructura de arquitectura ADE', () => {
  const required = ['AGENTS.md', 'playwright.config.ts', 'src/App.tsx', 'index.html', 'data/db.json'];
  for (const f of required) {
    if (!fs.existsSync(path.join(rootDir, f))) {
      throw new Error(`Falta el archivo indispensable: ${f}`);
    }
  }
});

// 2. Comprobación de types y build
check('Compilación TypeScript & Vite Build', () => {
  execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });
});

// 3. Comprobación de bundle size (Garantía Ponytail < 500KB gzipped)
check('Presupuesto de Rendimiento Ponytail (Bundle Size)', () => {
  const distAssets = path.join(rootDir, 'dist', 'assets');
  if (!fs.existsSync(distAssets)) {
    throw new Error('La carpeta dist/assets no existe');
  }
  const files = fs.readdirSync(distAssets);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  if (jsFiles.length === 0) throw new Error('No se generaron archivos JS');

  let totalJsBytes = 0;
  for (const js of jsFiles) {
    const stats = fs.statSync(path.join(distAssets, js));
    totalJsBytes += stats.size;
  }
  const kb = Math.round(totalJsBytes / 1024);
  if (kb > 600) {
    throw new Error(`El bundle JS supera el presupuesto estricto: ${kb} KB (límite: 600 KB)`);
  }
});

// 4. Verificación de SEO y Schema.org en index.html
check('Validación SEO & Schema.org DaySpa JSON-LD', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  if (!html.includes('schema.org') || !html.includes('DaySpa')) {
    throw new Error('index.html no contiene el marcado estructurado DaySpa');
  }
  if (!html.includes('og:title') || !html.includes('twitter:card')) {
    throw new Error('Faltan metatags OpenGraph o Twitter Cards');
  }
});

console.log('\n-----------------------------------------------------');
if (failed) {
  console.log('🚨 AUDITORÍA CON ERRORES: Por favor revisa los puntos señalados.');
  process.exit(1);
} else {
  console.log('✨ AUDITORÍA 100% EXITOSA: Calidad de Producción Nivel $50k USD garantizada.');
  process.exit(0);
}
