import { useState, useEffect, useRef } from 'react'
import {
  Twitter, Instagram, Linkedin, MessageCircle,
  Phone, Mail, Clock, ArrowRight, Check,
  Menu, X,
} from 'lucide-react'
import { Footerdemo } from '@/components/ui/footer-section'
import { HoverSlider, TextStaggerHover } from '@/components/blocks/animated-slideshow'
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

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4'
const BG_VIDEO_FILTER = 'hue-rotate(55deg) saturate(1.4) brightness(0.9)'

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

// ─── Catalog galleries data ───────────────────────────────────────────────────

const CATEGORY_GALLERIES = [
  {
    id: '2d',
    title: '2D Изображения',
    href: '/catalog/kartiny-2d',
    images: [
      { url: 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp', caption: 'Попугай • А5 • 3 500 деталей' },
      { url: 'https://gekkotoys.ru/cache/images/2Д/Новый_год_2д_А5/800_cover_92_1734084112_карточка38025jpg.webp', caption: 'Новогодний набор • А5' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp', caption: 'Картины из цветных фишек' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp', caption: '8 тематических серий' },
      { url: 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp', caption: 'Форматы А5 и А3' },
    ],
  },
  {
    id: '3d',
    title: '3D Фигуры',
    href: '/catalog/3d',
    images: [
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: 'Объёмные конструкторы' },
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: 'Машины и животные' },
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: 'Праздничные наборы' },
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: 'Объёмные фигуры из фишек' },
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: '3D конструктор ГЕККО' },
    ],
  },
  {
    id: 'art',
    title: 'Гекко АРТ',
    href: '/catalog/art-konstruktor',
    images: [
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp', caption: 'Загрузи своё фото' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp', caption: 'Уникальный пиксельный портрет' },
      { url: 'https://gekkotoys.ru/cache/images/800_cover_92_1726841581_Приглашение_Экспо(2)jpg.webp', caption: 'Любое фото → пикселизация' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp', caption: 'Персональный набор' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp', caption: 'Пикселизатор онлайн' },
    ],
  },
  {
    id: 'catalog',
    title: 'Перейти в каталог',
    href: '/catalog',
    images: [
      { url: 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp', caption: 'Все наборы ГЕККО ТОЙС' },
      { url: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp', caption: '2D и 3D форматы' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp', caption: 'Гекко АРТ' },
      { url: 'https://gekkotoys.ru/cache/images/2Д/Новый_год_2д_А5/800_cover_92_1734084112_карточка38025jpg.webp', caption: 'Новогодние наборы' },
      { url: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp', caption: 'Весь ассортимент' },
    ],
  },
]

const GALLERY_AUTOPLAY_MS = 3000

// ─── CatalogSection — category tabs left + per-category auto-carousel right ──

function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isProgrammatic = useRef(false)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentGallery = CATEGORY_GALLERIES[activeCategory]

  useEffect(() => {
    setActiveImage(0)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [activeCategory])

  const scrollToImage = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    isProgrammatic.current = true
    container.scrollTo({ left: container.offsetWidth * index, behavior: 'smooth' })
    setTimeout(() => { isProgrammatic.current = false }, 700)
  }

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setActiveImage(prev => {
        const next = (prev + 1) % currentGallery.images.length
        scrollToImage(next)
        return next
      })
    }, GALLERY_AUTOPLAY_MS)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [activeCategory, currentGallery.images.length])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-img-idx]'))
    const observer = new IntersectionObserver(
      entries => {
        if (isProgrammatic.current) return
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveImage(Number(entry.target.getAttribute('data-img-idx')))
        })
      },
      { root: container, threshold: 0.55 }
    )
    slides.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory])

  const goToImage = (index: number) => {
    setActiveImage(index)
    scrollToImage(index)
  }

  return (
    <HoverSlider
      activeSlide={activeCategory}
      onChangeSlide={setActiveCategory}
      className="px-6 sm:px-10 py-20 sm:py-28"
    >
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-[#276152] dark:text-[#7BBFB0] mb-10">
          / наши продукты
        </p>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-16">

          {/* ── Left: category tabs — стеггер на десктопе, таблетки на мобильном ── */}
          <div className="order-2 lg:order-1 w-full lg:w-auto min-w-0">
            {/* Mobile: horizontal scroll pills */}
            <div
              className="lg:hidden flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              {CATEGORY_GALLERIES.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(index)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    index === activeCategory
                      ? 'bg-[#276152] text-white border-[#276152]'
                      : 'text-[#ECEFE9]/60 border-white/20 hover:border-white/40'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Desktop: TextStaggerHover list */}
            <div className="hidden lg:flex flex-col gap-6">
              {CATEGORY_GALLERIES.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(index)}
                  className="group flex items-center gap-4 text-left"
                >
                  <TextStaggerHover
                    index={index}
                    text={cat.title}
                    className="text-4xl xl:text-5xl font-black uppercase tracking-tighter font-display text-[#0D3A35] dark:text-[#ECEFE9] leading-none"
                  />
                  <ArrowRight
                    size={22}
                    className={`shrink-0 mt-1 transition-all duration-200 ${
                      index === activeCategory
                        ? 'text-[#0D3A35] dark:text-[#ECEFE9] translate-x-1'
                        : 'text-[#0D3A35]/20 dark:text-[#ECEFE9]/20 group-hover:text-[#0D3A35]/40 dark:group-hover:text-[#ECEFE9]/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: per-category auto-scrolling carousel ── */}
          <div className="order-1 lg:order-2 w-full lg:w-[460px] xl:w-[520px] shrink-0">

            <div
              ref={scrollRef}
              className="rounded-3xl overflow-hidden shadow-2xl flex snap-x snap-mandatory"
              style={{ aspectRatio: '4/3', scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'auto' }}
            >
              {currentGallery.images.map((img, index) => (
                <div
                  key={`${activeCategory}-${index}`}
                  data-img-idx={index}
                  className="relative flex-shrink-0 w-full h-full snap-start select-none"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 text-xs font-bold text-white/70 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {index + 1}/{currentGallery.images.length}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 h-10 flex items-start overflow-hidden">
              <p className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 leading-relaxed">
                {currentGallery.images[activeImage]?.caption}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {currentGallery.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  aria-label={`Фото ${i + 1}`}
                  className="relative h-1.5 rounded-full overflow-hidden focus:outline-none"
                  style={{
                    width: i === activeImage ? 28 : 6,
                    background: 'rgba(13,58,53,0.18)',
                    transition: 'width 0.3s ease',
                  }}
                >
                  {i === activeImage && (
                    <div
                      key={`fill-${activeCategory}-${activeImage}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-[#0D3A35] dark:bg-[#ECEFE9]"
                      style={{ animation: `slideProgress ${GALLERY_AUTOPLAY_MS}ms linear forwards` }}
                    />
                  )}
                </button>
              ))}
              <div className="ml-auto flex gap-1.5">
                <button
                  onClick={() => goToImage((activeImage - 1 + currentGallery.images.length) % currentGallery.images.length)}
                  className="w-8 h-8 rounded-full border border-[#0D3A35]/20 dark:border-[#ECEFE9]/20 flex items-center justify-center hover:bg-[#0D3A35]/8 dark:hover:bg-white/10 transition-colors"
                  aria-label="Назад"
                >
                  <ArrowRight size={13} className="text-[#0D3A35] dark:text-[#ECEFE9] rotate-180" />
                </button>
                <button
                  onClick={() => goToImage((activeImage + 1) % currentGallery.images.length)}
                  className="w-8 h-8 rounded-full border border-[#0D3A35]/20 dark:border-[#ECEFE9]/20 flex items-center justify-center hover:bg-[#0D3A35]/8 dark:hover:bg-white/10 transition-colors"
                  aria-label="Вперёд"
                >
                  <ArrowRight size={13} className="text-[#0D3A35] dark:text-[#ECEFE9]" />
                </button>
              </div>
            </div>

            <a
              href={currentGallery.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#276152] dark:text-[#7BBFB0] hover:opacity-70 transition-opacity"
            >
              Смотреть все <ArrowRight size={14} />
            </a>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const postHeroRef = useRef<HTMLDivElement>(null)
  const [starMousePos, setStarMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null })

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

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
    'flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-[#0D3A35]/20 dark:border-white/20 bg-transparent placeholder-[#0D3A35]/40 dark:placeholder-white/40 text-[#0D3A35] dark:text-[#ECEFE9] focus:outline-none focus:ring-2 focus:ring-[#276152] dark:focus:ring-[#276152]/60 focus:border-transparent transition'

  return (
    <div className="min-h-screen bg-[#FBF6F0] dark:bg-[#07201C]">

      {/* ════════════════════════════════════════════════
          FIXED NAVBAR
      ════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4">
        {/* ── Main bar ── */}
        <div className="flex items-center pl-3 sm:pl-4 pr-2 py-2
          bg-[#FBF6F0]/80 dark:bg-[#07201C]/80 backdrop-blur-md rounded-2xl shadow-sm
          gap-3 sm:gap-6">
          <a href="/" className="shrink-0">
            <div className="bg-white rounded-xl px-2 py-1">
              <img
                src={LOGO_BLACK_URL}
                alt="ГЕККО ТОЙС"
                className="h-7 w-auto"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
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
                className="text-[#0D3A35] dark:text-[#ECEFE9] text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href={PIXELATOR} className="hidden sm:block">
              <LiquidButton size="sm" className="bg-[#276152] hover:bg-[#1B4D42] text-white font-semibold whitespace-nowrap rounded-xl">
                Начать проект
              </LiquidButton>
            </a>
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="sm:hidden w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen
                ? <X size={18} className="text-[#ECEFE9]" />
                : <Menu size={18} className="text-[#ECEFE9]" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 bg-[#07201C]/97 backdrop-blur-md rounded-2xl overflow-hidden">
            <div className="flex flex-col divide-y divide-white/8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={e => {
                    setMobileMenuOpen(false)
                    if (href.startsWith('#')) {
                      e.preventDefault()
                      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 80)
                    }
                  }}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-base font-semibold text-[#ECEFE9] px-5 py-4 hover:bg-white/5 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="px-4 pb-4 pt-3">
              <a href={PIXELATOR} onClick={() => setMobileMenuOpen(false)}>
                <LiquidButton size="sm" className="w-full bg-[#276152] hover:bg-[#1B4D42] text-white font-semibold rounded-xl justify-center">
                  Начать проект
                </LiquidButton>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════════
          HERO — scroll-expand video + seamless bg
      ════════════════════════════════════════════════ */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero.mp4"
        bgVideoSrc={VIDEO_URL}
        bgVideoFilter={BG_VIDEO_FILTER}
        title="ГЕККО АРТ"
        scrollToExpand="Прокрути, чтобы открыть ↓"
        heroContent={
          <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4 px-6 sm:px-12 pb-10 sm:pb-16">
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Пиксельный конструктор
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white leading-tight mb-3 drop-shadow-xl">
                Конструктор<br />с почти<br />безграничными<br />возможностями
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">
                Загрузи любое фото — получи уникальный пиксельный набор для сборки
              </p>
            </div>
            <div className="flex flex-row sm:flex-col gap-3 shrink-0">
              <a
                href={PIXELATOR}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-[#0D3A35] font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap"
              >
                Стандартный набор <ArrowRight size={13} />
              </a>
              <a
                href={PIXELATOR}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:border-white/80 hover:bg-white/10 transition-all whitespace-nowrap"
              >
                Проект <ArrowRight size={13} />
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
        className="relative z-10 bg-[#FBF6F0] dark:bg-[#07201C] overflow-hidden"
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
        <section id="contacts" className="bg-[#FBF6F0] dark:bg-[#07201C] px-6 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-start">

            {/* Left: intro */}
            <div>
              <h2 className="text-3xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9] mb-4">Напишите нам!</h2>
              <p className="text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 text-base leading-relaxed mb-8 max-w-sm">
                Расскажите о вашем проекте — ответим в течение 24 часов и подберём лучший вариант набора.
              </p>

              <div className="flex flex-row items-center justify-between gap-3 bg-[#0D3A35]/5 dark:bg-white/5 rounded-2xl px-4 py-3 mb-6">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/40 font-medium mb-0.5">Напрямую</span>
                  <a href="mailto:oooalextoys@mail.ru" className="text-[#276152] dark:text-[#7BBFB0] font-semibold text-sm hover:underline truncate">
                    oooalextoys@mail.ru
                  </a>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <SocialBtn icon={<Twitter size={13} />}       bg="bg-[#0D3A35]/8 dark:bg-white/10"   color="text-[#0D3A35] dark:text-[#ECEFE9]"   label="Twitter"   />
                  <SocialBtn icon={<MessageCircle size={13} />} bg="bg-[#276152]/10 dark:bg-[#276152]/20"   color="text-[#276152] dark:text-[#7BBFB0]"   label="Telegram"  />
                  <SocialBtn icon={<Instagram size={13} />}     bg="bg-orange-100 dark:bg-orange-900/30" color="text-orange-400" label="Instagram" />
                  <SocialBtn icon={<Linkedin size={13} />}      bg="bg-blue-100 dark:bg-blue-900/30"   color="text-blue-600 dark:text-blue-400"   label="LinkedIn"  />
                </div>
              </div>

            </div>

            {/* Right: form */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0D3A35]/40 dark:text-[#ECEFE9]/30 mb-5">
                Заполните форму
              </p>
              {sent ? (
                <div className="flex flex-col items-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#276152]/10 dark:bg-[#276152]/30 flex items-center justify-center"><Check size={22} className="text-[#276152]" /></div>
                  <p className="text-base font-semibold text-[#0D3A35] dark:text-[#ECEFE9]">Отправлено!</p>
                  <p className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60">Ответим в течение 24 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text"  placeholder="Имя"   value={name}    onChange={e => setName(e.target.value)}    required className={inputCls} />
                    <input type="email" placeholder="Email" value={email}   onChange={e => setEmail(e.target.value)}   required className={inputCls} />
                  </div>
                  <textarea rows={4} placeholder="Что хотите создать или улучшить..." value={message} onChange={e => setMessage(e.target.value)} className={`${inputCls} w-full resize-none`} />

                  <div>
                    <label className="text-sm font-medium text-[#0D3A35] dark:text-[#ECEFE9] block mb-2">Что вас интересует?</label>
                    <div className="flex flex-wrap gap-1.5">
                      {SERVICES.map(s => (
                        <button key={s} type="button" onClick={() => toggleService(s)}
                          className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                            selected.includes(s)
                              ? 'bg-[#276152]/10 dark:bg-white/15 text-[#0D3A35] dark:text-[#ECEFE9] border-[#276152] dark:border-white/40'
                              : 'bg-[#FBF6F0] dark:bg-transparent text-[#0D3A35]/70 dark:text-[#ECEFE9]/70 border-[#0D3A35]/20 dark:border-white/20 hover:border-[#276152] dark:hover:border-white/40'
                          }`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={sending}
                    className="w-full bg-[#276152] dark:bg-[#276152] text-white text-sm font-semibold py-3 rounded-2xl hover:bg-[#1B4D42] dark:hover:bg-[#1B4D42] transition-colors disabled:opacity-60">
                    {sending ? 'Отправляем...' : 'Отправить сообщение'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CONTACTS + MAP
        ════════════════════════════════════════════════ */}
        <section id="contacts" className="bg-[#ECEFE9] dark:bg-[#07201C] px-6 sm:px-10 py-20">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start mb-20">
              <div>
                <h2 className="text-3xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9] mb-8">Контакты</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#276152]/10 dark:bg-[#276152]/30 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#276152]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0D3A35] dark:text-[#ECEFE9]">Телефон</div>
                      <div className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 mt-0.5">8-499-165-04-23</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0D3A35] dark:text-[#ECEFE9]">Email</div>
                      <div className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 mt-0.5">oooalextoys@mail.ru<br />alextoys.sale@mail.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0D3A35] dark:text-[#ECEFE9]">Часы работы</div>
                      <div className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 mt-0.5">Пн–Пт: 10:00 – 18:00<br />Сб–Вс: выходные дни</div>
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
