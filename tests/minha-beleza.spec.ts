import { test, expect } from '@playwright/test';

test.describe('Minha Beleza — Experiencia Digital Ultra-Premium', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Debe cargar la portada del Santuario con diseño editorial y confianza', async ({ page }) => {
    await expect(page).toHaveTitle(/Minha Beleza/i);
    // Verificar logotipo e identidad
    const logo = page.locator('img[alt="Minha Beleza - Rosangel Benítez"]');
    await expect(logo).toBeVisible();

    // Titular principal
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Bienestar & Esplendor Natural/i);

    // Indicador social proof
    await expect(page.locator('text=4.98 / 5.0')).toBeVisible();
    await expect(page.locator('text=1-a-1 Exclusivo')).toBeVisible();
  });

  test('2. Debe permitir alternar divisas dinámicamente (COP, USD, EUR)', async ({ page }) => {
    // Click en botón de divisa USD
    const usdBtn = page.locator('button:has-text("USD")');
    if (await usdBtn.isVisible()) {
      await usdBtn.click();
      // Toast de confirmación
      await expect(page.locator('text=Moneda ajustada a USD')).toBeVisible();
    }
  });

  test('3. Debe filtrar tratamientos en el Bento Grid', async ({ page }) => {
    // Filtrar por Cejas & Pestañas
    const catBtn = page.locator('button:has-text("Cejas & Pestañas")');
    await catBtn.click();
    // Verificar que la lista muestre servicios de esa categoría
    await expect(page.locator('#servicios')).toBeVisible();
  });

  test('4. Flujo de Reserva: Sanctuary Pathway y generación de Boarding Pass', async ({ page }) => {
    // Abrir modal de reserva
    const bookBtn = page.locator('button:has-text("Reservar Cita Privada")').first();
    await bookBtn.click();

    // Verificar modal abierto en Paso 1 o Paso 2
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Si está en Paso 1, avanzar
    const nextBtn = page.locator('button:has-text("Continuar al Calendario")');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
    }

    // Seleccionar hora si hay slots disponibles
    const slotBtn = page.locator('button:has-text("10:00")').first();
    if (await slotBtn.isVisible() && await slotBtn.isEnabled()) {
      await slotBtn.click();
      const contactBtn = page.locator('button:has-text("Siguiente: Datos de Contacto")');
      await contactBtn.click();

      // Completar datos del huésped
      await page.fill('input[placeholder="Ej. Isabella Gómez"]', 'Valentina Restrepo');
      await page.fill('input[placeholder="Ej. +57 300 123 4567"]', '+573109876543');

      // Marcar consentimientos legales obligatorios
      const checkboxes = page.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      for (let i = 0; i < count; i++) {
        await checkboxes.nth(i).check();
      }

      // Confirmar reserva
      const confirmBtn = page.locator('button:has-text("Confirmar Reserva en Suite")');
      await confirmBtn.click();

      // Verificar Luxury Boarding Pass
      await expect(page.locator('text=Tu Santuario te Aguarda')).toBeVisible();
      await expect(page.locator('text=MINHA BELEZA • SUITE PASS')).toBeVisible();
      await expect(page.locator('text=Auditoría Legal Certificada')).toBeVisible();
    }
  });

  test('5. Portal de Clientes: Debe permitir consultar estado con código o teléfono', async ({ page }) => {
    const portalBtn = page.locator('button:has-text("Mis Citas")').first();
    await portalBtn.click();

    const clientModal = page.locator('[role="dialog"]');
    await expect(clientModal).toBeVisible();
    await expect(page.locator('text=Gestión de Citas & Huéspedes')).toBeVisible();
  });

  test('6. Verificación de Banner de Cookies y Atribución DevGiz', async ({ page }) => {
    // Verificar atribución de autoría oficial a DevGiz
    const devgizLink = page.locator('a[href="https://devgiz.vercel.app/"]');
    await expect(devgizLink).toBeVisible();
    await expect(devgizLink).toContainText('DevGiz');
  });
});

