import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  FileCheck2,
  FileText,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  LineChart,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Twitter,
  Users,
  WandSparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';

const brandName = 'ResumeAI';

const navLinks = [
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const builtForItems = [
  'Students',
  'Developers',
  'Designers',
  'Career Switchers',
  'Professionals',
];

const builtForStats = [
  { value: '50k+', label: 'resumes analyzed', icon: BadgeCheck },
  { value: '94%', label: 'ATS improvement', icon: CircleGauge },
  { value: '4.9/5', label: 'rating', icon: Star },
];

const faqs = [
  {
    question: 'How does ResumeAI improve ATS performance?',
    answer: 'It identifies missing keywords, weak summary structure, formatting issues, and vague bullets, then rewrites the resume with stronger, ATS-friendly language.',
  },
  {
    question: 'Is ResumeAI only for job seekers with experience?',
    answer: 'No. It helps students, career switchers, developers, designers, and experienced professionals adapt their resumes for specific roles.',
  },
  {
    question: 'What makes the AI resume builder different?',
    answer: 'It is focused on outcomes, not generic generation. The builder produces targeted content based on the role, the job description, and ATS constraints.',
  },
  {
    question: 'Does ResumeAI replace human review?',
    answer: 'No. It gives fast recruiter-style feedback and optimization, but the user still controls the final resume before applying.',
  },
];

const featureItems = [
  { icon: FileCheck2, title: 'ATS Intelligence', description: 'Simulate ATS scoring before a recruiter sees the resume.' },
  { icon: WandSparkles, title: 'AI Resume Builder', description: 'Generate clean, role-specific resumes in seconds.' },
  { icon: LineChart, title: 'Resume Analyzer', description: 'Spot missing keywords, weak bullets, and structure issues.' },
  { icon: Layers3, title: 'Recruiter Feedback AI', description: 'Get critique modeled on hiring practices from top teams.' },
];

const demoSteps = [
  { label: 'Resume Upload' },
  { label: 'ATS Analysis' },
  { label: 'Problems Found', issues: ['Missing Keywords', 'Weak Summary', 'No Impact Metrics', 'Poor ATS Formatting'] },
  { label: 'AI Optimization' },
  { label: 'ATS Score 94%' },
];

const testimonials = [
  { name: 'Maya Chen', role: 'Senior Product Designer', quote: 'The score jump was immediate. It finally showed me what recruiters were actually seeing.' },
  { name: 'Jordan Lewis', role: 'Frontend Engineer', quote: 'It feels like a product from a company that understands conversion, not a template site.' },
  { name: 'Nadia Patel', role: 'Operations Lead', quote: 'The before-and-after story is strong. It made the value obvious in less than a minute.' },
];

const pricingPlans = [
  { name: 'Starter', price: '$0', description: 'For trying the workflow and seeing what is holding your resume back.', features: ['1 resume scan', 'ATS score generator', 'Basic AI fixes'] },
  { name: 'Pro', price: '$12', description: 'For job seekers who want repeatable optimization and higher interview rates.', features: ['Unlimited scans', 'AI rewrite engine', 'Job match analysis'], featured: true },
  { name: 'Team', price: '$29', description: 'For coaches and operators helping multiple candidates improve faster.', features: ['Shared workspaces', 'Bulk review', 'Priority support'] },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Twitter, label: 'X', href: 'https://x.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
];

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function BrandMark() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white shadow-lg shadow-amber-500/20">
      <Sparkles className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

function SectionShell({ id, eyebrow, title, description, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`px-6 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">{eyebrow}</p>
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">{description}</p>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function FloatingGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-amber-500/20 blur-[140px]" />
      <div className="absolute right-0 top-[18%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="absolute bottom-[8%] left-[32%] h-[18rem] w-[18rem] rounded-full bg-orange-500/10 blur-[110px]" />
      <div className="absolute inset-0 tech-grid opacity-25" />
      {[
        { left: '10%', top: '18%', size: 5, duration: 5.2, delay: 0 },
        { left: '22%', top: '64%', size: 4, duration: 6.4, delay: 0.8 },
        { left: '72%', top: '16%', size: 6, duration: 5.8, delay: 0.4 },
        { left: '84%', top: '58%', size: 4, duration: 6.8, delay: 1.1 },
        { left: '48%', top: '74%', size: 5, duration: 7.2, delay: 0.6 },
      ].map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white/50 shadow-[0_0_18px_rgba(255,255,255,0.35)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -14, 0], opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function MagneticButton({ children, className = '', href, onClick, type = 'button', ariaLabel, variant = 'primary' }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const resetOffset = () => setOffset({ x: 0, y: 0 });

  const handleMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    setOffset({ x, y });
  };

  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition will-change-transform ${variant === 'primary' ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-xl shadow-amber-500/20 hover:brightness-110' : 'border border-white/10 bg-white/5 text-[var(--text-primary)] hover:bg-white/10'} ${className}`;
  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={resetOffset}
        className={sharedClassName}
        style={style}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={resetOffset}
      className={sharedClassName}
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

export function BuiltForSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell
      id="built-for"
      eyebrow="Built for"
      title="Designed for every kind of candidate"
      description="No fake partnerships, no borrowed logos. Just clear audience fit and real trust signals."
      className="py-[7.5rem]"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[var(--glass-bg)] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Audience</p>
              <h3 className="mt-2 text-2xl font-black text-[var(--text-primary)]">Who ResumeAI is made for</h3>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Trusted</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {builtForItems.map((item, index) => (
              <motion.div
                key={item}
                animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-[var(--text-primary)]"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {builtForStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-[1.6rem] border border-white/10 bg-black/10 p-4">
                  <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  <div className="mt-4 text-2xl font-black text-[var(--text-primary)]">{stat.value}</div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-white/10 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-cyan-500/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Trust indicators</p>
          <div className="mt-4 grid gap-4">
            {[
              { title: 'Recruiter-style feedback', text: 'Clear guidance that feels like a hiring manager review, not generic AI output.' },
              { title: 'Fast analysis loop', text: 'Upload, score, improve, and export in one focused flow.' },
              { title: 'Role-aware optimization', text: 'Tailored for specific jobs instead of one-size-fits-all rewrites.' },
            ].map((card) => (
              <div key={card.title} className="rounded-[1.7rem] border border-white/10 bg-black/15 p-5">
                <div className="text-lg font-bold text-[var(--text-primary)]">{card.title}</div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function LandingNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[color-mix(in_srgb,var(--surface)_72%,transparent)]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <BrandMark />
          <span className="text-lg font-black tracking-tight text-[var(--text-primary)]">{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </button>
          <MagneticButton href="#pricing" className="px-5 py-3 text-sm" ariaLabel="Start Free">
            Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const demoSurfaceRef = useRef(null);

  const handleDemoMove = (event) => {
    const element = demoSurfaceRef.current;
    if (!element || prefersReducedMotion) return;

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    element.style.setProperty('--hero-tilt-x', `${x}deg`);
    element.style.setProperty('--hero-tilt-y', `${y}deg`);
  };

  const resetDemoMove = () => {
    const element = demoSurfaceRef.current;
    if (!element) return;

    element.style.setProperty('--hero-tilt-x', '0deg');
    element.style.setProperty('--hero-tilt-y', '0deg');
  };

  return (
    <section className="relative px-6 pb-8 pt-28 sm:pt-32 lg:pb-12">
      <FloatingGlow />
      <div className="relative mx-auto grid min-h-[min(82vh,56rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <motion.div variants={sectionVariants} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Analyze → Improve → Get Interviews
          </div>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-[clamp(5rem,7vw,6rem)] lg:leading-[0.94]">
              Your Resume Is Costing You Interviews.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
              ResumeAI finds why recruiters reject your resume and fixes it with AI.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#pricing" ariaLabel="Start Free">
              Start Free <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#demo" variant="secondary" ariaLabel="Watch Demo">
              Watch Demo <FileText className="h-5 w-5" aria-hidden="true" />
            </MagneticButton>
          </div>
          <div className="flex flex-wrap gap-3">
            {['ATS score generator', 'AI resume builder', 'Recruiter feedback'].map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] backdrop-blur-xl">
                {pill}
              </span>
            ))}
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-4 pt-4">
            {[
              { value: '58%', label: 'starting score' },
              { value: '94%', label: 'after optimization' },
              { value: '4m', label: 'to first fix' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{item.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--text-muted)]">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.08 }}
          className="relative"
          onMouseMove={handleDemoMove}
          onMouseLeave={resetDemoMove}
        >
          <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-tr from-amber-500/30 via-orange-500/15 to-cyan-500/15 blur-3xl" />
          <div
            ref={demoSurfaceRef}
            className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[var(--glass-bg)] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6 lg:p-7"
            style={{ transform: 'perspective(1400px) rotateX(var(--hero-tilt-y, 0deg)) rotateY(var(--hero-tilt-x, 0deg))', transition: 'transform 180ms ease-out' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-muted)]">Animated analysis</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">Resume analysis pipeline</h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Score lift: +36
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { title: 'Resume Upload', tone: 'from-slate-950/90 to-slate-900/80', icon: FileText },
                { title: 'ATS Analysis', tone: 'from-amber-500/20 to-orange-500/10', icon: BarChart3 },
                { title: 'Problems Found', tone: 'from-rose-500/20 to-orange-500/10', icon: MessageSquareText, bullets: ['Missing Keywords', 'Weak Summary', 'No Impact Metrics', 'Poor ATS Formatting'] },
                { title: 'AI Optimization', tone: 'from-cyan-500/20 to-emerald-500/10', icon: WandSparkles },
                { title: 'ATS Score 94%', tone: 'from-emerald-500/20 to-cyan-500/10', icon: CircleGauge },
              ].map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <React.Fragment key={stage.title}>
                    <motion.div
                      className={`rounded-[1.6rem] border border-white/10 bg-gradient-to-r ${stage.tone} p-3.5 sm:p-4`}
                      animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.08 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-amber-200">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">{stage.title}</p>
                          {stage.bullets ? (
                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              {stage.bullets.map((bullet) => (
                                <div key={bullet} className="rounded-2xl border border-white/10 bg-black/15 px-3 py-2 text-xs font-medium text-[var(--text-primary)]">
                                  ❌ {bullet}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        {stage.title.includes('Score') ? <div className="text-2xl font-black text-white">94%</div> : null}
                      </div>
                    </motion.div>
                    {index < 4 ? (
                      <div className="flex items-center justify-center py-1 text-[var(--text-muted)]">
                        <motion.div animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                          ↓
                        </motion.div>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustedByCarousel() {
  return (
    <SectionShell
      id="trusted-by"
      eyebrow="Trusted by ambitious teams"
      title="The names that set the bar"
      description="A quiet marquee reinforces the premium feel without introducing more copy."
      className="pb-10 pt-8"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 py-5 backdrop-blur-xl">
        <MarqueeRow />
      </div>
    </SectionShell>
  );
}

function DemoStep({ step, index, activeIndex, setActiveIndex }) {
  const active = activeIndex === index;
  return (
    <button
      type="button"
      onClick={() => setActiveIndex(index)}
      className={`rounded-[2rem] border px-5 py-4 text-left transition ${active ? 'border-amber-400/40 bg-amber-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">0{index + 1}</span>
        {step.score ? <span className="text-sm font-semibold text-emerald-300">{step.score}</span> : null}
      </div>
      <div className="mt-3 text-lg font-bold text-[var(--text-primary)]">{step.label}</div>
      {active ? <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400" /> : null}
    </button>
  );
}

export function ProductDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = demoSteps[activeIndex];

  return (
    <SectionShell
      id="demo"
      eyebrow="Interactive product demo"
      title="A full-screen preview of the product in motion"
      description="This is the product story in its purest form: upload, analyze, detect, optimize, and score."
      className="py-[7.5rem]"
    >
      <div className="grid min-h-[72vh] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[var(--glass-bg)] p-5 backdrop-blur-2xl sm:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Workflow</p>
              <h3 className="mt-2 text-2xl font-black text-[var(--text-primary)]">Resume analysis timeline</h3>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Score: 94%</div>
          </div>

          <div className="mt-5 grid gap-2.5">
            {demoSteps.map((step, index) => (
              <DemoStep key={step.label} step={step} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/15 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Active state</p>
            <div className="mt-3 text-2xl font-black text-[var(--text-primary)]">{active.label}</div>
            <div className="mt-4 space-y-2">
              {active.issues ? active.issues.map((issue) => <div key={issue} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-primary)]">❌ {issue}</div>) : <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-secondary)]">AI applies improvements and lifts the ATS score.</div>}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[var(--glass-bg)] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-cyan-500/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Live output</p>
                <h3 className="mt-2 text-2xl font-black text-[var(--text-primary)]">Recruiter-ready resume</h3>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">ATS 94%</div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-sm font-black text-white">AM</div>
                  <div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">Avery Morgan</div>
                    <div className="text-sm text-[var(--text-secondary)]">Product strategy • Growth systems</div>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Led product launches that increased retention by 24%.</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Aligned roadmap priorities with revenue and hiring goals.</div>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  ['Keyword coverage', 94],
                  ['Impact metrics', 96],
                  ['Formatting quality', 99],
                ].map(([label, value], index) => (
                  <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--text-primary)]">{label}</span>
                      <span className="font-semibold text-amber-300">{value}%</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/20">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : index * 0.08 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function FeatureGrid() {
  return (
    <SectionShell
      id="features"
      eyebrow="Core features"
      title="Four features. No filler."
      description="Minimal, high-signal cards that tell the whole product story quickly."
      className="py-[7.5rem]"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureItems.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300 transition group-hover:scale-105">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[var(--text-primary)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function BeforeAfterComparison() {
  return (
    <SectionShell
      id="compare"
      eyebrow="Before vs after"
      title="The score jump tells the story instantly"
      description="A large comparison section keeps the transformation obvious with almost no explanation needed."
      className="py-[7.5rem]"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { label: 'Before', score: '43%', tone: 'from-rose-500/20 to-orange-500/10', points: ['Weak Summary', 'Missing React Keywords', 'No Measurable Achievements', 'Formatting Issues'] },
          { label: 'After', score: '92%', tone: 'from-emerald-500/20 to-cyan-500/10', points: ['Strong Summary', 'Relevant Keywords', 'Quantified Impact', 'ATS-Friendly Layout'] },
        ].map((card) => (
          <div key={card.label} className={`rounded-[2.2rem] border border-white/10 bg-gradient-to-br ${card.tone} p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[var(--text-primary)]">{card.label}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">ATS {card.score}</span>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-[var(--text-primary)]">
              {card.label === 'Before' ? '❌ Resume fails ATS parsing and reads like a template.' : '✅ Resume feels recruiter-ready and optimization-driven.'}
            </div>
            <div className="mt-6 space-y-3">
              {card.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--text-primary)]">
                  <Check className={`h-4 w-4 ${card.label === 'Before' ? 'text-rose-400' : 'text-emerald-400'}`} aria-hidden="true" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="Modern floating cards with real product signal"
      description="Small, elegant social proof that feels premium and not overdesigned."
      className="py-[7.5rem]"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.2rem] border border-white/10 bg-[var(--glass-bg)] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="space-y-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />)}
              </div>
              <blockquote className="text-xl font-medium leading-9 text-[var(--text-primary)] sm:text-2xl">“{testimonial.quote}”</blockquote>
              <div>
                <p className="text-lg font-bold text-[var(--text-primary)]">{testimonial.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4">
          {testimonials.map((entry, entryIndex) => (
            <button
              key={entry.name}
              type="button"
              onClick={() => setIndex(entryIndex)}
              className={`rounded-[1.8rem] border p-5 text-left transition ${entryIndex === index ? 'border-amber-400/40 bg-amber-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <p className="font-semibold text-[var(--text-primary)]">{entry.name}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{entry.role}</p>
            </button>
          ))}
          <div className="flex items-center justify-between rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
            <button type="button" onClick={() => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-[var(--text-primary)] transition hover:bg-white/10" aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-sm text-[var(--text-muted)]">{index + 1} / {testimonials.length}</p>
            <button type="button" onClick={() => setIndex((value) => (value + 1) % testimonials.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-[var(--text-primary)] transition hover:bg-white/10" aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function AnimatedCounter({ value, suffix = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const duration = 1200;
    const startTime = window.performance.now();
    let frameId = 0;

    const frame = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, value]);

  return <span>{prefersReducedMotion ? value : count}{suffix}</span>;
}

export function StatsSection() {
  const items = useMemo(() => [
    { value: 50, suffix: 'k+', label: 'Resumes Optimized', icon: BadgeCheck },
    { value: 94, suffix: '%', label: 'Average ATS Score Improvement', icon: CircleGauge },
    { value: 4, suffix: '.9/5', label: 'User Rating', icon: Users },
    { value: 150, suffix: '+', label: 'Countries Reached', icon: ShieldCheck },
  ], []);

  return (
    <SectionShell
      id="stats"
      eyebrow="Statistics"
      title="A few numbers that make the product feel real"
      description="Low-friction proof points that keep the page feeling substantial without adding clutter."
      className="py-[7.5rem]"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <Icon className="h-6 w-6 text-amber-300" aria-hidden="true" />
              <div className="mt-5 text-4xl font-black tracking-tight text-[var(--text-primary)]"><AnimatedCounter value={item.value} suffix={item.suffix} /></div>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.label}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="Pricing"
      title="Simple 3-card pricing"
      description="Three plans, one clear path, no long feature table."
      className="py-[7.5rem]"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={`relative overflow-hidden rounded-[2.2rem] border p-6 backdrop-blur-2xl sm:p-8 ${plan.featured ? 'border-amber-400/40 bg-gradient-to-b from-amber-500/15 to-white/5 shadow-2xl shadow-amber-500/10' : 'border-white/10 bg-white/5'}`}>
            {plan.featured ? <div className="absolute right-5 top-5 rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Most popular</div> : null}
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{plan.name}</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-[var(--text-primary)]">{plan.price}</span>
              <span className="pb-1 text-sm text-[var(--text-muted)]">/ month</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{plan.description}</p>
            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--text-primary)]">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#signup" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition hover:-translate-y-0.5 ${plan.featured ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-lg shadow-amber-500/20' : 'border border-white/10 bg-white/5 text-[var(--text-primary)] hover:bg-white/10'}`}>
              {plan.featured ? 'Go Pro' : plan.name === 'Starter' ? 'Start free' : 'Contact sales'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Questions people ask before they trust the product"
      description="A short FAQ keeps the page grounded without adding clutter."
      className="py-[7.5rem]"
    >
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;

            return (
              <button
                key={item.question}
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(index)}
                className={`w-full rounded-[1.8rem] border p-5 text-left transition ${open ? 'border-amber-400/40 bg-amber-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{item.question}</div>
                  <span className="text-sm font-semibold text-[var(--text-muted)]">{open ? '−' : '+'}</span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
                </motion.div>
              </button>
            );
          })}
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-amber-500/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">What makes it credible</p>
          <h3 className="mt-3 text-2xl font-black text-[var(--text-primary)]">Clear answers. No fluff.</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">The FAQ reinforces the exact product promise: faster analysis, better resumes, and more interview-ready output.</p>
          <div className="mt-6 space-y-3">
            {[
              'ATS-aware scoring',
              'Recruiter-style critique',
              'AI rewrite suggestions',
              'User-controlled final edits',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-[var(--text-primary)]">
                <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function FinalCTA() {
  return (
    <section id="signup" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-cyan-500/15 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">Ready to ship</p>
            <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">Analyze → Improve → Get Interviews.</h2>
            <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">ResumeAI shows the exact reasons your resume gets rejected and fixes them with AI.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white/90">
              Start free <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="mailto:hello@resumeai.app" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:bg-white/10">
              Contact us <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto_auto] lg:items-start">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-lg font-black tracking-tight text-[var(--text-primary)]">{brandName}</p>
              <p className="text-sm text-[var(--text-muted)]">AI resume optimization platform</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-[var(--text-secondary)]">Built to analyze, improve, and elevate resumes before recruiters see them.</p>
        </div>

        <div className="grid gap-3 text-sm text-[var(--text-secondary)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Product</p>
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[var(--text-primary)]">{item.label}</a>
          ))}
        </div>

        <div className="grid gap-3 text-sm text-[var(--text-secondary)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Social</p>
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 transition hover:text-[var(--text-primary)]">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        <p>Designed for clarity, speed, and interview momentum.</p>
      </div>
    </footer>
  );
}
