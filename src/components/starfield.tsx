import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; s: number };

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const stars: Star[] = [];

    function resize() {
      w = canvas!.width = window.innerWidth * devicePixelRatio;
      h = canvas!.height = window.innerHeight * devicePixelRatio;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
    }

    function seed() {
      stars.length = 0;
      const n = Math.min(220, Math.floor((w * h) / 18000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.2 + Math.random() * 0.8,
          s: Math.random(),
        });
      }
    }

    function draw(t: number) {
      ctx!.fillStyle = "#050814";
      ctx!.fillRect(0, 0, w, h);
      for (const star of stars) {
        const tw = reduce ? 1 : 0.55 + Math.sin(t * 0.0012 + star.s * 12) * 0.45;
        const r = (0.4 + star.z * 1.2) * devicePixelRatio;
        ctx!.fillStyle = `rgba(232, 238, 252, ${0.15 + star.z * 0.55 * tw})`;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx!.fill();
        if (!reduce) {
          star.y += star.z * 0.12 * devicePixelRatio;
          if (star.y > h) {
            star.y = 0;
            star.x = Math.random() * w;
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw(0);
    window.addEventListener("resize", () => {
      resize();
      seed();
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
