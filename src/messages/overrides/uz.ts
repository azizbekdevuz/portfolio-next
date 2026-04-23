import type { LocalizedOverrides } from "./types";

export const uzOverrides: LocalizedOverrides = {
  site: {
    headlineRole: "Full-stack product muhandis",
    heroSummaryLines: [
      "Next.js mahsulotlari faqat UI emas — API, autentifikatsiya, real vaqt va deploy bitta yetkazish sifasida.",
      "Ko‘p tilli va RTL, ma’lumotga boy dashboardlar, e-commerce, identifikatsiya, FastAPI bilan AI oqimlari.",
    ],
    headlineFocus:
      "BFF chegaralari, sessiya va shartnomalar, produksiya chiqarish — TypeScript, Node, Python, Prisma/PostgreSQL oilasini amalda.",
    positioningParagraph:
      "Alohida servislar bitta mahsulotdek ishlashi kerak bo‘lgan joyda kuchliman. Stack ro‘yxatidan ko‘ra, ishlaydigan tizim muhim.",
    location: "Janubiy Koreya, Seul",
    availability: "Tanlangan rollar — to‘liq stavka yoki yirik shartnoma (ishga qabul va ruxsat qoidalariga muvofiq)",
    heroProofTags: [
      "E-commerce + admin",
      "Ko‘p tilli + RTL",
      "Real vaqt va telemetriya UI",
      "World ID / ishonch",
      "AI + FastAPI workflow",
    ],
  },
  bio: {
    build: {
      title: "Nima quraman",
      content:
        "Chegarali Next.js mahsulotlari: e-commerce, ko‘p tilli/RTL, real vaqt dashboardlar, AI va tekshiruv. Integratsiya (auth, API, sessiya, to‘lov, socket) qo‘shimcha emas, funksiya qismi.",
    },
    approach: {
      title: "Qanday ishlayman",
      content:
        "Yuklash, xato, ruxsat holatlarini ochiq qoldiraman; oqim, soket va deploy bo‘yicha qayta ko‘rib chiqiladigan bo‘laklarga bo‘laman.",
    },
    context: {
      title: "Kontekst",
      content:
        "Seulda yashayman. Sejong universiteti kompyuter injiniringi bakalavri (kutilayotgan tugash: 2026 dek). Texnik va mahsulot muhokamasi — ingliz tili.",
    },
  },
  journey: {
    j1: {
      date: "2025 yan – hozir",
      title: "Mustaqil mahsulot va platforma",
      subtitle: "asoschilik / full-stack",
      description:
        "Trainium, Rumi (integratsiya), Fishlinic, GitGuard Agent, ProofBoard kabi loyihalarda arxitekturadan deploy va iteratsiyagacha yetkazish.",
    },
    j2: {
      date: "2025 okt – hozir",
      title: "Sejong — tadqiqot lab. amaliyotchi",
      subtitle: "frontend + integratsiya",
      description:
        "Rumi AI: BFF, sessiya, ko‘p tilli/RTL, oqimli UX, backend bilan so‘rov-javob tekislash — bitta tajriba sifatida.",
    },
    j3: {
      date: "2025 dek – 2026 apr",
      title: "EBIT — AI trener (shartnoma)",
      subtitle: "model mashaqlar va sifat",
      description:
        "Repozitoriy asosidagi vazifalar, debug, verifier orqali to‘g‘rilik, saqlanadigan kod mezoniga mos texnik fikr.",
    },
    j4: {
      date: "Kutilayotgan tugash (2026.12)",
      title: "Sejong universiteti",
      subtitle: "bakalavr, kompyuter injiniringi (jarayon)",
      description:
        "Kapsaytoun (Fishlinic) va boshqa kurslar; tadqiqot va mahsulot yonma-yon ishlatilgan stacklar.",
    },
  },
  techCategories: {
    frontend: { title: "Frontend" },
    backend: { title: "Backend va ma’lumot" },
    languages: { title: "Tillar" },
    tools: { title: "Vositalar va ops" },
  },
  achievementCategories: {
    work: { title: "Tan olish va kuchli dalillar" },
  },
  projectsBySlug: {
    trainium: {
      summary: "E-commerce, admin, rollar, to‘lov va bildirishnomalar bitta mahsulot sifatida.",
      whyItMatters: "Bitta landing emas, operatsion va mijoz oqimlari birga aylanadigan kenglik.",
      description:
        "Ochiq vitrina, xodim/admin va mijoz hisoblari bitta navigatsiya va holat modelida bog‘langan kommersiya. Katalog, savat, to‘lov va operatsion yuzalar ko‘paysa ham izchil bo‘lishi; autentifikatsiya, to‘lov, provayder, real-time va i18n integratsiyasi “keyin qo‘shiladigan qatlam” emas, mahsulotning qismi sifatida o‘ylangan.",
      problem:
        "Funksiya va lokalayzlar o‘sganda ham do‘kon, admin va hisobning bir-biridan “yorilib ketmas” haqiqiy foydalanishga yaqin tizimni yig‘ish.",
      outcome:
        "Statik maket emas — haqiqiy to‘lov va bildirishnoma oqimlari qayerdadir ishlatadigan, izchil foydalanuvchi/operatsion tajriba yo‘nalishi.",
    },
    "rumi-ai": {
      summary: "EN/KO/FA (RTL), oqim, FastAPI/DB bilan BFF va sessiyani birlashtirish.",
      whyItMatters: "Chat pardasi ortidagi integratsiya va ishonchlilik — asosiy sarlavha.",
      description:
        "Iqtibos/RAG oqimida asosiy qiyinchilik kiritish maydoni emas, balki barcha lokal (RTL shart) bo‘yicha yagona tajriba, oqimli javoblar va Next.js ↔ FastAPI/SQLAlchemy o‘rtasida barqaror qo‘lda uzatish. API-kalit demosi emas, real ishlatiladigan ishonch, xato va sessiya oqimlari muhim.",
      problem:
        "Qiziqarli mantiqa web, API va modelga yoyilganda, ko‘p tilli (RTL shart) chat bitta mahsulot kabi sezilishini ta’minlash.",
      outcome:
        "Uzilmaydigan oqim, ochiqlangan xato/loading, backend bilan kelishgan navigatsiya va sessiya tajribasi.",
    },
    fishlinic: {
      summary: "Akvakultura/telemetriyaga yaqin, real vaqt va nazorat oqimlari bilan dashboard.",
      whyItMatters: "Ma’lumot tez o‘zgarganda ham tushunarli operator UI.",
      description:
        "TypeScript/Next.js dashboard telemetriyani real vaqtda ko‘rsatadi; feeder/kamera kabi sohadagi operatsion oqimlar mahsulot doirasida. Tez o‘zgaradigan signallarni o‘qiladigan ko‘rinish, boshqaruv va ma’lumot tomonda AI tahlil yo‘llari bilan bog‘lash ishning markazida.",
      problem:
        "Uskuna, xizmat va UI bir vaqtda harakatlanganda ham operator qanday signalni ko‘rishi va qaror qabul qilishi aniq bo‘lsin.",
      outcome:
        "Ko‘rsatkichlar o‘zgarayotgan muhitda nima bo‘layotganini tushunish, real vaqt va nazorat/tahlil aylanmasiga yaqin tajriba.",
    },
    patchpilot: {
      summary: "Xato kontekstini qadamlarga bo‘lib, test va patchga ulash (ochiq org repozitoriy).",
      whyItMatters: "Yagona generatsiyadan emas, bosqich va tekshiruvli avtomatlashtirishga yaqin yondashuv.",
    },
    gitguardian: {
      summary: "Git tiklash uchun CLI+veb, snapshot, reja va keyingi snapshot bilan tekshiruv.",
      whyItMatters: "Haddan xavfli amallar uchun ‘bosqich + tekshiruv’ muhitida ishonch.",
    },
    proofboard: {
      summary: "World ID va hamyon bilan, inson-ishtirokli Q&A (server tomoni tekshiruv va yozish intizomi).",
      whyItMatters: "Identifikatsiya va replay kabi cheklovlarda API va skema dizayni.",
    },
    "dr-niaraki-website": {
      summary: "DB va nashr/loyihalash oqimlari — tadqiqot profili; DOCX import va tahrir yo‘llari.",
      whyItMatters: "Bir martalik emas, uzoq muddatli tarkib tizimi.",
    },
    nestar: {
      summary: "NestJS + GraphQL + Mongo + JWT — qisqa backend namunasi.",
      whyItMatters: "Faqat frontdan keyin bo‘lgan modullar qanday yig‘ilganini ko‘rsatish.",
    },
  },
};
