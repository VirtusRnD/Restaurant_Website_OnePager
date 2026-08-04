import React from 'react';
import { IoLogoInstagram, IoLogoFacebook, IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';
import { FaTripadvisor } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../hooks/useConfig';
import configData from '../config';

const Footer = () => {
  const { t } = useTranslation();
  const { config: hookConfig, upper } = useConfig();
  
  const activeConfig = hookConfig || configData;
  const siteName = activeConfig?.siteName || "Error Restoran";
  const currentYear = new Date().getFullYear();

  // 👑 DÜZELTİLDİ: Sabit ID'ler ve bunlara karşılık gelen çeviri anahtarları
  const quickLinks = [
    { id: 'home', key: 'common.home' },
    { id: 'about', key: 'common.about' },
    { id: 'menu', key: 'common.menu' },
    { id: 'contact', key: 'common.contact' }
  ];

  // 👑 DÜZELTİLDİ: Yumuşak kaydırma ve hassas ID eşleşmesi
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Navigasyon barının yüksekliğini hesaba katarak kaydırır
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-primary border-t border-stone-800/60 text-text/80 transition-colors duration-500 overflow-hidden">
      
      {/* 👑 ÜST AKIŞ ALANI (MAIN FOOTER) */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* 1. KOLON: BRAND & HAKKIMIZDA BİLGİSİ */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold tracking-widest text-accent uppercase">
            {upper ? upper(siteName) : siteName.toUpperCase()}
          </h3>
          <p className="text-xs sm:text-sm text-text/70 leading-relaxed max-w-xs">
            {t("footer.tagline", "Error.")}
          </p>

          {/* SOSYAL MEDYA İKONLARI */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href={activeConfig?.contact?.instagram || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-surface rounded-full text-text/80 hover:text-accent hover:bg-accent/10 transition-all border border-stone-700/30 shadow-md"
              aria-label="Instagram"
            >
              <IoLogoInstagram size={18} />
            </a>
            <a 
              href={activeConfig?.contact?.facebook || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-surface rounded-full text-text/80 hover:text-accent hover:bg-accent/10 transition-all border border-stone-700/30 shadow-md"
              aria-label="Facebook"
            >
              <IoLogoFacebook size={18} />
            </a>
            <a 
              href={activeConfig?.contact?.tripadvisor || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-surface rounded-full text-text/80 hover:text-accent hover:bg-accent/10 transition-all border border-stone-700/30 shadow-md"
              aria-label="TripAdvisor"
            >
              <FaTripadvisor size={18} />
            </a>
          </div>
        </div>

        {/* 2. KOLON: HIZLI LİNKLER (ÇALIŞIR HALE GETİRİLDİ) */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-heading border-b border-accent/30 pb-2 inline-block">
            {t("footer.quickLinksTitle", upper(t('footer.quickLinks', 'Quick Links')))}
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-accent transition-colors flex items-center gap-2 cursor-pointer uppercase tracking-wider text-[11px] sm:text-xs text-left"
                >
                  <span className="w-1.5 h-1.5 bg-accent/60 rounded-full shrink-0"></span>
                  {upper ? upper(t(link.key, link.id)) : t(link.key, link.id).toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. KOLON: ÇALIŞMA SAATLERİ */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-heading border-b border-accent/30 pb-2 inline-block">
            {t("footer.hoursTitle", upper(t('common.working_hours', 'ERROR')))}
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-text/80">
            <p className="font-medium text-heading">
              {t("contact.workingdays") || "Pazartesi - Pazar"}
            </p>
            <p className="text-accent font-semibold text-sm">
              {t("contact.workinghours") || "11:00 - 23:00"}
            </p>
          </div>
        </div>

        {/* 4. KOLON: İLETİŞİM İPUCU */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-heading border-b border-accent/30 pb-2 inline-block">
            {upper ? upper(t("common.contact_us", "Error")) : "CONTACT US"}
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5">
              <IoLocationOutline size={18} className="text-accent shrink-0 mt-0.5" />
              <span>{activeConfig?.contact?.address || "ERROR"}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IoCallOutline size={18} className="text-accent shrink-0" />
              <a href={`tel:${activeConfig?.contact?.phone || "+902421234567"}`} className="hover:text-accent transition-colors font-mono">
                {activeConfig?.contact?.phone || "ERROR"}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <IoMailOutline size={18} className="text-accent shrink-0" />
              <a href={`mailto:${activeConfig?.contact?.email || "info@example.com"}`} className="hover:text-accent transition-colors">
                {activeConfig?.contact?.email || "ERROR"}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* 👑 ALT ŞERİT (COPYRIGHT & BRANDING) */}
      <div className="border-t border-stone-800/80 bg-surface/50 py-6 px-6 text-center text-xs text-text/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            {t("footer.copyright", "ERROR.")}
          </p>
          {/*<p className="text-[11px] tracking-wider text-text/50">
            Designed & Developed with <span className="text-accent">♥</span> by <span className="font-semibold text-accent">Scoffi</span>
          </p>*/}
        </div>
      </div>

    </footer>
  );
};

export default Footer;