(function ($) {
	
	function DSlide (elem, options) {
		let that = this;
		var _default = {
			images: []
		};
		that.options = Object.assign(_default, options);
		that.elem = $(elem);
		that.banner = null;
		that.slideParams = {flag: false, startX: 0};
		that.bannerOrder = 0;
		that.create();
		
		var windowHeight = $(window).height(),
        $body = $("body");
      	$body.css("height", windowHeight); 
		
		that.banner.find('.picnav').on('click', 'ul li', function () {
			var i = $(this).index();
			that.bannerOrder = Number(i);
			$(this).addClass('first').siblings('li').removeClass('first');
			that.banner.find('.pic ul li').eq(i).fadeIn().siblings().fadeOut();
		});
		
		var $pic = that.banner.find('.pic');
		// 监听滑动事件
		$pic.on('touchstart', function (e) {
			e = window.event || e;
			e.preventDefault();
			that.touchstart(e);
		});
		
		$pic.on('touchmove', function (e) {
			e = window.event || e;
			e.preventDefault();
			that.touchmove(e);
		});
		
		$pic.on('touchend', function (e) {
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
			var picWrapper = $('<div class="pic"></div>');
			var picNavWrapper = $('<div class="picnav"></div>');
			picWrapper.appendTo(that.banner);
			picNavWrapper.appendTo(that.banner);
			that.banner.appendTo(that.elem);
			that.traverseImages(that.options.images, 'url', 'alt');
		},
		traverseImages: function (imagesArr, imgUrl = 'imgUrl', imgAlt = 'imgAlt') {
			var that = this;
			var picWrapper = that.banner.find('.pic');
			var picNavWrapper = that.banner.find('.picnav');
			var picUlWrapper = $('<ul></ul>');
			var picnavUlWrapper = $('<ul></ul>');
//			var picImgArr = JSON.stringify(imagesArr);
//			picImgArr = JSON.parse(picImgArr);
//			picImgArr.reverse();
			for (var i = 0; i < imagesArr.length; i++) {
				var liElem = $('<li></li>');
				var vimg = imagesArr[i];
				var imgAlt = vimg[imgAlt] || '图片';
				var imgElem = $('<img src="'+vimg[imgUrl]+'" alt="'+imgAlt+'" />');
				if (i == 0) {
					liElem.addClass('first');
				}
				imgElem.appendTo(liElem);
				liElem.appendTo(picUlWrapper);
			}
			
			picUlWrapper.appendTo(picWrapper);
			picUlWrapper.clone().appendTo(picNavWrapper);
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
			var liLen = that.banner.find('.pic ul li').length;
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
			that.banner.find('.pic ul li').eq(that.bannerOrder).fadeIn().siblings().fadeOut();
			that.banner.find('.picnav ul li').eq(that.bannerOrder).addClass('first').siblings().removeClass('first');
			that.slideParams.flag = false;
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


