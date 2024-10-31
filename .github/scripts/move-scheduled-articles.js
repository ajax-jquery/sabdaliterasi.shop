const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const timezone = process.env.TIMEZONE || 'Asia/Makassar';
const draftArtikelDir = '_drafartikel';
const draftAmpDir = '_draftamp';
const artikelDir = '_artikel';
const ampDir = '_amp';

// Fungsi untuk memindahkan file jika sudah waktunya terbit
function moveFileIfPublished(draftDir, publishDir) {
  fs.readdirSync(draftDir).forEach(file => {
    const filePath = path.join(draftDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const dateMatch = content.match(/^date:\s*['"](.+?)['"]/m);
    if (dateMatch) {
      const publishDate = moment.tz(dateMatch[1], timezone);
      const currentDate = moment().tz(timezone);

      // Tambahkan log untuk memastikan tanggal publish dan tanggal sekarang
      console.log(`File: ${file}`);
      console.log(`Publish Date: ${publishDate.format()}`);
      console.log(`Current Date: ${currentDate.format()}`);

      // Periksa apakah waktu publikasi sudah lewat
      if (currentDate.isAfter(publishDate)) {
        const targetPath = path.join(publishDir, file);
        fs.renameSync(filePath, targetPath);
        console.log(`Moved: ${file} to ${publishDir}`);
      } else {
        console.log(`Skipping: ${file} (not yet time to publish)`);
      }
    } else {
      console.log(`Date not found in: ${file}`);
    }
  });
}

// Memindahkan artikel yang sudah melewati tanggal publikasi
moveFileIfPublished(draftArtikelDir, artikelDir);
moveFileIfPublished(draftAmpDir, ampDir);
