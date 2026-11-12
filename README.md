# Website Anniversary ❤️

Website romantis interaktif: Opening → Matching Game → Puzzle → Surat → Foto → Kejutan Terakhir.
Hanya HTML, CSS, dan JavaScript biasa. Tidak perlu install apa pun selain VS Code.

## Isi folder

```
anniversary-website/
├── index.html      (kerangka halaman + isi surat)
├── style.css       (warna & tampilan)
├── script.js       (pengaturan utama + semua logika)
├── README.md
└── assets/
    ├── photos/     (foto galeri + final-photo.jpg)
    ├── puzzle/     (puzzle-photo.jpg)
    ├── music/      (song.mp3)
    └── icons/      (kosong, bebas dipakai)
```

## 1. Membuat folder project di VS Code

1. Ekstrak file ZIP hasil unduhan ke tempat yang mudah, misalnya `Documents`.
2. Buka VS Code, klik **File → Open Folder**, pilih folder `anniversary-website`.
3. Kalau muncul pertanyaan "Do you trust the authors?", pilih **Yes, I trust**.

## 2. Memasukkan foto

Salin foto ke folder `assets/photos/` dan **beri nama persis** seperti ini:

`photo-01.jpg`, `photo-02.jpg`, ... sampai `photo-20.jpg`, serta `final-photo.jpg` untuk layar terakhir.

- Tidak harus 20 foto. Foto yang tidak ada akan otomatis disembunyikan.
- Tips supaya cepat dibuka di HP: kecilkan foto ke lebar sekitar 1200 px (bisa pakai aplikasi Photos atau situs seperti squoosh.app).
- Pastikan ekstensinya `.jpg` huruf kecil. `Photo-01.JPG` bisa gagal muncul setelah di-deploy.
- Ingin nama file lain atau ekstensi `.png`? Ubah di daftar `photos` di `script.js`.

## 3. Mengganti foto puzzle

Taruh foto di `assets/puzzle/` dengan nama `puzzle-photo.jpg`. Foto akan otomatis dipotong persegi dari bagian tengah, jadi pilih foto yang wajah kalian ada di tengah. Kalau file belum ada, puzzle memakai gambar hati sementara.

## 4. Memasukkan lagu MP3

Taruh lagunya di `assets/music/` dengan nama `song.mp3`. Ukuran sebaiknya di bawah 8 MB. Mau nama lain? Ubah `music` di `script.js`. Musik baru mulai setelah tombol "Mulai Cerita Kita" ditekan (aturan browser). Di iPhone volume mengikuti tombol volume HP.

## 5. Mengganti isi surat

Buka `index.html`, cari tulisan **GANTI ISI CERITA MULAI DARI SINI**. Ganti teks di antara dua tanda komentar itu. Satu `<p>...</p>` = satu paragraf. Tambah paragraf dengan menyalin satu baris `<p>...</p>`.

## Pengaturan lain (di bagian atas `script.js`)

Cari `anniversaryConfig`. Di sana kamu bisa mengganti nama pasangan, namamu, tanggal anniversary, pesan opening, musik, caption foto, foto terakhir, dan pesan terakhir. Setiap bagian ada komentar bernomor.

## 6. Menjalankan dengan Live Server

1. Di VS Code, klik ikon kotak-kotak (Extensions), cari **Live Server** (pembuatnya Ritwick Dey), klik **Install**.
2. Klik kanan `index.html` → **Open with Live Server**.
3. Browser terbuka otomatis. Setiap kamu menyimpan file (Ctrl+S), tampilan ikut berubah.

## 7. Mencoba di smartphone

**Cara cepat (satu Wi-Fi):**
1. Pastikan laptop dan HP tersambung ke Wi-Fi yang sama.
2. Buka **Command Prompt** di laptop, ketik `ipconfig`, lalu Enter. Cari baris **IPv4 Address**, misalnya `192.168.1.5`.
3. Pastikan Live Server sedang jalan. Di browser HP ketik `http://192.168.1.5:5500` (ganti angkanya sesuai IPv4 kamu).
4. Kalau Windows menanyakan izin firewall, pilih **Allow**.

Cara lain: deploy dulu (langkah 8), lalu buka link-nya di HP.

## 8. Deploy gratis dengan GitHub Pages (lewat GitHub Desktop)

1. Buat akun di github.com, lalu install **GitHub Desktop** dan login.
2. Di GitHub Desktop: **File → Add local repository**, pilih folder `anniversary-website`. Kalau muncul tulisan "this directory does not appear to be a Git repository", klik **create a repository** lalu **Create repository**.
3. Isi kotak Summary (misalnya "versi pertama"), klik **Commit to main**.
4. Klik **Publish repository**. **Hilangkan centang "Keep this code private"** (GitHub Pages gratis butuh repository publik), lalu **Publish repository**.
5. Buka halaman repository di github.com → **Settings → Pages**. Di "Build and deployment", pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, klik **Save**.
6. Tunggu 1–3 menit, refresh halaman Pages.

Penting: repository publik artinya foto dan lagu bisa dilihat siapa pun yang tahu linknya. Pilih foto yang memang boleh dilihat orang lain.

Alternatif tanpa akun GitHub: buka **app.netlify.com/drop**, lalu seret folder `anniversary-website` ke halaman itu. Linknya langsung jadi.

Untuk update di kemudian hari: ubah file di VS Code, buka GitHub Desktop, **Commit to main**, lalu **Push origin**.

## 9. Mendapatkan URL website

Setelah langkah 5–6, link muncul di bagian atas halaman Settings → Pages dengan bentuk:

`https://NAMA-GITHUB-KAMU.github.io/anniversary-website/`

Buka link itu di HP dan coba dari awal sampai akhir.

## 10. Membuat QR Code bertema love

1. Buka **qrcode-monkey.com** (gratis).
2. Pilih tab **URL**, tempel link website.
3. Di **Set Colors** pilih warna burgundy tua dengan latar terang. Di **Customize Design** coba bentuk titik yang membulat atau bentuk hati bila ada, dan tambahkan logo hati kecil di tengah.
4. Klik **Create QR Code**, unduh dalam PNG (atau SVG kalau mau dicetak besar).
5. **Wajib tes scan** dengan kamera HP sebelum dicetak. Kalau sulit terbaca, buat kontras warna lebih tegas dan jangan terlalu kreatif dengan bentuknya.

## Kalau ada masalah

- **Musik tidak bunyi:** cek file `assets/music/song.mp3` ada dan namanya persis. Pastikan HP tidak dalam mode senyap.
- **Foto tidak muncul:** cek nama file (huruf kecil, `.jpg`) dan foldernya `assets/photos/`.
- **Tampilan tidak berubah setelah deploy:** tunggu beberapa menit, lalu refresh keras (Ctrl+F5 di laptop).
