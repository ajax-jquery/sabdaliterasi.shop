---
layout: halaman
author: Sabda Literasi
title: Download Ebook
harga: Rp0
description: Koleksi ebook terlengkap! Download gratis novel, komik, buku pelajaran, dan berbagai genre lainnya. Baca online atau offline kapanpun dan dimanapun.
permalink: /download/ebook
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [Download Ebook]
---
 <link href="/wp-content/cdn/n/bootstrap/5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>div#loadingOverlay .text-light{color:var(--linkC)!important}button#submitForm {border-color: var(--linkC);background: var(--linkC)}h1.pTtl.aTtl.sml.itm{display:none !important}
  #loadingOverlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    justify-content: center;
    align-items: center;
  }
</style>
 <!-- Overlay Loading -->
<div id="loadingOverlay" >
  <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<div class="container mt-5">
  <h1 id="title" class="text-center">Loading...</h1>
  <form id="formVerify" class="mt-4">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" id="name" class="form-control" placeholder="Enter your name" required>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <div class="input-group">
        <input type="email" id="email" class="form-control" placeholder="Enter your email" required>
        <button type="button" id="checkEmail" class="btn btn-secondary">Verify Email</button>
      </div>
    </div>
    <div id="verificationMessage" class="alert alert-success mt-3" style="display: none;">
  Kode verifikasi telah dikirim ke email Anda. Silakan periksa kotak masuk/kota spam Anda. Kode akan berakhir dalam 60 Detik.
</div>
    <div class="mb-3" id="verifyCodeInput" style="display: none;">
      <label for="code" class="form-label">Verification Code</label>
      <input type="text" id="code" class="form-control" placeholder="Enter the verification code" required>
    </div>
    <button type="submit" class="btn btn-primary" id="submitForm">Submit and Download</button>
  </form>
</div>
<script src="https://sabdaliterasi.xyz/wp-content/cdn/g/ajax-jquery/assets/repository/script/download/ebook/0.3/main.min.js"></script>
