export const config = {
  activeTheme: "lightclassic",

  siteName: "AKDENİZ RESTORAN",

  contact: {
    phone: "+90 (242) 123 45 67",
    email: "info@akdenizrestoran.com",
    address: "Atatürk Cad. No:123, Muratpaşa / Antalya",

    instagram: "https://instagram.com/akdenizrestoran",
    whatsapp: "https://wa.me/902525154381",
    facebook: "https://facebook.com/akdenizrestoran",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g297962-d12345678-Akdeniz_Restaurant-Antalya_Turkish_Mediterranean_Coast.html",
  },

  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12747.781896791223!2d27.28476214458008!3d37.106461999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be739f99f36b05%3A0x6d5e1fbc811f59da!2zWWFsaWthdmFrLCBCb2RydW0vTXXEn2xh!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str",

  menu: {
    categories: [
      {
        id: "starters",
        items: [
          { id: "meze_platter", price: "420", image: "/images/hero.webp" },
          { id: "calamari_fritti", price: "380", image: "/images/hero.webp" },
          { id: "grilled_halloumi", price: "290", image: "/images/hero.webp" },
        ],
      },
      {
        id: "salads",
        subtitleKey: "salads_note",
        items: [
          { id: "mediterranean_breeze", price: "260", image: "/images/hero.webp" },
          { id: "burrata_caprese", price: "340", image: "/images/hero.webp" },
        ],
      },
      {
        id: "main_courses",
        items: [
          { id: "grilled_sea_bass", price: "680", image: "/images/hero.webp" },
          { id: "mediterranean_lamb_chop", price: "750", image: "/images/hero.webp" },
          { id: "seafood_linguine", price: "590", image: "/images/hero.webp" },
        ],
      },
      {
        id: "desserts",
        items: [
          { id: "citrus_panna_cotta", price: "210", image: "/images/hero.webp" },
          { id: "baklava_ice_cream", price: "240", image: "/images/hero.webp" },
        ],
      },
    ],
  }
};

export default config;

export const storyPolaroids = [
  {
    id: 1,
    image: "/images/polaroid-1.jpg",
    captionKey: "polaroid.1", // 👈 Hook yerine doğrudan key veriyoruz
    side: "left",
    topPosition: "8%",
    sidePosition: "5%",
    width: "300px",
    rotate: -12,
    delay: 0.1,
  },
  {
    id: 2,
    image: "/images/polaroid-2.jpg",
    captionKey: "polaroid.2",
    side: "left",
    topPosition: "38%",
    sidePosition: "8%",
    width: "240px",
    rotate: 8,
    delay: 0.3,
  },
  {
    id: 3,
    image: "/images/polaroid-3.jpg",
    captionKey: "polaroid.3",
    side: "left",
    topPosition: "68%",
    sidePosition: "4%",
    width: "270px",
    rotate: -6,
    delay: 0.5,
  },
  {
    id: 4,
    image: "/images/polaroid-4.jpg",
    captionKey: "polaroid.4",
    side: "right",
    topPosition: "12%",
    sidePosition: "3%",
    width: "300px",
    rotate: 14,
    delay: 0.2,
  },
  {
    id: 5,
    image: "/images/polaroid-5.jpg",
    captionKey: "polaroid.5",
    side: "right",
    topPosition: "42%",
    sidePosition: "6%",
    width: "240px",
    rotate: -10,
    delay: 0.4,
  },
  {
    id: 6,
    image: "/images/polaroid-2.jpg",
    captionKey: "polaroid.6",
    side: "right",
    topPosition: "70%",
    sidePosition: "8%",
    width: "265px",
    rotate: 8,
    delay: 0.3,
  },
];

export const comments = [
  {
    id: 1,
    name: "Selin Yılmaz",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    date: "14/07/2026",
    commentKey: "comments.1" // i18n key veya doğrudan metin kullanabilirsin
  },
  {
    id: 2,
    name: "Emre Kaya",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    date: "02/07/2026",
    commentKey: "comments.2"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    date: "28/06/2026",
    commentKey: "comments.3"
  },
  {
    id: 4,
    name: "Caner Demir",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 4,
    date: "18/06/2026",
    commentKey: "comments.4"
  },
  {
    id: 5,
    name: "Ayşe Yılmaz",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    date: "10/06/2026",
    commentKey: "comments.5"
  },
  {
    id: 6,
    name: "Mehmet Kaya",
    avatar: "https://i.pravatar.cc/150?img=7",
    rating: 5,
    date: "05/06/2026",
    commentKey: "comments.6"
  },
  {
    id: 7,
    name: "Elif Demir",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4,
    date: "29/05/2026",
    commentKey: "comments.7"
  },
  {
    id: 8,
    name: "Ahmet Şahin",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    date: "22/05/2026",
    commentKey: "comments.8"
  }
];