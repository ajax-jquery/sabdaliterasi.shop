function submitTryit() {
  const Path=PathThis;
const A=document.getElementById("postSplit");
    let K = A.querySelectorAll("h2,h3,h4,h5,h6,p,blockquote,ul,ol");
    var Q;
    for (let i=0;i < K.length;i++){
    
    Q+="<p class='read-aloud'>"+K[i].textContent.toLowerCase()+"</p>";
    
    };
  var artikel=document.documentElement.lang;
  
  var text = `
  <!DOCTYPE html>
<html lang="`+artikel+`">
<head>
<style>.ra-button {padding: .3em .9em; border-radius: .25em; background: linear-gradient(#fff, #efefef); box-shadow: 0 1px .2em gray; display: inline-flex; align-items: center; cursor: pointer;} .ra-button svg {height: 1em; margin: 0 .5em 0 0;}p.read-aloud { font-size: 1px; margin:0px;color: #fff0!important}div#postSplit{line-height: 0px; width: 100%;margin: 0; }#ra-player .ra-overlay {
    right: 0;
    display: none;
    position: absolute;
    z-index: 99999;
    background: linear-gradient(#fff, #efefef, #efefef);
    border-radius: 0 0 0.5em 0.5em;
    box-shadow: 0 1px 0.2em grey;
}#ra-player .ra-menu-item {
    width: calc(40.33% - 50px)!important;
    display: inline-flex !important;
}
#ra-player .ra-logo {
    width: 1px;
    font-size: 1px !important;
    text-shadow: 1px 1px #0000!important;
    color: #0000!important;
}
#ra-player .ra-menu-item:first-child {
    width: 1px!important;
}</style>
</head>
<body>
<div id="tts_article"><div id="ra-player" data-skin="https://assets.sitespeaker.link/embed/skins/default"><div class="ra-button" onclick="go()"> <svg viewBox="0 0 80 100"><polygon points="80,50 0,100 0,0 80,50" fill="#484848"/></svg> Listen to this article</div></div><audio id="ra-audio" data-lang="" data-voice="" data-key="afs537fsjdkr846ta241f263sfad25"></audio></div>
<div id="postSplit">`+Q.replaceAll('undefined','')+`</div>
<script>
const Path="`+Path+`"
</\script>
<script src="https://sabdaliterasi.shop/assets/html/voice.js?=v1"><\/script>
</body>
</html>
  `;
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("scrolling", "no");
  ifr.setAttribute("id", "iframeResult");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);
  var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
  ifrw.document.open();
  ifrw.document.write(text);  
  ifrw.document.close();
}
const collection = document.getElementById("_google_translator_element");
collection.addEventListener("change", function() {
document.getElementById("iframewrapper").innerHTML = "<pre>Reload Text to Speech...</pre>";
    
       setTimeout(submitTryit, 3000);
      
    
    
});
