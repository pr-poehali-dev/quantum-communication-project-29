import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const QUESTIONS = [
  {
    id: 1,
    text: "Что тебя больше заряжает?",
    options: [
      { label: "Решать сложные задачи и головоломки", tags: ["analytical", "tech"] },
      { label: "Помогать людям и общаться", tags: ["social", "people"] },
      { label: "Создавать что-то своими руками", tags: ["creative", "maker"] },
      { label: "Организовывать процессы и команды", tags: ["leader", "manager"] },
    ],
  },
  {
    id: 2,
    text: "В какой среде тебе комфортнее работать?",
    options: [
      { label: "За компьютером, в тишине", tags: ["tech", "analytical"] },
      { label: "В команде, в живом общении", tags: ["social", "people"] },
      { label: "В творческой мастерской или студии", tags: ["creative", "maker"] },
      { label: "В движении — встречи, переговоры", tags: ["leader", "manager"] },
    ],
  },
  {
    id: 3,
    text: "Что тебе легко даётся?",
    options: [
      { label: "Логика, цифры, системное мышление", tags: ["analytical", "tech"] },
      { label: "Слушать, понимать и поддерживать", tags: ["social", "people"] },
      { label: "Придумывать идеи и воплощать их", tags: ["creative", "maker"] },
      { label: "Убеждать, вести за собой", tags: ["leader", "manager"] },
    ],
  },
  {
    id: 4,
    text: "Что тебя вдохновляет?",
    options: [
      { label: "Технологии и будущее", tags: ["tech", "analytical"] },
      { label: "Люди и их истории", tags: ["people", "social"] },
      { label: "Искусство, дизайн, культура", tags: ["creative", "maker"] },
      { label: "Бизнес и большие проекты", tags: ["manager", "leader"] },
    ],
  },
  {
    id: 5,
    text: "Что важнее для тебя в работе?",
    options: [
      { label: "Точность и глубокая экспертиза", tags: ["analytical", "tech"] },
      { label: "Польза для людей вокруг", tags: ["social", "people"] },
      { label: "Свобода и самовыражение", tags: ["creative", "maker"] },
      { label: "Влияние и результат", tags: ["leader", "manager"] },
    ],
  },
]

const RESULTS: Record<string, { title: string; icon: string; description: string; professions: string[] }> = {
  analytical: {
    title: "Аналитический тип",
    icon: "BarChart2",
    description: "Ты мыслишь системно, любишь работать с данными и разбираться в сложных вещах. Тебе важна точность и глубина.",
    professions: ["Data Scientist", "Финансовый аналитик", "Бизнес-аналитик", "Учёный-исследователь", "Разработчик ПО"],
  },
  tech: {
    title: "Технологический тип",
    icon: "Cpu",
    description: "Тебя притягивают технологии и инновации. Ты хочешь строить будущее, создавать системы и решать задачи с помощью кода.",
    professions: ["AI/ML-инженер", "Cloud-инженер", "DevOps", "Разработчик AR/VR", "Кибербезопасность"],
  },
  social: {
    title: "Социальный тип",
    icon: "Users",
    description: "Твоя сила — в людях. Ты умеешь слышать, помогать и выстраивать отношения. Работа с людьми — твоя стихия.",
    professions: ["HR-специалист", "Психолог", "Коуч", "Преподаватель", "Wellbeing-дизайнер"],
  },
  people: {
    title: "Коммуникативный тип",
    icon: "MessageCircle",
    description: "Ты легко находишь общий язык с любым человеком. Умеешь убеждать, объяснять и вдохновлять своими словами.",
    professions: ["Маркетолог", "PR-менеджер", "Продакт-менеджер", "Спикер / коуч", "Контент-креатор"],
  },
  creative: {
    title: "Творческий тип",
    icon: "Palette",
    description: "Ты видишь мир иначе. Создаёшь красоту, смыслы и новые идеи. Тебе нужна свобода для самовыражения.",
    professions: ["UX/UI-дизайнер", "Геймдизайнер", "Бренд-дизайнер", "Видеограф", "AI-музыкант"],
  },
  maker: {
    title: "Созидательный тип",
    icon: "Wrench",
    description: "Тебе важно создавать что-то реальное — видеть результат своего труда. Идеи без воплощения тебя не удовлетворяют.",
    professions: ["Архитектор", "Инженер зелёной энергии", "3D-биопечать", "Агро-технолог", "Космический инженер"],
  },
  leader: {
    title: "Лидерский тип",
    icon: "Crown",
    description: "Ты рождён вести за собой. Видишь большую картину, умеешь принимать решения и вдохновлять команду на результат.",
    professions: ["Предприниматель", "Продакт-менеджер", "Менеджер проектов", "Финансовый директор", "Цифровой дипломат"],
  },
  manager: {
    title: "Управленческий тип",
    icon: "Briefcase",
    description: "Тебе нравится выстраивать процессы, контролировать результат и делать так, чтобы всё работало как часы.",
    professions: ["Менеджер проектов", "E-commerce менеджер", "Менеджер логистики", "HR-директор", "Бизнес-аналитик"],
  },
}

