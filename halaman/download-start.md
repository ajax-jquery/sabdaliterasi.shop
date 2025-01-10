---
layout: halaman
author: Sabda Literasi
title: Download Ebook
harga: Rp0
description: Koleksi ebook terlengkap! Download gratis novel, komik, buku pelajaran, dan berbagai genre lainnya. Baca online atau offline kapanpun dan dimanapun.
permalink: /download/start
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [Download Ebook]
---
<style>#Download{font-family:Arial,sans-serif;margin:0;padding:0;display:flex;justify-content:center;align-items:center}#Download .container{background:#fff;padding:20px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,.1);text-align:center}#Download h1{font-size:24px;margin-bottom:20px}#Download button{border: none;display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:4px}#Download button:hover{background-color:#0056b3}
</style>
<div id="Download">
    <div class="container"> 
        <h1 id="file-title">File: Loading...</h1> 
        <button id="download-btn">Download</button> 
    </div>
</div>
<script>
        function base64Decode(base64) {
            const chars = 'AMNFCVYXSEIBTGUPOKJHDWRZLQamnfcvyxseibtgupokjhdwrzlq4529367810+/=';
            let str = '', bytes = [], buffer;
            for (let i = 0; i < base64.length; i += 4) {
                buffer = (chars.indexOf(base64[i]) << 18) |
                         (chars.indexOf(base64[i + 1]) << 12) |
                         (chars.indexOf(base64[i + 2]) << 6) |
                         chars.indexOf(base64[i + 3]);
                bytes.push((buffer >> 16) & 0xFF, (buffer >> 8) & 0xFF, buffer & 0xFF);
            }
            bytes = bytes.slice(0, bytes.length - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0));
            return decodeURIComponent(bytes.map(b => '%' + ('00' + b.toString(16)).slice(-2)).join(''));
        }
        const params = new URLSearchParams(window.location.search);
        const idEncoded = params.get('id');
        if (!idEncoded) {
            const storedLink = localStorage.getItem('shortnow');
            if (storedLink) {
                window.location.href = storedLink;
            }
        } 
        else {
            // Decode and parse JSON
            try {
                const decodedString = base64Decode(idEncoded);
                const fileInfo = JSON.parse(decodedString);

                // Update page content
const titleElement = document.getElementById('file-title');
const downloadButton = document.getElementById('download-btn');
titleElement.textContent = `File: ${fileInfo.title}`;
let downloadLink = fileInfo.id;
if (downloadLink.startsWith('https://github.com/')) {
downloadLink = downloadLink.replace(/https:\/\/github\.com\/(.*?)\/blob\/(.*?\/)path/,
                        'https://sabdaliterasi.xyz/wp-conten/file/cdn/gh/$1@$2path'
                    );
                }
                downloadButton.addEventListener('click', () => {
                const linkg = document.createElement( 'a' );
					linkg.href = downloadLink;
					linkg.click();
                });
                localStorage.setItem('shortnow', fileInfo.short);
            } catch (error) {
                console.error('Invalid base64 or JSON format.', error);
            }

            // Remove id parameter without refreshing
            const urlWithoutParams = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, urlWithoutParams);
        }
</script>
