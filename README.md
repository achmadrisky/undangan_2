# Undangan Ririn dan Wildan

Website undangan pernikahan, 12 Desember 2026. React + Vite + Tailwind CSS v4, dihosting di Vercel.

## 1. Menjalankan di komputer

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal. Untuk mencoba nama tamu, tambahkan `?to=Bapak%20Budi` di akhir alamat.
Untuk mencoba di HP, buka alamat jaringan (Network) yang tampil di terminal dari HP yang tersambung ke Wi-Fi yang sama.

## 2. Mengisi konten

Semua isi ada di satu file: `src/data/invitation.js`.

Yang masih perlu kamu isi:

- [ ] Jam dan zona waktu (`date.countdownTarget`), waktu dan tempat tiap acara, alamat, tautan Google Maps
- [ ] Nama orang tua kedua mempelai (opsional, `couple.*.parents`)
- [ ] Foto: simpan di `public/photos` (format WebP, lebar maksimal 1200px), lalu isi path-nya di `photos`
- [ ] Kutipan (`quote`), bagian ini muncul otomatis begitu diisi
- [ ] Rekening amplop digital (`gift.accounts`), muncul otomatis begitu diisi
- [ ] Batas waktu RSVP (`rsvp.deadline`) dan nomor WhatsApp (`rsvp.whatsapp`)
- [ ] Musik (opsional): taruh file di `public/music`, isi `music.src`
- [ ] Gambar pratinjau WhatsApp: tambahkan `og:image` di `index.html` (ada petunjuknya)

Bagian yang dikosongkan (galeri, kutipan, amplop digital) disembunyikan, jadi tidak ada kotak kosong di undangan.

Desain mengikuti `DESIGN.md`. Warna ada di `src/index.css`.

## 3. Menyalakan RSVP dan ucapan (Google Sheets, gratis)

1. Buat Google Sheet baru.
2. Menu **Extensions > Apps Script**, hapus isinya, tempel isi `docs/apps-script.gs`, lalu simpan.
3. **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone**. Klik Deploy dan izinkan akses.
4. Salin URL web app (berakhiran `/exec`).
5. Di komputer: salin `.env.example` menjadi `.env`, isi `VITE_RSVP_ENDPOINT=` dengan URL tadi.
6. Di Vercel: **Settings > Environment Variables**, tambahkan `VITE_RSVP_ENDPOINT` dengan nilai yang sama, lalu deploy ulang.

Setiap RSVP masuk sebagai baris baru di Sheet, jadi mudah dihitung untuk katering dan kursi. Hanya nama, status kehadiran, dan ucapan yang tampil publik. Jumlah tamu tetap privat di Sheet.

Kalau `VITE_RSVP_ENDPOINT` kosong dan nomor WhatsApp terisi, formulir otomatis membuka WhatsApp dengan pesan yang sudah terisi.

## 4. Tautan unik per tamu

1. Buat `guests.txt`, satu nama per baris.
2. Jalankan `npm run links -- https://alamat-situs-kamu.com`
3. Buka `links.csv` di Google Sheets, lalu kirim tautan ke masing-masing tamu.

`guests.txt` dan `links.csv` sudah masuk `.gitignore` agar daftar tamu tidak ikut terunggah.

## 5. Deploy ke Vercel

1. Unggah proyek ke GitHub (repositori privat tidak masalah).
2. Di vercel.com pilih **Add New > Project**, impor repositori tersebut.
3. Vercel mengenali Vite otomatis: Build Command `npm run build`, Output Directory `dist`.
4. Tambahkan variabel `VITE_RSVP_ENDPOINT` (bagian 3), lalu **Deploy**.
5. Domain sendiri: **Settings > Domains**.

Setiap perubahan yang di-push ke GitHub akan otomatis ter-deploy ulang.

## 6. Daftar periksa sebelum disebar

- [ ] Buka di HP asli (Android dan iPhone), pastikan tidak ada gulir ke samping
- [ ] Coba kirim satu RSVP dan pastikan masuk ke Sheet
- [ ] Coba tautan dengan `?to=Nama` dan tanpa nama
- [ ] Bagikan tautan ke diri sendiri di WhatsApp dan lihat pratinjaunya
- [ ] Periksa semua tautan Maps dan nomor rekening
- [ ] Siapkan info cadangan lewat WhatsApp biasa untuk tamu yang sulit membuka website

## Struktur

```
src/
  data/invitation.js     semua isi undangan
  components/            Cover, Hero, Couple, Countdown, Events, Gallery, Quote, Gift, Rsvp, Footer
  lib/                   nama tamu, kalender (.ics), RSVP
  hooks/useMusic.js      musik latar opsional
docs/apps-script.gs      backend RSVP
scripts/generate-links.mjs
DESIGN.md                sistem desain
```
