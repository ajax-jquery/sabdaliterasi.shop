  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getDatabase, ref, set, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

  // Konfigurasi Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCDqLMbqjfPh-E2w-8gWZOMoKqFOJY8DpU",
    authDomain: "subscribesabda.firebaseapp.com",
    databaseURL: "https://subscribesabda-default-rtdb.firebaseio.com",
    projectId: "subscribesabda",
    storageBucket: "subscribesabda.firebasestorage.app",
    messagingSenderId: "1002892047780",
    appId: "1:1002892047780:web:7b660571cdb99edf38fd31"
  };

  // Inisialisasi Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

    const form = document.getElementById('subscribeForm');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupMessage = document.getElementById('popupMessage');

form.addEventListener("submit",async e=>{e.preventDefault();let a=document.getElementById("name").value,t=document.getElementById("email").value.toLowerCase();try{let r=query(ref(database,"subscribers"),orderByChild("email"),equalTo(t)),s=await get(r);if(s.exists()){showPopup("Email sudah terdaftar.","error"),form.reset();return}let i=Date.now().toString();await set(ref(database,"subscribers/"+i),{nama:a,email:t}),showPopup("Sukses! Terima kasih telah berlangganan.","success"),form.reset()}catch(l){showPopup("Terjadi kesalahan. Silakan coba lagi.","error")}});document.getElementById('closePopup').addEventListener('click', function () {popup.style.display = 'none';overlay.style.display = 'none'}function showPopup(message, type) {popupMessage.textContent = message;       popup.className=`popup ${type}`;popup.style.display = 'block';overlay.style.display = 'block';}
