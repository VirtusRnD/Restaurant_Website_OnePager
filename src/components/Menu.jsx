import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useConfig } from "../hooks/useConfig.js";
import { useTranslation } from "react-i18next";
import config from "../config.js";

// ANIMASYON VARYANTLARI
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Menu = () => {
  const { upper, currentLocale } = useConfig();
  const { t } = useTranslation();

  const categories = config?.menu?.categories || [];
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id || ""
  );

  // 👑 Genişletilen menü öğesinin state'i
  const [expandedItemId, setExpandedItemId] = useState(null);

  const menuSectionRef = useRef(null);
  const isInView = useInView(menuSectionRef, { once: true, amount: 0.1 });

  const scrollContainerRef = useRef(null);
  const categoryRefs = useRef({});

  // 👑 Boşluğa tıklamayı algılamak için referans
  const menuListContainerRef = useRef(null);

  // Boşluğa veya dışarıya tıklandığında genişlemiş kartı kapatır
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuListContainerRef.current &&
        !menuListContainerRef.current.contains(event.target)
      ) {
        setExpandedItemId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (id) => {
    setActiveCategoryId(id);
    setExpandedItemId(null); // Kategori değiştiğinde açık olan kartı kapatır

    const container = scrollContainerRef.current;
    const button = categoryRefs.current[id];

    if (container && button) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      let targetScroll = buttonLeft - containerWidth / 2 + buttonWidth / 2;
      const maxScroll = container.scrollWidth - containerWidth;

      if (targetScroll < 0) targetScroll = 0;
      if (targetScroll > maxScroll) targetScroll = maxScroll;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Kart tıklama işleyicisi (Açıksa kapatır, kapalıysa açar)
  const handleItemClick = (e, id) => {
    e.stopPropagation();
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  const currentCategoryData = useMemo(() => {
    const category = categories.find((cat) => cat.id === activeCategoryId);
    if (!category) return null;

    const rawItems = category.items || [];
    const translatedItems = rawItems.map((item) => {
      const itemText =
        t(`menuPage.items.${item.id}`, { returnObjects: true }) || {};
      return {
        id: item.id,
        title: itemText.title || item.id,
        description: itemText.description || "",
        price: item.price,
        image: item.image || "/images/food-placeholder.jpg",
      };
    });

    return {
      subtitle: category.subtitleKey
        ? t(`menuPage.subtitles.${category.subtitleKey}`)
        : "",
      items: translatedItems,
    };
  }, [activeCategoryId, currentLocale, categories, t]);

  return (
    <div
      ref={menuSectionRef}
      id="menu"
      className="w-full min-h-screen bg-primary text-text py-16 px-4 md:px-16 contain-layout transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* ÜST BAŞLIK */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold pl-[0.2em] tracking-[0.2em] text-accent uppercase">
            {upper(t("menuPage.title", "MENU"))}
          </h1>

          {/* 👑 ÜST ZARİF AYIRICI ÇİZGİ */}
          <div className="flex items-center justify-center gap-3 mt-4 opacity-80 max-w-xl mx-auto">
            <div className="h-px w-full bg-stone-600"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0"></div>
            <div className="h-px w-full bg-stone-600"></div>
          </div>
        </motion.div>

        {/* MENÜ DÜZENİ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* SOL SÜTUN: KATEGORİ BUTONLARI */}
          <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar space-x-2 lg:space-x-0 lg:space-y-4 p-1.5 lg:p-0 bg-surface/80 lg:bg-transparent rounded-full lg:rounded-none border border-border/60 lg:border-none shadow-sm lg:shadow-none backdrop-blur-md lg:backdrop-blur-none transition-colors duration-500"
          >
            {categories.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              const categoryTitle = t(`menuPage.categories.${cat.id}`, cat.id);

              return (
                <button
                  key={cat.id}
                  ref={(el) => (categoryRefs.current[cat.id] = el)}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center space-x-3 text-left transition-all duration-300 group cursor-pointer whitespace-nowrap lg:whitespace-normal px-4 py-2 lg:px-0 lg:py-1 rounded-full lg:rounded-none text-xs sm:text-sm lg:text-base shrink-0 ${
                    isActive
                      ? "bg-accent text-surface font-bold shadow-md lg:shadow-none lg:bg-transparent lg:text-accent"
                      : "text-text/70 hover:text-text lg:hover:text-hover"
                  }`}
                >
                  <span
                    className={`hidden lg:inline-block h-[2px] transition-all duration-300 bg-accent ${
                      isActive ? "w-8" : "w-0 group-hover:w-4"
                    }`}
                  />

                  <span className="tracking-widest uppercase">
                    {upper(categoryTitle)}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* SAĞ SÜTUN: GENİŞLEYEBİLEN YEMEK LİSTESİ */}
          <div 
            ref={menuListContainerRef} 
            className="lg:col-span-8 space-y-8 pt-2 lg:pt-0 min-h-[350px]"
          >
            <AnimatePresence mode="wait">
              {isInView && (
                <motion.div
                  key={activeCategoryId}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* SUBTITLE */}
                  {currentCategoryData?.subtitle && (
                    <motion.p 
                      variants={itemVariants}
                      className="text-text/60 italic text-xs md:text-base mb-6 border-l-2 border-accent/60 pl-3"
                    >
                      {currentCategoryData.subtitle}
                    </motion.p>
                  )}

                  {/* YEMEK İÇERİKLERİ */}
                  <div className="space-y-6">
                    {currentCategoryData?.items.map((item) => {
                      const isExpanded = expandedItemId === item.id;

                      return (
                        <motion.div 
                          key={item.id} 
                          variants={itemVariants} 
                          onClick={(e) => handleItemClick(e, item.id)}
                          className={`relative flex flex-col rounded-xl overflow-hidden border shadow-sm cursor-pointer select-none ${
                            isExpanded 
                              ? "p-6 sm:p-8 border-accent/80 shadow-2xl ring-1 ring-accent/30" 
                              : "p-4 sm:p-5 border-border/20"
                          }`}
                        >
                          {/* 🖼️ ARKA PLANDAKİ FADELİ GÖRSEL */}
                          <motion.div 
                            initial={false}
                            animate={{
                              opacity: isExpanded ? 0.75 : 0.35,
                            }}
                            whileHover={{
                              opacity: isExpanded ? 0.85 : 0.65,
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute inset-0 bg-cover bg-center pointer-events-none"
                            style={{
                              backgroundImage: `url('${item.image}')`,
                              maskImage: isExpanded
                                ? 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                                : 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                              WebkitMaskImage: isExpanded
                                ? 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                                : 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)'
                            }}
                          />

                          {/* ARKA PLAN KARARTMA FİLTRESİ */}
                          <motion.div 
                            initial={false}
                            animate={{
                              opacity: isExpanded ? 0.3 : 0.6
                            }}
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary via-primary/40 to-primary"
                          />

                          {/* ✍️ ÖĞE İÇERİĞİ */}
                          <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                            <div className="flex justify-between items-baseline gap-4 border-b border-border/30 pb-2">
                              <h3 className={`font-bold tracking-wider text-accent uppercase transition-colors duration-200 ${
                                isExpanded ? "text-base md:text-xl" : "text-base md:text-xl"
                              }`}>
                                {upper(item.title)}
                              </h3>

                              <span className={`font-semibold tracking-wider text-accent whitespace-nowrap transition-colors duration-200 ${
                                isExpanded ? "text-base md:text-xl" : "text-base md:text-xl"
                              }`}>
                                {item.price + " TL"}
                              </span>
                            </div>

                            {/* Açıklama metni kart genişlediğinde (!isExpanded) gizlenir */}
                            {item.description && !isExpanded && (
                              <p className="text-text/90 leading-relaxed max-w-2xl pt-1 transition-colors duration-200 text-xs md:text-sm text-text/80">
                                {item.description}
                              </p>
                            )}

                            {/* Genişleme Alanı */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-6 sm:pt-10">
                                    <span className="text-[10px] uppercase tracking-widest text-text/70 block italic">
                                      {/*t("menuPage.clickToClose", "Kapatmak için tıklayın veya dışarıya basın")*/}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 👑 ALT ZARİF AYIRICI ÇİZGİ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mt-16 lg:mt-24 opacity-80 max-w-xl mx-auto"
        >
          <div className="h-px w-full bg-stone-600"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-accent shrink-0"></div>
          <div className="h-px w-full bg-stone-600"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default React.memo(Menu);