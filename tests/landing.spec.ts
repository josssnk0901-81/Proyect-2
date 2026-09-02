import {test, expect, type Page} from "@playwright/test";

/** Ruido esperado en `next dev` que no representa un fallo real. */
const DEV_NOISE = [
  "Fast Refresh",
  "[HMR]",
  "react-devtools",
  "_next/hmr", // websocket de HMR
  "Download the React DevTools",
];

function collectPageProblems(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (DEV_NOISE.some((n) => text.includes(n))) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

const LOCALES = [
  {code: "es", headline: "De una idea a un sistema serio."},
  {code: "ja", headline: "アイデアから、本物のシステムへ。"},
  {code: "en", headline: null}, // solo verificamos que carga y cambia
] as const;

test.describe("Landing JossSnK 無月", () => {
  for (const {code, headline} of LOCALES) {
    test(`carga /${code} sin errores de consola ni violaciones de CSP`, async ({page}) => {
      const problems = collectPageProblems(page);

      const response = await page.goto(`/${code}`, {waitUntil: "networkidle"});
      expect(response, "respuesta del documento").toBeTruthy();
      expect(response!.status()).toBe(200);

      // La CSP debe estar presente y basada en nonce.
      const csp = response!.headers()["content-security-policy"] ?? "";
      expect(csp, "cabecera CSP").toContain("script-src");
      expect(csp).toContain("'nonce-");
      expect(csp).toContain("'strict-dynamic'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");

      // Contenido del hero.
      if (headline) {
        await expect(page.getByRole("heading", {level: 1})).toContainText(headline);
      }
      // <html lang> refleja el locale.
      await expect(page.locator("html")).toHaveAttribute("lang", code);

      // Sin errores reales tras estabilizar.
      await page.waitForTimeout(600);
      expect(problems, `errores en /${code}`).toEqual([]);
    });
  }

  test("el switcher de idioma navega ES → JP → EN", async ({page}) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await page.getByRole("button", {name: "JP", exact: true}).click();
    await expect(page).toHaveURL(/\/ja(\/|$|\?)/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.getByRole("heading", {level: 1})).toContainText("システム");

    await page.getByRole("button", {name: "EN", exact: true}).click();
    await expect(page).toHaveURL(/\/en(\/|$|\?)/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("el scroll revela las secciones y el contacto queda visible", async ({page}) => {
    await page.goto("/es");

    // Todas las secciones existen en el DOM.
    await expect(page.getByRole("heading", {name: "Disciplinas"})).toBeAttached();
    await expect(page.getByRole("heading", {name: "Casos"})).toBeAttached();

    // Bajar al contacto y comprobar los enlaces clave.
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    const wa = page.getByRole("link", {name: "WhatsApp"});
    await expect(wa).toBeVisible();
    await expect(wa).toHaveAttribute("href", "/api/wa");
    await expect(page.getByRole("link", {name: "Descargar CV"})).toHaveAttribute(
      "href",
      "/cv-jossnk.pdf",
    );
    // El número de WhatsApp NO debe aparecer en el HTML del cliente.
    const html = await page.content();
    expect(html).not.toContain("wa.me");
    expect(html).not.toMatch(/\b\d{12,13}\b/); // ningún teléfono crudo en el bundle
  });

  test("el carrusel abre la galería de un caso, navega y cierra", async ({page}) => {
    await page.goto("/es");

    // MOGU tiene 3 capturas (Dashboard, Clientes, NFC). El caption refleja la lámina.
    await page.getByRole("button", {name: "Ver capturas — MOGU"}).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Dashboard");

    await dialog.getByRole("button", {name: "Siguiente"}).click();
    await expect(dialog).toContainText("Clientes");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("las imágenes de trabajo no se arrastran; solo el CV se descarga", async ({page}) => {
    await page.goto("/es");
    // Portadas de trabajo: draggable=false (freno al guardado casual).
    await expect(page.locator("#trabajo img").first()).toHaveAttribute("draggable", "false");
    // El CV en PDF sí conserva la descarga.
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    const cv = page.getByRole("link", {name: "Descargar CV"});
    expect(await cv.getAttribute("download")).not.toBeNull();
    await expect(cv).toHaveAttribute("href", "/cv-jossnk.pdf");
  });

  test("/api/wa redirige a wa.me sin exponer el número en el cliente", async ({page}) => {
    const res = await page.request.get("/api/wa", {maxRedirects: 0});
    expect([302, 307, 308]).toContain(res.status());
    expect(res.headers()["location"] ?? "").toContain("wa.me/");
  });
});
