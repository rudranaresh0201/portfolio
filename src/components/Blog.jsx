import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TiltCard } from './Motion';

const POSTS = [
  {
    slug: '/blog/verimcp',
    title: "Don't Trust the Tool Call: Building a Verifier for MCP",
    date: '2026-08-15',
    excerpt:
      "An MCP server can say isError: false and still be lying: nothing in the protocol proves a claimed side effect actually happened. Here's the proxy I built that independently checks it, and the real bugs three different clients caught in it before I trusted my own \"it works.\"",
    tags: ['mcp', 'agentic-ai', 'verification', 'python'],
    accentColor: '#c1861a',
  },
];

function PostCard({ post, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={post.slug} className="block group">
        <TiltCard maxTilt={3} className="glass rounded-2xl overflow-hidden relative" style={{ border: '1px solid rgba(24,20,15,0.08)' }}>
          <div className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, ${post.accentColor}, transparent)` }} />
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-ink-300">{post.date}</span>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 group-hover:text-ink-900 transition-all"
                style={{ background: 'rgba(24,20,15,0.05)' }}>
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            <h3 className="font-serif font-semibold text-ink-900 leading-snug mb-2.5" style={{ fontSize: '1.15rem' }}>
              {post.title}
            </h3>
            <p className="text-ink-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-3">04. blog</p>
          <h2 className="font-serif font-semibold tracking-tight text-ink-900 mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Things I've <span className="gradient-text">Written</span>
          </h2>
          <p className="text-ink-500 text-base max-w-xl">
            Real bugs, real numbers, real code: the technical write-ups behind what's above.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {POSTS.map((post, i) => <PostCard key={post.slug} post={post} i={i} />)}
        </div>
      </div>
    </section>
  );
}
