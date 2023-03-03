$(document).ready(function(e) {
	let fullurl = window.location.href;
	if (fullurl.includes("#")) {
		let cardnumber = fullurl.substring(fullurl.lastIndexOf("#") + 1, fullurl.length);
		if (isNumeric(cardnumber)) {
			let cardint = parseInt(cardnumber)-1;
			setCardVisibility(cardint);
			return;
		}
	}
	setCardVisibility(0);
});

$(document).on('click', '.navigation button', function(e) {
	let button = $(this);
	if (button.hasClass("disabled")) {
		return;
	}

	let id = button.attr('id');
	let spans = $(".name span");

	let i = 0;
	for (let span of spans) {
		if ($(span).is(":visible")) {
			break;
		}
		i+=1;
	}

	let newi;
	if (id === "next") {
		newi = i+1;
	}
	else if (id === "prev") {
		newi = i-1;
	}
	else {
		return;
	}

	setCardVisibility(newi);
});

function setCardVisibility(newi) {
	console.log(newi);
	let namespans = $(".name span");
	let infospans = $(".info span");
	let imagespans = $(".product-img span")

	if (newi < 0) {
		newi = namespans.length-1;
	}
	else if (newi > namespans.length-1) {
		newi = 0;
	}

	if (newi === 0) {
		$(".navigation #prev").addClass("disabled");
		$(".navigation #next").removeClass("disabled");
	}
	else if (newi === namespans.length-1) {
		$(".navigation #prev").removeClass("disabled");
		$(".navigation #next").addClass("disabled");
	}
	else {
		$(".navigation button").removeClass("disabled");
	}

	namespans.hide();
	infospans.hide();
	imagespans.hide();

	$(namespans[newi]).show();
	$(infospans[newi]).show();

	let sideimagespan = $(imagespans[newi]);
	let sideimage = sideimagespan.find("img");
	let sisrc = sideimage.attr('src');
	if (sisrc.includes(".gif")) {
		sideimage.attr('src', sisrc);
	}

	sideimagespan.show();

	if (!$(".name").is(":visible")) {
		$(".product-img").fadeIn(10);
		$(".name").fadeIn(10);
		$(".info").fadeIn(10);
		$(".buttons").fadeIn(10);
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

/* Preload images */
$.fn.preload = function (callback) {
	let length = this.length;
	let iterator = 0;

	return this.each(function () {
		let self = this;
		let tmp = new Image();

		if (callback) tmp.onload = function () {
			callback.call(self, 100 * ++iterator / length, iterator === length);
		};

		tmp.src = this.src;
	});
};
$('img').preload(function(perc, done) { });