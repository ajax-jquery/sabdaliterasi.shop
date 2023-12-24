---
layout: halaman
author: Sabda Literasi
title: Produk
description: Menampilkan seluruh Produk.
permalink: /produk/
image: https://sabdaliterasi.shop/media/android-icon-512x512
keyword: [produk]
---
<style>.search-area{background:#f2f2f2;padding:10px;border:1px solid #f3f3f3;margin:10px;text-align:center;border-radius:10px}.codehim-ss-bar{padding:10px;box-sizing:border-box}.codehim-ss-bar input[type=text]{color:#444;caret-color:#000;font-size:10pt;width:80%;padding:13px;display:inline;background:#fff;border:1px solid #e6e6e6;outline:0;border-radius:30px 0 0 30px}.codehim-circle-search-button:hover{box-shadow:1px 2px 6px #444;color:#3ea055;background:#fff}.codehim-ss-bar input[type=text]:focus{background:#fff;box-shadow:1px 2px 8px #3ea055}.codehim-circle-search-button{display:inline-block;margin-left:-33px;border:0;outline:0;background:#052a49;color:#fff;width:50px;height:50px;cursor:pointer;transition:.3s;-webkit-transition:.3s;-moz-transition:.3s;font-size:14pt;border-radius:50%}.codehim-circle-search-button:before{content:"\f002";font-family:FontAwesome;font-weight:400}#result .judul{border-radius:30px;background-color:#052a49;font-size:150%;color:#fff;font-weight:500;text-align:center;margin-bottom:20px;padding:15px}#sitemap4{font-size:14px;font-weight:400}#sitemap4 .judul{border-radius:30px;background-color:#052a49;font-size:150%;color:#fff;font-weight:500;text-align:center;margin-bottom:20px;padding:15px}#sitemap4 ol,#sitemap4 ol li{list-style-type:none}#sitemap4 .nav ol{margin:0 0 15px;padding:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;align-items:center;justify-content:center}#sitemap4 .nav ol li{border-radius:10px;border:3px outset #ffffffb3;background-color:#052a49;color:#fff;padding:7px 0;cursor:pointer;margin:0 5px 5px 0;text-align:center;text-transform:uppercase;width:40px}#sitemap4 .nav ol li:last-child{margin-right:0}#sitemap4 .badan .list-produk:nth-of-type(even){background-color:#e9e9e975}#sitemap4 .badan .list-produk:nth-of-type(odd){background-color:#ffffff3d}@media screen and (max-width:480px){#sitemap4{font-size:13px}#sitemap4 .judul{padding:10px}#sitemap4 .badan .abjad{padding:7px 15px}}@media screen and (max-width:360px){#sitemap4{font-size:12px}#sitemap4 .judul{padding:10px}#sitemap4 .badan .abjad{padding:7px 12px}#sitemap4 .badan .list-produk{padding:7px 12px}}</style>
<div class='search-area'><div class='codehim-ss-bar'> <form id="CariBook"><input onkeyup="prosesMenu()" type='text' id="TypeNow" autocomplete="off" placeholder="Cari Ebook Di Sini..."/><button type="submit" class="codehim-circle-search-button" disabled> </button> </form> </div> </div>

<script>$(function(){
var scroll  = 'smooth';
var start = 1,
    max = 150,
    sitemap4Arr = new Array(),
    grup = new Array(),
    key = new Array(),
    abjad = '',
    print = '',
    nav = '';
    
  $.ajax({
    
    url:'https://zapier.com/engine/rss/17179753/sabdaliterasiv4',
    type:"get",
    dataType:"xml",
    success:function(data){


      
    var _0xd28cxd = document.getElementById('sitemap4');
    if (!_0xd28cxd) {
        return
    };
    _0xd28cxd.innerHTML = '';

    var FID1 = $(data).find("item");
    var feed1= $(FID1).find('item title');
    var feed2 = $(FID1).find("item author");
    var feed3 = $(FID1).find('item description');
    var feed4 = $(FID1).find('item link');
     
      
    if (FID1.length > 0) {
        for (var Xm = 0; Xm < FID1.length; Xm++) {
            var FIFID = FID1[Xm].innerHTML;
            var JUDUL = feed1[Xm].innerHTML;
            var BUY   = feed3[Xm].innerHTML;
            var IMAGE = feed2[Xm].innerHTML;
            for (var _0xd28cx12 = 0; _0xd28cx12 < FIFID.length; _0xd28cx12++) {
               
                    var URLL = feed4[Xm].innerHTML;
                    if (JUDUL && JUDUL.length > 0 && URLL && URLL.length > 0 && BUY && BUY.length > 0 && IMAGE && IMAGE.length > 0) {
                        sitemap4Arr.push({
                              "url": URLL,
                            "judul": JUDUL,
                           "gambar": IMAGE,
                         	"harga": BUY
                        })
                    };
                    break
                
            }
                
            
        };
        if (FID1.length >= max) {
            start += max;
            runsitemap4()
        } else {
            for (var ABJADD = sitemap4Arr, loopins = 0; loopins < ABJADD.length; loopins++) {
              var ANAN=ABJADD[loopins].judul.toLowerCase().split(' ').join('');
                var RsR = ANAN.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                if (abjad.indexOf(RsR) == -1) {
                    abjad += RsR;
                    grup[RsR] = [{
                       	 url: ABJADD[loopins].url,
                       judul: ABJADD[loopins].judul,
                      gambar: ABJADD[loopins].gambar,
                       harga: ABJADD[loopins].harga
                    }]
                } else {
                    grup[RsR].push({
                          "url": ABJADD[loopins].url,
                        "judul": ABJADD[loopins].judul,
                       "gambar": ABJADD[loopins].gambar,
                        "harga": ABJADD[loopins].harga
                    })
                }
            };
            for (var PpP in grup) {
                key.push(PpP)
            };
            var ABJADD = key.sort();
          
          
          
            for (var loopjad = 0; loopjad < ABJADD.length; loopjad++) {
               
              print += '';
                
              
              for (var XnX = 0, Qqq = grup[ABJADD[loopjad]]; XnX < Qqq.length; XnX++) {
                    var ZzZ = Qqq.sort(function (PpP, ABJADD) {
                        return PpP.judul > ABJADD.judul ? 1 : -1
                    });
                    print += '<div id="' + ABJADD[loopjad] + '" data-value="' + ABJADD[loopjad] + '" data-search-term="' + ZzZ[XnX].judul.toLowerCase().split(' ').join('') + '" class="list-produk serrcok"><a alt="' + ZzZ[XnX].judul + '" title="' + ZzZ[XnX].judul + '" href="' + ZzZ[XnX].url + '" target="_blank"><img loading="lazy" src="' + ZzZ[XnX].gambar + '" alt="' + ZzZ[XnX].judul + '"><h4>'+ZzZ[XnX].judul+'</h4><h5>Rp'+ ZzZ[XnX].harga +',-</h5></a><a class="tombol tombol-beli" href="' + ZzZ[XnX].url + '" target="_blank">BUY NOW</a></div>'
                };
              
              
              
                print += '';
                nav += '<li>' + ABJADD[loopjad] + '</li>'
            
            
            };
          
          
          
            _0xd28cxd.innerHTML = '<div id="judul" class="judul">Total Ebook: ' + sitemap4Arr.length + '</div><div class="nav"><ol>' + nav + '</ol><div class="ulng" id="ulng" style="display:none"><button class="reset">RESET</button></div></div><div class="badan" id="badan">' + print + '</div>';
            scrollsitemap4();GETpara();
        }
    }

    
      
    
   },
    error:function(){$("#result").html("<strong>Error loading feed!</strong>")}});
function scrollsitemap4() {
  document.querySelectorAll('#sitemap4 div.nav div.ulng').forEach(function (Pp) {
    
  Pp.addEventListener('click', function () {
  var lii = document.querySelectorAll("#sitemap4 .badan div.serrcok");
    for(var kk = 0; kk<lii.length; kk++){
      if(lii){
      lii[kk].classList.remove('hidden');
      lii[kk].classList.add('showw');
      };
      document.getElementById("CariBook").reset();
      var kam=document.getElementById('ulng');
   kam.style.display='none';    
      Menunu();
      }
    })
  });
  document.querySelectorAll('#sitemap4 .nav ol li').forEach(function (PpP) {
        PpP.addEventListener('click', function () {
           
         
   var ABJADD = '#sitemap4 .badan [data-value="' + this.innerHTML + '"]';
           
    document.getElementById("CariBook").reset();
    var input =  this.innerText;
	var filter = input.toLowerCase();
	var ul = document.getElementById("badan");
	var li = document.querySelectorAll("#sitemap4 .badan div.serrcok");
	for(var i = 0; i<li.length; i++){
		var ahref = li[i];
		if(ahref.getAttribute('data-value').toLowerCase().indexOf(filter) > -1){
			li[i].classList.remove('hidden');
            li[i].classList.add('showw');

          
		}else{
			li[i].classList.add('hidden');
            li[i].classList.remove('showw');
          
          

		
        
        
        
        
        
        
        
        
        
        
        
        
        }
      
Menunu()
      
      
      
	}
   
   var kam=document.getElementById('ulng');
   kam.style.display='flex';    
        
        })
    });
    
}



});
  
  
  
  function Menunu(){      
var kaka=document.getElementsByClassName('showw');
var kaka1=document.getElementById('judul');
if (kaka.length > 0){
        kaka1.innerHTML='Total Ebook: '+kaka.length
          }
      else{
          kaka1.innerHTML='Maaf Ebook yang Anda cari belum kami input.<br>HUBUNGI PENJUAL UNTUK REQUEST EBOOK<br><a href="https://api.whatsapp.com/send?phone=6285186666836&amp;text=Halo%20min%20saya%20ingin%20memesan%20Ebook%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fwww.sophiainstitute.id%2Fpage%2Febook-shop" style="border: 2px solid; display: block; color: #FFF; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>'
          }};
  function prosesMenu(){
	var input = document.getElementById("TypeNow");
	var filter = input.value.toLowerCase();
	var ul = document.getElementById("badan");
	var li = document.querySelectorAll("#sitemap4 .badan div.serrcok");
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
Menunu()
	}
};
  
