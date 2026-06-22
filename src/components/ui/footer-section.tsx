import * as React from "react"
import { Send } from "lucide-react"

const SHOP_LINKS = [
  { text: "Каталог наборов", url: "https://gekkotoys.ru/catalog" },
  { text: "Пикселизатор", url: "http://91.229.10.93:5000/" },
  { text: "Доставка и оплата", url: "https://gekkotoys.ru/delivery" },
  { text: "Гарантия и возврат", url: "https://gekkotoys.ru/return" },
  { text: "Оптовые заказы", url: "#contacts" },
]

const COMPANY_LINKS = [
  { text: "О ГЕККО ТОЙС", url: "https://gekkotoys.ru/about" },
  { text: "Как это работает", url: "#how-it-works" },
  { text: "Отзывы", url: "#reviews" },
  { text: "FAQ", url: "#faq" },
  { text: "Контакты", url: "#contacts" },
]

function Footerdemo() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/10 bg-[#FBF6F0] dark:bg-[#07201C] text-[#0D3A35] dark:text-[#ECEFE9]">

      {/* CTA strip — like Mozabrick "Уже купили?" */}
      <div className="border-b border-gray-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-[#0D3A35] dark:text-[#ECEFE9]">Уже купили набор ГЕККО?</p>
            <p className="text-xs text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 mt-0.5">Загрузи фото и получи схему сборки по ссылке</p>
          </div>
          <a
            href="http://91.229.10.93:5000/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#276152] text-white text-sm font-bold hover:bg-[#1B4D42] transition-colors shrink-0"
          >
            <Send className="h-4 w-4" />
            Перейти в пикселизатор
          </a>
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-xl px-2 py-1">
                <img
                  src="/logo-black.svg"
                  alt="ГЕККО ТОЙС"
                  className="h-6 w-auto"
                />
              </div>
            </div>
            <p className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/60 leading-relaxed mb-5">
              Пиксельный конструктор из уникальных фишек. Собери картину из своего фото или выбери готовый дизайн.
            </p>
            <address className="not-italic space-y-1.5 text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60">
              <p>
                <a href="tel:+74991650423" className="hover:text-[#276152] transition-colors">
                  8-499-165-04-23
                </a>
              </p>
              <p>
                <a href="mailto:oooalextoys@mail.ru" className="hover:text-[#276152] transition-colors">
                  oooalextoys@mail.ru
                </a>
              </p>
              <p className="text-[#0D3A35]/50 dark:text-[#ECEFE9]/40">Пн–Пт: 10:00–18:00</p>
            </address>
          </div>

          {/* Магазин */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#276152]">Магазин</h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9] transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#276152]">Компания</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9] transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Соцсети + тема */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#276152]">Мы в соцсетях</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a href="https://vk.com/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9] transition-colors flex items-center gap-2">
                  <span className="text-[#276152] text-base leading-none">VK</span> ВКонтакте
                </a>
              </li>
              <li>
                <a href="https://instagram.com/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9] transition-colors flex items-center gap-2">
                  <span className="text-[#276152] text-base leading-none">IG</span> Instagram
                </a>
              </li>
              <li>
                <a href="https://t.me/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#0D3A35]/70 dark:text-[#ECEFE9]/60 hover:text-[#0D3A35] dark:hover:text-[#ECEFE9] transition-colors flex items-center gap-2">
                  <span className="text-[#276152] text-base leading-none">TG</span> Telegram
                </a>
              </li>
            </ul>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/30">
            © 2025 ГЕККО ТОЙС · ООО «Алекс Тойс». Все права защищены.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-xs text-[#0D3A35]/40 dark:text-[#ECEFE9]/30">
            <a href="https://gekkotoys.ru/privacy" className="hover:text-[#276152] transition-colors">
              Политика конфиденциальности
            </a>
            <a href="https://gekkotoys.ru/terms" className="hover:text-[#276152] transition-colors">
              Условия использования
            </a>
            <a href="https://gekkotoys.ru/cookies" className="hover:text-[#276152] transition-colors">
              Политика cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
