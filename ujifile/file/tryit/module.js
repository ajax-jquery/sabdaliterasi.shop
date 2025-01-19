import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
   const firebaseConfig = {
    apiKey: "AIzaSyAFuoVF8LkEtVHtd33A0FJHIyIOhDzGbjA",
    authDomain: "sabaliterasipalu.firebaseapp.com",
    databaseURL: "https://sabaliterasipalu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sabaliterasipalu",
    storageBucket: "sabaliterasipalu.appspot.com",
    messagingSenderId: "567229920099",
    appId: "1:567229920099:web:636ca97b7ee332b342d956",
    measurementId: "G-7W6SD9QBY7"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('savedata').addEventListener('click', function() {

var textareaCode=editor;

set(ref(database, "textareaData"), textareaCode.getValue()).then(() => {
    alert('Data berhasil disimpan ke Firebase.');
  })
  .catch((error) => {
    console.error('Gagal menyimpan data:', error);
  });
})

document.getElementById('removedata').addEventListener('click', function() {
if(confirm('hapus data?')){
var textareaCode=`<!DOCTYPE html>
<html>
<head>
<script src="https://sabdaliterasi.xyz/wp-content/cdn/n/jquery/3.7.1/dist/jquery.min.js"><\/script>
<style>
  
  
 </style>
</head>
<body>

<p>If you click on me, I will disappear.</p>
<p>Click me away!</p>
<p>Click me too!</p>
<script>
!function(){
document.getElementById("demo");
document.getElementsByClassName("example");
document.querySelector("p");
document.querySelectorAll("p");
document.getElementsByTagName("li")
}()
<\/script>
  
  <script>
    
    <\/script>
</body>
</html>`;

set(ref(database, "textareaData"), textareaCode).then(() => {
    alert('Data berhasil disimpan ke Firebase.');location.href=location.href
  })
  .catch((error) => {
    console.error('Gagal menyimpan data:', error);
  });
  }
})


function getDataFromFirebase() {
get(ref(database, 'textareaData'))
      .then((snapshot) => {
      const data = snapshot.val();
      
      if (data !== null) {
      document.getElementById('textareaCode').value = data;colorcoding();submitTryit()
    } })
    .catch((error) => {
    console.error('Gagal mengambil data:', error);alert("gagal Load");colorcoding();submitTryit()
  });
      
      }getDataFromFirebase()
