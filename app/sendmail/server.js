require('dotenv').config();
const Parser = require("rss-parser");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const firebaseAdmin = require('firebase-admin');
const MAX_MAIL = 10;
let Pu={Cr:"MBDRTNFJCAPOSQEIGWLHVYZUKXmbdrtnfjcaposqeigwlhvyzukx3508749216+/=",en:function(r){let e=Pu.Cr,t="",a=0;for(;a<r.length;){let h=r.charCodeAt(a++),c=r.charCodeAt(a++),n=r.charCodeAt(a++),o=h>>2,A=(3&h)<<4|c>>4,C=isNaN(c)?64:(15&c)<<2|n>>6,d=isNaN(n)?64:63&n;t+=e.charAt(o)+e.charAt(A)+e.charAt(C)+e.charAt(d)}return t},de:function(r){let e=Pu.Cr,t="",a=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");a<r.length;){let h=e.indexOf(r.charAt(a++)),c=e.indexOf(r.charAt(a++)),n=e.indexOf(r.charAt(a++)),o=e.indexOf(r.charAt(a++)),A=h<<2|c>>4,C=(15&c)<<4|n>>2,d=(3&n)<<6|o;t+=String.fromCharCode(A),64!==n&&(t+=String.fromCharCode(C)),64!==o&&(t+=String.fromCharCode(d))}return t}};
// Inisialisasi Firebase
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZ2kAGZxIAQ/JK\n2p1z/GNQAtaK4aXsnpEmK26FlDvEu+BFszmdXY/qgRxQQpmiT3qphK3INZ0YzvOS\ns5ya+a1uI4B6DA/H9RM8f2aLc19Oj+S8DDbb/eSB731v6O4I53cEsFcCN2Ya22l2\nY0IBAcDpXklATh410FtnAmgYLH8eqrSTgRmgjl9a+a6QZ7CPd3Y0eVmlF/TDHpm0\nvoSXO6mesCvCWnCieSiWrvAN+iMeoHHO2vUyl5bPDq/5mE7QS8t0F7eaVQi/qNaX\nVvvfcAhSFXG4ZqjQRyyqKZH3LIkZ6HnXG1GJYmVBpe+Xm+1VcT8GDShFXOTRtOj6\nrjim8nEDAgMBAAECggEALEm8y3sJHgVxLmYPFC/PoN0oSDNbkak1rFCtUIuSxve0\nQCwvBiNEReOjtGDvm98YNssoQW1ZiyYrzIuipaQA7icPGVL2if986Znc+YCdK17V\nn+I+Ooa0LEk2CSx6tRp4UuO2MD+lR07o5Xj+K48HKsaG/JlgLeqMHTN+ppLMhxV3\nNAs4witPOdqZLETqdv2CZlhnSBv8yhYKF0CWBcogXO7D18NYUxZ9s6IINjHgE8Nf\nj6d8VCzN4pZtLKOjxqs5VX9WA4P263I344uIQfZejjtOD6vBK2DSxBy9saYG8V5W\n7RJgXdoMVKiVlFSQOiXzJq9G99gAWsg0IUSsMzb4EQKBgQDViQD6hRBv/uEM7AF5\nirgaADhI2ZA6ENJOT0Mglq989j9hZjcxUHIs9WxObNx9jp0elBqlJuU3AEiU5NQS\nYU2xcJPjCY8DLK+hBHHN/IX/H2Kyu0meYx3RUhctbz0UnXVvJNxGS7vsI0MoZKPc\nUUjDUyHhmG0eSzildLNU+JmaMQKBgQC4ctNf5A1ET5gVufJjHxms0u2HTmSlZdP7\nlrshemibJ9TkBtXyNFiRLHEkzhP2BcBlDZA3BxaJ2uMs53I1RzMGCTt4MsM77BIO\nxjsLYqh1u/i92WTCTSoIiRlnczKjOMQ2RRnIQCzn9dju9aiyPgYe3BO5tGFKXXhW\nJfFe4dy9cwKBgQCiMEeQANW1W1CwsemE2bpv9U7K9oU3tWMnm8iOziVIsvj9D9hI\nGqQ+RcMX5lOrAlGQ0klSu7JKDmsSvKPfugx7A9kwDyiS7rQPhwKxxGY6myoqO1r1\ndK9HOCTmm6E3MUnrO4Ib2pZIC5iM67QSOaMcyN3pLg9jfRrvgS5dEd4JYQKBgALd\ndb8Vkccv3VLpEoTLpOB0XlAtvY58KHDOBJYeiqVuVvY7zPL4MTAAGrnRoam+qSBo\nt4bDS2xUxBaceb+uHXLIje3uC+5QWm90UNJ6c9dwVgrM563E+RQs3QIoXe7/IL0f\nEal0pb3sqbP8iORL5lhwXrYRwTkgfpAIAtnQdFdVAoGAMViIQjbOvwusJn8bhqRc\n0u29qfbE18UMW+YyMU4sMGOB+DX/288lgqHSBc4Wp65KCeZKVv9I1SKRz70A4AK4\nmUGIXZmh45LUqRgufeCJfvTC+yQ6Vy0g7IowrABRfKmC0CiKX5QR7N8AQmt80+ib\nION8PtFnYO4uZrLXSZ2Jeu0=\n-----END PRIVATE KEY-----\n",
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com"
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Konstanta URL
const RSS_URL = "https://sabdaliterasi.xyz/rss-mail.xml";
const SUBSCRIBER_URL = process.env.FIREBASE_SUBSCRIBER;
const LAST_SENT_URL = process.env.FIREBASE_LASTSENT;
const SLUG_TO_MAIL_URL = process.env.SLUG_TO_MAIL;
const TEMPLATE_URL = "https://sabdaliterasi.xyz/templatemail.html";
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Fungsi utilitas
function formatName(e){return e.split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ")}
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal mendapatkan data dari ${url}`);
  }
  return await response.json();
}
async function fetchTemplate(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal mendapatkan template dari ${url}`);
  }
  return await response.text();
}