function GETpara(){var e=function e(a=null){if(null===a)return null;for(var t,i=[],l=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),s=0;s<l.length;s++)t=l[s].split("="),i.push(t[0]),i[t[0]]=t[1];return i[a]}("ebook"),a=e.toLowerCase().replace("#","").split("%20").join("");console.log(a),document.getElementById("badan");for(var t=document.querySelectorAll("#sitemap4 .badan div.serrcok"),i=0;i<t.length;i++){t[i].getAttribute("data-search-term").toLowerCase().indexOf(a.split(" ").join(""))>-1?(t[i].classList.remove("hidden"),t[i].classList.add("showw")):(t[i].classList.add("hidden"),t[i].classList.remove("showw"));var l=document.getElementsByClassName("showw"),s=document.getElementById("judul");l.length>0?s.innerHTML="Hasil dari:  <i>"+e.toUpperCase().replace("#","").split("%20").join(" ")+"</i><br/> Total Ebook: "+l.length:s.innerHTML='Maaf Ebook yang Anda cari (<i>'+e.toUpperCase().replace("#","").split("%20").join(" ")+'</i>) belum kami input.<br>HUBUNGI PENJUAL UNTUK REQUEST EBOOK<br><a href="https://api.whatsapp.com/send?phone=6285186666836&amp;text=Halo%20min%20saya%20ingin%20memesan%20Ebook%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fwww.sophiainstitute.id%2Fpage%2Febook-shop" style="border: 2px solid; display: block; color: #FFF; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>',document.getElementById("ulng").style.display="flex"}}
  
  </script>
