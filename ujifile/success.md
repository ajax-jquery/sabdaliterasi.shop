---
layout: halaman
author: Sabda Literasi
title: Pesan Terkirim
harga: Rp0
description: "Halaman untuk menghubungi tim kami"
permalink: /success/
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [contact us]
---

<div style="text-align: center;"><span style="font-size: x-large;"><b><svg height="150" viewbox="0 0 24 24" width="150" xmlns="http://www.w3.org/2000/svg"><path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z" fill="#27f000"></path></svg></b></span></div><div style="text-align: center;"><span style="font-size: x-large;"><b>PESAN&nbsp;<span style="color: #11cf00;">BERHASIL</span> TERKIRIM</b></span></div>
<br /><div style="text-align: center;"><span style="color: #666666; font-size: large;">Anda akan dialihkan ke halaman utama dalam waktu <h2 style="text-align: center;"><i id="msg"></i></h2></span></div><div style="text-align: center;"><span style="color: #666666; font-size: large;"><br /></span></div>


<script>
            var url = "{{ site.url }}";
            var count = 10;
            function countDown() {
                if (count > 0) {
                    count--;
                    var waktu = count + 1;
                    $('#msg').html(waktu);
                    setTimeout("countDown()", 1000);
                } else {
                    window.location.href = url;
                }
            }
            countDown();
        </script>
