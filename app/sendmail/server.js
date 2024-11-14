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
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzR0rAYPxYD8NG\nAQf1zaVDbj3VK1sQfG10QjANpwdokXwmYO8xhadCWqisfbPKeRBlzN0FN4e3Mx7t\nzOWhnHWqNbUKxhl8ktAeAaFWbD/nEU/YpFSof3H2++lr7AAZmF0JlghA86W67ujD\nE3ZKMmBzT2MzMDIwNyhcJu3foe1dcNT6engq+6BU/mCiGLnVK0iEGrgpN0214jWp\n8jkw5pE/PFYpjI4KZSOwS81LbWx1+sRCmByj9t+RIay3WtKZUhw27v8+S14WP6DZ\nR8YnWwwp3dD2PqIkhqiGErwksb0nbk/G831QpbrjeuEhJRKUf1QXAKclTO5ZiC4D\nRpKZ9rdLAgMBAAECggEAQwuNVAaxOEmk0IBANteST3Zh31+YbcDqugiqqeBmL+AA\nmuWzbkS6eWEoJWHZJAZEcJ29pl7O/V872NjAo8C8bEwriXzuOR06gY5AhO50s3hQ\n8Qb7tgv7Vc99yuN2YhwN5zDZo1i7CP6hw5p6qWLPmS/+PD1w94EZMeVJHlITT9bq\ntr7JVdouk2UhhGoh4Oqbbxo/hXWiQk86pyDsD62SzPoAJlUV5GsHRGh9BNCW/G2w\nOKLZm99lw6e7Zxibg40n3a60wl+x2ppkr7sSOyZiWDXdgjFvKzUrR29zrnSj/Jk5\nJ46/OOITcu6VtWBfQ2MJUDGHA31kKFaRa6BFQ+Wr2QKBgQDosA2Q+kw0voOYz5lW\njssn5z+6iFr0lFI39YL0IF4VXKUiAPA2sLih/J8FwHo7GHCwXl/h1cNrKbjfbuCi\nYrAdcH+nkAZbPgtvSMyPmjQ5xxeOMwCeqEmjtrQczQ2E0+LJf7jirPhQR/TVd9JO\nBRPXQvQWfgLlUhkBHxyL6yTIRQKBgQDFPWfQwf4etJ3t66HdOK/yDSIy/uLjx9AN\nLkgb5N2mC+HinCRYVlpmkj4ZKG97Tm27tc+mf28hsDTzm67mCnFeZEP4O3D+RDbq\nsVrNXdF61sFQDwhlGVG/T+u5giZcpECf/xiGG6sIDrkFh9B/8CuLqyBt9wicTvHQ\ntfqd4pDiTwKBgQCj0MZMShr6iyHkpEsE6FTYi/KO5U57oCxeHyeJrXvvOCE91kFH\nj5T83fgquX6UOjmjwV1phfAlcuMn0kytpiLtJvWIR1piREUSnML/WoXoI2VPBFMs\nX7gwXQFiwW4CFJY2XAgS9cl/45jX7JqPuP1l8Eodx6tMPUdDRd74Fpz3rQKBgApd\nc7swtp3+d94s59CsTfK2ZfmwE1RNB83phLiSimNTdIdoFTDfONjzDnhb+5/LO1EF\n+OeTAtAOZnn20HYeTl7bfgbpeMKj6w7iSxdHut5tsrL2V0aY0gbvuD+Da2iq6Qp/\naVaC1bYSr/5uaLKQeHlagNXGiZlNPL/vEECDy4FZAoGBAMU4eRxIH9znlRulCcRL\nu2iGjzx9QLB7PwtngdSrxKEBqwFU1UEh7A0k4B1aGi04Nh1hQ6Vkfx9/wKZjsj4S\n/b3qUb/XnM8o0ghehC9EZvBuxYtO/HUz6pZi7V6YWx9WWJclVlRB4o4Te1oYmpp3\nN/g5P6V+RZ18pvXdWLxO3YsI\n-----END PRIVATE KEY-----\n",
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
const TEMPLATE_URL = "https://sabdaliterasi.xyz/templatemail.html";

require('dotenv').config();

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
          fullContent: article.fullContent,
          surat: subscriber.email,
          nama: Pu.en(subscriber.email)
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
