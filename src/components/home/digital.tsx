import React, { useState } from 'react';
import type { RootObject } from '../../interfaces/dbData';

interface DigitalProps {
    data: RootObject;
}

const Digital: React.FC<DigitalProps> = ({ data }) => {
    const [isFlipped, setIsFrolled] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [sendInput, setSendInput] = useState("");
    const [active, setActive] = useState(false);

    const handleFlip = () => setIsFrolled(!isFlipped);
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    const handleOpenQR = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowQR(true);
    };

    const sendWhatsapp = () => {
        const relmsg = sendInput.replace(/ /g, "%20");
        const phone = data.dataGeneral.phones[0].number
            .replace("-", "")
            .replace("-", "");
        window.open(`https://wa.me/1${phone}?text=${relmsg}`, "_blank");
        setSendInput("");
        setActive(false);
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-[#111] overflow-hidden p-4 font-sans">

            {showQR && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6" onClick={() => setShowQR(false)}>
                    <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-6 max-w-sm w-full animate-in zoom-in duration-300" onClick={stopPropagation}>
                        <h3 className="text-navy font-black uppercase text-xl">Scan to Save</h3>
                        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-[#00AEEF]">
                            <img className="w-48 h-48 object-contain" src="/assets/img/QR.png" alt="QR Code" />
                        </div>
                        <button onClick={() => setShowQR(false)} className="w-full bg-[#0A0A2E] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Close</button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-[420px] sm:max-w-[750px] h-[240px] sm:h-[420px] cursor-pointer [perspective:2000px]"             >
                <div className={`relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Diseño de la parte frontal */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="relative w-full h-[45%] flex">
                            <div className="w-full h-full bg-primary"></div>
                            <div className="absolute top-0 right-0 w-[45%] h-full bg-secondary"></div>

                            <div className="absolute inset-0 bg-white rounded-t-[100%] translate-y-12 sm:translate-y-24 scale-x-125 border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex-1 flex flex-col items-center justify-center z-10 -mt-8 sm:-mt-24">
                            <div className="w-28 h-28 sm:w-52 sm:h-52 bg-white rounded-full flex items-center justify-center shadow-xl p-3 mb-2 border border-gray-100">
                                <img className="w-full object-contain" src={data.logos?.primary} alt="Logo" />
                            </div>
                            <h2 className="text-lg sm:text-4xl font-black text-primary uppercase tracking-tighter leading-none">{data.name}</h2>
                            <p className="text-[8px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mt-2 italic">{data.slogan[0]}</p>
                        </div>
                        <div className="w-full h-16 sm:h-28 bg-primary border-t-2 border-secondary flex items-center justify-center mt-2 lg:mt-4">
                            <div className="flex flex-row gap-3 items-center">

                                
                                {/* {data. !== false && (
                                    <div
                                        onClick={handleOpenQR}
                                        className="w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform"
                                    >
                                        <i className="fas fa-qrcode text-[#0A0A2E] text-xl sm:text-3xl"></i>
                                    </div>
                                )} */}

                               
                                <button onClick={() => sendWhatsapp()}>
                                    <span className="w-8 h-8 sm:w-16 sm:h-16 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                        <i className="fa-brands fa-whatsapp text-xl sm:text-3xl"></i>
                                    </span>
                                </button>

                          
                                {data.gmb && data.gmb !== "" && (
                                    <a
                                        href={data.gmb}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={stopPropagation}
                                        className="w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
                                    >
                                        <i className="fa-brands fa-google text-black text-xl sm:text-3xl"></i>
                                    </a>
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Diseño de la parte trasera */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-xl shadow-2xl overflow-hidden flex">

                        <div className="w-[65%] p-4  flex flex-col justify-center items-center gap-2">

                            <div className='flex flex-col font-sans mb-2 lg:mb-4 lg:mt-1 mt-6'>
                                <h2 className='text-primary font-bold text-2xl lg:text-4xl '>
                                    Owner:
                                </h2>
                                <p className='lg:text-3xl text-base font-sans font-semibold text-slate-800'>
                                    {data.nameCustomers}
                                </p>
                            </div>

                            <div className="space-y-2 sm:space-y-4 mb-4">
                                {[
                                    { icon: 'fa-phone-volume', text: data.dataGeneral?.phones[0]?.number, link:`tel:+1${data.dataGeneral?.phones[0]?.number}`},
                                    { icon: 'fa-globe', text: data.domain, link: `/` },
                                    { icon: 'fa-location-dot', text: data.businessAddress },
                                    { icon: 'fa-envelope', text: data.dataGeneral?.emails[0]?.email, link:`mailto:${data.dataGeneral?.emails[0]?.email}`}
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-start gap-3">
                                        <a href={item.link} target="_blank" >
                                            <span className="text-[10px] sm:text-[14px] font-bold text-zinc-600  max-w-[150px] sm:max-w-none">{item.text}</span>
                                        </a>
                                        <div className="w-5 h-5 sm:w-10 sm:h-10 border-2 border-[#0A0A2E] rounded-md flex items-center justify-center text-[#0A0A2E] shrink-0">
                                            <i className={`fas ${item.icon} text-[9px] sm:text-sm`}></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="w-[35%] relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-secondary -left-12 sm:-left-20 rounded-l-[100%] opacity-30 translate-x-4 translate-y-4"></div>
                            <div className="absolute inset-0 bg-primary -left-8 sm:-left-14 rounded-l-[100%] shadow-[-15px_0_30px_rgba(0,0,0,0.7)]"></div>
                            <div className='z-10 justify-center items-center flex flex-col h-full px-2 sm:px-8'>
                                <p className="text-black text-[10px] sm:text-[17px] font-black uppercase tracking-widest mb-2">Our Best Services</p>
                                <div className="grid grid-cols-1 gap-x-2 gap-y-1">
                                    {data.services?.map((s, i) => (
                                        <div key={i} className="flex items-center justify-start gap-1">
                                            <div className="w-1 h-1 bg-secondary rounded-full"></div>
                                            <span className="text-[7.5px] sm:text-[13px] font-bold text-zinc-400 uppercase leading-tight">{s.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleFlip}
                className="mt-8 bg-[#f5fcff] text-black px-12 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#00AEEF]/30 hover:bg-white hover:text-[#0A0A2E] transition-all active:scale-95"
            >
                {isFlipped ? 'Back to Front' : 'View Contact & Services'}
            </button>
        </section>
    );
};

export default Digital;

