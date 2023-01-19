import { Router } from "./actions/Router.js";
let page = sessionStorage.getItem("page");
Router(page);

$("#sidebar-toggler").on("click", () => $("aside").toggleClass("open"));

$(".user").on("click", function (e) {
	e.stopPropagation();
	$(".dropdown").toggleClass("open");
	$(this).toggleClass("open");
});

$(".dropdown").on("click", function (e) {
	e.stopPropagation();
});

$(window).on("click", function (e) {
	$(".dropdown").removeClass("open");
	$(".user").removeClass("open");
	$(".setup-message-content-container").removeClass("open");
	$(".myModal").each(function (i, el) {
		if (e.target == el) {
			$(el).removeClass("open");
		}
	});
});

$(".myModalToggler").each(function (i, el) {
	$(el).on("click", function () {
		let target = $(this).data("target");
		$(target).addClass("open");
	});
});

$(".close-popup").on("click", function () {
	$(".myModal").removeClass("open");
});

$(".link").on("click", function () {
	$("aside").removeClass("open");
	if (
		$(this).hasClass("myModalToggler") ||
		$(this).parent().hasClass("active")
	)
		return;
	let page = $(this).data("page");
	let same = [];
	$(".link").each((i, el) => {
		if ($(el).hasClass("myModalToggler")) return;
		if ($(el).data("page") == $(this).data("page")) {
			same.push(el);
			return;
		}
		$(el).parent().removeClass("active");
	});
	same.forEach((el) => $(el).parent().addClass("active"));
	$(".overlay").removeClass("close");
	$(".dropdown").removeClass("open");
	sessionStorage.setItem("page", page);
	Router(page);
});

$("#logout").on("click", () => {
	let data = { logout: true };
	sessionStorage.removeItem("page");
	$.post("../../src/request.php", data, null, "json").done((res) => {
		location.href = res.location;
	});
});
