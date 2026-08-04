import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import { useConfig } from '../hooks/useConfig';
import { useTranslation } from "react-i18next";
import { storyPolaroids } from '../config';

const About = () => {
  const { upper } = useConfig();
  const { t } = useTranslation();

  const [activePolaroid, setActivePolaroid] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const leftPolaroids = storyPolaroids?.filter(p => p.side === 'left') || [];
  const rightPolaroids = storyPolaroids?.filter(p => p.side === 'right') || [];
  const allPolaroids = storyPolaroids || [];

  return (
    <div 
      ref={sectionRef}
      id="about" 
      className="relative w-full py-16 md:py-24 lg:py-40 px-4 contain-layout transition-colors duration-500 overflow-hidden flex flex-col lg:flex-row items-center justify-center min-h-[600px] lg:min-h-[850px]"
    >
      {/* AHŞAP ZEMİN GÖRSELİ */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center scale-125 md:scale-150"
        style={{ backgroundImage: `url('/images/wooden_bg.jpg')` }}
      />

      <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />

      {/* 📸 MASAÜSTÜ SOL POLAROIDLER */}
      {leftPolaroids.map((item) => {
        const targetRotate = Number(item.rotate) || 0;
        return (
          <motion.div
            key={`desktop-left-${item.id}`}
            layoutId={`polaroid-${item.id}`}
            onClick={() => setActivePolaroid(item)}
            initial={{ x: -600, opacity: 0, rotate: targetRotate - 15 }}
            animate={
              isInView 
                ? { x: 0, opacity: 1, rotate: targetRotate } 
                : { x: -600, opacity: 0, rotate: targetRotate - 15 }
            }
            whileHover={{ 
              scale: 1.08, 
              zIndex: 30, 
              transition: { duration: 0.2, delay: 0 } 
            }}
            transition={{ 
              duration: 1.1, 
              delay: item.delay || 0.1, 
              ease: [0.25, 1, 0.5, 1],
              layout: { duration: 0.2, ease: "easeOut" }
            }}
            style={{ 
              top: item.topPosition || "10%", 
              left: item.sidePosition || "2%",
              width: item.width || "160px"
            }}
            className="hidden lg:flex absolute z-20 flex-col items-center bg-white p-2 pb-3.5 shadow-2xl rounded-sm border border-stone-200/80 cursor-pointer"
          >
            <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-2 pointer-events-none">
              <img 
                src={item.image} 
                alt={upper(t(item.captionKey))} 
                className="w-full h-full object-cover select-none"
              />
            </div>
            <span className="font-serif text-stone-700 text-[10px] sm:text-xs tracking-wide italic select-none pointer-events-none text-center">
              {upper(t(item.captionKey))}
            </span>
          </motion.div>
        );
      })}

      {/* 👑 TABAK VE İÇERİK KAPSAYICISI */}
      <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[650px] md:h-[650px] flex items-center justify-center z-10 shrink-0">
        
        {/* 🍽️ TABAK GÖRSELİ (Yukarıdan Aşağıya Kayarak Gelir) */}
        <motion.img 
          src="/images/plate.png" 
          alt="Tabak" 
          initial={{ y: -350, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -350, opacity: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.1, 
            ease: [0.16, 1, 0.3, 1] // Zıplamayan, ağır ve gerçekçi oturma eğrisi
          }}
          className="scale-140 absolute inset-0 w-full h-full object-contain select-none pointer-events-none drop-shadow-2xl"
        />

        {/* ✍️ METİNLER (Tabak Yerleştikten Sonra Fade-In Olur) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ 
            duration: 0.9, 
            delay: 0.8, // 👈 Tabak oturduktan hemen sonra başlar
            ease: "easeOut" 
          }}
          className="relative z-10 w-[72%] h-[72%] flex flex-col items-center justify-center text-center p-2 md:p-6"
        >
          {/* ORTALI BAŞLIK */}
          <h2 className="text-base sm:text-xl md:text-3xl font-extrabold pl-[0.15em] tracking-[0.15em] md:pl-[0.2em] md:tracking-[0.2em] text-accent uppercase mb-2 md:mb-4 leading-tight">
            {upper(t("aboutPage.title", "Hikayemiz"))}
          </h2>

          {/* ZARİF AYIRICI ÇİZGİ */}
          <div className="flex items-center justify-center gap-3 mb-1 md:mb-6 opacity-100">
            <div className="h-px w-6 md:w-10 bg-muted"></div>
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rotate-45 bg-accent"></div>
            <div className="h-px w-6 md:w-10 bg-muted"></div>
          </div>

          {/* PARAGRAF */}
          <p className="font-sans text-stone-900 text-[11px] sm:text-xs md:text-base font-normal leading-4 md:leading-relaxed tracking-normal max-w-[85%] md:max-w-[70%]">
            {t("aboutPage.description", t("aboutPage.text"))}
          </p>
        </motion.div>

      </div>

      {/* 📸 MASAÜSTÜ SAĞ POLAROIDLER */}
      {rightPolaroids.map((item) => {
        const targetRotate = Number(item.rotate) || 0;
        return (
          <motion.div
            key={`desktop-right-${item.id}`}
            layoutId={`polaroid-${item.id}`}
            onClick={() => setActivePolaroid(item)}
            initial={{ x: 600, opacity: 0, rotate: targetRotate + 15 }}
            animate={
              isInView 
                ? { x: 0, opacity: 1, rotate: targetRotate } 
                : { x: 600, opacity: 0, rotate: targetRotate + 15 }
            }
            whileHover={{ 
              scale: 1.08, 
              zIndex: 30, 
              transition: { duration: 0.2, delay: 0 } 
            }}
            transition={{ 
              duration: 1.1, 
              delay: item.delay || 0.1, 
              ease: [0.25, 1, 0.5, 1],
              layout: { duration: 0.2, ease: "easeOut" }
            }}
            style={{ 
              top: item.topPosition || "10%", 
              right: item.sidePosition || "2%",
              width: item.width || "160px"
            }}
            className="hidden lg:flex absolute z-20 flex-col items-center bg-white p-2 pb-3.5 shadow-2xl rounded-sm border border-stone-200/80 cursor-pointer"
          >
            <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-2 pointer-events-none">
              <img 
                src={item.image} 
                alt={upper(t(item.captionKey))} 
                className="w-full h-full object-cover select-none"
              />
            </div>
            <span className="font-serif text-stone-700 text-[10px] sm:text-xs tracking-wide italic select-none pointer-events-none text-center">
              {upper(t(item.captionKey))}
            </span>
          </motion.div>
        );
      })}

      {/* 📱 MOBİL VE TABLET POLAROID IZGARASI */}
      <div className="relative z-20 flex lg:hidden flex-wrap items-center justify-center gap-6 mt-12 max-w-[500px] px-2">
        {allPolaroids.map((item, index) => {
          const targetRotate = Number(item.rotate) || (index % 2 === 0 ? -4 : 5);
          return (
            <motion.div
              key={`mobile-item-${item.id}`}
              layoutId={`polaroid-mobile-${item.id}`}
              onClick={() => setActivePolaroid(item)}
              initial={{ y: 50, opacity: 0, rotate: targetRotate - 10 }}
              animate={
                isInView 
                  ? { y: 0, opacity: 1, rotate: targetRotate } 
                  : { y: 50, opacity: 0, rotate: targetRotate - 10 }
              }
              whileHover={{ scale: 1.05 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.12, 
                ease: "easeOut",
                layout: { duration: 0.2, ease: "easeOut" }
              }}
              className="flex flex-col items-center bg-white p-2 pb-3 shadow-xl rounded-sm border border-stone-200/80 w-36 sm:w-40 cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-1.5 pointer-events-none">
                <img 
                  src={item.image} 
                  alt={upper(t(item.captionKey))} 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className="font-serif text-stone-700 text-[10px] sm:text-xs tracking-wide italic select-none pointer-events-none text-center">
                {upper(t(item.captionKey))}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 🔍 FOKUSLANDIRILMIŞ FOTOĞRAF MODALI (LIGHTBOX) */}
      <AnimatePresence>
        {activePolaroid && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              onClick={() => setActivePolaroid(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              layoutId={`polaroid-${activePolaroid.id}`}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center bg-white p-4 pb-6 shadow-2xl rounded-sm border border-stone-200 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px]"
            >
              <button
                onClick={() => setActivePolaroid(null)}
                className="absolute -top-3 -right-3 z-20 bg-white text-stone-800 p-2 rounded-full shadow-lg hover:bg-accent hover:text-white transition-colors cursor-pointer border border-stone-200"
                aria-label="Kapat"
              >
                <IoCloseSharp size={20} />
              </button>

              <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-4 rounded-xs">
                <img 
                  src={activePolaroid.image} 
                  alt={upper(t(activePolaroid.captionKey))} 
                  className="w-full h-full object-cover select-none"
                />
              </div>

              <span className="font-serif text-stone-800 text-base md:text-lg tracking-wide italic font-medium">
                {upper(t(activePolaroid.captionKey))}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;