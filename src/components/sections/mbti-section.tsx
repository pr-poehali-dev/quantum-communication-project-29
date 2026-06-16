import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

// MBTI строится по 4 шкалам: E/I, S/N, T/F, J/P
// Каждый вопрос даёт +1 к одной из букв
const QUESTIONS = [
  {
    question: "Как ты восстанавливаешь энергию после долгого дня?",
    a: { label: "Иду к друзьям или на тусовку", dim: "E" },
    b: { label: "Побуду один — почитаю, поиграю", dim: "I" },
  },
  {
    question: "Ты знакомишься с новым человеком — что ты делаешь?",
    a: { label: "Сам начинаю разговор, мне легко", dim: "E" },
    b: { label: "Жду, пока он заговорит первым", dim: "I" },
  },
  {
    question: "Что тебе важнее в задании?",
    a: { label: "Конкретные факты и детали", dim: "S" },
    b: { label: "Общая идея и скрытый смысл", dim: "N" },
  },
  {
    question: "Как ты лучше запоминаешь информацию?",
    a: { label: "Через примеры и практику", dim: "S" },
    b: { label: "Через концепции и теорию", dim: "N" },
  },
  {
    question: "Как ты принимаешь решения?",
    a: { label: "Логикой — смотрю на факты и пользу", dim: "T" },
    b: { label: "Чувствами — думаю о людях и отношениях", dim: "F" },
  },
  {
    question: "Тебя попросили оценить работу друга. Она плохая. Что скажешь?",
    a: { label: "Честно скажу, что не так", dim: "T" },
    b: { label: "Сначала похвалю, чтобы не обидеть", dim: "F" },
  },
  {
    question: "Как ты планируешь свои дела?",
    a: { label: "Составляю список и следую ему", dim: "J" },
    b: { label: "Действую по ситуации, планы мешают", dim: "P" },
  },
  {
    question: "Дедлайн завтра. Ты...",
    a: { label: "Давно всё сдал — не люблю ждать", dim: "J" },
    b: { label: "Делаю в последний момент — так лучше", dim: "P" },
  },
  {
    question: "На переменке ты скорее...",
    a: { label: "В центре компании, шучу и общаюсь", dim: "E" },
    b: { label: "В сторонке или с одним-двумя друзьями", dim: "I" },
  },
  {
    question: "Что тебя больше привлекает в будущей работе?",
    a: { label: "Чёткий результат, понятная задача", dim: "S" },
    b: { label: "Возможность изобретать и экспериментировать", dim: "N" },
  },
  {
    question: "В споре ты чаще думаешь:",
    a: { label: "Кто прав по сути", dim: "T" },
    b: { label: "Как бы никого не задеть", dim: "F" },
  },
  {
    question: "Твоя комната скорее...",
    a: { label: "Всё на своих местах, порядок", dim: "J" },
    b: { label: "Творческий хаос — я знаю, где что", dim: "P" },
  },
]

const MBTI_TYPES: Record<string, { title: string; icon: string; desc: string; jobs: string[] }> = {
  INTJ: { title: "Стратег", icon: "Brain", desc: "Независимый мыслитель с видением будущего. Строишь системы и доводишь идеи до конца.", jobs: ["AI-архитектор", "Учёный", "Системный аналитик"] },
  INTP: { title: "Логик", icon: "Atom", desc: "Любишь теории и задаёшь вопросы «почему?». Тебе интересно, как устроен мир.", jobs: ["Исследователь", "Программист", "Философ данных"] },
  ENTJ: { title: "Командир", icon: "Trophy", desc: "Прирождённый лидер. Видишь цель — и ведёшь других к ней.", jobs: ["Предприниматель", "Топ-менеджер", "Продюсер"] },
  ENTP: { title: "Полемист", icon: "Zap", desc: "Генератор идей, споришь ради поиска истины. Быстро схватываешь новое.", jobs: ["Стартапер", "Изобретатель", "Маркетолог-стратег"] },
  INFJ: { title: "Советник", icon: "Heart", desc: "Видишь людей насквозь. Хочешь менять мир к лучшему.", jobs: ["Психолог", "Наставник", "Социальный предприниматель"] },
  INFP: { title: "Посредник", icon: "Feather", desc: "Мечтатель с сильными ценностями. Ищешь смысл во всём, что делаешь.", jobs: ["Писатель", "Арт-директор", "Эко-активист"] },
  ENFJ: { title: "Тренер", icon: "Users", desc: "Вдохновляешь других и умеешь слышать. Твоя суперсила — люди.", jobs: ["Ментор", "Режиссёр", "HR-лидер"] },
  ENFP: { title: "Борец", icon: "Sparkles", desc: "Энтузиаст с горящими глазами. Везде видишь возможности.", jobs: ["Контент-креатор", "Журналист", "Event-менеджер"] },
  ISTJ: { title: "Администратор", icon: "ClipboardList", desc: "Надёжный и методичный. Доводишь дела до конца без лишних слов.", jobs: ["Инженер", "Аудитор", "Системный администратор"] },
  ISFJ: { title: "Защитник", icon: "Shield", desc: "Заботишься о других, помнишь детали. Твои близкие знают, что ты рядом.", jobs: ["Медик", "Учитель", "Социальный работник"] },
  ESTJ: { title: "Менеджер", icon: "Briefcase", desc: "Организуешь порядок там, где хаос. Ответственный и прямой.", jobs: ["Руководитель проекта", "Юрист", "Операционный директор"] },
  ESFJ: { title: "Консул", icon: "Handshake", desc: "Создаёшь гармонию вокруг себя. Заряжаешь команду теплом.", jobs: ["PR-менеджер", "Педагог", "Организатор мероприятий"] },
  ISTP: { title: "Виртуоз", icon: "Wrench", desc: "Мастер на все руки. Разбираешься в механизмах и любишь решать конкретные задачи.", jobs: ["Робототехник", "Пилот", "Разработчик игр"] },
  ISFP: { title: "Артист", icon: "Palette", desc: "Живёшь в моменте и выражаешь себя через творчество.", jobs: ["Геймдизайнер", "Фотограф", "UX-дизайнер"] },
  ESTP: { title: "Делец", icon: "TrendingUp", desc: "Действуешь быстро и не боишься риска. Прирождённый переговорщик.", jobs: ["Трейдер", "Предприниматель", "Спортивный агент"] },
  ESFP: { title: "Развлекатель", icon: "Star", desc: "Жизнь — это шоу, а ты — его центр. Умеешь зажечь любую аудиторию.", jobs: ["Блогер", "Актёр", "Бренд-амбассадор"] },
}

