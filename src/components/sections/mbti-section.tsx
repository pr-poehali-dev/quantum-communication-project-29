import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"
import { MagneticButton } from "@/components/magnetic-button"

// ─── MBTI ────────────────────────────────────────────────────────────────────
const MBTI_QUESTIONS = [
  { question: "Как ты восстанавливаешь энергию после долгого дня?", a: { label: "Иду к друзьям или на тусовку", dim: "E" }, b: { label: "Побуду один — почитаю, поиграю", dim: "I" } },
  { question: "Ты знакомишься с новым человеком — что ты делаешь?", a: { label: "Сам начинаю разговор, мне легко", dim: "E" }, b: { label: "Жду, пока он заговорит первым", dim: "I" } },
  { question: "Что тебе важнее в задании?", a: { label: "Конкретные факты и детали", dim: "S" }, b: { label: "Общая идея и скрытый смысл", dim: "N" } },
  { question: "Как ты лучше запоминаешь информацию?", a: { label: "Через примеры и практику", dim: "S" }, b: { label: "Через концепции и теорию", dim: "N" } },
  { question: "Как ты принимаешь решения?", a: { label: "Логикой — смотрю на факты и пользу", dim: "T" }, b: { label: "Чувствами — думаю о людях и отношениях", dim: "F" } },
  { question: "Тебя попросили оценить работу друга. Она плохая. Что скажешь?", a: { label: "Честно скажу, что не так", dim: "T" }, b: { label: "Сначала похвалю, чтобы не обидеть", dim: "F" } },
  { question: "Как ты планируешь свои дела?", a: { label: "Составляю список и следую ему", dim: "J" }, b: { label: "Действую по ситуации, планы мешают", dim: "P" } },
  { question: "Дедлайн завтра. Ты...", a: { label: "Давно всё сдал — не люблю ждать", dim: "J" }, b: { label: "Делаю в последний момент — так лучше", dim: "P" } },
  { question: "На переменке ты скорее...", a: { label: "В центре компании, шучу и общаюсь", dim: "E" }, b: { label: "В сторонке или с одним-двумя друзьями", dim: "I" } },
  { question: "Что тебя больше привлекает в будущей работе?", a: { label: "Чёткий результат, понятная задача", dim: "S" }, b: { label: "Возможность изобретать и экспериментировать", dim: "N" } },
  { question: "В споре ты чаще думаешь:", a: { label: "Кто прав по сути", dim: "T" }, b: { label: "Как бы никого не задеть", dim: "F" } },
  { question: "Твоя комната скорее...", a: { label: "Всё на своих местах, порядок", dim: "J" }, b: { label: "Творческий хаос — я знаю, где что", dim: "P" } },
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
  return `${(scores["E"] || 0) >= (scores["I"] || 0) ? "E" : "I"}${(scores["S"] || 0) >= (scores["N"] || 0) ? "S" : "N"}${(scores["T"] || 0) >= (scores["F"] || 0) ? "T" : "F"}${(scores["J"] || 0) >= (scores["P"] || 0) ? "J" : "P"}`
}

// ─── ХОЛЛАНД ─────────────────────────────────────────────────────────────────
const HOLLAND_QUESTIONS = [
  { question: "Что тебе нравится делать больше всего?", a: { label: "Работать руками: чинить, строить, собирать", dim: "R" }, b: { label: "Думать, анализировать, решать задачи", dim: "I" } },
  { question: "Какой досуг тебе ближе?", a: { label: "Рисовать, писать, играть музыку", dim: "A" }, b: { label: "Общаться, помогать, организовывать людей", dim: "S" } },
  { question: "Что тебе легче?", a: { label: "Убеждать и вести за собой", dim: "E" }, b: { label: "Работать с данными, документами, числами", dim: "C" } },
  { question: "Тебе предлагают проект. Какой выберешь?", a: { label: "Сделать что-то своими руками или настроить технику", dim: "R" }, b: { label: "Придумать идею, создать что-то новое", dim: "A" } },
  { question: "Каким ты видишь идеальное рабочее место?", a: { label: "Лаборатория или кабинет для исследований", dim: "I" }, b: { label: "Там, где много людей и живого общения", dim: "S" } },
  { question: "Что тебя мотивирует?", a: { label: "Победить в переговорах или продать идею", dim: "E" }, b: { label: "Всё упорядочить, систематизировать", dim: "C" } },
  { question: "В команде ты чаще...", a: { label: "Берёшь инструменты и делаешь", dim: "R" }, b: { label: "Генерируешь нестандартные идеи", dim: "A" } },
  { question: "Что тебе интересно читать?", a: { label: "Научные статьи, исследования, факты", dim: "I" }, b: { label: "Истории о людях, психология, социология", dim: "S" } },
  { question: "Какая роль тебе ближе?", a: { label: "Лидер, предприниматель, организатор", dim: "E" }, b: { label: "Аналитик, бухгалтер, администратор", dim: "C" } },
  { question: "Твоя суперсила:", a: { label: "Точность, аккуратность, следование правилам", dim: "C" }, b: { label: "Физическая сила, координация, техническое мышление", dim: "R" } },
]

