// Nama tamu dari tautan: https://domain.com/?to=Bapak%20Budi
// React menampilkan teks apa adanya, jadi aman dari injeksi HTML.
export function getGuestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get('to');
    if (!raw) return '';
    return raw.trim().slice(0, 60);
  } catch {
    return '';
  }
}
