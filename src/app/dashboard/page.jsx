"use client";
import {Michroma} from "next/font/google";

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
});

export default function DashboardHome() {

    return (
        <div>

            {/*PANTALLAS CELULARES*/}
            <div className="block md:hidden">
                <div
                    className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-10 bg-cover bg-center"
                    style={{ backgroundImage: "url('/prosuite.png')" }}>
                    <div className="absolute inset-0 overflow-hidden"></div>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl -mt-40">
                        <h1 className={`${michroma.className} text-4xl font-extrabold tracking-tight text-cyan-700`}>
                            MedifyClinic
                        </h1>
                        <p className={`${michroma.className} font-extrabold tracking-tight text-cyan-700`}>
                            Clínica en la nube
                        </p>
                    </div>
                </div>
            </div>

            {/*PRINCIPAL EN PANTALLAS DE ESCRITORIO*/}
            <div className="hidden md:block">
                <div
                    className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-10 bg-cover bg-center"
                    style={{ backgroundImage: "url('/prosuite.png')" }}>
                    <div className="absolute inset-0 overflow-hidden"></div>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl -mt-20">
                        <h1 className={`${michroma.className} text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-700`}>
                            MedifyClinic
                        </h1>
                        <h2 className={`${michroma.className} mt-1 text-base md:text-xl font-medium text-cyan-700`}>
                            Clínica en la nube
                        </h2>
                    </div>
                </div>
            </div>
        </div>

    );
}
