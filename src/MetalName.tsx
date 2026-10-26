import { useEffect, useRef } from "react";

type Props = {
  line1: string;
  line2: string;
  motion: boolean;
  rtl?: boolean;
};

function readCssVar(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function MetalName({ line1, line2, motion, rtl = false }: Props) {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let t0 = performance.now();
    let running = true;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dirty = true;
    let px = rtl ? 0.65 : 0.35;
    let ptx = px;
    let lastFrame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.ceil(rect.width));
      h = Math.max(1, Math.ceil(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      ptx = clamp01((e.clientX - r.left) / Math.max(1, r.width));
      dirty = true;
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = 0;
      if (!visible) return;

      if (motion && now - lastFrame < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      if (motion) {
        const next = px + (ptx - px) * 0.12;
        if (Math.abs(next - px) > 0.001) {
          px = next;
          dirty = true;
        }
      }

      if (!dirty && !motion) return;
      dirty = motion;

      ctx.clearRect(0, 0, w, h);

      const ink = readCssVar("--ink", "#e8f0ef");
      const teal = readCssVar("--teal", "#2dd4bf");
      const sand = readCssVar("--sand", "#e0a86c");
      const muted = readCssVar("--muted", "#6f8581");

      const size = Math.min(58, Math.max(32, w * (rtl ? 0.092 : 0.085)));
      const lineH = size * (rtl ? 1.28 : 1.18);
      const startY = size * (rtl ? 1.05 : 0.92);
      const time = (now - t0) / 1000;
      const shimmer = motion ? (time * 0.18 + px * 0.45) % 1 : 0.38;

      ctx.font = `800 ${size}px Vazirmatn, Tahoma, system-ui, sans-serif`;
      ctx.textBaseline = "alphabetic";
      // RTL: text must start from the right edge or it draws off-canvas
      ctx.direction = rtl ? "rtl" : "ltr";
      ctx.textAlign = rtl ? "right" : "left";
      const x = rtl ? w : 0;

      const paint = (text: string, y: number, accent: boolean) => {
        const grad = ctx.createLinearGradient(
          rtl ? w : 0,
          y - size,
          rtl ? 0 : w,
          y + size * 0.2,
        );
        if (accent) {
          grad.addColorStop(0, "#0a5c56");
          grad.addColorStop(clamp01(shimmer - 0.22), teal);
          grad.addColorStop(clamp01(shimmer - 0.05), sand);
          grad.addColorStop(shimmer, "#f7ffe9");
          grad.addColorStop(clamp01(shimmer + 0.14), teal);
          grad.addColorStop(1, "#08564f");
        } else {
          grad.addColorStop(0, muted);
          grad.addColorStop(clamp01(shimmer - 0.2), ink);
          grad.addColorStop(shimmer, "#ffffff");
          grad.addColorStop(clamp01(shimmer + 0.16), ink);
          grad.addColorStop(1, muted);
        }
        ctx.fillStyle = grad;
        ctx.fillText(text, x, y);
      };

      paint(line1, startY, false);
      paint(line2, startY + lineH, true);

      const sx = w * (px * 0.75 + 0.1);
      ctx.globalCompositeOperation = "source-atop";
      const spec = ctx.createLinearGradient(sx - 36, 0, sx + 56, h);
      spec.addColorStop(0, "rgba(255,255,255,0)");
      spec.addColorStop(0.48, "rgba(255,255,255,0)");
      spec.addColorStop(0.5, "rgba(255,255,255,0.35)");
      spec.addColorStop(0.52, "rgba(255,255,255,0)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      if (motion && visible) raf = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          dirty = true;
          schedule();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const boot = async () => {
      try {
        await document.fonts.ready;
        await document.fonts.load("800 48px Vazirmatn");
      } catch {
        /* ignore */
      }
      resize();
      schedule();
    };

    const onResize = () => {
      resize();
      schedule();
    };

    boot();
    wrap.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [line1, line2, motion, rtl]);

  return (
    <h1
      className={`hero__name metal-name ${rtl ? "metal-name--rtl" : ""}`}
      ref={wrapRef}
    >
      <span className="sr-only">
        {line1} {line2}
      </span>
      <canvas className="metal-name__canvas" ref={canvasRef} aria-hidden />
    </h1>
  );
}
