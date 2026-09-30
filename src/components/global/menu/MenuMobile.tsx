"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { RootObject } from "../../../interfaces/dbData";


interface MenuMobileProps {
  data: RootObject;
}

const MenuMobile: React.FunctionComponent<MenuMobileProps> = ({
  data,
}: MenuMobileProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const city = data?.dataGeneral?.location?.[0]?.city ?? "Serving your area";
  const primaryPhone = data?.dataGeneral?.phones?.[0]?.number;
  const reviewsEnabled = data?.reviews?.stateReviews && data?.reviews?.viewAll;
  const blogEnabled = data?.widgets?.blog;

  const routes = useMemo(
    () =>
      [
        { name: "Home", path: "/", visible: true },
        { name: "About Us", path: "/about", visible: true },
        { name: "Services", path: "/services", visible: true },
        { name: "Portfolio", path: "/portfolio", visible: true },
        { name: "Reviews", path: "/reviews", visible: Boolean(reviewsEnabled) },
        { name: "Resources", path: "/resources", visible: true },
        { name: "Local Profile", path: "/local-profile", visible: false },
        { name: "Blog", path: "/blog", visible: true },
        { name: "Contact", path: "/contact", visible: Boolean(blogEnabled) },
      ].filter((route) => route.visible),
    [blogEnabled, reviewsEnabled],
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="w-full border-t border-white/10 bg-[#0b0b0b]/90 px-4 py-3 rounded-2xl">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          {primaryPhone ? (
            <a
              href={`tel:+1${primaryPhone}`}
              className="hidden lg:inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <i className="fas fa-phone-alt text-xs" aria-hidden="true" />
              </span>
              <span className="truncate">+1 {primaryPhone}</span>
            </a>
          ) : (
            <p className="text-sm text-white/60">{city}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open mobile menu"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
        >
          <i className="fas fa-bars" aria-hidden="true" />
          Menu
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[9998] bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[9999] h-screen w-[86%] max-w-[360px] border-l border-white/10 bg-[#111111] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <img src={data.logos.secondary} alt={data.name} className="w-3/5 rounded-full object-contain mx-auto" />
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">

            <a href="/" onClick={() => setOpen(false)} className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45">Navigation</p>
              <h3 className="mt-1 text-xl font-black leading-tight text-white">
                {data?.name}
              </h3>
              <p className="mt-1 text-sm text-white/60">{city}</p>
            </a>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close mobile menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition-colors duration-300 hover:bg-white/10"
            >
              <i className="fas fa-xmark" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-2 overflow-y-auto pr-1">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base font-semibold text-white/85 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                {route.name}
              </a>
            ))}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="mb-4 flex items-center gap-2">
              {(data?.redesSociales ?? []).slice(0, 4).map((item: any, index: number) => (
                <a
                  key={`${item?.name ?? "social"}-${index}`}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item?.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <i className={`fa-brands fa-${item?.icon}`} />
                </a>
              ))}
            </div>

            {/* <div className="w-fit" onClick={() => setOpen(false)}>
              <ToggleButton data={data} />
            </div> */}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MenuMobile;
