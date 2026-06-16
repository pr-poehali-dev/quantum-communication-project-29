import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

const POPULAR_PROFESSIONS = [
  { icon: "Code2", title: "Разработчик ПО", category: "IT", example: "Создаёт приложения и сайты" },
  { icon: "BarChart2", title: "Data Scientist", category: "Аналитика", example: "Анализирует большие данные и строит модели" },
  { icon: "Cpu", title: "AI/ML-инженер", category: "Искусственный интеллект", example: "Обучает нейросети и создаёт умные системы" },
  { icon: "Shield", title: "Кибербезопасность", category: "IT-безопасность", example: "Защищает компании от хакерских атак" },
  { icon: "Smartphone", title: "UX/UI-дизайнер", category: "Дизайн", example: "Проектирует удобные интерфейсы приложений" },
  { icon: "TrendingUp", title: "Финансовый аналитик", category: "Финансы", example: "Оценивает рынки и помогает инвестировать" },
  { icon: "Megaphone", title: "Digital-маркетолог", category: "Маркетинг", example: "Продвигает бренды в интернете" },
  { icon: "Video", title: "Контент-креатор", category: "Медиа", example: "Создаёт видео и ведёт соцсети" },
  { icon: "HeartPulse", title: "Медицинский специалист", category: "Медицина", example: "Лечит людей и спасает жизни" },
  { icon: "Building2", title: "Менеджер проектов", category: "Управление", example: "Координирует команды и запускает продукты" },
  { icon: "Globe", title: "SEO-специалист", category: "Маркетинг", example: "Выводит сайты в топ поисковых систем" },
  { icon: "Cloud", title: "Cloud-инженер", category: "IT-инфраструктура", example: "Строит облачные системы и серверы" },
  { icon: "Gamepad2", title: "Геймдизайнер", category: "Игровая индустрия", example: "Придумывает механики и миры видеоигр" },
  { icon: "Briefcase", title: "Продакт-менеджер", category: "Продукт", example: "Управляет созданием цифрового продукта" },
  { icon: "Bot", title: "DevOps-инженер", category: "IT", example: "Автоматизирует разработку и деплой" },
  { icon: "Users", title: "HR-специалист", category: "Персонал", example: "Находит и развивает таланты в компании" },
  { icon: "LineChart", title: "Бизнес-аналитик", category: "Аналитика", example: "Переводит данные в стратегические решения" },
  { icon: "Leaf", title: "Эко-консультант", category: "Экология", example: "Помогает компаниям снизить вред природе" },
  { icon: "Landmark", title: "Финансовый директор", category: "Финансы", example: "Управляет деньгами и стратегией компании" },
  { icon: "Palette", title: "Бренд-дизайнер", category: "Дизайн", example: "Создаёт визуальный образ компаний" },
  { icon: "Stethoscope", title: "Биотехнолог", category: "Биотех", example: "Разрабатывает лекарства и генные решения" },
  { icon: "Radio", title: "Подкастер / ведущий", category: "Медиа", example: "Создаёт аудио-контент и интервью" },
  { icon: "Truck", title: "Менеджер логистики", category: "Логистика", example: "Организует цепочки поставок по всему миру" },
  { icon: "BookOpen", title: "EdTech-специалист", category: "Образование", example: "Создаёт онлайн-курсы и цифровое обучение" },
  { icon: "Camera", title: "Видеограф / режиссёр", category: "Медиа", example: "Снимает рекламу, кино и клипы" },
  { icon: "Home", title: "Архитектор", category: "Строительство", example: "Проектирует здания и городские пространства" },
  { icon: "Scale", title: "Юрист в IT", category: "Право", example: "Защищает интеллектуальную собственность и стартапы" },
  { icon: "FlaskConical", title: "Учёный-исследователь", category: "Наука", example: "Делает открытия в лаборатории" },
  { icon: "ShoppingCart", title: "E-commerce менеджер", category: "Торговля", example: "Управляет онлайн-магазинами и продажами" },
  { icon: "Mic2", title: "Спикер / коуч", category: "Развитие", example: "Выступает и помогает людям расти" },
]

