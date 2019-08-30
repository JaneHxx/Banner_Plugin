(function ($) {
	
	var opt = {
		len: 0,
		scrollingSpeed: 700
	};
	
	function DSlide (elem, options) {
		let that = this;
		var _default = {
			images: []
		};
		opt = Object.assign(opt, options);
		that.elem = $(elem);
		that.banner = null;
		that.slideParams = {flag: false, startX: 0};
		that.bannerOrder = 0;
		that.create();
		
		var windowHeight = $(window).height(),
        $body = $("body");
      	$body.css("height", windowHeight); 
		that.elem.on('click', '.slidenav ul li', function () {
			var i = $(this).index();
			that.bannerOrder = Number(i);
			$(this).addClass('first').siblings('li').removeClass('first');
			that.slideAnimate();
		});
		
		var $slide = that.elem.find('.slide');
		// 监听滑动事件
		$slide.on('touchstart', function (e) {
			e = window.event || e;
			e.preventDefault();
			that.touchstart(e);
		});
		
		$slide.on('touchmove', function (e) {
			e = window.event || e;
			e.preventDefault();
			that.touchmove(e);
		});
		
		$slide.on('touchend', function (e) {
			e = window.event || e;
			e.preventDefault();
			that.touchend(e);
		});
		
	}
	
	DSlide.prototype = {
		constructor: DSlide,
		create: function () {
			let that = this;
			that.banner = $('<div class="banner-wrapper"></div>');
			var slideWrapper = $('<div class="slide"><ul></ul></div>');
			var slideNavWrapper = $('<div class="slidenav"></div>');
			slideWrapper.appendTo(that.banner);
			slideNavWrapper.appendTo(that.banner);
			that.elem.wrapInner(that.banner);
			that.t();
		},
		t: function (imagesArr, imgUrl = 'imgUrl', imgAlt = 'imgAlt') {
			var that = this;
			that.elem.find('.slide-item').wrap('<li></li>');
			that.elem.find('.slidenav').append(that.elem.find('.slide ul').clone());
			that.elem.find('.slidenav ul li:first-child').addClass('first');
			opt.len = that.elem.find('.slide ul li').length;
			that.elem.find('.slide ul').css('width', opt.len * that.elem.find('.slide ul').width() + 'px');
		},
		// 手指按下
		touchstart: function (e) {
			var that = this;
			that.slideParams.flag = true;
			that.slideParams.startX = e.changedTouches[0].pageX;
		},
		// 手指滑动
		touchmove: function (e) {
			var that = this;
			var moveX = e.changedTouches[0].pageX;
			var dX = moveX - that.slideParams.startX;
			var liLen = that.elem.find('.slide ul li').length;
			if (!that.slideParams.flag) return;
			// 向左滑动
			if (dX <= -2) {
				if (that.bannerOrder + 1 <= liLen - 1) {
					that.bannerOrder += 1;
				}
			// 向右滑动	
			} else if (dX >= 2) {
				if (that.bannerOrder - 1 >= 0) {
					that.bannerOrder -= 1;
				}
			}
			that.elem.find('.slidenav ul li').eq(that.bannerOrder).addClass('first').siblings().removeClass('first');
			that.slideAnimate();
			that.slideParams.flag = false;
		},
		// 滑动动画
		slideAnimate: function () {
			var that = this;
			var slideUl = that.elem.find('.slide ul');
			slideUl.animate({marginLeft: '-'+ Number(slideUl.width() / opt.len * (that.bannerOrder)) +'px'}, opt.scrollingSpeed);
		},
		// 滑动结束
		touchend : function (e) {
			var that = this;
			that.slideParams.flag = false;
			that.slideParams.startX = 0;
		}
	};
	
	
	$.fn.extend({
		DSlide: function (options) {
			return $(this).each(function (item, index) {
				var $that = $(this);
				new DSlide($that, options);
			});
		}
	});
	
})(jQuery);


