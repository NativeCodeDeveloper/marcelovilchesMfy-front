'use client'
import Link from 'next/link';
import {useAgenda} from "@/ContextosGlobales/AgendaContext";

export default function ReservaHora({ fechaReserva = '', horaReserva = '' }) {

    const {
        fechaInicio,
        horaInicio,
        fechaFinalizacion,
        horaFinalizacion   } = useAgenda();

    const nombreProfesional = process.env.NEXT_PUBLIC_NOMBRE_PROFESIONAL || "Profesional";

  return (
    <section className="relative min-h-[70vh] w-full px-4 py-10 flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/60 via-cyan-200/40 to-white blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-cyan-200/50 via-indigo-200/40 to-white blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.25)]">

          {/* Header */}
          <div className="flex items-start gap-4 p-7 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                Reserva confirmada
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                ¡Hora agendada con éxito!
              </h1>

              <p className="mt-2 text-slate-700">
                Su hora con{" "}
                <span className="font-semibold text-indigo-600">
                  {nombreProfesional}
                </span>{" "}
                ha sido reservada correctamente.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Body */}
          <div className="p-7 sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Profesional</p>
                    <p className="text-sm text-slate-600">{nombreProfesional}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 19h14M6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Fecha y hora</p>
                    <p className="text-sm text-slate-600">{fechaInicio} - {horaInicio}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Tu cita ha sido agendada exitosamente.
              </p>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Recibirás un correo de confirmación con los detalles de tu reserva.
                Si necesitas cancelar o reagendar, por favor hazlo con al menos 24 horas de anticipación.
                <br /><br />
                Te recordamos llegar con puntualidad a tu cita. Si tienes dudas, no dudes en contactarnos.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <a
                href="/AgendaProceso"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                Agendar otra cita
              </a>

              <a
                href="/"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Volver al inicio
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