const GEN_ALPHA_PROFESSIONS = [
  { icon: "Brain", title: "Prompt-инженер", category: "AI", example: "Пишет запросы для нейросетей, чтобы они работали лучше" },
  { icon: "Cpu", title: "AI-продюсер", category: "AI + Медиа", example: "Создаёт музыку, видео и арт с помощью ИИ" },
  { icon: "Rocket", title: "Космический турист-гид", category: "Космос", example: "Сопровождает туристов на орбитальные рейсы" },
  { icon: "Gamepad2", title: "Метавселенный архитектор", category: "Metaverse", example: "Строит виртуальные города и пространства" },
  { icon: "Dna", title: "Генетический консультант", category: "Биотех", example: "Помогает людям понять свой ДНК-код" },
  { icon: "Zap", title: "Инженер зелёной энергии", category: "Климат", example: "Создаёт солнечные и водородные технологии" },
  { icon: "Bot", title: "Тренер роботов", category: "Робототехника", example: "Обучает роботов новым навыкам и поведению" },
  { icon: "Glasses", title: "AR/VR-разработчик", category: "Расширенная реальность", example: "Создаёт приложения для умных очков и шлемов" },
  { icon: "Coins", title: "Web3-разработчик", category: "Блокчейн", example: "Строит децентрализованные приложения и NFT" },
  { icon: "HeartHandshake", title: "Wellbeing-дизайнер", category: "Здоровье", example: "Проектирует среду для физического и ментального здоровья" },
  { icon: "Leaf", title: "Rewilding-специалист", category: "Экология", example: "Восстанавливает природные экосистемы" },
  { icon: "Star", title: "Создатель цифровых аватаров", category: "Digital Identity", example: "Создаёт виртуальных персонажей и ИИ-инфлюенсеров" },
  { icon: "Microscope", title: "Нейроинтерфейс-инженер", category: "Нейротех", example: "Разрабатывает чипы типа Neuralink" },
  { icon: "Globe", title: "Цифровой дипломат", category: "Политика + Tech", example: "Ведёт переговоры в виртуальных пространствах" },
  { icon: "Music", title: "AI-музыкант", category: "Творчество", example: "Создаёт треки в соавторстве с нейросетями" },
  { icon: "ShieldCheck", title: "Этик искусственного интеллекта", category: "AI + Право", example: "Следит за честным и безопасным использованием ИИ" },
  { icon: "Printer", title: "Инженер 3D-биопечати", category: "Биомедицина", example: "Печатает искусственные органы и ткани" },
  { icon: "Car", title: "Разработчик автопилота", category: "Транспорт", example: "Создаёт алгоритмы для беспилотных автомобилей" },
  { icon: "Wheat", title: "Агро-технолог", category: "Еда будущего", example: "Выращивает еду в вертикальных фермах и лабораториях" },
  { icon: "Satellite", title: "Спутниковый инженер", category: "Космос", example: "Разрабатывает мини-спутники для интернета" },
]

export function WorkSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeTab, setActiveTab] = useState<"popular" | "alpha">("popular")

  const professions = activeTab === "popular" ? POPULAR_PROFESSIONS : GEN_ALPHA_PROFESSIONS

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-start px-6 pt-20 md:px-12 lg:px-16"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col pb-6">
        {/* Заголовок + кнопка */}
        <div
          className={`mb-5 flex flex-wrap items-end justify-between gap-4 transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Профессии
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Кем можно стать</p>
          </div>
          <MagneticButton variant="secondary" onClick={() => scrollToSection?.(2)}>
            Какая мне подходит?
          </MagneticButton>
        </div>

        {/* Табы */}
        <div
          className={`mb-5 flex gap-2 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <button
            onClick={() => setActiveTab("popular")}
            className={`rounded-full border px-5 py-2 font-mono text-xs transition-all duration-300 ${
              activeTab === "popular"
                ? "border-foreground/40 bg-foreground/20 text-foreground"
                : "border-foreground/15 bg-foreground/5 text-foreground/50 hover:border-foreground/25 hover:text-foreground/70"
            }`}
          >
            Топ-30 за 10 лет
          </button>
          <button
            onClick={() => setActiveTab("alpha")}
            className={`rounded-full border px-5 py-2 font-mono text-xs transition-all duration-300 ${
              activeTab === "alpha"
                ? "border-foreground/40 bg-foreground/20 text-foreground"
                : "border-foreground/15 bg-foreground/5 text-foreground/50 hover:border-foreground/25 hover:text-foreground/70"
            }`}
          >
            ✦ Generation Alpha
          </button>
        </div>

        {/* Список */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="space-y-0">
            {professions.map((profession, i) => (
              <ProfessionRow key={`${activeTab}-${i}`} profession={profession} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfessionRow({
  profession,
  index,
  isVisible,
}: {
  profession: { icon: string; title: string; category: string; example: string }
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={`group flex items-center justify-between gap-4 border-b border-foreground/10 py-3 transition-all duration-500 hover:border-foreground/20 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 40, 600)}ms` }}
    >
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground/20">
          <Icon name={profession.icon} className="text-foreground/70" size={18} fallback="Briefcase" />
        </div>
        <div>
          <h3 className="font-sans text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-lg">
            {profession.title}
          </h3>
          <p className="font-mono text-xs text-foreground/45">{profession.example}</p>
        </div>
      </div>
      <span className="hidden shrink-0 font-mono text-xs text-foreground/35 md:block">
        {profession.category}
      </span>
    </div>
  )
}
