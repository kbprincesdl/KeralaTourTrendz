/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { Plus, ArrowUpRight, MessageCircle, Mail } from 'lucide-react';

const DETAILS = {
  name: 'Prince',
  businessName: 'Kerala Night Bookings',
  clientType: 'Kerala Tour & Travel Agency',
  city: 'Bengaluru',
  promise: 'Your night enquiries get answered before morning.',
  setupDescription:
    'I build your agency a night enquiry form that answers the tourist at once, keeps every enquiry in one list, and a daily morning note on what travellers are asking for.',
  price: 'Rs 15,000 setup + Rs 4,000 a month',
  bookingLink: 'https://cal.com/kbprinceai/20-minute-intro-call-nov1',
  whatsappNumber: '918147406788',
  email: 'kbprinceai@gmail.com',
  aboutMe: 'I ran a AI Agency ai.trendz',
};

// Rich image panel that displays the image or graceful finished outline panel if missing
interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  initialsOrNumber: string;
  aspectClass?: string;
}

const StudioImage: React.FC<StudioImageProps> = ({
  src,
  alt,
  className = '',
  initialsOrNumber,
  aspectClass = 'aspect-[4/3]',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-studio select-none bg-gradient-to-br from-[#1F2A2E] via-[#0F6B6B] to-[#B5623C] ${aspectClass} ${className}`}
    >
      {/* SVG feTurbulence real film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric lighting highlights */}
      <div className="absolute inset-0 bg-radial from-[rgba(251,246,236,0.08)] via-transparent to-[rgba(31,42,46,0.7)] pointer-events-none z-10" />

      {/* Actual image file if loaded */}
      {!imgError && (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        />
      )}

      {/* Rich finished outline panel (visible or fallback) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <span
          className="font-serif-display text-8xl md:text-9xl tracking-tight leading-none text-transparent"
          style={{
            WebkitTextStroke: '1.5px rgba(251, 246, 236, 0.45)',
          }}
        >
          {initialsOrNumber}
        </span>
        <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#FBF6EC]/70 font-medium">
          Kerala Night Bookings
        </div>
      </div>
    </div>
  );
};

// Magnetic button component
const MagneticButton: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}> = ({ children, href, className = '', target = '_blank', rel = 'noopener noreferrer' }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center cursor-pointer transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.a>
  );
};

// Word by word scroll reveal component for the problem sentence
const ProblemSentenceScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 40%'],
  });

  const sentence =
    'When tourists land on your website late in the evening and send booking enquiries after your office closes, questions sit unread until the morning while travellers move on to another tour agency.';
  const words = sentence.split(' ');

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-12 md:py-20 text-center">
      <p className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1.2) / words.length;
          return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
        })}
      </p>
    </div>
  );
};

const Word: React.FC<{
  word: string;
  progress: any;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, ['rgba(251, 246, 236, 0.22)', '#FBF6EC']);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className="inline-block mr-[0.3em] text-[#FBF6EC]">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
};

export default function App() {
  const shouldReduceMotion = useReducedMotion();

  // Navigation bar states: transparent -> cream with hairline -> ink over dark sections
  const [navState, setNavState] = useState<'transparent' | 'cream' | 'ink'>('transparent');
  const [showStickyMobile, setShowStickyMobile] = useState(false);

  // Before & After switch state: default is 'without'
  const [beforeAfterMode, setBeforeAfterMode] = useState<'without' | 'with'>('without');

  // Accordion questions state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll observer to update top bar and phone bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 80;

      // Check phone sticky CTA
      setShowStickyMobile(scrollY > 400);

      // Check ink sections to turn navbar ink
      const inkSections = document.querySelectorAll('[data-ink-section="true"]');
      let isOverInk = false;

      inkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 64 && rect.bottom >= 40) {
          isOverInk = true;
        }
      });

      if (isOverInk) {
        setNavState('ink');
      } else if (scrollY > heroThreshold) {
        setNavState('cream');
      } else {
        setNavState('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax for arch in hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const archY = useTransform(
    heroScrollProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 48]
  );

  // Vertical line fill for How We Start
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ['start center', 'end center'],
  });
  const stepsScaleY = useSpring(stepsProgress, { stiffness: 100, damping: 20 });

  // Pinned "What I do" section scroll tracking
  const pinnedRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pinnedProgress } = useScroll({
    target: pinnedRef,
    offset: ['start start', 'end end'],
  });
  const desktopX = useTransform(pinnedProgress, [0, 1], ['0%', '-67%']);

  const whatIDoCards = [
    {
      num: '01',
      title: 'Night enquiry form',
      imgSrc: '/work-1.jpg',
      initials: '01',
      today: 'Enquiries sent after hours wait in unread inboxes until you wake up.',
      withKnb: 'The form answers the tourist at once while you sleep.',
    },
    {
      num: '02',
      title: 'One central enquiry list',
      imgSrc: '/work-2.jpg',
      initials: '02',
      today: 'Tourist messages scatter across personal phones and separate emails.',
      withKnb: 'Every enquiry stays organized in one list for your team.',
    },
    {
      num: '03',
      title: 'Daily morning note',
      imgSrc: '/work-3.jpg',
      initials: '03',
      today: 'You start the day sorting through scattered queries to see what came in.',
      withKnb: 'A daily morning note shows what travellers are asking for.',
    },
  ];

  const beforeLines = [
    'Evening tourist queries arrive after your office closes.',
    'You check your phone late at night to see unread questions.',
    'Tourists wait through the night without a reply.',
    'You spend your morning catching up on missed requests.',
  ];

  const afterLines = [
    'Evening tourist queries arrive at your night enquiry form.',
    'The tourist receives an answer at once without waking you.',
    'Every detail is saved directly into one list.',
    'A morning note tells you what travellers asked for overnight.',
  ];

  const faqs = [
    {
      q: 'Who is this for?',
      a: 'This is for Kerala Tour & Travel Agency owners in Bengaluru who want their night enquiries answered before morning.',
    },
    {
      q: 'What exactly do you set up?',
      a: 'I set up a night enquiry form that answers the tourist at once, keeps every enquiry in one list, and a daily morning note on what travellers are asking for.',
    },
    {
      q: 'How long does setup take?',
      a: 'How long setup takes is agreed on the call.',
    },
    {
      q: 'What does it cost?',
      a: `${DETAILS.price}.`,
    },
    {
      q: 'How do we start?',
      a: 'We begin with a 20 minute call to review your agency and what travellers ask you.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EC] text-[#1F2A2E] selection:bg-[#B5623C] selection:text-[#FBF6EC] relative">
      {/* 1. TOP BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navState === 'transparent'
            ? 'bg-transparent text-[#1F2A2E] py-5 border-b border-transparent'
            : navState === 'cream'
            ? 'bg-[#FBF6EC]/95 backdrop-blur-md text-[#1F2A2E] py-3.5 border-b border-[rgba(31,42,46,0.12)] shadow-xs'
            : 'bg-[#1F2A2E] text-[#FBF6EC] py-3.5 border-b border-[rgba(251,246,236,0.12)] shadow-md'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo on the left: on a small cream rounded panel wherever the bar sits on ink */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-hidden"
            aria-label="Kerala Night Bookings"
          >
            <div
              className={`transition-all duration-300 rounded-xl px-2.5 py-1.5 flex items-center gap-2.5 ${
                navState === 'ink'
                  ? 'bg-[#FBF6EC] text-[#1F2A2E] shadow-sm'
                  : 'bg-transparent text-[#1F2A2E]'
              }`}
            >
              <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Kerala Night Bookings logo"
                  onError={(e) => {
                    // Fallback to inline logo SVG mark
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-contain"
                />
                <div className="w-7 h-7 rounded-full bg-[#0F6B6B] flex items-center justify-center text-[#FBF6EC] text-[11px] font-bold tracking-tighter">
                  KB
                </div>
              </div>
              <span className="font-serif-display text-lg tracking-tight font-semibold">
                Kerala Night Bookings
              </span>
            </div>
          </a>

          {/* Three links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium tracking-normal">
            <a
              href="#what-i-do"
              className={`transition-colors hover:text-[#B5623C] ${
                navState === 'ink' ? 'text-[#FBF6EC]/90' : 'text-[#1F2A2E]/80'
              }`}
            >
              What I do
            </a>
            <a
              href="#how-it-works"
              className={`transition-colors hover:text-[#B5623C] ${
                navState === 'ink' ? 'text-[#FBF6EC]/90' : 'text-[#1F2A2E]/80'
              }`}
            >
              How it works
            </a>
            <a
              href="#about"
              className={`transition-colors hover:text-[#B5623C] ${
                navState === 'ink' ? 'text-[#FBF6EC]/90' : 'text-[#1F2A2E]/80'
              }`}
            >
              About
            </a>
          </nav>

          {/* Top bar pill button */}
          <MagneticButton
            href={DETAILS.bookingLink}
            className={`rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all ${
              navState === 'ink'
                ? 'bg-[#B5623C] text-[#1F2A2E] hover:bg-[#B5623C]/90'
                : 'bg-[#1F2A2E] text-[#FBF6EC] hover:bg-[#0F6B6B]'
            }`}
          >
            Book a call
          </MagneticButton>
        </div>
      </header>

      {/* 2. HERO: on the cream page, split in two */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 px-5 sm:px-8 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Phone first: on phone the arch sits above the words */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center">
            <motion.div
              style={{ y: archY }}
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >
              {/* Tall arch frame (rounded top, square bottom) */}
              <div className="relative overflow-hidden rounded-t-[180px] rounded-b-none border border-[rgba(31,42,46,0.12)] shadow-xl bg-gradient-to-b from-[#1F2A2E] via-[#0F6B6B] to-[#B5623C] aspect-[3/4]">
                <StudioImage
                  src="/me.jpg"
                  alt="Prince, founder of Kerala Night Bookings"
                  initialsOrNumber="P"
                  aspectClass="h-full w-full"
                  className="rounded-t-[180px] rounded-b-none border-none"
                />
              </div>

              {/* Floating card on the corner reading "Prince, founder of Kerala Night Bookings" */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-5 right-2 sm:-right-4 bg-[#FBF6EC] border border-[rgba(31,42,46,0.12)] rounded-2xl px-4 py-3 shadow-lg max-w-[240px] z-20"
              >
                <p className="text-xs font-semibold text-[#1F2A2E] leading-snug">
                  Prince, founder of Kerala Night Bookings
                </p>
                <p className="text-[11px] text-[#1F2A2E]/70 mt-0.5">Bengaluru</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Left: small line, headline, plain sentence, button & WhatsApp */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-[#0F6B6B] mb-4">
                For Kerala Tour & Travel Agency in Bengaluru
              </span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.02] tracking-tight text-[#1F2A2E]"
            >
              Your night enquiries get{' '}
              <span className="italic text-[#B5623C] font-normal">answered</span> before morning.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-[18px] leading-[1.6] text-[#1F2A2E]/85 max-w-[68ch]"
            >
              {DETAILS.setupDescription}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              <MagneticButton
                href={DETAILS.bookingLink}
                className="bg-[#B5623C] text-[#1F2A2E] rounded-full px-8 py-4 text-base font-semibold tracking-wide hover:bg-[#B5623C]/90 shadow-sm transition-all"
              >
                Book a 20 minute call
              </MagneticButton>

              <a
                href={`https://wa.me/${DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F6B6B] hover:text-[#1F2A2E] py-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#0F6B6B]" />
                Message me on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM: full-width ink section with word-by-word scroll reveal */}
      <section
        data-ink-section="true"
        className="w-full bg-[#1F2A2E] text-[#FBF6EC] film-grain py-24 sm:py-32 lg:py-40 px-5 sm:px-8 border-y border-[rgba(251,246,236,0.12)] relative z-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B5623C] font-semibold">
              The Evening Bottleneck
            </span>
          </div>
          <ProblemSentenceScroller />
        </div>
      </section>

      {/* 4. WHAT I DO: Pinned section on laptop / swipeable cards on phone */}
      <section id="what-i-do" className="relative py-24 lg:py-36">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 lg:mb-20">
            <span className="text-xs uppercase tracking-[0.22em] text-[#0F6B6B] font-semibold block mb-3">
              What I Set Up
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#1F2A2E] leading-tight">
              Three things built for your agency.
            </h2>
          </div>
        </div>

        {/* Laptop Pinned Horizontal Experience */}
        <div
          ref={pinnedRef}
          className="hidden md:block relative h-[240vh]"
          style={shouldReduceMotion ? { height: 'auto' } : {}}
        >
          <div
            className={
              shouldReduceMotion
                ? 'space-y-10 max-w-5xl mx-auto px-5'
                : 'sticky top-28 h-[580px] overflow-hidden flex items-center'
            }
          >
            <motion.div
              style={shouldReduceMotion ? {} : { x: desktopX }}
              className="flex gap-8 px-8 pl-12 lg:pl-24"
            >
              {whatIDoCards.map((card) => (
                <div
                  key={card.num}
                  className="w-[70vw] max-w-[760px] flex-shrink-0 bg-[#FBF6EC] border border-[rgba(31,42,46,0.12)] rounded-studio p-8 shadow-sm flex flex-col justify-between"
                >
                  <div className="h-[280px] w-full mb-6">
                    <StudioImage
                      src={card.imgSrc}
                      alt={card.title}
                      initialsOrNumber={card.initials}
                      aspectClass="h-full w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-serif-display text-2xl text-[#B5623C] font-bold">
                        {card.num}
                      </span>
                      <h3 className="font-serif-display text-3xl text-[#1F2A2E]">
                        {card.title}
                      </h3>
                    </div>

                    <div className="space-y-2 mt-4 text-[17px] leading-relaxed border-t border-[rgba(31,42,46,0.08)] pt-4">
                      <p className="text-[#1F2A2E]/75">
                        <strong className="text-[#1F2A2E] font-medium">Today:</strong> {card.today}
                      </p>
                      <p className="text-[#0F6B6B]">
                        <strong className="text-[#0F6B6B] font-medium">
                          With Kerala Night Bookings:
                        </strong>{' '}
                        {card.withKnb}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Phone stacked & horizontal swipeable view */}
        <div className="md:hidden px-5">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 scrollbar-none">
            {whatIDoCards.map((card) => (
              <div
                key={card.num}
                className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center bg-[#FBF6EC] border border-[rgba(31,42,46,0.12)] rounded-studio p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="h-[200px] w-full mb-5">
                  <StudioImage
                    src={card.imgSrc}
                    alt={card.title}
                    initialsOrNumber={card.initials}
                    aspectClass="h-full w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif-display text-xl text-[#B5623C] font-bold">
                      {card.num}
                    </span>
                    <h3 className="font-serif-display text-2xl text-[#1F2A2E]">
                      {card.title}
                    </h3>
                  </div>

                  <div className="space-y-3 mt-3 text-[15px] leading-relaxed border-t border-[rgba(31,42,46,0.08)] pt-3">
                    <p className="text-[#1F2A2E]/75">
                      <strong className="text-[#1F2A2E] font-medium">Today:</strong> {card.today}
                    </p>
                    <p className="text-[#0F6B6B]">
                      <strong className="text-[#0F6B6B] font-medium">
                        With Kerala Night Bookings:
                      </strong>{' '}
                      {card.withKnb}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEFORE AND AFTER: two-position switch labelled without and with */}
      <section className="py-24 lg:py-36 px-5 sm:px-8 max-w-5xl mx-auto border-t border-[rgba(31,42,46,0.12)]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.22em] text-[#0F6B6B] font-semibold block mb-3">
            Your Evening
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#1F2A2E]">
            A day in your agency
          </h2>
        </div>

        {/* Two-position switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#1F2A2E]/5 border border-[rgba(31,42,46,0.12)]">
            <button
              type="button"
              onClick={() => setBeforeAfterMode('without')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                beforeAfterMode === 'without'
                  ? 'bg-[#1F2A2E] text-[#FBF6EC] shadow-sm'
                  : 'text-[#1F2A2E]/70 hover:text-[#1F2A2E]'
              }`}
            >
              Without Kerala Night Bookings
            </button>
            <button
              type="button"
              onClick={() => setBeforeAfterMode('with')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                beforeAfterMode === 'with'
                  ? 'bg-[#B5623C] text-[#1F2A2E] shadow-sm'
                  : 'text-[#1F2A2E]/70 hover:text-[#1F2A2E]'
              }`}
            >
              With Kerala Night Bookings
            </button>
          </div>
        </div>

        {/* Crossfading four-line list in the exact same place */}
        <div className="relative min-h-[220px] max-w-2xl mx-auto bg-[#FBF6EC] border border-[rgba(31,42,46,0.12)] rounded-studio p-8 sm:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            {beforeAfterMode === 'without' ? (
              <motion.div
                key="without"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {beforeLines.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="font-serif-display text-lg text-[#1F2A2E]/40 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-[17px] text-[#1F2A2E]/80 leading-relaxed">{line}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {afterLines.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="font-serif-display text-lg text-[#B5623C] font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-[17px] text-[#1F2A2E] font-medium leading-relaxed">{line}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. HOW WE START: 3 numbered steps on a thin vertical line that fills with accent colour */}
      <section
        id="how-it-works"
        ref={stepsRef}
        className="py-24 lg:py-36 px-5 sm:px-8 max-w-4xl mx-auto border-t border-[rgba(31,42,46,0.12)]"
      >
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-xs uppercase tracking-[0.22em] text-[#0F6B6B] font-semibold block mb-3">
            Getting Started
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#1F2A2E]">
            How we start
          </h2>
        </div>

        <div className="relative pl-10 sm:pl-16">
          {/* Vertical base line */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-12 w-[2px] bg-[rgba(31,42,46,0.15)] origin-top">
            {/* Animated filling line with accent colour */}
            <motion.div
              style={{ scaleY: stepsScaleY }}
              className="w-full h-full bg-[#B5623C] origin-top"
            />
          </div>

          {/* Three Steps */}
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-10 sm:-left-16 top-0 w-8 h-8 rounded-full bg-[#FBF6EC] border-2 border-[#B5623C] flex items-center justify-center text-xs font-bold text-[#B5623C]">
                1
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1F2A2E]">
                A 20 minute call
              </h3>
              <p className="mt-2 text-[17px] text-[#1F2A2E]/80 leading-relaxed max-w-[60ch]">
                We speak about your tour and travel agency and the questions travellers ask you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-10 sm:-left-16 top-0 w-8 h-8 rounded-full bg-[#FBF6EC] border-2 border-[#B5623C] flex items-center justify-center text-xs font-bold text-[#B5623C]">
                2
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1F2A2E]">
                A plan for your Kerala Tour & Travel Agency
              </h3>
              <p className="mt-2 text-[17px] text-[#1F2A2E]/80 leading-relaxed max-w-[60ch]">
                I outline your night enquiry form, enquiry list, and morning summary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-10 sm:-left-16 top-0 w-8 h-8 rounded-full bg-[#FBF6EC] border-2 border-[#B5623C] flex items-center justify-center text-xs font-bold text-[#B5623C]">
                3
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1F2A2E]">
                I set it up and show your team
              </h3>
              <p className="mt-2 text-[17px] text-[#1F2A2E]/80 leading-relaxed max-w-[60ch]">
                I build the system, verify every part, and show your team how to read the list.
              </p>
            </div>
          </div>

          {/* Exact price line under step 3 (only place price appears) */}
          <div className="mt-16 pt-8 border-t border-[rgba(31,42,46,0.12)]">
            <span className="text-xs uppercase tracking-wider text-[#0F6B6B] font-semibold block mb-1">
              Investment
            </span>
            <p className="font-serif-display text-3xl sm:text-4xl text-[#1F2A2E]">
              {DETAILS.price}
            </p>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ME: written as a short letter */}
      <section
        id="about"
        className="py-24 lg:py-36 px-5 sm:px-8 max-w-3xl mx-auto border-t border-[rgba(31,42,46,0.12)]"
      >
        <div className="bg-[#FBF6EC] border border-[rgba(31,42,46,0.12)] rounded-studio p-8 sm:p-14 shadow-sm relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#B5623C] bg-[#1F2A2E]">
              <StudioImage
                src="/me.jpg"
                alt="Prince"
                initialsOrNumber="P"
                aspectClass="w-full h-full"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="font-serif-display text-3xl text-[#1F2A2E]">
                A note from Prince
              </h2>
              <span className="text-sm text-[#0F6B6B] font-medium">Founder</span>
            </div>
          </div>

          {/* Letter body */}
          <div className="text-[20px] leading-[1.65] text-[#1F2A2E]/90 space-y-4 font-normal">
            <p>
              I ran a AI Agency ai.trendz. Now I build Kerala Night Bookings for Kerala Tour & Travel Agency owners in Bengaluru so tourists get their answers before morning. When you book a call, you speak with me.
            </p>
          </div>

          {/* Signature in Caveat */}
          <div className="mt-8 pt-4">
            <p className="font-signature text-5xl text-[#B5623C] tracking-wide select-none">
              Prince
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(31,42,46,0.08)]">
            <MagneticButton
              href={DETAILS.bookingLink}
              className="bg-[#1F2A2E] text-[#FBF6EC] rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#0F6B6B] transition-colors"
            >
              Book a 20 minute call with Prince
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 8. QUESTIONS: five that open and close in serif type about 28px on a hairline row */}
      <section className="py-24 lg:py-36 px-5 sm:px-8 max-w-4xl mx-auto border-t border-[rgba(31,42,46,0.12)]">
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-[#0F6B6B] font-semibold block mb-3">
            Clarifications
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#1F2A2E]">
            Questions
          </h2>
        </div>

        <div className="divide-y divide-[rgba(31,42,46,0.12)] border-y border-[rgba(31,42,46,0.12)]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-display text-2xl sm:text-[28px] text-[#1F2A2E] group-hover:text-[#0F6B6B] transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-[rgba(31,42,46,0.15)] transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#B5623C] text-[#1F2A2E] border-transparent' : 'bg-transparent text-[#1F2A2E]'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-[17px] text-[#1F2A2E]/80 leading-relaxed pr-8 max-w-[65ch]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL INVITATION, on ink */}
      <section
        data-ink-section="true"
        className="w-full bg-[#1F2A2E] text-[#FBF6EC] film-grain py-28 lg:py-40 px-5 sm:px-8 border-t border-[rgba(251,246,236,0.12)] relative z-20 text-center"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
            Let's give your evenings back.
          </h2>

          <div className="mt-10 flex justify-center">
            <MagneticButton
              href={DETAILS.bookingLink}
              className="bg-[#B5623C] text-[#1F2A2E] rounded-full px-9 py-4 text-base font-semibold tracking-wide hover:bg-[#B5623C]/90 shadow-md transition-all"
            >
              Book a 20 minute call
            </MagneticButton>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href={`https://wa.me/${DETAILS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FBF6EC]/80 hover:text-[#B5623C] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#B5623C]" />
              Message me on WhatsApp
            </a>
            <span className="hidden sm:inline text-[#FBF6EC]/30">•</span>
            <a
              href={`mailto:${DETAILS.email}`}
              className="inline-flex items-center gap-2 text-[#FBF6EC]/80 hover:text-[#B5623C] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#B5623C]" />
              {DETAILS.email}
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER on ink */}
      <footer
        data-ink-section="true"
        className="w-full bg-[#1F2A2E] text-[#FBF6EC] border-t border-[rgba(251,246,236,0.12)] py-14 px-5 sm:px-8 relative z-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo on small cream rounded panel */}
          <div className="flex items-center gap-4">
            <div className="bg-[#FBF6EC] text-[#1F2A2E] rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#0F6B6B] flex items-center justify-center text-[#FBF6EC] text-[10px] font-bold">
                KB
              </div>
              <span className="font-serif-display text-base font-semibold">
                Kerala Night Bookings
              </span>
            </div>
            <span className="text-sm text-[#FBF6EC]/60">{DETAILS.city}</span>
          </div>

          {/* Three contact links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#FBF6EC]/80">
            <a
              href={DETAILS.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B5623C] transition-colors"
            >
              Book a 20 minute call
            </a>
            <a
              href={`https://wa.me/${DETAILS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B5623C] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${DETAILS.email}`}
              className="hover:text-[#B5623C] transition-colors"
            >
              {DETAILS.email}
            </a>
          </div>

          {/* Year and Business name */}
          <div className="text-sm text-[#FBF6EC]/50 font-normal">
            2026 {DETAILS.businessName}
          </div>
        </div>
      </footer>

      {/* 11. PHONE STICKY BOTTOM BAR: slim "Book a 20 minute call" sticks after hero scrolls away */}
      <AnimatePresence>
        {showStickyMobile && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1F2A2E]/95 backdrop-blur-md border-t border-[rgba(251,246,236,0.12)] p-3 px-5 shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="truncate">
              <p className="text-xs text-[#FBF6EC]/80 truncate">Kerala Night Bookings</p>
              <p className="text-[11px] text-[#B5623C] truncate">Answer night travellers</p>
            </div>
            <a
              href={DETAILS.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#B5623C] text-[#1F2A2E] text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm hover:bg-[#B5623C]/90"
            >
              Book a 20 minute call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
