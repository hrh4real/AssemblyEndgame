import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
base: '/AssemblyEndgame/', // Set base URL for GitHub Pages deployment
build: {
    outDir: 'dist',
    emptyOutDir: true,
},
resolve: {
    alias: {
    '@': resolve(__dirname, './src')
    }
},
root: '.', // Set the root directory where index.html is located
})
