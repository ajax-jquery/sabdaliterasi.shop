
    let MyKey="eacd3c4c399d14aa8b1ccc929ef9a530",
      MyDomain="blondmails.com",
      MyPath="/"+bahasacode+Path.replace('/artikel/','/');
  let Pu={Cr:"MBDRTNFJCAPOSQEIGWLHVYZUKXmbdrtnfjcaposqeigwlhvyzukx3508749216+/=",en:function(r){let e=Pu.Cr,t="",a=0;for(;a<r.length;){let h=r.charCodeAt(a++),c=r.charCodeAt(a++),n=r.charCodeAt(a++),o=h>>2,A=(3&h)<<4|c>>4,C=isNaN(c)?64:(15&c)<<2|n>>6,d=isNaN(n)?64:63&n;t+=e.charAt(o)+e.charAt(A)+e.charAt(C)+e.charAt(d)}return t},de:function(r){let e=Pu.Cr,t="",a=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");a<r.length;){let h=e.indexOf(r.charAt(a++)),c=e.indexOf(r.charAt(a++)),n=e.indexOf(r.charAt(a++)),o=e.indexOf(r.charAt(a++)),A=h<<2|c>>4,C=(15&c)<<4|n>>2,d=(3&n)<<6|o;t+=String.fromCharCode(A),64!==n&&(t+=String.fromCharCode(C)),64!==o&&(t+=String.fromCharCode(d))}return t}};
const Hm_Key="X0jzU5BZror7S5ByrUWcQ3e3LYXkGxBCmYjXKqQqSFWzWxAQKshamz==";
function go(){
function ReadAloudWebSpeech(){var r,i,a,s=this,u=new function(){var o;this.speak=function(e){function n(){Promise.resolve(e.apply(i.this,i.args)).then(i.fulfill).catch(i.reject),i=r=null}function o(){return i&&i.reject(new Error("Aborted")),i={this:this,args:arguments},new Promise(function(e,t){i.fulfill=e,i.reject=t,r||(0<(e=o.notBefore-Date.now())?r=setTimeout(n,e):n())})}var r,i;return o.notBefore=Date.now(),o}(function(e,t,n){(o=new SpeechSynthesisUtterance).text=e,o.voice=t.voice,o.lang=t.lang,o.pitch=t.pitch,o.rate=t.effectiveRate,o.volume=t.volume;e=new Promise(function(e,t){o.onstart=e,o.onerror=function(e){"canceled"!=e.error&&t(new Error(e.error))}}).then(function(){o.onerror=function(e){"interrupted"!=e.error&&console.error(e.error)}});return o.onend=n,speechSynthesis.speak(o),e}),this.stop=function(){o&&(o.onend=null),speechSynthesis.cancel(),this.speak.notBefore=Date.now()+100},this.pause=function(){speechSynthesis.pause()},this.resume=function(){speechSynthesis.resume()},this.getVoices=function(e){var t;return function(){return t=t||e()}}(function(){return"undefined"==typeof speechSynthesis?Promise.resolve([]):new Promise(function(e){var t,n=speechSynthesis.getVoices()||[];n.length?e(n):(t=!1,speechSynthesis.onvoiceschanged=function(){t||(t=!0,e(speechSynthesis.getVoices()||[]))},setTimeout(function(){t||(t=!0,e([]))},3e3))}).then(function(e){return e.filter(function(e){return e.lang&&e.name})})})},c=(window.addEventListener("pagehide",u.stop.bind(u)),window.addEventListener("unload",u.stop.bind(u)),{lang:null,voice:null,rate:1,pitch:1,volume:1}),t=(Object.defineProperty(c,"isGoogleNative",{get:function(){return/^Google\s/.test(this.voice.name)}}),Object.defineProperty(c,"effectiveRate",{get:function(){return this.rate*(this.isGoogleNative?.9:1)}}),"IDLE"),n=/android/i.test(navigator.userAgent),o=Promise.resolve(null);function l(e){t!=e&&(e=t=e,n)&&"wakeLock"in navigator&&(o="PLAYING"==e?o.then(function(e){return console.log("acquiring wake lock"),e||navigator.wakeLock.request("screen")}):o.then(function(e){return console.log("releasing wake lock"),e&&e.release()}).then(function(){return null}))}Object.defineProperty(this,"currentTime",{get:function(){return a},set:function(e){a=Math.round(e),s.dispatchEvent(new Event("timeupdate")),"PAUSED"==t&&s.stop(),"PLAYING"==t&&(s.stop(),s.play())}}),Object.defineProperty(this,"duration",{get:function(){return i.length||1/0}}),Object.defineProperty(this,"voice",{get:function(){return c.voice},set:function(e){e&&(c.voice=e,s.dispatchEvent(new Event("voicechange")),"PAUSED"==t&&s.stop(),"PLAYING"==t)&&(s.stop(),s.play())}}),Object.defineProperty(this,"playbackRate",{get:function(){return c.rate},set:function(e){c.rate=e,s.dispatchEvent(new Event("ratechange")),"PAUSED"==t&&s.stop(),"PLAYING"==t&&(s.stop(),s.play())}}),Object.defineProperty(this,"volume",{get:function(){return c.volume},set:function(e){c.volume=e,s.dispatchEvent(new Event("volumechange")),"PAUSED"==t&&s.stop(),"PLAYING"==t&&(s.stop(),s.play())}}),this.isTTS=!0,this.voices=null,this.preload=function(){u.getVoices()},this.ready=function(t){return u.getVoices().then(function(e){return e.forEach(function(e){e.score=function(e,t){var n=e.lang.toLowerCase().split(/[-_]/),t=t.toLowerCase().split(/[-_]/),o=0;n[0]==t[0]&&(o+=1e3,n[1]==t[1]&&(o+=100),/^(Google |Microsoft \S+ Online)/.test(e.name)&&(o+=10),/^Microsoft (Aria|Ryan) Online/.test(e.name))&&(o+=1);return o}(e,t)}),e.filter(function(e){return 0<e.score})}).then(function(e){return s.voices=e,c.lang=t,c.voice=e.reduce(function(e,t){return!e||t.score>e.score?t:e},null),!!c.voice})},this.setText=function(e){var t,n,o;r=c.isGoogleNative?new g(u,16e3):u,e=e,t=c.lang,n=/^zh|ko|ja/.test(t),o=new(n?p:f),i=c.isGoogleNative?new h((/^(de|ru|es|id)/.test(t)?32:36)*(n?2:1)*c.effectiveRate,o).breakText(e):o.getParagraphs(e),a=0,s.dispatchEvent(new Event("timeupdate")),s.dispatchEvent(new Event("canplay"))},this.play=function(){return"PAUSED"==t?(l("PLAYING"),r.resume(),s.dispatchEvent(new Event("playing")),Promise.resolve()):"IDLE"==t?i.length?(a>=i.length&&(a=0,s.dispatchEvent(new Event("timeupdate"))),function e(){return r.speak(i[a],c,function(){a++,s.dispatchEvent(new Event("timeupdate")),a<i.length?e():(l("IDLE"),s.dispatchEvent(new Event("ended")))})}().then(function(){l("PLAYING"),s.dispatchEvent(new Event("playing"))})):Promise.resolve():void 0},this.pause=function(){!n&&r.pause?(r.pause(),l("PAUSED"),s.dispatchEvent(new Event("pause"))):s.stop()},this.stop=function(){r.stop(),l("IDLE"),s.dispatchEvent(new Event("pause"))};var d={};function h(u,c){function t(e){return r(c.getSentences(e),n)}function n(e){return r(c.getPhrases(e),o)}function o(e){for(var t=c.getWords(e),n=Math.min(Math.ceil(t.length/2),u),o=[];t.length;)o.push(t.slice(0,n).join("")),t=t.slice(n);return o}function r(e,r){function i(){s.parts.length&&(a.push(s.parts.join("")),s={parts:[],wordCount:0})}var a=[],s={parts:[],wordCount:0};return e.forEach(function(e){var t=c.getWords(e).length;if(u<t){i();for(var n=r(e),o=0;o<n.length;o++)a.push(n[o])}else s.wordCount+t>u&&i(),s.parts.push(e),s.wordCount+=t}),i(),a}this.breakText=function(e){return r(c.getParagraphs(e),t)}}function f(){function t(e,t){for(var n=[],o=0;o<e.length;o+=2){var r=o+1<e.length?e[o]+e[o+1]:e[o];r&&(t&&n.length&&t.test(n[n.length-1])?n[n.length-1]+=r:n.push(r))}return n}this.getParagraphs=function(e){return t(e.split(/((?:\r?\n\s*){2,})/))},this.getSentences=function(e){return t(e.split(/([.!?]+[\s\u200b]+)/),/\b(\w|[A-Z][a-z]|Assn|Ave|Capt|Col|Comdr|Corp|Cpl|Gen|Gov|Hon|Inc|Lieut|Ltd|Rev|Univ|Jan|Feb|Mar|Apr|Aug|Sept|Oct|Nov|Dec|dept|ed|est|vol|vs)\.\s+$/)},this.getPhrases=function(e){return t(e.split(/([,;:]\s+|\s-+\s+|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â\s*)/))},this.getWords=function(e){for(var t=e.trim().split(/([~@#%^*_+=<>]|[\s\-ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â/]+|\.(?=\w{2,})|,(?=[0-9]))/),n=[],o=0;o<t.length;o+=2)t[o]&&n.push(t[o]),o+1<t.length&&(/^[~@#%^*_+=<>]$/.test(t[o+1])?n.push(t[o+1]):n.length&&(n[n.length-1]+=t[o+1]));return n}}function p(){function t(e){for(var t=[],n=0;n<e.length;n+=2)n+1<e.length?t.push(e[n]+e[n+1]):e[n]&&t.push(e[n]);return t}this.getParagraphs=function(e){return t(e.split(/((?:\r?\n\s*){2,})/))},this.getSentences=function(e){return t(e.split(/([.!?]+[\s\u200b]+|[\u3002\uff01]+)/))},this.getPhrases=function(e){return t(e.split(/([,;:]\s+|[\u2025\u2026\u3000\u3001\uff0c\uff1b]+)/))},this.getWords=function(e){return e.replace(/\s+/g,"").split("")}}function g(o,r){var i;this.speak=function(e,t,n){return clearTimeout(i),i=setTimeout(function(){o.stop(),onEvent({type:"end",charIndex:e.length})},r),o.speak(e,t,function(){clearTimeout(i),n()})},this.stop=function(){clearTimeout(i),o.stop()}}this.addEventListener=function(e,t){d[e]?d[e].push(t):d[e]=[t]},this.removeEventListener=function(e,t){d[e]&&(d[e]=d[e].filter(function(e){return e!=t}))},this.dispatchEvent=function(t){d[t.type]&&d[t.type].forEach(function(e){e(t)})}}
function ReadAloudPlayer(o,t,a,e){var r={};!o.isTTS&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&a(".ra-no-ios").hide();a(".ra-logo",t).css("cursor","pointer").click(function(){window.open("https://www.readaloudwidget.com/","_blank")});var n=a(".ra-btn-play",t),i=a(".ra-btn-rewind",t),s=(n.click(function(){a(t).is(".ra-playing")?o.pause():o.play()}),i.click(function(){o.currentTime=Math.max(o.currentTime-(o.isTTS?1:5),0)}),a(".ra-btn[data-toggle]").click(function(){var e=a(this).data("toggle");return a(".ra-overlay",t).not(e).hide(),a(e).toggle(),!1}),a(document).on("mouseup touchend touchcancel",function(e){a(e.target).closest(".ra-btn[data-toggle], .ra-overlay").length||a(".ra-overlay",t).hide()}),a(".ra-time-text",t)),u=a(".ra-error-text",t),c=a(".ra-status-bg",t),l=a(".ra-load-progress-bar",t),d=a(".ra-playback-position-bar",t),h=a(".ra-seek-knob",t),f=(c.click(function(e){o.currentTime=T(c,e)*o.duration}),h.click(function(){return!1}),h.on("mousedown touchstart",function(){return r.seekKnob=!0,P(function(e){var e=T(c,e),t=100*e+"%";h.css("left",t),d.css("width",t),o.duration&&o.duration!=1/0&&S(e*o.duration)},function(e){r.seekKnob=!1,o.currentTime=T(c,e)*o.duration}),!1}),a(".ra-voice-select",t));o.isTTS?(o.voices.forEach(function(e){a("<option>").text(e.name).val(e.name).appendTo(f)}),f.val(o.voice.name),f.change(function(){var e=o.voices.find(function(e){return e.name==f.val()});e=e,o.voice=e,localStorage.setItem("sitespeakerVoice",e.name)})):f.parent().hide();var p=a(".ra-rate-bg",t),g=a(".ra-rate-bar",t),v=a(".ra-rate-knob",t);function m(e){o.playbackRate=e,localStorage.setItem("sitespeakerRate",e)}p.click(function(e){m(Math.exp((2*T(p,e)-1)*Math.log(2)))}),v.click(function(){return!1}),v.on("mousedown touchstart",function(){r.rateKnob=!0;var n=A(o.isTTS?500:100,m);return P(function(e){var e=T(p,e),t=100*e+"%";v.css("left",t),g.css("width",t),n(Math.exp((2*e-1)*Math.log(2)))},function(){r.rateKnob=!1}),!1});var y,w=a(".ra-volume-bg",t),b=a(".ra-volume-bar",t),E=a(".ra-volume-knob",t);function k(e){o.volume=e,localStorage.setItem("sitespeakerVolume",e)}w.click(function(e){k(T(w,e))}),E.click(function(){return!1}),E.on("mousedown touchstart",function(){r.volumeKnob=!0;var n=A(o.isTTS?500:100,k);return P(function(e){var e=T(w,e),t=100*e+"%";E.css("left",t),b.css("width",t),n(e)},function(){r.volumeKnob=!1}),!1}),a(o).on("progress",function(e){l.css("width",100*e.loaded/e.total+"%")}),a(o).on("playing",function(){a(t).addClass("ra-playing"),a(t).removeClass("ra-stalled ra-error")}),a(o).on("pause ended",function(){a(t).removeClass("ra-playing")}),a(o).on("error",function(){a(t).addClass("ra-error"),u.text(o.error.message)}),a(o).on("stalled",function(){a(t).addClass("ra-stalled")}),a(o).on("timeupdate",function(){var e;r.seekKnob||(e=100*o.currentTime/o.duration+"%",h.css("left",e),d.css("width",e),o.duration&&o.duration!=1/0&&S(o.currentTime))}),a(o).on("voicechange",function(){f.val(o.voice.name)}),a(o).on("ratechange",function(){var e;r.rateKnob||(e=50+50*Math.log(o.playbackRate)/Math.log(2)+"%",p.is(".ra-vertical")?(v.css("bottom",e),g.css("height",e)):(v.css("left",e),g.css("width",e)))}),a(o).on("volumechange",function(){var e;r.volumeKnob||(e=100*o.volume+"%",w.is(".ra-vertical")?(E.css("bottom",e),b.css("height",e)):(E.css("left",e),b.css("width",e)))}),o.isTTS&&(y=localStorage.getItem("sitespeakerVoice"))&&(n=o.voices.find(function(e){return e.name==y}))&&(o.voice=n);i=localStorage.getItem("sitespeakerRate")||e.defaultRate,i&&(o.defaultPlaybackRate=o.playbackRate=Number(i)),a(o).triggerHandler("ratechange"),n=localStorage.getItem("sitespeakerVolume")||e.defaultVolume;function P(t,n){function o(e){return e.clientX=e.originalEvent.changedTouches[0].clientX,e.clientY=e.originalEvent.changedTouches[0].clientY,t(e),!1}function r(e){return e.clientX=e.originalEvent.changedTouches[0].clientX,e.clientY=e.originalEvent.changedTouches[0].clientY,i(e),!1}function i(e){return a(document).off("mousemove",t),a(document).off("mouseup mouseleave",i),a(document).off("touchmove",o),a(document).off("touchend touchcancel",r),n&&n(e),!1}a(document).on("mousemove",t),a(document).on("mouseup mouseleave",i),a(document).on("touchmove",o),a(document).on("touchend touchcancel",r)}function T(e,t){var n=e.get(0).getBoundingClientRect(),e=e.is(".ra-vertical")?1-(t.clientY-n.top)/n.height:(t.clientX-n.left)/n.width;return Math.min(1,Math.max(e,0))}function S(e){var t;o.isTTS?s.text(Math.min(Math.round(e)+1,o.duration)+"/"+o.duration):s.text("-"+(e=o.duration-e,t=Math.floor(e/60),e=Math.floor(e-60*t),t<10?"0":"")+t+":"+(e<10?"0":"")+e)}function A(e,t){var n,o;return function(){o={this:this,args:arguments},n=n||setTimeout(r,e)};function r(){n=null,t.apply(o.this,o.args)}}n&&(o.volume=Number(n)),a(o).triggerHandler("volumechange")}
function ReadAloudDoc(i){var a=["H1","H2","H3","H4","H5","H6"],s=["P","BLOCKQUOTE","PRE"],r=["OL","UL"];function u(e){i(e).find("sup").hide(),i(e).find("*").filter(function(){return this.style&&"absolute"==this.style.position}).hide();var t=e.innerText.trim();return"LI"==e.tagName?i(e).index()+1+". "+t:t}function c(e){e=e?a.indexOf(e.tagName):-1;return-1==e?100:e+1}function l(e,t){return e==document.body?null:1==e.nodeType&&!t&&e.lastChild?e.lastChild:e.previousSibling||l(e.parentNode,!0)}function d(e){return e}this.getTexts=function(){0<i(".read-aloud").length||(0<i(".sitespeaker-read-aloud").length?i(".sitespeaker-read-aloud").addClass("read-aloud"):(e=function(e){for(var t=e.slice(0,1),n=1;n<e.length;n++)e[n]!=e[n-1]&&t.push(e[n]);return t}(e=i("p").not("blockquote > p").parent().get()),(e=i(e).filter(":visible").get()).length?(n=e.map(function(e){return i(e).children(s.join(", ")).text().length}),o=Math.max.apply(null,n),(e=e.filter(function(e,t){return n[t]>o/7})).forEach(function(e){i(function(e){var t=[],e=i(e).children(a.concat(s).join(", ")).get(0),n=c(e),o=l(e,!0);for(;o&&!i(o).hasClass("read-aloud");){var r;1==o.nodeType&&(r=c(o))<n&&(t.push(o),n=r),o=l(o)}return t.reverse()}(e)).addClass("read-aloud"),i(e).children(a.concat(s).join(", ")).addClass("read-aloud"),i(e).children(r.join(", ")).children("li").addClass("read-aloud")})):i(a.concat(s).join(", ")).filter(":visible").addClass("read-aloud")));var n,o,e=i(".no-read-aloud:visible").hide(),t=function(e){for(var t=i(e).get().map(u).filter(d),n=0;n<t.length;n++)/\w$/.test(t[n])&&(t[n]+=".");return console.log(t),t}(".read-aloud:visible");return e.show(),t}}
function readAloudInit(r,o,i){var e,t,a="free",s=(e=function(){return new ReadAloudWebSpeech},function(){return t=t||e()}),n=r.getAttribute("data-lang"),u=r.getAttribute("data-voice"),c=r.getAttribute("data-key"),l=r.getAttribute("data-speed")||r.getAttribute("data-rate"),d=r.getAttribute("data-volume"),h={lang:n,voice:u,key:c,defaultRate:l,defaultVolume:d};return u==a&&s().preload(),o&&i?v().then(function(){var e=o.getElementsByClassName("ra-btn-play")[0],t=function(){e.removeEventListener("click",t),/iPad|iPhone|iPod/.test(navigator.userAgent)&&(r.src="https://assets.readaloudwidget.com/embed/sound/silence.mp3",r.play(),"undefined"!=typeof speechSynthesis)&&speechSynthesis.speak(new SpeechSynthesisUtterance(" ")),f(h)};e.addEventListener("click",t)}):f(h);function f(n){return console.log("%cSabdaliterasi.xyz","font-family: fantasy; font-size: 2em;"),Promise.all([!window.jQuery&&m("https://sabdaliterasi.xyz/assets/js/jquery-3.7.1.min.js").then(eval)]).then(function(e){var t="function"==typeof readAloudGetText?readAloudGetText(jQuery):new ReadAloudDoc(jQuery).getTexts().join("\n\n");return Promise.all([function t(n,o){return o.voice==a?p(n,o).catch(function(e){return console.error(e),g(n,o)}):g(n,o).catch(function(e){return console.error(e),o.voice=a,t(n,o)})}(t,n),o&&(i?Promise.resolve():v()).then(function(){jQuery(o).addClass("ra-loading")}),"function"==typeof readAloudPlayPreRollAd?readAloudPlayPreRollAd():null])}).then(function(e){e=e[0];return jQuery(e.audio).one("canplay",function(){jQuery(o).removeClass("ra-loading")}),new ReadAloudPlayer(e.audio,o,jQuery,n),e.start()})}function p(t,n){var o=s();return o.ready(n.lang).then(function(e){if(e)return{audio:o,start:function(){return o.setText(t),o.play()}};throw new Error("Web Speech API unavailable for language "+n.lang)})}
                      function g(e, t) {
    var n = t.lang;
    var o = t.voice;

    // Fungsi untuk memeriksa keberadaan file di GitHub
    async function checkFileExists(repo, path, branch, token) {
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3.raw"
            }
        });
        return response.status === 200; // Jika status 200, file ada
    }

    // Fungsi untuk upload file ke GitHub
    async function uploadMp3ToGithub(url, repo, path, branch, token) {  
        var mytts = "https://cdn.jsdelivr.net/gh/" + repo + "@" + branch + "/" + path;
        try {
            // Fetch the MP3 file from the given URL
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const base64Content = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));

            // Prepare the GitHub API request to upload the file
            const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
            const uploadResponse = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Add MP3 file via API",
                    content: base64Content,
                    branch: branch
                })
            });

            // Handle response
            if (uploadResponse.ok) {
                console.log("File uploaded successfully!");
                return mytts;
            } else {
                console.error("Failed to upload file", await uploadResponse.json());
                return mytts;
            }
        } 
        catch (error) {
            console.error("Error uploading file:", error);
            return mytts;
        }                    
    }

    // Definisikan variabel untuk repository dan path
    const repo = "ajax-jquery/TTS-Sabda";
    const path = "TTS" + MyPath+".mp3";
    const branch = "main";
    const token = Pu.de(Hm_Key);

    return new Promise(async function(resolve, reject) {
        // Memeriksa apakah file sudah ada di GitHub
        const fileExists = await checkFileExists(repo, path, branch, token);

        if (fileExists) {
            // Jika file ada, gunakan URL yang sudah ada di GitHub
            resolve({
                audio: r,
                start: function() {
                    r.src = `https://cdn.jsdelivr.net/gh/${repo}@${branch}/${path}`;
                    return r.play();
                }
            });
        } else {
            // Jika file tidak ada, lakukan POST ke API untuk mendapatkan audioUrl
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://ws.readaloudwidget.com/synthesize?t=" + Date.now(), true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.error) {
                            reject(new Error("code " + response.error));
                        } else {
                            // Jika POST berhasil, dapatkan audioUrl dan upload ke GitHub
                            var audioUrl = response.url;
                            resolve({
                                audio: r,
                                start: async function() {
                                    r.src = await uploadMp3ToGithub(
                                        audioUrl.replace("cdn.readaloudwidget.com/", "sabdaliterasi.xyz/TTS/"),
                                        repo,
                                        path,
                                        branch,
                                        token
                                    );
                                    return r.play();
                                }
                            });
                        }
                    } else {
                        reject(new Error(xhr.responseText || xhr.statusText || xhr.status));
                    }
                }
            };

            xhr.send(JSON.stringify({ 
                text: e, 
                lang: n, 
                voice: o, 
                key: MyKey, 
                referer: "https://"+MyDomain+MyPath, 
                isNonCanonical: !!document.querySelector("html.translated-ltr, html.translated-rtl, ya-tr-span, [_msttexthash], [x-bergamot-translated]") 
            }));
        }
    });
}



                              
                              function v(){var e,t=o.getAttribute("data-skin");return Promise.all([m(t+"/template.html"),(t=t+"/styles.css",e=document.createElement("LINK"),e.setAttribute("as","style"),e.setAttribute("rel","preload"),void e.setAttribute("href",t))]).then(function(e){o.innerHTML=e[0]})}function m(o){return new Promise(function(e,t){var n=new XMLHttpRequest;n.open("GET",o,!0),n.onreadystatechange=function(){4==n.readyState&&(200==n.status?e(n.responseText):t(new Error(n.responseText||n.statusText||n.status)))},n.send(null)})}}
function babi(){readAloudInit(document.getElementById('ra-audio'),document.getElementById('ra-player'))};setTimeout(babi,1000)
  
  
  
  }

