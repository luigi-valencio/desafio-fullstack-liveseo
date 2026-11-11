import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL(".", import.meta.url));
// Uma única fonte para o exercício HTML/CSS, servido também pelo frontend.
const registrationFiles: Record<string, string> = {
  "/": "text/html; charset=utf-8",
  "/index.html": "text/html; charset=utf-8",
  "/styles.css": "text/css; charset=utf-8",
  "/assets/liveseo-logo.webp": "image/webp",
};
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    {
      name: "registration-page",
      configureServer(server) {
        server.middlewares.use("/cadastro", (req, res) => {
          const path = (req.url ?? "/").split("?")[0]!;
          const type = registrationFiles[path];
          if (!type) {
            res.statusCode = 404;
            res.end("Página não encontrada");
            return;
          }
          res.setHeader("Content-Type", type);
          res.end(
            readFileSync(
              resolve(
                root,
                "../registration",
                path === "/" ? "index.html" : path.slice(1),
              ),
            ),
          );
        });
      },
      closeBundle() {
        mkdirSync(resolve(root, "dist/cadastro/assets"), { recursive: true });
        for (const file of [
          "index.html",
          "styles.css",
          "assets/liveseo-logo.webp",
        ]) {
          copyFileSync(
            resolve(root, "../registration", file),
            resolve(root, "dist/cadastro", file),
          );
        }
      },
    },
  ],
});