const HOLLAND_TYPES: Record<string, { title: string; icon: string; desc: string; jobs: string[] }> = {
  R: { title: "Реалистичный", icon: "Wrench", desc: "Тебе нравится работать руками, с техникой и природой. Ты практичен и конкретен в действиях.", jobs: ["Инженер", "Механик", "Агроном", "Пилот", "Строитель"] },
  I: { title: "Исследовательский", icon: "Microscope", desc: "Ты любишь думать, анализировать и разбираться в сложных вещах. Наука — твоя стихия.", jobs: ["Учёный", "Врач", "Data Scientist", "Программист", "Математик"] },
  A: { title: "Артистический", icon: "Palette", desc: "Ты творческий и независимый. Хочешь выражать себя и создавать что-то новое и красивое.", jobs: ["Дизайнер", "Писатель", "Музыкант", "Актёр", "Архитектор"] },
  S: { title: "Социальный", icon: "Users", desc: "Ты живёшь людьми. Умеешь слушать, помогать и находить общий язык с кем угодно.", jobs: ["Психолог", "Учитель", "HR", "Социальный работник", "Врач"] },
  E: { title: "Предприимчивый", icon: "TrendingUp", desc: "Ты прирождённый лидер и переговорщик. Умеешь убеждать и добиваться результата.", jobs: ["Предприниматель", "Менеджер", "Маркетолог", "Юрист", "Политик"] },
  C: { title: "Конвенциональный", icon: "ClipboardList", desc: "Ты ценишь порядок, точность и чёткие правила. Тебе комфортно в структурированной среде.", jobs: ["Бухгалтер", "Аналитик", "Администратор", "Финансист", "Логист"] },
}

// ─── ЯКОРЯ ШЕЙНА ─────────────────────────────────────────────────────────────
const SCHEIN_QUESTIONS = [
  { question: "Что для тебя важнее всего в работе?", a: { label: "Стать настоящим экспертом в своём деле", dim: "TF" }, b: { label: "Управлять людьми и принимать решения", dim: "GM" } },
  { question: "Ты скорее выберёшь:", a: { label: "Стабильность и предсказуемость", dim: "SE" }, b: { label: "Запустить свой бизнес или проект", dim: "EC" } },
  { question: "Что тебе важно?", a: { label: "Свобода — делать по-своему, без чужих правил", dim: "AU" }, b: { label: "Чувствовать, что помогаю людям или обществу", dim: "SV" } },
  { question: "Что тебя больше пугает?", a: { label: "Потерять работу или стабильный доход", dim: "SE" }, b: { label: "Скучная рутинная работа без вызовов", dim: "CH" } },
  { question: "Лучшая награда за работу — это:", a: { label: "Признание как лучшего специалиста в области", dim: "TF" }, b: { label: "Должность с реальной властью и влиянием", dim: "GM" } },
  { question: "Ты скорее:", a: { label: "Создашь что-то своё с нуля", dim: "EC" }, b: { label: "Найдёшь баланс между работой и жизнью", dim: "LS" } },
  { question: "Тебе важно, чтобы работа:", a: { label: "Давала ощущение реального вклада в мир", dim: "SV" }, b: { label: "Бросала тебе вызов и не давала скучать", dim: "CH" } },
  { question: "В работе тебе важнее:", a: { label: "Работать там, где тебя никуда не перекидывают", dim: "SE" }, b: { label: "Делать то, что сам считаешь нужным", dim: "AU" } },
  { question: "Ты хочешь в первую очередь:", a: { label: "Расти как профессионал в узкой теме", dim: "TF" }, b: { label: "Интегрировать работу и личную жизнь", dim: "LS" } },
  { question: "Что для тебя успех?", a: { label: "Построить своё дело или продукт", dim: "EC" }, b: { label: "Побеждать сложные задачи, которые других ставят в тупик", dim: "CH" } },
]

