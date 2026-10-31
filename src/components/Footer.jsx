import { invitation } from '../data/invitation';
import Reveal from './Reveal';

const { bride, groom } = invitation.couple;

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-28">
      <Reveal>
        <p className="max-w-[38ch] text-muted">{invitation.closing}</p>
        <div className="mt-10 border-t border-line pt-6">
          <p className="font-display text-4xl tracking-tight">
            {bride.nickname} <em className="font-normal text-accent">dan</em> {groom.nickname}
          </p>
          <p className="mt-2 text-sm text-muted">{invitation.date.dayMonthYear}</p>
        </div>
      </Reveal>
    </footer>
  );
}
