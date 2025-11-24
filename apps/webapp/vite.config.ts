import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

// Check if HOST env var is set to 0.0.0.0
// this tells Vite to listen on 0.0.0.0, needed for WSL2 but can be removed for others.
const host = process.env.HOST === '0.0.0.0' ? true : false;

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3001,
    host,
  },
  build: {
    target: 'esnext',
  },
})
