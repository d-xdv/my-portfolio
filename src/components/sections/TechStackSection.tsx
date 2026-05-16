import { motion } from 'framer-motion';
import { Cpu, Code, Wrench, Database, GitBranch, Cloud } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

const techCategories = [
  {
    icon: Cpu,
    label: 'AI & Machine Learning',
    tags: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision', 'Regression Modeling', 'Neural Networks', 'CNN'],
    color: 'text-space-cyan',
  },
  {
    icon: Code,
    label: 'Programming Languages',
    tags: ['Python', 'Java', 'C'],
    color: 'text-space-lava',
  },
  {
    icon: Wrench,
    label: 'Frameworks & Tools',
    tags: ['VS Code', 'PyTorch', 'Microsoft 365', 'Git'],
    color: 'text-space-ice',
  },
  {
    icon: Database,
    label: 'Data Science',
    tags: ['Power BI', 'Data Analysis', 'Statistics', 'Data Visualization'],
    color: 'text-green-400',
  },
  {
    icon: GitBranch,
    label: 'CS Concepts',
    tags: ['OOP', 'Networking Fundamentals', 'Verilog (HDL)', 'File I/O', 'Data Structures'],
    color: 'text-yellow-400',
  },
  {
    icon: Cloud,
    label: 'Cloud & Security',
    tags: ['AWS Cloud Foundations', 'Cybersecurity Fundamentals'],
    color: 'text-orange-400',
  },
];

const softSkills = [
  'Quick Learner',
  'Adaptable',
  'Keen Eye for Detail',
  'Flexible',
  'Strong Communication',
  'Expert Problem Solver',
  'Collaborative Team Player',
  'Excellent Time Management',
];

export default function TechStackSection() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="techstack" className="py-24 px-4 relative">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(0,206,209,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t.sections.techstack}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow !p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className={`w-4 h-4 ${cat.color}`} aria-hidden="true" />
                <span className={`font-orbitron font-semibold text-xs ${cat.color}`}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-space-blue/30 border border-space-cyan/20 text-space-ice/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-glow"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="font-orbitron font-semibold text-xs text-space-cyan">Soft Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full bg-space-navy border border-space-cyan/30 text-space-ice/80 hover:border-space-cyan/60 hover:text-space-cyan transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
