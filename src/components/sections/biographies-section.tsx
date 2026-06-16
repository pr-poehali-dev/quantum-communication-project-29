import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const PEOPLE = [
  {
    name: "Илон Маск",
    field: "Технологии и космос",
    icon: "Rocket",
    short: "Основатель Tesla и SpaceX",
    bio: "С детства увлекался программированием и в 12 лет продал свою первую игру. Сегодня он строит электромобили и ракеты, мечтая сделать человечество межпланетным.",
    direction: "left",
  },
  {
    name: "Стив Джобс",
    field: "Дизайн и технологии",
    icon: "Apple",
    short: "Сооснователь Apple",
    bio: "Соединил технологии и искусство, изменив то, как мы пользуемся компьютерами и телефонами. Верил, что простота — высшая форма совершенства.",
    direction: "top",
  },
  {
    name: "Мария Кюри",
    field: "Наука",
    icon: "Atom",
    short: "Первый дважды нобелевский лауреат",
    bio: "Несмотря на все преграды для женщин её времени, стала великим учёным и открыла радиоактивность, заложив основы современной физики и медицины.",
    direction: "bottom",
  },
  {
    name: "Хаяо Миядзаки",
    field: "Анимация и искусство",
    icon: "Clapperboard",
    short: "Режиссёр студии Ghibli",
    bio: "Создал волшебные миры, которые вдохновляют миллионы. Доказал, что упорство и любовь к делу превращают мечту в шедевр.",
    direction: "right",
  },
]

export function BiographiesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [active, setActive] = useState<number | null>(null)

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
            Биографии
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Истории тех, кто вдохновляет</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PEOPLE.map((person, i) => (
            <PersonCard
              key={i}
              person={person}
              index={i}
              isVisible={isVisible}
              isActive={active === i}
              onToggle={() => setActive(active === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonCard({
  person,
  index,
  isVisible,
  isActive,
  onToggle,
}: {
  person: { name: string; field: string; icon: string; short: string; bio: string; direction: string }
  index: number
  isVisible: boolean
  isActive: boolean
  onToggle: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (person.direction) {
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
    <button
      onClick={onToggle}
      className={`group flex flex-col rounded-2xl border border-foreground/15 bg-foreground/10 p-5 text-left backdrop-blur-md transition-all duration-700 hover:border-foreground/30 hover:bg-foreground/20 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-foreground/20 transition-transform duration-300 group-hover:scale-110">
          <Icon name={person.icon} className="text-foreground" size={26} fallback="User" />
        </div>
        <Icon
          name="ChevronDown"
          className={`text-foreground/50 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
          size={20}
        />
      </div>
      <h3 className="mb-1 font-sans text-xl font-light text-foreground">{person.name}</h3>
      <p className="mb-3 font-mono text-xs text-foreground/50">{person.field}</p>
      <p className="text-sm leading-relaxed text-foreground/80">
        {isActive ? person.bio : person.short}
      </p>
    </button>
  )
}
