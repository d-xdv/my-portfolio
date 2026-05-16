import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu, ChevronDown, GraduationCap, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = content[lang];
  const typed = useTypewriter(t.subtitles);

  const stats = t.stats;

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 pb-24"
    >
      {/* Background planet decoration */}
      <div
        className="absolute left-0 top-1/4 w-72 h-72 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center gap-6">
        {/* Icon row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center gap-6"
        >
          <Brain className="w-8 h-8 text-space-cyan" aria-hidden="true" />
          <Code className="w-8 h-8 text-space-lava" aria-hidden="true" />
          <Cpu className="w-8 h-8 text-space-ice" aria-hidden="true" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="font-orbitron font-bold glow-text leading-tight"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 4.5rem)' }}
        >
          {t.name}
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="h-8 flex items-center"
        >
          <span className="font-orbitron text-space-cyan text-base md:text-lg font-semibold">
            {typed}
            <span className="animate-pulse text-space-cyan">|</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-space-ice/80 text-base md:text-lg max-w-3xl leading-relaxed"
        >
          {t.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button onClick={() => scrollTo('projects')} className="btn-primary">
            <Code className="w-4 h-4" aria-hidden="true" />
            {t.cta.projects}
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-space-lava text-space-lava font-orbitron font-semibold text-xs uppercase tracking-wider transition-all hover:bg-space-lava/10 hover:shadow-[0_0_15px_rgba(255,69,0,0.3)] focus-visible:ring-2 focus-visible:ring-space-lava"
          >
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            {t.cta.certs}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-space-cyan text-space-cyan font-orbitron font-semibold text-xs uppercase tracking-wider transition-all hover:bg-space-cyan/10 hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] focus-visible:ring-2 focus-visible:ring-space-cyan"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            {t.cta.contact}
          </button>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
              className="card-glow text-center py-4"
            >
              <div className="font-orbitron font-bold text-space-cyan text-xl md:text-2xl">
                {stat.value}
              </div>
              <div className="text-space-ice/70 text-xs mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          onClick={() => scrollTo('about')}
          className="mt-4 text-space-ice/50 hover:text-space-cyan transition-colors animate-bounce focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
          aria-label="Scroll to About section"
        >
          <ChevronDown className="w-7 h-7" />
        </motion.button>
      </div>
    </section>
  );
}
