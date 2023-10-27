import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const flaskURL = "http://127.0.0.1:5051";

export default defineConfig(env => { return {
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
        fs: {
            allow: ["examples", "."],
        },
        port: 5170,
        strictPort: true,
        proxy: {
            // these routes are proxied to flask server in 'single project' mode
            '^/(get_|images|tracks|save).*': {
                target: flaskURL,
                changeOrigin: true,
            },
            '^/project/.*/\?': { //this works with ?dir=/project/project_name
                target: flaskURL,
                changeOrigin: true,
            },
            //will fail if url has search params
            //will cause problems if we have json files that don't want to be proxied
            '^/.*\.(json|b|gz)$': {
                target: flaskURL,
                changeOrigin: true,
            },
        }
    },
    resolve: {
        alias: {
            "/data": "/examples/data",
        }
    },
    publicDir: "examples",
    build: {
        outDir: process.env.OUT_DIR || "vite-dist",
        rollupOptions: {
            input: {
                index: "./index.html",
            }
        }
    },
    plugins: [
        react({
            include: [/\.tsx?$/, /\.jsx?$/],
        })
    ],
}})