export function OrientationSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (tags: string[]) => {
    const newScores = { ...scores }
    tags.forEach((tag) => {
      newScores[tag] = (newScores[tag] || 0) + 1
    })
    setScores(newScores)

    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1)
    } else {
      const top = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
      setResult(top)
    }
  }

  const reset = () => {
    setStarted(false)
    setCurrentQ(0)
    setScores({})
    setResult(null)
  }

  const progress = started ? ((currentQ) / QUESTIONS.length) * 100 : 0

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Заголовок */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Профориентация
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Пойми свои сильные стороны</p>
        </div>

        {/* Карточка */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {!started && !result && (
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Левая — что такое профориентация */}
              <div className="rounded-2xl border border-foreground/15 bg-foreground/10 p-8 backdrop-blur-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/15">
                  <Icon name="Compass" size={24} className="text-foreground/80" />
                </div>
                <h3 className="mb-3 font-sans text-xl font-light text-foreground">
                  Что такое профориентация?
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-foreground/60">
                  Профориентация — это процесс, который помогает человеку понять, кем он хочет стать и в чём его настоящий потенциал. Это не просто выбор профессии, а глубокое исследование себя: своих ценностей, интересов и природных способностей.
                </p>
                <p className="text-sm leading-relaxed text-foreground/60">
                  Правильно выбранный путь — это не случайность, а результат осознанной работы над собой. Именно с этого начинается карьера мечты.
                </p>
              </div>

              {/* Правая — наши партнёры + тест */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-foreground/15 bg-foreground/10 p-8 backdrop-blur-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/15">
                    <Icon name="HandshakeIcon" size={24} className="text-foreground/80" fallback="Users" />
                  </div>
                  <h3 className="mb-3 font-sans text-xl font-light text-foreground">
                    Работаем с опытными партнёрами
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-foreground/60">
                    Наши партнёры — эксперты с многолетним опытом в карьерном консультировании. Они помогут тебе определить:
                  </p>
                  <div className="mb-6 space-y-2">
                    {[
                      { icon: "TrendingUp", text: "Возможные направления развития" },
                      { icon: "Star", text: "Сильные стороны и таланты" },
                      { icon: "Heart", text: "Сферы интереса и призвание" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/10">
                          <Icon name={item.icon} size={14} className="text-foreground/60" />
                        </div>
                        <span className="text-sm text-foreground/70">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground/90 px-6 py-3 font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground hover:scale-[1.02]">
                    <Icon name="CalendarCheck" size={16} className="text-background" />
                    Заказать консультацию
                  </button>
                </div>

                <button
                  onClick={() => setStarted(true)}
                  className="rounded-2xl border border-foreground/15 bg-foreground/10 px-8 py-5 text-left backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/20 hover:scale-[1.02]"
                >
                  <p className="mb-1 font-mono text-xs text-foreground/40">Быстрый тест</p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-light text-foreground">Узнай свой тип за 5 вопросов →</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {started && !result && (
            <div className="rounded-2xl border border-foreground/15 bg-foreground/10 p-8 backdrop-blur-md md:p-10">
              {/* Прогресс */}
              <div className="mb-6">
                <div className="mb-2 flex justify-between">
                  <span className="font-mono text-xs text-foreground/40">Вопрос {currentQ + 1} из {QUESTIONS.length}</span>
                  <span className="font-mono text-xs text-foreground/40">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-foreground/40 transition-all duration-500"
                    style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="mb-6 font-sans text-xl font-light text-foreground md:text-2xl">
                {QUESTIONS[currentQ].text}
              </h3>

              <div className="space-y-3">
                {QUESTIONS[currentQ].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(opt.tags)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4 text-left text-sm text-foreground/80 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/15 hover:text-foreground"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/20 font-mono text-xs text-foreground/40 transition-all duration-300 group-hover:border-foreground/40 group-hover:text-foreground/60">
                      →
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result && RESULTS[result] && (
            <div className="rounded-2xl border border-foreground/15 bg-foreground/10 p-8 backdrop-blur-md md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-foreground/15">
                <Icon name={RESULTS[result].icon} size={28} className="text-foreground/80" fallback="Star" />
              </div>
              <p className="mb-1 font-mono text-xs text-foreground/40">Твой результат</p>
              <h3 className="mb-3 font-sans text-2xl font-light text-foreground md:text-3xl">
                {RESULTS[result].title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-foreground/65">
                {RESULTS[result].description}
              </p>
              <div className="mb-7">
                <p className="mb-3 font-mono text-xs text-foreground/40">Подходящие профессии</p>
                <div className="flex flex-wrap gap-2">
                  {RESULTS[result].professions.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-foreground/15 bg-foreground/10 px-3 py-1 font-mono text-xs text-foreground/70"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={reset}
                className="font-mono text-xs text-foreground/40 transition-colors hover:text-foreground/70"
              >
                ← Пройти заново
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}