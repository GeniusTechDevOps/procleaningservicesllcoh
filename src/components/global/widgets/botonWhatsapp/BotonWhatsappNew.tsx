import React, { useState, useEffect, useRef } from "react";

interface BotonWhatsappNewProps {
  data: any;
}

export default function BotonWhatsappNew({ data }: BotonWhatsappNewProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus al abrir la caja de texto
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendWhatsapp = () => {
    if (!message.trim()) return;

    const relmsg = encodeURIComponent(message.trim());
    let phone = data?.dataGeneral?.phones?.[0]?.number?.replace(/[\s\-\+]/g, "") || "";
    
    if (!phone) return;

    if (phone.length === 10 && !phone.startsWith("1")) {
      phone = `1${phone}`;
    }

    window.open(`https://wa.me/${phone}?text=${relmsg}`, "_blank");
    setMessage("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendWhatsapp();
    }
  };

  return (
    <div className="w-full flex justify-center relative font-sans">
      
      {/* BOTÓN REFINADO PARA EL SIDEBAR / GRID DE WIDGETBUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className={`
          w-11 h-11 rounded-xl flex justify-center items-center text-white shadow-md transition-all duration-300 active:scale-95 border border-white/10 group
          ${open 
            ? "bg-slate-900 shadow-slate-900/10" 
            : "bg-gradient-to-tr from-emerald-500 to-green-400 shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20"
          }
        `}
      >
        {open ? (
          <i className="fa-solid fa-xmark text-sm" />
        ) : (
          <i className="fa-brands fa-whatsapp text-lg group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* VENTANA DE CHAT INTEGRADA (Glassmorphism + Desplazamiento lateral controlado) */}
      <div
        className={`
          absolute -right-10 lg:right-16 top-1/2 -translate-y-1/2 w-[80vw] lg:w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white
          transition-all duration-300 ease-out origin-right
          ${open ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-2 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-3.5 text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <img 
                src={data?.logos?.favicon || "/placeholder-logo.png"} 
                alt="Logo" 
                className="w-8 h-8 rounded-full bg-white object-cover border border-white/20" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs tracking-wide truncate">
                {data?.name || "Support"}
              </h3>
              <p className="text-[10px] text-emerald-100/90 mt-0.5">• Online</p>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark text-[10px]" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-3.5 bg-slate-50/60 min-h-[80px] relative before:absolute before:inset-0 before:bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] before:[background-size:12px_12px] before:opacity-60">
          <div className="relative bg-white border border-slate-100 rounded-xl rounded-tl-none p-3 shadow-sm max-w-[90%] text-slate-700 text-xs">
            <p className="font-semibold text-slate-800">Hi there! 👋</p>
            <p className="mt-1 text-slate-600 leading-relaxed">
              How can we help you with your project today?
            </p>
          </div>
        </div>

        {/* Input Footer */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
          <button
            onClick={sendWhatsapp}
            disabled={!message.trim()}
            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-paper-plane text-[10px]" />
          </button>
        </div>
      </div>

    </div>
  );
}