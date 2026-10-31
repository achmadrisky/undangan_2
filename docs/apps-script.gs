/**
 * Backend RSVP dan ucapan memakai Google Sheets + Apps Script (gratis).
 * Cara pasang ada di README bagian 3.
 *
 * Kolom sheet "RSVP": Waktu | Nama | Kehadiran | Jumlah | Ucapan
 */
const SHEET_NAME = "RSVP";
const HEADERS = ["Waktu", "Nama", "Kehadiran", "Jumlah", "Ucapan"];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Batasi panjang dan cegah "formula injection" saat dibuka di Sheets/Excel
function clean_(value, max) {
  let s = String(value == null ? "" : value)
    .trim()
    .slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const name = clean_(data.name, 60);
    if (!name) return json_({ ok: false, error: "nama kosong" });

    const attendance = data.attendance === "hadir" ? "hadir" : "tidak";
    const guests =
      attendance === "hadir"
        ? Math.min(Math.max(parseInt(data.guests, 10) || 1, 1), 10)
        : 0;
    const message = clean_(data.message, 300);

    getSheet_().appendRow([new Date(), name, attendance, guests, message]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "permintaan tidak valid" });
  } finally {
    lock.releaseLock();
  }
}

// Hanya nama, kehadiran, dan ucapan yang dibuka ke publik. Jumlah tamu tetap privat.
function doGet(e) {
  if (e && e.parameter && e.parameter.action === "wishes") {
    const rows = getSheet_().getDataRange().getValues().slice(1);
    const wishes = rows
      .filter((r) => r[4])
      .reverse()
      .slice(0, 50)
      .map((r) => ({ name: r[1], attendance: r[2], message: r[4] }));
    return json_({ ok: true, wishes: wishes });
  }
  return json_({ ok: true });
}
