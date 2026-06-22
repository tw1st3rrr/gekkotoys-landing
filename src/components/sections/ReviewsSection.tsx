// src/components/sections/ReviewsSection.tsx

const REVIEWS = [
  {
    name: 'Анна К.',
    city: 'Москва',
    text: 'Заказала набор мужу на день рождения. Картина получилась чёткой и детальной. Муж был в восторге — теперь хочет ещё один побольше!',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1734352004_S-Ojpg.webp',
  },
  {
    name: 'Дмитрий В.',
    city: 'Санкт-Петербург',
    text: 'Собирали вместе с сыном — провели отличный вечер. Инструкция простая, кирпичики качественные. Теперь хотим заказать А4 формат.',
    imageUrl: 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp',
  },
  {
    name: 'Мария Л.',
    city: 'Екатеринбург',
    text: 'Сделала портрет нашей собаки в А5 формате. Пикселизатор очень удобный — сразу видно как будет выглядеть. Привезли быстро, всё целое.',
    imageUrl: 'https://gekkotoys.ru/cache/images/0Арт_конструктор/800_cover_92_1733147527_38952-вб01png.webp',
  },
  {
    name: 'Игорь С.',
    city: 'Новосибирск',
    text: 'Подарил жене на 8 марта. Упаковка подарочная — ничего дополнительно не нужно. Жена до сих пор пересобирает разные фотографии.',
    imageUrl: 'https://gekkotoys.ru/cache/images/2Д/Новый_год_2д_А5/800_cover_92_1734084112_карточка38025jpg.webp',
  },
  {
    name: 'Елена П.',
    city: 'Казань',
    text: 'Купила набор А3 — большой формат очень впечатляет. Детали мелкие, но инструкция по номерам делает процесс увлекательным как медитация.',
    imageUrl: 'https://gekkotoys.ru/cache/images/3д/800_cover_92_1734097487_С1png.webp',
  },
  {
    name: 'Алексей М.',
    city: 'Краснодар',
    text: 'Заказывал корпоративный подарок — 10 наборов с фото команды. Менеджер быстро всё согласовал. Коллеги были приятно удивлены.',
    imageUrl: 'https://gekkotoys.ru/cache/images/800_cover_92_1726841581_Приглашение_Экспо(2)jpg.webp',
  },
]

const FALLBACK = 'https://gekkotoys.ru/cache/images/2Д/экзот_2д_А5/800_cover_92_1729516999_Попугайpng.webp'

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 16 16" fill="#f59e0b" className="w-4 h-4">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.3l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="bg-[#FBF6F0] dark:bg-[#07201C] px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#276152] dark:text-[#7BBFB0] mb-4">
          / отзывы
        </p>
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9]">
              Что говорят покупатели
            </h2>
            <p className="text-[#0D3A35]/50 dark:text-[#ECEFE9]/50 text-sm mt-2">Более 500 собранных наборов</p>
          </div>
          <div className="flex items-center gap-2">
            <StarRating />
            <span className="text-sm font-bold text-[#0D3A35] dark:text-[#ECEFE9]">5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#0D3A35]/60 overflow-hidden hover:shadow-md dark:hover:shadow-md transition-shadow">
              <div className="h-36 overflow-hidden">
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = FALLBACK }}
                />
              </div>
              <div className="p-5">
                <StarRating />
                <p className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/70 leading-relaxed mt-3 mb-4">«{r.text}»</p>
                <div>
                  <span className="text-sm font-bold text-[#0D3A35] dark:text-[#ECEFE9]">{r.name}</span>
                  <span className="text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/40 ml-2">{r.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
