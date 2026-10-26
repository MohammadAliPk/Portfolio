import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  kicker: string;
  title: string;
  body: string;
  motion: boolean;
};

const SpaceFieldScene = lazy(() =>
  import("./SpaceFieldScene").then((m) => ({ default: m.SpaceFieldScene })),
);

export function SpaceField({ kicker, title, body, motion }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !root.parentNode) return;

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * 0.9}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.65,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        root.style.setProperty("--field-p", self.progress.toFixed(3));
      },
    });

    // Second pass so later pins (skills) measure after this spacer exists.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      st.kill(true);
    };
  }, [motion]);

  return (
    <section className="field" id="field" ref={rootRef}>
      <div className="field__stage">
        <Suspense fallback={null}>
          <SpaceFieldScene motion={motion} progressRef={progressRef} />
        </Suspense>
      </div>
      <div className="field__copy wrap">
        <p className="kicker">{kicker}</p>
        <h2 className="heading">{title}</h2>
        <p className="copy">{body}</p>
      </div>
      <div className="field__vignette" aria-hidden />
    </section>
  );
}
