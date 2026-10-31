// Membuat tautan unik per tamu.
// Pemakaian:
//   1. Buat guests.txt (satu nama per baris)
//   2. npm run links -- https://domain-kamu.com
//   3. Hasil ada di links.csv (Nama,Tautan) dan bisa dibuka di Google Sheets

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!base) {
  console.error('Isi alamat situs, contoh: npm run links -- https://ririn-wildan.vercel.app');
  process.exit(1);
}
if (!existsSync('guests.txt')) {
  console.error('File guests.txt belum ada. Buat dulu, satu nama per baris.');
  process.exit(1);
}

const names = readFileSync('guests.txt', 'utf8')
  .split(/\r?\n/)
  .map((n) => n.trim())
  .filter(Boolean);

const rows = names.map((n) => {
  const url = `${base}/?to=${encodeURIComponent(n)}`;
  return `"${n.replaceAll('"', '""')}","${url}"`;
});

writeFileSync('links.csv', ['Nama,Tautan', ...rows].join('\n'), 'utf8');
console.log(`${names.length} tautan ditulis ke links.csv`);
