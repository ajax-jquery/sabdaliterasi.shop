// path: server.js

const { TwitterApi } = require('twitter-api-v2');
const RSSParser = require('rss-parser');
const { Octokit } = require('@octokit/rest');
const fs = require('fs'); // Built-in Node.js module untuk membaca file
const yaml = require('js-yaml'); // Library untuk parsing YAML
require('dotenv').config();

const configu = yaml.load(fs.readFileSync('_config.yml', 'utf8'));

// GitHub API Token dan konfigurasi
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// URL RSS feed
const RSS_FEED_URL = 'https://sabdaliterasi.xyz/rss-mail.xml'; // Ganti dengan RSS Feed Anda
const REPO_OWNER = 'ajax-jquery'; // Ganti dengan username GitHub Anda
const REPO_NAME = 'sabdaliterasi.shop'; // Nama repository Anda
const FILE_PATH = 'app/post-twitter/lastpostlink.txt'; // Path ke file lastpostlink.txt di repo

const rssParser = new RSSParser();

// Fungsi untuk membaca lastpostlink.txt dari repository GitHub
async function getLastPostLink() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });
    // Konten file base64 decoding
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content.trim();
  } catch (error) {
    console.error('Error saat membaca file lastpostlink.txt:', error);
    return null;
  }
}

// Fungsi untuk menulis lastpostlink.txt ke repository GitHub
async function updateLastPostLink(postLink) {
  try {
    // Membaca file yang ada
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    const sha = currentFile.sha; // SHA dari file yang ada
    const encodedContent = Buffer.from(postLink).toString('base64'); // Encoding konten baru

    // Update file dengan konten baru
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: 'Update last post link',
      content: encodedContent,
      sha: sha,
    });

    console.log('File lastpostlink.txt berhasil diperbarui.');
  } catch (error) {
    console.error('Error saat memperbarui file lastpostlink.txt:', error);
  }
}

// Fungsi untuk mendapatkan artikel terbaru dari RSS feed
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

// Fungsi utama untuk memproses RSS feed dan memposting artikel terbaru
async function processRSSFeed() {
  const lastPostLink = await getLastPostLink(); // Membaca artikel terakhir yang diposting
  const articles = await fetchLatestArticles(); // Mendapatkan artikel terbaru dari RSS feed

  for (const article of articles.reverse()) {
    if (article.link === lastPostLink) {
      console.log('Tidak ada artikel baru untuk diposting.');
      break;
    }

const categories = article.categories || []; // Pastikan categories ada dalam RSS
const hashtags = categories.slice(0, 3).map(cat => `#${cat.replace(/\s+/g, '')}`).join(' ');
    
    const tweetContent = `${configu.title}-${article.title}\n${article.link}\n${hashtags}`;
    await postToTwitter(tweetContent);

    // Update link artikel terakhir yang diposting
    await updateLastPostLink(article.link);
  }
}

// Memanggil fungsi utama
processRSSFeed();
