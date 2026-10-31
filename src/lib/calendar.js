import { invitation } from '../data/invitation';

// Acara dicatat sebagai agenda sehari penuh karena jam belum pasti.
const start = invitation.date.iso.replaceAll('-', '');
const end = (() => {
  const d = new Date(`${invitation.date.iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replaceAll('-', '');
})();

const title = 'Pernikahan Ririn dan Wildan';
const details = 'Undangan pernikahan Ririn dan Wildan.';

const esc = (s) => s.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Undangan Ririn dan Wildan//ID',
    'BEGIN:VEVENT',
    `UID:pernikahan-${start}@undangan`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pernikahan-ririn-wildan.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
