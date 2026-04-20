import type { LocalizedOverrides } from "./types";

export const uzOverrides: LocalizedOverrides = {
  site: {
    headlineRole: "Mahsulot / full-stack muhandis",
    heroSummaryLines: [
      "Frontend og‘irlikli mahsulot muhandisi: UI, ma’lumot oqimi, autentifikatsiya va ishonchlilik bitta yetkazish sathida.",
      "Broshyura saytlar emas — ko‘p tilli, real vaqt va integratsiyali mahsulotlarni chiqarganman.",
    ],
    headlineFocus:
      "UI, ma’lumot oqimi, autentifikatsiya va ishonchlilik uchrashadigan joyda kuchli integratsiya instinkti bilan frontend-markazli yetkazish.",
    positioningParagraph:
      "Ko‘p tilli va real vaqt mahsulot sathlari, BFF uslubidagi integratsiya va alohida qurilgan servislarni yagona mahsulotdek his qoldirishda kuchliman. Lavozimni shishirmasdan, produksiyaga yo‘naltirilgan bajarilishni afzal ko‘raman.",
    location: "Janubiy Koreya, Seul",
    availability: "Tanlangan rollar — to‘liq stavka yoki yirik shartnoma",
    heroProofTags: [
      "Integratsiyali yetkazish",
      "Ko‘p tilli va RTL",
      "Real vaqt va ma’lumotga boy UI",
      "AI ish jarayoni tizimlari",
      "Produksiya bajarilishi",
    ],
  },
  bio: {
    build: {
      title: "Nima quraman",
      content:
        "Katta Next.js mahsulotlari — vitrina va admin, ko‘p tilli va RTL sathlar, dashboardlar va AI ish jarayoni UI; integratsiya, autentifikatsiya chegaralari va ishonchlilik tartibdan kam emas.",
    },
    approach: {
      title: "Qanday ishlayman",
      content:
        "Servislar orasidagi chiziqlarni berkitaman: shartnomalar, sessiya xatti-harakati, oqim va xato holatlari, deploy. Teatr o‘rniga halol doira va ko‘rib chiqiladigan o‘zgarishlar.",
    },
    context: {
      title: "Kontekst",
      content:
        "Seulda yashayman. Ingliz tilida vaqt mintaqalari bo‘ylab hamjihatlik qilishga moslashganman; mijozga yetkazish va mahsulot uslubidagi iteratsiya tajribasi bor.",
    },
  },
  journey: {
    j1: {
      date: "Yaqinda",
      title: "Full-stack mahsulot yetkazish",
      subtitle: "Next.js · TypeScript · API · deploy",
      description:
        "Marshrutlash va ma’lumot yuklash, formalar va autentifikatsiya oqimlari, integratsiyalar va Vercel kabi hostingga chiqarishgacha uchu-qirchiq egalik.",
    },
    j2: {
      date: "Yaqinda",
      title: "Motion bilan UI muhandisligi",
      subtitle: "Framer Motion · adaptiv tartib",
      description:
        "Marketing va ilova sathlarida nazoratli animatsiya — ierarxiyaga yordam, kontentni yashirmasdan.",
    },
  },
  techCategories: {
    frontend: { title: "Frontend" },
    backend: { title: "Backend va ma’lumot" },
    languages: { title: "Tillar" },
    tools: { title: "Vositalar va ops" },
  },
  achievementCategories: {
    work: { title: "Tanlangan yetkazish" },
  },
  projectsBySlug: {
    trainium: {
      summary:
        "Yirik vitrina va admin mahsuloti: ko‘p tilli UX, rollarga asoslangan oqimlar, hisob zonasi, to‘lov, bildirishnomalar.",
      whyItMatters:
        "Broshyura emas, haqiqiy mahsulot doirasi dalili — filtrlash, tafsilot, admin va boy integratsiyalar.",
    },
    "rumi-ai": {
      summary:
        "Ingliz, forscha (RTL) va koreys sathlari, oqimli javoblar, qayta olish va BFF uslubidagi backend bog‘lanishi.",
      whyItMatters:
        "Ko‘p tilli (RTL bilan), oqimli UI va Next.js–Python servislari orasidagi chiziqni yagona mahsulotdek yuritish.",
    },
    fishlinic: {
      summary:
        "Real vaqt suv sifati, ovqatlash va kamera boshqaruvi birlashtirilgan IoT akvarium boshqaruvi uchun full-stack dashboard.",
      whyItMatters:
        "Apparatga yaqin real vaqt UI va full-stack dashboard uchrashadigan integratsiyali mahsulot.",
    },
    patchpilot: {
      summary: "Tekshiruv va tasdiqlash markazli patch/release ish jarayoni UI.",
      whyItMatters: "Ma’lumot va huquqlar aralashgan operator oqimini oddiy forma bilan cheklamagan holat.",
    },
    gitguardian: {
      summary: "Git tiklash rejalarini taklif qiluvchi kross-platform agent, CLI va veb.",
      whyItMatters: "Xavfli amallarni darvozadan o‘tkazadigan tekshiruvga yo‘naltirilgan dev vosita.",
    },
    proofboard: {
      summary: "Real vaqt taxta va hamkorlik dalillarini bog‘laydigan mahsulot uslubidagi sath.",
      whyItMatters: "Real vaqt UI va hamkorlik domenini birga ushlagan loyiha.",
    },
    "dr-niaraki-website": {
      summary: "Tibbiyot mutaxassisi uchun ishonch va accessibility inobatidagi brend veb.",
      whyItMatters: "Professional xizmatga mos ohang va tuzilma bilan ochiq veb.",
    },
    nestar: {
      summary: "Ma’lumot va ish jarayoni bo‘lgan ichki/operatsion veb mahsulot.",
      whyItMatters: "Ichki foydalanuvchilar uchun amaliy UI va oqimlar.",
    },
  },
};
