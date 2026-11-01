import { invitation } from '../data/invitation';
import { heading, label } from '../ui';
import Reveal from './Reveal';

// Pola berulang per 5 foto: 1 lebar, 2 potret, 2 kotak.
// Foto yang sebaris selalu berukuran sama, jadi tidak ada sela kosong.
const shapes = [
  'col-span-2 aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-square',
];

function shapeFor(i, total) {
  const isLast = i === total - 1;
  const pos = i % 5;
  // Foto terakhir yang akan sendirian di barisnya dibuat selebar penuh
  if (isLast && (pos === 1 || pos === 3)) return 'col-span-2 aspect-[4/3]';
  return shapes[pos];
}

export default function Gallery() {
  const items = invitation.photos.gallery;
  if (!items.length) return null;

  return (
    <section id="galeri" className="px-6 py-16">
      <Reveal>
        <p className={label}>Galeri</p>
        <h2 className={`${heading} mt-3`}>Cerita kami</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3">
        {items.map((p, i) => (
          <Reveal key={p.src} className={shapeFor(i, items.length)}>
            <div className="h-full w-full overflow-hidden rounded-3xl bg-accent-soft">
              <img
                src={p.src}
                alt={p.alt || ''}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
