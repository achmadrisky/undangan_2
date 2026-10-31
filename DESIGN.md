# Design System: Undangan Ririn & Wildan

## 1. Visual Theme & Atmosphere

Sebuah undangan digital yang tenang dan lapang, seperti halaman buku tamu di ruang berpencahayaan hangat. Kepadatan rendah (Density 3, "Art Gallery Airy"): banyak ruang kosong, satu gagasan per layar. Variasi tata letak sedang (Variance 6, "Offset Asymmetric"): teks rata kiri, blok mempelai bergantian kiri dan kanan, tidak ada hero yang dipusatkan. Gerak halus (Motion 5, "Fluid CSS"): elemen muncul perlahan dengan pegas yang berbobot, tidak ada efek mencolok.

Prioritas utama adalah layar HP (lebar 360 sampai 430px). Di desktop, undangan tetap berbentuk kolom selebar ponsel (30rem) di sisi kanan, dan panel nama mempelai menempel di sisi kiri.

## 2. Color Palette & Roles

- **Linen Canvas** (#F6F3EC) — Latar utama halaman
- **Soft Paper** (#FCFAF6) — Latar kolom undangan di desktop, permukaan input
- **Warm Charcoal** (#211F1C) — Teks utama (bukan hitam murni)
- **Stone Muted** (#6B665D) — Teks sekunder, label, keterangan
- **Dune Line** (#DDD7CA) — Garis pemisah 1px dan border input
- **Olive Sage** (#56664A) — Satu-satunya aksen: tombol utama, kata "dan", fokus, status terpilih
- **Sage Mist** (#E3E8DA) — Tint aksen untuk latar status terpilih dan elemen dekoratif
- **Linen on Sage** (#F6F3EC) — Teks di atas tombol aksen

Satu aksen saja, saturasi rendah. Tidak ada ungu, tidak ada gradien neon, tidak ada bayangan menyala.

## 3. Typography Rules

- **Display:** Fraunces — serif modern berkarakter, dipakai untuk nama mempelai, judul bagian, angka hitung mundur. Tracking rapat, ukuran lewat `clamp()`, hierarki lewat bobot dan warna.
- **Body:** Outfit — sans-serif geometris yang ramah, leading longgar, lebar baris maksimal 65 karakter.
- **Label:** Outfit, huruf kapital kecil dengan tracking lebar (0.24em), warna Stone Muted.
- **Mono:** font monospace sistem, hanya untuk nomor rekening.
- **Banned:** Inter, Times New Roman, Georgia, Garamond, Palatino.
- Ukuran teks isian formulir minimal 16px agar iOS tidak memperbesar layar.

## 4. Component Stylings

* **Buttons:** Berbentuk pil, tinggi minimal 48px. Primer berisi Olive Sage, sekunder hanya garis tipis. Saat ditekan bergeser turun 1px. Tanpa cahaya luar.
* **Cards:** Hampir tidak dipakai. Struktur dibangun dengan garis atas (border-top) dan ruang kosong. Satu-satunya permukaan terangkat adalah blok rekening, dengan sudut membulat besar dan tanpa bayangan berat.
* **Inputs:** Label di atas, pesan galat di bawah, fokus berupa cincin Olive Sage. Pilihan hadir/tidak hadir berupa dua blok besar yang mudah disentuh.
* **Loaders:** Kerangka berkilau (shimmer) seukuran daftar ucapan. Tanpa spinner bundar.
* **Empty States:** Bagian galeri, kutipan, dan amplop digital disembunyikan sampai isinya ada. Daftar ucapan kosong menampilkan kalimat undangan untuk menjadi yang pertama.

## 5. Layout Principles

- Satu kolom di bawah 1024px. Tidak ada gulir horizontal.
- Di desktop: grid dua kolom, panel nama menempel di kiri, kolom undangan 30rem di kanan.
- Bagian setinggi layar memakai `min-h-dvh`, tidak pernah `h-screen`.
- Jarak antarbagian 4rem. Gutter samping 24px.
- Tidak ada elemen yang saling menimpa. Setiap elemen punya ruangnya sendiri.
- Tidak ada deretan tiga kartu sama besar.
- Gambar bisa ditambahkan nanti tanpa mengubah tata letak. Foto dimuat malas dan diberi rasio tetap.

## 6. Motion & Interaction

- Pegas default `stiffness: 100, damping: 20` untuk semua kemunculan elemen.
- Bagian muncul dengan naik 24px dan memudar masuk, sekali saja.
- Sampul terangkat keluar saat undangan dibuka.
- Satu gerak berulang yang halus: bentuk pil pada judul bernapas perlahan. Hitung mundur berdetak tiap detik.
- Hanya `transform` dan `opacity` yang dianimasikan.
- `prefers-reduced-motion` mematikan semua gerak.

## 7. Anti-Patterns (Banned)

- Tanpa emoji.
- Tanpa font Inter dan serif generik.
- Tanpa hitam murni (#000000).
- Tanpa cahaya neon atau bayangan luar menyala.
- Tanpa kursor kustom.
- Tanpa teks pengisi seperti "Scroll untuk melanjutkan" atau panah gulir.
- Tanpa elemen bertumpuk.
- Tanpa hero yang dipusatkan.
- Tanpa tiga kartu sejajar sama besar.
- Tanpa klise bahasa promosi.
- Tanpa tautan gambar eksternal yang bisa rusak. Foto disimpan di `public/photos`.
