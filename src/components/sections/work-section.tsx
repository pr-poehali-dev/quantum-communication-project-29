import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

export function WorkSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  const professions = [
    {
      icon: "Cpu",
      title: "AI-инженер",
      category: "Технологии и ИИ",
      example: "Обучает нейросети, создаёт умных ассистентов",
      direction: "left",
    },
    {
      icon: "Gamepad2",
      title: "Геймдизайнер",
      category: "Игры и развлечения",
      example: "Придумывает миры и механики видеоигр",
      direction: "right",
    },
    {
      icon: "Rocket",
      title: "Космический инженер",
      category: "Космос и наука",
      example: "Проектирует ракеты и спутники",
      direction: "left",
    },
    {
      icon: "Video",
      title: "Контент-креатор",
      category: "Медиа и блогинг",
      example: "Снимает ролики и ведёт каналы на миллионы",
      direction: "right",
    },
    {
      icon: "Leaf",
      title: "Эко-технолог",
      category: "Экология будущего",
      example: "Создаёт решения для чистой планеты",
      direction: "left",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 flex flex-wrap items-end justify-between gap-4 transition-all duration-700 md:mb-12 ${
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

        <div className="space-y-4 md:space-y-5">
          {professions.map((profession, i) => (
            <ProfessionCard key={i} profession={profession} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProfessionCard({
  profession,
  index,
  isVisible,
}: {
  profession: { icon: string; title: string; category: string; example: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return profession.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between gap-4 border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-5 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "88%" : "92%",
      }}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground/25 md:h-14 md:w-14">
          <Icon name={profession.icon} className="text-foreground" size={24} />
        </div>
        <div>
          <h3 className="mb-0.5 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
            {profession.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{profession.example}</p>
        </div>
      </div>
      <span className="hidden shrink-0 font-mono text-xs text-foreground/40 md:block md:text-sm">
        {profession.category}
      </span>
    </div>
  )
}
