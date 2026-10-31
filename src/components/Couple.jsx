import { invitation } from '../data/invitation';
import { heading, label } from '../ui';
import Reveal from './Reveal';

function Person({ person, title, align }) {
  const right = align === 'right';
  return (
    <Reveal className={right ? 'ml-auto w-[88%] text-right' : 'w-[88%]'}>
      <div>
        {person.photo && (
          <div
            className={`mb-6 aspect-[4/5] w-3/5 overflow-hidden rounded-[2rem] bg-accent-soft ${right ? 'ml-auto' : ''}`}
          >
            <img
              src={person.photo}
              alt={person.fullName}
              width="480"
              height="600"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <p className={label}>{title}</p>
        <h3 className={`${heading} mt-3`}>{person.fullName}</h3>
        <p className="mt-3 text-muted">{person.role}</p>
        {person.parents && <p className="mt-1 text-muted">{person.parents}</p>}
      </div>
    </Reveal>
  );
}

export default function Couple() {
  const { bride, groom } = invitation.couple;
  return (
    <section id="mempelai" className="px-6 py-16">
      <Reveal>
        <p className="max-w-[34ch] text-lg text-ink">{invitation.intro}</p>
      </Reveal>

      <div className="mt-16 space-y-14">
        <Person person={bride} title="Mempelai Wanita" align="left" />
        <Reveal>
          <p className="font-display text-5xl text-accent italic" aria-hidden="true">
            dan
          </p>
        </Reveal>
        <Person person={groom} title="Mempelai Pria" align="right" />
      </div>
    </section>
  );
}
