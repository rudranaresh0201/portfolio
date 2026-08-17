import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '../Footer';

export default function BlogLayout({ title, date, tags = [], children }) {
  return (
    <div
      className="my-3 mx-2 sm:my-6 sm:mx-6 lg:mx-10 rounded-2xl sm:rounded-[2rem] overflow-hidden relative"
      style={{
        backgroundColor: '#f6f1e7',
        border: '1px dotted rgba(24,20,15,0.3)',
        boxShadow: '0 40px 80px rgba(60,42,20,0.35), 0 10px 26px rgba(60,42,20,0.22)',
      }}
    >
      <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink-900/[0.07]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>RN</span>
            <span className="hidden sm:block text-ink-500 text-sm font-light">/ portfolio</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="section-label mb-4">devlog</p>
          <h1
            className="font-serif font-semibold tracking-tight text-ink-900 mb-5"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 3.25rem)', lineHeight: 1.08 }}
          >
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <span className="font-mono text-xs text-ink-300">{date}</span>
            <span className="text-ink-300">·</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="prose-blog"
        >
          {children}
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
