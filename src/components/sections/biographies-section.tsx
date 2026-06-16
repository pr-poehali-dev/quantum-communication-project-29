import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const PEOPLE = [
  {
    name: "Илон Маск",
    field: "Технологии и космос",
    photo: "https://cdn.poehali.dev/projects/9886e8ff-c2a2-4890-9e1e-5e43e9e01c6a/files/0fe67089-12c7-405c-9160-5ed53d7660e1.jpg",
    short: "Основатель Tesla и SpaceX",
    bio: "С детства увлекался программированием и в 12 лет продал свою первую игру. Сегодня он строит электромобили и ракеты, мечтая сделать человечество межпланетным.",
    education: [
      { type: "Школа", name: "Waterkloof House Preparatory School, Претория — общеобразовательная программа с упором на точные науки" },
      { type: "Вуз", name: "Университет Пенсильвании — двойная специализация: физика (факультет Arts & Sciences) и экономика (Wharton School)" },
      { type: "Вуз", name: "Stanford University — поступил на PhD по энергетической физике, бросил через 2 дня ради запуска Zip2" },
    ],
    direction: "left",
  },
  {
    name: "Стив Джобс",
    field: "Дизайн и технологии",
    photo: "https://cdn.poehali.dev/projects/9886e8ff-c2a2-4890-9e1e-5e43e9e01c6a/files/8aade7a0-4bc6-4bdc-9082-ebc628e2b2c2.jpg",
    short: "Сооснователь Apple",
    bio: "Соединил технологии и искусство, изменив то, как мы пользуемся компьютерами и телефонами. Верил, что простота — высшая форма совершенства.",
    education: [
      { type: "Школа", name: "Homestead High School, Купертино — общая программа, посещал кружок электроники в HP" },
      { type: "Вуз", name: "Reed College, Портленд — специализация: гуманитарные науки и философия, бросил после 1 семестра, но вольнослушателем ходил на каллиграфию — именно она вдохновила шрифты Mac" },
    ],
    direction: "top",
  },
  {
    name: "Мария Кюри",
    field: "Наука",
    photo: "https://cdn.poehali.dev/projects/9886e8ff-c2a2-4890-9e1e-5e43e9e01c6a/files/c7dfd6b4-e076-4450-83c6-80ddb68e50d8.jpg",
    short: "Первый дважды нобелевский лауреат",
    bio: "Несмотря на все преграды для женщин её времени, стала великим учёным и открыла радиоактивность, заложив основы современной физики и медицины.",
    education: [
      { type: "Школа", name: "Женская гимназия Я. Сикорской, Варшава — классическая программа: математика, физика, иностранные языки" },
      { type: "Вуз", name: "Сорбонна (Париж) — лицензиат по физике (1893) и по математике (1894), окончила первой в своём выпуске по физике" },
      { type: "Степень", name: "Сорбонна — докторантура по физике, тема: исследование радиоактивности. Первая женщина с PhD по физике во Франции (1903)" },
    ],
    direction: "bottom",
  },
  {
    name: "Хаяо Миядзаки",
    field: "Анимация и искусство",
    photo: "https://cdn.poehali.dev/projects/9886e8ff-c2a2-4890-9e1e-5e43e9e01c6a/files/4f7c727d-b4b6-4312-9b48-02317541fb3f.jpg",
    short: "Режиссёр студии Ghibli",
    bio: "Создал волшебные миры, которые вдохновляют миллионы. Доказал, что упорство и любовь к делу превращают мечту в шедевр.",
    education: [
      { type: "Школа", name: "Оёгита Высшая школа, Токио — гуманитарный профиль, увлекался рисованием манги и авиамоделированием" },
      { type: "Вуз", name: "Университет Гакусюин, Токио — специализация: политическая экономия (факультет политики и экономики), 1963" },
      { type: "Опыт", name: "Toei Animation — начал рядовым аниматором, самостоятельно освоил всё: раскадровку, режиссуру, сценарий и концепт-арт" },
    ],
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
  person: { name: string; field: string; photo: string; short: string; bio: string; education: { type: string; name: string }[]; direction: string }
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
      className={`group flex flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/10 text-left backdrop-blur-md transition-all duration-700 hover:border-foreground/30 hover:bg-foreground/20 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {/* Фото */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={person.photo}
          alt={person.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <Icon
            name="ChevronDown"
            className={`text-white/70 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
            size={20}
          />
        </div>
      </div>

      {/* Текст */}
      <div className="p-5">
        <h3 className="mb-1 font-sans text-xl font-light text-foreground">{person.name}</h3>
        <p className="mb-3 font-mono text-xs text-foreground/50">{person.field}</p>
        <p className="mb-0 text-sm leading-relaxed text-foreground/80">
          {isActive ? person.bio : person.short}
        </p>
        {isActive && (
          <div className="mt-4 space-y-2 border-t border-foreground/10 pt-4">
            <p className="mb-2 font-mono text-xs text-foreground/40">Образование</p>
            {person.education.map((edu) => (
              <div key={edu.name} className="flex gap-2">
                <span className="mt-0.5 shrink-0 rounded bg-foreground/15 px-1.5 py-0.5 font-mono text-xs text-foreground/50">
                  {edu.type}
                </span>
                <span className="text-xs leading-snug text-foreground/70">{edu.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}