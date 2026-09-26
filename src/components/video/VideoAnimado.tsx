import React from "react";
import VideosPlayContent from "./VideosPlayContent";
import type { RootObject } from "../../interfaces/dbData";
import ButtonContent from "../buttons/Buttons";


interface VideoAnimadoProps {
  data: RootObject;
}

const VideoAnimado: React.FC<VideoAnimadoProps> = (
  { data }: VideoAnimadoProps
) => {
  const videos = data?.videoAnimado ?? [];

  if (!videos.length) return null;

  return (
    <section className="w-[94%] md:w-[90%] mx-auto relative z-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7 md:mb-8">
        <div>
          <p className="text-white/75 text-xs md:text-sm uppercase tracking-[0.22em] font-semibold">
            Video Experience
          </p>
          <h2 className="text-white md:text-[58px] text-[34px] font-black leading-[1.02] max-w-3xl">
            {data?.slogan?.[0]}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 text-white">
            {videos.length} {videos.length === 1 ? "video" : "videos"}
          </span>
          <ButtonContent linkBtn={`tel:+1${data.dataGeneral.phones[0].number}`} />
        </div>
      </div>

      <div
        className={`grid gap-4 md:gap-5 ${videos.length === 1
          ? "grid-cols-1 max-w-5xl mx-auto"
          : "grid-cols-1 md:grid-cols-12 auto-rows-[220px]"
          }`}
      >
        {videos.map((item: any, index: number) => {
          const bentoClass =
            videos.length === 1
              ? ""
              : index === 0
                ? "md:col-span-8 md:row-span-2"
                : index === 1
                  ? "md:col-span-4 md:row-span-1"
                  : index === 2
                    ? "md:col-span-4 md:row-span-1"
                    : "md:col-span-6 md:row-span-1";

          return (
            <article
              key={index}
              className={`group overflow-hidden rounded-3xl border border-white/20 bg-black/20 backdrop-blur-sm p-2 md:p-3 ${bentoClass}`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black/40">
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-semibold">
                  #{index + 1}
                </div>
                <div className="aspect-video w-full h-full">
                  <VideosPlayContent videoUrl={item.urlVideo} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VideoAnimado;
