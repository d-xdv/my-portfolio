import { motion } from 'framer-motion';
import { GraduationCap, Brain, Cloud, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const highlights = [
  { icon: GraduationCap, label: 'GPA 4.6 / 5.0', sub: 'King Khalid University', color: 'text-space-cyan' },
  { icon: Brain, label: 'AI Specialization', sub: 'Deep Learning & CV', color: 'text-space-lava' },
  { icon: Cloud, label: 'AWS Certified', sub: 'Cloud Foundations', color: 'text-space-ice' },
];

export default function AboutSection() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Decoration */}
      <div
        className="absolute right-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(135,206,235,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t.sections.about}</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card-glow flex items-center gap-4"
            >
              <div className={`p-2.5 rounded-lg bg-space-blue/40 ${h.color}`}>
                <h.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="font-orbitron font-bold text-sm text-white">{h.label}</div>
                <div className="text-space-ice/60 text-xs mt-0.5">{h.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-glow mb-8"
        >
          <p className="text-space-ice/80 leading-relaxed text-base">{t.aboutBio}</p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-space-blue/40 text-space-cyan">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm">Education</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-white">Bachelor of Computer Engineering</div>
              <div className="text-space-cyan font-medium">King Khalid University</div>
              <div className="text-space-ice/60">Abha, Saudi Arabia</div>
              <div className="text-space-ice/60">2023 – 2028</div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-space-cyan/10 border border-space-cyan/30 text-space-cyan font-orbitron text-xs font-bold">
                GPA: 4.6 / 5.0
              </div>
            </div>
          </motion.div>

          {/* Professional summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-space-blue/40 text-space-lava">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm">Professional Profile</h3>
            </div>
            <div className="space-y-3 text-sm text-space-ice/80">
              <p>
                Motivated Computer Engineering student in my third year with a strong foundation in AI,
                software development, and programming. Proficient in Python, Java, and C.
              </p>
              <p>
                Hands-on experience building intelligent systems and solving complex computational problems.
                Complementary knowledge in networking principles.
              </p>
              <div className="pt-2 border-t border-space-blue/30 flex flex-col gap-1.5">
                <div>
                  <span className="text-space-cyan font-semibold">Seeking: </span>
                  Internship or entry-level engineering opportunity
                </div>
                <div>
                  <span className="text-space-cyan font-semibold">Languages: </span>
                  Arabic (Native), English (Professional)
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
