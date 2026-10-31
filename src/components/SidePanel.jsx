import { invitation } from '../data/invitation';
import { label } from '../ui';

const { bride, groom } = invitation.couple;

// Hanya tampil di desktop. Murni dekoratif, jadi disembunyikan dari pembaca layar.
export default function SidePanel() {
  return (
    <aside
      aria-hidden="true"
      className="sticky top-0 hidden h-dvh flex-col justify-between p-12 lg:flex"
    >
      <p className={label}>Undangan Pernikahan</p>
      <div>
        <p className="font-display text-[clamp(4rem,9vw,8rem)] leading-[0.92] tracking-tight">
          {bride.nickname}
          <br />
          <em className="font-normal text-accent">dan</em> {groom.nickname}
        </p>
        <p className="mt-8 text-lg text-muted">{invitation.date.label}</p>
      </div>
    </aside>
  );
}
