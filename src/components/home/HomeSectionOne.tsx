import type { RootObject, SectionsHomeAbout } from "../../interfaces/dbData";
import Animated from "../animaciones/Animation";
import ButtonContent from "../buttons/Buttons";


interface HomeSectionOneProps {
  data: RootObject;
  homeSection: SectionsHomeAbout[];
}

const HomeSectionOne: React.FC<HomeSectionOneProps> = ({ data, homeSection }) => {
  return (
    <section className="relative w-full  overflow-hidden bg-white">
      <Animated variant="fade-up" duration={"duration-700"} delay={"delay-300"}>
        <div className="mt-20 p-1 bg-gradient-to-r from-primary to-secondary rounded-[3rem] w-[90vw] mx-auto">
          <div className="bg-slate-900 rounded-[2.9rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Need a custom Cleaning service plan?
              </h3>
              <p className="text-slate-400 font-medium">
                Contact us today for a free estimate and professional consultation on your next project.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-10 py-5 bg-primary text-white font-black rounded-full hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20"
              >
                Get Free Quote
              </a>
              <a
                href={`tel:+1${data?.dataGeneral.phones[0].number}`}
                className="px-10 py-5 bg-transparent text-white border-2 border-white/20 font-black rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Animated>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image Grid / Visual Side */}
          <div className="relative">
            <Animated variant="fade-right" duration="duration-1000">
              <div className="relative z-10">
                {/* Main Image with custom shape */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
                  <img
                    src={homeSection[0].additionalImages[0]}
                    alt="About our work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Overlapping secondary image */}
                <div className="absolute -bottom-10 -right-6 md:-right-12 w-1/2 aspect-square rounded-3xl overflow-hidden border-[10px] border-white shadow-2xl z-20 hidden md:block">
                  <img
                    src={homeSection[0].additionalImages[1]}
                    alt="Work detail"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Experience Badge */}
                <div className="absolute -top-6 -left-6 bg-primary p-8 rounded-3xl shadow-xl z-30 animate-floating">
                  <div className="text-center">
                    <span className="block text-4xl md:text-5xl font-black text-white leading-none">
                      {data.yearsExperience}+
                    </span>
                    <span className="block text-white/90 text-sm font-bold uppercase tracking-widest mt-1">
                      Years
                    </span>
                    <span className="block text-white/70 text-[10px] uppercase tracking-tighter">
                      Experience
                    </span>
                  </div>
                </div>
              </div>
            </Animated>

            {/* Background shape decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-slate-100 rounded-[3rem] -rotate-6 pointer-events-none" />
          </div>

          {/* Content Side */}
          <div className="flex flex-col">
            <Animated variant="fade-up" duration={"duration-700"}>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-secondary font-bold text-xs uppercase tracking-widest">About Our Company</span>
              </div>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-200"}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dela leading-tight mb-8">
                {homeSection[0].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? "text-primary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-400"}>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                {homeSection[0].text}
              </p>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-500"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: "fa-shield-check", title: "Professionalism", desc: "Expert certified arborists" },
                  { icon: "fa-handshake", title: "Commitment", desc: "Dedicated to your satisfaction" },
                  { icon: "fa-bolt", title: "Diligence", desc: "Fast & efficient execution" },
                  { icon: "fa-check", title: "Commitment", desc: "Welds built to last a lifetime" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      <i className={`fa-solid ${item.icon} text-xl`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Animated>

            <Animated variant="fade-up" duration={"duration-700"} delay={"delay-700"}>
              <div className="flex flex-wrap items-center gap-8">
                {data.widgets.onePages ? (
                  <ButtonContent titleBtn="Contact Us" linkBtn={`tel:+1${data.dataGeneral.phones[0].number}`} />
                ) : (
                  <ButtonContent />
                )}

                <div className="flex items-center gap-6 pl-8 border-l border-slate-200">
                  {/* <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-primary">
                      <i className="fa-solid fa-clock-rotate-left text-lg" />
                      <span className="font-black text-xl leading-none">24/7</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Emergency Support</span>
                  </div> */}

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-secondary">
                      <i className="fa-solid fa-medal text-lg" />
                      <span className="font-black text-xl leading-none">100%</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </Animated>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeSectionOne;
