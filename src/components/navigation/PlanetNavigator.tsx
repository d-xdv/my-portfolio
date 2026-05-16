import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const planets = [
  // 1. Mercury (عطارد)
  { section: 'home', label: 'Home Base', imgSrc: '/planet-1.png', color: '#b6b064' },
  // 2. Venus (الزهرة)
  { section: 'about', label: 'About Me', imgSrc: '/planet-2.png', color: '#FFA500' },
  // 3. Earth (الأرض)
  { section: 'projects', label: 'My Projects', imgSrc: '/planet-3.png', color: '#00BFFF' },
  // 4. Mars (المريخ)
  { section: 'certifications', label: 'Certifications', imgSrc: '/planet-4.png', color: '#cd965c' },
  // 5. Jupiter (المشتري)
  { section: 'techstack', label: 'Tech Arsenal', imgSrc: '/planet-5.png', color: '#b99c61' },
  // 6. Saturn (زحل)
  { section: 'work', label: 'Work With Me', imgSrc: '/planet-6.png', color: '#ffc383' },
  // 7. Uranus (أورانوس)
  { section: 'contact', label: 'Contact', imgSrc: '/planet-7.png', color: '#acfdfd' },
];

export default function PlanetNavigator() {
  const [active, setActive] = useState(0);
  const [tooltip, setTooltip] = useState<number | null>(null);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    planets.forEach((p, i) => {
      const el = document.getElementById(p.section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => observersRef.current.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigatePrev = () => {
    const prev = Math.max(0, active - 1);
    scrollTo(planets[prev].section);
  };

  const navigateNext = () => {
    const next = Math.min(planets.length - 1, active + 1);
    scrollTo(planets[next].section);
  };

  return (
    <>
      {/* Desktop — right fixed */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-5">
        <button
          onClick={navigatePrev}
          className="p-1.5 text-space-ice/50 hover:text-space-cyan transition-colors"
          aria-label="Previous section"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {planets.map((p, i) => (
          <div key={p.section} className="relative flex items-center">
            <button
              onClick={() => scrollTo(p.section)}
              onMouseEnter={() => setTooltip(i)}
              onMouseLeave={() => setTooltip(null)}
              className="transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-space-cyan rounded-full"
              aria-label={`Go to ${p.label}`}
            >
              <motion.div
                animate={
                  active === i
                    ? { scale: 1.4, filter: `drop-shadow(0 0 10px ${p.color})` }
                    : { scale: 1, filter: 'none' }
                }
                transition={{ duration: 0.3 }}
                className="w-12 h-12 flex items-center justify-center" // تم تكبير حجم الحاوية هنا
              >
                {/* تم استبدال الإيموجي بصورة */}
                <img src={p.imgSrc} alt={p.label} className="w-full h-full object-contain drop-shadow-md" />
              </motion.div>
            </button>

            {tooltip === i && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 whitespace-nowrap bg-space-navy border border-space-cyan/30 rounded px-3 py-1.5 text-sm font-orbitron text-space-cyan"
              >
                {p.label}
              </motion.div>
            )}
          </div>
        ))}

        <button
          onClick={navigateNext}
          className="p-1.5 text-space-ice/50 hover:text-space-cyan transition-colors"
          aria-label="Next section"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile — bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-space-navy/90 backdrop-blur-md border-t border-space-blue/30 flex items-center justify-center gap-4 px-4 py-3">
        {planets.map((p, i) => (
          <button
            key={p.section}
            onClick={() => scrollTo(p.section)}
            className="flex flex-col items-center gap-1 focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
            aria-label={p.label}
          >
            <motion.div
              animate={active === i ? { scale: 1.3 } : { scale: 1 }}
              className="w-8 h-8" // حجم مناسب للجوال
            >
              <img src={p.imgSrc} alt={p.label} className="w-full h-full object-contain" />
            </motion.div>
            {active === i && (
              <span className="w-1.5 h-1.5 rounded-full bg-space-cyan" />
            )}
          </button>
        ))}
      </div>
    </>
  );
}