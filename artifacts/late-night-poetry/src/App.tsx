import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Check, Copy, Heart, Menu, Moon, Pause, Play, Quote, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Chapter = {
  eyebrow: string;
  title: string;
  accent: string;
  stanzas: string[][];
};

const chapters: Chapter[] = [
  {
    eyebrow: '01 / the beginning',
    title: 'A glance of you',
    accent: 'serotonin, softened edges, a quiet kind of happiness.',
    stanzas: [
      [
        'A glance of you',
        'is all it takes',
        'for my serotonin to take a nosedive,',
        'for the world around me to soften,',
        'and for a quiet kind of happiness',
        'to find its way into my chest.',
      ],
      [
        'Just being near you',
        'fills me with a joy',
        'I could spend a lifetime trying to explain,',
        'yet somehow never find enough words to contain.',
      ],
    ],
  },
  {
    eyebrow: '02 / noticing',
    title: 'Every little detail',
    accent: 'the things I notice. perhaps more than I should.',
    stanzas: [
      [
        'You are breathtaking',
        "in ways I don't think you realize.",
      ],
      [
        'From your little beauty marks,',
        'scattered across your skin',
        'like stars placed there deliberately,',
        'to your rosy pink lips',
        'that somehow make it difficult',
        'for me to remember what I was saying.',
      ],
      [
        'From the elegance of your eyeliner',
        'framing the eyes I could get lost in,',
        'to your naturally beautiful,',
        'obsidian-like roots',
        'slowly melting into that mellow,',
        'caramel-chocolate color',
        'the rest of your hair so effortlessly becomes.',
      ],
      [
        'I notice these things.',
        'Perhaps more than I should.',
        'But how could I not?',
        'How could I look at you',
        'and not admire every little detail',
        'that makes you, you',
      ],
    ],
  },
  {
    eyebrow: '03 / beside you',
    title: 'Time feels different',
    accent: 'somewhere between your words and mine.',
    stanzas: [
      [
        'Sometimes, I catch myself simply watching you',
        'exist,',
        'doing nothing extraordinary,',
        'and somehow making everything around you',
        'feel extraordinary anyway.',
      ],
      [
        "Because when I'm talking to you,",
        'time feels different.',
      ],
      [
        'And somewhere between your words and mine,',
        'I find myself wishing',
        'I could stay beside you',
        'for the rest of my life.',
      ],
      [
        "You've made me feel things",
        "I didn't know I could feel so deeply.",
      ],
    ],
  },
  {
    eyebrow: '04 / something more',
    title: 'The quiet instinct',
    accent: 'admiration, becoming a wish to keep you safe.',
    stanzas: [
      [
        'So deeply, in fact,',
        'that somewhere along the way,',
        'my admiration for you became something more.',
      ],
      [
        'It became the quiet, almost instinctive desire',
        'to protect you from the parts of this world',
        "that don't deserve your kindness.",
      ],
      [
        'The thought of you being sad',
        'is enough to make my heart uneasy.',
      ],
      [
        "Because if you're hurting,",
        'some part of me wants to carry that pain for you,',
        "even if I know I can't.",
      ],
    ],
  },
  {
    eyebrow: '05 / the pull',
    title: 'Hold you close',
    accent: 'the part of you that makes it impossible not to smile.',
    stanzas: [
      [
        'And then there is your playful side,',
        'that joyful, beautiful part of you',
        'that makes it impossible for me',
        'not to smile.',
      ],
      [
        'The part of you that makes me want to pull you into my',
        'arms,',
        'hold you close,',
        'and selfishly wish',
        'I never had to let you go.',
      ],
    ],
  },
  {
    eyebrow: '06 / becoming',
    title: 'A little farther',
    accent: 'the thought of you makes me want to try.',
    stanzas: [
      [
        'You have this strange way of giving me motivation',
        'when I have none left for myself.',
      ],
      [
        'Even on the days',
        'when I have no energy to do the simplest things,',
        'somehow the thought of you',
        'makes me want to try.',
      ],
      [
        'To become better.',
        'To push a little farther.',
        'To become someone',
        'worthy of standing beside you.',
      ],
    ],
  },
  {
    eyebrow: '07 / the answer',
    title: 'Too much',
    accent: 'not because I do not know. because there is simply too much.',
    stanzas: [
      [
        'You once asked me',
        'what I like about you.',
      ],
      [
        "The truth is,",
        "I don't think I could ever give you",
        'a complete answer.',
      ],
      [
        'Because every time I think',
        "I've found the words,",
        'I notice something else.',
      ],
      [
        'Another little detail.',
        'Another smile.',
        'Another expression.',
        'Another moment',
        'that makes me fall a little deeper',
        'without even realizing it.',
      ],
      [
        'So if you ever ask me again',
        'what I like about you,',
      ],
      [
        'I might still struggle to answer.',
        'Not because I don\'t know.',
      ],
      [
        'But because there is simply',
        'too much.',
        'Too much beauty.',
        'Too much warmth.',
        'Too much joy.',
        'Too many little things',
        'that make my heart choose you',
        'again and again.',
      ],
      [
        "And perhaps that's the simplest way",
        'I can put it:',
      ],
      [
        "I don't just like the way you look.",
        'I like the way the world feels',
        "when you're in it.",
        'I like the person I become',
        "when I'm around you.",
      ],
      [
        'And more than anything,',
        'I like you.',
      ],
      [
        "This isn't a complete answer.",
        'It probably never will be.',
        "But it's my attempt",
        'to put into words',
        'what my heart seems to understand',
        'far better than I ever could.',
      ],
    ],
  },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={`reveal ${className}`}>{children}</div>;
}

