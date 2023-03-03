$(document).ready(function(e) {
	$("body a").each(function() {
		let link = $(this);
		let button = link.find("button");
		if (button.hasClass("disabled")) {
			link.attr('href', '#')
		}
	});
});