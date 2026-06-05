import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, ArrowRight } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rudranaresh2018@gmail.com',
    href: 'mailto:rudranaresh2018@gmail.com',
    color: '#818cf8',
    description: 'Best for opportunities & collabs',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/rudranaresh0201',
    href: 'https://github.com/rudranaresh0201',
    color: '#22d3ee',
    description: 'See all my open-source work',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'rudra-naresh-790751321',
    href: 'https://linkedin.com/in/rudra-naresh-790751321',
    color: '#a78bfa',
    description: 'Connect professionally',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9167563916',
    href: 'tel:+919167563916',
    color: '#34d399',
    description: 'Available on WhatsApp',
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="section-label mb-3">05. contact</p>
          <h2
            className="font-black tracking-tight text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
            Open to internship opportunities, research collaborations, or just a good
            conversation about AI, embedded systems, or anything in between.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {CONTACT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== 'Phone' && item.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl p-5 flex items-start gap-4 group glow-border transition-all duration-250"
                style={{ textDecoration: 'none' }}
                whileHover={{ y: -3 }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
                  style={{
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}25`,
                  }}
                >
                  <Icon size={18} style={{ color: item.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-mono font-semibold tracking-wide"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm font-medium text-white mt-0.5 truncate">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 glass rounded-2xl px-8 py-6"
            style={{ border: '1px solid rgba(129,140,248,0.15)' }}
          >
            <div className="text-center sm:text-left">
              <p className="font-semibold text-white text-sm">Ready to build something?</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Always up for interesting problems and cool projects.
              </p>
            </div>
            <a
              href="mailto:rudranaresh2018@gmail.com"
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              Say Hello <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
