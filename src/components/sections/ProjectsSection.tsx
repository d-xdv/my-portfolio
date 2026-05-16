import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';
import { projects } from '../../data/projects';

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Decoration */}
      <div
        className="absolute left-0 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(85,85,85,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
          <h2 className="section-title">{t.sections.projects}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glow flex flex-col group overflow-hidden"
            >
              {/* Cover */}
              <div
                className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 flex items-center justify-center text-5xl relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10">{project.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="font-orbitron font-bold text-white text-sm mb-2 group-hover:text-space-cyan transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-space-ice/70 text-sm leading-relaxed mb-3 line-clamp-3">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1 mb-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-space-ice/60">
                    <span className="text-space-cyan mt-0.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-space-blue/30 border border-space-cyan/20 text-space-ice/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center gap-3 pt-3 border-t border-space-blue/30">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-space-ice/70 hover:text-space-cyan transition-colors"
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    GitHub
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-space-ice/30">
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    Private
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-xs text-space-cyan hover:text-white transition-colors"
                  >
                    Demo <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
