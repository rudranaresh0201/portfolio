import { useState } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './Motion';

const INTERESTS = ['Agentic AI Systems', 'RAG & Retrieval Systems', 'Multi-Agent Pipelines', 'MCP & Agent Infrastructure'];

function PianoGraphic({ active }) {
  const bars = [4, 7, 11, 6, 9, 14, 8, 12, 5, 10, 13, 7, 9, 6, 8];
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(194,82,143,0.07)' }}>
      <svg viewBox="0 0 160 28" className="absolute bottom-0 w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4,5,6].map((i) => <rect key={`w${i}`} x={i*22+2} y={0} width={20} height={27} rx={2} fill="rgba(255,255,255,0.6)" stroke="rgba(194,82,143,0.3)" strokeWidth={0.5}/>)}
        {[0,1,3,4,5].map((i) => <rect key={`b${i}`} x={i*22+14} y={0} width={13} height={17} rx={2} fill="#c2528f" opacity={0.8}/>)}
      </svg>
      <div className="absolute inset-x-3 top-2 flex items-end gap-0.5 h-9">
        {bars.map((h, i) => {
          const peak = active ? h : h * 0.7;
          return (
            <motion.div key={i} className="flex-1 rounded-full" style={{ backgroundColor: '#c2528f', minWidth: 2 }}
              animate={{ height: [`${(peak/14)*100}%`, `${(peak*0.4/14)*100}%`, `${(peak/14)*100}%`] }}
              transition={{ duration: active ? 0.7 + i * 0.05 : 1.3 + i * 0.09, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }} />
          );
        })}
      </div>
    </div>
  );
}

function TableTennisGraphic({ active }) {
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(193,134,26,0.08)' }}>
      <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="48" x2="200" y2="48" stroke="rgba(193,134,26,0.25)" strokeWidth="1"/>
        <line x1="100" y1="18" x2="100" y2="48" stroke="rgba(193,134,26,0.4)" strokeWidth="2"/>
        <rect x={22} y={26} width={16} height={22} rx={8} fill="rgba(193,134,26,0.45)"/>
        <rect x={162} y={26} width={16} height={22} rx={8} fill="rgba(193,134,26,0.45)"/>
      </svg>
      <motion.div
        className="absolute rounded-full"
        style={{ backgroundColor: '#c1861a', top: 20, width: active ? 10 : 8, height: active ? 10 : 8 }}
        animate={{ left: ['16%', '82%', '16%'], top: [20, 34, 20] }}
        transition={{ duration: active ? 1.3 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function BookGraphic({ active }) {
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(31,125,104,0.07)' }}>
      <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[{ x:12,y:36,w:38,h:10,c:'rgba(31,125,104,0.5)'},{x:16,y:25,w:30,h:10,c:'rgba(31,125,104,0.35)'},{x:14,y:14,w:34,h:10,c:'rgba(31,125,104,0.25)'}].map((b,i)=>(
          <g key={i}><rect x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill={b.c}/><line x1={b.x+5} y1={b.y+3} x2={b.x+5} y2={b.y+7} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/></g>
        ))}
        <path d="M 70 14 Q 100 10 130 14 L 128 42 Q 100 38 72 42 Z" fill="rgba(31,125,104,0.14)" stroke="rgba(31,125,104,0.35)" strokeWidth="1"/>
        <line x1="100" y1="13" x2="100" y2="42" stroke="rgba(31,125,104,0.45)" strokeWidth="1"/>
        {[20,26,32,38].map((y)=>(<g key={y}><line x1="76" y1={y} x2="95" y2={y} stroke="rgba(31,125,104,0.3)" strokeWidth="1.5"/><line x1="105" y1={y} x2="124" y2={y} stroke="rgba(31,125,104,0.3)" strokeWidth="1.5"/></g>))}
      </svg>
      <motion.div
        className="absolute inset-0"
        animate={active ? { opacity: [0.5, 0.9, 0.5] } : { opacity: 0.5 }}
        transition={{ duration: 1.4, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent 34%, rgba(31,125,104,0.18) 50%, transparent 66%)',
        }}
      />
    </div>
  );
}

const PERSONAL = [
  { Graphic: PianoGraphic, color: '#c2528f', title: 'Piano', desc: 'I play piano in my free time.' },
  { Graphic: TableTennisGraphic, color: '#c1861a', title: 'Table Tennis', desc: 'I play table tennis regularly.' },
  { Graphic: BookGraphic, color: '#1f7d68', title: 'Reading', desc: 'Avid reader, fiction and technical papers alike.' },
];

const fadeUp = (delay = 0) => ({ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } } });

function PersonalCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Graphic = item.Graphic;
  return (
    <TiltCard maxTilt={6} className="glass rounded-2xl overflow-hidden glow-border relative" style={{ borderColor: `${item.color}20` }}>
      <motion.div
        variants={fadeUp(index * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -3 }}
        className="p-5"
      >
        <div className="h-0.5 -mx-5 -mt-5 mb-4 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)`, opacity: hovered ? 1 : 0.4 }} />
        <Graphic active={hovered} />
        <p className="font-semibold text-ink-900 mb-2">{item.title}</p>
        <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
      </motion.div>
    </TiltCard>
  );
}

export default function Life() {
  return (
    <section id="life" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-16">
          <p className="section-label mb-3">05. life</p>
          <h2 className="font-serif font-semibold tracking-tight text-ink-900 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Beyond the <span className="gradient-text">Code</span>
          </h2>
          <p className="text-ink-500 text-base leading-relaxed max-w-2xl">
            What I'm exploring right now, and the parts of life that have nothing to do with a terminal.
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-ink-900 mb-6">
            What I'm Exploring
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((interest, i) => (
              <motion.div key={interest} variants={fadeUp(i * 0.06)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="px-4 py-2.5 rounded-xl glass glow-border"
                whileHover={{ scale: 1.04, y: -2 }}>
                <span className="text-sm font-medium text-ink-700">{interest}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-ink-900 mb-6">
            Outside the IDE
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERSONAL.map((p, i) => <PersonalCard key={p.title} item={p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
