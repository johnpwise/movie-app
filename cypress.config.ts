import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
            viteConfig: {
                define: {
                    'process.env.CYPRESS': 'true', // ✅ define for Vite plugin filtering
                }
            }
        },
        supportFile: "cypress/support/component.ts",
    },
});
