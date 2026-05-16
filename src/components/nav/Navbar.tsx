import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, FileDown, Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

const sections = ['home', 'about', 'projects', 'certifications', 'techstack', 'work', 'contact'] as const;

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const t = content[lang];
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => observersRef.current.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={visible ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        // تعديل ارتفاع الشريط ليكون أنيقاً ومتناسقاً
        className={`fixed top-0 left-0 right-0 z-[9999] flex items-center transition-all duration-300 ${
          scrolled ? 'bg-space-navy/90 backdrop-blur-md shadow-lg h-16' : 'bg-transparent h-20'
        }`}
        aria-label="Main navigation"
      >
        {/* حاوية جديدة تمتد على عرض الشاشة بالكامل مع مساحات جانبية ممتازة */}
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* الجزء الأيسر: الشعار + الروابط (مع مسافة فاصلة إجبارية لمنع التراص) */}
          <div className="flex items-center gap-12 lg:gap-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="focus-visible:ring-2 focus-visible:ring-space-cyan rounded shrink-0 transition-transform duration-300 hover:scale-105"
              aria-label="Go to home"
            >
              <img 
                src="/favicon0-3.png" 
                alt="HM Logo" 
                className="h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]" 
              />
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {sections.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`font-orbitron text-[13px] xl:text-[14px] font-semibold uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-space-cyan rounded relative group hover:-translate-y-1 hover:scale-105 hover:text-space-cyan hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] ${
                    activeSection === id ? 'text-space-cyan drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]' : 'text-space-ice/70'
                  }`}
                >
                  {t.navLinks[id as keyof typeof t.navLinks]}
                  
                  {activeSection === id && (
                     <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-space-cyan rounded-full" />
                  )}

                  {activeSection !== id && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-space-cyan/60 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* الجزء الأيمن: الأيقونات وأزرار التحكم */}
          <div className="flex items-center gap-3 shrink-0">
            {/* زر اللغة */}
            <button
              onClick={toggleLang}
              className="p-2 text-space-ice/70 hover:text-space-cyan transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
            </button>
            
            {/* أيقونة لينكدإن */}
            <a
              href="https://linkedin.com/in/huthaifamahmoud"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block p-2 text-space-ice/70 hover:text-space-cyan transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            {/* أيقونة جيت هب */}
            <a
              href="https://github.com/d-xdv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block p-2 text-space-ice/70 hover:text-space-cyan transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            
            {/* زر تحميل السيرة الذاتية My CV */}
            <a
              href="/cv.pdf"
              download="Huthaifa_Mahmoud_CV.pdf"
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-space-cyan/10 border border-space-cyan/50 text-space-cyan rounded-lg transition-all duration-300 hover:bg-space-cyan hover:text-space-dark hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] font-orbitron text-xs font-bold tracking-wide shadow-[0_0_10px_rgba(0,191,255,0.1)]"
              aria-label="Download CV"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              {t.downloadCV}
            </a>
            
            {/* زر القائمة للجوال */}
            <button
              className="lg:hidden p-2 text-space-cyan hover:bg-space-cyan/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-space-cyan to-space-blue origin-left w-full"
          style={{ scaleX: progress }}
        />
      </motion.nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[9998]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-72 bg-space-navy z-[9999] flex flex-col p-6 border-l border-space-blue/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-orbitron font-bold text-2xl glow-text">HM.</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-space-ice/70 hover:text-white bg-space-dark/50 p-2 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {sections.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`font-orbitron text-sm font-semibold uppercase tracking-widest text-left py-3 border-b border-space-blue/30 transition-colors ${
                      activeSection === id ? 'text-space-cyan' : 'text-space-ice/70 hover:text-space-ice'
                    }`}
                  >
                    {t.navLinks[id as keyof typeof t.navLinks]}
                  </button>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                 <div className="flex gap-4 justify-center mb-4">
                   <a href="https://linkedin.com/in/huthaifamahmoud" target="_blank" rel="noreferrer" className="text-space-ice/70 hover:text-space-cyan"><Linkedin className="w-6 h-6" /></a>
                   <a href="https://github.com/d-xdv" target="_blank" rel="noreferrer" className="text-space-ice/70 hover:text-space-cyan"><Github className="w-6 h-6" /></a>
                 </div>
                <a href="/cv.pdf" download="Huthaifa_Mahmoud_CV.pdf" className="flex items-center justify-center gap-2 px-5 py-3 bg-space-cyan/10 border border-space-cyan/50 text-space-cyan rounded-lg hover:bg-space-cyan hover:text-space-dark transition-all duration-300 font-orbitron font-bold">
                  <FileDown className="w-5 h-5" aria-hidden="true" />
                  {t.downloadCV}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}