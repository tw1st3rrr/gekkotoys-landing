import { useState, useEffect, useRef } from 'react'
import {
  Twitter, Instagram, Linkedin, MessageCircle,
  Phone, Mail, Clock, ArrowRight, Check,
  Sun, Moon,
} from 'lucide-react'
import { Footerdemo } from '@/components/ui/footer-section'
import {
  HoverSlider,
  TextStaggerHover,
} from '@/components/blocks/animated-slideshow'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { ScrollExpandMedia } from '@/components/blocks/scroll-expansion-hero'
import { HowItWorksSection }      from '@/components/sections/HowItWorksSection'
import { Starfield } from '@/components/ui/starfield'

import { PriceCalculatorSection } from '@/components/sections/PriceCalculatorSection'
import { GiftSection }            from '@/components/sections/GiftSection'
import { ReviewsSection }         from '@/components/sections/ReviewsSection'
import { FAQSection }             from '@/components/sections/FAQSection'

// ─── Constants ────────────────────────────────────────────────────────────────

const PIXELATOR = 'http://91.229.10.93:5000/'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4'

const NAV_LINKS = [
  { label: 'О конструкторе', href: '#how-it-works' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Пикселизатор', href: PIXELATOR },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

const LOGO_BLACK_URL = '/logo-black.svg'

const SERVICES = [
  'Стандартный набор',
  'Индивидуальный проект',
  'Оптовый заказ',
  'Корпоративный заказ',
  'Партнёрство',
  '3D-фигуры',
  'Готовые картины',
  'Консультация',
  'Другое',
]


// ─── SocialBtn ────────────────────────────────────────────────────────────────

function SocialBtn({
  icon, bg, color, href = '#', label,
}: {
  icon: React.ReactNode; bg: string; color: string; href?: string; label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${bg} ${color}`}
    >
      {icon}
    </a>
  )
}

// ─── Catalog slides data ─────────────────────────────────────────────────────

const CATALOG_SLIDES = [
  {
    id: 'slide-2d',
    title: '2D Изображения',
    subtitle: 'Картины из цветных фишек — 8 тематических серий, форматы А5 и А3',
    imageUrl: 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp',
    href: '/catalog/kartiny-2d',
    color: '#3b82f6',
  },
  {
    id: 'slide-3d',
    title: '3D Фигуры',
    subtitle: 'Объёмные конструкторы — машины, животные, праздничные наборы',
    imageUrl: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp',
    href: '/catalog/3d',
    color: '#f97316',
  },
  {
    id: 'slide-art',
    title: 'Гекко АРТ',
    subtitle: 'Загрузи своё фото — получи уникальный пиксельный набор',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp',
    href: '/catalog/art-konstruktor',
    color: '#22c55e',
  },
  {
    id: 'slide-catalog',
    title: 'Перейти в каталог',
    subtitle: 'Все наборы ГЕККО ТОЙС в одном месте',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp',
    href: '/catalog',
    color: '#8b5cf6',
  },
]

// ─── CatalogSection — hover-list left + scroll-snap carousel right ───────────

const AUTOPLAY_MS = 5000

function CatalogSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isProgrammatic = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-slide-idx]'))
    const observer = new IntersectionObserver(
      entries => {
        if (isProgrammatic.current) return
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSlide(Number(entry.target.getAttribute('data-slide-idx')))
          }
        })
      },
      { root: container, threshold: 0.55 }
    )
    slides.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    isProgrammatic.current = true
    const slideWidth = container.offsetWidth
    container.scrollTo({ left: slideWidth * index, behavior: 'smooth' })
    setTimeout(() => { isProgrammatic.current = false }, 700)
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % CATALOG_SLIDES.length
        scrollToSlide(next)
        return next
      })
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  const handleLeftSelect = (index: number) => {
    setActiveSlide(index)
    scrollToSlide(index)
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2)
  }

  const goTo = (index: number) => {
    setActiveSlide(index)
    scrollToSlide(index)
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2)
  }

  return (
    <HoverSlider
      activeSlide={activeSlide}
      onChangeSlide={handleLeftSelect}
      className="px-6 sm:px-10 py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-[#c96442] mb-10">
          / наши продукты
        </p>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">

          {/* ── Left: hover-text list ── */}
          <div className="flex flex-col gap-4 sm:gap-6 min-w-0">
            {CATALOG_SLIDES.map((s, index) => (
              <a
                key={s.id}
                href={s.href}
                className="group flex items-center gap-4 no-underline"
              >
                <TextStaggerHover
                  index={index}
                  text={s.title}
                  className="cursor-pointer text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter text-[#3d3929] dark:text-[#f0ede6] leading-none"
                />
                <ArrowRight
                  size={22}
                  className="text-[#3d3929]/30 dark:text-[#f0ede6]/30 group-hover:text-[#3d3929] dark:group-hover:text-[#f0ede6] group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
                />
              </a>
            ))}
          </div>

          {/* ── Right: scroll-snap image carousel ── */}
          <div className="w-full lg:w-[460px] xl:w-[520px] shrink-0">

            <div
              ref={scrollRef}
              className="rounded-3xl overflow-hidden shadow-2xl flex snap-x snap-mandatory"
              style={{
                aspectRatio: '4/3',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                overflowX: 'auto',
              }}
            >
              {CATALOG_SLIDES.map((s, index) => (
                <div
                  key={s.id}
                  data-slide-idx={index}
                  className="relative flex-shrink-0 w-full h-full snap-start select-none"
                >
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 text-xs font-bold text-white/70 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {index + 1}/{CATALOG_SLIDES.length}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 h-10 flex items-start overflow-hidden">
              <p className="text-sm text-[#3d3929]/60 dark:text-[#f0ede6]/60 leading-relaxed transition-opacity duration-300">
                {CATALOG_SLIDES[activeSlide].subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {CATALOG_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className="relative h-1.5 rounded-full overflow-hidden focus:outline-none"
                  style={{
                    width: i === activeSlide ? 28 : 6,
                    background: 'rgba(61,57,41,0.18)',
                    transition: 'width 0.3s ease',
                  }}
                >
                  {i === activeSlide && !paused && (
                    <div
                      key={`fill-${activeSlide}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-[#3d3929] dark:bg-[#f0ede6]"
                      style={{ animation: `slideProgress ${AUTOPLAY_MS}ms linear forwards` }}
                    />
                  )}
                </button>
              ))}

              <div className="ml-auto flex gap-1.5">
                <button
                  onClick={() => goTo((activeSlide - 1 + CATALOG_SLIDES.length) % CATALOG_SLIDES.length)}
                  className="w-8 h-8 rounded-full border border-[#3d3929]/20 dark:border-[#f0ede6]/20 flex items-center justify-center hover:bg-[#3d3929]/8 dark:hover:bg-white/10 transition-colors"
                  aria-label="Назад"
                >
                  <ArrowRight size={13} className="text-[#3d3929] dark:text-[#f0ede6] rotate-180" />
                </button>
                <button
                  onClick={() => goTo((activeSlide + 1) % CATALOG_SLIDES.length)}
                  className="w-8 h-8 rounded-full border border-[#3d3929]/20 dark:border-[#f0ede6]/20 flex items-center justify-center hover:bg-[#3d3929]/8 dark:hover:bg-white/10 transition-colors"
                  aria-label="Вперёд"
                >
                  <ArrowRight size={13} className="text-[#3d3929] dark:text-[#f0ede6]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </HoverSlider>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const postHeroRef = useRef<HTMLDivElement>(null)
  const [starMousePos, setStarMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null })

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  function toggleService(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
  }

  const inputCls =
    'flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/20 bg-transparent placeholder-gray-400 dark:placeholder-white/40 text-gray-900 dark:text-[#f0ede6] focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/30 focus:border-transparent transition'

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#1c1a15]">

      {/* ════════════════════════════════════════════════
          FIXED NAVBAR
      ════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4">
        <div className="flex items-center pl-3 sm:pl-4 pr-2 py-2
          bg-white/70 dark:bg-[#1c1a15]/80 backdrop-blur-md rounded-2xl shadow-sm
          gap-3 sm:gap-6">
          <a href="/" className="shrink-0">
            <img
              src={LOGO_BLACK_URL}
              alt="ГЕККО ТОЙС"
              className="h-8 w-auto"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </a>
          <div className="hidden sm:flex items-center gap-6 flex-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={href.startsWith('#') ? (e) => {
                  e.preventDefault()
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
                } : undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-800 dark:text-[#f0ede6] text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-xl bg-[#3d3929] hover:bg-[#2d2a1f] flex items-center justify-center transition-colors shrink-0"
              aria-label="Переключить тему"
            >
              {isDark
                ? <Sun size={16} className="text-white" />
                : <Moon size={16} className="text-white" />}
            </button>
            <a href={PIXELATOR}>
              <LiquidButton size="sm" className="bg-[#3d3929] hover:bg-[#2d2a1f] text-white font-semibold whitespace-nowrap rounded-xl">
                Начать проект
              </LiquidButton>
            </a>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          HERO — scroll-expand video + boomerang bg
      ════════════════════════════════════════════════ */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero.mp4"
        bgVideoSrc={VIDEO_URL}
        title="ГЕККО АРТ"
        scrollToExpand="Прокрути, чтобы открыть ↓"
        heroContent={
          <div className="w-full flex items-end justify-between gap-4 px-8 sm:px-12 pb-10 sm:pb-16 flex-wrap">
            <div className="max-w-xs">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Пиксельный конструктор
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3 drop-shadow-xl">
                Конструктор<br />с почти<br />безграничными<br />возможностями
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-[260px]">
                Загрузи любое фото — получи уникальный пиксельный набор для сборки
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={PIXELATOR}
                className="inline-flex items-center gap-2 bg-white text-[#3d3929] font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap"
              >
                Стандартный набор <ArrowRight size={13} />
              </a>
              <a
                href={PIXELATOR}
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:border-white/80 hover:bg-white/10 transition-all whitespace-nowrap"
              >
                Индивидуальный проект <ArrowRight size={13} />
              </a>
            </div>
          </div>
        }
      />

      {/* ════════════════════════════════════════════════
          POST-HERO — shared starfield background
      ════════════════════════════════════════════════ */}
      <div
        ref={postHeroRef}
        className="relative z-10 bg-[#faf9f5] dark:bg-[#1c1a15] overflow-hidden"
        onMouseMove={e => setStarMousePos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setStarMousePos({ x: null, y: null })}
      >
        <Starfield count={200} mousePos={starMousePos} containerRef={postHeroRef} />
        <HowItWorksSection />

        <PriceCalculatorSection />

        <div id="catalog"><CatalogSection /></div>

        <GiftSection />
        <div id="reviews"><ReviewsSection /></div>
        <FAQSection />

        {/* ════════════════════════════════════════════════
            CONTACT FORM SECTION
        ════════════════════════════════════════════════ */}
        <section id="contacts" className="bg-white dark:bg-[#242018] px-6 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-start">

            {/* Left: intro */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-[#f0ede6] mb-4">Напишите нам!</h2>
              <p className="text-gray-500 dark:text-[#f0ede6]/60 text-base leading-relaxed mb-8 max-w-sm">
                Расскажите о вашем проекте — ответим в течение 24 часов и подберём лучший вариант набора.
              </p>

              <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 dark:bg-white/5 rounded-2xl px-4 py-3 mb-6">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-gray-400 dark:text-[#f0ede6]/40 font-medium mb-0.5">Напрямую</span>
                  <a href="mailto:oooalextoys@mail.ru" className="text-blue-600 dark:text-[#c96442] font-semibold text-sm hover:underline truncate">
                    oooalextoys@mail.ru
                  </a>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <SocialBtn icon={<Twitter size={13} />}       bg="bg-gray-100 dark:bg-white/10"   color="text-gray-800 dark:text-[#f0ede6]"   label="Twitter"   />
                  <SocialBtn icon={<MessageCircle size={13} />} bg="bg-pink-100 dark:bg-pink-900/30"   color="text-pink-500"   label="Telegram"  />
                  <SocialBtn icon={<Instagram size={13} />}     bg="bg-orange-100 dark:bg-orange-900/30" color="text-orange-400" label="Instagram" />
                  <SocialBtn icon={<Linkedin size={13} />}      bg="bg-blue-100 dark:bg-blue-900/30"   color="text-blue-600 dark:text-blue-400"   label="LinkedIn"  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-gray-400 dark:text-[#f0ede6]/40 font-medium text-sm">ИЛИ заполните форму</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              </div>
            </div>

            {/* Right: form */}
            <div>
              {sent ? (
                <div className="flex flex-col items-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center"><Check size={22} className="text-green-600" /></div>
                  <p className="text-base font-semibold text-gray-900 dark:text-[#f0ede6]">Отправлено!</p>
                  <p className="text-sm text-gray-500 dark:text-[#f0ede6]/60">Ответим в течение 24 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text"  placeholder="Имя"   value={name}    onChange={e => setName(e.target.value)}    required className={inputCls} />
                    <input type="email" placeholder="Email" value={email}   onChange={e => setEmail(e.target.value)}   required className={inputCls} />
                  </div>
                  <textarea rows={4} placeholder="Что хотите создать или улучшить..." value={message} onChange={e => setMessage(e.target.value)} className={`${inputCls} w-full resize-none`} />

                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-[#f0ede6] block mb-2">Что вас интересует?</label>
                    <div className="flex flex-wrap gap-1.5">
                      {SERVICES.map(s => (
                        <button key={s} type="button" onClick={() => toggleService(s)}
                          className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                            selected.includes(s)
                              ? 'bg-gray-100 dark:bg-white/15 text-black dark:text-[#f0ede6] border-black dark:border-white/40'
                              : 'bg-white dark:bg-transparent text-gray-700 dark:text-[#f0ede6]/70 border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40'
                          }`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={sending}
                    className="w-full bg-black dark:bg-[#c96442] text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 dark:hover:bg-[#b5573a] transition-colors disabled:opacity-60">
                    {sending ? 'Отправляем...' : 'Отправить сообщение'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SCREEN 3 — CONTACTS + MAP + NEWS
        ════════════════════════════════════════════════ */}
        <section id="contacts" className="bg-gray-50 dark:bg-[#1e1b14] px-6 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start mb-20">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-[#f0ede6] mb-8">Контакты</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-[#f0ede6]">Телефон</div>
                      <div className="text-sm text-gray-600 dark:text-[#f0ede6]/60 mt-0.5">8-499-165-04-23</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-[#f0ede6]">Email</div>
                      <div className="text-sm text-gray-600 dark:text-[#f0ede6]/60 mt-0.5">oooalextoys@mail.ru<br />alextoys.sale@mail.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-[#f0ede6]">Часы работы</div>
                      <div className="text-sm text-gray-600 dark:text-[#f0ede6]/60 mt-0.5">Пн–Пт: 10:00 – 18:00<br />Сб–Вс: выходные дни</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg h-[320px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor&ll=37.598812%2C55.739625&z=16&pt=37.598812,55.739625"
                  allowFullScreen
                  loading="lazy"
                  title="ГЕККО АРТ на карте"
                  className="w-full h-full border-0"
                />
              </div>
            </div>


          </div>
        </section>

        {/* Footer */}
        <Footerdemo />

      </div>

    </div>
  )
}
