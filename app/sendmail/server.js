require('dotenv').config();
const Parser = require("rss-parser");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const firebaseAdmin = require('firebase-admin');

// Inisialisasi Firebase
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
const SUBSCRIBER_URL = "https://subscribesabda-default-rtdb.firebaseio.com/subscribers.json";
const LAST_SENT_URL = "https://subscribesabda-default-rtdb.firebaseio.com/lastsent.json";
const TEMPLATE_URL = "https://sabdaliterasi.xyz/templatemail.html";

// Konfigurasi nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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
        ['content:encoded', 'fullContent']
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
      console.log("Tidak ada artikel baru.");
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
          fullContent: article.fullContent
        });

        const mailOptions = {
          from: `New Articles Sabda Literasi <newarticles@sabdaliterasi.xyz>`,
          to: subscriber.email,
          subject: `Artikel Baru: ${article.title}`,
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

    // 7. Perbarui 'lastsent.json' dengan artikel yang baru saja dikirim
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
