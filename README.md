# AgroDesa Mandiri

Website layanan desa berbasis **web frontend** (HTML, CSS, JavaScript) untuk dua kebutuhan warga tani:

1. **Cek jatah pupuk bersubsidi** (Urea dan NPK) berdasarkan NIK.
2. **Penyewaan alat dan mesin pertanian** milik desa (combine harvester, traktor, pompa air, dll).

Proyek ini dibuat untuk **Ujian: Pemrograman Web Frontend**, dengan tema *permasalahan di desa*.

---

## 1. Latar Belakang Masalah

Di desa, pembagian pupuk subsidi dan peminjaman alat pertanian milik desa umumnya masih dicatat manual di balai desa atau Gapoktan. Akibatnya:

- warga harus datang langsung hanya untuk menanyakan sisa jatah pupuk;
- status alat (sedang dipinjam atau tersedia) tidak diketahui, sehingga warga bolak-balik;
- pengajuan pinjam alat tidak tercatat rapi dan berpotensi bentrok jadwal.

**AgroDesa Mandiri** menyediakan satu pintu informasi dan pengajuan secara daring sehingga warga dapat memeriksa jatah pupuk dan ketersediaan alat sebelum datang ke balai desa.

---

## 2. Fitur

| Fitur | Keterangan |
|---|---|
| Navigasi menu | Menu anchor ke tiap bagian, menu aktif otomatis berubah saat halaman di-scroll, dan menu berbentuk tombol di layar HP |
| Video dokumentasi | Video YouTube tersemat (`<iframe>`) di bagian beranda |
| Cek jatah pupuk | Input NIK 16 digit, divalidasi, lalu menampilkan jatah Urea dan NPK |
| Tabel alokasi pupuk | Alokasi per dusun beserta total |
| Tabel alat pertanian | Jenis alat, jumlah unit, tarif per hari, dan status (Ready atau Dipinjam) |
| Filter alat | Tombol untuk menampilkan hanya alat berstatus Ready |
| Formulir pinjam alat | Validasi NIK, tanggal, dan status alat, lalu menghitung biaya sewa otomatis |
| SOP dan panduan | Daftar berurutan (alur sewa) dan daftar poin (syarat pupuk, aturan alat) |
| Responsif | Tampilan menyesuaikan layar laptop dan HP |

---

## 3. Pemenuhan Ketentuan Soal Ujian

| No | Ketentuan Soal | Penerapan pada Proyek |
|---|---|---|
| 1 | Tema permasalahan desa | Pupuk subsidi dan peminjaman alat pertanian desa |
| 2 | Living Standard dan HTML semantik | `<!DOCTYPE html>`, `lang="id"`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<address>`, `<footer>`, serta `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<fieldset>`, `<label>` |
| 3 | Layout (header, navigasi, main menu, footer) | Header dengan logo dan navigasi tetap di atas (sticky), konten utama di `<main>`, dan `<footer>` berisi kontak serta jam layanan |
| 4 | Menu navigasi berfungsi | Anchor `#beranda`, `#pupuk`, `#alsintan`, `#sop` dengan smooth scroll dan penanda menu aktif |
| 5 | Daftar list | `<ol>` (alur sewa alat) dan `<ul>` (syarat pupuk, aturan combine harvester) |
| 5 | Multimedia | `<iframe>` video YouTube dan `<img>` (logo, foto alat) |
| 5 | Tabel | Tabel alokasi pupuk dan tabel ketersediaan alat |
| 5 | Formulir | Formulir cek NIK dan formulir pengajuan pinjam alat |
| 6 | CSS | `style.css`: variabel warna, Flexbox, CSS Grid, badge status, media query |
| 6 | JavaScript | `script.js`: validasi, simulasi data, filter tabel, scrollspy, perhitungan biaya |

---

## 4. Struktur Folder

```
agrodesa/
├── index.html      # struktur halaman (HTML semantik)
├── style.css       # seluruh tampilan (CSS)
├── script.js       # logika interaktif (JavaScript)
├── README.md       # dokumen ini
└── media/
    ├── logo.png
    ├── sawah.png
    ├── combine.png
    ├── traktor.png
    └── pompa.png
```

---

## 5. Cara Menjalankan

Proyek ini **statis** (tanpa backend dan tanpa instalasi).

**Cara 1: langsung**
1. Ekstrak folder proyek.
2. Klik ganda `index.html`.

**Cara 2: dengan Live Server (disarankan, terutama agar video YouTube tampil)**
1. Buka folder proyek di VS Code (**File → Open Folder**).
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.

> Video YouTube membutuhkan koneksi internet. Jika dibuka lewat `file://`, sebagian video dapat menampilkan pesan error. Gunakan Live Server untuk menghindarinya.

---

## 6. Data Uji Coba

Karena tidak memakai database, data warga disimulasikan di `script.js` (objek `dataWarga`).

| NIK | Nama | Jatah Urea | Jatah NPK |
|---|---|---|---|
| `3515010000000001` | Pak Sukardi | 150 kg | 100 kg |
| `3515010000000002` | Bu Sri Wahyuni | 50 kg | 0 kg (habis) |

**Skenario pengujian**

| Skenario | Langkah | Hasil yang diharapkan |
|---|---|---|
| NIK kurang dari 16 digit | Isi `12345`, klik Cek jatah | Pesan merah: NIK harus 16 digit |
| NIK tidak terdaftar | Isi `1111111111111111` | Pesan: NIK tidak terdaftar |
| NIK valid | Isi `3515010000000001` | Kartu hasil dengan jatah Urea dan NPK |
| NIK valid, NPK habis | Isi `3515010000000002` | Tertulis "kuota habis" pada NPK |
| Filter alat | Klik "Tampilkan hanya yang Ready" | Baris berstatus Dipinjam disembunyikan |
| Pinjam alat berstatus Dipinjam | Pilih Traktor Bajak, ajukan | Ditolak, diminta memilih alat Ready |
| Pinjam alat Ready | NIK valid, pilih Combine, isi tanggal, ajukan | Pengajuan diterima dan biaya sewa dihitung |

---

## 7. Teknologi

- **HTML5** (HTML Living Standard): struktur dan semantik
- **CSS3**: Flexbox, Grid, custom properties, media query
- **JavaScript (ES6+)**: DOM, event listener, regex, template literal, `IntersectionObserver`
- **Tanpa** framework, library, maupun backend

---

## 8. Keterbatasan

- Data bersifat simulasi di sisi klien. Pengajuan pinjam alat tidak tersimpan permanen dan akan hilang saat halaman dimuat ulang.
- Validasi NIK hanya memeriksa format (16 digit angka) dan pencocokan dengan data simulasi.
- Pengembangan lanjutan: backend dan database (Node.js, Laravel, dsb.), login warga, riwayat peminjaman, dan notifikasi.

---

## 9. Pembuat

- Nama: _(isi nama)_
- NIM: _(isi NIM)_
- Mata kuliah: Pemrograman Web Frontend
- Tahun: 2026