function getMbtiType(scores: Record<string, number>) {
  const E = scores["E"] || 0
  const I = scores["I"] || 0
  const S = scores["S"] || 0
  const N = scores["N"] || 0
  const T = scores["T"] || 0
  const F = scores["F"] || 0
  const J = scores["J"] || 0
  const P = scores["P"] || 0
  return `${E >= I ? "E" : "I"}${S >= N ? "S" : "N"}${T >= F ? "T" : "F"}${J >= P ? "J" : "P"}`
}

export function MbtiSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [step, setStep] = useState<"intro" | number | "result">("intro")
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleAnswer = (dim: string) => {
    const newScores = { ...scores, [dim]: (scores[dim] || 0) + 1 }
    setScores(newScores)
    const nextStep = typeof step === "number" ? step + 1 : 1
    if (nextStep >= QUESTIONS.length) {
      setStep("result")
    } else {
      setStep(nextStep)
    }
  }

  const reset = () => {
    setStep("intro")
    setScores({})
  }

  const currentIdx = typeof step === "number" ? step : 0
  const mbtiType = getMbtiType(scores)
  const result = MBTI_TYPES[mbtiType] || MBTI_TYPES["ENFP"]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Тип личности
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ MBTI — узнай свой код силы</p>
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {step === "intro" && (
            <div className="animate-in fade-in duration-500">
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-foreground/80">
                12 вопросов — и ты узнаешь свой тип личности по методике MBTI. Это поможет лучше понять, какие
                профессии подходят именно тебе.
              </p>
              <div className="mb-8 grid gap-3 sm:grid-cols-2">
                {["Экстраверт или Интроверт?", "Сенсорик или Интуит?", "Логик или Этик?", "Решающий или Воспринимающий?"].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-foreground/15 bg-foreground/10 px-4 py-3 backdrop-blur-md"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/20 font-mono text-xs text-foreground/70">
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
              <MagneticButton variant="primary" size="lg" onClick={() => setStep(0)}>
                Начать тест
              </MagneticButton>
            </div>
          )}

          {typeof step === "number" && step < QUESTIONS.length && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-5 flex items-center gap-4">
                <p className="font-mono text-xs text-foreground/50">
                  {currentIdx + 1} / {QUESTIONS.length}
                </p>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/15">
                  <div
                    className="h-full rounded-full bg-foreground/70 transition-all duration-500"
                    style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              <h3 className="mb-6 font-sans text-2xl font-light leading-snug text-foreground md:text-3xl">
                {QUESTIONS[currentIdx].question}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[QUESTIONS[currentIdx].a, QUESTIONS[currentIdx].b].map((opt) => (
                  <button
                    key={opt.dim}
                    onClick={() => handleAnswer(opt.dim)}
                    className="group rounded-xl border border-foreground/20 bg-foreground/10 p-5 text-left backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-foreground/40 hover:bg-foreground/20"
                  >
                    <span className="text-base leading-snug text-foreground md:text-lg">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="rounded-2xl border border-foreground/20 bg-foreground/10 p-6 backdrop-blur-md md:p-8">
                <div className="mb-5 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-foreground/20">
                    <Icon name={result.icon} className="text-foreground" size={30} fallback="User" />
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-foreground/50">Твой тип личности</p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-sans text-4xl font-light tracking-widest text-foreground md:text-5xl">
                        {mbtiType}
                      </span>
                      <span className="font-sans text-xl font-light text-foreground/70">{result.title}</span>
                    </div>
                  </div>
                </div>

                <p className="mb-5 leading-relaxed text-foreground/80">{result.desc}</p>

                <div className="mb-6">
                  <p className="mb-3 font-mono text-xs text-foreground/50">Профессии для тебя</p>
                  <div className="flex flex-wrap gap-2">
                    {result.jobs.map((job) => (
                      <span
                        key={job}
                        className="rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 font-mono text-xs text-foreground/80"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>

                <MagneticButton variant="secondary" onClick={reset}>
                  Пройти заново
                </MagneticButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
