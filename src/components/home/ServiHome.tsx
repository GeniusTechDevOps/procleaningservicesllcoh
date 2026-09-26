
import FormatText from "../../hooks/FormatText";
import type { DataGeneral, RootObject, Service } from "../../interfaces/dbData";
import Animated from "../animaciones/Animation";

interface SliderServicesProps {
    dbServices: Service[];
    landingServices: boolean;
    slidesPerView?: number;
    onePage?: boolean;
    dataGeneral?: DataGeneral;
    dataglobal: RootObject;
}

const ServicesHome2: React.FC<SliderServicesProps> = ({
    dbServices,
    landingServices,
    onePage,
    dataGeneral,
    dataglobal,
}) => {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-slate-50">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <Animated variant="fade-right" duration={"duration-700"}>
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-primary font-bold text-xs uppercase tracking-widest">Our Expertise</span>
                            </div>
                        </Animated>

                        <Animated variant="fade-up" duration={"duration-700"} delay={"delay-200"}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                                Professional <span className="text-primary">Cleaning</span> Services
                            </h2>
                        </Animated>
                    </div>

                    <Animated variant="fade-left" duration={"duration-700"} delay={"delay-300"}>
                        <div className="flex flex-col items-start md:items-end">
                            <p className="text-slate-500 font-medium mb-4 text-left md:text-right max-w-xs">
                                Quality Cleaning services provided by certified professionals for over {dataglobal.yearsExperience} years.
                            </p>
                            <a
                                href={`tel:+1${dataGeneral?.phones[0].number}`}
                                className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-primary transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <i className="fa-solid fa-phone" />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Emergency Call</span>
                                    <span className="block font-black text-slate-900">{dataGeneral?.phones[0].number}</span>
                                </div>
                            </a>
                        </div>
                    </Animated>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dbServices.slice(0, 6).map((service, index) => (
                        <Animated key={index} variant="fade-up" duration={"duration-700"} delay={"delay-" + (200 * index)}>
                            <a
                                href={onePage ? "#contact" : (landingServices ? `/services/${FormatText(service.title)}` : "/services")}
                                className="group relative block h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50"
                            >
                                {/* Service Image */}
                                <img
                                    src={service.description[0].image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block px-3 py-1 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                                            Service 0{index + 1}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                                            {service.title}
                                        </h3>

                                        <div className="h-0 overflow-hidden group-hover:h-20 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                            <p className="text-slate-300 text-sm line-clamp-3 mb-4">
                                                Expert {service.title.toLowerCase()} provided with precision and professional care for your projects.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                                            <span className="group-hover:text-primary transition-colors">View Details</span>
                                            <i className="fa-solid fa-arrow-right-long transform group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                {/* Glassmorphism Icon Box */}
                                <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all">
                                    <i className="fa-light fa-burst text-2xl" />
                                </div>
                            </a>
                        </Animated>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                
            </div>
        </section>
    );
};

export default ServicesHome2;

