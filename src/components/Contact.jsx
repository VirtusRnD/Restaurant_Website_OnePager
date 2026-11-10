import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IoLocationOutline, IoTimeOutline, IoCallOutline, IoMailOutline, IoPaperPlaneOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../hooks/useConfig';
import { submitForm } from "../lib/submitForm";

// 👑 ANIMASYON VARYANTLARI
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Kartların 0.12s arayla sırayla gelmesini sağlar
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Contact = () => {
  const { t } = useTranslation();
  const { currentConfig: config, upper } = useConfig(); // the hook exports currentConfig, so config was undefined before

  // Scroll ve InView Referansı
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Form State'leri
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  // Form input değişim takibi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form gönderme işleyici
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      setStatus(await submitForm(formData, { email: config?.contact?.email, subject: t("contact.title") }));
    } catch {
      setStatus("error");
    }
  };

  // Google Maps Embed URL
  const mapAddress = encodeURIComponent(config?.contact?.address || "Antalya, Turkey");
  const googleMapsUrl = `https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div 
      ref={sectionRef}
      id="contact" 
      className="relative w-full py-20 lg:py-32 px-4 md:px-8 bg-surface transition-colors duration-500 overflow-hidden"
    >
      
      {/* 👑 BAŞLIK ALANI (Yukarıdan Aşağıya Süzülür) */}
      <motion.div 
        initial={{ opacity: 0, y: -25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold pl-[0.15em] tracking-[0.15em] text-accent uppercase mb-3">
          {upper(t("contact.title", "ERROR"))}
        </h2>
        <div className="flex items-center justify-center gap-3 opacity-70 mb-4">
          <div className="h-px w-10 md:w-16 bg-muted"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-muted"></div>
          <div className="h-px w-10 md:w-16 bg-muted"></div>
        </div>
        <p className="font-sans text-text/80 text-sm md:text-base max-w-xl mx-auto">
          {t("contact.tagline", "error.")}
        </p>
      </motion.div>

      {/* 👑 ANA İÇERİK (SOL: BİLGİLER + FORM, SAĞ: HARİTA) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* 👈 SOL KOLON (İletişim Kartları + Form) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          
          {/* İletişim Bilgileri Kartları (Sıralı Animasyon) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            
            {/* ADRES */}
            <motion.div 
              variants={itemVariants}
              className="bg-primary/40 border border-stone-700/30 rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:border-accent/50 transition-colors"
            >
              <div className="p-3 bg-accent/10 rounded-full text-accent mb-3">
                <IoLocationOutline size={24} />
              </div>
              <h3 className="font-sans-serif font-semibold text-heading text-sm uppercase tracking-wider mb-1">
                {/*t("contact.addressTitle", "Adres")*/}
              </h3>
              <p className="text-text/80 text-md leading-relaxed">
                {config?.contact?.address || "Atatürk Cad. No:123, Muratpaşa / Antalya"}
              </p>
            </motion.div>

            {/* ÇALIŞMA SAATLERİ */}
            <motion.div 
              variants={itemVariants}
              className="bg-primary/40 border border-stone-700/30 rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:border-accent/50 transition-colors"
            >
              <div className="p-3 bg-accent/10 rounded-full text-accent mb-3">
                <IoTimeOutline size={24} />
              </div>
              <h3 className="font-sans-serif font-semibold text-heading text-sm uppercase tracking-wider mb-1">
                {/*t("contact.hoursTitle", "Açık Olduğumuz Saatler")*/}
              </h3>
              <p className="text-text/80 text-md leading-relaxed">
                {t("contact.workingdays") || "ERROR"}<br />
                <span className="font-semibold text-accent">{config?.contact?.workingHours?.hours || "11:00 - 23:00"}</span>
              </p>
            </motion.div>

            {/* TELEFON */}
            <motion.div 
              variants={itemVariants}
              className="bg-primary/40 border border-stone-700/30 rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:border-accent/50 transition-colors"
            >
              <div className="p-3 bg-accent/10 rounded-full text-accent mb-3">
                <IoCallOutline size={24} />
              </div>
              <h3 className="font-sans-serif font-semibold text-heading text-sm uppercase tracking-wider mb-1">
                {/*t("contact.phoneTitle", "Telefon")*/}
              </h3>
              <a 
                href={`tel:${config?.contact?.phone || "+902421234567"}`} 
                className="text-text/80 text-md hover:text-accent transition-colors font-mono"
              >
                {config?.contact?.phone || "+90 (242) 123 45 67"}
              </a>
            </motion.div>

          </motion.div>

          {/* 📝 İLETİŞİM FORMU (Aşağıdan Yukarıya Yükselerek Gelir) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="bg-primary/50 border border-stone-700/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            <h3 className="font-sans-serif text-xl md:text-2xl font-bold tracking-wide text-heading mb-6 flex items-center gap-2">
              <IoMailOutline className="text-accent" />
              {upper(t("common.contact_us"))}
            </h3>

            {status === "sent" || status === "mailto" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center font-medium text-sm my-8"
              >
                🎉 {t(status === "sent" ? "contact.successMessage" : "contact.mailtoMessage")}
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* AD SOYAD */}
                  <div>
                    <label className="block text-xs font-medium text-text/70 uppercase tracking-wider mb-1.5">
                      {t("common.name_surname", "Adınız Soyadınız")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ahmet Yılmaz"
                      className="w-full bg-surface/80 border border-stone-700/50 rounded-lg px-4 py-3 text-text placeholder-text/30 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* E-POSTA */}
                  <div>
                    <label className="block text-xs font-medium text-text/70 uppercase tracking-wider mb-1.5">
                      {t("common.email", "E-POSTA ADRESİNİZ")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmet@example.com"
                      className="w-full bg-surface/80 border border-stone-700/50 rounded-lg px-4 py-3 text-text placeholder-text/30 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* TELEFON */}
                <div>
                  <label className="block text-xs font-medium text-text/70 uppercase tracking-wider mb-1.5">
                    {t("common.phone_number", "Telefon Numaranız")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0555 123 45 67"
                    className="w-full bg-surface/80 border border-stone-700/50 rounded-lg px-4 py-3 text-text placeholder-text/30 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* MESAJ */}
                <div>
                  <label className="block text-xs font-medium text-text/70 uppercase tracking-wider mb-1.5">
                    {t("common.message", "Mesajınız")} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("common.your_message", "Mesajınız...") + "..."}
                    className="w-full bg-surface/80 border border-stone-700/50 rounded-lg px-4 py-3 text-text placeholder-text/30 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  ></textarea>
                </div>

                {/* GÖNDER BUTONU */}
                {status === "error" && (
                  <p role="alert" className="text-red-500 text-sm font-medium">{t("contact.errorMessage")}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm mt-2"
                >
                  <IoPaperPlaneOutline size={18} />
                  {t("common.send", "Mesaj Gönder")}
                </button>
              </form>
            )}
          </motion.div>

        </div>

        {/* 👉 SAĞ KOLON (Google Harita Konumu - Sağdan Akıcı Geliş) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-5 h-[350px] lg:h-auto min-h-[350px] bg-primary/40 border border-stone-700/30 rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <iframe
            title="Google Maps"
            src={googleMapsUrl}
            className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;