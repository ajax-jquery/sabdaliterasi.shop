require('dotenv').config();
const Parser = require("rss-parser");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const firebaseAdmin = require('firebase-admin');
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
const RSS_URL = "https://sabdaliterasi.xyz/rss-product-mail.xml";
const SUBSCRIBER_URL = process.env.FIREBASE_SUBSCRIBER;
const LAST_SENT_URL = process.env.FIREBASE_LASTSENT;
const TEMPLATE_URL = "https://sabdaliterasi.xyz/templatemailproduct.html";
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
async function updateLastSentInFirebase(newLinks) {
  const db = firebaseAdmin.database();
  const ref = db.ref('lastsent');

  // Ambil data yang ada
  const snapshot = await ref.once('value');
  const existingData = snapshot.val() || {};

  // Gabungkan data baru dengan data yang sudah ada
  const updatedData = { ...existingData, link: newLinks };

  // Update data di Firebase
  await ref.set(updatedData);
  console.log("lastsent.json berhasil diperbarui di Firebase.");
}

// Fungsi utama
async function main() {
  const parser = new Parser({
    customFields: {
      item: [
        ['media:thumbnail', 'thumbnail'],
        ['media:content', 'contentMedia'],
        ['content:encoded', 'fullContent'],
        ['dc:creator','penulis'],
        ['dc:identifier','isbn'],
        ['dc:price','harga']
      ]
    }
  });

  try {
    console.log("Mengambil RSS feed...");
    const feed = await parser.parseURL(RSS_URL);

    console.log("Mengambil data subscriber...");
    const subscriberData = await fetchJSON(SUBSCRIBER_URL);
    const subscribers = Object.values(subscriberData); // Mengonversi objek ke array

    console.log("Mengambil data 'lastsent'...");
    const lastSentData = await fetchJSON(LAST_SENT_URL);
    const sentLinks = new Set(Object.values(lastSentData.link || {}));

    const newArticles = feed.items.filter((item) => !sentLinks.has(item.link));
    if (newArticles.length === 0) {
      console.log("Tidak ada produk baru.");
      return;
    }

    console.log("Mengambil template email...");
    const templateHTML = await fetchTemplate(TEMPLATE_URL);
    const compiledTemplate = handlebars.compile(templateHTML);

    console.log("Mengirim email...");
    const emailPromises = [];
    for (const subscriber of subscribers) {
      for (const article of newArticles) {
        const emailContent = compiledTemplate({
          title: article.title,
          Thumbnail: article.thumbnail ? article.thumbnail.$.url : "",
          link: article.link,
          fullContent: article.fullContent,
          penulis: article.penulis,
          harga: article.harga,
          isbn: article.isbn,
          surat: subscriber.email,
          nama: Pu.en(subscriber.email)
        });

        const mailOptions = {
          from: `New Ebook Sabda Literasi <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: `Ebook Untuk Anda: ${article.title}`,
          html: emailContent,
        };

        emailPromises.push(
          transporter.sendMail(mailOptions)
            .then(() => console.log(`Email berhasil dikirim ke ${subscriber.email}`))
            .catch((err) => console.error(`Gagal mengirim email ke ${subscriber.email}:`, err))
        );
      }
    }

    // Tunggu semua email dikirim
    await Promise.all(emailPromises);

    console.log("Email selesai dikirim.");

    // 7. Perbarui 'lastsent.json' dengan produk yang baru saja dikirim
    const updatedLinks = [...sentLinks, ...newArticles.map((item) => item.link)];
    await updateLastSentInFirebase(updatedLinks);

    console.log("File lastSentArticle.json berhasil diperbarui di Firebase.");
    
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  } finally {
    console.log("Proses selesai.");
    process.exit(0); // Pastikan untuk menutup proses dengan jelas
  }
}

// Jalankan fungsi utama
main().catch((err) => console.error("Error utama:", err)); 
  
