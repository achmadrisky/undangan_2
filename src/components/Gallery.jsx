import { invitation } from '../data/invitation';
import { heading, label } from '../ui';
import Reveal from './Reveal';

// Rasio bergantian agar susunannya tidak seragam
const shapes = ['col-span-2 aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-square', 'aspect-[3/4]'];

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
          <Reveal key={p.src} className={shapes[i % shapes.length]}>
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
