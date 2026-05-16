import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';
import { certifications } from '../../data/certifications';

const summaryStats = [
  { value: '20+', label: 'Total Certifications', icon: '🧠' },
  { value: '10+', label: 'Institutions', icon: '🏛️' },
  { value: '2024–2026', label: 'Active Learning', icon: '📅' },
  { value: '5', label: 'Specializations', icon: '🎯' },
];

export default function CertificationsSection() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? certifications : certifications.slice(0, 6);

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div
        className="absolute right-0 top-1/4 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(255,69,0,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">{t.sections.certifications}</h2>
          <div className="section-divider" />
          <p className="text-space-ice/60 text-sm max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications in AI, Machine Learning, Cloud
            Computing, and Data Science from world-leading institutions.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-10">
          {summaryStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="card-glow text-center py-4"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-orbitron font-bold text-space-cyan text-lg">{s.value}</div>
              <div className="text-space-ice/60 text-xs mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence initial={false}>
            {displayed.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="card-glow group flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${cert.gradient} bg-opacity-20`}>
                    <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-orbitron text-space-ice/50 font-medium mt-1">
                    {cert.month} {cert.year}
                  </span>
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-xs leading-snug mb-1 group-hover:text-space-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-space-cyan text-xs font-semibold">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => setShowAll((s) => !s)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-space-cyan/30 text-space-cyan font-orbitron font-semibold text-xs uppercase tracking-wider hover:bg-space-cyan/10 hover:border-space-cyan/60 transition-all focus-visible:ring-2 focus-visible:ring-space-cyan"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                {t.showLess}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
                {t.showAll} ({certifications.length})
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
