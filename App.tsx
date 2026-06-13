import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  MessageCircle, 
  Phone, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Menu,
  X,
  CheckCircle2,
  Battery,
  Info,
  Star,
  Clock,
  Search,
  Check,
  ShieldAlert,
  HelpCircle,
  Cpu,
  TrendingUp,
  Award,
  Wrench,
  Bolt,
  Shield,
  Activity,
  CreditCard,
  Wallet,
  Landmark,
  Receipt,
  Printer,
  QrCode,
  Share2,
  Apple,
  FileText,
  Sparkles
} from 'lucide-react';

// --- Imports for custom high-end features ---
import { KineticBackground } from './components/KineticBackground';
import { PowerVaultWizard } from './components/PowerVaultWizard';
import { HyperDispatchButton } from './components/HyperDispatchButton';
import { BatteryJumpStart } from './components/BatteryJumpStart';
import { JeddahRadarSweep } from './components/JeddahRadarSweep';
import { KineticVehicleScanner } from './components/KineticVehicleScanner';
import { JeddahWeatherCalculator } from './components/JeddahWeatherCalculator';
import { CarbonFusionPortal } from './components/CarbonFusionPortal';
import { KineticBatteryScroll } from './components/KineticBatteryScroll';
import { V8AcousticEcho } from './components/V8AcousticEcho';
import { ExpressDesignPage } from './components/ExpressDesignPage';
import { InteractiveMapEngine } from './components/InteractiveMapEngine';
import { JoinPartnersPage } from './components/JoinPartnersPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ContactPage } from './components/ContactPage';
import { StatsGrid } from './components/StatsGrid';
import { SeoPage } from './components/SeoPage';
import { WarrantyPage } from './components/WarrantyPage';
import { HeavyEquipmentPromo } from './components/HeavyEquipmentPromo';
import { CorporateFleetPromo } from './components/CorporateFleetPromo';
import { SecureCheckout } from './components/SecureCheckout';
import { AdminDashboard } from './components/AdminDashboard';
import { AcdelcoCatalog } from './components/AcdelcoCatalog';
import { generateLiveDispatchMessage } from './utils/dispatchGenerator';
import { generate200Batteries, Product } from './utils/productDatabase';
import { CallButton, WhatsAppButton, ContactButtonsContainer } from './components/ContactButtons';
// @ts-ignore
import heroBg from './assets/images/bx_hero_premium.webp';

// --- Local Transparent Brand Logos resolved with Vite URL resolver ---
const expressVan = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80";
const agmEfbBatteries = "https://i.postimg.cc/5tpGmYZw/file-000000004314722f8b5ab26d7ab203a2.png";
// --- Global Constants & Config ---
import { WHATSAPP_NUMBER, PHONE_NUMBER, BRAND_DATA, TESTIMONIALS } from './constants';

// --- Multilingual Translations ---
export const TRANSLATIONS = {
  ar: {
    brandName: "بطارية إكسبرس",
    brandSubtitle: "BATTERY EXPRESS • جـدة ومكة",
    navHome: "الرئيسية",
    navInteractive: "الصفحة التفاعلية",
    navPrices: "الكتالوج والأسعار",
    navServices: "خدماتنا المتميزة",
    navAbout: "مَن نحن",
    navContact: "اتصل بنا",
    navJoin: "التحاق الكوادر ومراكز الخدمة 🤝",
    navQuote: "طلب تسعير هاتفى",
    navRescue: "إنقاذ فوري بمكة وجدة",
    
    heroBadge: "محل بطاريات متنقل بجدة ومكة المكرمة ⚡",
    heroTitle: "بطارية إكسبرس",
    heroSubTitle: "معك، أينما توقفت بك الحياة.",
    heroCardTitle: "تبديل بطاريات سيارات في جدة ومكة المكرمة ⚡",
    heroDesc: "نعلم أن لحظات تعطل السيارة قد تكون مصدر قلق لك ولعائلتك. لذا، نحن لا نكتفي بتبديل البطارية؛ نحن نأتي إليك لنعيد إليك الأمان، ونهديك طمأنينة الطريق. خبراؤنا معك، ليبقى نبض سيارتك مستمراً، وتبقى رحلتك آمنة.",
    heroPoint1: "🚗 محل بطاريات متنقل ٢٤ ساعة",
    heroPoint2: "🛠️ تبديل بطاريات سيارات في جدة ومكة",
    heroPoint3: "📍 أقرب فني ومحل بطاريات قريب منك",
    heroCtaJoin: "التحاق الكوادر ومراكز الخدمة المتنقلة 🛠️",
    heroCta1: "طلب تركيب فوري الآن (اتصال فوري)",
    heroCta2: "واتساب مباشر (استشارة سريعة)",
    
    advisorTitle1: "تعرّف على ",
    advisorTitle2: "البطارية المناسبة لسـيارتك ⚡️",
    advisorDesc1: "نساعدك في اختيار ",
    advisorBatterySize: "مقاس بطارية السيارة",
    advisorDesc2: " المناسب بدقة في ",
    advisorBrand: "بطارية إكسبرس",
    advisorDesc3: " بناءً على نوع سيارتك وموديلها، مع خدمة ",
    advisorDelivery: "توصيل وتركيب بطاريات",
    advisorDesc4: " سريعة حتى موقعك في جدة ومكة. أدخل بيانات مركبتك الآن.",
    
    redAlertTitle: "DASHBOARD CRITICAL POWER SIGNAL",
    redAlertDesc: "تحذير: نظام سيارتك يرسل إشارة \"فشل طاقة\". تجاهل هذه الإشارة يعني توقفاً كاملاً للسيارة في غضون دقائق.",
  },
  en: {
    brandName: "Battery Express",
    brandSubtitle: "BATTERY EXPRESS • JEDDAH & MAKKAH",
    navHome: "Home",
    navInteractive: "Interactive Design",
    navPrices: "Catalog & Prices",
    navServices: "Our Services",
    navAbout: "About Us",
    navContact: "Contact Us",
    navJoin: "Join Partners 🤝",
    navQuote: "Get Phone Quote",
    navRescue: "Instant Rescue",
    
    heroBadge: "Fast Roadside Battery Rescue in Jeddah & Makkah",
    heroTitle: "Battery Express",
    heroSubTitle: "With you, wherever life takes you.",
    heroCardTitle: "Rapid Response ⚡",
    heroDesc: "We know that car breakdown moments can be a source of anxiety for you and your family. Therefore, we don't just change the battery; we come to you to restore your safety and give you peace of mind on the road. Our experts are with you, keeping your car's heartbeat steady and your journey safe.",
    heroPoint1: "⚡ 20-Min Fast Deployment",
    heroPoint2: "🛠️ On-Site Diagnostics & Free Installation",
    heroPoint3: "🔒 Certified Warranty up to 2 Years",
    heroCtaJoin: "Join of Professional Teams & Mobile Support 🛠️",
    heroCta1: "Request Roadside Rescue (Call Now)",
    heroCta2: "Instant WhatsApp Chat (Free Advice)",
    
    advisorTitle1: "Discover the Perfect ",
    advisorTitle2: "Battery for Your Car ⚡️",
    advisorDesc1: "We precisely help you select the exact ",
    advisorBatterySize: "car battery size",
    advisorDesc2: " compatible with your specific make and model at ",
    advisorBrand: "Battery Express",
    advisorDesc3: ", backed by professional ",
    advisorDelivery: "mobile roadside installation and delivery",
    advisorDesc4: " anywhere across Jeddah & Makkah. Select your vehicle details now.",
    
    redAlertTitle: "DASHBOARD CRITICAL POWER SIGNAL",
    redAlertDesc: "CRITICAL: Your engine battery failed active health analysis. Continuing without service will cause total system breakdown in min.",
  }
};

export interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: (k) => k,
});

export const useLanguage = () => React.useContext(LanguageContext);

