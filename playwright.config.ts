import {defineConfig, devices} from "@playwright/test";

/**
 * Regresión visual/funcional de la landing JossSnK 無月.
 * Levanta `next dev` en :3100 (fuera del 3000 que usa el server interactivo)
 * y corre el suite contra los tres locales.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {name: "chromium", use: {...devices["Desktop Chrome"]}},
  ],
  // Next 16 mantiene un lock de instancia única por directorio, así que reutilizamos
  // el `next dev` ya levantado en :3000 en vez de arrancar un segundo servidor.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/es",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
