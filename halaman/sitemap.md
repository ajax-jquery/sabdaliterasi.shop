---
layout: halaman
author: Sabda Literasi
title: Sitemap
description: Sitemap untul website ini.
permalink: /sitemap/
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [sitemap]
---
<div class="sitemaps" id="sitemaps">

  {% for tag in site.tags %}
  <div class="sMaps">
  <h4 class="sMapsT">{{ tag[0] }}</h4>
  {% assign TAG = tag | uniq %}
    <ul>
      {% for go in TAG[1] %}
      {% unless go.url contains '/amp/' %}
      <li><div class="iF"><div class="pThmb"><a class="thmb" aria-label="{{ go.title }}" href="{{ go.url | prepend: site.url }}" title="{{ go.title }}"><div style="background-image:url({{ go.image }}?width=360&height=202)"></div></a></div><div class="pCtnt"><div class="pInr"><div class="iTtl aTtl"><a href="{{ go.url | prepend: site.url }}">{{ go.title }}</a></div><div class="pSnpt"> {{ go.description }}</div><div class="pInf pSml" data-date='{{ go.date | date: "%b %d, %y" }}'></div></div></div></div></li>
 {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</div>
<script>
!function(e){var s=e.createElement("link");s.rel="stylesheet",s.id="sitemapCss",s.async=!0,s.href="/assets/js/plusui/css/sitemap.css";var t=e.getElementsByTagName("script")[0].parentNode.insertBefore(s,t)}(document);
</script>
