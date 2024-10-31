const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const timezone = process.env.TIMEZONE || 'Asia/Jakarta';
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

      if (currentDate.isAfter(publishDate)) {
        const targetPath = path.join(publishDir, file);
        fs.renameSync(filePath, targetPath);
        console.log(`Moved: ${file} to ${publishDir}`);
      }
    }
  });
}

// Memindahkan artikel yang sudah melewati tanggal publikasi
moveFileIfPublished(draftArtikelDir, artikelDir);
moveFileIfPublished(draftAmpDir, ampDir);
