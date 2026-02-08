// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";




export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="min-h-screen bg-white">
          {/* Aquí usamos el componente cliente que ya maneja Motion */}
          <AnimatedLayout>
            <AgendaProvider>
              {children}
            </AgendaProvider>
          </AnimatedLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}