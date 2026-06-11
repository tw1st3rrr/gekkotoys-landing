import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { motion, useSpring } from 'motion/react'
import { Check, Star as LucideStar } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Plan {
  name: string
  subtitle: string
  readyPrice: number
  indivPrice: number
  features: string[]
  isPopular?: boolean
  buttonText: string
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    name: 'S · А5',
    subtitle: '3 500 деталей',
    readyPrice: 2490,
    indivPrice: 3290,
    features: [
      'Базовые платы в комплекте',
      'Кирпичики + 5% запас',
      'Пронумерованная схема',
      'Доставка по России',
    ],
    buttonText: 'Заказать набор S',
  },
  {
    name: 'M · А4',
    subtitle: '7 000 деталей',
    readyPrice: 4990,
    indivPrice: 6490,
    features: [
      'Базовые платы в комплекте',
      'Кирпичики + 5% запас',
      'Пронумерованная схема',
      'Доставка по России',
      'Выбор цветности',
    ],
    isPopular: true,
    buttonText: 'Заказать набор M',
  },
  {
    name: 'L · А3',
    subtitle: '14 000 деталей',
    readyPrice: 8990,
    indivPrice: 11990,
    features: [
      'Базовые платы в комплекте',
      'Кирпичики + 5% запас',
      'Пронумерованная схема',
      'Доставка по России',
      'Выбор цветности',
      'Приоритетная поддержка',
    ],
    buttonText: 'Заказать набор L',
  },
]

// ─── Context ────────────────────────────────────────────────────────────────────

const PricingCtx = createContext<{ isReady: boolean; setIsReady: (v: boolean) => void }>({
  isReady: true,
  setIsReady: () => {},
})

// ─── Starfield ──────────────────────────────────────────────────────────────────

function Star({
  mousePos,
  containerRef,
}: {
  mousePos: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const [pos] = useState({ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` })
  const cfg = { stiffness: 100, damping: 15, mass: 0.1 }
  const sx = useSpring(0, cfg)
  const sy = useSpring(0, cfg)

  useEffect(() => {
    if (!containerRef.current || mousePos.x === null || mousePos.y === null) {
      sx.set(0); sy.set(0); return
    }
    const r = containerRef.current.getBoundingClientRect()
    const dx = mousePos.x - (r.left + (parseFloat(pos.left) / 100) * r.width)
    const dy = mousePos.y - (r.top  + (parseFloat(pos.top)  / 100) * r.height)
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 600) { const f = 1 - d / 600; sx.set(dx * f * 0.5); sy.set(dy * f * 0.5) }
    else { sx.set(0); sy.set(0) }
  }, [mousePos, pos, containerRef, sx, sy])

  return (
    <motion.div
      className="absolute bg-[#3d3929] dark:bg-[#f0ede6] rounded-full"
      style={{ top: pos.top, left: pos.left, width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`, x: sx, y: sy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
    />
  )
}

function Starfield({ mousePos, containerRef }: { mousePos: { x: number | null; y: number | null }; containerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => (
        <Star key={i} mousePos={mousePos} containerRef={containerRef} />
      ))}
    </div>
  )
}

// ─── Toggle ─────────────────────────────────────────────────────────────────────

function Toggle() {
  const { isReady, setIsReady } = useContext(PricingCtx)
  const readyRef = useRef<HTMLButtonElement>(null)
  const indivRef = useRef<HTMLButtonElement>(null)
  const [pill, setPill] = useState<React.CSSProperties>({})

  useEffect(() => {
    const btn = isReady ? readyRef : indivRef
    if (btn.current) setPill({ width: btn.current.offsetWidth, transform: `translateX(${btn.current.offsetLeft}px)` })
  }, [isReady])

  const toggle = (ready: boolean) => {
    if (isReady === ready) return
    setIsReady(ready)
    if (!ready && indivRef.current) {
      const r = indivRef.current.getBoundingClientRect()
      confetti({
        particleCount: 60, spread: 70,
        origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
        colors: ['#c96442', '#faf9f5', '#f0ede6'],
        ticks: 250, gravity: 1.2, decay: 0.94, startVelocity: 25,
      })
    }
  }

  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit items-center rounded-full bg-gray-100 dark:bg-white/10 p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-[#c96442]"
          style={pill}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
        <button
          ref={readyRef}
          onClick={() => toggle(true)}
          className={`relative z-10 rounded-full px-5 sm:px-7 py-2 text-sm font-semibold transition-colors ${isReady ? 'text-white' : 'text-[#3d3929]/60 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6]'}`}
        >
          Готовый набор
        </button>
        <button
          ref={indivRef}
          onClick={() => toggle(false)}
          className={`relative z-10 rounded-full px-5 sm:px-7 py-2 text-sm font-semibold transition-colors ${!isReady ? 'text-white' : 'text-[#3d3929]/60 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6]'}`}
        >
          Индивидуальный проект
        </button>
      </div>
    </div>
  )
}

