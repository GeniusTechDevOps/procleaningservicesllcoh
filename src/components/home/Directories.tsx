import React from 'react';
import Animated from "../animaciones/Animation";
import type { RootObject } from "../../interfaces/dbData";

interface DirectoriesProps {
    data: RootObject;
}

const Directories: React.FC<DirectoriesProps> = ({ data }: DirectoriesProps) => {
    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Decorative Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* Google Review Section - High Impact */}
                {data.gmb && (
                    <div className="mb-24">
                        <Animated variant="fade-up" duration={"duration-700"}>
                            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200 flex flex-col lg:flex-row items-center justify-between gap-12 group hover:bg-white transition-all duration-500">
                                <div className="flex flex-col text-center lg:text-left">
                                    <div className="inline-flex items-center gap-3 mb-6 justify-center lg:justify-start">
                                        <span className="w-8 h-[2px] bg-primary"></span>
                                        <span className="text-primary font-black text-xs uppercase tracking-widest">Customer Trust</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                                        Your Satisfaction Is <br />
                                        <span className="text-secondary italic uppercase">Our Priority</span>
                                    </h2>
                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i key={star} className="fas fa-star text-2xl text-amber-400 drop-shadow-sm"></i>
                                        ))}
                                        <span className="ml-4 text-slate-400 font-bold text-sm uppercase tracking-widest">5.0 Rating</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 md:gap-12 flex-col md:flex-row">
                                    <div className="hidden md:block w-px h-24 bg-slate-200"></div>
                                    <a
                                        href={data.gmb}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative group/btn"
                                    >
                                        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl group-hover/btn:bg-primary/20 transition-all"></div>
                                        <img
                                            src="/assets/img/GMB.webp"
                                            alt="Google Review"
                                            className="relative w-48 h-48 md:w-56 md:h-56 object-contain transition-transform duration-700 group-hover/btn:scale-110"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border border-slate-100 scale-0 group-hover/btn:scale-100 transition-all duration-500 whitespace-nowrap">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Write a Review</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Animated>
                    </div>
                )}

                {/* Directory Logos Grid */}
                <div className="text-center ">
                    {[...data.redesSociales, ...data.directorios].length > 0 && (
                        <Animated variant="fade-up" duration={"duration-700"} delay={"delay-300"}>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Find Us On</h3>
                        </Animated>
                    )}

                    <div className="flex flex-wrap gap-6 justify-center">
                        {[...data.redesSociales, ...data.directorios].map((item, index) => (
                            <Animated key={index} variant="fade-up" duration={"duration-700"} delay={"delay-300" + (400 * index)} styles='w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-24px)] xl:w-[calc(20%-26px)]'>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex justify-center items-center h-32 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 hover:border-primary/20 transition-all duration-500 overflow-hidden"
                                    aria-label={item.name}
                                >
                                    {/* Decorative corner accent */}
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-slate-50 rounded-bl-3xl group-hover:bg-primary/10 transition-colors"></div>

                                    <img
                                        src={item.logo}
                                        alt={item.name}
                                        className="relative z-10 max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </a>
                            </Animated>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Directories;

