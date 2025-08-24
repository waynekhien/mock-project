import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': ['lucide-react'],

          // Admin chunks
          'admin-dashboard': [
            './src/admin/pages/Dashboard.tsx',
            './src/admin/components/dashboard/index.ts'
          ],
          'admin-products': [
            './src/admin/pages/ProductManagement.tsx',
            './src/admin/components/books/index.ts'
          ],
          'admin-users': [
            './src/admin/pages/UserManagement.tsx',
            './src/admin/components/users/index.ts'
          ],
          'admin-orders': [
            './src/admin/pages/OrderManagement.tsx',
            './src/admin/components/orders/index.ts'
          ],
          'admin-shared': [
            './src/admin/components/shared/index.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
