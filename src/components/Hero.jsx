import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { config } from "../config";
import { useTranslation } from "react-i18next";
import { useConfig } from "../hooks/useConfig";

// 👑 ANIMASYON VARYANTLARI
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

const Hero = () => {
  const { hero } = config;
  const { t } = useTranslation();
  const { upper } = useConfig();

  // 👑 PARALLAX İÇİN SCROLL KONTROLÜ
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Sayfa aşağı kaydıkça arka plan resmini yavaşça y ekseninde kaydırır (0% -> 30%)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={targetRef}
      id="hero" 
      className="relative w-full h-screen min-h-150 flex items-center overflow-hidden"
    >
      {/* KATMAN 1: Arka Plan Görseli (Parallax + Zoom-In Animasyonlu) */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{ 
          backgroundImage: `url(images/hero2.webp)`,
          y: yBg // 👑 Kaydırma hızı içeriğe göre daha yavaş hareket eder
        }}
        className="absolute -top-[10%] inset-x-0 w-full h-[120%] bg-cover bg-center pointer-events-none"
      />

      {/* KATMAN 2: Sol Taraf Karartma (Gradient Overlay) */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent z-1" />

      {/* KATMAN 3: İçerik (Sıralı Fade-In Animasyonu) */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl w-full"
        >
          {/* Başlık */}
          <h1 className="font-serif text-text flex flex-col gap-1">
            <motion.span 
              variants={itemVariants}
              className="text-accent text-4xl sm:text-6xl md:text-7xl lg:text-8x tracking-wider sm:tracking-widest uppercase font-light leading-tightest"
            >
              {upper(t("hero.title", "Error"))}
            </motion.span>
            
            <motion.span 
              variants={itemVariants}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tightest"
            >
              {t("hero.subtitle", "Error")}
            </motion.span>
          </h1>

          {/* Zarif Ayırıcı Çizgi */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 my-5 sm:my-6 opacity-60"
          >
            <div className="h-px w-96 sm:w-72 bg-muted"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-muted"></div>
            <div className="h-px w-96 sm:w-72 bg-muted"></div>
          </motion.div>

          {/* Açıklama Metni */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-text/90 text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10 max-w-lg"
          >
            {t("hero.tagline", "Error")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;