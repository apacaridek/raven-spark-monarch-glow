import { Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Airlock({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.28em] text-muted uppercase">
        Sector 07 · Hatch unlocked
      </p>
      <div className="mt-8 flex size-14 items-center justify-center rounded-xl border border-border bg-surface">
        <Orbit className="size-6 text-fg" strokeWidth={1.5} />
      </div>
      <h1 className="mt-8 font-display text-5xl font-medium tracking-tight text-fg sm:text-6xl">
        Monkey
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Asisten di orbit senyap. Buka hatch, lalu bicara — seperti mengirim
        sinyal ke stasiun yang jauh.
      </p>
      <Button className="mt-10 min-w-44" size="lg" onClick={onEnter}>
        Masuk stasiun
      </Button>
      <p className="mt-6 font-mono text-[11px] tracking-widest text-subtle">
        VACUUM · 0.0 kPa · COMMS READY
      </p>
    </div>
  );
}
