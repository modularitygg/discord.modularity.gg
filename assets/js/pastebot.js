$(document).ready(function(e) {
	let fullurl = window.location.href;
	let cards = $(".card");
	if (fullurl.includes("#")) {
		let cardnumber = fullurl.substring(fullurl.lastIndexOf("#") + 1, fullurl.length);
		if (isNumeric(cardnumber)) {
			let cardint = parseInt(cardnumber)-1;
			setCardVisibility(cards, cardint);
			return;
		}
	}
	setCardVisibility(cards, 0);
});

$(document).on('click', '.card button', function(e) {
	let html = $(this).html();
	let cards = $(".card");

	let i = 0;
	for (let card of cards) {
		if ($(card).is(":visible")) {
			break;
		}
		i+=1;
	}

	let newi;
	if (html === "NEXT") {
		newi = i+1;
	}
	else {
		newi = i-1;
	}

	setCardVisibility(cards, newi);
});

function setCardVisibility(cards, newi) {
	if (newi < 0) {
		newi = cards.length-1;
	}
	else if (newi > cards.length-1) {
		newi = 0;
	}

	cards.hide();

	let targetcard = $(cards[newi]);
	let img = targetcard.find("img");
	let src = img.attr('src');
	img.attr('src', '').attr('src', src);

	targetcard.show();
	if (!$(".wrapper").is(":visible")) {
		$(".wrapper").fadeIn(100);
		$(".invitewrapper").fadeIn(100);
	}

	let fullurl = window.location.href;
	let url = fullurl.substring(0, fullurl.lastIndexOf("#"));
	let suffix = "#" + (newi+1);

	if (newi === 0) {
		suffix = "";
	}

	window.history.replaceState(null, document.title, url + suffix);
}

function isNumeric(value) {
	return /^\d+$/.test(value);
}