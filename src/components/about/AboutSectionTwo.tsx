import React from 'react';
import Animated from "../animaciones/Animation";
import type { RootObject, SectionsHomeAbout } from '../../interfaces/dbData';


interface Props {
    data: RootObject;
    aboutSection: SectionsHomeAbout[]
}

const AboutSectionTwo: React.FC<Props> = ({ data, aboutSection }) => {
    const expertisePoints = [
        { title: "Quality & Durability", icon: "fa-star", delay: 100 },
        { title: "Expert Solutions", icon: "fa-headset", delay: 200 },
        { title: "Innovation", icon: "fa-lightbulb", delay: 300 },
        { title: "Sustainability & Environment", icon: "fa-burst", delay: 400 },
    ];

    return (
        <section className="relative w-full py-24 lg:py-40 overflow-hidden bg-slate-50">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.03] -skew-x-12 transform translate-x-1/2"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/[0.05] rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* Text Side */}
                    <div className="lg:col-span-5 flex flex-col">
                        <Animated variant="fade-right" duration={"duration-1000"}>
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="w-12 h-[2px] bg-primary"></span>
                                <span className="text-primary font-black text-xs uppercase tracking-widest">Our Philosophy</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 italic uppercase tracking-tighter">
                                {aboutSection[1].title}
                            </h2>

                            <p className="text-slate-600 text-base leading-relaxed mb-10 pl-8">
                                {aboutSection[1].text}
                            </p>


                        </Animated>
                    </div>

                    {/* Grid Side */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {expertisePoints.map((point, index) => (
                                <Animated key={index} variant="fade-up" duration={"duration-800"} delay={`delay-${point.delay}`}>
                                    <div className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden h-full">
                                        {/* Background Decorative Icon */}
                                        <i className={`fa-solid ${point.icon} absolute -right-4 -bottom-4 text-9xl text-slate-900 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-500`}></i>

                                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                                <i className={`fa-solid ${point.icon} text-2xl`}></i>
                                            </div>

                                            <h3 className="text-xl font-black text-slate-900 transition-colors duration-500 leading-tight">
                                                {point.title}
                                            </h3>

                                            <div className="w-8 h-1 bg-secondary mt-4 group-hover:w-16 transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </Animated>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSectionTwo;

