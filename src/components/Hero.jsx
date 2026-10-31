import { invitation } from '../data/invitation';
import { label } from '../ui';
import Reveal from './Reveal';

const { bride, groom } = invitation.couple;
const { photos, date } = invitation;

// Foto kecil di antara kata pada judul. Sebelum foto tersedia, tampil sebagai bentuk pil tonal.
function InlinePhoto() {
  const base =
    'mx-[0.14em] inline-block h-[0.7em] w-[1.5em] rounded-full align-middle';
  if (photos.inline) {
    return (
      <img
        src={photos.inline}
        alt=""
        width="150"
        height="70"
        decoding="async"
        className={`${base} object-cover`}
      />
    );
  }
  return <span aria-hidden="true" className={`${base} animate-breathe bg-accent-soft`} />;
}

export default function Hero() {
  return (
    <section id="beranda" className="flex min-h-dvh flex-col justify-between px-6 pt-10 pb-12">
      <Reveal>
        <p className={label}>Kami akan menikah</p>
      </Reveal>

      {photos.hero && (
        <Reveal className="my-8">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-accent-soft">
            <img
              src={photos.hero}
              alt={`${bride.nickname} dan ${groom.nickname}`}
              width="800"
              height="1000"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      )}

      <div className={photos.hero ? '' : 'mt-24'}>
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(3.5rem,19vw,5.5rem)] leading-[0.95] tracking-tight">
            <span className="block">{bride.nickname}</span>
            <span className="block">
              <em className="font-normal text-accent">dan</em>
              <InlinePhoto />
            </span>
            <span className="block">{groom.nickname}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex items-baseline gap-4 border-t border-line pt-5">
            <p className="font-display text-2xl">{date.dayMonthYear}</p>
            <p className="text-muted">{date.day}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
