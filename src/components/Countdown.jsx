import { useEffect, useState } from "react";
import { invitation } from "../data/invitation";
import Reveal from "./Reveal";

const target = new Date(invitation.date.countdownTarget).getTime();

function remaining() {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const [t, setT] = useState(remaining);

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    ["Hari", t.days],
    ["Jam", t.hours],
    ["Menit", t.minutes],
    ["Detik", t.seconds],
  ];

  return (
    <section
      id="hitung-mundur"
      className="bg-accent px-6 py-16 text-accent-ink"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent-ink/70">
          Menuju hari bahagia
        </p>
        <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight">
          {t.done ? "Hari yang dinanti telah tiba." : "Tinggal sedikit lagi."}
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <dl className="grid grid-cols-4 border-t border-accent-ink/30">
          {units.map(([name, value]) => (
            <div key={name} className="pt-4">
              <dd className="font-display text-4xl tabular-nums">
                {String(value).padStart(2, "0")}
              </dd>
              <dt className="mt-1 text-xs text-accent-ink/70">{name}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