const SCHEIN_TYPES: Record<string, { title: string; icon: string; desc: string; jobs: string[] }> = {
  TF: { title: "Профессиональная компетентность", icon: "Award", desc: "Твой главный мотив — стать настоящим мастером своего дела. Ты ценишь глубину знаний и экспертизу.", jobs: ["Учёный", "Врач-специалист", "IT-архитектор", "Юрист", "Шеф-повар"] },
  GM: { title: "Общий менеджмент", icon: "Crown", desc: "Ты хочешь управлять, принимать решения и нести ответственность за результат компании.", jobs: ["Генеральный директор", "Топ-менеджер", "Директор направления", "Предприниматель"] },
  AU: { title: "Автономия и независимость", icon: "Wind", desc: "Тебе важна свобода: делать по-своему, без лишних ограничений и бюрократии.", jobs: ["Фрилансер", "Предприниматель", "Консультант", "Писатель", "Исследователь"] },
  SE: { title: "Безопасность и стабильность", icon: "Shield", desc: "Ты ценишь надёжность, предсказуемость и уверенность в завтрашнем дне.", jobs: ["Государственный служащий", "Бухгалтер", "Военный", "Банкир", "Учитель"] },
  EC: { title: "Предпринимательство", icon: "Rocket", desc: "Ты хочешь создавать что-то своё. Риск тебя не пугает — он тебя заряжает.", jobs: ["Основатель стартапа", "Инвестор", "Продукт-менеджер", "Инноватор"] },
  SV: { title: "Служение и причастность", icon: "Heart", desc: "Для тебя работа должна иметь смысл. Ты хочешь менять мир к лучшему.", jobs: ["Врач", "Социальный работник", "Эко-активист", "НКО-менеджер", "Педагог"] },
  CH: { title: "Вызов и преодоление", icon: "Zap", desc: "Ты живёшь ради сложных задач. Скука для тебя хуже любой неудачи.", jobs: ["Предприниматель", "Спасатель", "Военный лётчик", "Хирург", "Спортсмен"] },
  LS: { title: "Интеграция стилей жизни", icon: "Scale", desc: "Работа важна, но не ценой жизни. Тебе нужен баланс между карьерой, семьёй и увлечениями.", jobs: ["Удалённый специалист", "Педагог", "Консультант", "Дизайнер", "HR-менеджер"] },
}

// ─── ТЕСТЫ CONFIG ─────────────────────────────────────────────────────────────
const TESTS = [
  {
    id: "mbti",
    title: "MBTI",
    subtitle: "Тип личности",
    icon: "Brain",
    desc: "Определи один из 16 типов личности по системе Майерс-Бриггс — как ты думаешь, общаешься и принимаешь решения.",
    duration: "12 вопросов · ~3 мин",
  },
  {
    id: "holland",
    title: "Опросник Холланда",
    subtitle: "Профессиональный тип",
    icon: "Compass",
    desc: "Методика Дж. Холланда определяет твой профессиональный тип из 6 возможных и показывает, в какой среде тебе комфортно работать.",
    duration: "10 вопросов · ~2 мин",
  },
  {
    id: "schein",
    title: "Якоря карьеры Шейна",
    subtitle: "Карьерные ценности",
    icon: "Anchor",
    desc: "Методика Эдгара Шейна раскрывает твои главные карьерные ценности — что ты никогда не готов жертвовать ради работы.",
    duration: "10 вопросов · ~2 мин",
  },
]

