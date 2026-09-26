import type { RootObject } from "../../interfaces/dbData";
import Animated from "../animaciones/Animation";


interface Props {
    data: RootObject;
}

export default function ValuesAbout({ data }: Props) {
    return (
        <section
            className="relative w-full py-24 lg:py-32 overflow-hidden bg-white"
            style={{ contain: "layout style tree" }}
        >
            {/* Decorative background text - Light Mode */}
            <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center opacity-[0.05] pointer-events-none select-none overflow-hidden">
                <span className="text-[30vw] font-black text-slate-100 leading-none tracking-tighter uppercase transform rotate-90 translate-x-1/2">
                    Values
                </span>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
                    {/* Visual Side - Full Height Composition */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white group">
                            <img
                                src={data.valuesContent.additionalImages[0]}
                                alt="Our Values"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {/* Gradient overlay for text legibility inside image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                            {/* Floating Info inside image */}
                            <div className="absolute bottom-12 left-12 right-12">
                                <div className="p-8 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                                    <span className="block text-primary font-black text-xs uppercase tracking-widest mb-2">
                                        Our Foundation
                                    </span>
                                    <h3 className="text-white text-2xl font-black leading-tight">
                                       {data.slogan[9]}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <Animated variant="fade-up" duration="duration-1000">
                            <div className="inline-flex items-center gap-3 mb-8">
                                <span className="w-12 h-1 bg-primary rounded-full" />
                                <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                                    Why Choose Us
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8 capitalize">
                                {data.slogan[6]}
                            </h2>

                            <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-2xl border-l-4 border-primary/20 pl-8 italic">
                                {data.valuesContent.whychooseUs}
                            </p>
                        </Animated>

                        {/* Mission & Vision Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Animated
                                variant="fade-up"
                                duration="duration-1000"
                                delay="delay-300"
                            >
                                <div className="group relative p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden h-full">
                                    {/* Background decorative icon */}
                                    <i className="fa-solid fa-shield-halved absolute -right-4 -bottom-4 text-8xl text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                            <i className="fa-solid fa-shield-halved text-3xl" />
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-4">
                                            Our Mission
                                        </h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {data.valuesContent.mission}
                                        </p>
                                    </div>
                                </div>
                            </Animated>

                            <Animated
                                variant="fade-up"
                                duration="duration-1000"
                                delay="delay-500"
                            >
                                <div className="group relative p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden h-full">
                                    {/* Background decorative icon */}
                                    <i className="fa-solid fa-bullseye-arrow absolute -right-4 -bottom-4 text-8xl text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                                            <i className="fa-solid fa-bullseye-arrow text-3xl" />
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-4">
                                            Our Vision
                                        </h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {data.valuesContent.vision}
                                        </p>
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