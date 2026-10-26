import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type Lang,
  certificates,
  copy,
  projects,
  skillCards,
  social,
} from "./content";
import { CodeCast } from "./CodeCast";
import { MetalName } from "./MetalName";
import { SpaceField } from "./SpaceField";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

type Theme = "dark" | "light";

const TICKER = [
  "TypeScript",
  "React",
  "Next.js",
  "PWA",
  "RTK",
  "Tailwind",
  "MUI",
  "WebSocket",
  "Leaflet",
  "GraphQL",
  "Docker",
  "Nginx",
  "Cypress",
];

const HERO_CODE = [
  "const profile = {",
  '  name: "Mohammad Ali Salimian",',
  '  role: "Front-End Engineer",',
  '  stack: ["React", "Next.js", "TypeScript"],',
  '  focus: "scalable UI + performance",',
  "};",
  "",
  "// shipping clean interfaces",
  "export default profile;",
].join("\n");

function readLang(): Lang {
  const saved = localStorage.getItem("mas-lang");
  return saved === "en" || saved === "fa" ? saved : "en";
}

function readTheme(): Theme {
  const saved = localStorage.getItem("mas-theme");
  return saved === "light" || saved === "dark" ? saved : "dark";
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [navOn, setNavOn] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [motion, setMotion] = useState(true);

  const t = copy[lang];
  const skills = skillCards[lang];
  const projectList = projects[lang];
  const certList = certificates[lang];

  useEffect(() => {
    setLang(readLang());
    setTheme(readTheme());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Keep html dir=ltr so ScrollTrigger pin/scrub math stays correct.
    // Visual RTL lives on .page (see JSX).
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
    document.documentElement.dataset.lang = lang;
    localStorage.setItem("mas-lang", lang);
    document.title =
      lang === "fa"
        ? "محمد علی سلیمیان — مهندس فرانت‌اند"
        : "Mohammad Ali Salimian — Front-End Engineer";

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("mas-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
  }, [motion]);

  useEffect(() => {
    const onScroll = () => setNavOn(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce =
      !motion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          scrub: 0.25,
          start: "top top",
          end: "bottom bottom",
          trigger: document.documentElement,
        },
      });

      if (reduce) {
        gsap.set(".will-fade, .hero__name, .hero__panel, .hero__glow", {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
        return;
      }

      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTl
        .from(".hero__glow", { scale: 0.5, opacity: 0, duration: 1.4 }, 0)
        .from(".hero__panel", { y: 60, opacity: 0, duration: 1.1 }, 0.1)
        .from(".hero__eyebrow", { y: 16, opacity: 0, duration: 0.65 }, 0.15)
        .from(".hero__name", { y: 28, opacity: 0, duration: 0.9 }, 0.22)
        .from(
          ".hero__role, .hero__lead, .hero__actions, .hero__chips",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.07 },
          0.4,
        );

      gsap.to(".hero__panel", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero__glow", {
        yPercent: -30,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tiltEl = document.querySelector(
        ".hero__panel-tilt",
      ) as HTMLElement | null;
      const hero = document.querySelector(".hero") as HTMLElement | null;
      if (tiltEl && hero) {
        let mx = 0;
        let my = 0;
        let pending = false;
        const flush = () => {
          pending = false;
          tiltEl.style.transform = `perspective(900px) rotateY(${mx}deg) rotateX(${my}deg)`;
        };
        const onMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          mx = ((e.clientX - r.left) / r.width - 0.5) * 10;
          my = ((e.clientY - r.top) / r.height - 0.5) * -8;
          if (!pending) {
            pending = true;
            requestAnimationFrame(flush);
          }
        };
        const onLeave = () => {
          mx = 0;
          my = 0;
          if (!pending) {
            pending = true;
            requestAnimationFrame(flush);
          }
        };
        hero.addEventListener("mousemove", onMove, { passive: true });
        hero.addEventListener("mouseleave", onLeave);
      }

      const track = document.querySelector(".ticker__track") as HTMLElement | null;
      if (track) {
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: ".ticker",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            loop.timeScale(1 + Math.abs(self.getVelocity()) / 800);
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".will-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.65,
            },
          },
        );
      });

      gsap.from(".stat strong", {
        scale: 0.6,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".stats",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const rail = document.querySelector(".skills-rail") as HTMLElement | null;
      const pin = document.querySelector(".skills-pin") as HTMLElement | null;
      const skillsSticky = document.querySelector(
        ".skills-pin__sticky",
      ) as HTMLElement | null;
      if (rail && pin && skillsSticky) {
        gsap.set(skillsSticky, { autoAlpha: 1, y: 0, clearProps: "visibility" });
        gsap.set(rail.querySelectorAll(".skill-card"), {
          autoAlpha: 1,
          y: 0,
          clearProps: "visibility,transform",
        });

        // Isolate from html[dir=rtl] so translateX math stays LTR-correct
        const getDistance = () =>
          Math.max(0, rail.scrollWidth - window.innerWidth + 64);

        gsap.fromTo(
          rail,
          { x: 0 },
          {
            x: () => -getDistance(),
            ease: "none",
            force3D: true,
            immediateRender: false,
            scrollTrigger: {
              trigger: pin,
              pin: true,
              pinSpacing: true,
              scrub: true,
              start: "top top",
              end: () => `+=${getDistance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 0,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".job").forEach((job, i) => {
        gsap.from(job, {
          opacity: 0,
          x: lang === "fa" ? 36 : -36,
          duration: 0.9,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: job,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
        const bar = project.querySelector(".project__bar");
        gsap.from(project.querySelectorAll(".project__idx, h3, p, .project__links"), {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        if (bar) {
          gsap.to(bar, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top 75%",
              end: "bottom 55%",
              scrub: true,
            },
          });
        }
      });

      const certEls = gsap.utils.toArray<HTMLElement>(".cert");
      if (certEls.length) {
        gsap.from(certEls, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".certs",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.from(".contact", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, rootRef);

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    requestAnimationFrame(refresh);
    const later = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(later);
      ctx.revert();
    };
  }, [lang, motion]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={rootRef}>
      <div className="atmosphere" aria-hidden />
      <div className="progress" ref={progressRef} />
      <div className="noise" aria-hidden />

      <div className="page" dir={lang === "fa" ? "rtl" : "ltr"}>
      <header className={`nav ${navOn ? "is-scrolled" : ""}`}>
        <div className="nav__inner">
          <a
            className="nav__brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
          >
            {t.brandFirst} <span>{t.brandLast}</span>
          </a>
          <ul className="nav__links">
            {t.nav.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__controls">
            <button
              type="button"
              className="nav__switch"
              onClick={() => setLang((v) => (v === "fa" ? "en" : "fa"))}
              aria-label="Toggle language"
              title={lang === "fa" ? "English" : "فارسی"}
            >
              {lang === "fa" ? "EN" : "FA"}
            </button>
            <button
              type="button"
              className="nav__switch"
              onClick={() => setTheme((v) => (v === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Light" : "Dark"}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <a className="nav__cta" href={social.email}>
              {t.hire}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero__glow" aria-hidden />
          <div className="hero__content">
            <p className="hero__eyebrow">{t.eyebrow}</p>
            <MetalName
              line1={t.brandFirst}
              line2={t.brandLast}
              motion={motion}
              rtl={lang === "fa"}
            />
            <p className="hero__role">{t.role}</p>
            <p className="hero__lead">{t.lead}</p>
            <div className="hero__actions">
              <a
                className="btn btn--fill"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  go("work");
                }}
              >
                {t.ctaWork}
              </a>
              <a className="btn btn--line" href={social.email}>
                {t.ctaMail}
              </a>
            </div>
            <div className="hero__chips">
              <span>
                exp=<strong>4y+</strong>
              </span>
              <span>
                stack=<strong>Next · React · TS</strong>
              </span>
              <span>
                status=<strong>open</strong>
              </span>
            </div>
          </div>
          <aside className="hero__panel" aria-hidden>
            <div className="hero__panel-tilt">
              <div className="hero__panel-bar">
                <i />
                <i />
                <i />
                <span>engineer.ts</span>
              </div>
              <pre className="hero__panel-code">{HERO_CODE}</pre>
              <div className="hero__panel-melt" />
            </div>
          </aside>
        </section>

        <div className="ticker" aria-hidden>
          <div className="ticker__track">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span className="ticker__item" key={`${item}-${i}`}>
                {item} <span className="ticker__dot">●</span>
              </span>
            ))}
          </div>
        </div>

        <section className="section" id="about">
          <div className="wrap about-grid">
            <div className="section__head will-fade">
              <p className="kicker">{t.aboutKicker}</p>
              <h2 className="heading">{t.aboutTitle}</h2>
            </div>
            <div>
              <p className="copy will-fade">{t.aboutBody}</p>
              <div className="stats">
                <div className="stat">
                  <strong>4+</strong>
                  <span>{t.statYears}</span>
                </div>
                <div className="stat">
                  <strong>2</strong>
                  <span>{t.statCompanies}</span>
                </div>
                <div className="stat">
                  <strong>B.Sc</strong>
                  <span>{t.statEdu}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CodeCast steps={t.castSteps} motion={motion} />

        <SpaceField
          kicker={t.fieldKicker}
          title={t.fieldTitle}
          body={t.fieldBody}
          motion={motion}
        />

        <section className="skills-pin" id="skills">
          <div className="skills-pin__sticky">
            <div className="wrap section__head skills-pin__head">
              <p className="kicker">{t.skillsKicker}</p>
              <h2 className="heading">{t.skillsTitle}</h2>
            </div>
            <div
              className="skills-rail"
              style={{
                paddingInline: "max(1.25rem, calc((100vw - 960px) / 2))",
              }}
            >
              {skills.map((card) => (
                <article className="skill-card" key={card.num}>
                  <div className="skill-card__top">
                    <i />
                    <i />
                    <i />
                    <span>module_{card.num}.ts</span>
                  </div>
                  <div className="skill-card__body">
                    <div>
                      <div className="skill-card__num">export const</div>
                      <h3>{card.title}</h3>
                    </div>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="wrap">
            <div className="section__head will-fade">
              <p className="kicker">{t.workKicker}</p>
              <h2 className="heading">{t.workTitle}</h2>
            </div>
            <div className="jobs">
              <article className="job">
                <h3>{t.job1Title}</h3>
                <div className="job__meta">
                  <a href="https://azmagroup.ir" target="_blank" rel="noreferrer">
                    {t.job1Company}
                  </a>
                  <span>{t.job1Date}</span>
                </div>
                <ul>
                  {t.job1Items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="job">
                <h3>{t.job2Title}</h3>
                <div className="job__meta">
                  <span>{t.job2Company}</span>
                  <span>{t.job2Date}</span>
                </div>
                <ul>
                  {t.job2Items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="wrap">
            <div className="section__head will-fade">
              <p className="kicker">{t.projectsKicker}</p>
              <h2 className="heading">{t.projectsTitle}</h2>
            </div>
            {projectList.map((p, i) => (
              <article className="project" key={p.title}>
                <div className="project__idx">[{`0${i + 1}`}]</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project__links">
                  <a href={p.live} target="_blank" rel="noreferrer">
                    {t.live}
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer">
                    {t.github}
                  </a>
                </div>
                <div className="project__bar" aria-hidden />
              </article>
            ))}
            <p className="edu will-fade">{t.edu}</p>
          </div>
        </section>

        <section className="section" id="certs">
          <div className="wrap">
            <div className="section__head will-fade">
              <p className="kicker">{t.certsKicker}</p>
              <h2 className="heading">{t.certsTitle}</h2>
            </div>
            <div className="certs">
              {certList.map((c) => (
                <a
                  className="cert"
                  key={c.slug}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="cert__path">
                    voorivex.academy/certificate/<span>alipk/{c.slug}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="cert__meta">
                    <span className="cert__badge">{c.badge}</span>
                    <span className="cert__link">{c.link}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <p className="kicker">{t.contactKicker}</p>
            <h2 className="heading">{t.contactTitle}</h2>
            <p className="copy">{t.contactBody}</p>
            <div className="contact__row">
              <div className="contact__item">
                <span>{t.email}</span>
                <a href={social.email}>aliparkour83@gmail.com</a>
              </div>
              <div className="contact__item">
                <span>{t.phone}</span>
                <a href="tel:+9899925508339">+98 999 255 0839</a>
              </div>
              <div className="contact__item">
                <span>{t.social}</span>
                <span className="contact__socials">
                  <a href={social.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <span aria-hidden>·</span>
                  <a href={social.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {t.brandFirst} {t.brandLast}
        </span>
        <span>{t.footerRole}</span>
      </footer>
      </div>
    </div>
  );
}
