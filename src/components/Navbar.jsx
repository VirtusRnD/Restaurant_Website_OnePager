import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp, IoCallOutline } from "react-icons/io5";
import { useConfig } from "../hooks/useConfig";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import config from "../config";

const Navbar = ({ theme, isModalOpen, toggleModal }) => {
  const { upper } = useConfig();
  const { t, i18n } = useTranslation();

  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const phoneNumber = config?.contact?.phone || "+90 555 123 45 67";
  const phoneTelLink = `tel:${phoneNumber.replace(/\s+/g, "")}`;

  const handleNav = useCallback(() => {
    setNav((prev) => !prev);
  }, []);

  // 1. YUMUŞAK KAYDIRMA (SMOOTH SCROLL)
  const scrollToSection = (sectionId) => {
    if (nav) setNav(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72; // Navbar yüksekliği (h-18)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 2. SCROLL & INTERSECTION OBSERVER
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY < 50) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = ["hero", "about", "menu", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -40% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.scrollY >= 50) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // 3. MENÜ LİNKLERİ
  const navItems = useMemo(
    () => [
      { id: "hero", label: t("common.home") },
      { id: "menu", label: t("common.menu") },
      { id: "about", label: t("common.about") },
      { id: "contact", label: t("common.contact") },
    ],
    [t, i18n.language]
  );

  const isLightMode = true;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-18 z-50 transition-all duration-500 contain-layout
        ${
          isLightMode
            ? "bg-primary border-b border-muted/80 shadow-md backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* DİL BUTONU */}
        <div className="absolute lg:right-8 lg:left-auto left-6 top-1/2 -translate-y-1/2 z-[160] flex items-center">
          <LanguageSwitcher />
        </div>

        {/* ANA KAPSAYICI */}
        <div className="relative flex justify-end lg:justify-between items-center h-full pl-4 pr-6 lg:pl-8 lg:pr-24 max-w-[1240px] mx-auto text-text">
          
          {/* MASAÜSTÜ / ANA LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 xl:-translate-x-15 flex flex-col lg:flex-1 lg:justify-start lg:items-start justify-center items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer focus:outline-none"
              aria-label={config?.contact?.name || "Logo"}
            >
              <div 
                className="w-28 h-12 lg:w-40 lg:h-14 bg-contain bg-no-repeat bg-center select-none transition-all duration-300"
                style={{ backgroundImage: 'var(--logo-url)' }}
              />
            </button>
          </div>

          {/* MASAÜSTÜ MENÜ LİNKLERİ & TELEFON BUTONU */}
          <div className="hidden lg:flex items-center space-x-6 mx-auto">
            <ul className="flex font-medium uppercase tracking-widest text-sm items-center">
              {navItems.map((item) => (
                <li key={item.id} className="font-sans p-4 text-text/90">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`pb-1 transition-colors duration-300 ${
                      activeSection === item.id
                        ? "border-b-2 border-accent text-accent font-semibold"
                        : "hover:text-hover hover:cursor-pointer"
                    }`}
                  >
                    {upper(item.label)}
                  </button>
                </li>
              ))}
            </ul>

            {/* 📞 MASAÜSTÜ ÇERÇEVELİ TELEFON BUTONU */}
            <a
              href={phoneTelLink}
              className="flex items-center gap-2 px-4 py-2 border-2 border-accent/80 text-accent hover:bg-accent hover:text-surface rounded-full transition-all duration-300 text-xs tracking-wider font-semibold shadow-xs"
            >
              <IoCallOutline size={16} />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* MOBİL HAMBURGER İKONU */}
          <div className="flex lg:hidden justify-end items-center z-[150]">
            <div onClick={handleNav} className="cursor-pointer p-1">
              {nav ? (
                <AiOutlineClose size={22} className="text-text" />
              ) : (
                <AiOutlineMenu size={22} className="text-text" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBİL MENÜ KARARTMA (BACKDROP) */}
      {nav && (
        <div
          onClick={handleNav}
          className="fixed inset-0 w-full h-full bg-black/40 z-[140] animate-fade-in transition-all duration-300"
        />
      )}

      {/* MOBİL MENÜ ÇEKMECESİ */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[87%] max-w-[400px] h-screen border-r bg-surface ease-in-out duration-500 z-[150] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            : "fixed -left-full top-0 h-screen w-0 p-6 bg-hotel-light ease-in-out duration-500 z-[150]"
        }
      >
        <div>
          {/* MOBİL ÇEKMECE LOGOSU */}
          <div className="bg-surface mb-8 select-none">
            <button
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer focus:outline-none"
              aria-label={config?.contact?.name || "Logo"}
            >
              <div 
                className="w-32 h-14 bg-[var(--logo-url)] bg-contain bg-no-repeat bg-left transition-all duration-300"
              />
            </button>
          </div>

          {/* LİNKLER */}
          <ul className="text-text uppercase tracking-widest text-sm font-medium space-y-2">
            {navItems.map((item) => (
              <li key={item.id} className="p-4 border-b border-muted/60">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`pb-1 block w-full text-left cursor-pointer ${
                    activeSection === item.id
                      ? "border-l-8 pl-2 py-1 border-muted text-heading font-semibold"
                      : ""
                  }`}
                >
                  {upper(item.label)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 MOBİL MENÜ EN ALT TELEFON BUTONU */}
        <div className="pt-6 mt-6 border-t border-muted/60">
          <a
            href={phoneTelLink}
            onClick={() => setNav(false)}
            className="flex items-center justify-center gap-2.5 w-full py-3 border border-accent text-accent hover:bg-accent hover:text-surface rounded-full transition-all duration-300 text-xs tracking-widest font-bold uppercase shadow-sm"
          >
            <IoCallOutline size={18} />
            <span>{phoneNumber}</span>
          </a>
        </div>
      </div>

      {/* REZERVASYON MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 w-full h-full z-[200] flex items-center justify-center p-4">
          <div
            onClick={toggleModal}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          />

          <div className="relative w-full max-w-[1150px] bg-hotel-light text-hotel-earth shadow-2xl p-8 md:py-10 md:px-12 border border-hotel-sand/50 z-10">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-hotel-earth/60 hover:text-hotel-dark transition-colors cursor-pointer p-1"
            >
              <IoCloseSharp size={24} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-[12px] tracking-widest pl-[0.1em] font-semibold text-hotel-dark/60 uppercase mb-1">
                {upper(t("common.booking"))}
              </h2>
              <h1 className="text-lg font-light pl-[0.1em] tracking-widest uppercase">
                {upper(t("common.bookmsg"))}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] tracking-widest font-medium text-hotel-dark uppercase">
                  {upper(t("common.check-in_date"))}
                </label>
                <input
                  type="date"
                  className="w-full bg-white border border-hotel-sand/60 px-3 py-2 text-sm focus:outline-none focus:border-hotel-dark text-hotel-earth"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] tracking-widest font-medium text-hotel-dark uppercase">
                  {upper(t("common.check-out_date"))}
                </label>
                <input
                  type="date"
                  className="w-full bg-white border border-hotel-sand/60 px-3 py-2 text-sm focus:outline-none focus:border-hotel-dark text-hotel-earth"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] tracking-widest font-medium text-hotel-dark uppercase">
                  {upper(t("common.adults"))}
                </label>
                <select
                  className="w-full bg-white border border-hotel-sand/60 px-3 py-2 text-sm focus:outline-none focus:border-hotel-dark text-hotel-earth appearance-none rounded-none"
                  defaultValue="2 Yetişkin"
                >
                  <option>1 {t("common.adult")}</option>
                  <option>2 {t("common.adults")}</option>
                  <option>3 {t("common.adults")}</option>
                  <option>4 {t("common.adults")}</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] tracking-widest font-medium text-hotel-dark uppercase">
                  {upper(t("common.children"))}
                </label>
                <select
                  className="w-full bg-white border border-hotel-sand/60 px-3 py-2 text-sm focus:outline-none focus:border-hotel-dark text-hotel-earth appearance-none rounded-none"
                  defaultValue={t("common.no_children")}
                >
                  <option>{t("common.no_children")}</option>
                  <option>1 {t("common.child")}</option>
                  <option>2 {t("common.children")}</option>
                </select>
              </div>

              <button
                onClick={() => alert("Müsait odalar aratılıyor...")}
                className="w-full bg-hotel-dark text-hotel-accent text-xs tracking-widest uppercase font-medium py-3 hover:bg-hotel-earth transition-colors cursor-pointer shadow-md"
              >
                {upper(t("common.search_rooms"))}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Navbar);