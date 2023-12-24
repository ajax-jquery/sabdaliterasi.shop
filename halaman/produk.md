---
layout: halaman
author: Sabda Literasi
title: Produk
description: Menampilkan seluruh Produk.
permalink: /produk/
image: https://sabdaliterasi.shop/media/android-icon-512x512
keyword: [produk]
---
{% for post in site.posts %}
<article class="post-outer"><div class="post"> <div class="img-thumbnail"> <div class="ini-stokhabis">{{ post.author }}</div> <a href="{{ site.url }}{{ post.permalink }}"> <img alt="{{ post.title }}" class="lazyload" data-src="{{ post.image }}" height="300" src="data:," title="{{ post.title }}" width="300"> <div class="lazy-loading"></div> </a> </div> <div class="post-summary"> <div class="label-info"> <span>Ebook</span></div> <h2 class="post-title"> <a href="{{ site.url }}{{ post.permalink }}">{{ post.title }}</a> </h2> <div class="post-snippet" id="post-snippet-{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"><div class="produk-snippet" id="produk-snippet{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"><div class="harga-produk">{{ post.harga }}</div><div class="Rate" data-id="{{ post.permalink }}"></div><div class="status-produk"><div class="info-produk">ORIGINAL</div></div></div> <div class="js-produk-snippet" id="js-produk-snippet-{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"></div></div></div></div></article>
{% endfor %}
