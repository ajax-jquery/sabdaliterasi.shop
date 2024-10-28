function BB(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}


!function(pp){
var t=document.createElement("script");t.type="text/javascript",t.setAttribute("onload",pp),t.src="https://sabdaliterasi.xyz/assets/js/firebase-2-4-2.min.js";var r=document.getElementsByTagName("script")[0].parentNode.insertBefore(t,r)}("likedCount()");


var URL_ID=document.getElementById("liked").getAttribute("data-link");
 var l=URL_ID.replace("artikel","").split("/").join("");
var ii=document.getElementById("Liked");
function likedPlus(){   
        var i = new Firebase("https://ki-test-23822-default-rtdb.firebaseio.com/pages/id/like/"+l);
        i.once("value", function(a) {
            var n = a.val(),
                t = !1;
            null == n && (n = {}, n.value = 0, n.id =l, t = !0), document.getElementById("liked").setAttribute("data-text",BB(n.value+1)), n.value++,ii.checked = true, "/" != window.location.pathname && (t ? i.set(n) : i.child("value").set(n.value))
        })
  };
  function likedMinus(){   
        var i = new Firebase("https://ki-test-23822-default-rtdb.firebaseio.com/pages/id/like/"+l);
        i.once("value", function(a) {
            var n = a.val(),
                t = !1;
            null == n && (n = {}, n.value = 0, n.id =l, t = !0), document.getElementById("liked").setAttribute("data-text",BB(n.value-1)), n.value--,ii.checked = false, "/" != window.location.pathname && (t ? i.set(n) : i.child("value").set(n.value))
        })
  }
  
  function likedCount(){   
        var i = new Firebase("https://ki-test-23822-default-rtdb.firebaseio.com/pages/id/like/"+l);
        i.once("value", function(a) {
            var n = a.val(),
                t = !1;
            null == n && (n = {}, n.value = 0, n.id =l, t = !0);
       
            document.getElementById("liked").setAttribute("data-text",BB(n.value)), "/" != window.location.pathname && (t ? i.set(n) : i.child("value").set(n.value))
        })
  };

var chek=localStorage.getItem("like_"+l);
if(chek){
ii.checked = true
}else{
ii.checked = false
};

ii.addEventListener('change', function() {
if(ii.checked == true){
localStorage.setItem("like_"+l,"true");
likedPlus()
}else{
localStorage.removeItem("like_"+l);
likedMinus()
}
})

    
