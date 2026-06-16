import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

const POPULAR_GROUPS = [
  {
    industry: "IT и разработка",
    icon: "Code2",
    professions: [
      { icon: "Code2", title: "Разработчик ПО", example: "Создаёт приложения, сайты и сервисы" },
      { icon: "Bot", title: "DevOps-инженер", example: "Автоматизирует разработку и деплой" },
      { icon: "Cloud", title: "Cloud-инженер", example: "Строит облачные системы и серверы" },
      { icon: "Shield", title: "Специалист по кибербезопасности", example: "Защищает компании от хакерских атак" },
      { icon: "Smartphone", title: "Мобильный разработчик", example: "Создаёт приложения для iOS и Android" },
    ],
  },
  {
    industry: "AI и данные",
    icon: "Cpu",
    professions: [
      { icon: "Cpu", title: "AI/ML-инженер", example: "Обучает нейросети и создаёт умные системы" },
      { icon: "BarChart2", title: "Data Scientist", example: "Анализирует большие данные и строит модели" },
      { icon: "LineChart", title: "Бизнес-аналитик", example: "Переводит данные в стратегические решения" },
      { icon: "Brain", title: "NLP-инженер", example: "Обучает модели понимать человеческий язык" },
      { icon: "Database", title: "Data Engineer", example: "Строит хранилища данных и пайплайны" },
    ],
  },
  {
    industry: "Дизайн и медиа",
    icon: "Palette",
    professions: [
      { icon: "Smartphone", title: "UX/UI-дизайнер", example: "Проектирует удобные интерфейсы приложений" },
      { icon: "Palette", title: "Бренд-дизайнер", example: "Создаёт визуальный образ компаний" },
      { icon: "Video", title: "Контент-креатор", example: "Создаёт видео и ведёт соцсети" },
      { icon: "Camera", title: "Видеограф / режиссёр", example: "Снимает рекламу, кино и клипы" },
      { icon: "Radio", title: "Подкастер / ведущий", example: "Создаёт аудио-контент и интервью" },
      { icon: "Gamepad2", title: "Геймдизайнер", example: "Придумывает механики и миры видеоигр" },
    ],
  },
  {
    industry: "Маркетинг и продажи",
    icon: "Megaphone",
    professions: [
      { icon: "Megaphone", title: "Digital-маркетолог", example: "Продвигает бренды в интернете" },
      { icon: "Globe", title: "SEO-специалист", example: "Выводит сайты в топ поисковых систем" },
      { icon: "ShoppingCart", title: "E-commerce менеджер", example: "Управляет онлайн-магазинами и продажами" },
      { icon: "TrendingUp", title: "Growth-менеджер", example: "Разрабатывает стратегии роста продукта" },
    ],
  },
  {
    industry: "Управление и бизнес",
    icon: "Briefcase",
    professions: [
      { icon: "Briefcase", title: "Продакт-менеджер", example: "Управляет созданием цифрового продукта" },
      { icon: "Building2", title: "Менеджер проектов", example: "Координирует команды и запускает продукты" },
      { icon: "Users", title: "HR-специалист", example: "Находит и развивает таланты в компании" },
      { icon: "Landmark", title: "Финансовый директор", example: "Управляет деньгами и стратегией компании" },
      { icon: "Mic2", title: "Спикер / коуч", example: "Выступает и помогает людям расти" },
      { icon: "Truck", title: "Менеджер логистики", example: "Организует цепочки поставок по всему миру" },
    ],
  },
  {
    industry: "Финансы и право",
    icon: "TrendingUp",
    professions: [
      { icon: "TrendingUp", title: "Финансовый аналитик", example: "Оценивает рынки и помогает инвестировать" },
      { icon: "Scale", title: "Юрист в IT", example: "Защищает интеллектуальную собственность и стартапы" },
      { icon: "BarChart2", title: "Инвестиционный аналитик", example: "Анализирует активы и управляет портфелем" },
      { icon: "Building2", title: "Финтех-специалист", example: "Разрабатывает финансовые цифровые продукты" },
    ],
  },
  {
    industry: "Медицина и биотех",
    icon: "HeartPulse",
    professions: [
      { icon: "HeartPulse", title: "Медицинский специалист", example: "Лечит людей и спасает жизни" },
      { icon: "Stethoscope", title: "Биотехнолог", example: "Разрабатывает лекарства и генные решения" },
      { icon: "FlaskConical", title: "Учёный-исследователь", example: "Делает открытия в лаборатории" },
      { icon: "Dna", title: "Биоинформатик", example: "Анализирует геномные данные с помощью алгоритмов" },
    ],
  },
  {
    industry: "Экология и наука",
    icon: "Leaf",
    professions: [
      { icon: "Leaf", title: "Эко-консультант", example: "Помогает компаниям снизить вред природе" },
      { icon: "FlaskConical", title: "Эколог-исследователь", example: "Изучает влияние человека на природу" },
    ],
  },
  {
    industry: "Образование",
    icon: "BookOpen",
    professions: [
      { icon: "BookOpen", title: "EdTech-специалист", example: "Создаёт онлайн-курсы и цифровое обучение" },
      { icon: "Home", title: "Архитектор", example: "Проектирует здания и городские пространства" },
    ],
  },
]

