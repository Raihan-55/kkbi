# Kamus Kecil Bahasa Indonesia (KKBI)

Aplikasi web modern untuk menemukan arti kata-kata Bahasa Indonesia berdasarkan KBBI. Dibangun sebagai Progressive Web App (PWA), aplikasi ini dapat diinstal di perangkat Anda dan berfungsi penuh bahkan saat offline.

## Memulai Proyek

Pastikan Anda sudah menginstal Node.js di sistem Anda (disarankan v18+).

### Buat Proyek React dengan Vite

Jika ingin membuat proyek baru dari awal, jalankan:

```bash
npm create vite@latest kkbi -- --template react
cd kkbi
```

Namun, untuk proyek ini, Anda cukup clone repo dan install dependensi.

### Instalasi Semua Dependensi

```bash
npm install
```

Jika ingin menambah/instal manual:

```bash
npm install lucide-react
npm install -D vite-plugin-pwa
npm install tailwindcss @tailwindcss/vite
```

### Mulai Koding

Struktur folder utama:

- `src/components` — komponen UI (navbar, dll)
- `src/pages` — halaman utama (SearchPage, ListPage, ProfilePage)
- `src/data` — data kamus statis (`kamus.js`)
- `public/` — aset gambar/icon/logo

### Mode Pengembangan

```bash
npm run dev
```

Akses aplikasi di `http://localhost:5173`

### Mode Produksi

```bash
npm run build
```

### Preview Produksi

```bash
npm run preview
```

### Pengujian PWA di Mobile

1. Build aplikasi dengan `npm run build`
2. Install serve untuk menjalankan folder dist hasil build:
   ```bash
   npm install -g serve
   ```
3. Jalankan server produksi:
   ```bash
   serve -s dist
   ```
4. Perhatikan alamat Network yang muncul di terminal (misal: http://192.168.1.10:3000).
5. Pastikan laptop dan HP Anda terhubung ke jaringan Wi-Fi yang sama.
6. Buka browser Chrome di HP Anda dan ketikkan alamat Network tadi.
7. Aplikasi akan terbuka, dan Anda akan melihat opsi untuk menginstalnya.

---

**Catatan:**

- Semua data kamus sudah statis, tidak ada API eksternal.
- Jika ingin menambah kata, edit file `src/data/kamus.js`.

---
