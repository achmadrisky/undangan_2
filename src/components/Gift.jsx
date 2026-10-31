import { useState } from 'react';
import { invitation } from '../data/invitation';
import { btnGhost, heading, label } from '../ui';
import Reveal from './Reveal';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

export default function Gift() {
  const { accounts, address } = invitation.gift;
  const [copied, setCopied] = useState(null);

  if (!accounts.length && !address) return null;

  const onCopy = async (number) => {
    await copyText(number);
    setCopied(number);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="amplop" className="px-6 py-16">
      <Reveal>
        <p className={label}>Amplop digital</p>
        <h2 className={`${heading} mt-3`}>Tanda kasih</h2>
        <p className="mt-4 max-w-[38ch] text-muted">
          Kehadiran dan doa Anda sudah sangat berarti. Bila ingin berbagi tanda kasih, dapat melalui:
        </p>
      </Reveal>

      <div className="mt-8 space-y-4">
        {accounts.map((acc) => (
          <Reveal key={acc.number}>
            <div className="rounded-[2rem] border border-line bg-surface p-6">
              <p className={label}>{acc.bank}</p>
              <p className="mt-3 font-mono text-xl tracking-wide break-all">{acc.number}</p>
              <p className="mt-1 text-muted">a.n. {acc.holder}</p>
              <button type="button" onClick={() => onCopy(acc.number)} className={`${btnGhost} mt-5`}>
                {copied === acc.number ? 'Nomor tersalin' : 'Salin nomor rekening'}
              </button>
            </div>
          </Reveal>
        ))}

        {address && (
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-surface p-6">
              <p className={label}>Kirim kado</p>
              <p className="mt-3 max-w-[36ch]">{address}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
