'use client'
import React, { useState, useEffect } from 'react';
import ToasterClient from '@/Componentes/ToasterClient';
import toast from 'react-hot-toast';
import { subirImagenCloudflare } from '@/FuncionesTranversales/FuncionesCloudflare';

const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH;

export default function PerfilProfesional() {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [modoEdicion, setModoEdicion] = useState(false);
    const [id_profesional, setId_profesional] = useState('');
    const [cargando, setCargando] = useState(true);

    const [profesionOcupacion, setProfesionOcupacion] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [descripcionGeneral, setDescripcionGeneral] = useState('');
    const [descripcionDetallada, setDescripcionDetallada] = useState('');
    const [especialidad1, setEspecialidad1] = useState('');
    const [especialidad2, setEspecialidad2] = useState('');
    const [especialidad3, setEspecialidad3] = useState('');
    const [especialidad4, setEspecialidad4] = useState('');
    const [especialidad5, setEspecialidad5] = useState('');
    const [especialidad6, setEspecialidad6] = useState('');
    const [imagenPerfilActual, setImagenPerfilActual] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [subiendo, setSubiendo] = useState(false);
    const [rut, setRut] = useState('');
    const [registro_sis, setRegistro_sis] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [email, setEmail] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');

    useEffect(() => {
        async function cargarPerfil() {
            try {
                const res = await fetch(`${API}/perfil/seleccionarPerfilProfesional`, {
                    method: 'GET',
                    headers: { 'accept': 'application/json' },
                    mode: 'cors',
                });

                if (!res.ok) return;

                const data = await res.json();
                const perfil = data?.[0];

                if (perfil) {
                    setModoEdicion(true);
                    setId_profesional(perfil.id_profesional);
                    setProfesionOcupacion(perfil.profesionOcupacion ?? '');
                    setNombreCompleto(perfil.nombreCompleto ?? '');
                    setDescripcionGeneral(perfil.descripcionGeneral ?? '');
                    setDescripcionDetallada(perfil.descripcionDetallada ?? '');
                    setEspecialidad1(perfil.especialidad1 ?? '');
                    setEspecialidad2(perfil.especialidad2 ?? '');
                    setEspecialidad3(perfil.especialidad3 ?? '');
                    setEspecialidad4(perfil.especialidad4 ?? '');
                    setEspecialidad5(perfil.especialidad5 ?? '');
                    setEspecialidad6(perfil.especialidad6 ?? '');
                    setImagenPerfilActual(perfil.imagenPerfil ?? '');
                    setRut(perfil.rut ?? '');
                    setRegistro_sis(perfil.registro_sis ?? '');
                    setUbicacion(perfil.ubicacion ?? '');
                    setEmail(perfil.email ?? '');
                    setNumeroTelefono(perfil.numeroTelefono ?? '');
                }
            } catch (err) {
                // Si no hay perfil simplemente se queda en modo inserción
            } finally {
                setCargando(false);
            }
        }

        cargarPerfil();
    }, [API]);

    function handleSelectImagen(e) {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    }

    async function guardarPerfil(e) {
        e.preventDefault();

        if (!API) {
            toast.error('Falta NEXT_PUBLIC_API_URL');
            return;
        }

        const imagenRequerida = modoEdicion ? !imagenPerfilActual && !file : !file;

        if (
            !profesionOcupacion || !nombreCompleto || !descripcionGeneral ||
            !descripcionDetallada || !especialidad1 || !especialidad2 ||
            !especialidad3 || imagenRequerida || !rut || !registro_sis ||
            !ubicacion || !email || !numeroTelefono
        ) {
            toast.error('Por favor complete todos los campos obligatorios');
            return;
        }

        setSubiendo(true);

        // Si seleccionó una nueva imagen, subirla. Si no, usar la actual.
        let imageId = imagenPerfilActual;
        if (file) {
            try {
                imageId = await subirImagenCloudflare(file);
                if (!imageId) {
                    toast.error('Error al subir la imagen');
                    setSubiendo(false);
                    return;
                }
            } catch (err) {
                toast.error('Error al subir la imagen');
                setSubiendo(false);
                return;
            }
        }

        const endpoint = modoEdicion
            ? `${API}/perfil/editarDatosProfesional`
            : `${API}/perfil/insertarDatosProfesional`;

        const body = {
            profesionOcupacion,
            nombreCompleto,
            descripcionGeneral,
            descripcionDetallada,
            especialidad1,
            especialidad2,
            especialidad3,
            especialidad4,
            especialidad5,
            especialidad6,
            imagenPerfil: imageId,
            rut,
            registro_sis,
            ubicacion,
            email,
            numeroTelefono,
        };

        if (modoEdicion) body.id_profesional = id_profesional;

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                toast.error(modoEdicion ? 'Error al editar perfil' : 'Error al insertar perfil');
                return;
            }

            const respuestaBackend = await res.json();

            if (respuestaBackend.message === true) {
                setImagenPerfilActual(imageId);
                setFile(null);
                setPreview('');
                if (!modoEdicion) setModoEdicion(true);
                toast.success(modoEdicion ? 'Perfil actualizado correctamente' : 'Perfil creado correctamente');
            } else {
                toast.error(modoEdicion ? 'Error al editar perfil' : 'Error al insertar perfil');
            }
        } catch (error) {
            toast.error('Error de conexión');
        } finally {
            setSubiendo(false);
        }
    }

    const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition";
    const labelClass = "block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1";
    const textareaClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition resize-none min-h-[90px]";

    const imagenPreview = preview
        ? preview
        : imagenPerfilActual
            ? `https://imagedelivery.net/${CLOUDFLARE_HASH}/${imagenPerfilActual}/card`
            : null;

    if (cargando) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500 text-sm">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <ToasterClient />
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-sky-100">
                    <div className="mb-6">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl md:text-4xl font-semibold tracking-tight text-slate-900">
                                Perfil Profesional
                            </h1>
                            {modoEdicion && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                    Publicado
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            {modoEdicion
                                ? 'Edita los campos y guarda para actualizar tu perfil público.'
                                : 'Complete todos los campos obligatorios (*) para publicar tu perfil.'}
                        </p>
                    </div>

                    <form onSubmit={guardarPerfil}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className={labelClass}>Profesión / Ocupación *</label>
                                <input className={inputClass} type="text" value={profesionOcupacion} onChange={e => setProfesionOcupacion(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Nombre Completo *</label>
                                <input className={inputClass} type="text" value={nombreCompleto} onChange={e => setNombreCompleto(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>RUT *</label>
                                <input className={inputClass} type="text" value={rut} onChange={e => setRut(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Registro SIS *</label>
                                <input className={inputClass} type="text" value={registro_sis} onChange={e => setRegistro_sis(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Email *</label>
                                <input className={inputClass} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Número de Teléfono *</label>
                                <input className={inputClass} type="tel" value={numeroTelefono} onChange={e => setNumeroTelefono(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Ubicación *</label>
                                <input className={inputClass} type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Imagen de Perfil {modoEdicion ? '(opcional: cambia solo si quieres nueva foto)' : '*'}
                                </label>
                                <div
                                    className="mt-1 flex items-center gap-4 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-blue-400 transition"
                                    onClick={() => document.getElementById('inputImagenPerfil').click()}
                                >
                                    {imagenPreview ? (
                                        <img src={imagenPreview} alt="preview" className="w-14 h-14 rounded-full object-cover shrink-0" />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 text-xl">📷</div>
                                    )}
                                    <span className="text-sm text-slate-500">
                                        {file ? file.name : modoEdicion ? 'Haz clic para cambiar la imagen' : 'Haz clic para seleccionar una imagen'}
                                    </span>
                                </div>
                                <input
                                    id="inputImagenPerfil"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleSelectImagen}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>Descripción General *</label>
                                <textarea className={textareaClass} value={descripcionGeneral} onChange={e => setDescripcionGeneral(e.target.value)} />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>Descripción Detallada *</label>
                                <textarea className={textareaClass} value={descripcionDetallada} onChange={e => setDescripcionDetallada(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 1 *</label>
                                <input className={inputClass} type="text" value={especialidad1} onChange={e => setEspecialidad1(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 2 *</label>
                                <input className={inputClass} type="text" value={especialidad2} onChange={e => setEspecialidad2(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 3 *</label>
                                <input className={inputClass} type="text" value={especialidad3} onChange={e => setEspecialidad3(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 4</label>
                                <input className={inputClass} type="text" value={especialidad4} onChange={e => setEspecialidad4(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 5</label>
                                <input className={inputClass} type="text" value={especialidad5} onChange={e => setEspecialidad5(e.target.value)} />
                            </div>

                            <div>
                                <label className={labelClass}>Especialidad 6</label>
                                <input className={inputClass} type="text" value={especialidad6} onChange={e => setEspecialidad6(e.target.value)} />
                            </div>

                            <div className="sm:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={subiendo}
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 text-white font-semibold shadow hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {subiendo ? 'Guardando...' : modoEdicion ? 'Actualizar Perfil' : 'Publicar Perfil'}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