// ─── Card ───────────────────────────────────────────────────────────────────────

function Card({ plan, index }: { plan: Plan; index: number }) {
  const { isReady } = useContext(PricingCtx)
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: plan.isPopular && isDesktop ? -20 : 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20, delay: index * 0.15 }}
      className={`h-full rounded-2xl p-8 flex flex-col relative bg-[#faf9f5]/80 dark:bg-[#242018]/80 backdrop-blur-sm ${
        plan.isPopular
          ? 'border-2 border-[#c96442] shadow-xl'
          : 'border border-gray-200 dark:border-white/10'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-[#c96442] py-1.5 px-4 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <LucideStar className="text-white h-3.5 w-3.5 fill-current shrink-0" />
            <span className="text-white text-xs font-semibold">Популярный выбор</span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-black text-[#3d3929] dark:text-[#f0ede6]">{plan.name}</h3>
        <p className="mt-1 text-sm text-[#3d3929]/50 dark:text-[#f0ede6]/50">{plan.subtitle}</p>
        <div className="mt-6 flex items-baseline justify-center">
          <span className="text-5xl font-black tracking-tight text-[#3d3929] dark:text-[#f0ede6]">
            <NumberFlow
              value={isReady ? plan.readyPrice : plan.indivPrice}
              locales="ru-RU"
              format={{ style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
            />
          </span>
        </div>
        <p className="text-xs text-[#3d3929]/40 dark:text-[#f0ede6]/40 mt-1">
          {isReady ? 'Готовый набор' : 'Индивидуальный проект'}
        </p>
        <ul className="mt-8 space-y-3 text-sm text-left text-[#3d3929]/70 dark:text-[#f0ede6]/60">
          {plan.features.map(f => (
            <li key={f} className="flex gap-x-3 items-start">
              <Check className="h-5 w-4 flex-none text-[#c96442] mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <button
            onClick={() => alert('Оформление заказа — отдельная страница')}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-colors ${
              plan.isPopular
                ? 'bg-[#c96442] text-white hover:bg-[#b5573a]'
                : 'border-2 border-[#3d3929]/30 dark:border-white/20 text-[#3d3929] dark:text-[#f0ede6] hover:border-[#3d3929] dark:hover:border-white/40'
            }`}
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Export ─────────────────────────────────────────────────────────────────────

export function PriceCalculatorSection() {
  const [isReady, setIsReady] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null })

  return (
    <PricingCtx.Provider value={{ isReady, setIsReady }}>
      <section
        ref={containerRef}
        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setMousePos({ x: null, y: null })}
        className="relative bg-[#faf9f5] dark:bg-[#1c1a15] px-6 sm:px-10 py-20 sm:py-28 overflow-hidden"
      >
        <Starfield mousePos={mousePos} containerRef={containerRef} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c96442] mb-4 text-center">
            / стоимость
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-[#3d3929] dark:text-[#f0ede6] mb-4 text-center tracking-tight">
            Выбери свой формат
          </h2>
          <p className="text-[#3d3929]/60 dark:text-[#f0ede6]/60 text-base mb-12 max-w-xl mx-auto text-center">
            Все наборы включают базовые платы, кирпичики, схему сборки и доставку по России.
          </p>
          <Toggle />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => <Card key={i} plan={plan} index={i} />)}
          </div>
          <p className="text-center text-xs text-[#3d3929]/40 dark:text-[#f0ede6]/40 mt-10">
            * Цена является ориентировочной. Окончательная стоимость рассчитывается при оформлении заказа.
          </p>
        </div>
      </section>
    </PricingCtx.Provider>
  )
}
