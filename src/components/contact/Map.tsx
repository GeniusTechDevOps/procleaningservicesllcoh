import { useState } from "react";
import Animated from "../animaciones/Animation";
import type { RootObject } from "../../interfaces/dbData";


interface Props {
  data: RootObject;
}

const MapHome = ({ data }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(
    data.dataGeneral.location[0].urlCity
  );
  const [selectedNameCity, setSelectedNameCity] = useState<string | null>(
    data.dataGeneral.location[0].city
  );

  const handleCityClick = (urlCity: string, cityName: string) => {
    setSelectedCity(urlCity);
    setSelectedNameCity(cityName);
  };

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[600px]">

          {/* Info & Locations Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <Animated variant="fade-right" duration={"duration-700"}>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-primary"></span>
                <span className="text-primary font-black text-xs uppercase tracking-widest">Service Area</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 capitalize">
                Where Nature Meets <span className="text-secondary">Our Care.</span>
              </h2>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 mb-4">
                <p className="text-slate-600 text-sm">
                  We provide services in the areas surrounding our headquarters, ensuring fast and <span className="font-bold text-primary">professional Cleaning services</span> for our entire community.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {data.dataGeneral.location.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleCityClick(item.urlCity, item.city)}
                    className={`group flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-300 text-left ${selectedCity === item.urlCity
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200"
                      : "bg-white border-slate-100 text-slate-600 hover:border-primary/30 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <i className={`fas fa-map-marker-alt transition-colors ${selectedCity === item.urlCity ? "text-primary" : "text-slate-300 group-hover:text-primary"
                        }`}></i>
                      <span className="font-bold text-sm tracking-tight">{item.city}</span>
                    </div>
                    {selectedCity === item.urlCity && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </Animated>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-8 relative">
            <Animated variant="fade-left" duration={"duration-700"}>
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white group">
                {selectedCity && (
                  <iframe
                    src={selectedCity}
                    title="Service Area Map"
                    className="w-full h-full min-h-[700px] grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  ></iframe>
                )}

                {/* Floating Info Overlay */}
                <div className="absolute top-8 left-8 right-8 pointer-events-none">
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-md border border-white rounded-2xl shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Viewing Area</p>
                      <p className="text-sm font-black text-slate-900 mt-1">{selectedNameCity}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Corner Accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-tl-[4rem] -z-10"></div>
              </div>
            </Animated>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MapHome;

