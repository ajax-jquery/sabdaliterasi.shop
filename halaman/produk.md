---
layout: halaman
author: Sabda Literasi
title: Produk
description: Menampilkan seluruh Produk.
permalink: /produk/
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [produk]
---
<style>.search-area{background:#f2f2f2;padding:10px;border:1px solid #f3f3f3;margin:10px;text-align:center;border-radius:10px}.codehim-ss-bar{padding:10px;box-sizing:border-box}.codehim-ss-bar input[type=text]{color:#444;caret-color:#000;font-size:10pt;width:80%;padding:13px;display:inline;background:#fff;border:1px solid #e6e6e6;outline:0;border-radius:30px 0 0 30px}.codehim-circle-search-button:hover{box-shadow:1px 2px 6px #444;color:#3ea055;background:#fff}.codehim-ss-bar input[type=text]:focus{background:#fff;box-shadow:1px 2px 8px #3ea055}.codehim-circle-search-button{display:inline-block;margin-left:-33px;border:0;outline:0;background:#052a49;color:#fff;width:50px;height:50px;cursor:pointer;transition:.3s;-webkit-transition:.3s;-moz-transition:.3s;font-size:14pt;border-radius:50%}.codehim-circle-search-button:before{content:"\e986";font-family:sugengidfont;font-weight:400}</style>
<div class='search-area'><div class='codehim-ss-bar'> <form id="CariProduk"><input onkeyup="cariproduk()" type='text' id="SerNOw" autocomplete="off" placeholder="Cari Ebook Di Sini..."/><button type="submit" class="codehim-circle-search-button" disabled> </button> </form> </div> </div>
<div class='post-container post-index'>
<div class='breadcrumbs-index'>
<div class='breadcrumbs'>
<span class='pagination-left' id="hasilo">Produk </span>
<span class='pagination-right'></span>
</div>
</div>
<div class='post-message-container'>
</div>
{% for post in site.posts %}
<article data-search-term="{{ post.title | replace: ' ','' | downcase }}{{ post.author | replace: ' ','' | downcase }}{{ post.description | replace: ' ','' | downcase }}" class="post-outer searproduk"> 
<script type="application/ld+json" >
/* BOOK */
{% if post.ISBN %}{"@context": "https://schema.org","@type":"Book","@id":"{{ post.url | prepend: site.url | replace: 'amp/','' }}#Book","name":"{{ post.title }}","url":"{{ post.url | prepend: site.url | replace: 'amp/','' }}","isbn":"{{ post.ISBN | replace: '-','' }}","bookFormat":"https://schema.org/Paperback","inLanguage":"id","author":{"@type":"Person","name":"{{ post.author }}","sameAs":"https://www.google.com/search?q={{ post.author }}" },"publisher": {"@type": "Organization","name": "{% if post.penerbit %}{{ post.penerbit }}{% else %}{{ post.author }}{% endif %}"},"sameAs":["{{ post.url | prepend: site.url | replace: 'amp/','' }}","https://www.google.com/search?q=ISBN {{ post.ISBN }}"],"workExample":[ {"@type":"Book","@id":"{{ post.url | prepend: site.url | replace: 'amp/','' }}#workExample","isbn":"{{ post.ISBN | replace: '-','' }}","bookFormat":"https://schema.org/Paperback","bookEdition":[{% for keywords in post.keyword limit:10 %}"{{keywords}}"{% if forloop.last == false %},{% endif %}{% endfor %}],"url":"{{ post.url | prepend: site.url | replace: 'amp/','' }}","inLanguage":"id","datePublished":"{{ post.date | date: '%Y-%m-%d' }}","sameAs":["{{ post.url | prepend: site.url | replace: 'amp/','' }}","https://www.google.com/search?q=ISBN {{ post.ISBN }}"],"potentialAction":{"@type":"ReadAction","target":{"@type":"EntryPoint","urlTemplate":"{{ post.url | prepend: site.url | replace: 'amp/','' }}?ISBN={{ post.ISBN }}","actionPlatform":[ "https://schema.org/DesktopWebPlatform","https://schema.org/AndroidPlatform","https://schema.org/IOSPlatform"]}}}]}{% endif %}
</script>
<div class="post"> <div class="img-thumbnail"><span class='sabda-bookmark-btn produkmark' data-quantity='1' data-borkimage='{{ post.image }}?resize=320%2C320&ssl=1' data-id='{{ post.url | replace: "/","" }}' data-link='{{ post.url | prepend: site.url }}' data-title='{{ post.title }}'><i class="fa-regular fa-bookmark"></i></span> <div class="ini-stokhabis">{{ post.author }}</div> <a href="{{ site.url }}{{ post.url }}"> <img alt="{{ post.title }}" class="lazy" data-src="{{ post.image }}" height="300" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" title="{{ post.title }}" width="300"> <div class="lazy-loading"></div> </a> </div> <div class="post-summary"> <div class="label-info"> <span>Ebook</span></div> <h2 class="post-title"> <a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a> </h2> <div class="post-snippet" id="post-snippet-{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"><div class="produk-snippet" id="produk-snippet{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"><div class="harga-produk">{{ post.harga }}</div><div class="Rate" data-id="{{ post.url }}"></div><div class="status-produk"><div class="info-produk">ORIGINAL</div></div></div> <div class="js-produk-snippet" id="js-produk-snippet-{{ post.buy | replace: 'https://lynk.id/sabdaliterasi/' , '' | upcase }}SL"></div></div></div></div></article>
{% endfor %}
  </div><div id="isi_produk"></div>




  

<script>
  var url_wa = 'https://api.whatsapp.com/send/';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){url_wa = 'whatsapp://send/'};  
function noproduk(){      
var kaka=document.getElementsByClassName('showw');
var kaka1=document.getElementById("hasilo");
if (kaka.length > 0){
        kaka1.innerHTML='Total Ebook: '+kaka.length
          }
      else{
          kaka1.innerHTML='Maaf Ebook yang Anda cari belum kami input.<br>HUBUNGI PENJUAL UNTUK REQUEST EBOOK<br><a href="'+url_wa+'?phone={{ site.hp }}&amp;text=Halo%20min%20saya%20ingin%20memesan%20Ebook%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fsabdaliteari.shop" style="border: 2px solid; display: block; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>'
          }};
  function cariproduk(){
	var input = document.getElementById("SerNOw");
	var filter = input.value.toLowerCase();
	var ul = document.getElementById("isi_produk");
	var li = document.querySelectorAll("article.searproduk");
	for(var i = 0; i<li.length; i++){
		var ahref = li[i];
		if(ahref.getAttribute('data-search-term').toLowerCase().indexOf(filter.split(' ').join('')) > -1){
			li[i].classList.remove('hidden');
            li[i].classList.add('showw');

		}
      else{
			li[i].classList.add('hidden');
          li[i].classList.remove('showw');   
        }
noproduk()
	}
}; 

function PARams(){
  var e=function e(a=null){if(null===a)return null;for(var t,i=[],l=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),s=0;s<l.length;s++)t=l[s].split("="),i.push(t[0]),i[t[0]]=t[1];return i[a]}("ebook"),a=e.toLowerCase().replace("#","").split("%20").join("");console.log(a),document.getElementById("isi_produk");for(var t=document.querySelectorAll("article.searproduk"),i=0;i<t.length;i++){t[i].getAttribute("data-search-term").toLowerCase().indexOf(a.split(" ").join(""))>-1?(t[i].classList.remove("hidden"),t[i].classList.add("showw")):(t[i].classList.add("hidden"),t[i].classList.remove("showw"));var l=document.getElementsByClassName("showw"),s=document.getElementById("hasilo");l.length>0?s.innerHTML="Hasil dari:  <i>"+e.toUpperCase().replace("#","").split("%20").join(" ")+"</i><br/> Total Ebook: "+l.length:s.innerHTML='Maaf Ebook yang Anda cari (<i>'+e.toUpperCase().replace("#","").split("%20").join(" ")+'</i>) belum kami input.<br>HUBUNGI PENJUAL UNTUK REQUEST EBOOK<br><a href="'+url_wa+'?phone={{ site.hp }}&amp;text=Halo%20min%20saya%20ingin%20memesan%20Ebook%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fsabdaliteari.shop" style="border: 2px solid; display: block; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>',document.getElementById("ulng").style.display="flex"}}
  
  </script>
