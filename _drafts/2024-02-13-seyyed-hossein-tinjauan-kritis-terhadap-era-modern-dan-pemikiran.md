---
date: '2024-02-13 02:22:32 +0800'
tag: 'Filsafat'
title: 'Seyyed Hossein: Tinjauan Kritis terhadap Era Modern dan Pemikiran'
image: 'https://sabdaliterasi.shop/wp-conten/file/images/sabda-literasi-seyyed-hossein-tinjauan-kritis-terhadap-era-modern-dan-pemikiran.jpg'
description: 'cinta'
keyword: ['kamu']
---
<p>Select</p><p>Customize the native &lt;select&gt;s with custom CSS that changes the element’s initial appearance.</p><p><strong>On this page</strong></p><ul><li><a href="https://getbootstrap.com/docs/5.0/forms/select/#default" target="_blank" rel="nofollow noopener noreferrer">Default</a></li><li><a href="https://getbootstrap.com/docs/5.0/forms/select/#sizing" target="_blank" rel="nofollow noopener noreferrer">Sizing</a></li><li><a href="https://getbootstrap.com/docs/5.0/forms/select/#disabled" target="_blank" rel="nofollow noopener noreferrer">Disabled</a></li><li><a href="https://getbootstrap.com/docs/5.0/forms/select/#sass" target="_blank" rel="nofollow noopener noreferrer">Sass</a><ul><li><a href="https://getbootstrap.com/docs/5.0/forms/select/#variables" target="_blank" rel="nofollow noopener noreferrer">Variables</a></li></ul></li></ul><h2>Default</h2><p>Custom &lt;select&gt; menus need only a custom class, .form-select to trigger the custom styles. Custom styles are limited to the &lt;select&gt;’s initial appearance and cannot modify the &lt;option&gt;s due to browser limitations.</p><p>   Open this select menu   One   Two   Three </p><p>Copy</p><p>&lt;select class="form-select" aria-label="Default select example"&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;</p><h2>Sizing</h2><p>You may also choose from small and large custom selects to match our similarly sized text inputs.</p><p>   Open this select menu   One   Two   Three    Open this select menu   One   Two   Three </p><p>Copy</p><p>&lt;select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;

&lt;select class="form-select form-select-sm" aria-label=".form-select-sm example"&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;</p><p>The multiple attribute is also supported:</p><p>   Open this select menu   One   Two   Three </p><p>Copy</p><p>&lt;select class="form-select" multiple aria-label="multiple select example"&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;</p><p>As is the size attribute:</p><p>   Open this select menu   One   Two   Three </p><p>Copy</p><p>&lt;select class="form-select" size="3" aria-label="size 3 select example"&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;</p><h2>Disabled</h2><p>Add the disabled boolean attribute on a select to give it a grayed out appearance and remove pointer events.</p><p>   Open this select menu   One   Two   Three </p><p>Copy</p><p>&lt;select class="form-select" aria-label="Disabled select example" disabled&gt;
  &lt;option selected&gt;Open this select menu&lt;/option&gt;
  &lt;option value="1"&gt;One&lt;/option&gt;
  &lt;option value="2"&gt;Two&lt;/option&gt;
  &lt;option value="3"&gt;Three&lt;/option&gt;
&lt;/select&gt;</p><h2>Sass</h2><h3>Variables</h3><p>Copy</p><p>$form-select-padding-y:             $input-padding-y;
$form-select-padding-x:             $input-padding-x;
$form-select-font-family:           $input-font-family;
$form-select-font-size:             $input-font-size;
$form-select-indicator-padding:     $form-select-padding-x * 3; // Extra padding for background-image
$form-select-font-weight:           $input-font-weight;
$form-select-line-height:           $input-line-height;
$form-select-color:                 $input-color;
$form-select-bg:                    $input-bg;
$form-select-disabled-color:        null;
$form-select-disabled-bg:           $gray-200;
$form-select-disabled-border-color: $input-disabled-border-color;
$form-select-bg-position:           right $form-select-padding-x center;
$form-select-bg-size:               16px 12px; // In pixels because image dimensions
$form-select-indicator-color:       $gray-800;
$form-select-indicator:             url("data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'&gt;&lt;path fill='none' stroke='#{$form-select-indicator-color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/&gt;&lt;/svg&gt;");

$form-select-feedback-icon-padding-end: $form-select-padding-x * 2.5 + $form-select-indicator-padding;
$form-select-feedback-icon-position:    center right $form-select-indicator-padding;
$form-select-feedback-icon-size:        $input-height-inner-half $input-height-inner-half;

$form-select-border-width:        $input-border-width;
$form-select-border-color:        $input-border-color;
$form-select-border-radius:       $border-radius;
$form-select-box-shadow:          $box-shadow-inset;

$form-select-focus-border-color:  $input-focus-border-color;
$form-select-focus-width:         $input-focus-width;
$form-select-focus-box-shadow:    0 0 0 $form-select-focus-width $input-btn-focus-color;

$form-select-padding-y-sm:        $input-padding-y-sm;
$form-select-padding-x-sm:        $input-padding-x-sm;
$form-select-font-size-sm:        $input-font-size-sm;

$form-select-padding-y-lg:        $input-padding-y-lg;
$form-select-padding-x-lg:        $input-padding-x-lg;
$form-select-font-size-lg:        $input-font-size-lg;

$form-select-transition:          $input-transition;</p>