---
layout: halaman
author: Sabda Literasi
title: Artikel
description: Menampilkan seluruh Artikel.
permalink: /artikel/
image: https://sabdaliterasi.shop/media/android-icon-512x512
keyword: [artikel]
---
<style>.search-area{background:#f2f2f2;padding:10px;border:1px solid #f3f3f3;margin:10px;text-align:center;border-radius:10px}.codehim-ss-bar{padding:10px;box-sizing:border-box}.codehim-ss-bar input[type=text]{color:#444;caret-color:#000;font-size:10pt;width:80%;padding:13px;display:inline;background:#fff;border:1px solid #e6e6e6;outline:0;border-radius:30px 0 0 30px}.codehim-circle-search-button:hover{box-shadow:1px 2px 6px #444;color:#3ea055;background:#fff}.codehim-ss-bar input[type=text]:focus{background:#fff;box-shadow:1px 2px 8px #3ea055}.codehim-circle-search-button{display:inline-block;margin-left:-33px;border:0;outline:0;background:#052a49;color:#fff;width:50px;height:50px;cursor:pointer;transition:.3s;-webkit-transition:.3s;-moz-transition:.3s;font-size:14pt;border-radius:50%}.codehim-circle-search-button:before{content:"\e986";font-family:sugengidfont;font-weight:400}</style>
<div class='search-area'><div class='codehim-ss-bar'> <form id="CariProduk"><input onkeyup="cariproduk()" type='text' id="SerNOw" autocomplete="off" placeholder="Cari Artikel Di Sini..."/><button type="submit" class="codehim-circle-search-button" disabled> </button> </form> </div> </div>
<div id="ms-related-post"><div class="ms-related-title"><p id="hasilo">all produk</p></div>
  <ul class="ms-related-hasthumb" id="isi_produk">
  {% for p in site.artikel %}
 <li data-search-term="{{ p.title | replace: ' ','' | downcase }}{{ p.description | replace: ' ','' | downcase }}" class="searproduk"><div class="msr-thumb-outer"><a title="{{ p.title }}" href="{{ p.url | prepend: site.url }}"><img alt="{{ p.title }}" class="msr-thumb lazyload" data-src="{{ p.image }}" width="300" height="300" src="data:,"><div class="lazy-loading"></div></a></div><div class="msr-post-summary"><div class="msr-post-title"><a title="{{ p.title }}" href="{{ p.url | prepend: site.url }}">{{ p.title }}</a></div><div class="harga-produk">{{ p.harga }}</div><div class="Rate" data-id="{{ p.permalink }}"></div></div></li>
  {% endfor %}
  </ul></div>

<script>
  var url_wa = 'https://api.whatsapp.com/send/';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){url_wa = 'whatsapp://send/'};  
function noproduk(){      
var kaka=document.getElementsByClassName('showw');
var kaka1=document.getElementById("hasilo");
if (kaka.length > 0){
        kaka1.innerHTML='Total Artikel: '+kaka.length
          }
      else{
          kaka1.innerHTML='Maaf Artikel yang Anda cari belum kami input.<br>HUBUNGI Admin UNTUK REQUEST Artikel<br><a href="'+url_wa+'?phone=6285186666836&amp;text=Halo%20min%20saya%20ingin%20memesan%20Artikel%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fsabdaliteari.shop" style="border: 2px solid; display: block; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>'
          }};
  function cariproduk(){
	var input = document.getElementById("SerNOw");
	var filter = input.value.toLowerCase();
	var ul = document.getElementById("isi_produk");
	var li = document.querySelectorAll("#ms-related-post .ms-related-hasthumb li.searproduk");
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
  var e=function e(a=null){if(null===a)return null;for(var t,i=[],l=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),s=0;s<l.length;s++)t=l[s].split("="),i.push(t[0]),i[t[0]]=t[1];return i[a]}("Artikel"),a=e.toLowerCase().replace("#","").split("%20").join("");console.log(a),document.getElementById("isi_produk");for(var t=document.querySelectorAll("#ms-related-post .ms-related-hasthumb li.searproduk"),i=0;i<t.length;i++){t[i].getAttribute("data-search-term").toLowerCase().indexOf(a.split(" ").join(""))>-1?(t[i].classList.remove("hidden"),t[i].classList.add("showw")):(t[i].classList.add("hidden"),t[i].classList.remove("showw"));var l=document.getElementsByClassName("showw"),s=document.getElementById("hasilo");l.length>0?s.innerHTML="Hasil dari:  <i>"+e.toUpperCase().replace("#","").split("%20").join(" ")+"</i><br/> Total Artikel: "+l.length:s.innerHTML='Maaf Artikel yang Anda cari (<i>'+e.toUpperCase().replace("#","").split("%20").join(" ")+'</i>) belum kami input.<br>HUBUNGI Admin UNTUK REQUEST Artikel<br><a href="'+url_wa+'?phone=6285186666836&amp;text=Halo%20min%20saya%20ingin%20memesan%20Artikel%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fsabdaliteari.shop" style="border: 2px solid; display: block; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>',document.getElementById("ulng").style.display="flex"}}
  
  </script>
