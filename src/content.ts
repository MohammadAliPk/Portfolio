export type Lang = "fa" | "en";

export const skillCards = {
  fa: [
    {
      num: "01",
      title: "زبان‌ها",
      body: "JavaScript (ES6+)، TypeScript، HTML5، CSS3",
    },
    {
      num: "02",
      title: "فریم‌ورک",
      body: "React، Next.js، PWA، SSR و SSG",
    },
    {
      num: "03",
      title: "داده و state",
      body: "React Query، Redux، RTK، Zustand، Axios، GraphQL، WebSocket",
    },
    {
      num: "04",
      title: "ظاهر رابط",
      body: "Tailwind، MUI، Ant Design، Styled Components، SASS، Bootstrap",
    },
    {
      num: "05",
      title: "نقشه و سه‌بعدی",
      body: "Three.js، React Three Fiber، Leaflet، React Leaflet",
    },
    {
      num: "06",
      title: "استقرار و امنیت",
      body: "Git، Linux، Nginx، Docker، Cypress، OWASP",
    },
  ],
  en: [
    {
      num: "01",
      title: "Languages & Core",
      body: "JavaScript (ES6+), TypeScript, HTML5, CSS3",
    },
    {
      num: "02",
      title: "Frameworks",
      body: "React, Next.js, PWA, SSR & SSG",
    },
    {
      num: "03",
      title: "State & Data",
      body: "React Query, Redux, RTK, Zustand, Axios, GraphQL, WebSocket",
    },
    {
      num: "04",
      title: "UI Systems",
      body: "Tailwind, MUI, Ant Design, Styled Components, SASS, Bootstrap",
    },
    {
      num: "05",
      title: "Additional skills",
      body: "Three.js, React Three Fiber, Leaflet, React Leaflet, data visualization",
    },
    {
      num: "06",
      title: "Infra & Security",
      body: "Git, Linux, Nginx, Docker, Cypress · OWASP & performance",
    },
  ],
} as const;

export const social = {
  github: "https://github.com/MohammadAliPk",
  linkedin: "https://www.linkedin.com/in/mohammad-ali-salimian/",
  email: "mailto:aliparkour83@gmail.com",
} as const;

export const projects = {
  fa: [
    {
      title: "مدیریت کار با Next.js",
      desc: "ثبت و پیگیری کارها با Next.js و MongoDB؛ ورود کاربر، به‌روزرسانی وضعیت، و رندر سمت سرور.",
      live: "https://todo-app-two-mauve.vercel.app",
      github: "https://github.com/MohammadAliPk/Todo-App",
    },
    {
      title: "فروشگاه اینترنتی",
      desc: "فروشگاه قابل نصب روی موبایل، با سبد خرید، فیلتر و جست‌وجو. بخشی از صفحات بدون اینترنت هم باز می‌شود.",
      live: "https://shop-app-ochre.vercel.app",
      github: "https://github.com/MohammadAliPk/shop-app",
    },
  ],
  en: [
    {
      title: "Full-Stack Next.js Todo Platform",
      desc: "Next.js + MongoDB with secure auth, real-time status updates, and SSR/SSG for low latency.",
      live: "https://todo-app-two-mauve.vercel.app",
      github: "https://github.com/MohammadAliPk/Todo-App",
    },
    {
      title: "E-Commerce PWA Storefront",
      desc: "Installable offline-ready PWA with cart, filters, and real-time search.",
      live: "https://shop-app-ochre.vercel.app",
      github: "https://github.com/MohammadAliPk/shop-app",
    },
  ],
} as const;

export const certificates = {
  fa: [
    {
      slug: "owasp-exam",
      title: "امنیت وب، OWASP",
      desc: "گواهی دورهٔ OWASP آکادمی ووریوکس؛ مبانی امنیت وب و بررسی آسیب‌پذیری.",
      badge: "exam · passed",
      href: "https://voorivex.academy/certificate/alipk/owasp-exam",
      link: "مشاهده گواهی",
    },
    {
      slug: "guts-hunters",
      title: "دوره هانت",
      desc: "دورهٔ شش‌ماههٔ Hunt در ووریوکس؛ شکار آسیب‌پذیری و تست نفوذ عملی.",
      badge: "6 months · hunt",
      href: "https://voorivex.academy/certificate/alipk/guts-hunters",
      link: "مشاهده گواهی",
    },
  ],
  en: [
    {
      slug: "owasp-exam",
      title: "OWASP Exam",
      desc: "Passed the Voorivex Academy OWASP class exam — web security fundamentals and vulnerability analysis.",
      badge: "exam · passed",
      href: "https://voorivex.academy/certificate/alipk/owasp-exam",
      link: "verify →",
    },
    {
      slug: "guts-hunters",
      title: "Guts Hunters",
      desc: "Completed the 6-month Hunt program at Voorivex Academy — hunting methodology and practical pentest skills.",
      badge: "6 months · hunt",
      href: "https://voorivex.academy/certificate/alipk/guts-hunters",
      link: "verify →",
    },
  ],
} as const;

