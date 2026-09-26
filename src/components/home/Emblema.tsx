import type { SectionsHomeAbout } from "../../interfaces/dbData";
import Animated from "../animaciones/Animation";


export interface EmblemaProps {
    dataBlocks: SectionsHomeAbout[];
    widgetActive?: boolean;
    data: any;
}

const Emblema: React.FC<EmblemaProps> = ({ dataBlocks, widgetActive = true, data }) => {

    const images =
        dataBlocks
            .filter(block => {
                const hayPost = [block.title, block.section, block.tipos, block.text]
                    .some(v => typeof v === 'string' && v.toLowerCase().includes('emblema'));
                return hayPost;
            })
            .flatMap(block => block.additionalImages || []) || [];

    if (!images.length || !widgetActive) return null;

    // Duplicate images for the infinite scroll effect
    const scrollImages = [...images, ...images, ...images];

    return (
        <section className="w-full pt-32 pb-12 overflow-hidden font-poppins relative">
            {/* Minimalist background: light gray subtle pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-[94%] mx-auto relative z-10">
                <Animated variant="fade-up" duration="duration-1000" delay="delay-100">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="text-left">
                            <span className="text-primary font-black tracking-[0.4em] text-xs uppercase mb-6 block">Quality Assurance</span>
                            <h2 className="text-6xl lg:text-8xl font-black text-secondary tracking-tighter leading-[0.85]">
                                Certified <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-400">Excellence.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-xl max-w-sm leading-relaxed font-medium md:text-right">
                            We don't just promise quality, we have it verified by the world's leading organizations.
                        </p>
                    </div>
                </Animated>

                {/* Infinite Marquee Section */}
                <div className="relative w-full mt-10">
                    {/* Visual Fades */}
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0B1427] to-transparent z-20"></div>
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0B1427] to-transparent z-20"></div>

                    <div className="flex overflow-hidden group py-10">
                        <div className="flex animate-marquee-fast whitespace-nowrap gap-16 items-center">
                            {scrollImages.map((img, index) => (
                                <div key={index} className="flex-none group/card">
                                    <div className="w-56 h-56 lg:w-72 lg:h-72 bg-white border border-slate-100 rounded-[3rem] p-10 flex items-center justify-center transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-4 group-hover:[animation-play-state:paused]">
                                        <img
                                            src={img}
                                            alt={`Certification ${index}`}
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-700 opacity-40 hover:opacity-100 scale-90 group-hover/card:scale-110"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Animated variant="zoom-in" duration="duration-700">
                    <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-12 text-slate-300">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-slate-100">01.</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Verified Standards</span>
                        </div>
                        <div className="w-12 h-[1px] bg-slate-100 hidden md:block"></div>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-slate-100">02.</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Industry Leaders</span>
                        </div>
                        <div className="w-12 h-[1px] bg-slate-100 hidden md:block"></div>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-slate-100">03.</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Global Trust</span>
                        </div>
                    </div>
                </Animated>
            </div>

            <style>{`
                @keyframes marquee-fast {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee-fast {
                    animation: marquee-fast 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Emblema;