// Fungsi untuk memperbarui 'lastsent.json' di Firebase
async function updateFirebase(url, data) {
  const db = firebaseAdmin.database();
  const ref = db.ref(url);
  await ref.set(data);
  console.log(`${url} berhasil diperbarui di Firebase.`);
}
async function updateSlugToMail(slug, emails) {
  const db = firebaseAdmin.database();
  const ref = db.ref('SlugToMail');

  // Validasi slug untuk Firebase
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    throw new Error(`Slug tidak valid: "${slug}"`);
  }

  const sanitizedSlug = slug.replace(/[.#$\[\]/]/g, "_");

  // Ambil data yang ada
  const snapshot = await ref.once('value');
  const existingData = snapshot.val() || {};

  // Perbarui slug dengan email baru
  const updatedEmails = new Set([...(existingData[sanitizedSlug] || []), ...emails]);
  existingData[sanitizedSlug] = Array.from(updatedEmails);

  // Simpan kembali ke Firebase
  await ref.set(existingData);
  console.log(`Slug ${sanitizedSlug} berhasil diperbarui di SlugToMail.`);

  return existingData[sanitizedSlug];
}
// Fungsi utama
async function main() {
  const parser = new Parser({
    customFields: {
      item: [
        ['media:thumbnail', 'thumbnail'],
        ['media:content', 'contentMedia'],
        ['content:encoded', 'fullContent']
      ],
    },
  });

  try {
    console.log("Mengambil RSS feed...");
    const feed = await parser.parseURL(RSS_URL);

    console.log("Mengambil data subscriber...");
    const subscriberData = await fetchJSON(SUBSCRIBER_URL);
    const subscribers = Object.values(subscriberData);

    console.log("Mengambil data 'lastsent'...");
    const lastSentData = await fetchJSON(LAST_SENT_URL);
    const sentLinks = new Set(lastSentData.link || []);

    console.log("Mengambil data 'SlugToMail'...");
    const slugToMailData = await fetchJSON(SLUG_TO_MAIL_URL);

    const newArticles = feed.items.filter((item) => !sentLinks.has(item.link));
    if (newArticles.length === 0) {
      console.log("Tidak ada Artikel baru.");
      return;
    }

    console.log("Mengambil template email...");
    const templateHTML = await fetchTemplate(TEMPLATE_URL);
    const compiledTemplate = handlebars.compile(templateHTML);

    for (const article of newArticles) {
      // Ambil slug dari URL
      let slug = article.link.split('/').filter(Boolean).pop();

      // Validasi dan sanitasi slug
      if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        console.error(`Slug tidak valid untuk artikel dengan URL: ${article.link}`);
        continue; // Lewati artikel ini jika slug tidak valid
      }
      slug = slug.replace(/[.#$\[\]/]/g, '_'); // Pastikan slug valid untuk Firebase

      const sentEmailsForSlug = new Set(slugToMailData[slug] || []);

      const unsentSubscribers = subscribers.filter(
        (subscriber) => !sentEmailsForSlug.has(subscriber.email)
      );

      if (unsentSubscribers.length === 0) {
        console.log(`Semua email sudah menerima slug ${slug}.`);
        sentLinks.add(article.link); // Tambahkan artikel ke lastsent.json
        continue;
      }

      console.log(`Mengirim email untuk slug ${slug}...`);

      const getRandomDelay = () => Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
      const emailPromises = [];
      let emailCount = 0;

      for (const subscriber of unsentSubscribers) {
        emailPromises.push(
          (async () => {
            try {
              const emailContent = compiledTemplate({
          title: article.title,
          Thumbnail: article.thumbnail ? article.thumbnail.$.url : "",
          link: article.link,
          fullContent: article.fullContent,
          surat: subscriber.email,
          nama: Pu.en(subscriber.email),
              });

              const mailOptions = {
                from: `New Articles Sabda Literasi <${process.env.EMAIL_USER}>`,
                to: subscriber.email,
                subject: `Artikel Untuk ${formatName(subscriber.nama)}: ${article.title}`,
                html: emailContent,
              };

              await transporter.sendMail(mailOptions);
              console.log(`Email berhasil dikirim ke ${subscriber.email}`);
              return subscriber.email; // Email berhasil dikirim
            } catch (err) {
              console.error(`Gagal mengirim email ke ${subscriber.email}:`, err);
              return null; // Email gagal dikirim
            }
          })()
        );

        emailCount++;

  const delay = getRandomDelay(); 
  console.log(`${emailCount} Email tereksekusi, Menunggu selama ${delay / 1000} detik...`);
  await new Promise((resolve) => setTimeout(resolve, delay));
        
        if (emailCount % MAX_MAIL === 0) {
         console.log(`Berhasil mengeksekusi ke ${emailCount} Email, di lanjutkan menyimpan data ${emailCount} email ke SlugToMail...`);
          break
        }
      }

      const sentEmails = (await Promise.all(emailPromises)).filter(Boolean);

      // Perbarui SlugToMail
      if (sentEmails.length > 0) {
        console.log("Mulai Mengupdate SlugToMail...");
        await updateSlugToMail(slug, sentEmails);
      }

      // Periksa apakah semua email sudah menerima slug
      if (sentEmails.length + sentEmailsForSlug.size === subscribers.length) {
        console.log(`Semua email sudah menerima slug ${slug}. Menyimpan URL ke lastsent.json.`);
        sentLinks.add(article.link);
      } else {
        console.warn(
          `Beberapa email untuk slug ${slug} gagal dikirim. Akan dicoba lagi nanti.`
        );
      }
    }

    // Simpan lastsent.json jika ada URL baru
    if (sentLinks.size > lastSentData.link.length) {
      await updateFirebase('lastsent', { link: Array.from(sentLinks) });
    }

    console.log("Proses selesai.");
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  } finally {
    process.exit(0);
  }
}

// Jalankan fungsi utama
main().catch((err) => console.error("Error utama:", err));
