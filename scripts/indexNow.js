const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');

// === 必填設定（請替換為你自己的 domain 與 key） ===
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'consult.revtel.tech'; // 你要提交的網站 domain
const KEY = '0779549ffd7b47a1bd6ad46ed7a834f2'; // IndexNow 金鑰
const SITEMAP_PATH = './public/sitemap.xml'; // 你要讀取的 sitemap 路徑

// ======================================================

async function loadSitemapUrls() {
  const xmlData = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const parser = new xml2js.Parser();

  const result = await parser.parseStringPromise(xmlData);

  // sitemap index or single sitemap
  let urls = [];

  if (result.urlset && result.urlset.url) {
    urls = result.urlset.url.map((u) => u.loc[0]);
  } else if (result.sitemapindex && result.sitemapindex.sitemap) {
    throw new Error('偵測到 sitemap index。請自行遞迴解析所有 sitemap 檔案。');
  } else {
    throw new Error('無法解析 sitemap.xml 格式。');
  }

  return urls;
}

async function sendToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await axios.post(INDEXNOW_ENDPOINT, payload, {
      headers: {'Content-Type': 'application/json'},
      timeout: 15000,
    });
    console.log('IndexNow 回應：', response.status, response.data);
  } catch (err) {
    console.error(
      'IndexNow 送出失敗：',
      err.response?.status,
      err.response?.data || err.message,
    );
  }
}

async function main() {
  console.log('讀取 sitemap...');
  const urls = await loadSitemapUrls();

  if (urls.length === 0) {
    console.log('sitemap 內沒有 URL。');
    return;
  }

  console.log(`共讀取 ${urls.length} 個網址，準備送出 IndexNow...`);
  await sendToIndexNow(urls);
}

main().catch((err) => console.error('程式發生錯誤：', err));
