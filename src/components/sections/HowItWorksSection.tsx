import { LinkCard } from '@/components/ui/link-card'

const STEPS = [
  {
    number: 1,
    title: 'Загрузи фото',
    description: 'Нажми «Начать проект» и загрузи любое фото — портрет, пейзаж, питомец, любимая сцена.',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp',
    href: 'http://91.229.10.93:5000/',
  },
  {
    number: 2,
    title: 'Настрой пикселизатор',
    description: 'Выбери формат, стиль (ч/б, сепия, цвет), посмотри превью — редактируй пока не понравится.',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp',
    href: 'http://91.229.10.93:5000/',
  },
  {
    number: 3,
    title: 'Получи и собери',
    description: 'Набор с кирпичиками, схемой и базовыми платами придёт почтой. Собери сам или подари.',
    imageUrl: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp',
    href: 'http://91.229.10.93:5000/',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-6 sm:px-10 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#276152] dark:text-[#7BBFB0] mb-3">
          / как это работает
        </p>
        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9] mb-10">
          Три шага до вашей картины
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map(step => (
            <LinkCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
              href={step.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
