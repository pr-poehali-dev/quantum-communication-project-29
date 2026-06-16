import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

const QUESTIONS = [
  {
    question: "Что тебе интереснее всего?",
    options: [
      { label: "Создавать технологии", type: "tech" },
      { label: "Придумывать истории и контент", type: "media" },
      { label: "Помогать людям и природе", type: "eco" },
      { label: "Исследовать новое", type: "science" },
    ],
  },
  {
    question: "Как ты любишь работать?",
    options: [
      { label: "В одиночку над сложной задачей", type: "tech" },
      { label: "В команде творческих людей", type: "media" },
      { label: "С пользой для общества", type: "eco" },
      { label: "Экспериментируя и пробуя", type: "science" },
    ],
  },
  {
    question: "Какой школьный предмет тебе ближе?",
    options: [
      { label: "Информатика", type: "tech" },
      { label: "Литература и искусство", type: "media" },
      { label: "Биология и экология", type: "eco" },
      { label: "Физика и математика", type: "science" },
    ],
  },
]

const RESULTS: Record<string, { title: string; icon: string; text: string }> = {
  tech: { title: "AI-инженер", icon: "Cpu", text: "Тебе подходят профессии в технологиях и искусственном интеллекте." },
  media: { title: "Контент-креатор", icon: "Video", text: "Твоё призвание — медиа, блогинг и творческие проекты." },
  eco: { title: "Эко-технолог", icon: "Leaf", text: "Тебе близки профессии будущего для здоровья планеты." },
  science: { title: "Космический инженер", icon: "Rocket", text: "Наука и исследования — твоя стихия." },
}

export function TestSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleAnswer = (type: string) => {
    setScores((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
    setStep((s) => s + 1)
  }

  const reset = () => {
    setStep(0)
    setScores({})
  }

  const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "tech"
  const result = RESULTS[topType]
  const isFinished = step >= QUESTIONS.length

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Тест
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Найди свою профессию</p>
        </div>

        {!isFinished ? (
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="mb-2 font-mono text-xs text-foreground/50">
              Вопрос {step + 1} из {QUESTIONS.length}
            </p>
            <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
              <div
                className="h-full rounded-full bg-foreground/60 transition-all duration-500"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">
              {QUESTIONS[step].question}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleAnswer(opt.type)}
                  className="group rounded-xl border border-foreground/20 bg-foreground/10 p-4 text-left backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-foreground/40 hover:bg-foreground/20"
                >
                  <span className="text-base text-foreground md:text-lg">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl border border-foreground/20 bg-foreground/10 p-8 backdrop-blur-md transition-all duration-700 animate-in fade-in zoom-in-95"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-foreground/20">
              <Icon name={result.icon} className="text-foreground" size={32} />
            </div>
            <p className="mb-1 font-mono text-xs text-foreground/60">Тебе подходит</p>
            <h3 className="mb-3 font-sans text-3xl font-light text-foreground md:text-4xl">{result.title}</h3>
            <p className="mb-6 max-w-md text-base leading-relaxed text-foreground/80">{result.text}</p>
            <MagneticButton variant="secondary" onClick={reset}>
              Пройти заново
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  )
}
