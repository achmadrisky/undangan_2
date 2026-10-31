const endpoint = import.meta.env.VITE_RSVP_ENDPOINT || "";

export const rsvpEnabled = Boolean(endpoint);

// text/plain menghindari preflight CORS pada Google Apps Script
export async function submitRsvp(payload) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "gagal");
}

export async function fetchWishes() {
  const res = await fetch(`${endpoint}?action=wishes`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.wishes) ? json.wishes : [];
}

export function whatsappLink(number, { name, attendance, guests, message }) {
  const status =
    attendance === "hadir"
      ? `InsyaAllah saya hadir bersama ${guests} orang`
      : "Mohon maaf saya belum bisa hadir";
  const text = [
    `Halo, saya ${name}.`,
    `${status} di pernikahan Ririn dan Wildan.`,
    message ? `Ucapan: ${message}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
