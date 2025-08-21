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
            './src/pages/admin/Dashboard.tsx',
            './src/components/admin/dashboard/index.ts'
          ],
          'admin-products': [
            './src/pages/admin/ProductManagement.tsx',
            './src/components/admin/books/index.ts'
          ],
          'admin-users': [
            './src/pages/admin/UserManagement.tsx',
            './src/components/admin/users/index.ts'
          ],
          'admin-orders': [
            './src/pages/admin/OrderManagement.tsx',
            './src/components/admin/orders/index.ts'
          ],
          'admin-shared': [
            './src/components/admin/shared/index.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
