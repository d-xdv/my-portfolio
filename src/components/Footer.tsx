import { Linkedin, Github, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer className="border-t border-space-blue/30 py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/huthaifamahmoud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-space-ice/50 hover:text-space-cyan transition-colors focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/d-xdv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-space-ice/50 hover:text-space-cyan transition-colors focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:huthaifamahmoud@outlook.com"
            className="p-2 text-space-ice/50 hover:text-space-cyan transition-colors focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="font-orbitron text-xs text-space-ice/40">{t.footer}</div>
        <div className="text-xs text-space-ice/30">{t.footerBuilt}</div>
      </div>
    </footer>
  );
}
