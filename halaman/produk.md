---
layout: halaman
author: Sabda Literasi
title: Produk
description: Menampilkan seluruh Produk.
permalink: /produk/
image: https://sabdaliterasi.shop/media/android-icon-512x512
keyword: [produk]
---
<div id="ms-related-post"><div class="ms-related-title"><p>All Produk</p></div><ul class="ms-related-hasthumb">
  {% for p in site.posts %}
 <li><div class="msr-thumb-outer"><a title="{{ p.title }}" href="{{ p.url | prepend: site.url }}"><img alt="{{ p.title }}" class="msr-thumb lazyload" data-src="{{ p.image }}" width="300" height="300" src="data:,"><div class="lazy-loading"></div></a></div><div class="msr-post-summary"><div class="msr-post-title"><a title="{{ p.title }}" href="{{ p.url | prepend: site.url }}">{{ p.title }}</a></div><div class="harga-produk">{{ p.harga }}</div></div></li>
  {% endfor %}
  </ul></div>
