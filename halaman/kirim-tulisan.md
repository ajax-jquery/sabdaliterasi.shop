---
layout: 'halaman'
author: 'Sabda Literasi'
title: 'Kirim Tulisan'
harga: 'Rp0'
description: "Kirim tulisanmu ke Sabda Literasi dan bagikan gagasan, opini, atau karya inspiratif dengan lebih banyak pembaca. Dapatkan kesempatan dipublikasikan dan dukung gerakan literasi bersama kami!"
permalink: '/kirim-tulisan/'
image: 'https://sabdaliterasi.xyz/media/android-icon-512x512'
keyword: ['kirim tulisan']
tag_head: ['<link rel="stylesheet" href="/wp-content/cdn/g/ajax-jquery/assets/repository/css/kirim-tulisan/0.3/main.min.css"><link rel="stylesheet" href="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5/ckeditor5.css" integrity="sha256-b5UADD68Dn+QwTQwyEY2oFW3Lq+gLtjdInToYWa2AIo="> <link rel="stylesheet" href="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5-premium-features/ckeditor5-premium-features.css" integrity="sha256-Ds3jtkdnB2IlO2UcJqG5atkBGPx/80aEHk0Li3T73Bo="><script src="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5/ckeditor5.umd.min.js" integrity="sha256-izeEgV+REn0q47Nelry1CsZkbnCA9COWexrd/Oe7qaQ="></script><script src="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5-premium-features/editor.umd.min.js"></script> <script src="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5/translations/id.umd.js" integrity="sha256-dbxe0WTz0rLYghF/jxT94xvf0GjdBlYT5VXeYtJusIA="></script> <script src="/wp-content/cdn/g/ajax-jquery/assets/repository/editor/ckeditor/ckeditor5-premium-features/translations/id.umd.js" integrity="sha256-pDpjyySVDGt3EfVLWYB4uahwgVwMbRs52HLT5q4h6Hc="></script>']
tag_body: ['<script src="/wp-content/cdn/g/ajax-jquery/assets/repository/script/kirim-tulisan/0.3/main.min.js"></script>']
---

<div id="loading">
<div class="spinner"></div>
</div> 
<p>Punya gagasan, refleksi, atau analisis mendalam yang ingin dibagikan? Kirim tulisanmu ke Sabda Literasi dan jangkau lebih banyak pembaca! Sebelum mengirim, pastikan untuk membaca syarat dan ketentuan di <a href="/undangan-menulis/" target="_blank">halaman ini</a> agar tulisanmu sesuai dengan ketentuan yang berlaku.</p>
  <div id="send">
    <h2>Form Kirim Tulisan</h2>
    <form id="submitForm">
      <label for="namaPenulis">Nama Penulis<small class="required">*</small>:</label>
      <input type="text" id="namaPenulis" name="namaPenulis" required>
      <small>Contoh: Karl Marx</small>

      <label for="email">Email<small class="required">*</small>:</label>
      <input type="email" id="email" name="email" required>
      <small>Contoh: karlmarx@mail.com</small>

      <label for="noWhatsapp">No Whatsapp<small class="required">*</small>:</label>
      <input type="tel" id="noWhatsapp" name="noWhatsapp" required>
      <small>Contoh: 08123456789</small>

      <label for="domisili">Domisili<small class="required">*</small>:</label>
      <input type="text" id="domisili" name="domisili" required>
      <small>Contoh: Berlin</small>

      <label for="atribusi">Atribusi (Deskripsi Diri):</label>
      <textarea id="atribusi" name="atribusi" rows="4"></textarea>
      <small>Contoh: Saya adalah seorang filsuf yang mengkaji teori-teori sosial, politik, dan ekonomi.</small>

      <label for="linkMedia">Link Media Sosial:</label>
      <input type="text" id="linkMedia" name="linkMedia">
      <small>Contoh: https://facebook.com/karlmarx, https://instagram.com/karlmarx</small>

      <label for="jenisTulisan">Jenis Tulisan<small class="required">*</small>:</label>
      <select id="jenisTulisan" name="jenisTulisan" required>
        <option value="">Pilih Jenis Tulisan</option>
        <option value="filsafat">Filsafat</option>
        <option value="agama">Agama</option>
        <option value="sosial">Sosial</option>
        <option value="kebangsaan">Kebangsaan</option>
        <option value="tokoh">Tokoh</option>
        <option value="feminis">Feminis</option>
        <option value="sains">Sains</option>
        <option value="refleksi">Refleksi</option>
        <option value="ulasan">Ulasan</option>
      </select>
      <small>Contoh: Pilih jenis tulisan yang sesuai.</small>

      <label for="judulTulisan">Judul Tulisan<small class="required">*</small>:</label>
      <input type="text" id="judulTulisan" name="judulTulisan" required>
      <small>Contoh: Teori Dasar Marxisme</small>

      <label for="isiTulisan">Isi Tulisan<small class="required">*</small>:</label>
      <textarea id="isiTulisan" name="isiTulisan"></textarea>
     <div id="word-count"></div>
      <label for="fotoPenulis">Foto Penulis<small class="required">*</small>:</label>
      <input type="file" id="fotoPenulis" name="fotoPenulis" accept="image/*" required>
      <small>Max 3MB, format gambar (JPEG, PNG, GIF)</small>

      <button type="submit">Kirim Tulisan</button>
    </form>
  
  
    <!-- Modal for Notifications -->
  <div id="SendmyModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" id="modalClose">&times;</span>
      <p class="modal-svg">
      <svg fill="#10c200" id="suksesModal" width="75" height="75" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
      <svg fill="#ff0000" id="errorModal" width="85" height="85" viewBox="0 0 24 24"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z"/></svg>
      </p>
      <p id="SendmodalMessage"></p>
    </div>
  </div>
  </div>
