import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = content[lang];

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('sending');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c81a53d8-5561-4028-85b7-c2f6312ad017",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 pb-32 relative">
      <div
        className="absolute right-0 bottom-1/3 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(139,69,19,0.05) 0%, transparent 70%)',
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
          <h2 className="section-title">{t.sections.contact}</h2>
          <div className="section-divider" />
          <p className="text-space-ice/60 text-sm max-w-2xl mx-auto">{t.contactIntro}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Left — contact info */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-glow"
            >
              <h3 className="font-orbitron font-bold text-white text-sm mb-5">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:huthaifamahmoud@outlook.com"
                  className="flex items-center gap-3 text-space-ice/80 hover:text-space-cyan transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-space-blue/40 group-hover:bg-space-cyan/10 transition-colors">
                    <Mail className="w-4 h-4 text-space-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-orbitron text-space-ice/50 uppercase tracking-wider">Email</div>
                    <div className="text-sm">huthaifamahmoud@outlook.com</div>
                  </div>
                </a>
                <a
                  href="tel:+966503360842"
                  className="flex items-center gap-3 text-space-ice/80 hover:text-space-cyan transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-space-blue/40 group-hover:bg-space-cyan/10 transition-colors">
                    <Phone className="w-4 h-4 text-space-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-orbitron text-space-ice/50 uppercase tracking-wider">Phone</div>
                    <div className="text-sm">+966 503 360 842</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-space-ice/80">
                  <div className="p-2 rounded-lg bg-space-blue/40">
                    <MapPin className="w-4 h-4 text-space-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[10px] font-orbitron text-space-ice/50 uppercase tracking-wider">Location</div>
                    <div className="text-sm">Saudi Arabia</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="card-glow"
            >
              <h3 className="font-orbitron font-bold text-white text-sm mb-4">Connect With Me</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://linkedin.com/in/huthaifamahmoud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-space-ice/80 hover:text-space-cyan transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-space-cyan" aria-hidden="true" />
                  <span className="text-sm">linkedin.com/in/huthaifamahmoud</span>
                </a>
                <a
                  href="https://github.com/d-xdv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-space-ice/80 hover:text-space-cyan transition-colors group"
                >
                  <Github className="w-4 h-4 text-space-cyan" aria-hidden="true" />
                  <span className="text-sm">GitHub Profile</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glow"
          >
            <h3 className="font-orbitron font-bold text-white text-sm mb-5">Send a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-space-navy border border-space-blue/60 text-space-ice/90 placeholder-space-ice/30 text-sm focus:outline-none focus:border-space-cyan/60 focus:ring-1 focus:ring-space-cyan/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-space-navy border border-space-blue/60 text-space-ice/90 placeholder-space-ice/30 text-sm focus:outline-none focus:border-space-cyan/60 focus:ring-1 focus:ring-space-cyan/30 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  className="w-full px-3 py-2.5 rounded-lg bg-space-navy border border-space-blue/60 text-space-ice/90 placeholder-space-ice/30 text-sm focus:outline-none focus:border-space-cyan/60 focus:ring-1 focus:ring-space-cyan/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-space-navy border border-space-blue/60 text-space-ice/90 placeholder-space-ice/30 text-sm focus:outline-none focus:border-space-cyan/60 focus:ring-1 focus:ring-space-cyan/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {status === 'sending' ? t.sending : t.sendMessage}
              </button>

              <div
                aria-live="polite"
                className={`text-xs font-medium text-center transition-opacity ${
                  status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'opacity-0'
                }`}
              >
                {status === 'success' ? t.messageSent : status === 'error' ? t.messageError : ' '}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
