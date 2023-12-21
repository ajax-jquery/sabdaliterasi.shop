$(function(){
var scroll  = 'smooth';
var start = 1,
    max = 150,
    sitemap5Arr = new Array(),
    grup = new Array(),
    key = new Array(),
    abjad = '',
    print = '',
    nav = '';
    
  
    
    
    
    
function scrollSitemap5() {
  document.querySelectorAll('#sitemap5 div.nav div.ulng').forEach(function (Pp) {
    
  Pp.addEventListener('click', function () {
  var lii = document.querySelectorAll("#sitemap5 .badan li.serrcok");
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
  document.querySelectorAll('#sitemap5 .nav ol li').forEach(function (PpP) {
        PpP.addEventListener('click', function () {
           
         
   var ABJADD = '#sitemap5 .badan [data-value="' + this.innerHTML + '"]';
           
    document.getElementById("CariBook").reset();
    var input =  this.innerText;
	var filter = input.toLowerCase();
	var ul = document.getElementById("badan");
	var li = document.querySelectorAll("#sitemap5 .badan li.serrcok");
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
var url_wa = 'https://api.whatsapp.com/send/'; 
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
      url_wa = 'whatsapp://send/'; 
    }
if (kaka.length > 0){
        kaka1.innerHTML=''
          }
      else{
          kaka1.innerHTML='Maaf Ebook yang Anda cari belum kami input.<br>HUBUNGI PENJUAL UNTUK REQUEST EBOOK<br><a href="'+url_wa+'?phone=6285186666836&amp;text=Halo%20min%20saya%20ingin%20memesan%20Ebook%2Cberikut%20datanya%3A%0A---%0AJudul%3A%0APenulis%3A%0APenerbit%3A%0A---%0Asaya%20berharap%20bisa%20segerah%20di%20upload%20di%20https%3A%2F%2Fsabdaliterasi.shop" style="border: 2px solid; display: block; margin: 7px; padding: 2px; font-weight: 600;">KLIK DISINI</a>'
          }};
  
  
  
  function prosesMenu(){
	var input = document.getElementById("search-terms");
	var filter = input.value.toLowerCase();
	var ul = document.getElementById("badan");
	var li = document.querySelectorAll("#sitemap5 .badan li.serrcok");
	for(var i = 0; i<li.length; i++){
		var ahref = li[i];
      if (filter == ''){
      li[i].classList.add('hidden');
      document.getElementById('sitemap5').classList.add('hidden'); 
      }else if(ahref.getAttribute('data-search-term').toLowerCase().split(' ').join('').indexOf(filter.split(' ').join('')) > -1){
			li[i].classList.remove('hidden');
            li[i].classList.add('showw');
		}
      else{
		  li[i].classList.add('hidden');
          li[i].classList.remove('showw');
        Menunu();document.getElementById('sitemap5').classList.remove('hidden'); 
        }
      
	}
};
  
  function Cari(){
    var input = document.getElementById("search-terms");
	var filter = input.value.toLowerCase();
    var ul = document.getElementById("badan");
	var li = document.querySelectorAll("#sitemap5 .badan li.serrcok");
	var kaka1=document.getElementById('judul');
    
    
     if (filter !== ''){
   
   for(var i = 0; i<li.length; i++){
    li[i].classList.add('hidden');
    li[i].classList.remove('showw');
    }
    
       setTimeout(prosesMenu, 500);
       
       kaka1.innerHTML="<h3>Loading...</h3>"
       document.getElementById('sitemap5').classList.remove('hidden'); 
     }else{
     for(var i = 0; i<li.length; i++){
    li[i].classList.add('hidden');
    li[i].classList.remove('showw');
       kaka1.innerHTML=""
    }
     }
    
  
  }
  
  $(document).ready(function(){
  $(".search-button").click(function(){
    document.getElementById("search").reset();
    var li = document.querySelectorAll("#sitemap5 .badan li.serrcok");
    var kaka1=document.getElementById('judul');
    for(var i = 0; i<li.length; i++){
    li[i].classList.add('hidden');
    li[i].classList.remove('showw');
    kaka1.innerHTML=""
    document.getElementById('sitemap5').classList.add('hidden'); 
    }
  });
});
  document.addEventListener("click",function(e){
    document.getElementById("search").reset();
    var li = document.querySelectorAll("#sitemap5 .badan li.serrcok");
    var kaka1=document.getElementById('judul');
    for(var i = 0; i<li.length; i++){
    li[i].classList.add('hidden');
    li[i].classList.remove('showw');
    kaka1.innerHTML=""
    document.getElementById('sitemap5').classList.add('hidden'); 
    }
  })
