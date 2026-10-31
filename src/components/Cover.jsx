import { motion } from 'motion/react';
import { invitation } from '../data/invitation';
import { btnPrimary, label } from '../ui';

const { bride, groom } = invitation.couple;

export default function Cover({ guest, onOpen }) {
  return (
    <motion.div
      className="fixed inset-y-0 right-0 z-50 flex w-full flex-col justify-between bg-canvas px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))] lg:w-[30rem]"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 22 }}
    >
      <p className={label}>Undangan Pernikahan</p>

      <div>
        <h2 className="font-display text-[clamp(3.5rem,19vw,5.5rem)] leading-[0.95] tracking-tight">
          {bride.nickname}
          <br />
          <em className="font-normal text-accent">dan</em> {groom.nickname}
        </h2>
        <p className="mt-6 text-muted">{invitation.date.label}</p>
      </div>

      <div className="border-t border-line pt-6">
        <p className="text-sm text-muted">Kepada Yth.</p>
        <p className="mt-1 font-display text-2xl break-words">{guest || 'Bapak/Ibu/Saudara/i'}</p>
        <button type="button" onClick={onOpen} className={`${btnPrimary} mt-6 w-full`}>
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
