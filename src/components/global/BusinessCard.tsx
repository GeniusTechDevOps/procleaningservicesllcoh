import { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";
import { motion, AnimatePresence } from "framer-motion";

interface BusinessCardProps {
    data: RootObject;
}

type TabType = "info" | "services";

const BusinessCard: React.FC<BusinessCardProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<TabType>("info");
    const [sendInput, setSendInput] = useState("");

    const sendWhatsapp = () => {
        const relmsg = sendInput ? encodeURIComponent(sendInput) : encodeURIComponent("¡Hola! Me interesa conectar contigo.");
        const phone = data.dataGeneral.phones[0].number.replace(/[- ]/g, "");
        window.open(`https://wa.me/1${phone}?text=${relmsg}`, "_blank");
        setSendInput("");
    };

    return (
        <section className="w-full py-16 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 h-screen">
            {/* Contenedor Holográfico Principal */}
            <div className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 relative group">
                
                {/* Destellos de luz ambientales en el fondo */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/15 transition-all duration-750" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-tertiary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-tertiary/15 transition-all duration-750" />

                {/* HEADER: Identidad de Marca */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/60 bg-slate-950/20">
                    <div className="flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
                        <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-inner max-w-[160px]">
                            <img 
                                src={data.logos.primary} 
                                alt="Logo" 
                                className="object-contain w-full h-auto tracking-wider"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-white capitalize bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
                                {data.name}
                            </h1>
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary mt-1 flex items-center justify-center md:justify-start gap-1.5">
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Active Digital Card
                            </p>
                        </div>
                    </div>

                    {/* Switcher de Pestañas (Interactivo y Premium) */}
                    <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 w-full md:w-auto">
                        {(["info", "services"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative flex-1 md:flex-initial px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors duration-300 z-10 ${
                                    activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {tab === "info" ? "Contact" : "Services"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CUERPO: Contenido Dinámico con AnimatePresence */}
                <div className="p-6 md:p-8 min-h-[220px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "info" ? (
                            <motion.div
                                key="info-tab"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {/* Address */}
                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-700/60 transition-colors">
                                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-0.5">
                                        <i className="fa-solid fa-location-dot text-base" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Location</span>
                                        <p className="text-slate-300 text-sm font-medium leading-relaxed">{data.accountAddress}</p>
                                    </div>
                                </div>

                                {/* Teléfonos */}
                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-700/60 transition-colors">
                                    <div className="p-2.5 rounded-lg bg-secondary/10 text-secondary mt-0.5">
                                        <i className="fa-solid fa-phone text-base" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Contact Phones</span>
                                        <div className="flex flex-col gap-1">
                                            {data.dataGeneral.phones.slice(0, 2).map((phone, idx) => (
                                                <a key={idx} href={`tel:+1${phone.number}`} className="text-slate-300 text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5">
                                                    {phone.number}
                                                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Emails */}
                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-700/60 transition-colors">
                                    <div className="p-2.5 rounded-lg bg-tertiary/10 text-tertiary mt-0.5">
                                        <i className="fa-solid fa-envelope text-base" />
                                    </div>
                                    <div className="overflow-hidden w-full">
                                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Email</span>
                                        {data.dataGeneral.emails.slice(0, 2).map((email, idx) => (
                                            <a key={idx} href={`mailto:${email.email}`} className="block text-slate-300 text-sm font-semibold hover:text-primary transition-colors truncate w-full">
                                                {email.email}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Official Website */}
                                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-700/60 transition-colors">
                                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                                        <i className="fa-solid fa-globe text-base" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Official Website</span>
                                        <a href={`https://${data.domain}`} target="_blank" rel="noopener noreferrer" className="text-slate-300 text-sm font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                                            {data.domain}
                                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="services-tab"
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                                {data.services.slice(0, 6).map((service, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/20 border border-slate-800/60 hover:bg-slate-800/20 hover:border-slate-700/50 transition-all duration-300 group/item"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary group-hover/item:scale-125 transition-transform" />
                                        <p className="text-sm font-semibold text-slate-300 group-hover/item:text-white transition-colors">
                                            {service.title}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* FOOTER: Barra de Acción Rápida & Redes */}
                <div className="p-6 bg-slate-950/60 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Input Compacto Interno para el WhatsApp */}
                    <div className="relative w-full sm:w-72 flex items-center">
                        <input 
                            type="text" 
                            placeholder="Send a message..."
                            value={sendInput}
                            onChange={(e) => setSendInput(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                        <button 
                            onClick={sendWhatsapp}
                            className="absolute right-1.5 p-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg transition-colors"
                            title="Send via WhatsApp"
                        >
                            <i className="fa-brands fa-whatsapp text-base" />
                        </button>
                    </div>

                    {/* Redes Sociales con Estilo de Botón Flotante */}
                    <div className="flex gap-2.5 self-center sm:self-auto">
                        {data.redesSociales.map((red, index) => (
                            <a 
                                href={red.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                key={index}
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all transform hover:-translate-y-1 shadow-md"
                            >
                                <i className={`fa-brands fa-${red.icon} text-lg`} />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BusinessCard;