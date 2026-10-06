import React from 'react';
import Animated from "../animaciones/Animation";
import type { RootObject, SectionsHomeAbout } from '../../interfaces/dbData';
import HighlightedText from '../global/TitleColor';
import ButtonContent from '../buttons/Buttons';


interface Props {
    data: RootObject;
    aboutSection: SectionsHomeAbout[]
}

const AboutSection: React.FC<Props> = ({ data, aboutSection }) => {
    return (
        <section className="relative w-full py-24 lg:py-40 overflow-hidden ">
            {/* Dynamic Background Text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <span className="text-[30vw] font-black text-primary leading-none tracking-tighter uppercase transform -rotate-12 translate-y-20">
                    Cleaning
                </span>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Visual Side - Offset Grid */}
                    <div className="lg:col-span-7 relative">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <Animated variant="fade-right" duration={"duration-1000"}>
                                <div className="relative pt-12">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <img
                                            src={aboutSection[0].additionalImages[0]}
                                            alt="Service view 1"
                                            className="w-full h-[300px] md:h-[500px] object-cover"
                                        />
                                    </div>
                                </div>
                            </Animated>

                            <Animated variant="fade-up" duration={"duration-1000"} delay={"delay-300"}>
                                <div className="relative pb-12">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <img
                                            src={aboutSection[0].additionalImages[1]}
                                            alt="Service view 2"
                                            className="w-full h-[300px] md:h-[500px] object-cover"
                                        />
                                    </div>
                                </div>
                            </Animated>
                        </div>

                        {/* Floating Stats / Info Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[140px] h-[140px] bg-primary rounded-full flex flex-col items-center justify-center shadow-2xl shadow-primary/40 border-8 border-slate-900">
                            <span className="text-4xl font-black text-white leading-none">100%</span>
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-2">Quality Work</span>
                        </div>
                    </div>

                    {/* Content Side - Overlapping Dark Panel */}
                    <div className="lg:col-span-5 lg:-ml-20 relative z-30">
                        <div className="bg-white/90 backdrop-blur-sm p-10 md:p-16 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
                            <Animated variant="fade-left" duration={"duration-1000"}>
                                <div className="inline-flex items-center gap-3 mb-8">
                                    <span className="w-12 h-1 bg-primary rounded-full" />
                                    <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">The Difference</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-8">
                                    <HighlightedText text={aboutSection[0].title} />
                                </h2>

                                <p className="text-slate-600 text-base mb-10 pl-6">
                                    {aboutSection[0].text}
                                </p>

                                <div className="space-y-6 mb-12 capitalize">
                                    <div className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <i className="fa-solid fa-burst text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 font-bold text-lg">Detail Oriented</h4>
                                            <p className="text-slate-500 text-sm">Thorough cleaning applied with passion.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                            <i className="fa-solid fa-shield-check text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 font-bold text-lg">Safety First</h4>
                                            <p className="text-slate-500 text-sm">Rigorous protocols & certified gear.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6">
                                    <ButtonContent />
                                    <div className="w-px h-10 bg-secondary hidden md:block" />
                                    <div className="flex flex-col">
                                        <span className="text-secondary font-black text-xl leading-none">Best Prices</span>
                                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Guaranteed</span>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutSection;


