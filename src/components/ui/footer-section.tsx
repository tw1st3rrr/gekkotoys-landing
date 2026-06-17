import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Send } from "lucide-react"

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
  const [isDarkMode, setIsDarkMode] = React.useState(
    () => document.documentElement.classList.contains("dark")
  )

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  return (
    <footer className="border-t border-gray-100 dark:border-white/10 bg-[#faf9f5] dark:bg-[#1c1a15] text-[#3d3929] dark:text-[#f0ede6]">

      {/* CTA strip — like Mozabrick "Уже купили?" */}
      <div className="border-b border-gray-100 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-[#3d3929] dark:text-[#f0ede6]">Уже купили набор ГЕККО?</p>
            <p className="text-xs text-[#3d3929]/60 dark:text-[#f0ede6]/60 mt-0.5">Загрузи фото и получи схему сборки по ссылке</p>
          </div>
          <a
            href="http://91.229.10.93:5000/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#c96442] text-white text-sm font-bold hover:bg-[#b5573a] transition-colors shrink-0"
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
              <img
                src="https://gekkotoys.ru/img/logoBlack.svg"
                alt="ГЕККО ТОЙС"
                className="h-7 w-auto dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-sm text-[#3d3929]/60 dark:text-[#f0ede6]/60 leading-relaxed mb-5">
              Пиксельный конструктор из уникальных фишек. Собери картину из своего фото или выбери готовый дизайн.
            </p>
            <address className="not-italic space-y-1.5 text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60">
              <p>
                <a href="tel:+74991650423" className="hover:text-[#c96442] transition-colors">
                  8-499-165-04-23
                </a>
              </p>
              <p>
                <a href="mailto:oooalextoys@mail.ru" className="hover:text-[#c96442] transition-colors">
                  oooalextoys@mail.ru
                </a>
              </p>
              <p className="text-[#3d3929]/50 dark:text-[#f0ede6]/40">Пн–Пт: 10:00–18:00</p>
            </address>
          </div>

          {/* Магазин */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#c96442]">Магазин</h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6] transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#c96442]">Компания</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6] transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Соцсети + тема */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#c96442]">Мы в соцсетях</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a href="https://vk.com/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6] transition-colors flex items-center gap-2">
                  <span className="text-[#c96442] text-base leading-none">VK</span> ВКонтакте
                </a>
              </li>
              <li>
                <a href="https://instagram.com/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6] transition-colors flex items-center gap-2">
                  <span className="text-[#c96442] text-base leading-none">IG</span> Instagram
                </a>
              </li>
              <li>
                <a href="https://t.me/gekkotoys" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#3d3929]/70 dark:text-[#f0ede6]/60 hover:text-[#3d3929] dark:hover:text-[#f0ede6] transition-colors flex items-center gap-2">
                  <span className="text-[#c96442] text-base leading-none">TG</span> Telegram
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-[#3d3929]/50 dark:text-[#f0ede6]/50" />
              <Switch
                id="footer-dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4 text-[#3d3929]/50 dark:text-[#f0ede6]/50" />
              <Label htmlFor="footer-dark-mode" className="text-xs text-[#3d3929]/50 dark:text-[#f0ede6]/40 ml-1">
                Тёмная тема
              </Label>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3d3929]/40 dark:text-[#f0ede6]/30">
            © 2025 ГЕККО ТОЙС · ООО «Алекс Тойс». Все права защищены.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-xs text-[#3d3929]/40 dark:text-[#f0ede6]/30">
            <a href="https://gekkotoys.ru/privacy" className="hover:text-[#c96442] transition-colors">
              Политика конфиденциальности
            </a>
            <a href="https://gekkotoys.ru/terms" className="hover:text-[#c96442] transition-colors">
              Условия использования
            </a>
            <a href="https://gekkotoys.ru/cookies" className="hover:text-[#c96442] transition-colors">
              Политика cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
