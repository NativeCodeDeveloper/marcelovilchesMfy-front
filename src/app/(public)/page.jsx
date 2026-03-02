"use client";
import React from 'react';
import { Poppins, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import ToasterClient from "@/Componentes/ToasterClient";
import { toast } from "react-hot-toast";



const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export default function HomePage() {

    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const CARD = `card`
    const [data_perfil, setData_perfil] = useState([]);
    const router = useRouter();

    function agendar(){
        router.push("/AgendaProceso");
    }

    async function seleccionarData_perfil() {
        try {
            const res = await fetch(`${API}/perfil/seleccionarPerfilProfesional`, {
                method: "GET",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                return toast.succes("Ha ocurrido un error en el perfil, contacte a soporte IT.");
            }

            const dataBackend = await res.json();
            setData_perfil(dataBackend);

        }catch (error) {
            return toast.error("Ha ocurrido un problema contacte a soporte.");
        }
    }

    useEffect(() => {
        seleccionarData_perfil();
    },[])



    return (
        <div className={`min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 ${inter.className}`}>

            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Breadcrumb */}
                <nav className="mb-10 flex items-center gap-2 text-sm text-slate-400">
                    <Link href="https://www.medifyclinic.cl" className="hover:text-teal-600 transition-colors duration-200">
                        Marketplace
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {data_perfil.map((perfil, index) => (
                        <span key={index} className="text-slate-700 font-medium">{perfil.nombreCompleto}</span>
                    ))}
                </nav>

                {/* Profile Header Card */}
                <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100/80 mb-8 overflow-hidden">

                    {/* Subtle gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-teal-50/60 via-slate-50/40 to-transparent pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">

                        {/* Profile Image */}

                            {data_perfil.map((perfil, index) => (
                                <div key={index} className="relative group">
                                <div  className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
                                <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg">
                                <img src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${perfil.imagenPerfil}/card`} alt="descripción" />
                                </div>

                </div>
                            ))}

                        {/* Main Info */}
                        <div className="flex-grow text-center md:text-left pt-2">

                            {/* Badge */}
                            {data_perfil.map((perfil, index) => (
                                <span key={index} className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-teal-100/60 mb-4">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                                    {perfil.profesionOcupacion}
                            </span>
                            ))}

                            {/* Name */}
                            {data_perfil.map((perfil, index) => (
                                <h1 key={index} className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3`}>
                                    {perfil.nombreCompleto}
                                </h1>
                            ))}

                            {/* Rating */}
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-800 font-semibold text-sm">4.8</span>
                                    <span className="text-slate-400 text-sm">(127 reseñas)</span>
                                </div>
                            </div>

                            {/* Description */}
                            {data_perfil.map((perfil, index) => (
                                <p key={index} className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl">
                                    {
                                        perfil.descripcionGeneral
                                    }                                </p>
                            ))
                            }
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Sobre mí */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100/80">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className={`${poppins.className} text-lg font-bold text-slate-900`}>Sobre mí</h2>
                            </div>
                            {data_perfil.map((perfil, index) => (
                                <p key={index} className="text-slate-500 text-justify leading-7 whitespace-pre-line">
                                    {perfil.descripcionDetallada}                                
                                    </p>
                            ))}
                        </div>

                        {/* Especialidades */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100/80">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h2 className={`${poppins.className} text-lg font-bold text-slate-900`}>Especialidades</h2>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad1}
                                </span>
                                ))}

                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad2}
                                </span>
                                ))}


                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad3}
                                </span>
                                ))}


                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad4}
                                </span>
                                ))}


                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad5}
                                </span>
                                ))}


                                {data_perfil.map((perfil, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700 transition-colors duration-200 cursor-default">
                                    {perfil.especialidad6}
                                </span>
                                ))}



                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact */}
                    <div>
                        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100/80 sticky top-8">
                            <h3 className={`${poppins.className} text-base font-bold text-slate-900 mb-6`}>Información de contacto</h3>

                            <div className="space-y-4">

                                {/* Ubicación */}
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100/60">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Ubicación</p>
                                        {
                                            data_perfil.map((perfil, index) => (
                                                <p key={index} className="text-slate-600 text-sm leading-snug">{perfil.ubicacion}</p>

                                            ))
                                        }                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100/60">
                                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Email</p>

                                        {
                                            data_perfil.map((perfil, index) => (
                                                <p key={index} className="text-slate-600 text-sm">{perfil.email}</p>

                                            ))
                                        }                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-slate-100 my-1" />

                                {/* Botón Agendar */}
                                <button
                                    onClick={() => agendar()}
                                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.98]">
                                    Agendar Hora
                                </button>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
