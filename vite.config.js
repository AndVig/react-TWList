import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0', // Ascolta su tutte le interfacce di rete
    port: 4173, // Puoi specificare una porta diversa se necessario
  },
})
