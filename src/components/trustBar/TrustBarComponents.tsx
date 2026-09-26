
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { RootObject } from "../../interfaces/dbData";
import { BiAward, BiBadgeCheck, BiLogoGoogle, BiMapPin, BiPhone, BiX } from "react-icons/bi";
import { HiShieldCheck } from "react-icons/hi2";
import { FaCalendarDays } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";


interface TrustBarComponentsProps {
    dataGlobal: RootObject;
}

const defaultLogo = "/assets/images/emblema.png";

const TrustBarComponents: React.FC<TrustBarComponentsProps> = ({ dataGlobal }) => {
    const trustBarRef = useRef<HTMLElement | null>(null);
    const [hasPassedTrustBar, setHasPassedTrustBar] = useState(false);
    const [isFixedFooterDismissed, setIsFixedFooterDismissed] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const trustBar = dataGlobal.trustBar;
    const logoUrl = dataGlobal?.logos?.primary || dataGlobal?.logos?.secondary || dataGlobal?.logos?.favicon || defaultLogo;
    const companyName = dataGlobal.name || dataGlobal.nameCustomers || "Company";
    const companyLocation = dataGlobal.dataGeneral?.location?.[0]?.city || dataGlobal.businessAddress || dataGlobal.accountAddress || "";
    const phoneDisplay = dataGlobal.dataGeneral?.phones?.[0]?.number || "Call Us";
    const phoneTel = normalizePhoneTel(phoneDisplay);
    const sinceExperienceLabel = formatExperienceSince(dataGlobal.yearsExperience);
    const ctaUrl = "/contact";
    const ctaText = dataGlobal.estimateFree || "Get a Free Quote";
    const footerAccentStyle = {
        "--trustbar-primary": dataGlobal.colors?.primaryColor || "var(--primary)",
        "--trustbar-secondary": dataGlobal.colors?.secondaryColor || "var(--secondary)",
        "--trustbar-pulse": dataGlobal.colors?.tertiaryColor || dataGlobal.colors?.fourthColor || dataGlobal.colors?.secondaryColor || "var(--secondary)",
    } as CSSProperties;

    const ratings = useMemo(
        () => (trustBar?.ratings ?? []).filter((rating) => typeof rating.score === "number" || typeof rating.reviews === "number" || rating.source),
        [trustBar?.ratings],
    );
    const ratingCount = ratings.length;
    const totalReviews = ratings.reduce((total, rating) => total + (rating.reviews ?? 0), 0);
    const averageRating = ratingCount ? ratings.reduce((total, rating) => total + (rating.score ?? 0), 0) / ratingCount : 0;
    const ratingPercent = averageRating ? Math.round((averageRating / 5) * 100) : 100;
    const reviewSources = ratings.map((rating) => rating.source).filter(Boolean).join(", ") || "customer feedback";
    const hasMultipleRatings = ratingCount > 1;
    const singleRatingLink = ratingCount === 1 ? ratings[0]?.link : "";

    const license = trustBar?.license?.find((item) => item.stateLicense);
    const activeCertifications = trustBar?.certifications?.filter((certification) => certification.stateCertification) ?? [];
    const certificationTitle = activeCertifications.map((certification) => certification.certificationName).filter(Boolean).join(", ");
    const certificationDescription = activeCertifications.map((certification) => certification.descriptionCertification).filter(Boolean).join(", ");
    const experienceLabel = formatYearsExperience(dataGlobal.yearsExperience) || dataGlobal.businessLicense || "Local Experience";

    const showFixedFooter = hasPassedTrustBar && !isFixedFooterDismissed;
    const showFooterToggle = hasPassedTrustBar && isFixedFooterDismissed;

    useEffect(() => {
        const updateFooterVisibility = () => {
            const currentTrustBar = trustBarRef.current;

            if (!currentTrustBar) return;

            const hasPassed = currentTrustBar.getBoundingClientRect().bottom <= 0;

            setHasPassedTrustBar(hasPassed);

            if (!hasPassed) {
                setIsFixedFooterDismissed(false);
            }
        };

        updateFooterVisibility();
        window.addEventListener("scroll", updateFooterVisibility, { passive: true });
        window.addEventListener("resize", updateFooterVisibility);

        return () => {
            window.removeEventListener("scroll", updateFooterVisibility);
            window.removeEventListener("resize", updateFooterVisibility);
        };
    }, []);

    if (!trustBar?.stateTrustBar) {
        return null;
    }

    return (
        <>
            <section
                ref={trustBarRef}
                className="relative mx-auto my-10 w-11/12 overflow-hidden rounded-[2rem] border border-[#d8dfd2] bg-[#f4f5ee] text-[#17221b] shadow-[0_24px_60px_rgba(24,44,28,0.14)] lg:w-4/5"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 86% 15%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 25%), linear-gradient(135deg, #f7f8f0 0%, #edf1e7 100%)",
                }}
                itemScope
                itemType="https://schema.org/LocalBusiness"
            >
                <meta itemProp="name" content={companyName} />
                <meta itemProp="telephone" content={phoneDisplay} />
                {companyLocation && <meta itemProp="areaServed" content={companyLocation} />}

                <div className="relative mx-auto w-11/12 max-w-7xl py-7 md:py-9">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-center">
                        <div className="flex gap-5 sm:gap-7">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#253d2a] shadow-[8px_8px_0_var(--primary)] sm:h-28 sm:w-28">
                                <img src={logoUrl} alt={`${companyName} Logo`} className="h-auto max-h-full w-full object-contain p-2" itemProp="logo" />
                            </div>
                            <div className="min-w-0 self-center" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-primary">The local standard</p>
                                <h2 className="max-w-xl text-xl font-black leading-[0.95] tracking-tight text-[#17221b] sm:text-3xl" itemProp="name">{companyName}</h2>
                                {companyLocation && <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#536257]"><BiMapPin className="h-4 w-4 text-primary" aria-hidden="true" /><span itemProp="addressLocality">{companyLocation}</span></p>}
                                <meta itemProp="addressCountry" content="US" />
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-4 border-t border-[#cfd8c9] pt-5 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
                            <p className="max-w-xs text-left text-sm leading-relaxed text-[#536257] md:text-right">Reliable care for the places where life happens.</p>
                            <a href={ctaUrl} className="inline-flex w-full items-center justify-center rounded-xl bg-[#253d2a] px-5 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_var(--primary)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_var(--primary)] sm:w-auto" itemProp="url">{ctaText}</a>
                        </div>
                    </div>

                    <div className="mt-9 grid grid-cols-2 gap-px rounded-2xl bg-[#f3f3f3] sm:grid-cols-4">
                        {hasMultipleRatings ? (
                            <button
                                type="button"
                                onClick={() => setIsRatingModalOpen(true)}
                                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-left shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary"
                                itemProp="aggregateRating"
                                itemScope
                                itemType="https://schema.org/AggregateRating"
                                aria-label="View rating summary"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-300/15 text-yellow-300 ring-1 ring-yellow-300/30">
                                    <FaStar className="h-5 w-5 fill-current" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white">
                                        <span itemProp="ratingValue">{averageRating ? averageRating.toFixed(1) : "5.0"}</span>/5 average
                                    </p>
                                    <p className="truncate text-xs text-white/65">
                                        <span itemProp="reviewCount">{totalReviews}</span> reviews from {reviewSources}
                                    </p>
                                    <meta itemProp="bestRating" content="5" />
                                    <meta itemProp="worstRating" content="1" />
                                </div>
                            </button>
                        ) : (
                            <a
                                href={singleRatingLink || "#"}
                                target={singleRatingLink ? "_blank" : undefined}
                                rel={singleRatingLink ? "noopener noreferrer" : undefined}
                                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary"
                                itemProp="aggregateRating"
                                itemScope
                                itemType="https://schema.org/AggregateRating"
                                aria-label="Open rating platform"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-yellow-300 ring-1 ring-yellow-300/30">
                                    <FaStar className="h-5 w-5 fill-current" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-primary">
                                        <span itemProp="ratingValue">{averageRating ? averageRating.toFixed(1) : "5.0"}</span>/5 average
                                    </p>
                                    <p className="truncate text-xs text-slate-700">
                                        <span itemProp="reviewCount">{totalReviews}</span> reviews from {reviewSources}
                                    </p>
                                    <meta itemProp="bestRating" content="5" />
                                    <meta itemProp="worstRating" content="1" />
                                </div>
                            </a>
                        )}

                        {license ? (
                            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary ring-1 ring-primary/30">
                                    <HiShieldCheck className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-primary">{license.licenseNumber || "Licensed"}</p>
                                    {license.descriptionLicense && <p className="truncate text-xs text-slate-700">{license.descriptionLicense}</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white ring-1 ring-primary/30">
                                    <FaCalendarDays className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-primary">{experienceLabel}</p>
                                    <p className="truncate text-xs text-slate-700">Serving {companyLocation || companyName}</p>
                                </div>
                            </div>
                        )}

                        {certificationTitle ? (
                            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white ring-1 ring-primary/30">
                                    <BiAward className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-primary">{certificationTitle}</p>
                                    <p className="truncate text-xs text-slate-700">{certificationDescription || certificationTitle}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-green-100 ring-1 ring-green-300/30">
                                    <BiBadgeCheck className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-primary">{ratingPercent}% Satisfaction</p>
                                    <p className="truncate text-xs text-slate-700">Based on {reviewSources}</p>
                                </div>
                            </div>
                        )}

                        <a
                            href={phoneTel}
                            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300/50 hover:bg-white/15"
                            aria-label={`Call ${companyName}`}
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white ring-1 ring-primary/30">
                                <BiPhone className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-primary">Call Us</p>
                                <p className="truncate text-xs text-slate-700">{phoneDisplay}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <button
                type="button"
                onClick={() => setIsFixedFooterDismissed(false)}
                className={`group fixed left-3 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center overflow-hidden rounded-full border border-white/15 bg-slate-950/95 px-3 text-white shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:w-[238px] hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 ${showFooterToggle ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-24 opacity-0"
                    }`}
                aria-label={`Show ${ratingPercent}% Satisfaction trust bar`}
                aria-hidden={!showFooterToggle}
            >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-300/15 text-green-300 ring-1 ring-green-300/30">
                    <BiBadgeCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="ml-2 shrink-0 hidden text-sm font-bold text-white transition-all duration-300 group-hover:block group-hover:opacity-100">{ratingPercent}%</span>
                <span className="ml-1 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:max-w-[130px] group-hover:opacity-100">
                    Satisfaction
                </span>
            </button>

            <div
                className={`fixed inset-x-0 bottom-0 z-50 mx-auto mb-5 w-11/12 overflow-visible rounded-2xl border border-[#cbd7c5] border-t-4 border-t-primary bg-[#f4f6ed] px-4 pb-4 pt-4 text-[#17221b] shadow-[0_18px_50px_rgba(25,48,29,0.22)] transition-all duration-300 md:w-4/5 ${showFixedFooter ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
                    }`}
                aria-hidden={!showFixedFooter}
                style={footerAccentStyle}
            >
                <div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    aria-hidden="true"
                />
                <a
                    href="/"
                    className="absolute -left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#f4f6ed] bg-[#253d2a] p-2 shadow-[0_5px_0_var(--primary)] sm:h-20 sm:w-32"
                    aria-label={`${companyName} home`}
                >
                    <svg viewBox="0 0 420 520" className="hidden" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <defs>
                            <linearGradient id="trustbarLogoBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff004c" />
                                <stop offset="14%" stopColor="#ff8a00" />
                                <stop offset="28%" stopColor="#ffe600" />
                                <stop offset="42%" stopColor="#21d07a" />
                                <stop offset="56%" stopColor="#00d4ff" />
                                <stop offset="70%" stopColor="#2364ff" />
                                <stop offset="84%" stopColor="#b829ff" />
                                <stop offset="100%" stopColor="#ff35c8" />
                                <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="4s" repeatCount="indefinite" />
                            </linearGradient>
                            <filter id="trustbarLogoBorderGlow" x="-35%" y="-35%" width="170%" height="170%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            d={`
          M 45 20
          L 375 20
          L 415 85

          C 385 115, 385 145, 388 185
          C 392 245, 365 300, 375 345
          C 385 405, 340 440, 285 468

          C 245 488, 220 505, 210 520

          C 200 505, 175 488, 135 468
          C 80 440, 35 405, 45 345
          C 55 300, 28 245, 32 185
          C 35 145, 35 115, 5 85

          Z
        `}
                            fill="white"
                            stroke="url(#trustbarLogoBorderGradient)"
                            strokeWidth="10"
                            filter="url(#trustbarLogoBorderGlow)"
                        />
                    </svg>
                    <span className="flex h-full w-full items-center justify-center">
                        <img src={logoUrl} alt={`${companyName} Logo`} className="h-auto max-h-full w-full object-contain" />
                    </span>
                </a>
                <button
                    type="button"
                    onClick={() => setIsFixedFooterDismissed(true)}
                    className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#cbd7c5] bg-white text-[#536257] transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Hide trust bar"
                >
                    <BiX className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center pl-20 pr-10 sm:pl-24 lg:pl-28">
                    <div className="grid min-w-0 flex-1 grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
                        {hasMultipleRatings ? (
                            <button type="button" onClick={() => setIsRatingModalOpen(true)} className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-[#d4ddcf] bg-white px-3 py-2.5 text-left text-xs text-[#536257] shadow-sm transition hover:-translate-y-0.5 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary" aria-label="View rating summary">
                                <BiBadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                <span className="truncate font-bold text-[#253d2a]">{ratingPercent}% Satisfaction</span>
                            </button>
                        ) : (
                            <a href={singleRatingLink || "#"} target={singleRatingLink ? "_blank" : undefined} rel={singleRatingLink ? "noopener noreferrer" : undefined} className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-[#d4ddcf] bg-white px-3 py-2.5 text-xs text-[#536257] shadow-sm transition hover:-translate-y-0.5 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Open rating platform">
                                <BiLogoGoogle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                <span className="truncate font-bold text-[#253d2a]">{ratingPercent}% Satisfaction</span>
                            </a>
                        )}
                        <div className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-[#d4ddcf] bg-white px-3 py-2.5 text-xs text-[#657267] shadow-sm">
                            <HiShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <span className="truncate font-bold text-[#253d2a]">{license?.licenseNumber || experienceLabel}</span>
                        </div>
                        <div className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-[#d4ddcf] bg-white px-3 py-2.5 text-xs text-[#657267] shadow-sm">
                            <BiAward className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            <span className="truncate font-bold text-[#253d2a]">{certificationTitle || sinceExperienceLabel || "Locally trusted"}</span>
                        </div>
                        <a href={phoneTel} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-[#253d2a] px-4 py-2.5 text-xs text-white shadow-[3px_3px_0_var(--primary)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--primary)]" aria-label={`Call ${companyName}`}>
                            <BiPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="truncate font-bold">{phoneDisplay}</span>
                        </a>
                    </div>
                </div>
            </div>

            {isRatingModalOpen && hasMultipleRatings && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Rating summary"
                    onClick={() => setIsRatingModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-slate-950 p-5 text-white shadow-2xl shadow-black/50"
                        style={{
                            boxShadow:
                                "0 0 0 1px color-mix(in srgb, var(--trustbar-primary) 45%, transparent), 0 24px 80px color-mix(in srgb, var(--trustbar-primary) 30%, transparent)",
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsRatingModalOpen(false)}
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Close rating summary"
                        >
                            <BiX className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <div className="pr-10">
                            <p className="text-lg font-bold text-white">Rating Summary</p>
                            <p className="mt-1 text-sm text-white/65">
                                {averageRating ? averageRating.toFixed(1) : "5.0"}/5 average from {totalReviews} reviews
                            </p>
                        </div>

                        <div className="mt-5 space-y-3">
                            {ratings.map((rating, index) => {
                                const score = rating.score ?? 0;
                                const filledStars = Math.round(score);

                                return (
                                    <div
                                        key={rating.id || `${rating.source}-${index}`}
                                        className="rounded-xl border border-white/10 bg-white/10 p-4 shadow-inner shadow-white/5"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-white">{rating.source || "Review Platform"}</p>
                                                <div className="mt-1 flex items-center gap-1 text-yellow-300" aria-label={`${score || 5} out of 5 rating`}>
                                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                                        <FaStar
                                                            key={starIndex}
                                                            className={`h-4 w-4 ${starIndex < filledStars ? "fill-current" : "text-white/25"}`}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                    <span className="ml-2 text-xs font-semibold text-white/75">{score ? score.toFixed(1) : "5.0"}/5</span>
                                                </div>
                                                <p className="mt-1 text-xs text-white/60">{rating.reviews ?? 0} reviews</p>
                                            </div>

                                            {rating.link && (
                                                <a
                                                    href={rating.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-btnHover focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    Open platform
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function normalizePhoneTel(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "#";
    return `tel:${digits.length === 10 ? `+1${digits}` : `+${digits}`}`;
}

function formatYearsExperience(yearsExperience?: string) {
    const value = String(yearsExperience || "").trim();
    if (!value) return "";

    return /year|año/i.test(value) ? value : `${value} Years Experience`;
}

function formatExperienceSince(yearsExperience?: string) {
    const value = String(yearsExperience || "").trim();
    if (!value) return "";

    const years = Number(value.replace(/\D/g, ""));
    if (!Number.isFinite(years) || years <= 0) return "";

    return `Starting in ${new Date().getFullYear() - years}`;
}

export default TrustBarComponents;