export const copy = {
  fa: {
    brandFirst: "محمد علی",
    brandLast: "سلیمیان",
    nav: [
      ["about", "درباره"],
      ["craft", "روش کار"],
      ["field", "سه‌بعدی"],
      ["skills", "مهارت‌ها"],
      ["work", "سوابق"],
      ["projects", "پروژه‌ها"],
      ["certs", "گواهی‌ها"],
      ["contact", "تماس"],
    ] as const,
    fieldKicker: "field.3d",
    fieldTitle: "سه‌بعدی را برای خود محصول می‌گذارم.",
    fieldBody:
      "نمای سه‌بعدی و نقشه را جایی استفاده می‌کنم که داده یا فضا را روشن‌تر کند؛ نه برای پر کردن صفحه.",
    castSteps: [
      {
        kicker: "01 Build",
        title: "اول ساختار، بعد جزئیات.",
        body: "رابط را به بخش‌های مشخص تقسیم می‌کنم تا بعداً هم بشود روی همان‌ها کار کرد، نه اینکه هر بار از نو نوشته شود.",
      },
      {
        kicker: "02 Motion",
        title: "حرکت فقط وقتی لازم باشد.",
        body: "انیمیشن را برای این می‌گذارم که کاربر بفهمد کجای صفحه است و چه چیزی عوض شده.",
      },
      {
        kicker: "03 Ship",
        title: "تا قبل از انتشار چک می‌شود.",
        body: "سرعت، رفتار در موبایل و جزئیات رابط را قبل از اینکه کار دست کاربر برسد مرور می‌کنم.",
      },
    ],
    hire: "تماس",
    eyebrow: "توسعه‌دهنده فرانت‌اند · تهران",
    role: "رابط محصول‌های واقعی را می‌سازم.",
    lead: "بیشتر با React و Next.js کار می‌کنم؛ از داشبورد عملیاتی و نقشه تا فروشگاه و اپلیکیشن‌هایی که باید سریع بمانند و بشود نگهداری‌شان کرد.",
    ctaWork: "سوابق کاری",
    ctaMail: "ایمیل",
    aboutKicker: "profile.ts",
    aboutTitle: "چهار سال است رابط محصول می‌سازم.",
    aboutBody:
      "کارم پیاده‌سازی رابط وب است. با React و Next.js، اتصال به API، مدیریت state و PWA آشنایم و ترجیح می‌دهم کامپوننت‌ها ساده بمانند تا تیم بعدی هم بتواند ادامه‌شان بدهد.",
    statYears: "سال سابقه",
    statCompanies: "شرکت",
    statEdu: "علوم کامپیوتر",
    skillsKicker: "skills/*",
    skillsTitle: "چیزهایی که با آن‌ها کار می‌کنم.",
    workKicker: "experience.log",
    workTitle: "سوابق کاری",
    job1Title: "مهندس فرانت‌اند",
    job1Company: "گروه آزما",
    job1Date: "۱۴۰۲ – اکنون",
    job1Items: [
      "سامانهٔ مانیتورینگ دیتاسنتر (EMS) با Next.js و PWA؛ نمای زندهٔ دوبعدی و سه‌بعدی.",
      "داشبورد وضعیت با RTK، WebSocket و MUI: نمودار، گیج و جدول.",
      "کارت مجازی SNMP برای اتصال به Zabbix و جلوگیری از پر شدن دیسک.",
      "نقشه با React Leaflet، ورود با access و refresh token، و استقرار روی Linux و Nginx.",
    ],
    job2Title: "توسعه‌دهنده فرانت‌اند",
    job2Company: "ساتکا",
    job2Date: "۱۴۰۱ – ۱۴۰۲",
    job2Items: [
      "توسعهٔ فرانت سامانهٔ سرمایه‌گذاری، همراه تیم محصول و بک‌اند.",
      "کم کردن تأخیر رندر و مرتب کردن جریان داده در بخش تراکنش‌ها.",
      "ساخت کامپوننت برای مسیرهایی که چند مرحله و چند حالت دارند.",
    ],
    projectsKicker: "projects/",
    projectsTitle: "پروژه‌ها",
    live: "نسخهٔ آنلاین",
    github: "گیت‌هاب",
    edu: "کارشناسی علوم کامپیوتر، دانشگاه آزاد واحد تهران مرکزی (۱۴۰۱ تا اکنون)",
    certsKicker: "certs/",
    certsTitle: "گواهی‌ها",
    contactKicker: "contact.sh",
    contactTitle: "برای همکاری در تماسم.",
    contactBody:
      "اگر به توسعه‌دهندهٔ فرانت‌اند برای محصولی با React یا Next.js نیاز دارید، می‌توانید ایمیل بزنید.",
    email: "ایمیل",
    phone: "تلفن",
    social: "شبکه‌ها",
    footerRole: "تهران · توسعه‌دهنده فرانت‌اند",
  },
  en: {
    brandFirst: "Mohammad Ali",
    brandLast: "Salimian",
    nav: [
      ["about", "About"],
      ["craft", "Craft"],
      ["field", "Depth"],
      ["skills", "Skills"],
      ["work", "Work"],
      ["projects", "Projects"],
      ["certs", "Certs"],
      ["contact", "Contact"],
    ] as const,
    fieldKicker: "field.3d",
    fieldTitle: "Depth for product, not décor.",
    fieldBody:
      "Layers, light, and 3D motion earn their place when they clarify the experience — not when they clutter the page.",
    castSteps: [
      {
        kicker: "01 Build",
        title: "From idea to component.",
        body: "I shape each UI piece like a reusable unit — typed, clean, ready to grow.",
      },
      {
        kicker: "02 Motion",
        title: "Motion with intent.",
        body: "Animation isn’t decoration; it guides attention, scroll rhythm, and product feel.",
      },
      {
        kicker: "03 Ship",
        title: "Code that lands.",
        body: "Performance, accessibility, and UI polish stay on the desk until release.",
      },
    ],
    hire: "Hire me",
    eyebrow: "front-end engineer · tehran",
    role: "Code that ships. UI that lasts.",
    lead: "I build scalable web apps and precise user interfaces with React and Next.js — clean architecture, sharp performance, smooth UX.",
    ctaWork: "View experience",
    ctaMail: "Email me",
    aboutKicker: "profile.ts",
    aboutTitle: "Built for product, tuned for speed.",
    aboutBody:
      "Front-End Developer with 4+ years building scalable applications and high-performance UIs. Deep in React and Next.js, state management, system integration, and PWA optimization — with a bias for reusable architecture and long-term maintainability.",
    statYears: "Years shipping",
    statCompanies: "Companies",
    statEdu: "Computer Science",
    skillsKicker: "skills/*",
    skillsTitle: "Scroll to explore skills.",
    workKicker: "experience.log",
    workTitle: "Where I’ve shipped.",
    job1Title: "Front End Engineer",
    job1Company: "Azma Group",
    job1Date: "2023 – Present",
    job1Items: [
      "EMS data-center monitoring with Next.js + PWA — live 3D & 2D views and real-time data.",
      "Dynamic UIs with RTK, WebSocket, MUI, gauges, charts, and tables for operational metrics.",
      "Virtual SNMP card for Zabbix; disk strategies to prevent storage overflows.",
      "Interactive maps with React Leaflet & Leaflet Draw; auth with refresh/access tokens; Linux + Nginx deploys.",
    ],
    job2Title: "Front End Developer",
    job2Company: "Satka",
    job2Date: "2022 – 2023",
    job2Items: [
      "Scalable front-end features for a financial investment platform with cross-functional teams.",
      "Performance, data flow, and rendering tuned for a secure investor experience.",
      "Clean component architecture for complex transaction workflows.",
    ],
    projectsKicker: "projects/",
    projectsTitle: "Selected work.",
    live: "Live Demo",
    github: "GitHub",
    edu: "Education — B.Sc. Computer Science, Islamic Azad University, Tehran Central Branch (2022 – Present)",
    certsKicker: "certs/",
    certsTitle: "Certificates.",
    contactKicker: "contact.sh",
    contactTitle: "Let’s build something sharp.",
    contactBody:
      "Open to front-end roles and collaborations around React, Next.js, PWAs, and product-focused interfaces.",
    email: "Email",
    phone: "Phone",
    social: "Social",
    footerRole: "Tehran · Front-End Engineer",
  },
} as const;
