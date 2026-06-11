function UploadIllustration() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="64" cy="64" r="56" fill="#e0f2fe"/>
      <rect x="42" y="28" width="44" height="72" rx="8" fill="white" stroke="#0284c7" strokeWidth="2.5"/>
      <rect x="50" y="38" width="28" height="36" rx="3" fill="#bae6fd"/>
      <path d="M64 62 L64 46" stroke="#0284c7" strokeWidth="3" strokeLinecap="round"/>
      <path d="M57 53 L64 46 L71 53" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="16" y="44" width="22" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" transform="rotate(-12 27 53)"/>
      <rect x="90" y="56" width="22" height="18" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" transform="rotate(10 101 65)"/>
      <circle cx="64" cy="90" r="5" fill="#e0f9ee" stroke="#0284c7" strokeWidth="1.5"/>
    </svg>
  )
}

const PIXEL_GRID = [
  ['#c4b5fd','#a78bfa','#c4b5fd','#a78bfa','#c4b5fd'],
  ['#a78bfa','#7c3aed','#a78bfa','#7c3aed','#a78bfa'],
  ['#c4b5fd','#a78bfa','#c4b5fd','#a78bfa','#c4b5fd'],
  ['#a78bfa','#7c3aed','#a78bfa','#7c3aed','#a78bfa'],
  ['#c4b5fd','#a78bfa','#c4b5fd','#a78bfa','#c4b5fd'],
]

function PixelIllustration() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="64" cy="64" r="56" fill="#faf5ff"/>
      {PIXEL_GRID.map((row, r) =>
        row.map((color, c) => (
          <rect key={`${r}-${c}`} x={24 + c * 14} y={18 + r * 14} width="12" height="12" rx="2" fill={color}/>
        ))
      )}
      <rect x="20" y="98" width="88" height="5" rx="2.5" fill="#e5e7eb"/>
      <circle cx="72" cy="100" r="9" fill="white" stroke="#7c3aed" strokeWidth="2.5"/>
      <rect x="96" y="22" width="16" height="16" rx="4" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <rect x="96" y="44" width="16" height="16" rx="4" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.5"/>
      <rect x="96" y="66" width="16" height="16" rx="4" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5"/>
    </svg>
  )
}

const BOX_BRICKS: [number, number][] = [[36,74],[54,74],[72,74],[36,90],[54,90],[72,90]]

function BoxIllustration() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="64" cy="64" r="56" fill="#ecfdf5"/>
      <rect x="22" y="64" width="84" height="50" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2.5"/>
      <rect x="16" y="50" width="96" height="20" rx="6" fill="#6ee7b7" stroke="#10b981" strokeWidth="2.5"/>
      <rect x="60" y="50" width="8" height="64" rx="4" fill="#f9a8d4"/>
      <rect x="22" y="56" width="84" height="8" rx="4" fill="#f9a8d4"/>
      <ellipse cx="64" cy="50" rx="14" ry="8" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2"/>
      {BOX_BRICKS.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="12" height="10" rx="2" fill={i % 2 === 0 ? '#6ee7b7' : '#34d399'}/>
      ))}
    </svg>
  )
}

const STEPS = [
  {
    illustration: <UploadIllustration />,
    title: 'Загрузи фото',
    description: 'Нажми «Начать проект» и загрузи любое фото — портрет, пейзаж, питомец, любимая сцена.',
  },
  {
    illustration: <PixelIllustration />,
    title: 'Настрой в пикселизаторе',
    description: 'Выбери формат, стиль (ч/б, сепия, цвет), посмотри превью — редактируй пока не понравится.',
  },
  {
    illustration: <BoxIllustration />,
    title: 'Получи набор и собери',
    description: 'Набор с кирпичиками, схемой и базовыми платами придёт почтой. Собери сам или подари.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#faf9f5] dark:bg-[#1c1a15] px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#c96442] mb-4">
          / как это работает
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-[#3d3929] dark:text-[#f0ede6] mb-16">
          Три шага до вашей картины
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-6">
              <div className="w-32 h-32 shrink-0">{step.illustration}</div>
              <div>
                <div className="flex items-center gap-3 mb-3 justify-center">
                  <span className="w-7 h-7 rounded-full bg-[#c96442] text-white text-sm font-black flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-black text-[#3d3929] dark:text-[#f0ede6]">{step.title}</h3>
                </div>
                <p className="text-[#3d3929]/60 dark:text-[#f0ede6]/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a
            href="http://91.229.10.93:5000/"
            className="inline-flex items-center gap-2 bg-[#3d3929] text-white font-bold text-sm px-8 py-4 rounded-2xl hover:bg-[#2d2a1f] transition-colors"
          >
            Попробовать пикселизатор →
          </a>
        </div>
      </div>
    </section>
  )
}
