import React from 'react';
import Animated from "../animaciones/Animation";
import type { RootObject, SectionsHomeAbout } from '../../interfaces/dbData';
import HighlightedText from '../global/TitleColor';


interface Props {
  data: RootObject;
  homeSection: SectionsHomeAbout[]
}

const HomeSectionTwo: React.FC<Props> = ({ data, homeSection }) => {
  return (
    <section className="relative w-full py-24 lg:py-20 overflow-hidden bg-slate-50">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Content Side */}
          <div className="flex flex-col order-2 lg:order-1">
            <Animated variant="fade-up" duration={"duration-700"}>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-primary font-black text-xs uppercase tracking-widest">{data.businessLicense}</span>
                <div className="h-px w-12 bg-primary/30" />
              </div>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-200"}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                <HighlightedText text={homeSection[0].title} defaultColor="black" />
              </h2>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-300"}>
              <p className="text-slate-600 text-lg leading-relaxed mb-12 border-l-4 border-secondary/30 pl-8">
                {homeSection[1].text}
              </p>
            </Animated>

            {/* Experience Card */}
            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-500"}>
              <div className="bg-white p-4 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
                <div
                  className="flex flex-col md:flex-row justify-center items-start md:items-center md:gap-2"
                >
                  <div
                    className="rounded-2xl w-full md:w-[100%]"
                  >
                    
                    <h3
                      className="text-lg font-extrabold text-secondary tracking-wide mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4"
                    >
                      WHY CHOOSE US
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <li
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm font-semibold text-gray-700"
                      >
                        Licensed &amp; Insured
                      </li>
                      <li
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm font-semibold text-gray-700"
                      >
                        Fast &amp; Free Estimates
                      </li>
                      <li
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm font-semibold text-gray-700"
                      >
                        Clean, Safe &amp; Reliable
                      </li>
                      <li
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm font-semibold text-gray-700"
                      >
                        We handle everything from start to finish
                      </li>
                    </ul>
                  </div>

                  
                </div>
              </div>
            </Animated>

          </div>

          {/* Visual Side - Geometric Gallery Layout */}
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-12 gap-4">

              {/* Main Vertical Image */}
              <div className="col-span-8">
                <Animated variant="fade-left" duration={"duration-1000"}>
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                    <img
                      src={homeSection[1].additionalImages[0]}
                      alt="Primary showcase"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                </Animated>
              </div>

              {/* Stacked Side Images */}
              <div className="col-span-4 flex flex-col gap-4">
                <Animated variant="fade-up" duration={"duration-700"} delay={"delay-500"}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white aspect-square">
                    <img
                      src={homeSection[1].additionalImages[1]}
                      alt="Detail 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10" />
                  </div>
                </Animated>
                <Animated variant="fade-up" duration={"duration-700"} delay={"delay-500"}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white aspect-square">
                    <img
                      src={homeSection[1].additionalImages[2]}
                      alt="Detail 1"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10" />
                  </div>
                </Animated>

                <Animated variant="fade-up" duration={"duration-700"} delay={"delay-500"}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white flex-1 bg-secondary/10 flex items-center justify-center p-6 group">
                    <div className="text-center">
                      <i className="fa-solid fa-medal text-3xl text-secondary mb-3 transform group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight">Certified Quality</p>
                    </div>

                  </div>
                </Animated>
              </div>

              {/* Decorative Geometric Accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
            </div>

            {/* Floating Brand Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 lg:px-8 py-4 rounded-2xl shadow-2xl border border-slate-100 z-30 flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest lg:tracking-[0.2em] text-slate-900">Lincensed, Bonded & Insured</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomeSectionTwo;

