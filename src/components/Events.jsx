import { invitation } from '../data/invitation';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import { btnGhost, btnPrimary, heading, label } from '../ui';
import Reveal from './Reveal';

export default function Events() {
  const { events, date } = invitation;
  return (
    <section id="acara" className="px-6 py-16">
      <Reveal>
        <p className={label}>Rangkaian acara</p>
        <h2 className={`${heading} mt-3`}>{date.label}</h2>
      </Reveal>

      <div className="mt-10">
        {events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.08}>
            <article className="border-t border-line py-8">
              <h3 className="font-display text-3xl tracking-tight">{ev.title}</h3>
              <p className="mt-3 text-ink">{ev.time}</p>
              <p className="mt-1 text-muted">{ev.venue}</p>
              {ev.address && <p className="mt-1 max-w-[40ch] text-muted">{ev.address}</p>}
              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnGhost} mt-5`}
                >
                  Buka di Google Maps
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="border-t border-line pt-8">
        <p className="text-muted">Simpan tanggalnya agar tidak terlewat.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={downloadIcs} className={btnPrimary}>
            Simpan ke Kalender
          </button>
          <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            Google Calendar
          </a>
        </div>
      </Reveal>
    </section>
  );
}
