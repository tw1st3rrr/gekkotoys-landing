// src/components/sections/FAQSection.tsx
import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Что такое конструктор ГЕККО?',
    a: 'ГЕККО — это конструктор для создания пиксельных картин из специальных фишек. Фишка крепится с шести сторон без дополнительных деталей — как лапки геккона. Вы загружаете фото, пикселизатор превращает его в схему, а вы собираете картину кирпичик за кирпичиком.',
  },
  {
    q: 'Как работает пикселизатор?',
    a: 'Загрузите любое фото в наш онлайн-пикселизатор, выберите формат (А5, А4 или А3), стиль (чёрно-белый, сепия или цветной) и посмотрите превью. Когда результат нравится — оформляйте заказ. Мы соберём набор именно под вашу схему.',
  },
  {
    q: 'Сколько деталей в наборе?',
    a: 'Зависит от формата: S·А5 — около 3 500 деталей, M·А4 — около 7 000 деталей, L·А3 — около 14 000 деталей. В каждый набор кладём небольшой запас деталей на случай потери.',
  },
  {
    q: 'Могу ли я пересобрать картину с другим фото?',
    a: 'Да! Фишки универсальны — после сборки картину можно разобрать и собрать заново по другой схеме. Новые схемы можно скачать в пикселизаторе бесплатно.',
  },
  {
    q: 'Сколько времени занимает сборка?',
    a: 'Примерно 45–90 минут на А5, 2–4 часа на А4 и 5–8 часов на А3. Многие разбивают на несколько вечеров — это расслабляет и затягивает.',
  },
  {
    q: 'Как и куда доставляете?',
    a: 'Доставляем по всей России. Отправляем в течение 1–3 рабочих дней после подтверждения заказа. Стоимость и сроки доставки рассчитываются при оформлении заказа.',
  },
  {
    q: 'Можно ли вернуть или обменять набор?',
    a: 'Да, в течение 14 дней с момента получения, если набор не был вскрыт. Если в наборе обнаружены недостающие детали — заменим бесплатно, просто напишите нам.',
  },
  {
    q: 'Чем ГЕККО отличается от обычного LEGO?',
    a: 'ГЕККО создан специально для создания пиксельных картин и фигурок. Фишка крепится с шести сторон без дополнительных деталей, что даёт большую свободу. Наборы не совместимы с LEGO и не являются его аналогом — это самостоятельный продукт со своей уникальной системой крепления.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative px-6 sm:px-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#276152] dark:text-[#7BBFB0] mb-4">
          / вопросы и ответы
        </p>
        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0D3A35] dark:text-[#ECEFE9] mb-12">
          Частые вопросы
        </h2>

        <div className="max-w-3xl flex flex-col divide-y divide-gray-100 dark:divide-white/10">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className="text-base font-bold text-[#0D3A35] dark:text-[#ECEFE9] group-hover:text-[#276152] transition-colors">
                  {item.q}
                </span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center text-[#0D3A35]/50 dark:text-[#ECEFE9]/50 transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 leading-relaxed pb-5">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mt-12 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <p className="text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/40 leading-relaxed">
            <strong className="text-[#0D3A35]/60 dark:text-[#ECEFE9]/60">Важно знать:</strong> Готовая мозаика является художественной интерпретацией исходного фото.
            Из-за пикселизации финальный результат может отличаться от оригинала — это особенность формата, а не дефект.
            Рекомендуем посмотреть превью в пикселизаторе перед оформлением заказа.
          </p>
        </div>
      </div>
    </section>
  )
}
