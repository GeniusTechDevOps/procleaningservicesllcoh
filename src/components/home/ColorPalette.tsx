
const palettes = [
    {
        image:
            "https://firebasestorage.googleapis.com/v0/b/clientesimages.appspot.com/o/BrandingExtra%2F6Iag7JuSIr0ciEGV481e%2Fbehr-1.png?alt=media&token=c6e45a5f-6026-41a5-982c-414dfddd7396",
        link: "https://www.behr.com/consumer/colors/paint/explore",
        name: "Behr",
        color: "#E22139"
    },
    {
        image:
            "https://firebasestorage.googleapis.com/v0/b/clientesimages.appspot.com/o/BrandingExtra%2F95KfSZCCsZSwGtDMZ1Fm%2FSW-1.png?alt=media&token=92f8b714-e31a-460b-960e-83209a32fb71",
        link: "https://images.sherwin-williams.com/content_images/sw-pdf-sherwin-williams-colorc.pdf",
        name: "Sherwin-Williams",
        color: "#E22139"
    },
    {
        image:
            "https://firebasestorage.googleapis.com/v0/b/clientesimages.appspot.com/o/BrandingExtra%2FAEyLh5TEuJ08pCWHTmqy%2Fbjm.png?alt=media&token=8017f9b1-f360-4a54-aa87-2491e10306b8",
        link: "https://www.benjaminmoore.com/en-us/color-overview/color-palettes",
        name: "Benjamin Moore",
        color: "#E22139"
    },
];


import React, { useRef, useEffect } from "react";

const PaletaColor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax floating effect for cards
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMove = (e: MouseEvent) => {
            const cards = container.querySelectorAll('.palette-card');
            cards.forEach((card: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `rotateY(${x / 30}deg) rotateX(${-y / 30}deg)`;
            });
        };
        const handleLeave = () => {
            const cards = container.querySelectorAll('.palette-card');
            cards.forEach((card: any) => {
                card.style.transform = '';
            });
        };
        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseleave', handleLeave);
        return () => {
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <div
        className="w-4/5 rounded-2xl mx-auto"
            ref={containerRef}
            style={{
                padding: "3rem 0 2rem 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <h2
                style={{
                    fontWeight: 800,
                    marginBottom: "2.5rem",
                    color: "#fff",
                    letterSpacing: "0.03em",
                    textShadow: "0 2px 24px #000, 0 0px 2px #fff2",
                    textAlign: "center",
                    lineHeight: 1.2,
                }}
                className="text-3xl capitalize md:text-5xl"
            >
                Get inspired by these color palettes
            </h2>
            <div
                style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: 1100,
                    
                }}
            >
                {palettes.map((palette, idx) => (
                    <a
                        key={palette.name}
                        href={palette.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="palette-card"
                        style={{
                            textDecoration: "none",
                            borderRadius: "1.5rem",
                            boxShadow: `0 6px 32px 0 ${palette.color}55, 0 1.5px 8px 0 #0008`,
                            background: "#ffffff",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "2.2rem 2rem 1.5rem 2rem",
                            minWidth: "240px",
                            maxWidth: "280px",
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            animation: `fadeInUp 0.8s ${0.2 + idx * 0.18}s both`,
                            transition: "box-shadow 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1)",
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 0,
                            pointerEvents: "none"
                        }} />
                        <img
                            src={palette.image}
                            alt={palette.name}
                            style={{
                                objectFit: "contain",
                                marginBottom: "1.2rem",
                                borderRadius: "1rem",
                                background: "#ffffff",
                                transition: "transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.3s",
                                zIndex: 1,
                            }}
                            className="w-full"
                        />
                        <span
                            style={{
                                fontWeight: 700,
                                color: palette.color,
                                fontSize: "1.18rem",
                                letterSpacing: "0.01em",
                                marginTop: "0.7rem",
                                textShadow: `0 2px 12px ${palette.color}77, 0 1px 2px #000a`,
                                zIndex: 1,
                            }}
                        >
                            {palette.name}
                        </span>
                        <span
                            style={{
                                fontSize: "0.98rem",
                                color: "#fff9",
                                marginTop: "0.3rem",
                                fontWeight: 400,
                                zIndex: 1,
                                letterSpacing: "0.01em",
                                textAlign: "center",
                            }}
                        >
                            Explore the palette
                        </span>
                        {/* <div className="glow" style={{
                            position: "absolute",
                            bottom: 0, left: 0, right: 0,
                            height: "18px",
                            background: `linear-gradient(90deg, transparent 0%, ${palette.color}99 50%, transparent 100%)`,
                            filter: "blur(8px)",
                            zIndex: 0,
                        }} /> */}
                    </a>
                ))}
            </div>
            <style>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .palette-card:hover img {
                    transform: scale(1.13) rotate(-3deg);
                    box-shadow: 0 8px 32px 0 #fff6, 0 1.5px 8px 0 #000a;
                }
                .palette-card:hover {
                    box-shadow: 0 12px 48px 0 #6366f1cc, 0 2px 12px 0 #000a;
                    transform: translateY(-8px) scale(1.04) rotate(-1deg);
                }
                .palette-card:active {
                    transform: scale(0.98);
                }
            `}</style>
        </div>
    );
};

export default PaletaColor;