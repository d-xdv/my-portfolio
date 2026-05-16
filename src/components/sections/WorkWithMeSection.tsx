import { motion } from 'framer-motion';
import { Brain, Code, BarChart2, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

const services = [
  {
    icon: Brain,
    title: 'AI/ML Development',
    desc: 'Custom ML models, deep learning pipelines, computer vision solutions.',
    gradient: 'from-cyan-600 to-blue-700',
  },
  {
    icon: Code,
    title: 'Python Development',
    desc: 'Scripting, automation, data processing, and algorithm implementation.',
    gradient: 'from-blue-500 to-sky-700',
  },
  {
    icon: BarChart2,
    title: 'Data Analysis',
    desc: 'Data preprocessing, visualization, and statistical analysis.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Users,
    title: 'Collaboration',
    desc: 'Open to internships, research projects, and team collaborations.',
    gradient: 'from-green-500 to-teal-600',
  },
];

export default function WorkWithMeSection() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="work" className="py-24 px-4 relative">
      <div
        className="absolute right-0 top-1/4 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="section-title">{t.sections.work}</h2>
          <div className="section-divider" />
          <p className="text-space-ice/60 text-sm max-w-2xl mx-auto">{t.workIntro}</p>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center my-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 animate-pulse-slow">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-orbitron text-xs text-green-400 font-semibold">
              Open to Internships & Opportunities
            </span>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glow group flex flex-col gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
              >
                <service.icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-white text-xs mb-2 group-hover:text-space-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-space-ice/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
