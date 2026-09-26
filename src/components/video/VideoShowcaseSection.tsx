import React from "react";
import Animated from "../animaciones/Animation";
import VideosPlayContent from "./VideosPlayContent";
import ButtonContent from "../buttons/Buttons";
import type { RootObject } from "../../interfaces/dbData";


interface VideoShowcaseSectionProps {
  data: RootObject;
}

const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({ data }: VideoShowcaseSectionProps) => {
  if (!data.videoAnimado || data.videoAnimado.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden min-h-[80vh] flex items-center justify-center py-24 lg:py-32 mt-10">
      {/* Cinematic Background with Parallax-like Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.gallery[2] || data.gallery[0]}
          alt="Cinematic background"
          className="w-full h-full object-cover scale-110"
        />
        {/* Sophisticated Layered Overlays */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Section Header */}
          <Animated variant="fade-up" duration={"duration-700"}>
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-primary"></span>
              <span className="text-primary font-black text-xs uppercase tracking-widest">Premium Showcase</span>
              <span className="w-12 h-[2px] bg-primary"></span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-12 italic uppercase tracking-tighter">
              {data.slogan[0]}
            </h2>
          </Animated>

          {/* Videos Grid - Premium Aesthetic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
            {data.videoAnimado.map((item: any, index: any) => (
              <Animated key={index} variant="zoom-in" duration={"duration-1000"} delay={"delay-400" + (index * 200)}>|
                <div className="relative group w-full">
                  {/* Decorative glowing frame */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border-8 border-white/5 backdrop-blur-md aspect-video">
                    <VideosPlayContent videoUrl={item.urlVideo} />
                  </div>

                  {/* Floating Detail - Adjusted for grid */}
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 z-20">
                    <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <i className="fa-solid fa-play text-xs"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Expertise</p>
                      <p className="text-xs font-black text-slate-900 leading-tight">Project Demo</p>
                    </div>
                  </div>
                </div>
              </Animated>
            ))}
          </div>

          {/* CTA Section */}
          <Animated variant="fade-up" duration={"duration-700"} delay={"delay-700"}>
            <div className="mt-20 flex flex-col items-center gap-6">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.3em]">Ready to see the results?</p>
              <div className="flex flex-wrap justify-center gap-6">
                <ButtonContent linkBtn={`tel:+1${data.dataGeneral.phones[0].number}`} />
                <a
                  href="/portfolio"
                  className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-300"
                >
                  View Full Gallery
                </a>
              </div>
            </div>
          </Animated>

        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;

