---
layout: halaman
author: Sabda Literasi
title: Hubungi Kami
harga: Rp0
description: "Halaman untuk menghubungi tim kami"
permalink: /contact-us/
image: https://sabdaliterasi.xyz/media/android-icon-512x512
keyword: [contact us]
---

<!--Form Code Start Here-->
<script src="https://ajax-jquery.github.io/ckeditor4-standar/ckeditor.js"></script>
<!--Form Code Start Here-->

<div class="widget-title">

</div>

<div class="contact-form-widget">

<div class="form">

<form action="https://formsubmit.co/info@sabdaliterasi.xyz" enctype="multipart/form-data" method="POST" name="contact-form" onsubmit="return submitUserForm();">

<input name="_template" type="hidden" value="table" />

<input name="_subject" type="hidden" value="PESAN DARI {{ site.title }}" />

<input name="_captcha" type="hidden" value="false" />

<input name="_next" type="hidden" value="{{ site.url }}/succes/" />

<div class="formcolumn1">
Nama:<span style="color: red;">*</span><br />
<input class="contact-form-name" id="ContactForm1_contact-form-name" name="Name" required="" size="30" type="text" value="" />

</div>

<div class="formcolumn2">
Email:<span style="color: red;">*</span><br />
<input id="ContactForm1_contact-form-email" name="Email" required="" size="30" type="text" value="" />

</div>

<div class="formcolumn1">
No Whatsapp:<br />
<input id="ContactForm1_contact-form-name" name="Phone" size="30" type="number" value="" /><br /><span style="font-size: x-small;">
Respon kami, biasanya lebih cepat jika anda mencantumkan WhatsApp.
</span></div>

<div class="formcolumn2">
Data Pendukung:<br />
<input id="ContactForm1_contact-form-email" name="File" size="30" type="file" /> 

</div>

<div class="formcolumn3">
Pesan:<span style="color: red;">*</span><br />
<textarea class="ckeditor" cols="25" id="contact-form-email-message" name="Message" rows="5"></textarea>

</div>

<div class="formcolumn4">

<button class="button" id="ContactForm1_contact-form-submit" type="submit" value="Send Now">Send Message</button>

</div>

<div style="max-width: 100%; text-align: center; width: 100%;">

</div>

</form>

<!--Form Code End Here-->

 

<!--reCaptcha Code Begin Here-->

<div id="g-recaptcha-error"></div>

<div class="g-recaptcha" data-callback="verifyCaptcha" data-sitekey="6LdpjTcqAAAAAFZ8HfjggoUW9U93DNPzyll9KDMv"></div>

<br /><br /><br />  <br /><br /><br /><br /><br /><br />

<div id="g-recaptcha-error"></div>

<br /><br /><br />

<script src="https://www.google.com/recaptcha/api.js"></script>

<script>

function submitUserForm() {

    var response = grecaptcha.getResponse();

    if(response.length == 0) {

        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">Solve below reCAPTCHA.</span>';

        return false;

    }

    return true;

}

 

function verifyCaptcha() {

    document.getElementById('g-recaptcha-error').innerHTML = '';

}

</script>

<!--reCaptcha Code Ends Here-->

</div>

</div>

<style scoped="" type="text/css">

#ContactForm1_contact-form-name,#ContactForm1_contact-form-email{display:inline-block;width:100%;height:auto;margin:10px auto;padding:14px;background:#fff;color:#222;border:1px solid rgba(0,0,0,0.08)}

#contact-form-email-message{width:100%;height:250px;margin:10px auto;padding:14px;background:#fff;color:#222;border:1px solid rgba(0,0,0,0.08)}

#ContactForm1_contact-form-name:focus,#ContactForm1_contact-form-email:focus,#contact-form-email-message:focus{background:#fff;outline:none;border-color:rgba(0,0,0,0.18)}

.formcolumn4{position:relative}

#ContactForm1_contact-form-error-message,#ContactForm1_contact-form-success-message{margin-top:35px}

form{color:#888}

.formcolumn1,.formcolumn2{float:left;width:50%}

.formcolumn1,.formcolumn2{margin:0 0 10px 0;padding:0 10px 0 0}

.formcolumn2{padding:0 0 0 10px}

@media only screen and (max-width:768px){.formcolumn1,.formcolumn2{width:100%;padding:0}}

</style>







<!--Messenger Plugin Obrolan Code-->

    <div id="fb-root"></div>

    <!--Your Plugin Obrolan code-->

    <div class="fb-customerchat" id="fb-customer-chat">

    </div>

    <script>

      var chatbox = document.getElementById('fb-customer-chat');

      chatbox.setAttribute("page_id", "100835562934589");

      chatbox.setAttribute("attribution", "biz_inbox");

    </script>

    <!--Your SDK code-->

    <script>

      window.fbAsyncInit = function() {

        FB.init({

          xfbml            : true,

          version          : 'v12.0'

        });

      };

      (function(d, s, id) {

        var js, fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) return;

        js = d.createElement(s); js.id = id;

        js.src = 'https://connect.facebook.net/id_ID/sdk/xfbml.customerchat.js';

        fjs.parentNode.insertBefore(js, fjs);

      }(document, 'script', 'facebook-jssdk'));

    </script>