const GEN_ALPHA_GROUPS = [
  {
    industry: "AI и нейротех",
    icon: "Brain",
    professions: [
      { icon: "Brain", title: "Prompt-инженер", example: "Пишет запросы для нейросетей, чтобы они работали лучше" },
      { icon: "Cpu", title: "AI-продюсер", example: "Создаёт музыку, видео и арт с помощью ИИ" },
      { icon: "Microscope", title: "Нейроинтерфейс-инженер", example: "Разрабатывает чипы типа Neuralink" },
      { icon: "ShieldCheck", title: "Этик искусственного интеллекта", example: "Следит за честным и безопасным использованием ИИ" },
      { icon: "Music", title: "AI-музыкант", example: "Создаёт треки в соавторстве с нейросетями" },
    ],
  },
  {
    industry: "Биоинженерия",
    icon: "Dna",
    professions: [
      { icon: "Dna", title: "Генетический инженер", example: "Редактирует гены с помощью CRISPR и других технологий" },
      { icon: "Printer", title: "Инженер 3D-биопечати", example: "Печатает искусственные органы и живые ткани" },
      { icon: "Dna", title: "Генетический консультант", example: "Помогает людям понять свой ДНК-код и риски здоровья" },
      { icon: "FlaskConical", title: "Синтетический биолог", example: "Конструирует живые организмы для медицины и промышленности" },
      { icon: "HeartPulse", title: "Биомедицинский инженер", example: "Разрабатывает протезы, импланты и медицинские устройства" },
      { icon: "Microscope", title: "Нейробиолог", example: "Изучает мозг и создаёт терапии от нейродегенеративных болезней" },
      { icon: "Stethoscope", title: "Специалист по персональной медицине", example: "Подбирает лечение на основе генома конкретного человека" },
    ],
  },
  {
    industry: "Космос и транспорт",
    icon: "Rocket",
    professions: [
      { icon: "Rocket", title: "Космический турист-гид", example: "Сопровождает туристов на орбитальные рейсы" },
      { icon: "Satellite", title: "Спутниковый инженер", example: "Разрабатывает мини-спутники для интернета" },
      { icon: "Car", title: "Разработчик автопилота", example: "Создаёт алгоритмы для беспилотных автомобилей" },
    ],
  },
  {
    industry: "Метавселенная и XR",
    icon: "Glasses",
    professions: [
      { icon: "Gamepad2", title: "Метавселенный архитектор", example: "Строит виртуальные города и пространства" },
      { icon: "Glasses", title: "AR/VR-разработчик", example: "Создаёт приложения для умных очков и шлемов" },
      { icon: "Star", title: "Создатель цифровых аватаров", example: "Создаёт виртуальных персонажей и ИИ-инфлюенсеров" },
      { icon: "Coins", title: "Web3-разработчик", example: "Строит децентрализованные приложения и NFT" },
    ],
  },
  {
    industry: "Климат и экология",
    icon: "Zap",
    professions: [
      { icon: "Zap", title: "Инженер зелёной энергии", example: "Создаёт солнечные и водородные технологии" },
      { icon: "Leaf", title: "Rewilding-специалист", example: "Восстанавливает природные экосистемы" },
      { icon: "Wheat", title: "Агро-технолог", example: "Выращивает еду в вертикальных фермах и лабораториях" },
    ],
  },
  {
    industry: "Робототехника и IoT",
    icon: "Bot",
    professions: [
      { icon: "Bot", title: "Тренер роботов", example: "Обучает роботов новым навыкам и поведению" },
      { icon: "Globe", title: "Цифровой дипломат", example: "Ведёт переговоры в виртуальных пространствах" },
      { icon: "HeartHandshake", title: "Wellbeing-дизайнер", example: "Проектирует среду для физического и ментального здоровья" },
    ],
  },
]

type Tab = "popular" | "alpha"

