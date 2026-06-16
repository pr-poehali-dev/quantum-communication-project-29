import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

const MENTORS = [
  { name: "Алексей Воронов", role: "AI-инженер в IT-компании", topic: "Искусственный интеллект", icon: "Cpu", direction: "left" },
  { name: "Мария Светлова", role: "Геймдизайнер игровой студии", topic: "Разработка игр", icon: "Gamepad2", direction: "top" },
  { name: "Иван Космов", role: "Инженер аэрокосмической отрасли", topic: "Космос и ракеты", icon: "Rocket", direction: "right" },
  { name: "Дарья Эко", role: "Эко-технолог стартапа", topic: "Зелёные технологии", icon: "Leaf", direction: "bottom" },
  { name: "Сергей Капитал", role: "Финансовый директор (CFO)", topic: "Финансы компании", icon: "Landmark", direction: "left" },
  { name: "Анна Рыкова", role: "Финансовый аналитик", topic: "Анализ рынков и данных", icon: "BarChart2", direction: "bottom" },
  { name: "Павел Инвест", role: "Инвестиционный директор", topic: "Венчур и инвестиции", icon: "TrendingUp", direction: "top" },
  { name: "Ольга Форма", role: "Основатель студии дизайна", topic: "Дизайн и брендинг", icon: "Palette", direction: "right" },
]

export function MentorsSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Менторы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Поговори с профессионалом в Zoom</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((mentor, i) => (
            <MentorCard key={i} mentor={mentor} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MentorCard({
  mentor,
  index,
  isVisible,
}: {
  mentor: { name: string; role: string; topic: string; icon: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (mentor.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group flex flex-col rounded-2xl border border-foreground/15 bg-foreground/10 p-5 backdrop-blur-md transition-all duration-700 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/20 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/20 transition-transform duration-300 group-hover:scale-110">
        <Icon name={mentor.icon} className="text-foreground" size={22} />
      </div>
      <h3 className="mb-1 font-sans text-base font-light text-foreground">{mentor.name}</h3>
      <p className="mb-1 text-xs text-foreground/70">{mentor.role}</p>
      <p className="mb-4 font-mono text-xs text-foreground/50">{mentor.topic}</p>
      <div className="mt-auto">
        <MagneticButton variant="secondary" className="w-full">
          <span className="flex items-center justify-center gap-2">
            <Icon name="Video" size={16} />
            Созвон в Zoom
          </span>
        </MagneticButton>
      </div>
    </div>
  )
}