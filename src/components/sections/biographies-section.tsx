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
      { type: "Вуз", name: "Университет Пенсильвании — двойная специализация: физика (Arts & Sciences) и экономика (Wharton School)" },
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
      { type: "Вуз", name: "Reed College, Портленд — гуманитарные науки и философия, бросил после 1 семестра; вольнослушателем изучал каллиграфию — она вдохновила шрифты Mac" },
    ],
    direction: "top",
  },
  {
    name: "Уоррен Баффетт",
    field: "Инвестиции и финансы",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/800px-Warren_Buffett_KU_Visit.jpg",
    short: "Величайший инвестор всех времён",
    bio: "Купил первые акции в 11 лет, а первый бизнес открыл в 13. Превратил небольшую текстильную компанию Berkshire Hathaway в конгломерат стоимостью сотни миллиардов. Его секрет — терпение и здравый смысл.",
    education: [
      { type: "Школа", name: "Woodrow Wilson High School, Вашингтон — уже в школе вёл несколько небольших бизнесов" },
      { type: "Вуз", name: "Университет Небраски — бизнес и экономика (BS), 1950" },
      { type: "Вуз", name: "Columbia Business School — специализация: экономика и инвестиции под руководством Бенджамина Грэма, автора «Разумного инвестора» (MBA, 1951)" },
    ],
    direction: "bottom",
  },
  {
    name: "Марина Цветаева",
    field: "Литература и поэзия",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Marina_Tsvetaeva.jpg/800px-Marina_Tsvetaeva.jpg",
    short: "Одна из величайших поэтов XX века",
    bio: "Писала стихи с шести лет. Прожила трагическую жизнь в эмиграции, потеряла дочь и мужа, но создала тексты, которые стали вершиной русской лирики. Её слова живут вопреки времени.",
    education: [
      { type: "Школа", name: "Частные пансионы в Лозанне и Фрайбурге — французский язык, литература, музыка" },
      { type: "Вуз", name: "Московский университет — курс истории западноевропейской литературы (вольнослушатель, 1909)" },
      { type: "Опыт", name: "Самостоятельное изучение немецкой и французской поэзии; первый сборник «Вечерний альбом» вышел в 18 лет" },
    ],
    direction: "right",
  },
  {
    name: "Льюис Хэмилтон",
    field: "Автоспорт",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/800px-Lewis_Hamilton_2016_Malaysia_2.jpg",
    short: "7-кратный чемпион Формулы 1",
    bio: "Вырос в скромной семье, начал картинг в 8 лет. Стал первым темнокожим чемпионом Ф1 и побил рекорд Михаэля Шумахера по числу побед. Доказал: целеустремлённость важнее происхождения.",
    education: [
      { type: "Школа", name: "Cambridge Arts and Sciences (CATS), Кембридж — общеобразовательная программа" },
      { type: "Опыт", name: "Академия McLaren с 13 лет — профессиональная подготовка гонщика вместо классического вуза" },
    ],
    direction: "left",
  },
  {
    name: "Билли Айлиш",
    field: "Музыка",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Billie_Eilish_2019.png/800px-Billie_Eilish_2019.png",
    short: "Самый молодой автор песни к фильму о Бонде",
    bio: "Записала первый хит в 14 лет прямо в спальне брата. В 18 стала самым молодым артистом, выигравшим Grammy во всех четырёх главных номинациях за один вечер.",
    education: [
      { type: "Школа", name: "Домашнее обучение (Лос-Анджелес) — родители-актёры сами вели занятия, много времени уделяя творчеству" },
      { type: "Опыт", name: "Los Angeles Children's Chorus — хоровое пение с детства заложило музыкальную базу" },
      { type: "Опыт", name: "Самообучение вокалу и продюсированию совместно с братом Финнеасом" },
    ],
    direction: "top",
  },
  {
    name: "Снуп Догг",
    field: "Музыка и медиа",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Snoop_Dogg_-_Westfield_Sydney_%28cropped%29.jpg/800px-Snoop_Dogg_-_Westfield_Sydney_%28cropped%29.jpg",
    short: "Рэпер, медиамагнат и телеведущий Олимпиады",
    bio: "Вырос в Лонг-Биче в тяжёлых условиях. Через музыку создал медиаимперию, стал иконой поп-культуры и неожиданно — официальным репортёром NBC на Олимпиаде 2024.",
    education: [
      { type: "Школа", name: "Polytechnic High School, Лонг-Бич — футбол и музыка, дружил с Кобе Брайантом" },
      { type: "Опыт", name: "Самообразование в музыке: рэп, бит-мейкинг и бизнес — без профильного образования" },
    ],
    direction: "bottom",
  },
  {
    name: "Джонатан Айв",
    field: "Промышленный дизайн",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jonathan_Ive_2010.jpg/800px-Jonathan_Ive_2010.jpg",
    short: "Главный дизайнер iPhone, iMac и MacBook",
    bio: "Создал облик большинства культовых продуктов Apple — от iMac 1998 до iPhone. Его принцип: дизайн — это не про внешность, а про суть вещи.",
    education: [
      { type: "Школа", name: "Walton High School, Сток-он-Трент — увлекался черчением и промышленным дизайном" },
      { type: "Вуз", name: "Northumbria University, Ньюкасл — специализация: промышленный дизайн (BA), окончил с отличием, 1989" },
    ],
    direction: "right",
  },
  {
    name: "Павел Дуров",
    field: "IT и социальные сети",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/sixty/Pavel_Durov_on_stage_at_TechCrunch_Disrupt_SF_2015.jpg/800px-Pavel_Durov_on_stage_at_TechCrunch_Disrupt_SF_2015.jpg",
    short: "Основатель ВКонтакте и Telegram",
    bio: "Создал крупнейшую русскоязычную соцсеть ещё в студенчестве, а после конфликта с властями покинул Россию и построил Telegram — один из самых популярных мессенджеров в мире.",
    education: [
      { type: "Школа", name: "Академическая гимназия при СПбГУ — углублённое изучение математики, физики и иностранных языков" },
      { type: "Вуз", name: "Санкт-Петербургский государственный университет — филологический факультет, специализация: английская филология, 2006" },
    ],
    direction: "left",
  },
  {
    name: "Аркадий Волож",
    field: "IT и поиск",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Arkady_Volozh_-_Yandex.jpg/800px-Arkady_Volozh_-_Yandex.jpg",
    short: "Сооснователь Яндекса",
    bio: "Создал крупнейшую технологическую компанию России и построил поисковик, который конкурирует с Google на русскоязычном рынке. Верил в силу данных и алгоритмов задолго до эпохи больших данных.",
    education: [
      { type: "Школа", name: "Средняя школа в Алма-Ате — математический класс, участник олимпиад" },
      { type: "Вуз", name: "Институт нефти и газа им. Губкина, Москва — прикладная математика, 1986" },
    ],
    direction: "top",
  },
  {
    name: "Сергей Брин",
    field: "IT и поиск",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Sergey_Brin_Ted_2010.jpg/800px-Sergey_Brin_Ted_2010.jpg",
    short: "Сооснователь Google",
    bio: "Эмигрировал из СССР в 6 лет. В аспирантуре Стэнфорда вместе с Ларри Пейджем придумал алгоритм PageRank — основу Google. Сегодня Google обрабатывает более 8 миллиардов запросов в день.",
    education: [
      { type: "Школа", name: "Eleanor Roosevelt High School, Мэриленд — математика и информатика" },
      { type: "Вуз", name: "Университет Мэриленда — математика и информатика (BS), окончил в 19 лет с отличием" },
      { type: "Вуз", name: "Stanford University — аспирантура по computer science, бросил ради создания Google" },
    ],
    direction: "bottom",
  },
  {
    name: "Евгений Касперский",
    field: "Кибербезопасность",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Eugene_Kaspersky_2012.jpg/800px-Eugene_Kaspersky_2012.jpg",
    short: "Основатель Kaspersky Lab",
    bio: "Увлёкся вирусами ещё в эпоху дискет. Создал одну из крупнейших в мире компаний по кибербезопасности, которая защищает сотни миллионов людей и тысячи корпораций по всему миру.",
    education: [
      { type: "Школа", name: "Физико-математическая школа-интернат № 18 при МГУ — углублённая математика и физика" },
      { type: "Вуз", name: "Высшая краснознамённая школа КГБ СССР / Институт криптографии, связи и информатики — математика и криптография, 1987" },
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
      className="flex h-screen w-screen shrink-0 snap-start items-start px-6 pt-20 md:px-12 lg:px-16"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col pb-6">
        <div
          className={`mb-6 shrink-0 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Биографии
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Истории тех, кто вдохновляет</p>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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