// ─── МАППИНГ: результат теста → отрасли в разделе Профессии ─────────────────
const RESULT_TO_INDUSTRIES: Record<string, { tab: "popular" | "alpha"; groups: string[] }> = {
  // MBTI
  INTJ: { tab: "popular", groups: ["AI и данные", "IT и разработка", "Финансы и право"] },
  INTP: { tab: "popular", groups: ["AI и данные", "IT и разработка", "Медицина и биотех"] },
  ENTJ: { tab: "popular", groups: ["Управление и бизнес", "Финансы и право"] },
  ENTP: { tab: "popular", groups: ["Управление и бизнес", "Маркетинг и продажи"] },
  INFJ: { tab: "popular", groups: ["Образование", "Медицина и биотех"] },
  INFP: { tab: "popular", groups: ["Дизайн и медиа", "Образование"] },
  ENFJ: { tab: "popular", groups: ["Управление и бизнес", "Образование"] },
  ENFP: { tab: "popular", groups: ["Дизайн и медиа", "Маркетинг и продажи"] },
  ISTJ: { tab: "popular", groups: ["IT и разработка", "Финансы и право"] },
  ISFJ: { tab: "popular", groups: ["Медицина и биотех", "Образование"] },
  ESTJ: { tab: "popular", groups: ["Управление и бизнес", "Финансы и право"] },
  ESFJ: { tab: "popular", groups: ["Маркетинг и продажи", "Образование"] },
  ISTP: { tab: "alpha", groups: ["Робототехника и IoT", "Космос и транспорт"] },
  ISFP: { tab: "popular", groups: ["Дизайн и медиа"] },
  ESTP: { tab: "popular", groups: ["Маркетинг и продажи", "Финансы и право"] },
  ESFP: { tab: "popular", groups: ["Дизайн и медиа", "Маркетинг и продажи"] },
  // Holland
  R: { tab: "alpha", groups: ["Робототехника и IoT", "Космос и транспорт"] },
  I: { tab: "popular", groups: ["AI и данные", "Медицина и биотех"] },
  A: { tab: "popular", groups: ["Дизайн и медиа"] },
  S: { tab: "popular", groups: ["Образование", "Медицина и биотех"] },
  E: { tab: "popular", groups: ["Управление и бизнес", "Маркетинг и продажи"] },
  C: { tab: "popular", groups: ["Финансы и право", "IT и разработка"] },
  // Schein
  TF: { tab: "popular", groups: ["AI и данные", "Медицина и биотех"] },
  GM: { tab: "popular", groups: ["Управление и бизнес"] },
  AU: { tab: "popular", groups: ["IT и разработка", "Дизайн и медиа"] },
  SE: { tab: "popular", groups: ["Финансы и право", "Управление и бизнес"] },
  EC: { tab: "alpha", groups: ["AI и нейротех", "Метавселенная и XR"] },
  SV: { tab: "popular", groups: ["Медицина и биотех", "Экология и наука"] },
  CH: { tab: "alpha", groups: ["Биоинженерия", "Космос и транспорт"] },
  LS: { tab: "popular", groups: ["Образование", "Дизайн и медиа"] },
}

// ─── КОМПОНЕНТ ────────────────────────────────────────────────────────────────
type TestId = "mbti" | "holland" | "schein"

