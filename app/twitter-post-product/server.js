const { TwitterApi } = require('twitter-api-v2');
const RSSParser = require('rss-parser');
const { Octokit } = require('@octokit/rest');
const fs = require('fs'); // Built-in Node.js module untuk membaca file
const yaml = require('js-yaml'); // Library untuk parsing YAML
require('dotenv').config();

let Pu={Cr:"MBDRTNFJCAPOSQEIGWLHVYZUKXmbdrtnfjcaposqeigwlhvyzukx3508749216+/=",en:function(r){let e=Pu.Cr,t="",a=0;for(;a<r.length;){let h=r.charCodeAt(a++),c=r.charCodeAt(a++),n=r.charCodeAt(a++),o=h>>2,A=(3&h)<<4|c>>4,C=isNaN(c)?64:(15&c)<<2|n>>6,d=isNaN(n)?64:63&n;t+=e.charAt(o)+e.charAt(A)+e.charAt(C)+e.charAt(d)}return t},de:function(r){let e=Pu.Cr,t="",a=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");a<r.length;){let h=e.indexOf(r.charAt(a++)),c=e.indexOf(r.charAt(a++)),n=e.indexOf(r.charAt(a++)),o=e.indexOf(r.charAt(a++)),A=h<<2|c>>4,C=(15&c)<<4|n>>2,d=(3&n)<<6|o;t+=String.fromCharCode(A),64!==n&&(t+=String.fromCharCode(C)),64!==o&&(t+=String.fromCharCode(d))}return t}};


Hm_Key="X0jzU0WUSoYvZp5cV5AzHNBuYTX0mUrlLJQFQqB0mZhXZHNOYHAzYG==";

const configu = yaml.load(fs.readFileSync('../../_config.yml', 'utf8'));

// GitHub API Token dan konfigurasi
const octokit = new Octokit({
  auth: Pu.de(Hm_Key),
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// URL RSS feed
const RSS_FEED_URL = 'https://sabdaliterasi.xyz/rss-product-mail.xml'; // Ganti dengan RSS Feed Anda
const REPO_OWNER = 'ajax-jquery'; // Ganti dengan username GitHub Anda
const REPO_NAME = 'sabdaliterasi.shop'; // Nama repository Anda
const FILE_PATH = 'app/twitter-post-product/lastpostlink.txt'; // Path ke file lastpostlink.txt di repo

const rssParser = new RSSParser();

// Fungsi untuk membaca lastpostlink.txt dari repository GitHub
async function getLastPostLinks() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    // Konten file base64 decoding
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    // Parse konten sebagai JSON
    const links = JSON.parse(content);
    return links.link || [];
  } catch (error) {
    console.error('Error saat membaca file lastpostlink.txt:', error);
    return [];
  }
}


// Fungsi untuk menulis lastpostlink.txt ke repository GitHub
async function updateLastPostLinks(newLink) {
  try {
    // Membaca file yang ada
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    const sha = currentFile.sha; // SHA dari file yang ada
    const content = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const links = JSON.parse(content).link || [];

    // Tambahkan link baru jika belum ada
    if (!links.includes(newLink)) {
      links.push(newLink);
    }

    // Simpan kembali file dalam format JSON
    const updatedContent = JSON.stringify({ link: links }, null, 2);
    const encodedContent = Buffer.from(updatedContent).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: 'Update last post links',
      content: encodedContent,
      sha: sha,
    });

    console.log('File lastpostlink.txt berhasil diperbarui.');
  } catch (error) {
    console.error('Error saat memperbarui file lastpostlink.txt:', error);
  }
}


// Fungsi untuk mendapatkan Produk terbaru dari RSS feed
async function fetchLatestArticles() {
  try {
    const feed = await rssParser.parseURL(RSS_FEED_URL);
    return feed.items;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

// Fungsi untuk memposting tweet
async function postToTwitter(content) {
  try {
    const result = await twitterClient.v2.tweet(content);
    console.log('Tweet berhasil diposting:', result);
  } catch (error) {
    console.error('Error saat memposting ke Twitter:', error);
  }
}

// Fungsi utama untuk memproses RSS feed dan memposting Produk terbaru
async function processRSSFeed() {
  const lastPostLinks = await getLastPostLinks(); // Membaca semua link yang sudah dikirim
  const articles = await fetchLatestArticles(); // Mendapatkan Produk terbaru dari RSS feed

  for (const article of articles.reverse()) {
    if (lastPostLinks.includes(article.link)) {
      console.log(`Produk sudah pernah diposting: ${article.link}`);
      continue;
    }

    const categories = article.categories || [];
    const hashtags = categories.slice(0, 3).map(cat => `#${cat.replace(/\s+/g, '')}`).join(' ');

   const tweetContent = `Ebook ${article.title}\n#ebook #buku ${configu.populertag} ${hashtags}\n${article.link}`;
   await postToTwitter(tweetContent);

    // Tambahkan link Produk ke file
    await updateLastPostLinks(article.link);
  }
}


// Memanggil fungsi utama
processRSSFeed();
