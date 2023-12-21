StarRatingCreator = typeof StarRatingCreator == 'undefined' ? 0 : StarRatingCreator + 1;

(function(numer) {
	
	if (numer === 0 && !document.querySelector('script[src="https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js"]')) {
		let s = document.createElement('script');
		s.src = 'https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js';
		document.head.appendChild(s);
		let k = document.createElement('script');
		k.src = 'https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js';
		document.head.appendChild(k);
	}
	
function dokladneUstawienie(rateID, ocena, x, width) {
    let proc = ocena - Math.floor(ocena);
    let nrgw = document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[x];
    let kalkul = Math.round(proc * width);
    nrgw.getElementsByTagName('full')[0].style.width = kalkul + 'px';
    nrgw.getElementsByTagName('empty')[0].style.width = width-kalkul + 'px';
    nrgw.getElementsByTagName('empty')[0].getElementsByTagName('img')[0].style.margin = '0 0 0 -' + kalkul + 'px';
}

function nzb0gv8xustwgwzd(rateID, ocena, width) {
    let gwizdki = document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar');
    for (let x=0; x<gwizdki.length; x++) {
        if (x <= ocena) {
            if (x < Math.floor(ocena)) {
                gwizdki[x].getElementsByTagName('full')[0].style.width = '100%';
                gwizdki[x].getElementsByTagName('empty')[0].style.width = '0%';
            } else {
                dokladneUstawienie(rateID, ocena, x, width);
            }
        } else if (x > ocena) {
            gwizdki[x].getElementsByTagName('full')[0].style.width = '0%';
            gwizdki[x].getElementsByTagName('empty')[0].style.width = '100%';
            gwizdki[x].getElementsByTagName('empty')[0].getElementsByTagName('img')[0].style.margin = '0 0 0 0';
        }
		gwizdki[x].getElementsByTagName('hover')[0].style.width = '0%';
    }
}

function nzb0gv8xnajazd(rateID, co, width, blockingText, hvr) {
    if (!localStorage['bsrgl_' + rateID]) {
        nzb0gv8xustwgwzd(rateID, co, width);
        for (var x=0; x<co; x++) {
			if (hvr === 'auto') {
                document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[x].style.opacity = '0.8';
			}
			document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[x].getElementsByTagName('empty')[0].style.width = '0';
			document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[x].getElementsByTagName('full')[0].style.width = '0';
			document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[x].getElementsByTagName('hover')[0].style.width = width + 'px';
        }
		if (document.getElementById("PRBTX_" + rateID).innerHTML != '') {
		    document.getElementById("PRBTX_" + rateID).innerHTML = co + ' / ' + document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar').length;
		}
    } else {
        document.getElementById("PBPSR_" + rateID).setAttribute('title', blockingText.replace(/\$userRating\$/g, localStorage['bsrgl_' + rateID]));
		document.getElementById("PBPSR_" + rateID).style.cursor = 'default';
    }
}

function nzb0gv8xwyjazd(rateID, co, width, txt) {
    nzb0gv8xustwgwzd(rateID, co, width);
    var gwizdki = document.getElementById("PBPSR_" + rateID).getElementsByTagName('star');
    for (var x=0; x<gwizdki.length; x++) {
        gwizdki[x].style.opacity = '1';
    }
	if (!localStorage['bsrgl_' + rateID]) {
	    document.getElementById("PRBTX_" + rateID).innerHTML = txt;
	}
}

function nzb0gv8xzmnkrsr(id) {
	for (var v=0; v<document.getElementById("PBPSR_" + id).getElementsByTagName('SRSstar').length; v++) {
	    document.getElementById("PBPSR_" + id).getElementsByTagName('SRSstar')[v].style.cursor = 'default';
    }
}

function nzb0gv8xblkwn(id) {
	var popup = document.getElementById('SRSrepeat_' + id);
	popup.innerHTML = popup.innerHTML.replace(/\$userRating\$/g, localStorage['bsrgl_' + id]);
	popup.style.visibility = 'visible';
	popup.style.opacity = '1';
	setTimeout(function() {
		popup.style.visibility = 'hidden';
		popup.style.opacity = '0';
    }, 4000)
}

	function zapierdolRatinga() {
		let kodzik = document.querySelectorAll('script[src="https://sabdaliterasi.shop/firbaaaasss.js"]')[numer];
		let stronaUrl = location.host.replace('www.', '').replace(/\./g, '_').replace(/\//g, '__');
		let itemUrl = location.href.split('?')[0].split('#')[0].replace(location.protocol + '//', '').replace('www.', '');
		if (itemUrl.substring(itemUrl.length-1) === '/' || itemUrl.substring(itemUrl.length-1) === '.') {
			itemUrl = itemUrl.substring(0, itemUrl.length-1);
		}
		itemUrl = itemUrl.replace(/\./g, '_').replace(/\//g, '__').replace(/\,/g, '___').replace(/\s/g, '');
		let rateID = kodzik.getAttribute('ratingName');
		if (!rateID) {
			rateID = 'default';
		} else if (rateID === 'auto') {
			rateID = itemUrl;
		}
		rateID = rateID.replace(/\s/g, '_').replace(/\#/g, '-').replace(/\./g, '-').replace(/\@/g, '-').replace(/\!/g, '-').replace(/\$/g, '-').replace(/\%/g, '-').replace(/\&/g, '-').replace(/\(/g, '-').replace(/\)/g, '-');
		if (document.querySelector('#PBPSR_' + rateID)) {
			let blok = document.createElement('div');
			blok.innerHTML = 'You can\'t use more than one Rating Widget with the same value of "<b>ratingName</b>" attribute on the same page.';
			kodzik.parentNode.insertBefore(blok, kodzik);
		} else {
			let blok = document.createElement('div');
			blok.setAttribute("id", "PBPSR_" + rateID);
			kodzik.parentNode.insertBefore(blok, kodzik);
			let teksciorTop = document.createElement('div');
			let teksciorDown = document.createElement('div');
			let txtUp = kodzik.getAttribute('topText') !== null ? kodzik.getAttribute('topText') : 'Rating:';
			let txtDown = kodzik.getAttribute('bottomText') !== null ? kodzik.getAttribute('bottomText') : 'Average: <b>$average$</b> / $max$ (<b>$votes$</b> votes)';
			let ilosc = Number(kodzik.getAttribute('numberOfStars'));
			if (ilosc < 1 || isNaN(ilosc)) ilosc = 5;
			let thanksText = kodzik.getAttribute('thankYouText') !== null ? kodzik.getAttribute('thankYouText') : 'Thanks for voting';
			
			txtDown = txtDown.replace(/\$average\$/g, '<span class="kozyr-SRS-average"></span>').replace(/\$votes\$/g, '<span class="kozyr-SRS-votes"></span>').replace(/\$max\$/g, ilosc);
			teksciorTop.innerHTML = txtUp;
			teksciorTop.setAttribute("id", "PRBTX_" + rateID);
			blok.appendChild(teksciorTop);
			teksciorDown.setAttribute("id", "PRSTS_" + rateID);
			teksciorDown.innerHTML = txtDown;
			let firebaza = kodzik.getAttribute('firebaseURL');
			if (firebaza === null) {
				firebaza = 'Firebase error. Add attribute firebaseURL="https://YOUR-FIREBASE.firebaseio.com" to your rating script.';
			} else if (firebaza == '') {
				firebaza = 'Firebase error. Enter the URL adress of your Firebase to "firebaseURL" attribute in your rating script.';
			} else if (firebaza.indexOf('https://') !== 0) {
				firebaza = 'Firebase error. Invalid Fierabse URL';
			} else if (firebaza.lastIndexOf('firebaseio.com') < 5) {
				firebaza = 'Firebase error. Invalid Fierabse URL';
			} else if (firebaza.lastIndexOf('/') !== firebaza.length - 1) {
				firebaza = firebaza + '/';
			}
			let pusta = kodzik.getAttribute('emptyStarImg') ? kodzik.getAttribute('emptyStarImg') : 'https://1.bp.blogspot.com/-pOr9XGwtSJc/Wsjf8ULOIqI/AAAAAAAAAKE/KBh-LUDIn0YzASKf-t7mQo8UNpdHhr2SgCLcBGAs/s1600/pusta.png';
			let pelna = kodzik.getAttribute('fullStarImg') ? kodzik.getAttribute('fullStarImg') : 'https://3.bp.blogspot.com/-QSNdWP4Ijx4/Wsjf7QOUZ4I/AAAAAAAAAJ8/F2nReVG5WfA1rLV3dGcAFMsPOnIQck4YwCLcBGAs/s1600/pelna.png';
			let najech = kodzik.getAttribute('hoverStarImg');
			if (najech === null || najech == '') najech = pelna;
			let width = kodzik.getAttribute('starSize');
			if (!width || Number(width) < 0 || isNaN(width)) width = 25;
			width = Number(width);
			let blockingText = kodzik.getAttribute('blockingText');
			if (blockingText === null) blockingText = 'You have already cast your vote, your rating is $userRating$.';
			let wyrownanie = kodzik.getAttribute('align');
			if (wyrownanie !== 'right' && wyrownanie !== 'left') wyrownanie = 'center';
			let wielkoscTekstu = kodzik.getAttribute('textSize');
			if (!wielkoscTekstu || Number(wielkoscTekstu) < 0 || isNaN(wielkoscTekstu)) wielkoscTekstu = 15;
			wielkoscTekstu = Number(wielkoscTekstu);
			let kolor = kodzik.getAttribute('textColor') ? kodzik.getAttribute('textColor') : 'inherit';
			
			let czcionka = kodzik.getAttribute('fontFamily');
			if (czcionka == 'Georgia' || czcionka == 'Georgia, serif') {
				czcionka = 'Georgia, serif'
			} else if (czcionka == 'Palatino' || czcionka == "'Palatino Linotype', 'Book Antiqua', Palatino, serif") {
				czcionka = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
			} else if (czcionka == 'Times New Roman' || czcionka == "'Times New Roman', Times, serif") {
				czcionka = '"Times New Roman", Times, serif';
			} else if (czcionka == 'Arial' || czcionka == 'Arial, Helvetica, sans-serif') {
				czcionka = 'Arial, Helvetica, sans-serif';
			} else if (czcionka == 'Arial Black' || czcionka == "'Arial Black', Gadget, sans-serif") {
				czcionka = '"Arial Black", Gadget, sans-serif';
			} else if (czcionka == 'Comic Sans' || czcionka == "'Comic Sans MS', cursive, sans-serif") {
				czcionka = '"Comic Sans MS", cursive, sans-serif';
			} else if (czcionka == 'Impact' || czcionka == 'Impact, Charcoal, sans-serif') {
				czcionka = 'Impact, Charcoal, sans-serif';
			} else if (czcionka == 'Lucida Sans' || czcionka == "'Lucida Sans Unicode', 'Lucida Grande', sans-serif") {
				czcionka = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';
			} else if (czcionka == 'Tahoma' || czcionka == 'Tahoma, Geneva, sans-serif') {
				czcionka = 'Tahoma, Geneva, sans-serif';
			} else if (czcionka == 'Trebuchet' || czcionka == "'Trebuchet MS', Helvetica, sans-serif") {
				czcionka = '"Trebuchet MS", Helvetica, sans-serif';
			} else if (czcionka == 'Verdana' || czcionka == 'Verdana, Geneva, sans-serif') {
				czcionka = 'Verdana, Geneva, sans-serif';
			} else if (czcionka == 'Courier New' || czcionka == "'Courier New', Courier, monospace") {
				czcionka = '"Courier New", Courier, monospace';
			} else if (czcionka == 'Lucida Console' || czcionka == "'Lucida Console', Monaco, monospace") {
				czcionka = '"Lucida Console", Monaco, monospace';
			} else {
				czcionka = 'Inherit';
			}
			
			let readonly = kodzik.getAttribute('status') === 'readonly' ? true : false;
			
			let hvr = najech === pelna ? 'auto' : 'ok';
			
			for (let x=1; x<=ilosc; x++) {
				let star = document.createElement('SRSstar');
				if (!readonly) {
					star.onmouseenter = function() {
						nzb0gv8xnajazd(rateID, x, width, blockingText, hvr);
					}
				}
				star.setAttribute('wartosc', x);
				let full = document.createElement('full');
				let empty = document.createElement('empty');
				let hover = document.createElement('hover');
				let pustaObr = document.createElement('img');
				let pelnaObr = document.createElement('img');
				let hoverObr = document.createElement('img');
				pustaObr.src = pusta;
				pelnaObr.src = pelna;
				hoverObr.src = najech;
				pustaObr.style.width = width + 'px';
				pelnaObr.style.width = width + 'px';
				hoverObr.style.width = width + 'px';
				full.appendChild(pelnaObr);
				empty.appendChild(pustaObr);
				hover.appendChild(hoverObr);
				star.appendChild(full);
				star.appendChild(empty);
				star.appendChild(hover);
				blok.appendChild(star);
			}
			blok.appendChild(teksciorDown);
			let alertBox = document.createElement('div');
			alertBox.setAttribute('id', 'SRSrepeat_' + rateID);
			alertBox.innerHTML = blockingText;
			blok.appendChild(alertBox);
			nzb0gv8xustwgwzd(rateID, 0, width);
			let style = document.createElement('style');
			style.innerHTML = '#PBPSR_' + rateID + ' {text-align:'+wyrownanie+';position:relative;} #PBPSR_' + rateID + ' SRSstar {display:inline-block;width:'+width+'px;cursor:'+(!localStorage['bsrgl_' + rateID] && !readonly ? 'pointer' : 'default')+';} #PBPSR_' + rateID + ' SRSstar full, #PBPSR_' + rateID + ' SRSstar empty, #PBPSR_' + rateID + ' SRSstar hover {display:inline-block;overflow:hidden;} #PBPSR_' + rateID + ' SRSstar img {background:transparent;border:0;padding:0;margin:0;max-width:none;} #PRBTX_' + rateID + ', #PRSTS_' + rateID + ' {font-size:'+wielkoscTekstu+'px;line-height:1.8;font-family:'+czcionka+';text-align:'+wyrownanie+';color:'+kolor+';} #SRSrepeat_' + rateID + ' {display:'+(blockingText == "" ? "none" : "block")+';width:140px;position:absolute;bottom:100%;left:calc(50% - 10px);z-index:999;margin-left:-70px;padding:5px 10px;background:black;color:white;line-height:normal;font-size:'+wielkoscTekstu+'px;border-radius:7px;visibility:hidden;opacity:0;transition:opacity 1s;}';
			document.head.appendChild(style);
			if (firebaza.indexOf('Firebase error') < 0) {
				const firebase = new Firebase(firebaza+'nz3xtmOvc/' + stronaUrl + '/' + rateID);
				let databaza = firebase;
				
				databaza['on']('value', (zrzut) => {
					let dane = zrzut.val();
					if (!dane) {
						dane = {'nz3xtm0vc':0, 'nz3xtn0vc':0, 'nz3xtnOvc':itemUrl}
						databaza.set(dane);
					}
					nzb0gv8xustwgwzd(rateID, zrzut.val().nz3xtm0vc * ilosc, width);
					document.getElementById("PBPSR_" + rateID).setAttribute('onmouseout', 'nzb0gv8xwyjazd("' + rateID + '", ' + zrzut.val().nz3xtm0vc * ilosc + ', ' + width + ', "' + txtUp + '")');
					for (var sz=0; sz<document.getElementById("PRSTS_" + rateID).getElementsByClassName('kozyr-SRS-average').length; sz++) {
						document.getElementById("PRSTS_" + rateID).getElementsByClassName('kozyr-SRS-average')[sz].innerHTML = Math.round(zrzut.val().nz3xtm0vc * ilosc * 100) / 100;
					}
					for (var sz2=0; sz2<document.getElementById("PRSTS_" + rateID).getElementsByClassName('kozyr-SRS-votes').length; sz2++) {
						document.getElementById("PRSTS_" + rateID).getElementsByClassName('kozyr-SRS-votes')[sz2].innerHTML = zrzut.val().nz3xtn0vc;
					}
					if (!readonly) {
						for (var np=0; np<document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar').length; np++) {
							document.getElementById("PBPSR_" + rateID).getElementsByTagName('SRSstar')[np].onclick = function() {
								if (!localStorage['bsrgl_' + rateID]) {
									var ocn2 = ((zrzut.val().nz3xtm0vc * zrzut.val().nz3xtn0vc)+(Number(this.getAttribute('wartosc')))/ilosc)/(zrzut.val().nz3xtn0vc+1);
									databaza.child("nz3xtm0vc").set(ocn2);
									databaza.child("nz3xtn0vc").set(zrzut.val().nz3xtn0vc+1);
									localStorage['bsrgl_' + rateID] = Number(this.getAttribute('wartosc'));
									nzb0gv8xzmnkrsr(rateID);
									if (txtUp != '') {
										document.getElementById("PRBTX_" + rateID).innerHTML = thanksText;
										setTimeout(function() {
											document.getElementById("PRBTX_" + rateID).innerHTML = txtUp;
										}, 4000);
									}
								} else {
									nzb0gv8xblkwn(rateID);
								}
							}
						}
					}
				});
			} else {
				document.getElementById("PBPSR_" + rateID).innerHTML = firebaza;
			}
		}
	}

function nzb0gv8xzjbka() {
    var pipa = setInterval(function() {
		if (typeof firebase != 'undefined') {
			zapierdolRatinga();
			clearInterval(pipa)	
		}
	}, 50)
}

nzb0gv8xzjbka();
})(StarRatingCreator)
