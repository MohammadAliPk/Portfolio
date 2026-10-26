import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type CastStep = {
  kicker: string;
  title: string;
  body: string;
};

type Props = {
  steps: readonly CastStep[];
  motion: boolean;
};

type Shard = {
  ox: number;
  oy: number;
  oz: number;
  rot: number;
  spin: number;
  w: number;
  h: number;
  text: string;
  phase: number;
  hue: 0 | 1 | 2;
};

const SNIPPETS = [
  "const ui = craft()",
  "useScroll(pin)",
  "export default App",
  "type Props = {",
  "await fetch('/api')",
  "gsap.to('.rail'",
  "if (ready) ship()",
  "<Canvas />",
  "npm run build",
  "git push origin",
  "ScrollTrigger.create",
  "force3D: true",
];

function readCssVar(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function CodeCast({ steps, motion }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = false;
    let progress = 0;
    let width = 0;
    let height = 0;
    let ptrX = 0;
    let ptrY = 0;
    let ptrTX = 0;
    let ptrTY = 0;
    let lastStep = -1;
    let lastFrame = 0;
    let colorsReady = false;
    let teal = "#2dd4bf";
    let sand = "#e0a86c";
    let ink = "#e8f0ef";
    let bg = "#0b1214";

    const count = window.matchMedia("(max-width: 720px)").matches ? 14 : 20;
    const shards: Shard[] = Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const r = 0.22 + (i % 4) * 0.07;
      return {
        ox: Math.cos(a) * r,
        oy: Math.sin(a) * r * 0.7,
        oz: 0.25 + (i % 5) * 0.1,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.01,
        w: 88 + (i % 5) * 18,
        h: 30 + (i % 3) * 4,
        text: SNIPPETS[i % SNIPPETS.length],
        phase: Math.random() * Math.PI * 2,
        hue: (i % 3) as 0 | 1 | 2,
      };
    });

    const syncColors = () => {
      teal = readCssVar("--teal", teal);
      sand = readCssVar("--sand", sand);
      ink = readCssVar("--ink", ink);
      bg = readCssVar("--bg", bg);
      colorsReady = true;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = root.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncColors();
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      ptrTX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ptrTY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const formation = (i: number, stage: number) => {
      const a = (i / shards.length) * Math.PI * 2 + stage * 0.35;
      if (stage < 1) {
        const k = smoothstep(stage);
        return {
          x: lerp(shards[i].ox * 0.35, Math.cos(a) * 0.52, k),
          y: lerp(shards[i].oy * 0.35, Math.sin(a) * 0.36, k),
          z: lerp(0.35, 0.55 + (i % 4) * 0.08, k),
        };
      }
      const k = smoothstep(stage - 1);
      const explode = 0.68 + (i % 7) * 0.07;
      return {
        x: lerp(Math.cos(a) * 0.52, Math.cos(a * 1.25) * explode, k),
        y: lerp(Math.sin(a) * 0.36, Math.sin(a * 1.1) * explode * 0.7, k),
        z: lerp(0.55 + (i % 4) * 0.08, 0.28 + (i % 6) * 0.08, k),
      };
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = 0;
      if (!visible || width < 1) return;

      // ~30fps cap — enough for float, much cheaper than 60
      if (motion && now - lastFrame < 32) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      if (!colorsReady) syncColors();

      if (motion) {
        ptrX += (ptrTX - ptrX) * 0.08;
        ptrY += (ptrTY - ptrY) * 0.08;
      }

      const p = progress;
      const stage = p * 2;
      const cx = width * (0.58 - ptrX * 0.025);
      const cy = height * (0.5 - ptrY * 0.025);
      const t = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      // one cheap glow (no heavy shadowBlur)
      const g = ctx.createRadialGradient(
        cx,
        cy,
        20,
        cx,
        cy,
        Math.max(width, height) * 0.45,
      );
      g.addColorStop(0, `rgba(45, 212, 191, ${0.12 + p * 0.08})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // draw back-to-front without sorting every frame: approx by z bucket
      const near: number[] = [];
      const mid: number[] = [];
      const far: number[] = [];

      for (let i = 0; i < shards.length; i++) {
        const f = formation(i, stage);
        if (f.z < 0.4) far.push(i);
        else if (f.z < 0.7) mid.push(i);
        else near.push(i);
      }

      const paintShard = (i: number) => {
        const s = shards[i];
        if (motion) s.rot += s.spin;
        const f = formation(i, stage);
        const drift = motion ? Math.sin(t * 0.9 + s.phase) * 0.02 : 0;
        const z = Math.max(0.15, Math.min(1, f.z));
        const scale = 0.45 + z * 0.85;
        const px = cx + f.x * width * 0.33 + drift * width + ptrX * (8 + z * 12);
        const py =
          cy + f.y * height * 0.28 + Math.sin(stage + i * 0.35) * 5 + ptrY * (8 + z * 10);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(s.rot * 0.22 + stage * 0.1 * (i % 2 === 0 ? 1 : -1));
        ctx.globalAlpha = 0.28 + z * 0.65;

        const rw = s.w * scale;
        const rh = s.h * scale;
        const stroke =
          s.hue === 0 ? teal : s.hue === 1 ? sand : "rgba(232,240,239,0.35)";

        ctx.fillStyle = bg;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        roundRect(ctx, -rw / 2, -rh / 2, rw, rh, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = ink;
        ctx.font = `500 ${Math.max(9, 11 * scale)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.direction = "ltr";
        ctx.fillText(s.text, -rw / 2 + 10, 1, rw - 18);
        ctx.restore();
      };

      far.forEach(paintShard);
      mid.forEach(paintShard);
      near.forEach(paintShard);

      // fewer arcs
      ctx.globalAlpha = 0.1 + p * 0.15;
      ctx.strokeStyle = teal;
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const x0 = cx - width * 0.12 + i * width * 0.08;
        ctx.beginPath();
        ctx.moveTo(x0, height * 0.2);
        ctx.quadraticCurveTo(x0 + 40, cy, x0 - 20, height * 0.8);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length + 0.0001));
      if (idx !== lastStep) {
        lastStep = idx;
        root.dataset.step = String(idx);
      }

      if (motion && visible) raf = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.02;
        if (visible) schedule();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: [0, 0.02, 0.1] },
    );
    io.observe(root);

    resize();

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.2}`,
      pin: true,
      pinType: "fixed",
      pinSpacing: true,
      scrub: 0.7,
      anticipatePin: 0,
      onUpdate: (self) => {
        progress = self.progress;
        if (!motion) schedule();
        else if (!raf && visible) schedule();
      },
      onEnter: () => {
        visible = true;
        schedule();
      },
      onEnterBack: () => {
        visible = true;
        schedule();
      },
    });

    root.addEventListener("pointermove", onMove, { passive: true });
    const onResize = () => {
      resize();
      schedule();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // theme changes
    const mo = new MutationObserver(() => {
      syncColors();
      schedule();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      st.kill();
      io.disconnect();
      mo.disconnect();
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [motion, steps]);

  return (
    <section className="cast" id="craft" ref={rootRef} data-step="0">
      <canvas className="cast__canvas" ref={canvasRef} aria-hidden />
      <div className="cast__copy wrap">
        {steps.map((step, i) => (
          <div className="cast__step" data-i={i} key={step.kicker}>
            <p className="kicker">{step.kicker}</p>
            <h2 className="heading">{step.title}</h2>
            <p className="copy">{step.body}</p>
          </div>
        ))}
      </div>
      <div className="cast__rail" aria-hidden>
        {steps.map((_, i) => (
          <span key={i} data-i={i} />
        ))}
      </div>
      <p className="cast__hint" aria-hidden>
        scroll
      </p>
    </section>
  );
}