function Lines({ lines, stanzaIndex }: { lines: string[]; stanzaIndex: number }) {
  return (
    <div className="space-y-1.5 sm:space-y-2.5" data-testid={`poem-stanza-${stanzaIndex}`}>
      {lines.map((line, index) => (
        <div
          className="poem-line line-reveal font-display text-[1.35rem] leading-[1.16] tracking-[-0.01em] sm:text-[1.78rem] sm:leading-[1.13] lg:text-[2.05rem]"
          data-testid={`poem-line-${stanzaIndex}-${index}`}
          key={`${stanzaIndex}-${index}`}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

function ChapterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <section id={`chapter-${index}`} className="relative scroll-mt-20 border-t border-[hsl(var(--border)/.65)] py-24 sm:py-36" data-testid={`chapter-${index}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[minmax(190px,0.7fr)_minmax(0,1.8fr)] lg:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:h-fit">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[hsl(var(--secondary))]" />
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]" data-testid={`chapter-eyebrow-${index}`}>
              {chapter.eyebrow}
            </p>
          </div>
          <h2 className="mt-5 max-w-xs font-display text-5xl font-medium leading-[0.88] tracking-[-0.04em] text-[hsl(var(--primary))] sm:text-6xl" data-testid={`chapter-title-${index}`}>
            {chapter.title}
          </h2>
          <p className="mt-5 max-w-[18rem] font-display text-xl italic leading-tight text-[hsl(var(--muted-foreground))]">{chapter.accent}</p>
        </Reveal>
        <div className="max-w-2xl">
          {chapter.stanzas.map((stanza, stanzaIndex) => (
            <Reveal className={stanzaIndex > 0 ? 'mt-14 sm:mt-20' : ''} key={stanza.join('-')}>
              <Lines lines={stanza} stanzaIndex={index * 10 + stanzaIndex} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLowLight, setIsLowLight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      const midpoint = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      chapters.forEach((_, index) => {
        const section = document.getElementById(`chapter-${index}`);
        if (section && section.offsetTop <= midpoint) current = index;
      });
      setActiveChapter(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToChapter = (index: number) => {
    document.getElementById(`chapter-${index}`)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      window.setTimeout(() => setIsShared(false), 2200);
    } catch {
      setIsShared(false);
    }
  };

  return (
    <main className={`${isLowLight ? 'soft-focus' : ''} grain min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-700`} data-testid="poetry-experience">
      <div className="fixed left-0 top-0 z-40 h-0.5 bg-[hsl(var(--secondary))] transition-[width] duration-150" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-30 border-b border-[hsl(var(--border)/.55)] bg-[hsl(var(--background)/.86)] backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-10">
          <button className="group flex items-center gap-3 text-left" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-back-to-top">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform duration-300 group-hover:rotate-[-12deg]">
              <Heart size={14} fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--primary))]">Late Night Poetry</span>
          </button>
          <div className="hidden items-center gap-5 sm:flex">
            <button className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" onClick={() => setIsLowLight((value) => !value)} data-testid="button-low-light">
              <Moon size={14} strokeWidth={1.5} />
              {isLowLight ? 'Full light' : 'Low light'}
            </button>
            <button className="flex items-center gap-2 border-l border-[hsl(var(--border))] pl-5 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" onClick={copyLink} data-testid="button-share-poem">
              {isShared ? <Check size={14} /> : <Copy size={14} />}
              {isShared ? 'Link copied' : 'Send this'}
            </button>
          </div>
          <button className="rounded-full p-2 text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--muted))] sm:hidden" onClick={() => setIsMenuOpen((value) => !value)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t border-[hsl(var(--border)/.6)] bg-[hsl(var(--background))] px-5 py-4 sm:hidden">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]" onClick={() => setIsLowLight((value) => !value)} data-testid="button-mobile-low-light">
                <Moon size={14} /> {isLowLight ? 'Full light' : 'Low light'}
              </button>
              <button className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]" onClick={copyLink} data-testid="button-mobile-share">
                {isShared ? <Check size={14} /> : <Copy size={14} />} {isShared ? 'Link copied' : 'Send this'}
              </button>
            </div>
          </div>
        )}
      </header>

      <aside className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex" aria-label="Poem chapters">
        {chapters.map((chapter, index) => (
          <button className="group flex items-center gap-2" key={chapter.eyebrow} onClick={() => scrollToChapter(index)} data-testid={`button-chapter-${index}`}>
            <span className={`font-mono-custom text-[9px] transition-all duration-300 ${activeChapter === index ? 'translate-x-0 opacity-100 text-[hsl(var(--primary))]' : 'translate-x-2 opacity-0 text-[hsl(var(--muted-foreground))] group-hover:translate-x-0 group-hover:opacity-100'}`}>
              {chapter.eyebrow.split(' / ')[1]}
            </span>
            <span className={`h-1.5 w-1.5 rounded-full border transition-all duration-300 ${activeChapter === index ? 'scale-150 border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]' : 'border-[hsl(var(--muted-foreground))] bg-transparent group-hover:bg-[hsl(var(--secondary))]'}`} />
          </button>
        ))}
      </aside>

      <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:pt-36" data-testid="hero-section">
        <div className="ambient-detail pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full border border-[hsl(var(--secondary)/.35)] sm:right-12 sm:top-32 sm:h-[30rem] sm:w-[30rem]" aria-hidden="true" />
        <div className="ambient-detail pointer-events-none absolute right-24 top-48 hidden h-2 w-2 rounded-full bg-[hsl(var(--secondary))] shadow-[0_0_0_10px_hsl(var(--secondary)/.12)] sm:block" aria-hidden="true" />
        <div className="ambient-detail pointer-events-none absolute bottom-24 left-[9%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div className="relative z-10">
            <Reveal>
              <div className="mb-9 flex items-center gap-3">
                <Sparkles size={15} className="text-[hsl(var(--accent))]" strokeWidth={1.4} />
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))]">a small thing, meant to be read slowly</span>
              </div>
              <h1 className="max-w-3xl font-display text-[clamp(4.8rem,14vw,11rem)] font-medium leading-[0.75] tracking-[-0.065em] text-[hsl(var(--primary))]" data-testid="text-poem-title">
                For <em className="font-normal text-[hsl(var(--secondary-foreground))]">her</em>
              </h1>
              <p className="mt-10 max-w-md font-display text-2xl leading-tight text-[hsl(var(--muted-foreground))] sm:text-3xl">A love letter for the hour when the rest of the world has gone quiet.</p>
              <button className="group mt-12 inline-flex items-center gap-3 border-b border-[hsl(var(--primary)/.55)] pb-2 font-mono-custom text-[10px] uppercase tracking-[0.19em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))]" onClick={() => scrollToChapter(0)} data-testid="button-begin-reading">
                Begin reading
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </Reveal>
          </div>
          <Reveal className="relative lg:pb-8">
            <div className="relative ml-auto max-w-sm border-l border-[hsl(var(--secondary)/.65)] pl-7 sm:pl-10">
              <Quote className="absolute -left-3 -top-4 h-6 w-6 bg-[hsl(var(--background))] p-1 text-[hsl(var(--secondary-foreground))]" fill="currentColor" strokeWidth={0} />
              <p className="font-display text-3xl leading-[1.02] text-[hsl(var(--primary))] sm:text-4xl">“Some words take a while to find. These are the ones that found me.”</p>
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-8 bg-[hsl(var(--secondary))]" />
                <span className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">read in 7 quiet chapters</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-custom text-[9px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] sm:flex">
          <span className="h-px w-8 bg-[hsl(var(--border))]" /> scroll gently <span className="h-px w-8 bg-[hsl(var(--border))]" />
        </div>
      </section>

      <section className="reading-page relative border-y border-[hsl(var(--border)/.7)] px-6 py-20 sm:px-10 sm:py-28" data-testid="opening-section">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
          <Reveal>
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">The first thought</p>
            <div className="mt-5 h-px w-14 bg-[hsl(var(--secondary))]" />
          </Reveal>
          <Reveal>
            <p className="max-w-3xl font-display text-[clamp(2.35rem,5.4vw,5rem)] leading-[0.92] tracking-[-0.035em] text-[hsl(var(--primary))]">For the feeling that arrives before the words do.</p>
            <p className="mt-8 max-w-lg font-sans text-sm leading-7 text-[hsl(var(--muted-foreground))]">No need to hurry through this. Let each line have its own little room. The next page will still be here.</p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-0 sm:px-4">
        {chapters.map((chapter, index) => <ChapterSection chapter={chapter} index={index} key={chapter.eyebrow} />)}
      </div>

      <section className="relative overflow-hidden bg-[hsl(var(--primary))] px-6 py-28 text-[hsl(var(--primary-foreground))] sm:px-10 sm:py-40" data-testid="closing-section">
        <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[hsl(var(--secondary)/.25)] sm:right-20 sm:h-[34rem] sm:w-[34rem]" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <Heart size={16} className="text-[hsl(var(--secondary))]" fill="currentColor" strokeWidth={1.4} />
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground)/.65)]">the last page, for now</span>
            </div>
            <h2 className="mt-10 max-w-4xl font-display text-[clamp(4.5rem,12vw,10rem)] leading-[0.72] tracking-[-0.065em]" data-testid="text-closing-line">I like you.</h2>
            <p className="mt-12 max-w-md font-display text-2xl leading-tight text-[hsl(var(--primary-foreground)/.75)] sm:text-3xl">Keep this somewhere soft. Come back whenever the night is kind enough to remind you.</p>
          </Reveal>
          <Reveal className="mt-24 border-t border-[hsl(var(--primary-foreground)/.2)] pt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--primary-foreground)/.5)]">By:</p>
                <p className="mt-2 font-display text-2xl">(Luser_101) A.A.M.</p>
              </div>
              <div>
                <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--primary-foreground)/.5)]">To:</p>
                <p className="mt-2 font-display text-2xl">A.C.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[hsl(var(--background))] px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
              <Heart size={14} fill="currentColor" />
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em]">Late Night Poetry</span>
            </div>
            <p className="mt-3 max-w-xs font-display text-xl italic text-[hsl(var(--muted-foreground))]">Read slowly. Feel everything.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="group inline-flex items-center gap-2 border-b border-[hsl(var(--border))] pb-1 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]" onClick={copyLink} data-testid="button-footer-share">
              {isShared ? <Check size={13} /> : <Copy size={13} />} {isShared ? 'Link copied' : 'Send this to someone'}
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button className="rounded-full border border-[hsl(var(--border))] p-2 text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--muted))]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Return to the beginning" data-testid="button-footer-top">
              <ArrowUpRight size={14} className="rotate-[-45deg]" />
            </button>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between border-t border-[hsl(var(--border)/.65)] pt-4">
          <span className="font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]">A.C. / 2026</span>
          <button className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]" onClick={() => setIsPlaying((value) => !value)} data-testid="button-ambient-reading">
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            {isPlaying ? 'Pause the quiet' : 'Keep the quiet'}
          </button>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;