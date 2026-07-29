import React from "react";
import { config } from "../config";

const Hero = () => {
  const { hero } = config;

  return (
    <section className="relative w-full h-[85vh] min-h-150 flex items-center">
      {/* KATMAN 1: Arka Plan Görseli */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.bgImage})` }}
      />

      {/* KATMAN 2: Sol Taraf Karartma (Gradient Overlay) 
          Bu sayede görsel ne kadar parlak olursa olsun soldaki beyaz yazılar hep okunur kalır.
      */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />

      {/* KATMAN 3: İçerik */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center">
        <div className="max-w-xl">
          {/* Başlık (Serif Font) */}
          <h1 className="font-serif text-brand-cream flex flex-col gap-1">
            <span className="text-6xl md:text-7xl lg:text-8xl tracking-widest uppercase font-light">
              {hero.titleMain}
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl italic">
              {hero.titleItalic}
            </span>
          </h1>

          {/* Zarif Ayırıcı Çizgi (Görseldeki "Savor the Moment" altındaki detay) */}
          <div className="flex items-center gap-3 my-6 opacity-60">
            <div className="h-px w-10 bg-brand-cream"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-brand-cream"></div>
            <div className="h-px w-10 bg-brand-cream"></div>
          </div>

          {/* Açıklama Metni (Sans-serif Font) */}
          <p className="font-sans text-brand-cream/90 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light">
            {hero.description}
          </p>

          {/* Aksiyon Butonu (CTA) */}
          <a
            href={hero.ctaLink}
            className="inline-block bg-brand-olive hover:bg-brand-olive-light text-brand-cream px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          >
            {hero.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
