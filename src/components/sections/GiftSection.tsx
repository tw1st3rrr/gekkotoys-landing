import { Gift, Camera, Repeat } from 'lucide-react'

const BULLETS = [
  {
    icon: <Gift className="w-6 h-6 text-white" />,
    title: 'Готовая упаковка',
    desc: 'Набор приходит в подарочной коробке — ничего дополнительно покупать не нужно',
  },
  {
    icon: <Camera className="w-6 h-6 text-white" />,
    title: 'Персональное фото',
    desc: 'Картина из фото именинника, пары, питомца — подарок, которого точно нет у других',
  },
  {
    icon: <Repeat className="w-6 h-6 text-white" />,
    title: 'Пересобирай сколько угодно',
    desc: 'Скачивай новые схемы бесплатно и собирай разные картины из одного набора',
  },
]

export function GiftSection() {
  return (
    <section className="bg-[#0D3A35] dark:bg-[#0D2E28] px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7BBFB0] mb-4">
              / подарок
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
              Ищешь особенный подарок?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              Стандартный набор ГЕККО — это уже готовый подарок. Красивая упаковка, схема сборки, все кирпичики. Просто выбери фото.
            </p>
            <a
              href="http://91.229.10.93:5000/"
              className="inline-flex items-center gap-2 bg-white text-[#0D3A35] font-bold text-sm px-8 py-4 rounded-2xl hover:bg-white/90 transition-colors"
            >
              Создать подарок →
            </a>
          </div>

          {/* Right: bullets */}
          <div className="flex flex-col gap-6">
            {BULLETS.map((b, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/15 flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-base mb-1">{b.title}</div>
                  <div className="text-white/50 text-sm leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
