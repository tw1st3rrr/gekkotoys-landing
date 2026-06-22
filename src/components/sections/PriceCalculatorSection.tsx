import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { motion } from 'motion/react'
import { Check, Star as LucideStar } from 'lucide-react'
import NumberFlow from '@number-flow/react'

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
  }

  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit items-center rounded-full bg-gray-100 dark:bg-white/10 p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-[#276152]"
          style={pill}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
        <button
          ref={readyRef}
          onClick={() => toggle(true)}
          className={`relative z-10 rounded-full px-5 sm:px-7 py-2 text-sm font-semibold transition-colors ${isReady ? 'text-white' : 'text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9]'}`}
        >
          Готовый набор
        </button>
        <button
          ref={indivRef}
          onClick={() => toggle(false)}
          className={`relative z-10 rounded-full px-5 sm:px-7 py-2 text-sm font-semibold transition-colors ${!isReady ? 'text-white' : 'text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9]'}`}
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
      className={`h-full rounded-2xl p-8 flex flex-col relative bg-[#FBF6F0]/80 dark:bg-[#0D3A35]/80 backdrop-blur-sm ${
        plan.isPopular
          ? 'border-2 border-[#276152] shadow-xl'
          : 'border border-gray-200 dark:border-white/10'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-[#276152] py-1.5 px-4 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <LucideStar className="text-white h-3.5 w-3.5 fill-current shrink-0" />
            <span className="text-white text-xs font-semibold">Популярный выбор</span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-black text-[#0D3A35] dark:text-[#ECEFE9]">{plan.name}</h3>
        <p className="mt-1 text-sm text-[#0D3A35]/50 dark:text-[#ECEFE9]/50">{plan.subtitle}</p>
        <div className="mt-6 flex items-baseline justify-center">
          <span className="text-5xl font-black tracking-tight text-[#0D3A35] dark:text-[#ECEFE9]">
            <NumberFlow
              value={isReady ? plan.readyPrice : plan.indivPrice}
              locales="ru-RU"
              format={{ style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
            />
          </span>
        </div>
        <p className="text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/40 mt-1">
          {isReady ? 'Готовый набор' : 'Индивидуальный проект'}
        </p>
        <ul className="mt-8 space-y-3 text-sm text-left text-[#0D3A35]/70 dark:text-[#ECEFE9]/60">
          {plan.features.map(f => (
            <li key={f} className="flex gap-x-3 items-start">
              <Check className="h-5 w-4 flex-none text-[#276152] mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <button
            onClick={() => alert('Оформление заказа — отдельная страница')}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-colors ${
              plan.isPopular
                ? 'bg-[#276152] text-white hover:bg-[#1B4D42]'
                : 'border-2 border-[#0D3A35]/30 dark:border-white/20 text-[#0D3A35] dark:text-[#ECEFE9] hover:border-[#0D3A35] dark:hover:border-white/40'
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

  return (
    <PricingCtx.Provider value={{ isReady, setIsReady }}>
      <section className="relative px-6 sm:px-10 py-20 sm:py-28">
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#276152] dark:text-[#7BBFB0] mb-4 text-center">
            / стоимость
          </p>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9] mb-4 text-center tracking-tight">
            Выбери свой формат
          </h2>
          <p className="text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 text-base mb-12 max-w-xl mx-auto text-center">
            Все наборы включают базовые платы, кирпичики, схему сборки и доставку по России.
          </p>
          <Toggle />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => <Card key={i} plan={plan} index={i} />)}
          </div>
          <p className="text-center text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/40 mt-10">
            * Цена является ориентировочной. Окончательная стоимость рассчитывается при оформлении заказа.
          </p>
        </div>
      </section>
    </PricingCtx.Provider>
  )
}