export interface CheckoutContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const CheckoutContext = React.createContext<CheckoutContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const useCheckout = () => React.useContext(CheckoutContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'ar' | 'en'>(() => {
    const saved = localStorage.getItem('battery_express_lang');
    if (saved === 'en' || saved === 'ar') return saved;
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'en' || langParam === 'ar') return langParam;
    return 'ar';
  });

  const setLanguage = (lang: 'ar' | 'en') => {
    setLanguageState(lang);
  };

  useEffect(() => {
    localStorage.setItem('battery_express_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (language === 'en') {
      document.title = "Battery Express | 24/7 Mobile Car Battery Delivery & Fast Roadside Rescue in Jeddah & Makkah ⚡";
      if (metaDesc) {
        metaDesc.setAttribute('content', "Battery Express in Jeddah & Makkah - 24/7 Mobile Car Battery Replacement & Diagnostics. Looking for a car battery shop near me or mobile battery shop? We provide professional battery delivery & installation in Jeddah & Makkah. Call 0560407321");
      }
    } else {
      document.title = "بطارية إكسبرس | خدمة بطاريات وإنقاذ طرق سريع بجدة ومكة المكرمة ⚡";
      if (metaDesc) {
        metaDesc.setAttribute('content', "أسرع خدمة تغيير بطاريات سيارات في جدة. خدمة 24/7، تركيب ميداني، توريد للشركات والأفراد. اتصل بـ Battery Express الآن!");
      }
    }
  }, [language]);

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['ar'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * CINEMATIC AUTOMOTIVE PORTAL - BATTERY EXPRESS (بطارية إكسبرس)
 * Based in Jeddah, Kingdom of Saudi Arabia
 * Deep Obsidian & Electric Yellow color scheme
 */

// Custom Pulse Engine Button representing active 12V continuous flow
const PulseEngineButton: React.FC<{ 
  onClick?: () => void; 
  className?: string; 
  text?: string; 
}> = ({ onClick, className = '', text = 'طلب تركيب فوري الآن' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative py-4 px-8 overflow-hidden rounded-xl bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-300 text-black font-black text-base transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(250,204,21,0.25)] flex items-center justify-center gap-3 ${className}`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 0 35px rgba(250, 204, 21, 0.65)"
      }}
      whileTap={{ scale: 0.97 }}
      // Heartbeat pulse animation to periodically intensify the electric glow
      animate={{
        boxShadow: [
          "0 0 15px rgba(250, 204, 21, 0.3)",
          "0 0 35px rgba(250, 204, 21, 0.65)",
          "0 0 15px rgba(250, 204, 21, 0.3)"
        ],
        scale: [1, 1.015, 1]
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* 12V flowing charging gradient */}
      <span className="absolute inset-0 charging-flow opacity-80 mix-blend-overlay pointer-events-none" />
      
      <Zap className="w-5 h-5 text-black fill-current animate-bounce" />
      <span className="relative z-10 arabic-text">{text}</span>
    </motion.button>
  );
};

// 1. --- Navigation (Header Component) ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-[#FACC15]/20 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.9)]' 
            : 'bg-gradient-to-b from-black via-black/50 to-transparent py-5'
        }`}
        dir={language === 'en' ? 'ltr' : 'rtl'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding Logo & Signature */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-x-0 inset-y-0 bg-[#FACC15]/30 rounded-full blur-xl group-hover:bg-[#FACC15]/50 transition-all duration-300" />
                  <img 
                    src="https://i.ibb.co/mrKvGFK7/file-000000002f10720a92f3066faf9dc487.png" 
                    alt="Battery Express Logo" 
                    className="h-14 w-auto object-contain relative z-10 brightness-110 contrast-110 transition-transform duration-300 group-hover:scale-105" 
                    width="56"
                    height="56"
                    decoding="async"
                    onError={(e) => {
                      // Fallback if image not found to guarantee bulletproof load
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="%23FACC15"><path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>';
                    }}
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className={`flex flex-col ${language === 'en' ? 'text-left' : 'text-right'}`}>
                  <span className="text-xl font-black text-[#FACC15] tracking-tight italic leading-none arabic-text">{t('brandName')}</span>
                  <span className="text-[9px] text-zinc-400 font-bold tracking-[0.1em] mt-1.5 uppercase">{t('brandSubtitle')}</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Link Tabs */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link 
                to="/" 
                className={`arabic-text font-black text-sm tracking-wide transition-colors ${
                  location.pathname === '/' ? 'text-[#FACC15] border-b-2 border-[#FACC15] pb-1' : 'text-zinc-300 hover:text-[#FACC15]'
                }`}
              >
                {language === 'en' ? 'Home' : 'الرئيسية'}
              </Link>
              <Link 
                to="/prices" 
                className={`arabic-text font-black text-sm tracking-wide transition-colors ${
                  location.pathname === '/prices' ? 'text-[#FACC15] border-b-2 border-[#FACC15] pb-1' : 'text-zinc-300 hover:text-[#FACC15]'
                }`}
              >
                {language === 'en' ? 'Catalog & Prices' : 'الكتالوج والأسعار'}
              </Link>
              <Link 
                to="/express" 
                className={`arabic-text font-black text-sm tracking-wide transition-colors ${
                  location.pathname === '/express' ? 'text-[#FACC15] border-b-2 border-[#FACC15] pb-1' : 'text-zinc-300 hover:text-[#FACC15]'
                }`}
              >
                {language === 'en' ? 'Interactive Map' : 'الخريطة التفاعلية'}
              </Link>
              <Link 
                to="/contact" 
                className={`arabic-text font-black text-sm tracking-wide transition-colors ${
                  location.pathname === '/contact' ? 'text-[#FACC15] border-b-2 border-[#FACC15] pb-1' : 'text-zinc-300 hover:text-[#FACC15]'
                }`}
              >
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
              </Link>
            </div>

            {/* Neon Extreme Call CTA / Mobile Drawer Toggle / Language Switcher */}
            <div className="flex items-center gap-3">
              {/* Premium Dropdown Language Switcher (Desktop) */}
              <div className="relative mr-2 ml-2" ref={dropdownRef}>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-black hover:bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer text-xs font-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-none select-none select-none max-h-9"
                  title={language === 'en' ? "Change Language" : "تغيير لغة الموقع"}
                >
                  <span id="current-lang" className="flex items-center gap-1.5">
                    {language === 'ar' ? (
                      <>
                        <span>🇸🇦</span>
                        <span>العربية</span>
                      </>
                    ) : (
                      <>
                        <span>🇺🇸</span>
                        <span>English</span>
                      </>
                    )}
                  </span>
                  <span className={`text-[8px] text-zinc-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full mt-2 left-0 right-0 min-w-[130px] bg-white border border-[#333]/10 rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-[9999] p-1 flex flex-col gap-0.5"
                    >
                      <button
                        onClick={() => {
                          setLanguage('ar');
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2.5 rounded-md text-xs font-black transition-all cursor-pointer flex items-center justify-between ${language === 'ar' ? 'bg-[#1a1a1a] text-white' : 'text-zinc-800 hover:bg-zinc-100'}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>🇸🇦</span>
                          <span>العربية</span>
                        </span>
                        {language === 'ar' && <span className="text-[10px] text-[#FACC15]">✓</span>}
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2.5 rounded-md text-xs font-black transition-all cursor-pointer flex items-center justify-between ${language === 'en' ? 'bg-[#1a1a1a] text-white' : 'text-zinc-800 hover:bg-zinc-100'}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>🇺🇸</span>
                          <span>English</span>
                        </span>
                        {language === 'en' && <span className="text-[10px] text-[#FACC15]">✓</span>}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5 md:hidden"
                aria-label="Toggle Navigation Drawer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile drawer layout and transitions */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 z-40 bg-black/95 border-b border-[#FACC15]/20 backdrop-blur-2xl p-6 md:hidden text-right shadow-2xl"
            dir={language === 'en' ? 'ltr' : 'rtl'}
          >
            <div className="flex flex-col gap-4">
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-white/5 rounded-2xl mb-1">
                <span className="text-xs font-black text-zinc-400">لغة الموقع / Language</span>
                <div className="flex items-center gap-1 bg-black border border-white/15 rounded-xl p-1 select-none text-[11px] font-black">
                  <button 
                    onClick={() => setLanguage('ar')} 
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${language === 'ar' ? 'bg-[#FACC15] text-black font-black' : 'text-zinc-500'}`}
                  >
                    <span>🇸🇦 العربية</span>
                  </button>
                  <button 
                    onClick={() => setLanguage('en')} 
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${language === 'en' ? 'bg-[#FACC15] text-black font-black' : 'text-zinc-500'}`}
                  >
                    <span>🇺🇸 English</span>
                  </button>
                </div>
              </div>

              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`arabic-text font-black py-2 border-b border-white/5 text-sm ${
                  location.pathname === '/' ? 'text-[#FACC15]' : 'text-zinc-300'
                }`}
              >
                {language === 'en' ? 'Home' : 'الرئيسية'}
              </Link>
              <Link 
                to="/prices" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`arabic-text font-black py-2 border-b border-white/5 text-sm ${
                  location.pathname === '/prices' ? 'text-[#FACC15]' : 'text-zinc-300'
                }`}
              >
                {language === 'en' ? 'Catalog & Prices' : 'الكتالوج والأسعار'}
              </Link>
              <Link 
                to="/express" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`arabic-text font-black py-2 border-b border-white/5 text-sm ${
                  location.pathname === '/express' ? 'text-[#FACC15]' : 'text-zinc-300'
                }`}
              >
                {language === 'en' ? 'Interactive Map' : 'الخريطة التفاعلية'}
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`arabic-text font-black py-2 border-b border-white/5 text-sm ${
                  location.pathname === '/contact' ? 'text-[#FACC15]' : 'text-zinc-300'
                }`}
              >
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
              </Link>
              
              <div className="grid grid-cols-2 gap-3 pt-3">
                <CallButton 
                  size="sm" 
                  text={language === 'en' ? 'Emergency' : 'اتصال طوارئ'} 
                  className="w-full text-center" 
                />
                <WhatsAppButton 
                  size="sm" 
                  text={language === 'en' ? 'WhatsApp' : 'واتساب'} 
                  whatsappMessage="أحتاج تغيير بطارية سيارة عاجل بجدة ومكة المكرمة." 
                  className="w-full text-center" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 2. --- Hero Section (Digital Grid & Call-to-actions) ---
const Hero = () => {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] pt-36 pb-24 overflow-hidden bg-transparent text-center flex items-center justify-center" dir={language === 'en' ? 'ltr' : 'rtl'}>
      
      {/* Static High-Tech Emergency Command Center background image (Zero-lag, High Performance LCP) */}
      <div className="absolute inset-0 -z-[10] select-none pointer-events-none overflow-hidden">
        <img 
          src={heroBg} 
          alt="خدمة بطارية إكسبرس - تركيب بطاريات AGM و EFB متنقلة في جدة"  
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic light black overlay for text contrast */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" />
      </div>

      {/* Background neon elements */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-brand-yellow/15 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-blue-500/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Futuristic Carbon background overlay + Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-10 carbon-texture pointer-events-none" />
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full select-none">
        
        {/* Header Badge: "خدمة الإنقاذ السريع بجدة" inside a beautiful gold border with Zap icon */}
        <div 
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-yellow-500/40 bg-black/90 shadow-[0_0_25px_rgba(250,204,21,0.25)] text-[#FACC15] text-xs sm:text-sm font-black uppercase tracking-wider mb-10 arabic-text mx-auto cursor-pointer"
        >
          <Zap className="w-4.5 h-4.5 text-yellow-500 fill-current shrink-0" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Main Title: "بطارية إكسبرس" crafted in beautiful, blocky Changa Bold font, with custom close letter-spacing and electric yellow energy outer glow */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none mb-3">
          <span className="changa-electric-title block">{t('heroTitle')}</span>
        </h1>

        {/* Sub-title: "معك، أينما توقفت بك الحياة." representing second level heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#FACC15] select-none tracking-wide mb-6">
          {t('heroSubTitle')}
        </h2>

        {/* Removed Animated Cartoon vehicle to maximize PageSpeed insights score and ensure zero delay */}

        <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed arabic-text max-w-2xl mx-auto mb-8 px-4 text-center">
          {t('heroDesc')}
        </p>

        {/* Super Short Bullet Points Grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6 text-xs sm:text-sm font-black text-[#FACC15] arabic-text select-none">
          <span className="flex items-center gap-1.5">{t('heroPoint1')}</span>
          <span className="flex items-center gap-1.5">• {t('heroPoint2')}</span>
          <span className="flex items-center gap-1.5">• {t('heroPoint3')}</span>
        </div>

        {/* Elegant Wrench + Bolt Interactive Yellow Banner (Compact) */}
        <div className="mb-8 flex justify-center">
          <Link 
            to="/join"
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FACC15]/10 hover:bg-[#FACC15]/20 border border-[#FACC15]/30 hover:border-[#FACC15]/50 transition-all duration-300 text-[#FACC15] text-xs font-black arabic-text shadow-[0_0_10px_rgba(250,204,21,0.05)] cursor-pointer"
          >
            <div className="flex items-center -space-x-0.5 relative w-4.5 h-4.5 shrink-0">
              <Wrench className="w-3.5 h-3.5 text-[#FACC15] absolute top-1/2 left-0 -translate-y-1/2" />
              <Bolt className="w-3.5 h-3.5 text-[#FACC15] absolute top-1/2 right-0 -translate-y-1/2" />
            </div>
            <span>{t('heroCtaJoin')}</span>
          </Link>
        </div>

        {/* Action Buttons directly below the description/title stack */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto px-4">
          <CallButton 
            size="lg" 
            text={t('heroCta1')} 
            className="w-full sm:w-auto" 
          />
          <WhatsAppButton 
            size="lg" 
            text={t('heroCta2')} 
            whatsappMessage="مرحباً بطارية إكسبرس. قمت بمعاينة خريطة الاستجابة التفاعلية المباشرة لأحياء جدة، وأود الاستفادة من فحص الدينامو والطاقة وطلب فني مع بطارية مجهزة سيارتي الآن." 
            className="w-full sm:w-auto" 
          />
        </div>

        {/* Cinematic Live trust stats dashboard positioned cleanly under CTA buttons */}
        <div className="mt-12 sm:mt-16 w-full">
          <StatsGrid />
        </div>
      </div>
    </section>
  );
};

// 3. --- Brand Marquee (Scrolling Banner with Infinite Horizontal Loop) ---
const InteractiveBrandMarquee = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const baseBrands = [
    {
      url: "https://i.ibb.co/4w5T0fWm/image.webp",
      alt: isEn ? "Car battery delivery in Jeddah - immediate 24h service" : "توصيل بطاريات سيارات في جدة - خدمة فورية 24 ساعة"
    },
    {
      url: "https://i.ibb.co/7tjs0194/image.webp",
      alt: isEn ? "Delivery and installation of car batteries in Jeddah at home service" : "خدمة توصيل وتركيب بطاريات سيارات بجدة عند البيت"
    },
    {
      url: "https://i.ibb.co/ksKh5Jj0/image.webp",
      alt: isEn ? "Fast AGM & EFB service in Jeddah - Battery Express" : "خدمة AGM و EFB السريعة بجدة - بطارية إكسبرس"
    },
    {
      url: "https://i.ibb.co/1tJGSZV7/image.webp",
      alt: isEn ? "Mobile tire puncture and car battery change in Jeddah" : "بنشر متنقل وتغيير بطاريات سيارات في جدة"
    }
  ];

  // Double the set to implement a 100% flawless, pixel-seamless infinite loop with -50% translation
  const scrollBrands = [...baseBrands, ...baseBrands];

  return (
    <div className="w-full relative z-10 my-14" id="brand-marquee-section">
      {/* Promotional heading above logo slider with premium yellow & white tone and high contrast */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-8">
        <h2 className="text-xl sm:text-3xl font-black text-white leading-tight arabic-text tracking-tight h2-seo">
          {isEn ? (
            <>
              Trusted <span className="text-[#FACC15]">Brands</span> for Reliable Performance Under All Conditions
            </>
          ) : (
            <>
              علامات تجارية <span className="text-[#FACC15]">موثوقة</span> لأداء يعتمد عليه في جميع الظروف
            </>
          )}
        </h2>
      </div>

      <div className="brand-row-container w-full overflow-hidden relative group select-none bg-black/45 py-8" id="brand-marquee-container">
      
      {/* Side dynamic visual gradients for premium cinematic overlay depth */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />
 
      <div className="flex w-full overflow-hidden" dir="ltr" id="brand-marquee-track">
        <div 
          className="animate-marquee-css flex items-center shrink-0 gap-[75px] md:gap-[110px] py-4 whitespace-nowrap min-w-max"
          style={{ animationTimingFunction: 'linear' }}
        >
          {scrollBrands.map((brand, index) => (
            <img 
              key={`marquee-logo-${index}`}
              src={brand.url} 
              alt={brand.alt} 
              className="brand-marquee-logo h-[80px] sm:h-[110px] w-auto max-w-none object-contain px-8 transition-all duration-300"
              loading="lazy"
              decoding="async"
              width="180"
              height="110"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};



// 5. --- Cinematic Spec Highlights (AGM / Modern High-Power Tech) ---
const TechnologyPromo = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="py-12 bg-[#050505] text-right relative overflow-hidden" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Visual neon backlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#FACC15]/10 rounded-full filter blur-[150px] pointer-events-none" />

      {/* 1. Improved Large, Professional Header */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-6 relative z-10">
        <span className="text-xs font-black text-[#FACC15] tracking-[0.2em] block mb-2 uppercase arabic-text">
          {isEn ? "Extreme Power & Resistance Engineering in Jeddah & Makkah" : "هندسة الطاقة والمقاومة الفائقة بجدة ومكة المكرمة"}
        </span>
        <h2 className="text-xl sm:text-3xl font-black text-white leading-tight arabic-text tracking-tight">
          {isEn ? (
            <>
              Advanced <span className="text-[#FACC15]">AGM & EFB</span> Batteries for Hybrid & Start-Stop Cars in Jeddah & Makkah ⚡
            </>
          ) : (
            <>
              بطاريات <span className="text-[#FACC15]">AGM & EFB</span> المتطورة لسيارات الهايبيرد والـ Start-Stop بجدة ومكة المكرمة ⚡
            </>
          )}
        </h2>
      </div>

      {/* 2. Completely Borderless Full-Width Panoramic High-Performance Static image (Edge-to-Edge) */}
      <div className="w-full select-none overflow-hidden relative z-10 my-6 bg-black/40 border-y border-white/5">
        <img 
          src="https://i.ibb.co/VY6L2JYD/BX-image2.webp" 
          alt="بطاريات سيارات AGM و EFB من بطارية إكسبرس - خدمة توصيل وتركيب في جدة" 
          className="w-full h-auto min-h-[180px] md:min-h-[380px] aspect-[21/9] object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="1200" height="450" fill="%23222"><rect width="1200" height="450"/><text x="600" y="225" fill="%23FACC15" font-size="36" font-weight="bold" font-family="sans-serif" text-anchor="middle">AGM ADVANCED TECHNOLOGY</text></svg>';
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3. High-Contrast Description Under the Banner */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-8 relative z-10">
        <p className={`text-zinc-200 text-xs sm:text-sm md:text-base font-black leading-relaxed arabic-text ${isEn ? 'text-left' : 'text-right'}`}>
          {isEn ? (
            "Luxury and modern cars (such as Mercedes, Porsche, Lexus, and BMW) with automated start-stop technology operating in Jeddah & Makkah require negative-matrix AGM (Absorbent Glass Mat) batteries to prevent premature damage, providing 3x cyclic durability compared to standard lead-acid batteries."
          ) : (
            "تحتاج السيارات الفارهة والحديثة بجدة ومكة المكرمة (مثل مرسيدس، بورشه، لكزس، وبي إم دبليو) ذات التقنية التلقائية للتوقف المؤقت لبطارية ذات بنية ألياف زجاجية ماصة للأسيد (AGM) تمنع التلف السريع وتوفر قدرة تفريغ تزامني تعادل ثلاثة أضعاف البطارية التقليدية."
          )}
        </p>
      </div>

      {/* 4. Elegant Features Grid and CTA Buttons (Inside Standard Safe Bounds Container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-2xl p-6 md:p-10 overflow-hidden relative shadow-[0_0_30px_rgba(250,204,21,0.1)] bg-zinc-950/40 border border-white/5">
          
          {/* Carbon Fiber styling details */}
          <div className="absolute inset-0 carbon-texture opacity-5 pointer-events-none" />

          {/* Feature Cards Grid - Compact Row Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            
            {/* Card 1: 3x Life */}
            <div className="transition-all duration-300 group flex items-start gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#FACC15]/35">
              <div className="w-6 h-6 shrink-0 bg-[#FACC15]/10 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-[#FACC15]" />
              </div>
              <div className={isEn ? 'text-left' : 'text-right'}>
                <h3 className="text-[#FACC15] text-xs sm:text-sm font-black mb-1 arabic-text">
                  {isEn ? "High Operation Life" : "كفاءة تشغيلية فائقة"}
                </h3>
                <p className="text-zinc-400 text-[11px] leading-snug arabic-text">
                  {isEn ? "Extended active service life and up to twice the dynamic self-charging speed." : "دورة حياة تشغيلية ممتدة وسرعة شحن تلقائي مضاعفة."}
                </p>
              </div>
            </div>

            {/* Card 2: Vibration Protection */}
            <div className="transition-all duration-300 group flex items-start gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#FACC15]/35">
              <div className="w-6 h-6 shrink-0 bg-[#FACC15]/10 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                <Activity className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
              </div>
              <div className={isEn ? 'text-left' : 'text-right'}>
                <h3 className="text-[#FACC15] text-xs sm:text-sm font-black mb-1 arabic-text">
                  {isEn ? "100% Spill-Proof Seal" : "إحكام كلي مطلق"}
                </h3>
                <p className="text-zinc-400 text-[11px] leading-snug arabic-text">
                  {isEn ? "Complete leak protection and heavy vibration resistance on rough roads." : "إحكام كلي مانع للتسريب ومقاوم للاهتزازات الناتجة عن تعرجات الشوارع."}
                </p>
              </div>
            </div>

            {/* Card 3: Electrical Stability */}
            <div className="transition-all duration-300 group flex items-start gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#FACC15]/35">
              <div className="w-6 h-6 shrink-0 bg-[#FACC15]/10 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-[#FACC15]" />
              </div>
              <div className={isEn ? 'text-left' : 'text-right'}>
                <h3 className="text-[#FACC15] text-xs sm:text-sm font-black mb-1 arabic-text">
                  {isEn ? "Electrical Wave Protection" : "ثبات كهربائي وحماية للأنظمة"}
                </h3>
                <p className="text-zinc-400 text-[11px] leading-snug arabic-text">
                  {isEn ? "Maintains strong voltage stability to protect key computer units and sensors." : "ثبات كهربائي قوي يحمي الأنظمة الحساسة والحساسات الرقمية للمركبة."}
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-white/5">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(isEn ? "I want a technical consultation regarding the capacity & types of AGM batteries for my modern car in Jeddah & Makkah." : "أريد استشارة فنية بخصوص سعة وأنواع بطارية AGM لسيارتي الحديثة بجدة ومكة المكرمة.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FACC15] text-black font-black text-xs rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_4px_10px_rgba(250,204,21,0.2)] arabic-text cursor-pointer"
            >
              <span>{isEn ? "Consult Expert on WhatsApp" : "استشير خبير بالواتساب"}</span>
            </a>

            <div className={`bg-white/[0.02] border border-white/5 px-4 py-2 rounded-lg flex items-center gap-4 ${isEn ? 'flex-row-reverse' : ''}`}>
              <div>
                <span className="text-[9px] text-zinc-500 block uppercase tracking-wide arabic-text">
                  {isEn ? "Heat Tolerance" : "تحمل الحرارة"}
                </span>
                <span className="text-xs font-black text-[#FACC15] leading-none">
                  {isEn ? "+75°C Max" : "+٧٥° مئوية"}
                </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-[9px] text-zinc-500 block uppercase tracking-wide arabic-text">
                  {isEn ? "Grid & Plate Chemistry" : "كفاءة الأقطاب واللوحات"}
                </span>
                <span className="text-xs font-black text-white leading-none">
                  {isEn ? "Ultra Oxidation Resistance" : "مقاومة أكسدة فائقة"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Advanced Fuzzy Search & Arabic Normalization Helpers ---
function normalizeArabic(text: string): string {
  if (!text) return "";
  // Remove Arabic diacritics (tashkeel)
  let norm = text.toLowerCase().trim()
    .replace(/[\u064B-\u0652]/g, "")
    // Normalize Alifs: أ / إ / آ -> ا
    .replace(/[أإآ]/g, "ا")
    // Normalize Yeh: ى -> ي
    .replace(/ى/g, "ي")
    // Normalize Taa Marbutah/Ha: ة -> ه
    .replace(/ة/g, "ه");

  // Strip defined "ال" prefix representing Al-article on word boundaries
  const words = norm.split(/\s+/).map(w => {
    if (w.startsWith("ال") && w.length > 2) {
      return w.substring(2);
    }
    return w;
  });
  return words.join(" ");
}

function getArabicSkeleton(str: string): string {
  let s = normalizeArabic(str).replace(/\s+/g, "");
  // Remove weak Arabic glide vowels
  s = s.replace(/[اوي]/g, "");
  // Remove duplicate consecutive characters
  let dedup = "";
  for (let i = 0; i < s.length; i++) {
    if (i === 0 || s[i] !== s[i - 1]) {
      dedup += s[i];
    }
  }
  return dedup;
}

function fuzzySearchMatch(prod: any, queryText: string): boolean {
  const cleanQuery = queryText.toLowerCase().trim();
  if (!cleanQuery) return true;

  // Convert Eastern Arabic numerals (like ٥, ٦, ٧, ٠) to Western standard numerals (5, 6, 7, 0)
  const normalizeDigits = (str: string) => {
    return str
      .replace(/[٠]/g, "0")
      .replace(/[١]/g, "1")
      .replace(/[٢]/g, "2")
      .replace(/[٣]/g, "3")
      .replace(/[٤]/g, "4")
      .replace(/[٥]/g, "5")
      .replace(/[٦]/g, "6")
      .replace(/[٧]/g, "7")
      .replace(/[٨]/g, "8")
      .replace(/[٩]/g, "9");
  };

  const stdQuery = normalizeDigits(cleanQuery);

  // Extract potential amperage number search (e.g. "55", "70", "100", "70A", "50 امبير")
  // Let's use a regex to look for digits optionally followed by letters or Arabic characters for amperage
  const ampRegex = /(\d+)\s*(أمبير|امبير|ah|a|amp|amps)?/gi;
  const match = ampRegex.exec(stdQuery);
  let targetAmp: number | null = null;
  let remainingQuery = cleanQuery;

  if (match) {
    const val = parseInt(match[1], 10);
    // Limit to typical battery amperage sizes in our database (e.g., 35 to 220 AH)
    if (val >= 35 && val <= 220) {
      targetAmp = val;
      // Extract the matched amperage text so we can evaluate whatever remains (e.g., "فارتا" or "hankook")
      remainingQuery = stdQuery.replace(match[0], "").trim();
    }
  }

  // Combine product text to search in
  const productText = `${prod.name} ${prod.origin} ${prod.desc}`;

  // If a target amperage was successfully parsed:
  if (targetAmp !== null) {
    const isAmperageMatch = prod.amperage === targetAmp;
    
    // If the search was purely numerical (e.g., "70" or "70A"), check only the amperage
    if (!remainingQuery) {
      return isAmperageMatch;
    } else {
      // If there is other text, both the amperage AND the text must match the product (Cross-brand filtering)
      return isAmperageMatch && basicFuzzyTextMatch(productText, remainingQuery);
    }
  }

  // Fallback to purely text fuzzy search if no amperage was specified
  return basicFuzzyTextMatch(productText, cleanQuery);
}

function basicFuzzyTextMatch(productText: string, queryText: string): boolean {
  const cleanQuery = queryText.toLowerCase().trim();
  if (!cleanQuery) return true;

  const cleanText = productText.toLowerCase();

  // 1. Synonym / Multilingual dictionary mapping for instant cross-language search
  const bilingualMap: { [key: string]: string[] } = {
    'بوش': ['bosch', 'بوش', 'bosh'],
    'bosch': ['bosch', 'بوش', 'bosh'],
    'bosh': ['bosch', 'بوش', 'bosh'],
    'varta': ['varta', 'فارتا'],
    'فارتا': ['varta', 'فارتا'],
    'acdelco': ['acdelco', 'ايسي', 'ايسي ديلكو', 'ايسيديلكو', 'اي سي ديلكو', 'ديلكو', 'delco'],
    'ايسي': ['acdelco', 'ايسي ديلكو', 'ايسيديلكو', 'اي سي ديلكو', 'ديلكو', 'delco'],
    'ديلكو': ['acdelco', 'ايسي ديلكو', 'ايسيديلكو', 'اي سي ديلكو', 'ديلكو', 'delco'],
    'delco': ['acdelco', 'ايسي ديلكو', 'ايسيديلكو', 'اي سي ديلكو', 'ديلكو', 'delco'],
    'hankook': ['hankook', 'هانكوك'],
    'هانكوك': ['hankook', 'هانكوك'],
    'amaron': ['amaron', 'امارون'],
    'امارون': ['amaron', 'امارون'],
    'optima': ['optima', 'اوبتيما', 'أوبتيما'],
    'اوبتيما': ['optima', 'أوبتيما', 'اوبتيما'],
    'أوبتيما': ['optima', 'أوبتيما', 'اوبتيما'],
    'agm': ['agm', 'اي جي ام', 'إي جي إم', 'أج_أم'],
    'efb': ['efb', 'اي اف بي', 'إي إف بي', 'إي_إف_بي'],
    'solite': ['solite', 'سولايت'],
    'سولايت': ['solite', 'سولايت']
  };

  const queryWords = cleanQuery.split(/\s+/).filter(Boolean);
  if (queryWords.length > 0) {
    let wordMatches = queryWords.every(word => {
      // Direct substring match
      if (cleanText.includes(word)) return true;

      // Synonym match
      const synonyms = bilingualMap[word] || [];
      if (synonyms.some(syn => cleanText.includes(syn))) return true;

      // Normalization check
      const normWord = normalizeArabic(word);
      const normProduct = normalizeArabic(cleanText);
      if (normProduct.includes(normWord)) return true;

      return false;
    });

    if (wordMatches) return true;
  }

  // Fallback 1: Direct or Partial Substring Match (Case-Insensitive) on original
  if (cleanText.includes(cleanQuery)) {
    return true;
  }

  // Fallback 2: Arabic Normalization Substring check
  const normText = normalizeArabic(cleanText);
  const normQuery = normalizeArabic(cleanQuery);
  if (normText.includes(normQuery)) {
    return true;
  }

  // Fallback 3: Arabic Skeleton & Weak-Vowel Typo Tolerance checking
  const textWords = normText.split(/\s+/).filter(Boolean);
  const fallbackQueryWords = normQuery.split(/\s+/).filter(Boolean);

  if (fallbackQueryWords.length === 0) return true;

  // Check if every query word matches at least one word in the text fuzzily
  const allWordsMatched = fallbackQueryWords.every(qw => {
    // Direct match, or skeleton match
    const qwSkel = getArabicSkeleton(qw);
    if (!qwSkel) {
      // If query word consists only of vowels, fall back to simple character match
      return textWords.some(tw => tw.includes(qw));
    }

    return textWords.some(tw => {
      if (tw.includes(qw)) return true;
      const twSkel = getArabicSkeleton(tw);
      // check if the query skeleton is identical or a substring of the word skeleton
      return twSkel.includes(qwSkel) || qwSkel.includes(twSkel);
    });
  });

  if (allWordsMatched) {
    return true;
  }

  // Fallback 4: English Subsequence matching if query contains English letters/numbers
  if (/[a-z0-9]/.test(cleanQuery)) {
    const textAlpha = cleanText.replace(/[^a-z0-9]/g, "");
    const queryAlpha = cleanQuery.replace(/[^a-z0-9]/g, "");
    if (queryAlpha && textAlpha.includes(queryAlpha)) {
      return true;
    }
  }

  return false;
}

// 6. --- Pricing Catalog System ---
const ProductGrid = () => {
  const { language } = useLanguage();
  const { setSelectedProduct } = useCheckout();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const handleProductCheckout = (product: Product) => {
    setSelectedProduct(product);
    const element = document.getElementById('request-section');
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  // Load all 200 automotive battery models
  const allProducts = useMemo(() => generate200Batteries(), []);

  // Filter products based on selected category and text-based query
  const filteredProducts = useMemo(() => {
    return allProducts.filter(prod => {
      // 1. Tag Category Filter
      let matchesCategory = false;
      if (selectedCategory === 'ALL') {
        matchesCategory = true;
      } else if (['KOREAN', 'JAPANESE', 'EUROPEAN', 'AMERICAN'].includes(selectedCategory)) {
        matchesCategory = prod.category === selectedCategory;
      } else if (selectedCategory === 'AMP_MEDIUM') {
        // Medium consumer grade (55AH to 70AH)
        matchesCategory = prod.amperage >= 55 && prod.amperage <= 70;
      } else if (selectedCategory === 'AMP_LARGE') {
        // Professional heavy usage (75AH to 100AH)
        matchesCategory = prod.amperage >= 75 && prod.amperage <= 100;
      } else if (selectedCategory === 'AMP_HEAVY') {
        // High industrial truck / commercial (105AH to 150AH)
        matchesCategory = prod.amperage >= 105;
      }

      // 2. Query Search Filter using smart Arabic and English fuzzy tolerance matcher
      const matchesSearch = fuzzySearchMatch(
        prod,
        searchQuery
      );

      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  // Reset pagination scale when filters are toggled for high speed instant re-evaluation
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

  // Infinite progressive scroll loading listener
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Progressively loads another batch of 12 premium batteries
        setVisibleCount(prev => Math.min(prev + 12, filteredProducts.length));
      }
    }, {
      rootMargin: '250px',
      threshold: 0.1
    });

    observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [filteredProducts.length]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-[#080808] to-black text-right" id="catalog-section" dir="rtl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Title Block Headers */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-6 gap-4 pb-4 border-b border-white/5">
          <div className="max-w-xl">
            <span className="text-[#FACC15] font-black text-xs uppercase tracking-wider mb-1 block arabic-text">كتالوج المنتجات الفوري • جودة مضمونة بجدة</span>
            <h2 className="text-xl sm:text-4xl font-black text-white mb-2 arabic-text">
              كتالوج بطاريات السيارات بجدة
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed arabic-text">
              تصفح متجرنا المتكامل بجدة الذي يضم <span className="text-[#FACC15] font-black">200 صنف</span> من أفخم الماركات العالمية شاملة التوصيل والفحص وتركيب الرجيع مجاناً بموقعك.
            </p>
          </div>

          {/* Quick interactive category filters with mobile-optimized horizontal scrolling and touch feedback */}
          <div className="overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 xl:mx-0 xl:px-0 select-none flex gap-1.5 scroll-smooth no-scrollbar">
            {[
              { key: 'ALL', label: 'الكل' },
              { key: 'KOREAN', label: 'كورية 🇰🇷' },
              { key: 'JAPANESE', label: 'يابانية 🇯🇵' },
              { key: 'EUROPEAN', label: 'أوروبية 🇪🇺' },
              { key: 'AMERICAN', label: 'أمريكية 🇺🇸' },
              { key: 'AMP_MEDIUM', label: '٥٥ - ٧٠ أمبير ⚡' },
              { key: 'AMP_LARGE', label: '٧٥ - ١٠٠ أمبير ⚡' },
              { key: 'AMP_HEAVY', label: '١٠٥ أمبير فما فوق 🔋' },
            ].map(tab => (
              <motion.button
                key={tab.key}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2 rounded-lg text-[10px] sm:text-xs font-black transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === tab.key 
                    ? 'bg-[#FACC15] text-black shadow-[0_4px_12px_rgba(250,204,21,0.2)]' 
                    : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search Filtration Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full max-w-sm mr-auto sm:mr-0 border border-white/10 rounded-xl bg-black/60 overflow-hidden flex items-center pr-3">
            <Search className="w-4 h-4 text-zinc-500 ml-2" />
            <label htmlFor="main-catalog-search" className="sr-only">
              {language === 'en' ? 'Search by brand or vehicle size' : 'ابحث بالماركة أو السيارة'}
            </label>
            <input 
              id="main-catalog-search"
              type="text" 
              placeholder="ابحث بالماركة أو السيارة (فارتا، هانكوك، 55AH)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 bg-transparent border-none outline-0 focus:ring-0 text-white placeholder-zinc-500 font-extrabold text-xs text-right arabic-text"
              aria-label={language === 'en' ? 'Search by brand or vehicle size' : 'ابحث بالماركة أو السيارة'}
            />
          </div>

          {/* Real-time Counter showing active products */}
          <div className="text-zinc-500 text-[11px] font-bold font-mono">
            عرض <span className="text-[#FACC15] font-black">{filteredProducts.length}</span> من أصل <span className="text-white font-black">{allProducts.length}</span> بطارية
          </div>
        </div>

        {/* Dynamic Compact 2x2 grid list optimized for mobile screens */}
        {displayedProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {displayedProducts.map(product => {
                const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=مرحباً بطارية إكسبرس جدة! أود طلب بطارية نوع *${product.name}* (${product.origin}) بسعة وجودة عالية بسعر يبدأ من ${product.price} ريال لسيارتي بجدة. أرجو توجيه أقرب فني.`;
                
                return (
                  <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 min-[380px]:p-4 sm:p-6 bg-transparent hover:bg-white/[0.012] border-t border-zinc-800/80 hover:border-yellow-400/30 flex flex-col justify-between transition-all duration-300 rounded-2xl relative cursor-pointer group"
                  >
                    <div className="absolute inset-0 carbon-texture opacity-3 pointer-events-none rounded-xl" />

                    <div className="relative z-10">
                      {/* Technical specifications and origins */}
                      <div className="flex items-center justify-between mb-3 gap-1 flex-wrap">
                        <span className="bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] text-[7.5px] min-[380px]:text-[8px] sm:text-[9.5px] font-black uppercase px-1.5 min-[380px]:px-2 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px] min-[380px]:max-w-[80px] sm:max-w-[120px]">
                          {product.origin.split(' - ')[0]}
                        </span>
                        <span className="text-[7px] min-[380px]:text-[7.5px] sm:text-[11px] text-zinc-500 font-bold arabic-text whitespace-nowrap">
                          {product.warranty.replace(' (سنة كاملة)', '').replace(' (سنة ونصف)', '')}
                        </span>
                      </div>

                      {/* Floating, borderless elegant image presentation */}
                      <div className="h-24 min-[380px]:h-28 sm:h-40 w-full flex items-center justify-center mb-3 sm:mb-4 overflow-hidden relative p-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-20 min-[380px]:max-h-24 sm:max-h-34 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" fill="%23222"><rect width="400" height="300" rx="15"/><text x="200" y="150" fill="%23FACC15" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">12V BATTERY</text></svg>';
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <h3 className="text-xs min-[380px]:text-sm sm:text-lg font-black text-white mb-1.5 tracking-tight leading-tight line-clamp-1 overflow-hidden group-hover:text-[#FACC15] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 text-[9px] min-[380px]:text-[10px] sm:text-[12.5px] leading-tight sm:leading-relaxed mb-3 sm:mb-4 h-9 min-[380px]:h-10 sm:h-14 overflow-hidden line-clamp-2 arabic-text">
                        {product.desc}
                      </p>
                    </div>

                    {/* Integrated pricing trigger & checkout call to action */}
                    <div className="border-t border-white/5 pt-2.5 sm:pt-3 mt-auto relative z-10 space-y-2">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[7.5px] min-[380px]:text-[8px] sm:text-[10px] text-zinc-500 arabic-text leading-none font-bold">شامل التوصيل والتركيب</span>
                        <div className="text-right leading-none">
                          <span className="text-xs min-[380px]:text-sm sm:text-2xl font-black text-[#FACC15]">{product.price}</span>
                          <span className="text-[7.5px] min-[380px]:text-[8px] sm:text-[9.5px] text-zinc-400 mr-0.5 font-bold arabic-text">
                            {language === 'en' ? 'SAR' : 'ريال'}
                          </span>
                        </div>
                      </div>

                      {/* Primary Button: Online Prepaid Checkout */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductCheckout(product);
                        }}
                        className="w-full py-1.5 min-[380px]:py-2 sm:py-3 bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-[7.5px] min-[380px]:text-[8px] sm:text-[11px] rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 border border-transparent cursor-pointer arabic-text transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                      >
                        <CreditCard className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-black" />
                        {language === 'en' ? 'Buy & Secure Prepay 💳' : 'شراء ودفع إلكتروني فوري 💳'}
                      </button>

                      {/* Secondary Button: WhatsApp direct request */}
                      <a
                        href={orderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-1 min-[380px]:py-1.5 sm:py-2.5 bg-black/60 hover:bg-zinc-900 text-zinc-400 hover:text-white font-bold text-[7px] min-[380px]:text-[7.5px] sm:text-[10px] rounded-lg flex items-center justify-center gap-1 border border-zinc-800 cursor-pointer arabic-text transition-all duration-300"
                      >
                        <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current text-green-500 shrink-0" />
                        {language === 'en' ? 'WhatsApp Order Inquiry 💬' : 'أو طلب عبر واتساب 💬'}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Hidden Sentinel for Infinite Scroll trigger loader */}
            {visibleCount < filteredProducts.length && (
              <div 
                ref={sentinelRef} 
                className="w-full py-6 flex justify-center items-center gap-2 text-zinc-500 font-mono text-[10px]"
              >
                <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping" />
                <span>
                  {language === 'en' ? 'Loading more certified batteries...' : 'جاري تحميل المزيد من بطاريات الطاقة المعتمدة...'}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center max-w-lg mx-auto" style={{ border: 'none' }}>
            <Info className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
            <p className="text-zinc-400 font-extrabold text-xs sm:text-sm mb-2 arabic-text">
              {language === 'en' ? 'No batteries match your search filter.' : 'لا توجد منتجات مطابقة للبحث أو للفلتر المختار حالياً.'}
            </p>
            <button 
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="text-[#FACC15] font-black text-xs underline cursor-pointer arabic-text"
            >
              {language === 'en' ? 'Show All Catalog Batteries' : 'عرض جميع بطاريات الكتالوج'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

// 7. --- Request Form (Direct Dispatch / Custom quote flow) ---
const CustomQuoteRequest = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    location: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [generatedInvoiceNo, setGeneratedInvoiceNo] = useState('');
  const [generatedDate, setGeneratedDate] = useState('');
  const [selectedHub, setSelectedHub] = useState<DistrictGeoInfo | null>(null);

  // Structured type-safe geolocational metadata interface for automated routing checkout matching
  interface DistrictGeoInfo {
    lat: number;
    lng: number;
    hubNameAr: string;
    hubNameEn: string;
    baseEtaMins: number;
  }

  // High-precision coordinates database for dispatching & local SEO indexation
  const DISTRICT_GEO_DATABASE: Record<string, DistrictGeoInfo> = {
    // --- أحياء شمال جدة ---
    "المرجان": { lat: 21.6515, lng: 39.1084, hubNameAr: "ممشى المرجان - طريق الملك عبدالعزيز", hubNameEn: "Al-Murjan Walkway - King Rd", baseEtaMins: 12 },
    "البساتين": { lat: 21.6625, lng: 39.1190, hubNameAr: "مربع البساتين بلازا - شارع الأمير سلطان", hubNameEn: "Al-Basateen Plaza - Prince Sultan St", baseEtaMins: 14 },
    "النزهة": { lat: 21.5734, lng: 39.1834, hubNameAr: "تقاطع النزهة - طريق المدينة المنورة", hubNameEn: "Al-Nuzhah Crossing - Madinah Rd", baseEtaMins: 15 },
    "الروضة": { lat: 21.5750, lng: 39.1550, hubNameAr: "تقاطع التحلية التجاري - شارع الروضة", hubNameEn: "Tahlia Commercial Intersection - Al-Rawdah", baseEtaMins: 10 },
    "السلامة": { lat: 21.5862, lng: 39.1549, hubNameAr: "برج صاري التجاري - طريق المدينة المنورة", hubNameEn: "Sari Commercial Tower - Madinah Rd", baseEtaMins: 10 },
    "النهضة": { lat: 21.6190, lng: 39.1255, hubNameAr: "قرية النهضة - شارع عبد الرحمن الداخل", hubNameEn: "Al-Nahdah Retail Village - Abdulrahman Al-Dakhil St", baseEtaMins: 12 },
    "الزهراء": { lat: 21.5841, lng: 39.1352, hubNameAr: "ستارز أفينيو - شارع أحمد العطّاس", hubNameEn: "Stars Avenue District - Ahmad Al-Attas St", baseEtaMins: 10 },
    "أبحر الشمالية": { lat: 21.7126, lng: 39.1023, hubNameAr: "ممشى أبحر الشمالية - شارع عابر القارات", hubNameEn: "North Obhur Walkway - Continental St", baseEtaMins: 12 },
    "أبحر الجنوبية": { lat: 21.6854, lng: 39.1129, hubNameAr: "منتجع أبحر الجنوبية - طريق الكورنيش", hubNameEn: "South Obhur Resort - Corniche Rd", baseEtaMins: 14 },
    "طيبة": { lat: 21.7511, lng: 39.1678, hubNameAr: "بوابات الرحيلي - طريق الحرمين", hubNameEn: "Al-Rehaily Node - Haramain Expressway", baseEtaMins: 15 },
    "الكوثر": { lat: 21.7155, lng: 39.1764, hubNameAr: "مخطط كعكي التجاري - حي الكوثر", hubNameEn: "Kahki Commercial Node - Al-Kauthar", baseEtaMins: 15 },
    "الحمدانية": { lat: 21.7289, lng: 39.1556, hubNameAr: "شارع الحمدانية التجاري العام", hubNameEn: "Al-Hamdaniya General Commercial Road", baseEtaMins: 10 },
    "البوادي": { lat: 21.5794, lng: 39.1688, hubNameAr: "سوق البوادي الكبير - شارع قريش", hubNameEn: "Souq Al-Bawadi Node - Quraish St", baseEtaMins: 10 },
    "النعيم": { lat: 21.6111, lng: 39.1432, hubNameAr: "محيط شارع النعيم التجاري - مقابل النعيم بلازا", hubNameEn: "Al-Naeem Commercial Row - opposite Naeem Plaza", baseEtaMins: 10 },
    "المحمدية": { lat: 21.6384, lng: 39.1278, hubNameAr: "طريق الملك عبدالعزيز - حي المحمدية", hubNameEn: "King Abdulaziz Road - Al-Muhammadiyah", baseEtaMins: 11 },

    // --- أحياء شرق ووسط جدة ---
    "التيسير": { lat: 21.5540, lng: 39.2392, hubNameAr: "مخطط التيسير التجاري - شارع فلسطين الممتد", hubNameEn: "Al-Taysir Commercial Strip - Palestine St Ext", baseEtaMins: 15 },
    "السامر": { lat: 21.5880, lng: 39.2154, hubNameAr: "تقاطع السامر السريع - شارع وهيب بن عمير", hubNameEn: "Al-Samer Express Junction - Wahib St", baseEtaMins: 10 },
    "حي الجامعة": { lat: 21.4812, lng: 39.2154, hubNameAr: "بوابة الجامعة الشرقية - شارع باخشب", hubNameEn: "KAU East Gate Commercial - Bakhashab St", baseEtaMins: 12 },
    "الريان": { lat: 21.6948, lng: 39.2025, hubNameAr: "مخطط الريان التجاري - شارع الريان العام", hubNameEn: "Al-Rayyan Commercial Block - Al-Rayyan General St", baseEtaMins: 14 },
    "الشرفية": { lat: 21.5122, lng: 39.1841, hubNameAr: "شارع خالد بن الوليد التجاري", hubNameEn: "Khaled Bin Al-Waleed Commercial Street", baseEtaMins: 10 },
    "العزيزية": { lat: 21.5452, lng: 39.1982, hubNameAr: "بلدية العزيزية - شارع غرناطة التجاري", hubNameEn: "Al-Aziziyah Municipality - Granada St", baseEtaMins: 12 },
    "الفيحاء": { lat: 21.4984, lng: 39.2132, hubNameAr: "أعمار سكوير بلازا - طريق الملك عبدالله", hubNameEn: "Emaar Square Plaza - King Abdullah Rd", baseEtaMins: 10 },
    "الحمراء": { lat: 21.5270, lng: 39.1060, hubNameAr: "ميدان واجهة الحمراء - شارع فلسطين", hubNameEn: "Al-Hamra Waterfront Plaza - Palestine St", baseEtaMins: 10 },
    "الصفا": { lat: 21.5714, lng: 39.1970, hubNameAr: "شارع الأربعين قرب مستوصف الصفا", hubNameEn: "Al-Arbaeen St near Al-Safa Clinic", baseEtaMins: 10 },
    "المروة": { lat: 21.6022, lng: 39.1895, hubNameAr: "طريق الحرمين - حي المروة السكني", hubNameEn: "Haramain Expressway - Al-Marwah Residential", baseEtaMins: 12 },
    "مشرفة": { lat: 21.5312, lng: 39.1815, hubNameAr: "شارع التضامن العربي - حي مشرفة", hubNameEn: "Arab Solidarity St - Mushrefah", baseEtaMins: 12 },
    "الرحمانية": { lat: 21.7011, lng: 39.1952, hubNameAr: "شارع الرحمانية التجاري العام", hubNameEn: "Al-Rahmaniyah General Commercial Rd", baseEtaMins: 12 },

    // --- أحياء جنوب جدة والمناطق الصناعية ---
    "الوزيرية": { lat: 21.4468, lng: 39.2215, hubNameAr: "صناعية الوزيرية العامة - شارع الاستاد", hubNameEn: "Al-Waziriyah Industrial Area - Stadium St", baseEtaMins: 15 },
    "غليل": { lat: 21.4284, lng: 39.2120, hubNameAr: "شارع غليل العام - حراج السيارات القديم", hubNameEn: "Ghulail General Road - Old Motor Market", baseEtaMins: 15 },
    "المحجر": { lat: 21.4390, lng: 39.1989, hubNameAr: "تقاطع مستشفى الملك فيصل - شارع المحجر", hubNameEn: "KFAFH Crossing - Al-Mahjar Road", baseEtaMins: 15 },
    "بترومين": { lat: 21.4525, lng: 39.1812, hubNameAr: "شارع بترومين التجاري العام - وسط الحي", hubNameEn: "Petromin General Commercial St - Center", baseEtaMins: 18 },
    "الأجاويد": { lat: 21.4055, lng: 39.2550, hubNameAr: "شارع الأجاويد التجاري العام", hubNameEn: "Al-Ajaweed General St node", baseEtaMins: 16 },
    "الفضيلة": { lat: 21.3650, lng: 39.2810, hubNameAr: "مربع مستودعات الفضيلة اللوجستية", hubNameEn: "Al-Fadhilah Logistics Warehouse Strip", baseEtaMins: 18 },
    "الفيصلية": { lat: 21.5645, lng: 39.1812, hubNameAr: "عزيز مول التجاري - شارع صاري", hubNameEn: "Aziz Mall Node - Sari St", baseEtaMins: 12 },
    "السنابل": { lat: 21.3789, lng: 39.2612, hubNameAr: "شارع السنابل التجاري العام - طريق الليث", hubNameEn: "Al-Sanabel General Commercial Rd - Al-Laith Hwy", baseEtaMins: 15 },
    "النسيم": { lat: 21.5115, lng: 39.2224, hubNameAr: "شارع النسيم التجاري - مقابل السلام مول", hubNameEn: "Al-Nasim Commercial Row - opposite Al-Salam Mall", baseEtaMins: 10 },
    "الصناعية الثانية": { lat: 21.3411, lng: 39.2890, hubNameAr: "ميدان مدن الرئيسي - المدينة الصناعية الثانية", hubNameEn: "Modon Main Square - 2nd Industrial City", baseEtaMins: 18 },
    "الصناعية الثالثة": { lat: 21.3120, lng: 39.3140, hubNameAr: "المربع اللوجستي الموحد - المدينة الصناعية الثالثة", hubNameEn: "Unified Logistics Box - 3rd Industrial City", baseEtaMins: 20 },
    "القرنية": { lat: 21.3502, lng: 39.2590, hubNameAr: "المخطط السكني التجاري - حي القرينية", hubNameEn: "Residential Commercial Block - Al-Qurainiyah", baseEtaMins: 18 },
    "الخمرة": { lat: 21.3895, lng: 39.2345, hubNameAr: "مخطط الخمرة التجاري - طريق الساحل", hubNameEn: "Al-Khumra Commercial Block - Coastal Road", baseEtaMins: 18 },

    // --- أحياء مكة المكرمة ---
    "النوارية": { lat: 21.5542, lng: 39.7352, hubNameAr: "ميدان النوارية التجاري - طريق المدينة السريع", hubNameEn: "Al-Nawariyah Commercial Plaza - Madinah Road", baseEtaMins: 15 },
    "العمرة": { lat: 21.4989, lng: 39.7523, hubNameAr: "شارع التنعيم العام - حي العمرة", hubNameEn: "Al-Taneem Main Road - Al-Umrah", baseEtaMins: 14 },
    "التنعيم": { lat: 21.4578, lng: 39.7824, hubNameAr: "محيط ميقات السيدة عائشة رضي الله عنها", hubNameEn: "Sayyidah Aisha Mosque Perimeter", baseEtaMins: 12 },
    "الجعرانة": { lat: 21.4912, lng: 39.9234, hubNameAr: "تقاطع الجعرانة التاريخي بلك مكة", hubNameEn: "Historical Ji'ranah Intersection", baseEtaMins: 18 },
    "حي البساتين-مكة": { lat: 21.5126, lng: 39.7432, hubNameAr: "أسواق البساتين - مدخل مكة الشمالي", hubNameEn: "Al-Basateen Markets - North Makkah Entry", baseEtaMins: 15 },
    "حي البحيرات": { lat: 21.4745, lng: 39.7612, hubNameAr: "مربع البحيرات التجاري والخدمي", hubNameEn: "Al-Buhayrat Commercial Complex", baseEtaMins: 14 },
    "الشوقية": { lat: 21.3798, lng: 39.7923, hubNameAr: "شارع عبد الله بن عباس التجاري العام", hubNameEn: "Abdullah Ibn Abbas Commercial Street", baseEtaMins: 12 },
    "العوالي": { lat: 21.3654, lng: 39.8654, hubNameAr: "ممّر العوالي التجاري - جامع العوالي", hubNameEn: "Al-Awali Commercial Row - Al-Awali Mosque", baseEtaMins: 12 },
    "العزيزية-مكة": { lat: 21.3980, lng: 39.8540, hubNameAr: "شارع العزيزية العام - قرب الأندلس مول مكة", hubNameEn: "Al-Aziziyah General Road - Near Andalus Mall Makkah", baseEtaMins: 10 },
    "الكعكية": { lat: 21.3621, lng: 39.8021, hubNameAr: "حراج مكة المركزي بالكعكية", hubNameEn: "Makkah Central Market - Al-Kakiah", baseEtaMins: 12 },
    "ولي العهد": { lat: 21.3215, lng: 39.7615, hubNameAr: "شارع ولي العهد الرئيسي - طريق الليث بمكة", hubNameEn: "Wali Al-Ahad Main St - Al-Laith Rd", baseEtaMins: 15 },
    "حي الحسينية": { lat: 21.3323, lng: 39.8867, hubNameAr: "مستوصف الحسينية الطبي العام", hubNameEn: "Al-Husayniyah Medical Dispensary Node", baseEtaMins: 15 },
    "الشرائع": { lat: 21.4312, lng: 39.9654, hubNameAr: "شارع الـ 64 التجاري - مخطط الشرائع الموحد", hubNameEn: "64th Commercial St - Al-Shara'i Block", baseEtaMins: 12 },
    "المعابدة": { lat: 21.4410, lng: 39.8450, hubNameAr: "شارع المعابدة العام - طريق الملك فيصل بمكة", hubNameEn: "Al-Maabdah General St - King Faisal Road Makkah", baseEtaMins: 12 },
    "حي الراشدية": { lat: 21.4552, lng: 39.9812, hubNameAr: "مربع مخطط الراشدية السكني التجاري", hubNameEn: "Al-Rashidiyah Commercial Strip", baseEtaMins: 15 },
    "الإسكان": { lat: 21.4011, lng: 39.7712, hubNameAr: "شارع الإسكان العام بمكة", hubNameEn: "Al-Iskan General Road Makkah", baseEtaMins: 14 },
    "الرصيفة": { lat: 21.4089, lng: 39.7890, hubNameAr: "ساحة محطة قطار الحرمين بالرصيفة", hubNameEn: "Haramain Train Station Node - Al-Rusaifah", baseEtaMins: 10 },
    "أم الجود": { lat: 21.4150, lng: 39.7432, hubNameAr: "كوبري نقابة السيارات بأم الجود", hubNameEn: "Syndicate Bridge - Umm Al-Jood", baseEtaMins: 12 },
    "حي الخالدية": { lat: 21.3912, lng: 39.7915, hubNameAr: "سوق الخالدية التجاري العام", hubNameEn: "Al-Khalidiyah General Market Strip", baseEtaMins: 12 },
    "حي الزايدي": { lat: 21.3854, lng: 39.7154, hubNameAr: "ميدان الاستضافة التجاري بالزايدي", hubNameEn: "Hospitality Square - Al-Zaidi", baseEtaMins: 12 },
    "بطحاء قريش": { lat: 21.3650, lng: 39.8120, hubNameAr: "مجمع المتاجر الكبرى ببطحاء قريش", hubNameEn: "Grand Stores Terminal - Bathaa Quraish", baseEtaMins: 12 },
    "بطحاء مكة": { lat: 21.4210, lng: 39.8180, hubNameAr: "ساحة الغزة المركزية - حي بطحاء مكة", hubNameEn: "Al-Gazzah Central Square - Bathaa Makkah", baseEtaMins: 12 }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationError) {
      setValidationError('');
    }
  };

  const proceedToStep2 = () => {
    if (!formData.name.trim()) {
      setValidationError(isEn ? 'Request Denied: Please enter your full name first ⚠️' : 'طلب مرفوض: يرجى كتابة الاسم بالكامل أولاً ⚠️');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError(isEn ? 'Request Denied: Please enter active mobile number ⚠️' : 'طلب مرفوض: يرجى إدخال رقم الجوال النشط ⚠️');
      return;
    }
    setStep(2);
    setValidationError('');
  };

  const sendOrder = (nameVal: string, phoneVal: string, carVal: string, locationVal: string) => {
    const invNo = `BX-INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedInvoiceNo(invNo);
    const now = new Date();
    setGeneratedDate(now.toLocaleString(isEn ? 'en-US' : 'ar-SA', { hour12: true }));

    // Retrieve geocoordinates & logistical concentrate hubs to minimize response delay
    const geoInfo = DISTRICT_GEO_DATABASE[locationVal] || {
      lat: 21.5433,
      lng: 39.1728,
      hubNameAr: "مركز الطوارئ الرئيسي - وسط جدة",
      hubNameEn: "Main Dispatch Center - Central Jeddah",
      baseEtaMins: 15
    };

    setSelectedHub(geoInfo);

    const textMessage = isEn 
      ? `Emergency Car Battery Delivery & Roadside Dispatch Request (Battery Express):%0A%0AOrder Ref: ${invNo}%0AName: ${nameVal}%0APhone: ${phoneVal}%0ACar Model: ${carVal}%0ALocation: ${locationVal}%0ATactical Hub: ${geoInfo.hubNameEn}%0ACoordinates GPS: https://www.google.com/maps?q=${geoInfo.lat},${geoInfo.lng}%0AETA (Optimized Proximity): ${geoInfo.baseEtaMins} mins%0A%0A*Expected arrival time is 20-35 mins. Payment is due only after successful installation and vehicle startup.*`
      : `● طلب توصيل فوري لبطارية سيارة بجدة ولمكة المكرمة.%0Aرقم الطلب: ${invNo}%0Aالاسم: ${nameVal}%0Aالجوال الأساسي: ${phoneVal}%0Aماركة السيارة وموديلها: ${carVal}%0Aموقع التعطل والحي: ${locationVal}%0Aتواجد أقرب فني عن موقعك: https://www.google.com/maps?q=${geoInfo.lat},${geoInfo.lng}%0Aزمن الوصول الفعلي: ${geoInfo.baseEtaMins} دقائق%0Aتم استلام طلبك بنجاح. قم بتأكيد طلبك ليصلك الفني خلال 20 - 35 دقيقة وسيكون الدفع بعد التأكد من تركيب البطارية وتشغيل السيارة بنجاح.`;
    
    setIsSent(true);

    const targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${textMessage}`;
    window.open(targetUrl, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.carModel.trim() || !formData.location.trim()) {
      setValidationError(isEn ? 'Request Denied: Please fill car details and breakdown location ⚠️' : 'طلب مرفوض: يرجى كتابة تفاصيل السيارة والموقع للمتابعة ⚠️');
      return;
    }

    sendOrder(formData.name, formData.phone, formData.carModel, formData.location);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      carModel: '',
      location: ''
    });
    setStep(1);
    setIsSent(false);
    setGeneratedInvoiceNo('');
    setGeneratedDate('');
    setSelectedHub(null);
  };

  return (
    <section id="request-section" className={`py-12 md:py-24 bg-[#050505] relative ${isEn ? 'text-left' : 'text-right'}`} dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Background neon lights */}
      <div className="absolute right-[10%] bottom-10 w-80 h-80 bg-[#FACC15]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Description */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider mb-4 inline-block arabic-text">
            {isEn ? "Direct Technical Hotline" : "اتصال فني وإتمام الطلب المباشر"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 arabic-text tracking-tight leading-tight">
            {isEn ? <>Book Instant Delivery in <span className="text-[#FACC15]">Jeddah</span></> : <>أحجز موعد توصيل فوري في <span className="text-[#FACC15]">جـدة</span></>}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 font-semibold leading-relaxed arabic-text">
            {isEn 
              ? "Submit your response details to secure a simplified invoice & dispatch the nearest expert technician truck to your location."
              : "سجل معلومات الطلب لتأدية الفحص الفني، وإصدار الفاتورة الضريبية الرسمية لعلامة (بطارية إكسبرس)، وتوجيه الفني فوراً للتنفيذ والتركيب."}
          </p>
        </div>

        {/* Promotional Banner Image */}
        <div className="w-full flex justify-center mb-10">
          <img
            src="https://i.ibb.co/6cVKYCD8/BX-Cinematic-Banner.webp"
            alt="BX-Cinematic-Banner"
            referrerPolicy="no-referrer"
            className="w-full max-w-lg h-auto rounded-2xl border border-yellow-500/15 shadow-2xl object-cover"
          />
        </div>

        {/* Dynamic Stepper Timeline - Hidden if Request processed successfully */}
        {!isSent && (
          <div className="flex items-center justify-center max-w-md mx-auto mb-10 gap-2 select-none border-t border-b border-white/5 py-4">
            <div className={`flex items-center gap-2.5 transition-all duration-300 ${step === 1 ? 'text-[#FACC15]' : 'text-zinc-500'}`}>
              <span className={`w-7 h-7 flex items-center justify-center rounded-xl text-xs font-black transition-all ${step === 1 ? 'bg-[#FACC15] text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}>{isEn ? '1' : '١'}</span>
              <span className="text-xs sm:text-sm font-extrabold arabic-text">{isEn ? "Contact Information" : "معلومات الاتصال"}</span>
            </div>
            <div className="flex-1 h-[1px] bg-zinc-800 mx-1 max-w-[40px]" />
            <div className={`flex items-center gap-2.5 transition-all duration-300 ${step === 2 ? 'text-[#FACC15]' : 'text-zinc-500'}`}>
              <span className={`w-7 h-7 flex items-center justify-center rounded-xl text-xs font-black transition-all ${step === 2 ? 'bg-[#FACC15] text-black shadow-[0_0_15px_rgba(250,204,21,0.35)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}>{isEn ? '2' : '٢'}</span>
              <span className="text-xs sm:text-sm font-extrabold arabic-text">{isEn ? "Vehicle & Location" : "المركبة وتحديد الموقع"}</span>
            </div>
          </div>
        )}

        {/* Floating Minimalist Form / Invoice Simulator Container */}
        <div className="relative py-2">
          
          {validationError && !isSent && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 font-extrabold text-sm arabic-text shadow-inner"
            >
              {validationError}
            </motion.div>
          )}

          {!isSent ? (
            <form onSubmit={handleFormSubmit} className="relative z-10">
              
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: isEn ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isEn ? 20 : -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                      {/* Full Name Input */}
                      <div className="flex flex-col">
                        <label htmlFor="form-full-name" className="text-xs font-black text-[#FACC15] mb-2 uppercase tracking-wide arabic-text">{isEn ? "Full Name" : "الاسم بالكامل للعميل"}</label>
                        <input 
                          id="form-full-name"
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={isEn ? "e.g. Joseph Smith" : "مثال: يوسف الحربي"}
                          required
                          className={`w-full bg-transparent border-b border-zinc-800 rounded-none pb-2.5 pt-1 text-white placeholder-zinc-600 font-extrabold text-base focus:border-yellow-400 focus:outline-0 transition-colors arabic-text ${isEn ? 'text-left pl-2' : 'text-right'}`}
                        />
                      </div>

                      {/* Active Mobile Phone */}
                      <div className="flex flex-col">
                        <label htmlFor="form-phone-number" className="text-xs font-black text-[#FACC15] mb-2 uppercase tracking-wide arabic-text">{isEn ? "Active Mobile Number" : "رقم الجوال النشط"}</label>
                        <input 
                          id="form-phone-number"
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={isEn ? "e.g. 05xxxxxxx" : "مثال: 05xxxxxxx"}
                          required
                          className={`w-full bg-transparent border-b border-zinc-800 rounded-none pb-2.5 pt-1 text-white placeholder-zinc-600 font-extrabold text-base focus:border-yellow-400 focus:outline-0 transition-colors font-sans ${isEn ? 'text-left pl-2' : 'text-right'}`}
                        />
                      </div>
                    </div>

                    {/* Move to Step 2 action */}
                    <div className="pt-6">
                      <button 
                        type="button"
                        onClick={proceedToStep2}
                        className="w-full py-5 bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-lg md:text-xl rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.25)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] flex items-center justify-center gap-3 cursor-pointer arabic-text border-2 border-yellow-300/30 scale-100 hover:scale-[1.015]"
                      >
                        <span>{isEn ? "Continue to Vehicle & Location" : "المتابعة لتفاصيل المركبة والموقع"}</span>
                        {isEn ? <ChevronRight className="w-5 h-5 text-black stroke-[3px]" /> : <ChevronLeft className="w-5 h-5 text-black stroke-[3px]" />}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: isEn ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isEn ? -20 : 20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                      {/* Car Brand & Model */}
                      <div className="flex flex-col">
                        <label htmlFor="form-car-model" className="text-xs font-black text-[#FACC15] mb-2 uppercase tracking-wide arabic-text">{isEn ? "Car Brand & Model" : "ماركة السيارة وموديلها"}</label>
                        <input 
                          id="form-car-model"
                          type="text" 
                          name="carModel"
                          value={formData.carModel}
                          onChange={handleInputChange}
                          placeholder={isEn ? "e.g. Toyota Camry 2024" : "مثال: كامري ٢٠٢٤"}
                          required
                          className={`w-full bg-transparent border-b border-zinc-800 rounded-none pb-2.5 pt-1 text-white placeholder-zinc-600 font-extrabold text-base focus:border-yellow-400 focus:outline-0 transition-colors arabic-text ${isEn ? 'text-left pl-2' : 'text-right'}`}
                        />
                      </div>

                      {/* Neighborhood & Breakdown Location Group Select Dropdown */}
                      <div className="flex flex-col">
                        <label htmlFor="userArea" className="text-xs font-black text-[#FACC15] mb-2 uppercase tracking-wide arabic-text">
                          {isEn ? "Breakdown Location & District" : "اختر الحي ومنطقة التعطل في جدة أو مكة 📍"}
                        </label>
                        <select 
                          id="userArea"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className={`w-full bg-zinc-950 border-b border-zinc-800 rounded-none pb-2.5 pt-1 text-white font-extrabold text-base focus:border-yellow-400 focus:outline-0 transition-colors arabic-text cursor-pointer ${isEn ? 'text-left' : 'text-right'}`}
                        >
                          <option value="" className="bg-[#050505] text-zinc-500">
                            {isEn ? "-- Select Neighborhood --" : "-- اختر حي وموقع التعطل --"}
                          </option>
                          
                          {/* ✨ قطاع شمال جـدة */}
                          <optgroup label="✨ أحياء شمال جـدة" className="bg-[#050505] text-yellow-500 font-bold">
                            <option value="المرجان" className="bg-[#050505] text-white">المرجان</option>
                            <option value="البساتين" className="bg-[#050505] text-white">البساتين</option>
                            <option value="النزهة" className="bg-[#050505] text-white">النزهة</option>
                            <option value="الروضة" className="bg-[#050505] text-white">الروضة</option>
                            <option value="السلامة" className="bg-[#050505] text-white">السلامة</option>
                            <option value="النهضة" className="bg-[#050505] text-white">النهضة</option>
                            <option value="الزهراء" className="bg-[#050505] text-white">الزهراء</option>
                            <option value="أبحر الشمالية" className="bg-[#050505] text-white">أبحر الشمالية</option>
                            <option value="أبحر الجنوبية" className="bg-[#050505] text-white">أبحر الجنوبية</option>
                            <option value="طيبة" className="bg-[#050505] text-white">طيبة</option>
                            <option value="الكوثر" className="bg-[#050505] text-white">الكوثر</option>
                            <option value="الحمدانية" className="bg-[#050505] text-white">الحمدانية</option>
                            <option value="البوادي" className="bg-[#050505] text-white">البوادي</option>
                            <option value="النعيم" className="bg-[#050505] text-white">النعيم</option>
                            <option value="المحمدية" className="bg-[#050505] text-white">المحمدية</option>
                          </optgroup>

                          {/* ✨ قطاع شرق ووسط جـدة */}
                          <optgroup label="✨ أحياء شرق ووسط جـدة" className="bg-[#050505] text-yellow-500 font-bold">
                            <option value="التيسير" className="bg-[#050505] text-white">التيسير</option>
                            <option value="السامر" className="bg-[#050505] text-white">السامر</option>
                            <option value="حي الجامعة" className="bg-[#050505] text-white">حي الجامعة</option>
                            <option value="الريان" className="bg-[#050505] text-white">الريان</option>
                            <option value="الشرفية" className="bg-[#050505] text-white">الشرفية</option>
                            <option value="العزيزية" className="bg-[#050505] text-white">العزيزية</option>
                            <option value="الفيحاء" className="bg-[#050505] text-white">الفيحاء</option>
                            <option value="الحمراء" className="bg-[#050505] text-white">الحمراء</option>
                            <option value="الصفا" className="bg-[#050505] text-white">الصفا</option>
                            <option value="المروة" className="bg-[#050505] text-white">المروة</option>
                            <option value="مشرفة" className="bg-[#050505] text-white">مشرفة</option>
                            <option value="الرحمانية" className="bg-[#050505] text-white">الرحمانية</option>
                          </optgroup>

                          {/* ✨ قطاع جنوب جـدة والمناطق الصناعية */}
                          <optgroup label="✨ أحياء جنوب جـدة والمناطق الصناعية" className="bg-[#050505] text-yellow-500 font-bold">
                            <option value="الوزيرية" className="bg-[#050505] text-white">الوزيرية</option>
                            <option value="غليل" className="bg-[#050505] text-white">غليل</option>
                            <option value="المحجر" className="bg-[#050505] text-white">المحجر</option>
                            <option value="بترومين" className="bg-[#050505] text-white">بترومين</option>
                            <option value="الأجاويد" className="bg-[#050505] text-white">الأجاويد</option>
                            <option value="الفضيلة" className="bg-[#050505] text-white">الفضيلة</option>
                            <option value="الفيصلية" className="bg-[#050505] text-white">الفيصلية</option>
                            <option value="السنابل" className="bg-[#050505] text-white">السنابل</option>
                            <option value="النسيم" className="bg-[#050505] text-white">النسيم</option>
                            <option value="الصناعية الثانية" className="bg-[#050505] text-white">الصناعية الثانية</option>
                            <option value="الصناعية الثالثة" className="bg-[#050505] text-white">الصناعية الثالثة</option>
                            <option value="القرنية" className="bg-[#050505] text-white">القرنية</option>
                            <option value="الخمرة" className="bg-[#050505] text-white">الخمرة</option>
                          </optgroup>

                          {/* 🕋 أحياء العاصمة المقدسة */}
                          <optgroup label="🕋 أحياء مكة المكرمة" className="bg-[#050505] text-yellow-500 font-bold">
                            <option value="النوارية" className="bg-[#050505] text-white">النوارية</option>
                            <option value="العمرة" className="bg-[#050505] text-white">العمرة</option>
                            <option value="التنعيم" className="bg-[#050505] text-white">التنعيم</option>
                            <option value="الجعرانة" className="bg-[#050505] text-white">الجعرانة</option>
                            <option value="حي البساتين-مكة" className="bg-[#050505] text-white">حي البساتين</option>
                            <option value="حي البحيرات" className="bg-[#050505] text-white">حي البحيرات</option>
                            <option value="الشوقية" className="bg-[#050505] text-white">الشوقية</option>
                            <option value="العوالي" className="bg-[#050505] text-white">العوالي</option>
                            <option value="العزيزية-مكة" className="bg-[#050505] text-white">العزيزية</option>
                            <option value="الكعكية" className="bg-[#050505] text-white">الكعكية</option>
                            <option value="ولي العهد" className="bg-[#050505] text-white">ولي العهد</option>
                            <option value="حي الحسينية" className="bg-[#050505] text-white">حي الحسينية</option>
                            <option value="الشرائع" className="bg-[#050505] text-white">الشرائع</option>
                            <option value="المعابدة" className="bg-[#050505] text-white">المعابدة</option>
                            <option value="حي الراشدية" className="bg-[#050505] text-white">حي الراشدية</option>
                            <option value="الإسكان" className="bg-[#050505] text-white">الإسكان</option>
                            <option value="الرصيفة" className="bg-[#050505] text-white">الرصيفة</option>
                            <option value="أم الجود" className="bg-[#050505] text-white">أم الجود</option>
                            <option value="حي الخالدية" className="bg-[#050505] text-white">حي الخالدية</option>
                            <option value="حي الزايدي" className="bg-[#050505] text-white">حي الزايدي</option>
                            <option value="بطحاء قريش" className="bg-[#050505] text-white">بطحاء قريش</option>
                            <option value="بطحاء مكة" className="bg-[#050505] text-white">بطحاء مكة</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    {/* Submission and Back controls */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => { setStep(1); setValidationError(''); }}
                        className="w-full sm:w-1/3 py-5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-extrabold text-base rounded-2xl transition-all duration-300 border border-zinc-800 flex items-center justify-center gap-2 cursor-pointer arabic-text scale-100 hover:scale-[1.01]"
                      >
                        {isEn ? <ChevronLeft className="w-5 h-5 text-zinc-400 stroke-[3px]" /> : <ChevronRight className="w-5 h-5 text-zinc-400 stroke-[3px]" />}
                        <span>{isEn ? "Go Back" : "رجوع لمعلومات العميل"}</span>
                      </button>
                      
                      <button 
                        type="submit"
                        className="w-full sm:w-2/3 py-5 bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-lg rounded-2xl transition-all duration-300 shadow-[0_0_45px_rgba(250,204,21,0.3)] hover:shadow-[0_0_65px_rgba(250,204,21,0.5)] flex items-center justify-center gap-3 cursor-pointer arabic-text border-2 border-yellow-300/30 scale-100 hover:scale-[1.02]"
                      >
                        <span>{isEn ? "Confirm Request & Generate Corporate Invoice" : "تأكيد واستلام فاتورة التوصيل الفوري"}</span>
                        <Zap className="w-5 h-5 text-black fill-current animate-bounce" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[10.5px] text-zinc-500 text-center leading-relaxed mt-8 arabic-text">
                {isEn 
                  ? "* By confirming this request, you generate a simplified commercial invoice and will be routed to WhatsApp for live coordinate lock with our truck dispatch system."
                  : "* بتأكيد طلبك، يقوم النظام آلياً بإعداد مسودة الفاتورة الإلكترونية المعتمدة لعلامة بطارية إكسبرس ويوجهك لمتابعة الفني مباشرة على الواتساب."}
              </p>

            </form>
          ) : (
            
            /* --- HIGH-END ORDER SUCCESS DISPLAY WITH SMART ELECTRONIC INVOICE SIMULATOR --- */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative z-25 text-right arabic-text"
            >
              <div className="bg-[#0e0f12]/95 border border-[#FACC15]/20 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl relative overflow-hidden max-w-2xl mx-auto">
                
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-[#FACC15] to-yellow-600 shadow-[0_2px_15px_rgba(250,204,21,0.5)]" />
                
                {/* Succes Notification Box */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FACC15]/10 border border-[#FACC15]/30 rounded-2xl mb-4 shadow-[0_0_30px_rgba(250,204,21,0.15)] animate-pulse">
                    <CheckCircle2 className="w-9 h-9 text-[#FACC15]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">تم استلام طلبك بنجاح! ⚡</h3>
                  
                  {/* Absolute core requested notice from user prompt */}
                  <div className="bg-zinc-950/80 border border-yellow-500/20 rounded-2xl p-4 sm:p-5 mt-4 text-center select-text shadow-inner">
                    <p className="text-[#FACC15] font-black text-sm sm:text-base leading-relaxed">
                      "تم استلام طلبك، سيصلك الفني خلال <span className="underline decoration-wavy decoration-[#FACC15] text-white">20 - 35 دقيقة</span> وسيكون الدفع بعد التأكد من تركيب البطارية وتشغيل السيارة"
                    </p>
                  </div>
                </div>

                {/* Simulated Thermal Receipt invoice matching corporate branding guidance */}
                <div className="bg-white text-zinc-900 rounded-2xl p-5 sm:p-8 font-sans shadow-2xl relative overflow-hidden border border-zinc-200">
                  
                  {/* Thermal paper side cutouts simulated details */}
                  <div className="absolute -left-1.5 top-0 bottom-0 w-3 flex flex-col justify-around pointer-events-none opacity-40">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-zinc-900" />
                    ))}
                  </div>
                  <div className="absolute -right-1.5 top-0 bottom-0 w-3 flex flex-col justify-around pointer-events-none opacity-40">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-zinc-900" />
                    ))}
                  </div>

                  <div className="px-3 sm:px-6">
                    {/* Invoice header */}
                    <div className="flex flex-col items-center border-b-2 border-dashed border-zinc-300 pb-5 text-center">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-1.5 mb-1 select-none font-bold">
                        بطارية إكسبرس ⚡ <span className="text-xs font-medium text-emerald-600">رسمي</span>
                      </span>
                      <img 
                        src="https://i.ibb.co/wFM4ckTP/Battery-Express-optimized.webp" 
                        alt="Battery Express Logo" 
                        className="h-14 sm:h-16 w-auto object-contain my-3" 
                        referrerPolicy="no-referrer" 
                      />
                      <span className="text-[10px] text-zinc-500 font-extrabold tracking-wide block uppercase mb-3">بطارية إكسبرس لخدمات طاقة وميكانيكا السيارات</span>
                      <span className="bg-zinc-100 text-zinc-800 text-[10px] font-black px-3 py-1 rounded-full inline-block">
                        طلب أمر استشاري
                      </span>
                    </div>

                    {/* Invoice body metadata details */}
                    <div className="py-5 border-b-2 border-dashed border-zinc-300 text-xs text-zinc-700 space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-bold">رقم الطلب والفاتورة:</span>
                        <span className="font-mono font-black text-zinc-950 select-all">{generatedInvoiceNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-bold">تاريخ إصدار الفاتورة:</span>
                        <span className="font-semibold text-zinc-900">{generatedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-bold">حالة أمر العمل:</span>
                        <span className="text-emerald-700 font-black flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> قيد التوصيل والتركيب فوراً
                        </span>
                      </div>
                      
                      {/* Customer Info */}
                      <div className="bg-zinc-50 p-3.5 rounded-xl space-y-2 mt-2 border border-zinc-100">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">اسم العميل:</span>
                          <span className="font-extrabold text-[#000]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">جوال المستخدم:</span>
                          <span className="font-mono text-zinc-800 select-all">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">نوع المركبة:</span>
                          <span className="font-semibold text-zinc-800">{formData.carModel}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">حي وموقع التعطل:</span>
                          <span className="font-semibold text-zinc-800">{formData.location}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">مركز الانطلاق اللوجستي:</span>
                          <span className="font-black text-[#FACC15] bg-[#050505] px-2 py-0.5 rounded border border-zinc-800 leading-tight">
                            {selectedHub?.hubNameAr || "مركز الطوارئ الرئيسي - وسط جدة"}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">الإحداثيات الجغرافية المعتمدة:</span>
                          <span className="font-mono text-[#050505] font-semibold bg-zinc-100 px-1 py-0.2 rounded border border-zinc-200">
                            {selectedHub?.lat || "21.5433"} , {selectedHub?.lng || "39.1728"}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">زمن الاستجابة (ETA المسرع):</span>
                          <span className="font-black text-emerald-700">
                            {selectedHub?.baseEtaMins || 15} دقيقة فقط! ⚡️
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">تفاصيل الخدمة:</span>
                          <span className="font-bold text-zinc-900">توصيل وتركيب بطارية سيارة مطابقة للمواصفات</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-500 font-bold">وسيلة الاستحقاق:</span>
                          <span className="font-black text-emerald-800">
                            الدفع عند التركيب (بطاقة أو كاش)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ZATCA Compliant QR code simulation matching leading companies */}
                    <div className="pt-2 pb-1 flex flex-col items-center justify-center border-t border-zinc-200 mt-2 text-center">
                      <div className="relative group p-2 border border-zinc-200 rounded-xl bg-zinc-50">
                        <QrCode className="w-24 h-24 text-zinc-800" />
                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-emerald-600 text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-md shadow-md animate-bounce">مستند رسمي معتمد</span>
                        </div>
                      </div>
                      <span className="text-[8.5px] text-zinc-500 font-extrabold mt-2 tracking-tight">مسح الرمز للتحقق من السجل التجاري والامتثال الضريبي</span>
                    </div>

                  </div>
                </div>

                {/* Print, share & action buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-8 relative z-30">
                  
                  {/* Print invoice button */}
                  <button 
                    onClick={() => window.print()} 
                    className="py-4 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Printer className="w-4 h-4 text-zinc-400" />
                    <span>طباعة الفاتورة</span>
                  </button>

                  {/* Redo request button */}
                  <button 
                    onClick={resetForm} 
                    className="py-4 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <FileText className="w-4 h-4 text-zinc-400" />
                    <span>طلب جديد</span>
                  </button>

                  {/* Primary WhatsApp coordinator link */}
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      isEn 
                        ? `Emergency Car Battery Delivery & Roadside Dispatch Request (Battery Express):\n\nOrder Ref: ${generatedInvoiceNo}\nName: ${formData.name}\nPhone: ${formData.phone}\nCar Model: ${formData.carModel}\nLocation: ${formData.location}\nTactical Hub: ${selectedHub?.hubNameEn || "Main Dispatch Center"}\nCoordinates GPS: https://www.google.com/maps?q=${selectedHub?.lat || 21.5433},${selectedHub?.lng || 39.1728}\nETA: ${selectedHub?.baseEtaMins || 15} mins\n\n*Expected arrival time is 20-35 mins. Payment is due only after successful installation and vehicle startup.*`
                        : `● طلب توصيل فوري لبطارية سيارة بجدة ولمكة المكرمة.\nرقم الطلب: ${generatedInvoiceNo}\nالاسم: ${formData.name}\nالجوال الأساسي: ${formData.phone}\nماركة السيارة وموديلها: ${formData.carModel}\nموقع التعطل والحي: ${formData.location}\nتواجد أقرب فني عن موقعك: https://www.google.com/maps?q=${selectedHub?.lat || 21.5433},${selectedHub?.lng || 39.1728}\nزمن الوصول الفعلي: ${selectedHub?.baseEtaMins || 15} دقائق\nتم استلام طلبك بنجاح. قم بتأكيد طلبك ليصلك الفني خلال 20 - 35 دقيقة وسيكون الدفع بعد التأكد من تركيب البطارية وتشغيل السيارة بنجاح.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 sm:col-span-1 py-4 px-4 bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(250,204,21,0.2)] hover:shadow-[0_0_35px_rgba(250,204,21,0.4)]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0 text-emerald-800" />
                    <span>تأكيد بـواتساب</span>
                  </a>

                </div>

              </div>
            </motion.div>

          )}

        </div>

      </div>
    </section>
  );
};

// 8. --- Testimonials Reviews Carousel ---
const ReviewsSection = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentReview = TESTIMONIALS[activeIndex];

  const getReviewText = (originalReview: string) => {
    if (!isEn) return originalReview;
    if (originalReview.includes("سرعة الفزعة")) {
      return "Excellent speed of response! Less than 15 minutes and my Lexus battery was swapped at my location near the Red Sea Mall. Clean computer check too!";
    }
    if (originalReview.includes("أنصح الجميع")) {
      return "Highly recommend! Best prices in Jeddah, comprehensive digital OBD2 test report before warranty activation. Professional and quick advice.";
    }
    if (originalReview.includes("تعطلت سيارتي الهايلكس")) {
      return "My pickup truck had a complete alternator-battery failure in the Hamdaniya area. Technicians arrived instantly, fully solved the issues, and set up a valid smart warranty card.";
    }
    return originalReview;
  };

  const getReviewName = (originalName: string) => {
    if (!isEn) return originalName;
    if (originalName.includes("ياسين البارقي")) return "Eng. Yassin Al-Barqi";
    if (originalName.includes("أبو فهد")) return "Abu Fahad Al-Hazmi";
    if (originalName.includes("فيصل الحربي")) return "Dr. Faisal Al-Harbi";
    return originalName;
  };

  return (
    <section className={`py-12 bg-[#050505] relative overflow-hidden ${isEn ? 'text-left' : 'text-right'}`} dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block descriptions */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[#FACC15] font-extrabold text-[10px] uppercase tracking-widest mb-2 block arabic-text">
            {isEn ? "Trusted in Jeddah" : "ثقة راسخة بجدة"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 arabic-text tracking-tight">
            {isEn ? "Jeddah Verified Customer Reviews ⭐⭐⭐⭐⭐" : "تقييمات عملاء جدة ⭐⭐⭐⭐⭐"}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative glass-card rounded-2xl p-6 sm:p-8 bg-zinc-950/40 border border-white/5 shadow-xl transition-all duration-300">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: isEn ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isEn ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[140px] flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars (25% smaller) */}
                <div className={`flex items-center gap-1 mb-4 justify-center ${isEn ? 'md:justify-start' : 'md:justify-end'}`}>
                  {[...Array(currentReview.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 text-[#FACC15] fill-current" />
                  ))}
                </div>

                <p className={`text-zinc-300 text-sm sm:text-base leading-relaxed italic mb-6 text-center arabic-text ${isEn ? 'md:text-left' : 'md:text-right'}`}>
                  " {getReviewText(currentReview.review)} "
                </p>
              </div>

              {/* Author Segment */}
              <div className="pt-4 flex items-center justify-between border-t border-white/5 bg-transparent">
                <div className={`flex items-center gap-2.5 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-8 h-8 rounded-full bg-[#FACC15]/5 border border-[#FACC15]/20 flex items-center justify-center font-black text-[#FACC15] text-xs uppercase select-none">
                    {getReviewName(currentReview.name).substring(0, 1)}
                  </div>
                  <div className={isEn ? 'text-left' : 'text-right'}>
                    <p className="text-xs sm:text-sm font-black text-white arabic-text">{getReviewName(currentReview.name)}</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5 arabic-text">
                      {isEn ? "Verified Client in Jeddah" : "عميل مفعل بجدة"}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-green-500/5 border border-green-500/10 px-2 py-0.5 rounded-full text-green-400 text-[9px] font-bold select-none">
                  <Check className="w-3 h-3" />
                  <span className="arabic-text">{isEn ? "Diagnostic Done" : "خاضع للفحص"}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel Interactive Nav Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button 
              onClick={isEn ? prevReview : nextReview}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#FACC15] hover:bg-[#FACC15]/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title={isEn ? "Previous" : "السابق"}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Bullet Indicators */}
            <div className="flex items-center gap-1.5" dir="ltr">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-4 bg-[#FACC15]' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'} cursor-pointer`}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={isEn ? nextReview : prevReview}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#FACC15] hover:bg-[#FACC15]/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title={isEn ? "Next" : "التالي"}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

// 9. --- Standard Footer Information ---
const Footer = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<'warranty' | 'refund' | null>(null);

  return (
    <footer className={`bg-black border-t border-white/10 pt-16 pb-36 sm:pb-24 text-zinc-500 relative ${isEn ? 'text-left' : 'text-right'}`} dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 space-y-4">
            <div className={`flex items-center gap-3 ${isEn ? 'justify-start' : 'justify-end md:flex-row-reverse'}`}>
              <img 
                src="https://i.ibb.co/mrKvGFK7/file-000000002f10720a92f3066faf9dc487.png" 
                alt="Battery Express Signature Logo" 
                className="h-14 w-auto object-contain brightness-110" 
                loading="lazy"
                decoding="async"
                width="56"
                height="56"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="%23FACC15"><path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>';
                }}
                referrerPolicy="no-referrer" 
              />
              <span className="text-lg font-black text-[#FACC15] uppercase tracking-wider italic">
                {isEn ? "Battery Express" : "بطارية إكسبرس"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed arabic-text">
              {isEn 
                ? "Battery Express: Your car's smart energy expert in Jeddah and Makkah. We combine precise digital diagnostics (OBD2) with lightning-fast roadside backup. We reach you wherever you are to test and replace your (AGM/EFB) battery with first-class global standards. Trust, precision, and professionalism that you deserve." 
                : "بطارية إكسبرس: خبير الطاقة الذكية لسيارتك في جدة ومكة. نجمع بين دقة التشخيص الرقمي (OBD2) وسرعة الخدمة الميدانية. نصلك أينما كنت لنفحص ونبدل بطاريتك (AGM/EFB) بأعلى معايير الجودة العالمية. ثقة، دقة، واحترافية تليق بك."}
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-wide arabic-text">
              {isEn ? "Specialized Services" : "خدمات الطوارئ بجدة"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 arabic-text">
              <li>
                <Link to="/services/batteries-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Car Batteries Jeddah Service" : "بطاريات جدة (توصيل فوري)"}
                </Link>
              </li>
              <li>
                <Link to="/services/puncture-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Mobile Tire Puncture Repair" : "بنشر متنقل جدة (٢٤ ساعة)"}
                </Link>
              </li>
              <li>
                <Link to="/services/battery-change-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Professional Battery Change" : "تبديل بطاريات جدة عند البيت"}
                </Link>
              </li>
              <li>
                <Link to="/services/agm-battery-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "AGM Start-Stop Batteries" : "بطاريات AGM جدة الفاخرة"}
                </Link>
              </li>
              <li>
                <Link to="/services/battery-jumpstart-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Battery Booster Jumpstart" : "اشتراك بطارية جدة فزعة طريق"}
                </Link>
              </li>
              <li>
                <Link to="/services/battery-24h-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "24/7 Car Battery Delivery" : "بطاريات سيارات جدة 24 ساعة"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-wide arabic-text">
              {isEn ? "Service Coverage Districts" : "تغطية أحياء مدينة جدة"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 arabic-text">
              <li>
                <Link to="/services/districts-alsafa" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Al Safa District Batteries" : "بطاريات حي الصفا"}
                </Link>
              </li>
              <li>
                <Link to="/services/districts-alhamdaniya" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Al Hamdaniya District Support" : "بطاريات الحمدانية"}
                </Link>
              </li>
              <li>
                <Link to="/services/districts-alnasim" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Al Naseem District Replacement" : "بطاريات حي النسيم"}
                </Link>
              </li>
              <li>
                <Link to="/services/districts-obhur" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Obhur Coast Roads Mobile Help" : "بطاريات أبحر (الشمالية والجنوبية)"}
                </Link>
              </li>
              <li>
                <Link to="/services/districts-north-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "North Jeddah Mobile Puncture" : "بنشر شمال جدة (النعيم والمرجان)"}
                </Link>
              </li>
              <li>
                <Link to="/services/districts-east-jeddah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "East Jeddah Puncture Repair" : "بنشر شرق جدة (السامر والأجواد)"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-wide arabic-text">
              {isEn ? "Makkah Sectors (24H)" : "تغطية مكة المكرمة (24 ساعة)"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 arabic-text">
              <li>
                <a href="/makkah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Makkah Main Support Hub" : "مكة المكرمة - الخدمات العامة"}
                </a>
              </li>
              <li>
                <a href="/center-makkah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "Central Makkah (Al-Aziziyah & Awali)" : "وسط مكة (العزيزية والعوالي)"}
                </a>
              </li>
              <li>
                <a href="/east-makkah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "East Makkah (Al-Shara'i)" : "شرق مكة (الشرائع والراشدية)"}
                </a>
              </li>
              <li>
                <a href="/west-makkah" className="hover:text-[#FACC15] hover:underline transition-all block">
                  {isEn ? "West Makkah (Al-Zaidi & Showqiah)" : "غرب مكة (الزايدي والشوقية)"}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-black uppercase tracking-wide arabic-text">
              {isEn ? "Working Hours & Details" : "ساعات العمل وبطاقة الاتصال"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 arabic-text">
              {isEn ? (
                <>
                  <li>Mobile Dispatch: 24 Hours / 7 Days (24/7 Support)</li>
                  <li>Direct Operator Hotline: {PHONE_NUMBER}</li>
                  <li>Emergency Incident Mail: support@bx-express-jeddah.com</li>
                  <li>Core Repair Base: Industrial Area & Al-Balad, Jeddah</li>
                </>
              ) : (
                <>
                  <li>نشاط الدوران المتنقل: ٢٤ ساعة طوال أيام الأسبوع (24/7)</li>
                  <li>رقم المندوب المنسق المفتوح: {PHONE_NUMBER}</li>
                  <li>البريد والإبلاغ الطارئ: support@bx-express-jeddah.com</li>
                  <li>الفرع اللوجيستي المعتمد: منطقة جدة الصناعية والبلد</li>
                </>
              )}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 flex flex-col justify-start">
            <h4 className="text-white text-sm font-black uppercase tracking-wide arabic-text">
              {isEn ? "Our Commitment" : "التزامنا بالمشغلين"}
            </h4>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col justify-center items-center gap-2">
              <Award className="w-6 h-6 text-[#FACC15]" />
              <p className="text-[10px] text-zinc-400 text-center font-bold arabic-text mb-1">
                {isEn 
                  ? "Certified diagnostic technicians trained to the highest technical & customer handling benchmarks." 
                  : "فريق من الفنيين والخبراء المحترفين والمدربين على أعلى معايير الجودة والكفاءة"}
              </p>
              <Link 
                to="/join" 
                className="text-[9px] text-[#FACC15] hover:underline font-black bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 text-center arabic-text block w-full"
              >
                {isEn ? "Careers Portal 🤝" : "بوابة التوظيف والاعتماد الفني 🤝"}
              </Link>
              <Link 
                to="/admin" 
                className="text-[9px] text-zinc-400 hover:text-[#FACC15] hover:underline font-black bg-zinc-900 px-2 py-1 rounded border border-zinc-800 text-center arabic-text block w-full mt-1.5"
              >
                {isEn ? "Secure Gateway Portal ⚙" : "لوحة المراقبة المالية ⚙"}
              </Link>
            </div>
          </div>

        </div>

        {/* Inner copyrights */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center justify-center gap-4 text-xs text-center w-full">
          <p className="arabic-text text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? `© 2026 Battery Express | Leading Vehicle Energy Diagnostics & Maintenance Services in Jeddah & Makkah. All rights reserved.`
              : `© 2026 بطارية إكسبرس (Battery Express) | الحلول الرائدة لفحص وصيانة طاقة المركبات في جدة ومكة المكرمة. جميع الحقوق محفوظة.`}
          </p>

          <div className="flex items-center justify-center gap-4 text-zinc-650">
            <span className="arabic-text text-[11px] text-zinc-600 block text-center">
              {isEn ? "Providing dealership batteries with maximum speed and minimum hassle" : "نوفر بطاريات وكالة خالية من العبء المالي"}
            </span>
          </div>
        </div>

        {/* --- Regulatory & Compliance Secondary Footer Base --- */}
        <div className="mt-10 pt-8 border-t border-zinc-900/90 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 bg-black">

          {/* Secure Payment System Icons (Mada, Apple Pay, Visa, Mastercard, STC Pay) */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            {/* mada */}
            <div className="h-7 px-2 bg-zinc-950 border border-zinc-900 rounded-md flex items-center gap-1 hover:border-zinc-800 transition-all cursor-default" title="Mada / مدى">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[8.5px] font-black tracking-wider text-zinc-300 font-sans uppercase">MADA / مدى</span>
            </div>

            {/* Apple Pay */}
            <div className="h-7 px-3 bg-white text-black border border-white hover:bg-neutral-200 transition-all cursor-default rounded-md flex items-center gap-1 shadow-[0_2px_10px_rgba(255,255,255,0.05)]" title="Apple Pay">
              <Apple className="w-3.5 h-3.5 text-black fill-black shrink-0" />
              <span className="text-[9px] font-black tracking-tighter font-sans uppercase">Pay</span>
            </div>

            {/* Visa */}
            <div className="h-7 px-2 bg-zinc-950 border border-zinc-900 rounded-md flex items-center hover:border-zinc-800 transition-all cursor-default" title="Visa">
              <span className="text-[8.5px] font-black italic tracking-widest text-[#1a1f71] leading-none bg-white/90 px-1 py-0.5 rounded-sm">VISA</span>
            </div>

            {/* MasterCard */}
            <div className="h-7 px-2 bg-zinc-950 border border-zinc-900 rounded-md flex items-center gap-1 hover:border-zinc-800 transition-all cursor-default" title="MasterCard">
              <div className="flex -space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500 block opacity-90" />
                <span className="w-2 h-2 rounded-full bg-amber-500 block opacity-90" />
              </div>
              <span className="text-[7.5px] font-bold text-zinc-400 font-sans">Card</span>
            </div>

            {/* STC Pay */}
            <div className="h-7 px-3 bg-[#4f008c]/25 border border-[#4f008c]/50 hover:border-[#4f008c]/90 rounded-md flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(79,0,140,0.4)] transition-all cursor-default" title="STC Pay / إس تي سي باي">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] animate-pulse shrink-0" />
              <span className="text-[9.5px] font-black tracking-tight text-white font-sans flex items-center gap-0.5">
                <span className="text-[#FF007F]">stc</span>
                <span className="text-[#4CE0D2]">pay</span>
              </span>
            </div>
          </div>

          {/* Policy interactive links */}
          <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
            <Link
              to="/warranty"
              className="hover:text-[#FACC15] hover:underline cursor-pointer transition-colors text-[11px] arabic-text font-black"
            >
              {isEn ? "Warranty Policy" : "سياسة الضمان"}
            </Link>
            <span className="text-zinc-850 select-none">|</span>
            <button
              onClick={() => setActivePolicy('refund')}
              className="hover:text-[#FACC15] hover:underline cursor-pointer transition-colors text-[11px] arabic-text"
            >
              {isEn ? "Refund & Returns" : "سياسة الاستبدال والاسترجاع والتعويض"}
            </button>
          </div>

        </div>

      </div>

      {/* Modal overlays for Policies */}
      <AnimatePresence>
        {activePolicy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActivePolicy(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0a0a0e] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative text-right shadow-2xl text-zinc-350"
              dir={isEn ? 'ltr' : 'rtl'}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePolicy(null)}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#FACC15]/40 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {activePolicy === 'warranty' ? (
                <div>
                  <div className="flex items-center gap-3 justify-start mb-6">
                    <span className="p-2.5 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-xl">
                      <Shield className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-white">{isEn ? "Warranty Terms & Policy" : "شروط وضوابط سياسة الضمان المعتمد"}</h3>
                      <span className="text-[10px] text-[#FACC15] font-black uppercase tracking-widest font-mono">AUTHORIZED BATTERY ROAD EMERGENCY METRIC</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans arabic-text">
                    <p className="text-zinc-400">
                      {isEn 
                        ? "Battery Express provides premium on-road diagnostic and installation warranty for all auto-battery products sold inside Jeddah province under strict SAMA alignment guidelines."
                        : "تلتزم مؤسسة بطارية إكسبرس (Battery Express) لخدمات طاقة وميكانيكا السيارات بتقديم خدمات الضمان الذهبي المعتمد وفق التشريعات المحلية بجدة لجميع البطاريات الموزعة عبر منافذنا الفورية."}
                    </p>

                    <h4 className="text-[#FACC15] font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "1. Warranty Period & Validation" : "١. مدة سريان الضمان والتحقق"}
                    </h4>
                    <p>
                      {isEn 
                        ? "Our premium batteries (including VARTA, Hankook, ACDelco, Exide, and Optima) are covered for a solid 12 to 18 months, varying by brand specification. The digital tax invoice distributed instantly via email or coordinator SMS serves as your primary certificate of validation."
                        : "تسري فترات الضمان الرسمي لمدة تتراوح بين ١٢ شهراً إلى ١٨ شهراً بحسب العلامة التجارية المختارة (مثل فارتا الألمانية، هانكوك، إيه سي ديلكو الذهبية، وغيرها). يُعد رقم الفاتورة الضريبية الرقمية المرسلة لجوالك بمثابة سند الضمان الرسمي والنهائي الفوري."}
                    </p>

                    <h4 className="text-[#FACC15] font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "2. Active Diagnostic & Replacements" : "٢. آلية الفحص الفني والاستبدال الفوري"}
                    </h4>
                    <p>
                      {isEn 
                        ? "In case of any power drop or engine ignition lag during the guarantee period, a technical specialist will be dispatched to your location in Jeddah within 25-45 minutes. We execute complete computational diagnostics using OBD2 terminal readers at no extra charge. If a manufacturer defect is confirmed, an identical battery will be unpacked and registered for your vehicle on the spot."
                        : "عند الاستدعاء لوجود ضعف بالطاقة أو مشاكل تشغيل خلال فترة سريان الضمان، يتم إيفاد أقرب فني فحص متنقل لموقع العميل في جدة خلال ٢٠ - ٣٥ دقيقة. نقوم بفحص البطارية والنمط الكهربائي للمركبة باستخدام أحدث أجهزة الفحص (OBD2 Analyzer)، وفي حال ثبوت وجود خلل تصنيعي بالبطارية، يتم استبدالها فوراً ببطارية وكالة جديدة دون تحميل العميل أي أعباء إضافية."}
                    </p>

                    <h4 className="text-red-400 font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "3. Warranty Exclusions" : "٣. الاستثناءات والحالات الخارجة عن الضمان"}
                    </h4>
                    <ul className="list-disc leading-relaxed justify-start text-zinc-400 pr-5 space-y-1">
                      {isEn ? (
                        <>
                          <li>Incidents of complete fluid evaporation due to engine charging alternator overload.</li>
                          <li>Physical damage to the plastic battery container, core terminals, or outer cell integrity.</li>
                          <li>Leaving vehicle ignition accessories active while the engine is stationary, causing deep discharge.</li>
                          <li>Transfers of the battery to an unauthorized vehicle model not registered on the tax invoice.</li>
                        </>
                      ) : (
                        <>
                          <li>تلف البطارية الناتج عن خلل في منظم شحن دينامو السيارة (Alternator Overcharging / Undercharging).</li>
                          <li>الأضرار المادية الناتجة عن الحوادث، الكسر الخارجي لجرم البطارية، أو التشويه المتعمد للأقطاب.</li>
                          <li>ترسب الأملاح أو التفريغ العميق الكلي الناتج عن ترك المصابيح أو مكيف السيارة قيد التشغيل والسيارة مطفأة بالكامل.</li>
                          <li>نقل البطارية وتركيبها على مركبة أخرى غير المسجلة تفاصيلها بفاتورة الشراء الضريبية المعتمدة.</li>
                        </>
                      )}
                    </ul>

                    <div className="pt-4 border-t border-zinc-900 mt-6 text-center text-zinc-500 text-[10px] font-mono">
                      {isEn 
                        ? "Verified SAMA-compliant electronic auto battery service platform • Jeddah, KSA"
                        : "موقع معتمد ومنظم للخدمات الفورية لبطاريات السيارات • جدة، المملكة العربية السعودية"}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 justify-start mb-6">
                    <span className="p-2.5 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-xl">
                      <Receipt className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-white">{isEn ? "Return & Refund Policy" : "سياسة الاستبدال والاسترجاع المالي"}</h3>
                      <span className="text-[10px] text-[#FACC15] font-black uppercase tracking-widest font-mono">SECURE TRANSACTION REVERSAL GUARANTEE</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans arabic-text">
                    <p className="text-zinc-400">
                      {isEn 
                        ? "At Battery Express, customer satisfaction is protected by clear micro-refund pathways. Our return policies comply with the Saudi Ministry of Commerce guidelines."
                        : "في منصة بطارية إكسبرس الفورية، رضا العميل وثقته هما ركيزتنا الأساسية. تخضع سياسة الاسترجاع والاستبدال لقوانين وزارة التجارة السعودية لحماية المستهلك والمعاملات الإلكترونية."}
                    </p>

                    <h4 className="text-[#FACC15] font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "1. Pre-Dispatch Safe Cancellation" : "١. إلغاء الطلب قبل تحرك المندوب وفني التركيب"}
                    </h4>
                    <p>
                      {isEn 
                        ? "You are empowered to cancel any prepaid order with immediate full refund, provided the technical dispatch crew has not departed on-road to your location. Once cancel verification is approved, 100% of the funds will be reversed directly."
                        : "يحق للعميل المطالبة بإلغاء الطلب واسترجاع كامل القيمة المالية المدفوعة مسبقاً إلكترونياً (عبر مدى أو أبل باي) مجاناً ودون أي خصومات، بشرط عدم تحرك فني الصيانة ومغادرته الفرع اللوجيستي وتلقيه إشعار المغادرة الميدانية."}
                    </p>

                    <h4 className="text-[#FACC15] font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "2. Installed Battery & Hardware Rules" : "٢. ضوابط إرجاع السلع بعد البدء بالتركيب"}
                    </h4>
                    <p>
                      {isEn 
                        ? "Due to safety specifications of chemical energy containers, batteries that have been unpacked, connected, or custom installed in the car are ineligible for return unless a genuine manufacturer defect is diagnosed in laboratory within the first 7 days."
                        : "نظراً لخصوصية السلع الكيميائية وحفاظاً على سلامة الطاقة للمركبات، لا يمكن إرجاع أو استبدال البطارية بعد إزالة غلاف الحماية وتركيبها الفعلي بالسيارة وتفعيل كهرليتها، إلا في حال رصد عيب مصنعي صريح ومعزز بالفحص الفني الشامل خلال أول ٧ أيام."}
                    </p>

                    <h4 className="text-[#FACC15] font-black text-xs sm:text-sm mt-4 uppercase">
                      {isEn ? "3. Refund Execution Timeframes" : "٣. الفترات الزمنية لإعادة القيد المالي للحساب"}
                    </h4>
                    <p>
                      {isEn 
                        ? "All approved refunds for online payments are triggered digitally through our Moyasar & Tap secure gateways. Refunds reflect back to: Mada / Apple Pay (24 to 72 business hours max) or credit mechanisms (3-5 banking days), depending on your institutional bank rules."
                        : "تتم معالجة كافة طلبات الاسترجاع المعتمدة إلكترونياً وبشكل مشفر وآمن عبر بوابة ميسر أو تاب، ويعاد قيد المبلغ تلقائياً على نفس وسيلة الدفع المستخدمة: مدى وبطاقات المحفظة أبل باي خلال (٢٤ إلى ٧٢ ساعة عمل)، وبطاقات الفيزا/ماستركارد خلال (٣ إلى ٥ أيام عمل) حسب سرعة تصفية البنك المصدر للبطاقة."}
                    </p>

                    <div className="pt-4 border-t border-zinc-900 mt-6 text-center text-zinc-500 text-[10px] font-mono">
                      {isEn 
                        ? "Secure refund protocol active • Battery Express Financial Division"
                        : "بروتوكول السداد الآمن مفعل • الإدارة المالية لبطارية إكسبرس"}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

import { WaveformDivider } from './components/WaveformDivider';

// --- PAGES LAYOUT ENGINE ---

const HomePage = () => {
  const [isRedAlert, setIsRedAlert] = useState(false);
  const { language, t } = useLanguage();

  return (
    <main className={`relative z-10 transition-all duration-1000 ${isRedAlert ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.35)]' : ''}`}>
      {/* Edge Clinical Red Glow Pulse Layer */}
      {isRedAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none z-[50] border-[20px] border-red-950/20"
          style={{
            boxShadow: 'inset 0 0 100px rgba(220, 38, 38, 0.45), 0 0 60px rgba(220, 38, 38, 0.3)',
          }}
        />
      )}

      {/* Top Hero Banner - Clean title and call actions with high luxury negative breathing space */}
      <Hero />
      
      <WaveformDivider flip={false} glowColor="yellow" />

      {/* Infinite loop marquee of global manufacturers */}
      <InteractiveBrandMarquee />

      <WaveformDivider flip={true} glowColor="yellow" />

      {/* Advanced AGM & EFB Smart Analytical feedback box - placed immediately under the marquee */}
      <TechnologyPromo />

      <WaveformDivider flip={false} glowColor="yellow" />

      {/* Heavy Machinery & Fleet Energy Section (Added under AGM/EFB section) */}
      <HeavyEquipmentPromo />

      <WaveformDivider flip={true} glowColor="yellow" />

      {/* Corporate & Fleet Solutions Section */}
      <CorporateFleetPromo />

      <WaveformDivider flip={false} glowColor="yellow" />

      {/* Interactive Map of Jeddah districts - shifted downwards to create comfortable visual breathing space */}
      <section className="bg-transparent py-8 sm:py-16" id="interactive-map-section">
        <InteractiveMapEngine />
      </section>

      <WaveformDivider flip={false} glowColor="cyan" />
      
      {/* Power Vault Multi-Step wizard layout */}
      <section id="power-vault-section" className="py-12 md:py-24 bg-gradient-to-b from-transparent to-[#050505]/60 text-right relative" dir={language === 'en' ? 'ltr' : 'rtl'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="battery-advisor text-center max-w-4xl mx-auto mb-16 px-4" dir={language === 'en' ? 'ltr' : 'rtl'}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 arabic-text tracking-tight leading-tight select-none">
              <span className="text-white">{t('advisorTitle1')}</span>
              <span className="text-[#FFCC00] drop-shadow-[0_0_15px_rgba(255,204,0,0.35)]">{t('advisorTitle2')}</span>
            </h2>
            <p className="text-[#A0A0A0] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto arabic-text font-medium">
              {t('advisorDesc1')}<strong className="text-white font-extrabold">{t('advisorBatterySize')}</strong>{t('advisorDesc2')}<strong className="text-white font-extrabold">{t('advisorBrand')}</strong>{t('advisorDesc3')}<strong className="text-[#FFCC00] font-extrabold">{t('advisorDelivery')}</strong>{t('advisorDesc4')}
            </p>
          </section>

          {/* Integrated Power Vault Selector component */}
          <PowerVaultWizard 
            onDiagnosticComplete={() => setIsRedAlert(true)}
            onReset={() => setIsRedAlert(false)}
          />

          {/* RED ALERT SYSTEM WARNER MODULE */}
          <AnimatePresence>
            {isRedAlert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="mt-12 p-8 border border-red-500/40 bg-zinc-950/95 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4"
              >
                {/* Visual Ambient Pulse Core Red Light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-650/10 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                    filter: ["drop-shadow(0 0 10px rgba(239,68,68,0.4))", "drop-shadow(0 0 30px rgba(239,68,68,0.95))", "drop-shadow(0 0 10px rgba(239,68,68,0.4))"] 
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none select-none flex justify-center items-center"
                >
                  <img 
                    src="https://i.ibb.co/7N0qkDLg/battery-icon.webp" 
                    alt="أيقونة تحذير بطارية السيارة" 
                    className="w-28 h-28 object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <h4 className="text-lg sm:text-xl font-black text-red-500 uppercase tracking-widest leading-none font-mono">
                  {t('redAlertTitle')}
                </h4>

                <p className="text-base sm:text-lg font-black text-red-400/95 max-w-2xl leading-relaxed arabic-text">
                  {t('redAlertDesc')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <WaveformDivider flip={false} glowColor="yellow" />

      <ReviewsSection />

      <WaveformDivider flip={false} glowColor="yellow" />

      <CustomQuoteRequest />
    </main>
  );
};

const PricesPage = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <main className="relative z-10 pt-20 bg-black">
      {/* Dynamic Gold-Glow Header Shield */}
      <div className="bg-gradient-to-b from-[#080a0f] to-[#030508] border-b border-zinc-900/40 py-10" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-right relative">
          <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block opacity-10 pointer-events-none">
            <Shield className="w-40 h-40 text-yellow-500" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/5 border border-yellow-400/20 rounded-full mb-3 text-xs tracking-wider text-[#FACC15] font-black uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
            <span>{isEn ? "UNIFIED FLAGSHIP CATALOG" : "التسعير الموحد والكتالوج الشامل الفوري بجدة ومكة"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white italic tracking-tight mb-3">
            {isEn ? "Pricing Catalog & Premium Spec Sheets" : "أسعار بطاريات السيارات والكتالوج الشامل"}
          </h1>
          
          <p className="text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed arabic-text">
            {isEn ? (
              "Welcome to our central verified billing platform. Explore our high-definition ACDelco spec sheets from 40Ah to 105Ah, as well as our complete database of 200+ models from premium Global brands with 24/7 hyper-dispatch mobile installation."
            ) : (
              "مرحباً بك في المنصة المعتمدة الموحدة لبطارية إكسبرس بجدة ومكة. استعرض مصفوفة بطاريات ايسي ديلكو المتميزة بجميع مقاساتها من 40 إلى 105 أمبير، متبوعة بالكتالوج العام الشامل لـ 200 موديل عالمي فوري يشمل كافة العلامات التجارية مع الفحص والتوصيل دقيقة بدقيقة."
            )}
          </p>

          {/* Quick jump navigation tag */}
          <div className="mt-6 flex flex-wrap gap-2.5 justify-center sm:justify-start">
            <a 
              href="#acdelco-premium-view"
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-[#FACC15] hover:opacity-90 text-black font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_4px_12px_rgba(250,204,21,0.2)]"
            >
              <Award className="w-3.5 h-3.5 text-black" />
              <span>{isEn ? "ACDelco Premium (40-105Ah)" : "قسم ايسي ديلكو الفاخر (40-105Ah)"}</span>
            </a>
            <a 
              href="#catalog-section"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>{isEn ? "All 200 Brands Database" : "الكتالوج الشامل (فارتا وهانكوك الخ...)"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: Featured ACDelco Premium Spec Sheets Grid (40Ah to 105Ah) */}
      <div className="relative">
        <AcdelcoCatalog />
      </div>

      {/* Decorative Waveform Neon Energy Line dividing catalog components */}
      <WaveformDivider flip={false} glowColor="yellow" />

      {/* SECTION 2: Complete 200 Brands Catalog & Interactive Search Engine */}
      <div className="relative bg-[#020305]">
        <ProductGrid />
      </div>

      <CustomQuoteRequest />
    </main>
  );
};

function LiveDispatchTicker() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const { language } = useLanguage();

  useEffect(() => {
    // Generate the initial message immediately
    setCurrentMessage(generateLiveDispatchMessage(language));

    let timeoutId: NodeJS.Timeout;

    const scheduleNextMsg = () => {
      // Pick a random interval between 7 and 15 seconds
      const randomDelay = Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000;
      
      timeoutId = setTimeout(() => {
        setCurrentMessage(generateLiveDispatchMessage(language));
        scheduleNextMsg(); // Re-schedule recursively
      }, randomDelay);
    };

    scheduleNextMsg();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [language]);

  if (!currentMessage) return null;

  return (
    <div className="fixed bottom-8 sm:bottom-[36px] left-1/2 -translate-x-1/2 z-[60] pointer-events-none max-w-sm w-[calc(100vw-1.5rem)] md:max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="bg-black/95 border border-yellow-500/30 shadow-[0_4px_25px_rgba(250,204,21,0.18)] rounded-xl py-1 px-3 flex items-center gap-2 pointer-events-auto select-none backdrop-blur-md relative"
        >
          {/* Symmetrical Left Column: Floating WhatsApp Button */}
          <div className="w-12 shrink-0 flex flex-col items-center justify-end relative h-9 pb-1 ml-1.5">
            {/* WhatsApp Badge floating half above, half inside the ticker */}
            <div className="absolute top-0 -translate-y-[calc(50%+12px)] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("أهلاً بك في بطارية إكسبرس! ⚡️ نحن هنا لخدمتك ومساعدتك في حل مشكلة بطارية سيارتك بأسرع وقت. كيف يمكننا مساعدتك اليوم؟ يرجى تزويدنا بتفاصيل سيارتك وسنكون عندك فوراً.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 transition-all duration-200 flex items-center justify-center select-none cursor-pointer group border border-emerald-500/40 shadow-lg animate-bounce"
                title={language === 'en' ? "Contact WhatsApp" : "تواصل عبر الواتساب"}
              >
                <div className="relative flex items-center justify-center">
                  <svg className="w-5.5 h-5.5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>

                {/* Premium hover tooltip */}
                <span className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/95 border border-emerald-500/35 text-white text-[9.5px] font-black py-1.5 px-3 rounded-xl opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap font-sans shadow-[0_4px_15px_rgba(0,0,0,0.85)] flex items-center gap-1.5 z-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {language === 'en' ? "WhatsApp Chat" : "دردشة واتساب الفورية ⚡"}
                </span>
              </a>
            </div>

            {/* Pulsing Green Active State light placed directly under the WhatsApp Button */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex items-center justify-center relative mt-4">
              <span className="absolute -inset-1 rounded-full bg-emerald-400/50 animate-ping" />
              <span className="w-1 h-1 rounded-full bg-emerald-300 block" />
            </div>
          </div>

          <div className={`flex-1 min-w-0 pr-1 ${language === 'en' ? 'text-left pl-1.5' : 'text-right'}`}>
            <span className="text-[8px] text-zinc-500 block uppercase font-mono font-black tracking-widest leading-none mb-0.5">
              {language === 'en' ? "LIVE DISPATCH • RADAR TRANS" : "LIVE DISPATCH • بث حي"}
            </span>
            <p className="text-[10px] md:text-xs font-semibold text-[#E4E4E5] arabic-text leading-tight line-clamp-2 overflow-hidden text-ellipsis">
              {currentMessage}
            </p>
          </div>

          {/* Symmetrical Right Column: Floating Red Alarm Button */}
          <div className="w-12 shrink-0 flex flex-col items-center justify-end relative h-9 pb-1 mr-1.5">
            {/* Red Protection Badge floating half above, half inside the ticker */}
            <div className="absolute top-0 -translate-y-[calc(50%+12px)] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <button
                onClick={() => window.dispatchEvent(new Event('open-emergency-radar'))}
                className="relative w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-200 flex items-center justify-center select-none cursor-pointer group border border-red-500/40 shadow-lg animate-pulse"
                title={language === 'en' ? "Digital Emergency Radar" : "رادار الطوارئ الرقمي بجدة"}
              >
                <div className="relative flex items-center justify-center">
                  <ShieldAlert className="w-4.5 h-4.5 text-white relative z-10" />
                </div>

                {/* Premium Arabic/English hover tooltip */}
                <span className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/95 border border-red-500/35 text-white text-[9.5px] font-black py-1.5 px-3 rounded-xl opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap font-sans shadow-[0_4px_15px_rgba(0,0,0,0.85)] flex items-center gap-1.5 z-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {language === 'en' ? "Press for Immediate Support ⚡" : "اضغط للاستغاثة الفورية بجدة ⚡"}
                </span>
              </button>
            </div>

            {/* Pulsing Active State red light placed directly under the Shield Button */}
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex items-center justify-center relative mt-4">
              <span className="absolute -inset-1 rounded-full bg-red-400/50 animate-ping" />
              <span className="w-1 h-1 rounded-full bg-red-300 block" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- MAIN ENSEMBLER ENTRY ---

export default function App() {
  const [isPortalUnlocked, setIsPortalUnlocked] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <BrowserRouter>
      <CheckoutContext.Provider value={{ selectedProduct, setSelectedProduct }}>
        <LanguageProvider>
        <motion.div 
          animate={isShaking ? {
            x: [-6, 6, -4, 4, -2, 2, -1, 1, 0],
            y: [-4, 4, -6, 6, -3, 3, -1, 1, 0],
          } : {}}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="min-h-screen font-sans text-white/90 selection:bg-[#FACC15] selection:text-black relative"
          style={{ zIndex: 0 }}
        >
          {/* Underlay pure deep black background layer strictly under the stars canvas */}
          <div className="absolute inset-0 bg-black -z-[10] pointer-events-none" />
          
          {/* Kinetic electric particle energy background system */}
          <KineticBackground />

          {/* Dynamic header navbar navigation */}
          <Navbar />
          
          {/* Routing dispatcher */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<SeoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/express" element={<ExpressDesignPage />} />
            <Route path="/join" element={<JoinPartnersPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/warranty" element={<WarrantyPage />} />
          </Routes>
          
          {/* Underlay standard footer details */}
          <Footer />

          {/* Interactive glowing real-time battery cell scroll progress indicator */}
          <KineticBatteryScroll />

          {/* Bulletproof emergency locator and dispatch radar ripple HUD indicator */}
          <HyperDispatchButton />

          {/* Live dynamic rescue dispatch feed */}
          <LiveDispatchTicker />
          
        </motion.div>
      </LanguageProvider>
      </CheckoutContext.Provider>
    </BrowserRouter>
  );
}
