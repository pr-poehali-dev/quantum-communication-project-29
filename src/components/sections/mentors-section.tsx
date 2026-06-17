import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

const MENTORS = [
  { name: "Ксения Черменская", role: "Фаундер · Ментор · Венчурный инвестор", topic: "Финансы · Инвестиции · IT", icon: "TrendingUp", photo: "https://cdn.poehali.dev/projects/9886e8ff-c2a2-4890-9e1e-5e43e9e01c6a/bucket/224b76bd-f6fb-42bb-b843-6dcc78768cbe.jpeg", bio: "Экс финансовый и инвестиционный директор крупных ИТ-компаний, более 15 лет в технологическом секторе, многодетная мать", direction: "left" },
  { name: "Алексей Воронов", role: "AI-инженер в IT-компании", topic: "Искусственный интеллект", icon: "Cpu", photo: null, bio: null, direction: "top" },
  { name: "Мария Светлова", role: "Геймдизайнер игровой студии", topic: "Разработка игр", icon: "Gamepad2", photo: null, bio: null, direction: "right" },
  { name: "Иван Космов", role: "Инженер аэрокосмической отрасли", topic: "Космос и ракеты", icon: "Rocket", photo: null, bio: null, direction: "bottom" },
  { name: "Дарья Эко", role: "Эко-технолог стартапа", topic: "Зелёные технологии", icon: "Leaf", photo: null, bio: null, direction: "left" },
  { name: "Сергей Капитал", role: "Финансовый директор (CFO)", topic: "Финансы компании", icon: "Landmark", photo: null, bio: null, direction: "bottom" },
  { name: "Анна Рыкова", role: "Финансовый аналитик", topic: "Анализ рынков и данных", icon: "BarChart2", photo: null, bio: null, direction: "top" },
  { name: "Ольга Форма", role: "Основатель студии дизайна", topic: "Дизайн и брендинг", icon: "Palette", photo: null, bio: null, direction: "right" },
]

export function MentorsSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex w-screen shrink-0 snap-start items-start px-6 pt-24 md:px-12 lg:px-16"
      style={{ height: "100dvh" }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col pb-6">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Менторы
          </h2>
          <p className="mb-4 font-mono text-sm text-foreground/60 md:text-base">/ Поговори с профессионалом в Zoom</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest">Как попробовать себя?</p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/10 px-3 py-1 font-mono text-xs text-foreground/70">
                <Icon name="MessageCircle" size={12} />
                Пообщаться с тем, кто уже работает в отрасли
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/10 px-3 py-1 font-mono text-xs text-foreground/70">
                <Icon name="Briefcase" size={12} />
                Пройти стажировку
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MENTORS.map((mentor, i) => (
              <MentorCard key={i} mentor={mentor} index={i} isVisible={isVisible} />
            ))}
          </div>
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
  mentor: { name: string; role: string; topic: string; icon: string; photo: string | null; bio: string | null; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (mentor.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/10 backdrop-blur-md transition-all duration-700 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/20 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {mentor.photo ? (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ) : (
        <div className="flex h-16 items-end px-5 pt-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/20 transition-transform duration-300 group-hover:scale-110">
            <Icon name={mentor.icon} className="text-foreground" size={22} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-sans text-base font-light text-foreground">{mentor.name}</h3>
        <p className="mb-1 text-xs text-foreground/70">{mentor.role}</p>
        <p className="mb-3 font-mono text-xs text-foreground/50">{mentor.topic}</p>
        {mentor.bio && (
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">{mentor.bio}</p>
        )}
        <div className="mt-auto">
          <MagneticButton variant="secondary" className="w-full">
            <span className="flex items-center justify-center gap-2">
              <Icon name="Video" size={16} />
              Созвон в Zoom
            </span>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}