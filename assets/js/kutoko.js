function buildButtons(){let c={checkoutChat:!0,checkoutMarketplace:!0,checkoutLink:!0,checkoutLinkUrl:"",ckcText:"Pesan via Chat",ckmText:"Beli di Marketplace",cklText:"Pesan Sekarang"};themeOption(c);{let c=document.querySelector(".deskripsi-produk"),o=document.querySelector(".call-to-action2-wrap");if(c){let e=document.createElement("DIV"),t=document.createElement("DIV");e.setAttribute("class","call-to-action1"),t.setAttribute("class","call-to-action2"),c.appendChild(e),o.appendChild(t)}}var e=document.querySelector(".link-marketplace");let o=document.querySelector(".call-to-action1"),n=document.querySelector(".call-to-action2");function t(e,t,c){let o=document.createElement(c),n=document.createElement("SPAN");c=document.createTextNode(e);return o.setAttribute("class",t),n.appendChild(c),o.appendChild(n),o}var l=t(c.ckcText,"checkout-chat","BUTTON"),i=t(c.ckmText,"checkout-marketplace","BUTTON");let a=t(c.cklText,"checkout-link","A");function r(e,t){e&&(n&&n.appendChild(t),o&&o.appendChild(t.cloneNode(!0)))}a.setAttribute("rel","nofollow"),a.setAttribute("target","_blank"),""!=c.checkoutLinkUrl&&r(c.checkoutLink,a),r(c.checkoutChat,l),e&&e.innerHTML&&r(c.checkoutMarketplace,i);{let t=document.querySelectorAll(".checkout-link");for(let e=0;e<t.length;e++)t[e].href=c.checkoutLinkUrl;return}}function stickyButtons(){var e,t=document.querySelector(".call-to-action1");let c=document.querySelector(".call-to-action2-wrap");function o(){window.scrollY>e?(c.style.height=c.scrollHeight+"px",document.body.style.paddingBottom=c.scrollHeight+"px"):(c.style.height="0px",document.body.style.paddingBottom="0px")}t&&c&&(e=function(e){var t=0;if(e.offsetParent)for(;t+=e.offsetTop,e=e.offsetParent;);return t<0?0:t}(t),e+=t.scrollHeight,document.addEventListener("scroll",o),window.addEventListener("resize",o))}function popupCheckout(e,t,n){let l=document.querySelectorAll(e),a=document.querySelector(t);if(l&&a){let e=a.lastElementChild,t=document.createElement("BUTTON"),c="popup-opened",o=n;for(t.setAttribute("class","close-popup"),t.setAttribute("aria-label","close-popup"),e.appendChild(t),t.addEventListener("click",function(e){e.stopPropagation(),d(),r()}),document.addEventListener("keydown",function(e){"Escape"==e.key&&(s(),u())}),e.addEventListener("click",function(e){e.stopPropagation()}),a.addEventListener("click",function(e){e.stopPropagation(),s(),u()}),i=0;i<l.length;i++)l[i].addEventListener("click",function(e){lanjutBuy()});function r(){document.body.classList.toggle(c)}function u(){document.body.classList.remove(c)}function d(){a.classList.toggle(o)}function s(){a.classList.remove(o)}}}buildButtons(),stickyButtons(),popupCheckout(".checkout-chat","#cc-wrapper","cc-show"),popupCheckout(".checkout-marketplace","#cm-wrapper","cm-show");!function(){let A={nomorWa:"",waBtnText:"Chat Admin WA",waPesan:"Halo admin, saya mau order:",jmlhproduk:!0,maxJumlah:999,nama:!0,email:!0,notelp:!0,alamat:!0,provinsi:!0,kota:!0,kodepos:!0,pembayaran:!0,pembayaranTitle:"Metode Pembayaran",linkProduk:!0,rekbank:["BCA"],formError:"Form harus diisi semua",checkoutChatNote:"Harga belum termasuk ongkos kirim"},E=(themeOption(A),document.querySelector("#cc-main"));if(E){ {let e=document.querySelector(".post-body .harga-produk"),t=document.querySelector("#cc-main .cc-harga-produk strong");e&&t&&(e=e.lastChild,t.appendChild(e.cloneNode(!0)))}{var c=document.querySelector(".post-title .produk-stokhabis"),o=document.querySelector(".post-title .produk-pre-order");let e=document.querySelector("#cc-main .cc-harga-produk span");e&&(e.innerHTML=c?" <span class='ofs'>("+c.innerHTML+")</span>":o?" <span class='rds'>("+o.innerHTML+")</span>":" <span class='rds'>(Ready Stock)</span>")}{let n=E.querySelector(".cc-input"),e=E.querySelector(".cc-input-jmlhproduk"),t=E.querySelector(".cc-input-kontak"),a=E.querySelector(".cc-input-alamat"),r=E.querySelector(".cc-chat-wa-link");function l(e,t,a,r){if(e){let e=document.createElement("INPUT");e.setAttribute("type","text"),e.setAttribute("name",t),e.setAttribute("id",t),e.setAttribute("placeholder",a),r.appendChild(e)}}A.waBtnText&&(r.setAttribute("target","_blank"),r.lastElementChild.innerHTML="<span>"+A.waBtnText+"</span>");var c=A.jmlhproduk,o=A.maxJumlah,u="cc-jumlahproduk",i=e;if(c){let e=document.createElement("LABEL");c=document.createTextNode("Jumlah : ");e.setAttribute("for",u),e.appendChild(c);let t=document.createElement("INPUT");t.setAttribute("type","number"),t.setAttribute("name",u),t.setAttribute("id",u),t.setAttribute("value","1"),t.setAttribute("min","1"),t.setAttribute("max",o),i.appendChild(e),i.appendChild(t)}if(l(A.nama,"cc-namalengkap","Nama",t),l(A.email,"cc-alamatemail","Email",t),l(A.notelp,"cc-notelp","No.Telpon",t),l(A.alamat,"cc-alamatlengkap","Alamat",a),l(A.kota,"cc-alamatkota","Kota",a),l(A.provinsi,"cc-alamatprovinsi","Provinsi",a),l(A.kodepos,"cc-alamatkodepos","Kode Pos",a),A.pembayaran&&0<A.rekbank.length){ {c="cc-pembayaran";u=A.pembayaranTitle;let e=document.createElement("SELECT"),t=document.createElement("OPTION"),a=document.createTextNode(u);e.setAttribute("name",c),e.setAttribute("id",c),t.appendChild(a),e.appendChild(t),n.appendChild(e)}A.rekbank.forEach(function(e){let t=n.querySelector("#cc-pembayaran"),a=document.createElement("OPTION"),r=document.createTextNode(e);a.appendChild(r),t.appendChild(a)})}if(A.checkoutChatNote){let e=document.createElement("DIV");e.setAttribute("class","cc-checkout-note");o=document.createTextNode(A.checkoutChatNote);e.appendChild(o),E.appendChild(e)}}E.querySelector(".cc-chat-wa-link").addEventListener("click",function(d){let e=E.querySelector(".cc-nama-produk strong").textContent,t=E.querySelector(".cc-harga-produk strong").textContent,a=E.querySelector(".cc-harga-produk span span").textContent,p=document.querySelector(".cc-url-produk").innerText;e=encodeURI(e),a=encodeURI(a),t=encodeURI(t.replace(/\s+/g,"").trim());var r=E.querySelector("#cc-jumlahproduk"),n=E.querySelector("#cc-namalengkap"),c=E.querySelector("#cc-alamatemail"),o=E.querySelector("#cc-notelp"),l=E.querySelector("#cc-alamatlengkap"),u=E.querySelector("#cc-alamatkota"),i=E.querySelector("#cc-alamatprovinsi"),m=E.querySelector("#cc-alamatkodepos"),s=E.querySelector("#cc-pembayaran"),k=A.linkProduk?"%0aLink%20Produk: "+p:"",h=r?"%0aJumlah%20:%20*"+encodeURI(r.value)+"*":"",y=n?"%0aNama%20:%20*"+encodeURI(n.value)+"*":"",b=c?"%0aEmail%20:%20*"+encodeURI(c.value)+"*":"",S=o?"%0aNo.Telpon%20:%20*"+encodeURI(o.value)+"*":"",q=l?"%0aAlamat%20:%20*"+encodeURI(l.value)+"*":"",f=u?"%0aKota%20:%20*"+encodeURI(u.value)+"*":"",v=i?"%0aProvinsi%20:%20*"+encodeURI(i.value)+"*":"",C=m?"%0aKode%20Pos%20:%20*"+encodeURI(m.value)+"*":"",g=s?"%0aMetode%20Pembayaran%20:%20*"+encodeURI(s.value)+"*":"";let T=[r,n,c,o,l,u,i,m,s];T.forEach(function(e){null!==(e=e)&&(""===e.value||"0"===e.value||e.value===A.pembayaranTitle?(d.preventDefault(),e.classList.add("cc-input-error")):e.classList.remove("cc-input-error"))});{let e=document.querySelector(".input-has-error");0<document.querySelectorAll(".cc-input-error").length?e.innerHTML="<span>"+A.formError+"</span>":e.innerHTML=""}this.href="https://api.whatsapp.com/send?phone="+A.nomorWa+"&text="+A.waPesan,this.href+="%0aProduk : *"+e+"*",this.href+=h,this.href+="%0aTotal Harga : *"+t+"*",this.href+="%0aStok : *"+a+"*",this.href+=y+b+S,this.href+=q+f+v+C+g,this.href+=k}),A.jmlhproduk&&E.querySelector("#cc-jumlahproduk").addEventListener("input",function(){let e=E.querySelector(".cc-harga-produk strong"),t=document.querySelector(".post-body .harga-produk").lastChild,a=(t=t.textContent.replace(/\D/g,""),Number(t)*this.value);e.textContent="Rp"+a.toLocaleString("id-ID")});{let t=document.querySelector("#cm-wrapper .cm-links");[".link-marketplace .link-tokopedia",".link-marketplace .link-shopee",".link-marketplace .link-bukalapak",".link-marketplace .link-blibli",".link-marketplace .link-lazada",".link-marketplace .link-custom"].forEach(function(e){(e=document.querySelector(e))&&(e.setAttribute("target","_blank"),e.setAttribute("rel","nofollow"),t.appendChild(e))})}}else;}();function mobileNav(){let t=document.querySelector(".searchcontainer"),n=document.querySelector(".navmenu-button"),e=document.querySelector(".navmenu-desktop ul"),o=document.querySelector(".navmenu-mobile"),s=document.querySelector(".navmenu-mobile .navmenu-list"),l=document.querySelector(".navmenu-overlay");e&&s.appendChild(e.cloneNode(!0));{let o=document.querySelectorAll(".navmenu-mobile li.has-sub");for(let n=0;n<o.length;n++){let e=document.createElement("SPAN"),t=(e.setAttribute("class","ms-submenu-button"),o[n].insertBefore(e,o[n].lastElementChild),o[n].querySelector("ul"));e.addEventListener("click",function(){this.nextElementSibling.style.height?(this.nextElementSibling.style.height=null,this.classList.remove("ms-submenu-shown")):(this.nextElementSibling.style.height=t.scrollHeight+"px",this.classList.add("ms-submenu-shown"))})}}n.addEventListener("click",function(e){e.stopPropagation(),t.classList.contains("opensearch")&&t.classList.remove("opensearch"),o.classList.toggle("menu-opened"),this.classList.toggle("button-active"),document.body.classList.toggle("mobilemenu-opened")}),o.addEventListener("click",function(e){e.stopPropagation()}),document.addEventListener("click",function(e){e.stopPropagation(),o.classList.remove("menu-opened"),n.classList.remove("button-active"),document.body.classList.remove("mobilemenu-opened")}),l.addEventListener("click",function(){o.classList.remove("menu-opened")})}mobileNav();"use strict";function LMsearchForm(){let t=document.querySelector(".navmenu-button"),n=document.querySelector(".navmenu-mobile"),o=document.querySelector(".searchcontainer"),c=document.getElementById("search-terms"),e=document.querySelectorAll(".search-button");for(var s=0;s<e.length;s++)e[s].addEventListener("click",function(e){e.stopPropagation(),o.classList.toggle("opensearch"),n.classList.contains("menu-opened")&&(n.classList.remove("menu-opened"),t.classList.remove("button-active")),o.classList.contains("opensearch")||(c.blur(),e.preventDefault())});o.addEventListener("click",function(e){e.stopPropagation()}),document.addEventListener("click",function(e){o.classList.remove("opensearch"),c.blur(),e.stopPropagation()}),document.addEventListener("keydown",function(e){"Escape"==e.key&&(o.classList.remove("opensearch"),c.blur())})}LMsearchForm();!function(){let s=document.querySelector(".share-buttons");if(s){let e=s.querySelector("button"),t=s.querySelector(".share-links"),o=s.querySelector(".links");e.addEventListener("click",function(e){e.stopPropagation();e=t.scrollWidth;t.classList.toggle("show"),t.style.width?t.style.width=null:t.style.width=e+"px"}),document.addEventListener("click",function(e){e.stopPropagation(),t.style.width=null});{var a={shareFacebook:!0,shareTwitter:!0,shareWhatsapp:!0,shareTelegram:!0};var url_wa = 'https://api.whatsapp.com/send/'; if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){url_wa = 'whatsapp://send/'}function n(e){let t=document.createElement("BUTTON");return t.setAttribute("class",e),t.setAttribute("aria-label",e),t}themeOption(a);let e=n("share-fb"),t=n("share-tw"),s=n("share-wa"),r=n("share-tg");e.setAttribute("onclick","window.open('https://www.facebook.com/sharer.php?u="+encodeURI(sharePostUrl)+"', '_blank', 'width=400,height=300')"),t.setAttribute("onclick","window.open('https://twitter.com/intent/tweet?text="+encodeURI(sharePostTitle)+"&url="+encodeURI(sharePostUrl)+"', '_blank', 'width=400,height=300')"),s.setAttribute("onclick","window.open('"+url_wa+"?phone=&text="+encodeURI(sharePostTitle)+"%20%2D%20"+encodeURI(sharePostUrl)+"', '_blank', 'width=400,height=300')"),r.setAttribute("onclick","window.open('https://t.me/share/url?url="+encodeURI(sharePostUrl)+"&text="+encodeURI(sharePostTitle)+"', '_blank', 'width=400,height=300')"),a.shareFacebook&&o.appendChild(e),a.shareTwitter&&o.appendChild(t),a.shareWhatsapp&&o.appendChild(s),a.shareTelegram&&o.appendChild(r)}}}();!function(){var e=document.querySelector("#recent-container").querySelectorAll(".recent"),L={thumbnailRecentPosts:!0,jumlahRecentPosts:8};for(themeOption(L),i=0;i<e.length;i++){var t=e[i].querySelector(".recent-title .title"),s=t,n=e[i].querySelector(".recent-title .recent-title-link");t&&(t=(t=0<t.innerHTML.length?"/-/"+t.innerHTML:"").replace("&amp;","&"),t=rpplBlogUrl.replace(/.*?:\/\//g,"//")+"feeds/posts/default"+encodeURI(t)+"?alt=json&orderby=published&max-results="+L.jumlahRecentPosts,n.href=rpplBlogUrl.replace(/.*?:\/\//g,"//")+"search/label/"+encodeURI(s.innerHTML)+"?&max-results="+L.jumlahRecentPosts,(n=new XMLHttpRequest).x=i,n.open("GET",t,!0),n.responseType="json",n.onload=function(){var d=this.x;if(200===this.status){var p,u,e=this.response,t="#recent-item-content"+d,s=300,n=300,r="https://blogger.googleusercontent.com/img/a/AVvXsEgZ26_6DOEGZrh8BHctHaEhdt49Y0b3YfXoxAqd-9TXrmxHZ7fNcH1LdFQOy66t-SRlZcOBgIZVLTs7upXSezPblNIlzrfuJLOJUVa_LH-sZcVPlgSIjSQMYuPKYZFtUzPiGZ1OWy7DXNdwYAc7C9fLxEAGg-l_SbBKWewKg_9vbm2rBgFwHq4kc6U0=s600-c-rw",l="",e=(e=e).feed;if(t=document.querySelector(t))if(e.entry&&0!==e.entry.length){for(var h=e.entry,i=0;i<h.length;++i){for(var a,c=h[i],m=!1,o=c.media$thumbnail?c.media$thumbnail.url:r,g=c.title.$t,f=0,v=c.link.length;f<v;++f)"alternate"==(p=c.link[f]).rel&&(m=p.href);u="content"in c&&c.content.$t.match(/<div.class=.harga-produk.[\s\S]*?<\/div>/g)||"",o=(o=(o=(o=c.content&&o==r?(a=/<img +(.*?)src=(['"])([^'"]+?)(['"])(.*?) *\/?>/i.exec(c.content.$t))&&a[3]?a[3]:r:o).replace(/.*?:\/\//g,"//")).replace(/\/[w,s][0-9][0-9].*\//g,"/w"+s+"-h"+n+"-c-rw/")).replace(/=s72-[w,c].*/g,"=w"+s+"-h"+n+"-c-rw"),l+='<div class="item-post">',1==L.thumbnailRecentPosts&&(l=(l=l+'<div class="item-post-thumb"><a href="'+m+'">')+'<img width="'+s+'" height="'+n+'" alt="'+g.replace(/["']/g,"'")+'" src="'+o+'"/></a></div>'),l=(l=(l=(l+='<div class="item-post-summary">')+('<h2 class="item-post-title"><a href="'+m+'">'+g+"</a></h2>")+'<div class="item-post-snippet">')+u+"</div>")+"</div>"+"</div>"}t.innerHTML=l}else t.innerHTML="<p>No posts yet.</p>";else console.log("Container not found.");new Siema({selector:"#recent-item-content"+d,duration:300,easing:"ease-out",perPage:{300:1,480:2,768:3},startIndex:0,draggable:!0,multipleDrag:!1,threshold:20,loop:!1,rtl:!1,onInit:function(){let e=this,t=e.selector.parentElement,s=document.createElement("SPAN"),n=s.cloneNode(!0);s.setAttribute("class","next-slide"),n.setAttribute("class","prev-slide"),t.appendChild(n),t.appendChild(s),0===e.currentSlide&&n.classList.add("is-first");e.currentSlide===e.innerElements.length-e.perPage&&s.classList.add("is-last");s.addEventListener("click",function(){e.next()}),n.addEventListener("click",function(){e.prev()}),e.selector.classList.add("recent-loaded")},onChange:function(){let e=this,t=e.selector.parentElement,s=t.querySelector("span.next-slide"),n=t.querySelector("span.prev-slide");e.currentSlide===e.innerElements.length-e.perPage?s.classList.add("is-last"):s.classList.remove("is-last");0===e.currentSlide?n.classList.add("is-first"):n.classList.remove("is-first")}})}},n.send())}}();!function(){var e=document.querySelector(".gambar-produk"),t=document.querySelectorAll(".gambar-produk img"),n=document.querySelector("#banner-container"),i=document.querySelectorAll("#banner-container img"),l=document.querySelector("#testimonial-container"),c=document.querySelectorAll("#testimonial-container .testimonial-item"),o={loopProdukImage:!1,autoSlideProdukImage:!0,loopBanner:!0,autoSlideBanner:!0,loopTestimonial:!0,autoSlideTestimonial:!0,autoSlideTimer:3};if(themeOption(o),e&&1<t.length){let e=new Siema({selector:".gambar-slide",duration:300,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:o.loopProdukImage,rtl:!1,onInit:function(){a(this),r(this,o.loopBanner)},onChange:function(){s(this),d(this,o.loopProdukImage)}});o.autoSlideProdukImage&&window.addEventListener("load",function(){setInterval(function(){e.next()},1e3*o.autoSlideTimer)})}if(n&&1<i.length){let e=new Siema({selector:".banner-slide",duration:300,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:o.loopBanner,rtl:!1,onInit:function(){a(this)},onChange:function(){s(this)}});o.autoSlideBanner&&window.addEventListener("load",function(){setInterval(function(){e.next()},1e3*o.autoSlideTimer)})}if(l&&1<c.length){let e=new Siema({selector:".testimonial-widget",duration:300,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:o.loopTestimonial,rtl:!1,onInit:function(){r(this,o.loopTestimonial)},onChange:function(){d(this,o.loopTestimonial)}});o.autoSlideTestimonial&&window.addEventListener("load",function(){setInterval(function(){e.next()},1e3*o.autoSlideTimer)})}function a(e){let n=e,t=n.selector.parentElement,i=document.createElement("DIV");i.setAttribute("class","slider-indicator"),t.appendChild(i);for(let t=0;t<n.innerElements.length;t++){let e=document.createElement("SPAN");e.setAttribute("class","slider-nav"),t===n.currentSlide&&e.classList.add("active"),e.addEventListener("click",function(){n.goTo(t)}),i.appendChild(e)}}function r(e,t){let n=e,i=n.selector.parentElement,l=document.createElement("SPAN"),o=l.cloneNode(!0);l.setAttribute("class","next-slide"),o.setAttribute("class","prev-slide"),i.appendChild(l),i.appendChild(o),t||0===n.currentSlide&&o.classList.add("is-first"),l.addEventListener("click",function(){n.next()}),o.addEventListener("click",function(){n.prev()})}function s(e){var t=e;let n=t.selector.parentElement,i=n.querySelectorAll("span.slider-nav");for(let e=0;e<i.length;e++)e===t.currentSlide?i[e].classList.add("active"):i[e].classList.remove("active")}function d(i,e){if(!e){let e=i.selector.parentElement,t=e.querySelector("span.next-slide"),n=e.querySelector("span.prev-slide");i.currentSlide+1==i.innerElements.length?t.classList.add("is-last"):t.classList.remove("is-last"),0===i.currentSlide?n.classList.add("is-first"):n.classList.remove("is-first")}}}();function stickyHeader(){let e=document.querySelector("#header-wrapper"),s=e.scrollHeight;e.classList.add("is-sticky"),document.addEventListener("scroll",function(){document.body.scrollTop>s||document.documentElement.scrollTop>s?e.classList.add("is-scrolled"):e.classList.remove("is-scrolled")})}stickyHeader();function backToTop(){var o=document.querySelector(".call-to-action2-wrap"),t=document.querySelector(".scrollToTopBtn");o&&(t.style.bottom=o.scrollHeight+20+"px"),t.addEventListener("click",function(){document.documentElement.scrollTo({top:0,behavior:"smooth"})}),document.addEventListener("scroll",function(){300<window.scrollY?t.classList.add("showBtn"):t.classList.remove("showBtn")})}backToTop();!function(e){var t="darkmode"===localStorage.getItem("stylemode");let o=e.getElementById("darkmode-button"),d=o.querySelector(".darkmode");var a={darkMode:!0};themeOption(a),a.darkMode&&(d.checked=t,d.addEventListener("change",function(){"darkmode"===localStorage.getItem("stylemode")?(localStorage.setItem("stylemode","lightmode"),e.querySelector("body").classList.remove("dark")):(localStorage.setItem("stylemode","darkmode"),e.querySelector("body").classList.add("dark"))}))}(document);function toggleComment(){let t=document.querySelector("#comments .comments-title");t&&t.addEventListener("click",function(){this.parentElement.classList.toggle("comment-show")})}toggleComment();var msRelatedPosts,msRandomIndex;!function(){if("undefined"!=typeof relatedConfig){var e,c={postUrl:"",homePageUrl:"",relatedTitleOuterOpen:'<div class="ms-related-title"><p>',relatedTitleOuterClose:"</p></div>",relatedTitleText:"",thumbWidth:300,thumbHeight:300,noThumbImg:"https://blogger.googleusercontent.com/img/a/AVvXsEgZ26_6DOEGZrh8BHctHaEhdt49Y0b3YfXoxAqd-9TXrmxHZ7fNcH1LdFQOy66t-SRlZcOBgIZVLTs7upXSezPblNIlzrfuJLOJUVa_LH-sZcVPlgSIjSQMYuPKYZFtUzPiGZ1OWy7DXNdwYAc7C9fLxEAGg-l_SbBKWewKg_9vbm2rBgFwHq4kc6U0=s600-c-rw",imgBlank:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAVSURBVAiZYwwMDBRmQAJMDGiADAEAVsoBEGYuDZEAAAAASUVORK5CYII=",relatedOuter:"",thisArtikel:!1};for(e in relatedConfig)void 0!==relatedConfig[e]&&(c[e]=relatedConfig[e]);function l(e){var t=document.createElement("script");t.src=e,document.getElementsByTagName("head")[0].appendChild(t)}function A(e){var t,l,a=e.length;if(0===a)return!1;for(;--a;)t=Math.floor(Math.random()*(a+1)),l=e[a],e[a]=e[t],e[t]=l;return e}var g={relatedPosts:!0,jumlahRelatedPosts:4,relatedPostsThumb:!0,judulRelatedPosts:c.relatedTitleText},a=(themeOption(g),"object"==typeof postLabels&&0<postLabels.length?"/-/"+A(postLabels)[0]:"");msRelatedPosts=function(m){var e,h,t=c.relatedTitleOuterOpen+g.judulRelatedPosts+c.relatedTitleOuterClose,l=document.getElementById(c.relatedOuter),a=A(m.feed.entry);if(l){c.thisArtikel&&l.classList.add("msr-artikel"),t+=1==g.relatedPostsThumb?'<ul class="ms-related-hasthumb">':'<ul class="ms-related-nothumb">';for(var s=0;s<a.length;s++)for(var r=0,u=a[s].link.length;r<u;r++)a[s].link[r].href==c.postUrl&&a.splice(s,1);if(0!=a.length){if(0<a.length){for(var d=0;d<g.jumlahRelatedPosts&&d<a.length;d++){var i,o=a[d].title.$t;void 0!==a[d].content&&a[d].content.$t.indexOf("<img",0),h="content"in a[d]&&a[d].content.$t.match(/<div.class=.harga-produk.[\s\S]*?<\/div>/g)||"",i=(i=(i=(i="media$thumbnail"in a[d]?a[d].media$thumbnail.url:(i=/<img +(.*?)src=(['"])([^'"]+?)(['"])(.*?) *\/?>/i.exec(a[d].content.$t))&&i[3]?i[3]:c.noThumbImg).replace(/.*?:\/\//g,"//")).replace(/\/[w,s][0-9][0-9].*\//g,"/w"+c.thumbWidth+"-h"+c.thumbHeight+"-c-rw/")).replace(/=s72-[w,c].*/g,"=w"+c.thumbWidth+"-h"+c.thumbHeight+"-c-rw");for(var n=0,u=a[d].link.length;n<u;n++)e="alternate"==a[d].link[n].rel?a[d].link[n].href:"#";t+="<li>"+(1==g.relatedPostsThumb?'<div class="msr-thumb-outer"><a title="'+o+'" href="'+e+'"><img alt="'+o+'" class="msr-thumb lazyload" data-src="'+i+'" width="'+c.thumbWidth+'" height="'+c.thumbHeight+'"src="data:,"><div class="lazy-loading"></div></a></div>':"")+('<div class="msr-post-summary"><div class="msr-post-title"><a title="'+o+'" href="'+e+'">'+o+"</a></div>"+h+"</div>")+"</li>"}1==g.relatedPosts&&(l.innerHTML=t+="</ul>")}}else l.innerHTML=""}},msRandomIndex=function(e){var t=g.jumlahRelatedPosts+1,e=e.feed.openSearch$totalResults.$t-t,e=(e=0<e?e:1,Math.floor(Math.random()*(e-1+1))+1);l(c.homePageUrl.replace(/\/$/,"")+"/feeds/posts/default"+a+"?alt=json-in-script&orderby=updated&start-index="+e+"&max-results="+t+"&callback=msRelatedPosts")},l(c.homePageUrl.replace(/\/$/,"")+"/feeds/posts/summary"+a+"?alt=json-in-script&orderby=updated&max-results=0&callback=msRandomIndex")}}();!function(){var E,A,t={ajaxHomePagination:!0};themeOption(t),1==t.ajaxHomePagination&&(E=window,A=document,E.InfiniteScroll=function(n){function l(t,e){return(e=e||A).querySelectorAll(t)}function o(t){return void 0!==t}function a(t){return"function"==typeof t}function g(t,e){if(o(r[t]))for(var n in r[t])r[t][n](e)}function i(){return e.innerHTML=d.text.loading,H=!0,u?(p.classList.add(d.state.loading),g("loading",[d]),void t(u,function(t,e){p.className=v+" "+d.state.load,(c=A.createElement("div")).innerHTML=t;var n=l("title",c),o=l(d.target.post,c),r=l(d.target.anchors+" "+d.target.anchor,c),a=l(d.target.post,f),n=n&&n[0]?n[0].innerHTML:"";if(o.length&&a.length){a=a[a.length-1];A.title=n,a.insertAdjacentHTML("afterend",'<span class="fi" id="#fi:'+j+'"></span>'),c=A.createElement("div");for(var i=0,s=o.length;i<s;++i)c.appendChild(o[i]);a.insertAdjacentHTML("afterend",c.innerHTML),h(),u=!!r.length&&r[0].href,H=!1,j++,g("load",[d,t,e])}},function(t,e){p.classList.add(d.state.error),H=!1,h(1),g("error",[d,t,e])})):(p.classList.add(d.state.loaded),e.innerHTML=d.text.loaded,g("loaded",[d]))}function h(t){e.innerHTML="",T&&(c.innerHTML=d.text[t?"error":"load"],(t=c.firstChild).onclick=function(){return 2===d.type&&(T=!1),i(),!1},e.appendChild(t))}var s,d={target:{posts:".posts",post:".post",anchors:".anchors",anchor:".anchor"},text:{load:"%s",loading:"%s",loaded:"%s",error:"%s"},state:{load:(t="infinite-scroll-state-")+"load",loading:t+"loading",loaded:t+"loaded",error:t+"error"}},r={load:[],loading:[],loaded:[],error:[]},c=((d=function t(e,n){for(var o in e=e||{},n)e[o]="object"==typeof n[o]?t(e[o],n[o]):n[o];return e}(d,n||{})).on=function(t,e,n){return o(t)?o(e)?void(o(n)?r[t][n]=e:r[t].push(e)):r[t]:r},d.off=function(t,e){o(e)?delete r[t][e]:r[t]=[]},null),t=function(t,e,n){var o;E.XMLHttpRequest&&((o=new XMLHttpRequest).onreadystatechange=function(){4===o.readyState&&(200===o.status?e&&a(e)&&e(o.responseText,o):n&&a(n)&&n(o.responseText,o))},o.open("GET",t),o.send())},T=1!==d.type,H=!1,f=l(d.target.posts)[0],e=l(d.target.anchors)[0],u=l(d.target.anchor,e),L=A.body,p=A.documentElement,v=p.className||"",m=f.offsetTop+f.offsetHeight,M=E.innerHeight,y=0,x=null,j=1;return u.length&&(u=u[0].href,f.insertAdjacentHTML("afterbegin",'<span class="fi" id="#fi:0"></span>'),c=A.createElement("div"),h(),(s=function(){m=f.offsetTop+f.offsetHeight,M=E.innerHeight,y=L.scrollTop||p.scrollTop,H||y+M<m||i()})(),0!==d.type&&E.addEventListener("scroll",function(){T||(x&&E.clearTimeout(x),x=E.setTimeout(s,500))},!1)),d})}();!function(){let n=document.querySelector(".popup-box-wrapper");if(n){let a="popupbox-opened",s="pb-show",e=document.getElementById("close-popup"),o=document.querySelector(".popupbox-expiry-after"),u={popupBoxActive:!0,openPopupBoxAfter:4,disablePopupBoxDays:7};function p(e){var o=localStorage.getItem(e);if(!o)return null;o=JSON.parse(o);const p=new Date;return p.getTime()>o.expiry?(localStorage.removeItem(e),null):o.value}function t(){"yes"!==p("disablepopupbox")&&(n.classList.add(s),document.body.classList.add(a))}themeOption(u),u.popupBoxActive&&(o.innerText=u.disablePopupBoxDays,u.openPopupBoxAfter=1e3*u.openPopupBoxAfter,u.disablePopupBoxDays=86400*u.disablePopupBoxDays*1e3,p("disablepopupbox"),window.addEventListener("load",function(){setTimeout(t,u.openPopupBoxAfter)}),e.addEventListener("click",function(e){var o=document.querySelector("#disable-popupbox").checked;if(e.stopPropagation(),document.body.classList.remove(a),n.classList.remove(s),o){ {e="disablepopupbox";o="yes";var p=u.disablePopupBoxDays;const t=new Date;o={value:o,expiry:t.getTime()+p},localStorage.setItem(e,JSON.stringify(o))}console.log(u.disablePopupBoxDays)}}))}}(); 
/*Lazyload*/
function getThePrice(e,t){ null!==e&&(e=e.innerHTML.match(/<div.class=.harga-produk.[\s\S]*?<\/div>/g),t.innerHTML)} function getTheInfo(e,t){ var o=document.createElement("DIV");if(o.setAttribute("class","status-produk"),null!==e)for(var s=[e.innerHTML.match(/<div.class=.stok-habis.[\s\S]*?<\/div>/g),e.innerHTML.match(/<div.class=.promo.[\s\S]*?<\/div>/g),e.innerHTML.match(/<div.class=.produk-terlaris.[\s\S]*?<\/div>/g),e.innerHTML.match(/<div.class=.info-produk.[\s\S]*?<\/div>/g)],r=0;r<s.length;r++)null!==s[r]&&(o.insertAdjacentHTML("beforeend",s[r][0]),t.appendChild(o))} function customPostSnippet(){ for(var e,t,o=document.querySelectorAll(".post-outer"),s=0;s<o.length;s++)e=o[s].querySelector(".produk-snippet"),getThePrice(t=o[s].querySelector(".js-produk-snippet"),e),getTheInfo(t,e)} function customFeaturedPostSnippet(){ var e=document.querySelector(".featured-post-info .featured-desc");getThePrice(document.querySelector(".featured-post-info .js-featured-desc"),e)} function customPopularPostsSnippet(){ for(var e=document.querySelectorAll(".popular-post-info"),t=0;t<e.length;t++)popularPostsId=e[t].querySelector(".popular-post-snippet"),jsPopularPostsId=e[t].querySelector(".js-popular-post-snippet"),getThePrice(jsPopularPostsId,popularPostsId)}customFeaturedPostSnippet(),customPopularPostsSnippet(),customPostSnippet(),"undefined"!=typeof infinite_scroll&&infinite_scroll.on("load",function(){customPostSnippet()});Defer.dom("img.lazyload",100,"loaded",null,{rootMargin:"1px"}),"undefined"!=typeof infinite_scroll&&infinite_scroll.on("load",function(){Defer.dom("img.lazyload",100,"loaded",null,{rootMargin:"1px"})});