export function WorkSection({
  scrollToSection,
  highlightTab,
  highlightGroups,
}: {
  scrollToSection?: (index: number) => void
  highlightTab?: Tab
  highlightGroups?: string[]
}) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeTab, setActiveTab] = useState<Tab>("popular")
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())

  // Применяем highlight при изменении пропсов извне
  const prevHighlight = useRef<string>("")
  useEffect(() => {
    if (!highlightTab || !highlightGroups?.length) return
    const key = highlightTab + highlightGroups.join()
    if (key === prevHighlight.current) return
    prevHighlight.current = key
    setActiveTab(highlightTab)
    setOpenGroups(new Set(highlightGroups))
  }, [highlightTab, highlightGroups])

  const groups = activeTab === "popular" ? POPULAR_GROUPS : GEN_ALPHA_GROUPS

  const totalCount = groups.reduce((acc, g) => acc + g.professions.length, 0)

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <section
      ref={ref}
      className="flex w-screen shrink-0 snap-start items-start px-6 pt-24 md:px-12 lg:px-16"
      style={{ height: "100dvh" }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col pb-6">
        {/* Заголовок */}
        <div
          className={`mb-5 flex flex-wrap items-end justify-between gap-4 transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Профессии
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Кем можно стать</p>
          </div>
          <MagneticButton variant="secondary" onClick={() => scrollToSection?.(2)}>
            Какая мне подходит?
          </MagneticButton>
        </div>

        {/* Подсказка из теста */}
        {highlightGroups && highlightGroups.length > 0 && (
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/8 px-4 py-2.5">
            <Icon name="Sparkles" size={14} className="shrink-0 text-foreground/50" />
            <p className="font-mono text-xs text-foreground/55">
              На основе результата теста выделены подходящие отрасли
            </p>
          </div>
        )}

        {/* Табы */}
        <div
          className={`mb-5 flex gap-2 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {(["popular", "alpha"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setOpenGroups(new Set()) }}
              className={`rounded-full border px-5 py-2 font-mono text-xs transition-all duration-300 ${
                activeTab === tab
                  ? "border-foreground/40 bg-foreground/20 text-foreground"
                  : "border-foreground/15 bg-foreground/5 text-foreground/50 hover:border-foreground/25 hover:text-foreground/70"
              }`}
            >
              {tab === "popular" ? `Топ-${totalCount} за 10 лет` : "✦ Generation Alpha"}
            </button>
          ))}
        </div>

        {/* Группы */}
        <div className="flex-1 overflow-y-auto space-y-1" style={{ scrollbarWidth: "none" }}>
          {groups.map((group, gi) => {
            const isOpen = openGroups.has(group.industry)
            const isHighlighted = highlightGroups?.includes(group.industry)
            return (
              <div
                key={group.industry}
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${Math.min(gi * 60, 400)}ms` }}
              >
                {/* Заголовок группы */}
                <button
                  onClick={() => toggleGroup(group.industry)}
                  className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
                    isHighlighted
                      ? "border-foreground/35 bg-foreground/15 hover:border-foreground/45 hover:bg-foreground/20"
                      : "border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:bg-foreground/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${isHighlighted ? "bg-foreground/20" : "bg-foreground/10"}`}>
                      <Icon name={group.icon} size={15} className={isHighlighted ? "text-foreground/80" : "text-foreground/60"} fallback="Briefcase" />
                    </div>
                    <span className={`font-sans text-sm font-light transition-colors duration-300 ${isHighlighted ? "text-foreground" : "text-foreground"}`}>{group.industry}</span>
                    <span className="font-mono text-xs text-foreground/35">{group.professions.length}</span>
                    {isHighlighted && <span className="font-mono text-xs text-foreground/50 rounded-full border border-foreground/20 px-2 py-0.5">рекомендовано</span>}
                  </div>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isHighlighted ? "text-foreground/50" : "text-foreground/30"}`}
                  />
                </button>

                {/* Профессии */}
                {isOpen && (
                  <div className="mt-1 ml-4 space-y-0 border-l border-foreground/10 pl-4">
                    {group.professions.map((p, pi) => (
                      <div
                        key={pi}
                        className="group flex items-center justify-between gap-4 border-b border-foreground/8 py-2.5 last:border-0 transition-all duration-300 hover:border-foreground/15"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground/8 transition-all duration-300 group-hover:bg-foreground/15">
                            <Icon name={p.icon} size={14} className="text-foreground/60" fallback="Briefcase" />
                          </div>
                          <div>
                            <span className="block font-sans text-sm text-foreground group-hover:translate-x-0.5 transition-transform duration-200">{p.title}</span>
                            <span className="font-mono text-xs text-foreground/40">{p.example}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}