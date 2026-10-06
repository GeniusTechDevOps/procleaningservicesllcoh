import { useEffect, useState } from "react";

import Animated from "../animaciones/Animation";
import type { RootObject, SectionsHomeAbout } from "../../interfaces/dbData";
import ButtonContent from "../buttons/Buttons";

interface HeroSection2Props {
  data: RootObject;
}

const HeroSection2: React.FC<HeroSection2Props> = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dataBlocks = data?.sectionsHomeAbout.filter(
    (section: SectionsHomeAbout) => section.section === "blocks",
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Background Video/Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${isLoaded ? 'scale-110' : 'scale-100'}`}
        >
          <source src="/assets/img/video.mp4" type="video/mp4" />
        </video>
      </div>



      

      {/* Main Content Container */}
      <div className="relative z-20 h-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start px-6 md:px-12 lg:px-24 border">
        <div className="max-w-4xl">
          {/* <Animated variant="fade-right" duration="duration-700" delay="delay-200">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-white font-bold tracking-wider text-sm uppercase">
                Welcome To {data.name}
              </p>
            </div>
          </Animated> */}

          <Animated variant="fade-up" duration="duration-1000" delay="delay-300">
            <h1 className="text-3xl md:text-6xl lg:text-6xl font-black text-white leading-[1.1] mb-2 capitalize">
              {dataBlocks[0].title.split(' ').map((word, i, arr) => (
                <span key={i} className={i >= Math.floor(arr.length / 2) ? "text-primary" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </Animated>

          <Animated variant="fade-up" duration="duration-1000" delay="delay-500">
            <p className="text-base text-slate-300 max-w-2xl mb-4 lg:leading-relaxed font-normal lg:font-medium block">
              {dataBlocks[0].text}
            </p>
          </Animated>

          <Animated variant="fade-up" duration="duration-1000" delay="delay-500">
            <div className="flex flex-wrap gap-5">
              <ButtonContent />
              <a
                href="services"
                className="hidden lg:inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 bg-white/10 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Our Services
                <i className="fa-solid fa-arrow-down text-sm" />
              </a>
            </div>
          </Animated>
        </div>
        <div className="block w-full lg:w-1/2 p-6">
          <img
            src={data.logos.primary}
            alt="Logo"
            className="h-44 md:h-80 w-auto object-contain transition-all duration-300 group-hover:scale-105 mx-auto"
          />
        </div>
      </div>

      {/* Bottom Features Bar - Glassmorphism */}
      <div className="absolute -bottom-5 left-0 w-full z-30 p-6 md:p-10 lg:px-24 hidden md:block">
        <Animated variant="fade-up" duration="duration-1000" delay="delay-700">
          <div className="grid grid-cols-2 gap-8 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-2xl">
            <div className="flex items-center gap-5 border-r border-white/10 pr-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <i className="fa-solid fa-shield-check text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold">Fully Licensed</h3>
                <p className="text-slate-400 text-sm">Bonded & Insured</p>
              </div>
            </div>
            <div className="flex items-center gap-5 pr-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <i className="fa-solid fa-clock text-secondary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold">Best Services</h3>
                <p className="text-slate-400 text-sm">Quality & Reliability</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <i className="fa-solid fa-star text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold">Expert Care</h3>
                <p className="text-slate-400 text-sm">Certified Cleaning Pros</p>
              </div>
            </div> */}
          </div>
        </Animated>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-10 z-30 animate-bounce text-white/50 lg:hidden">
        <i className="fa-solid fa-circle-chevron-down text-3xl" />
      </div>
    </section>
  );
};

export default HeroSection2;

