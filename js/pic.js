var piclist = $("#banner .pic ul li");
var picnav = $("#banner .picnav ul li");
var banner = $("#banner");
var navbox = $("#banner .picnav");
var but = $("#banner .but ul li");
var i = 0;
var time = null
banner.hover(function() {
	navbox.stop();
	navbox.animate({
		bottom: 0
	}, 500);
	clearInterval(time);
}, function() {
	navbox.stop();
	navbox.animate({
		bottom: "-86px"
	}, 500);
	time = setInterval(function() {
		i = (i + 1) % 5;
		auto(i)
	}, 3000);
});
picnav.mouseover(function() {
	i = $(this).index();
	auto(i);
});

function auto(i) {
	picnav.addClass("first").siblings().removeClass("first");
	piclist.eq(i).fadeIn().siblings().fadeOut();
	but.eq(i).addClass("first").siblings().removeClass("first");
}
time = setInterval(function() {
	i = (i + 1) % 5;
	auto(i);
}, 3000);