export function MbtiSection({ onShowProfessions }: { onShowProfessions?: (tab: "popular" | "alpha", groups: string[]) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeTest, setActiveTest] = useState<TestId | null>(null)
  const [step, setStep] = useState<"intro" | number | "result">("intro")
  const [scores, setScores] = useState<Record<string, number>>({})

  const questions = activeTest === "mbti" ? MBTI_QUESTIONS : activeTest === "holland" ? HOLLAND_QUESTIONS : SCHEIN_QUESTIONS

  const handleAnswer = (dim: string) => {
    const newScores = { ...scores, [dim]: (scores[dim] || 0) + 1 }
    setScores(newScores)
    const nextStep = typeof step === "number" ? step + 1 : 1
    if (nextStep >= questions.length) setStep("result")
    else setStep(nextStep)
  }

  const reset = () => {
    setActiveTest(null)
    setStep("intro")
    setScores({})
  }

  const startTest = (id: TestId) => {
    setActiveTest(id)
    setStep(0)
    setScores({})
  }

  const getResult = () => {
    if (activeTest === "mbti") {
      const type = getMbtiType(scores)
      return { type, ...( MBTI_TYPES[type] || MBTI_TYPES["ENFP"]) }
    }
    if (activeTest === "holland" || activeTest === "schein") {
      const types = activeTest === "holland" ? HOLLAND_TYPES : SCHEIN_TYPES
      const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || Object.keys(types)[0]
      return { type: top, ...types[top] }
    }
    return null
  }

  const currentIdx = typeof step === "number" ? step : 0
  const result = step === "result" ? getResult() : null

  return (
    <section
      ref={ref}
      className="flex w-screen shrink-0 snap-start items-start px-6 pt-24 md:px-12 lg:px-16"
      style={{ height: "100dvh" }}
    >
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col pb-6">
        <div
          className={`mb-6 shrink-0 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Тесты
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Узнай себя лучше</p>
        </div>

        <div
          className={`flex-1 overflow-y-auto transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms", scrollbarWidth: "none" }}
        >
          {/* Выбор теста */}
          {!activeTest && (
            <div className="space-y-3 animate-in fade-in duration-500">
              {TESTS.map((test) => (
                <button
                  key={test.id}
                  onClick={() => startTest(test.id as TestId)}
                  className="group flex w-full items-start gap-5 rounded-2xl border border-foreground/15 bg-foreground/10 p-6 text-left backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/15 hover:scale-[1.01]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/15 transition-all duration-300 group-hover:scale-110">
                    <Icon name={test.icon} size={22} className="text-foreground/80" fallback="HelpCircle" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-baseline gap-3">
                      <h3 className="font-sans text-lg font-light text-foreground">{test.title}</h3>
                      <span className="font-mono text-xs text-foreground/40">{test.subtitle}</span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-foreground/55">{test.desc}</p>
                    <span className="font-mono text-xs text-foreground/35">{test.duration}</span>
                  </div>
                  <Icon name="ChevronRight" size={18} className="mt-1 shrink-0 text-foreground/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/60" />
                </button>
              ))}
            </div>
          )}

          {/* Вопросы */}
          {activeTest && typeof step === "number" && step < questions.length && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-5 flex items-center gap-4">
                <button onClick={reset} className="font-mono text-xs text-foreground/40 hover:text-foreground/70 transition-colors">← Назад</button>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/15">
                  <div className="h-full rounded-full bg-foreground/70 transition-all duration-500" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
                </div>
                <p className="font-mono text-xs text-foreground/40">{currentIdx + 1}/{questions.length}</p>
              </div>
              <h3 className="mb-6 font-sans text-2xl font-light leading-snug text-foreground md:text-3xl">
                {questions[currentIdx].question}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[questions[currentIdx].a, questions[currentIdx].b].map((opt) => (
                  <button
                    key={opt.dim}
                    onClick={() => handleAnswer(opt.dim)}
                    className="group rounded-xl border border-foreground/20 bg-foreground/10 p-5 text-left backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-foreground/40 hover:bg-foreground/20"
                  >
                    <span className="text-base leading-snug text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Результат */}
          {step === "result" && result && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="rounded-2xl border border-foreground/20 bg-foreground/10 p-6 backdrop-blur-md md:p-8">
                <div className="mb-5 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-foreground/20">
                    <Icon name={result.icon} className="text-foreground" size={30} fallback="Star" />
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-foreground/50">
                      {activeTest === "mbti" ? "Твой тип личности" : activeTest === "holland" ? "Твой профессиональный тип" : "Твой карьерный якорь"}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-sans text-3xl font-light tracking-widest text-foreground md:text-4xl">{result.type}</span>
                      <span className="font-sans text-xl font-light text-foreground/70">{result.title}</span>
                    </div>
                  </div>
                </div>
                <p className="mb-5 leading-relaxed text-foreground/80">{result.desc}</p>
                <div className="mb-6">
                  <p className="mb-3 font-mono text-xs text-foreground/50">Подходящие профессии</p>
                  <div className="flex flex-wrap gap-2">
                    {result.jobs.map((job) => (
                      <span key={job} className="rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 font-mono text-xs text-foreground/80">{job}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {result && RESULT_TO_INDUSTRIES[result.type] && onShowProfessions && (
                    <button
                      onClick={() => {
                        const mapping = RESULT_TO_INDUSTRIES[result.type]
                        onShowProfessions(mapping.tab, mapping.groups)
                      }}
                      className="flex items-center gap-2 rounded-xl bg-foreground/15 px-5 py-2.5 font-mono text-xs text-foreground transition-all duration-300 hover:bg-foreground/25 hover:scale-[1.03]"
                    >
                      <Icon name="ArrowRight" size={14} />
                      Смотреть подходящие профессии
                    </button>
                  )}
                  <button onClick={reset} className="font-mono text-xs text-foreground/40 hover:text-foreground/70 transition-colors">← Другой тест</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}