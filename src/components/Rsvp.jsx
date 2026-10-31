import { useEffect, useState } from "react";
import { invitation } from "../data/invitation";
import {
  fetchWishes,
  rsvpEnabled,
  submitRsvp,
  whatsappLink,
} from "../lib/rsvp";
import { btnPrimary, heading, label } from "../ui";
import Reveal from "./Reveal";

const { whatsapp, deadline } = invitation.rsvp;
const canSubmit = rsvpEnabled || Boolean(whatsapp);

const inputClass =
  "mt-2 block min-h-12 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-2 focus:outline-accent";

function Field({ id, title, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {title}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#9a4a38]">
          {error}
        </p>
      )}
    </div>
  );
}

function WishesList({ wishes }) {
  if (wishes === null) {
    return (
      <div className="space-y-6" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border-t border-line pt-4">
            <div className="skeleton h-4 w-1/3 rounded-full" />
            <div className="skeleton mt-3 h-4 w-full rounded-full" />
            <div className="skeleton mt-2 h-4 w-3/4 rounded-full" />
          </div>
        ))}
      </div>
    );
  }
  if (!wishes.length) {
    return (
      <p className="border-t border-line pt-4 text-muted">
        Belum ada ucapan. Jadilah yang pertama menuliskan doa untuk kami.
      </p>
    );
  }
  return (
    <ul>
      {wishes.slice(0, 10).map((w, i) => (
        <li key={`${w.name}-${i}`} className="border-t border-line py-5">
          <p className="flex items-baseline justify-between gap-3">
            <span className="font-display text-xl break-words">{w.name}</span>
            <span className="shrink-0 text-xs text-muted">
              {w.attendance === "hadir" ? "Hadir" : "Berhalangan"}
            </span>
          </p>
          <p className="mt-2 break-words whitespace-pre-line text-muted">
            {w.message}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Rsvp({ guest }) {
  const [form, setForm] = useState({
    name: guest || "",
    attendance: "",
    guests: "1",
    message: "",
    website: "", // honeypot: harus tetap kosong
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [wishes, setWishes] = useState(rsvpEnabled ? null : []);

  useEffect(() => {
    if (!rsvpEnabled) return undefined;
    let cancelled = false;
    fetchWishes()
      .then((w) => !cancelled && setWishes(w))
      .catch(() => !cancelled && setWishes([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Mohon isi nama Anda.";
    if (!form.attendance) next.attendance = "Mohon pilih salah satu.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // Bot mengisi kolom tersembunyi: pura-pura berhasil, tanpa mengirim apa pun.
    if (form.website) {
      setStatus("done");
      return;
    }

    const payload = {
      name: form.name.trim().slice(0, 60),
      attendance: form.attendance,
      guests: form.attendance === "hadir" ? Number(form.guests) : 0,
      message: form.message.trim().slice(0, 300),
    };

    if (rsvpEnabled) {
      setStatus("sending");
      try {
        await submitRsvp(payload);
        if (payload.message) {
          setWishes((w) => [
            {
              name: payload.name,
              attendance: payload.attendance,
              message: payload.message,
            },
            ...(w || []),
          ]);
        }
        setStatus("done");
      } catch {
        setStatus("error");
      }
    } else if (whatsapp) {
      window.open(
        whatsappLink(whatsapp, payload),
        "_blank",
        "noopener,noreferrer",
      );
      setStatus("done");
    }
  };

  return (
    <section id="rsvp" className="px-6 py-16">
      <Reveal>
        <p className={label}>RSVP</p>
        <h2 className={`${heading} mt-3`}>Konfirmasi kehadiran</h2>
        <p className="mt-4 max-w-[38ch] text-muted">
          Kabari kami agar persiapan tempat dan hidangan lebih tepat
          {deadline ? `, paling lambat ${deadline}` : ""}.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        {status === "done" ? (
          <div className="mt-10 border-t border-line pt-8" role="status">
            <p className="font-display text-3xl tracking-tight">
              Terima kasih, {form.name.trim()}.
            </p>
            <p className="mt-3 max-w-[38ch] text-muted">
              {form.attendance === "hadir"
                ? "Kami menantikan kehadiran Anda."
                : "Terima kasih sudah mengabari. Doa Anda sangat berarti bagi kami."}
            </p>
          </div>
        ) : !canSubmit ? (
          <p className="mt-10 border-t border-line pt-6 text-muted">
            Formulir konfirmasi belum diaktifkan. Silakan hubungi kami langsung.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-10 space-y-7 border-t border-line pt-8"
          >
            {/* Honeypot: tersembunyi dari pengguna dan pembaca layar */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Jangan diisi</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={set("website")}
              />
            </div>

            <Field id="name" title="Nama" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={60}
                value={form.name}
                onChange={set("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
            </Field>

            <fieldset>
              <legend className={label}>Kehadiran</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  ["hadir", "Hadir"],
                  ["tidak", "Tidak bisa hadir"],
                ].map(([value, text]) => (
                  <label key={value} className="relative block">
                    <input
                      type="radio"
                      name="attendance"
                      value={value}
                      checked={form.attendance === value}
                      onChange={set("attendance")}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-12 items-center justify-center rounded-2xl border border-line bg-surface px-3 text-center text-[0.95rem] transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                      {text}
                    </span>
                  </label>
                ))}
              </div>
              {errors.attendance && (
                <p className="mt-2 text-sm text-[#9a4a38]">
                  {errors.attendance}
                </p>
              )}
            </fieldset>

            {form.attendance === "hadir" && (
              <Field id="guests" title="Jumlah yang hadir">
                <select
                  id="guests"
                  value={form.guests}
                  onChange={set("guests")}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field id="message" title="Ucapan dan doa (opsional)">
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={300}
                value={form.message}
                onChange={set("message")}
                className={inputClass}
              />
            </Field>

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className={`${btnPrimary} w-full disabled:opacity-60`}
              >
                {status === "sending"
                  ? "Mengirim..."
                  : rsvpEnabled
                    ? "Kirim Konfirmasi"
                    : "Kirim lewat WhatsApp"}
              </button>
              {status === "error" && (
                <p role="alert" className="mt-3 text-sm text-[#9a4a38]">
                  Konfirmasi belum terkirim. Periksa koneksi lalu coba lagi.
                </p>
              )}
            </div>
          </form>
        )}
      </Reveal>

      {rsvpEnabled && (
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-3xl tracking-tight">
              Ucapan untuk kami
            </h3>
          </Reveal>
          <div className="mt-6">
            <WishesList wishes={wishes} />
          </div>
        </div>
      )}
    </section>
  );
}
