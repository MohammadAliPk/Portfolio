export type Lang = "fa" | "en";

export const skillCards = {
  fa: [
    {
      num: "01",
      title: "زبان‌ها و پایه",
      body: "JavaScript (ES6+)، TypeScript، HTML5، CSS3",
    },
    {
      num: "02",
      title: "فریم‌ورک‌ها",
      body: "React، Next.js، PWA، SSR و SSG",
    },
    {
      num: "03",
      title: "استیت و دیتا",
      body: "React Query، Redux، RTK، Zustand، Axios، GraphQL، WebSocket",
    },
    {
      num: "04",
      title: "UI و استایل",
      body: "Tailwind، MUI، Ant Design، Styled Components، SASS، Bootstrap",
    },
    {
      num: "05",
      title: "مهارت‌های تکمیلی",
      body: "Three.js، React Three Fiber، Leaflet، React Leaflet، مصورسازی داده",
    },
    {
      num: "06",
      title: "زیرساخت و امنیت",
      body: "Git، Linux، Nginx، Docker، Cypress · OWASP و بهینه‌سازی عملکرد",
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
      title: "پلتفرم Todo فول‌استک با Next.js",
      desc: "مدیریت تسک با Next.js و MongoDB — احراز هویت امن، آپدیت بلادرنگ و SSR/SSG برای تأخیر کم.",
      live: "https://todo-app-two-mauve.vercel.app",
      github: "https://github.com/MohammadAliPk/Todo-App",
    },
    {
      title: "فروشگاه PWA",
      desc: "فروشگاه قابل نصب و آفلاین با سبد خرید، فیلتر و جست‌وجوی بلادرنگ.",
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
      title: "آزمون OWASP",
      desc: "قبولی در امتحان کلاس OWASP آکادمی ووریوکس — مبانی امنیت وب و تحلیل آسیب‌پذیری.",
      badge: "exam · passed",
      href: "https://voorivex.academy/certificate/alipk/owasp-exam",
      link: "مشاهده ←",
    },
    {
      slug: "guts-hunters",
      title: "Guts Hunters",
      desc: "دوره ۶ ماهه هانت آکادمی ووریوکس — متدولوژی هانت و مهارت‌های عملی تست نفوذ.",
      badge: "6 months · hunt",
      href: "https://voorivex.academy/certificate/alipk/guts-hunters",
      link: "مشاهده ←",
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
      ["skills", "مهارت‌ها"],
      ["work", "تجربه"],
      ["projects", "پروژه‌ها"],
      ["certs", "مدارک"],
      ["contact", "تماس"],
    ] as const,
    hire: "همکاری",
    eyebrow: "برنامه نویس فرانت اند . تهران",
    role: "کدی که منتشر می‌شود. رابطی که می‌ماند.",
    lead: "اپلیکیشن‌های وب مقیاس‌پذیر و رابط‌های کاربری دقیق با React و Next.js می‌سازم — معماری تمیز، عملکرد بالا و تجربه کاربری روان.",
    ctaWork: "مشاهده تجربه",
    ctaMail: "ایمیل بزن",
    aboutKicker: "profile.ts",
    aboutTitle: "برای پروداکت ساخته شده، برای سرعت بهینه.",
    aboutBody:
      "توسعه‌دهنده فرانت‌اند با بیش از ۴ سال تجربه در ساخت اپلیکیشن‌های مقیاس‌پذیر و رابط‌های کاربری با عملکرد بالا. مسلط به اکوسیستم React و Next.js، مدیریت استیت، یکپارچه‌سازی سیستم و بهینه‌سازی PWA — با تمرکز روی معماری قابل استفاده مجدد و نگهداری بلندمدت.",
    statYears: "سال تجربه",
    statCompanies: "شرکت",
    statEdu: "علوم کامپیوتر",
    skillsKicker: "skills/*",
    skillsTitle: "اسکرول کن؛ مهارت‌ها را ببین.",
    workKicker: "experience.log",
    workTitle: "جایی که کد زدم.",
    job1Title: "مهندس فرانت‌اند",
    job1Company: "گروه آزما",
    job1Date: "۱۴۰۲ – اکنون",
    job1Items: [
      "مانیتورینگ دیتابیس‌سنتر (EMS) با Next.js و PWA — نمای زنده ۳بعدی و ۲بعدی و دیتای بلادرنگ.",
      "رابط‌های پویا با RTK، WebSocket، MUI، گیج، چارت و جدول برای متریک‌های عملیاتی.",
      "کارت مجازی SNMP برای یکپارچگی با Zabbix و مدیریت دیسک برای جلوگیری از پر شدن فضای ذخیره‌سازی.",
      "نقشه تعاملی با React Leaflet و Leaflet Draw؛ احراز هویت با توکن refresh/access؛ دیپلوی روی Linux و Nginx.",
    ],
    job2Title: "توسعه‌دهنده فرانت‌اند",
    job2Company: "ساتکا",
    job2Date: "۱۴۰۱ – ۱۴۰۲",
    job2Items: [
      "فیچرهای مقیاس‌پذیر فرانت برای سامانه سرمایه‌گذاری مالی با تیم‌های چندتخصصی.",
      "بهینه‌سازی عملکرد، جریان داده و رندر برای تجربه امن سرمایه‌گذار.",
      "معماری کامپوننت تمیز برای گردش‌کارهای پیچیده تراکنش مالی.",
    ],
    projectsKicker: "projects/",
    projectsTitle: "نمونه کارها.",
    live: "دموی زنده",
    github: "گیت‌هاب",
    edu: "تحصیلات — کارشناسی علوم کامپیوتر، دانشگاه آزاد اسلامی واحد تهران مرکزی (۱۴۰۱ – اکنون)",
    certsKicker: "certs/",
    certsTitle: "گواهینامه‌ها.",
    contactKicker: "contact.sh",
    contactTitle: "بیایید چیزی دقیق بسازیم.",
    contactBody:
      "آماده همکاری برای نقش‌های فرانت‌اند و پروژه‌هایی حول React، Next.js، PWA و رابط‌های محصول‌محور.",
    email: "ایمیل",
    phone: "تلفن",
    social: "شبکه‌ها",
    footerRole: "تهران · مهندس فرانت‌اند",
  },
  en: {
    brandFirst: "Mohammad Ali",
    brandLast: "Salimian",
    nav: [
      ["about", "About"],
      ["skills", "Skills"],
      ["work", "Work"],
      ["projects", "Projects"],
      ["certs", "Certs"],
      ["contact", "Contact"],
    ] as const,
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
