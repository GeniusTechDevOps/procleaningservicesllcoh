import { useState } from "react";
import Widget from "./Visor";
import ColorPaletteModal from "./ColorPaletteModal";
import BotonWhatsappNew from "./botonWhatsapp/BotonWhatsappNew";

interface WidgetButtonProps {
  data: any;
}

function WidgetButton({ data }: WidgetButtonProps) {
  const [visor, setVisor] = useState(false);
  const [palletColor, setPalletColor] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleVisor = () => {
    setVisor((prev) => !prev);
  };

  const handlePalletColor = () => {
    setPalletColor((prev) => !prev);
  };

  const handleToggleAll = () => {
    setShowButtons((prev) => !prev);
  };

  return (
    <div className="container-floating-widget">
      <div className="fixed -right-1 top-1/3 lg:top-1/3 z-40 flex items-end gap-3">
        <div
          className={`transition-all duration-300 ${showButtons
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 pointer-events-none"
            }`}
        >
          <div className="relative rounded-3xl border border-white/30 bg-gradient-to-b from-white/35 to-white/10 backdrop-blur-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            <div className="flex flex-col gap-2.5">
              <div className="relative">
                <button
                  type="button"
                  onClick={handleVisor}
                  aria-label={visor ? "Cerrar visor" : "Abrir visor"}
                  className={`group relative w-11 h-11 rounded-2xl border transition-all duration-300 flex items-center justify-center ${visor
                      ? "bg-primary border-primary text-white"
                      : "bg-white/90 border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                  <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Visor
                  </span>
                </button>
                {visor ? <Widget /> : null}
              </div>

              {data.widgets.formReviews ? (
                <button
                  type="button"
                  onClick={handlePalletColor}
                  aria-label={palletColor ? "Cerrar paleta" : "Abrir paleta"}
                  className={`group relative w-11 h-11 rounded-2xl border transition-all duration-300 flex items-center justify-center ${palletColor
                      ? "bg-primary border-primary text-white"
                      : "bg-white/90 border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary"
                    }`}
                >
                  <i className="fa-regular fa-swatchbook text-base" />
                  <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Colores
                  </span>
                </button>
              ) : null}

              {data.widgets.btnCallUs ? (
                <a
                  href={`tel:+1${data.dataGeneral.phones?.[0]?.number || ""}`}
                  aria-label="Llamar ahora"
                  className="group relative w-11 h-11 rounded-2xl border bg-white/90 border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fa-regular fa-phone text-base" />
                  <span className="absolute right-full mr-2 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Llamar
                  </span>
                </a>
              ) : null}

              <div className="relative flex items-center justify-center">
                <BotonWhatsappNew data={data} />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="relative w-14 h-14 rounded-l-2xl text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] ring-2 ring-white/60 bg-gradient-to-br from-primary via-tertiary to-secondary hover:scale-110 hover:rotate-3 active:scale-95 transition-all duration-300 overflow-hidden"
          onClick={handleToggleAll}
          aria-expanded={showButtons}
          aria-label={showButtons ? "Ocultar widgets" : "Mostrar widgets"}
        >
          <span className="absolute inset-0 rounded-l-2xl bg-white/15 pointer-events-none" />
          <span className="absolute -inset-1 rounded-l-3xl border border-white/70 animate-ping pointer-events-none" />
          <span className="absolute inset-1 rounded-l-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          <i
            className={`fa-solid ${showButtons ? "fa-chevron-right" : "fa-chevron-left"} relative z-10 text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-transform duration-300 ${showButtons ? "translate-x-0" : "-translate-x-0.5"}`}
          />
        </button>
      </div>

      {palletColor ? <ColorPaletteModal show={palletColor} onClose={() => setPalletColor(false)} /> : null}
    </div>
  );
}

export default WidgetButton;