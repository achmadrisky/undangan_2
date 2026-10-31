import { invitation } from "../data/invitation";
import { heading, label } from "../ui";
import Reveal from "./Reveal";

export default function OurStory() {
  const { title, paragraphs } = invitation.story;
  if (!paragraphs.length) return null;
  const [first, ...rest] = paragraphs;

  return (
    <section id="our-story" className="px-6 py-16">
      <Reveal>
        <p className={label}>Cerita kami</p>
        <h2 className={`${heading} mt-3`}>{title}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 border-t border-line pt-8">
        <p className="max-w-[30ch] font-display text-2xl leading-snug tracking-tight">
          {first}
        </p>
      </Reveal>

      <div className="mt-8 space-y-6">
        {rest.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="max-w-[40ch] text-muted">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
