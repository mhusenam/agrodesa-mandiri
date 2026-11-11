"use strict";

/* Data simulasi warga (tanpa backend) */
const dataWarga = {
  "3515010000000001": { nama: "Pak Sukardi", dusun: "Krajan", urea: 150, npk: 100 },
  "3515010000000002": { nama: "Bu Sri Wahyuni", dusun: "Sumber", urea: 50, npk: 0 }
};

const $ = id => document.getElementById(id);
const rupiah = n => "Rp" + n.toLocaleString("id-ID");
const tampilPesan = (el, teks, ok) => { el.textContent = teks; el.className = "pesan " + (ok ? "ok" : "err"); };
const tandai = (input, salah) => input.classList.toggle("salah", salah);

/* Navigasi */
const toggle = document.querySelector(".nav-toggle");
const menu = $("menu");
toggle.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", menu.classList.toggle("buka"));
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("buka"); toggle.setAttribute("aria-expanded", false); }
});
const tautan = [...menu.querySelectorAll("a")];
if ("IntersectionObserver" in window) {
  const pengamat = new IntersectionObserver(entri => {
    entri.forEach(en => {
      if (en.isIntersecting) tautan.forEach(a => a.classList.toggle("aktif", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section").forEach(s => pengamat.observe(s));
}

/* Cek jatah pupuk */
$("formNik").addEventListener("submit", e => {
  e.preventDefault();
  const nik = $("nik"), msg = $("pesanNik"), box = $("hasilNik"), v = nik.value.trim();
  box.hidden = true;
  if (!/^\d{16}$/.test(v)) { tandai(nik, true); return tampilPesan(msg, `NIK harus 16 digit angka (Anda mengisi ${v.length} karakter).`, false); }
  const w = dataWarga[v];
  if (!w) { tandai(nik, true); return tampilPesan(msg, "NIK tidak terdaftar. Layanan ini khusus warga desa terdaftar.", false); }
  tandai(nik, false);
  tampilPesan(msg, "NIK terdaftar.", true);
  box.innerHTML = `<h3>${w.nama}</h3><p>Dusun ${w.dusun}, kelompok tani ${$("poktan").value}</p>
    <p>Jatah Urea: <strong>${w.urea} kg</strong></p>
    <p>Jatah NPK: <strong>${w.npk} kg</strong>${w.npk === 0 ? " (kuota habis)" : ""}</p>`;
  box.className = "hasil";
  box.hidden = false;
});

/* Filter tabel alsintan */
let hanyaReady = false;
$("filterReady").addEventListener("click", e => {
  hanyaReady = !hanyaReady;
  e.target.setAttribute("aria-pressed", hanyaReady);
  e.target.textContent = hanyaReady ? "Tampilkan semua alat" : "Tampilkan hanya yang Ready";
  document.querySelectorAll("#tabelAlat tbody tr").forEach(tr => {
    tr.hidden = hanyaReady && tr.dataset.status !== "Ready";
  });
});
$("tglPinjam").min = new Date().toISOString().split("T")[0];

/* Form pinjam alat */
$("formAlat").addEventListener("submit", e => {
  e.preventDefault();
  const nik = $("nikAlat"), tgl = $("tglPinjam"), msg = $("pesanAlat"), v = nik.value.trim();
  const opt = $("alat").selectedOptions[0];
  tandai(tgl, false);
  if (!/^\d{16}$/.test(v)) { tandai(nik, true); return tampilPesan(msg, "NIK harus 16 digit angka.", false); }
  if (!dataWarga[v]) { tandai(nik, true); return tampilPesan(msg, "NIK tidak terdaftar. Layanan ini khusus warga desa.", false); }
  tandai(nik, false);
  if (!tgl.value) { tandai(tgl, true); return tampilPesan(msg, "Pilih tanggal pinjam.", false); }
  if (opt.dataset.status !== "Ready") return tampilPesan(msg, `${$("alat").value} sedang dipinjam. Pilih alat berstatus Ready.`, false);
  const hari = Number($("lama").value) || 1;
  tampilPesan(msg, `Pengajuan ${dataWarga[v].nama} untuk ${$("alat").value} selama ${hari} hari (${rupiah(Number(opt.dataset.tarif) * hari)}) sudah diterima. Menunggu konfirmasi .`, true);
});


/* Pratinjau gambar alat pertanian */
const lightbox = $("lightbox");
const gambarDiperbesar = $("gambarDiperbesar");
const keteranganGambar = $("keteranganGambar");
document.querySelectorAll(".gambar-zoom").forEach(tombol => {
  tombol.addEventListener("click", () => {
    const gambar = tombol.querySelector("img");
    gambarDiperbesar.src = gambar.src;
    gambarDiperbesar.alt = gambar.alt;
    keteranganGambar.textContent = tombol.closest("figure").querySelector("figcaption").textContent;
    lightbox.showModal();
  });
});
$("lightbox").querySelector(".lightbox-tutup").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.close();
});
