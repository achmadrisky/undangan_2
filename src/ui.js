// Kelas Tailwind yang dipakai berulang
export const label = 'text-xs font-medium uppercase tracking-[0.24em] text-muted';

const btn =
  'inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[0.95rem] font-medium transition-[transform,background-color] duration-200 ease-out active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export const btnPrimary = `${btn} bg-accent text-accent-ink hover:bg-[#4a5840]`;
export const btnGhost = `${btn} border border-line text-ink hover:bg-accent-soft`;

export const heading = 'font-display text-4xl leading-[1.05] tracking-tight';
