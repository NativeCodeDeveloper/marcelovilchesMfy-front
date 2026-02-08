'use client'
// src/app/(public)/layout.jsx
import {ShadcnNavBar} from "@/Componentes/shadcnNavBar";
import CarritoProvider from "@/ContextosGlobales/CarritoContext";
import ToasterClient from "@/Componentes/ToasterClient";
import ObjetoPagarProvider from "@/ContextosGlobales/ObjetoPagarContext";
import FloatingWhatsApp from "@/Componentes/FloatingWhatsApp";
import FooterSiluetaChic from "@/Componentes/Footer";
import SeccionContacto from "@/app/(public)/seccionContacto/page";


export default function PublicLayout({ children }) {
    return (
        <ObjetoPagarProvider>
            <CarritoProvider>
                <div className="relative">
                    <ToasterClient />
                    <main className="relative z-0">{children}</main>
                </div>
            </CarritoProvider>
        </ObjetoPagarProvider>
    )
}