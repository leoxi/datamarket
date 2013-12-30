/*返回头部*/
function backTop(){
	var a = "<a href='javascript:;' id='backTop'></a>";
	var b = $(document).scrollTop();
	$("body").append(a);
	var c = $("#backTop");
	c.on("click",function(){
		$("body,html").animate({scrollTop : 0})	
	}).hide();
	if(b>0){
		c.fadeIn();	
	}else{
		c.fadeOut();	
	}
	$(window).on("scroll",function(){
		var d = $(document).scrollTop();
		if(d>0){
			c.fadeIn();	
		}else{
			c.fadeOut();	
		}
	})
	
}
/*! Copyright (c) 2013 前端那些事儿 (http://www.webfuns8.com)
 *
 * Site: 焦点图
 *
 * Author: 梁健
 *
 * Updated: 2013-11-11
 *
 * Updatedby: 梁健 
 *
 * Version: 1.0
 *
 * Requires: 1.8.0+
 */
;(function($){
	$.fn.focusPic = function(options) {
		var opts = $.extend({}, $.fn.focusPic.defaults, options);
		var _this = this;
		this.each(function(index,elem){
			_this.oUl = $(this).find("ul").eq(0);
			_this.aLi = _this.oUl.children();
			_this.aLiLen = _this.aLi.length;
			_this.aLiW = _this.aLi.innerWidth();
			_this.oUl.width(_this.aLiW*_this.aLiLen);
			_this.timer = null;
			if(opts.autoplay){
				_this.iNow = 0;
				_this.timer = setInterval(play, opts.pauseTime);
				$(this).on("mouseenter",function(){
					clearInterval(_this.timer);
					_this.timer = null;
					
				}).on("mouseleave",function(){
					
					_this.timer = setInterval(play, opts.pauseTime);
				
				});
			}
			if(opts.createButton){
				var html = "<div class='sbtn'>";
				$.each(_this.aLi,function(){
					html+="<span></span>";	
				})
				html+="</div>";
				$(this).append(html);
				_this.aSpan = $(this).find(".sbtn").children();
				_this.aSpan.on("mouseover",function(){
					var elem = $(this)
					fnAnimate(elem.index())
					_this.iNow = elem.index();
					elem.addClass("active").siblings().removeClass("active");
					return false;
				}).eq(0).trigger("mouseover");
				
			}
		})
		function play(){
			
			_this.iNow++;
			if(_this.iNow == _this.aLiLen){
				_this.iNow = 0;
			}
			_this.aSpan.eq(_this.iNow).addClass("active").siblings().removeClass("active");
			fnAnimate(_this.iNow)
			
		}
		function fnAnimate(n){	
			_this.oUl.stop(true,true).animate({
				"left"	:	-_this.aLiW*n
			},opts.animSpeed);
			
		}
	};
	$.fn.focusPic.defaults = {
		animSpeed: 500,
		pauseTime: 3000,
		autoplay: true,
		createButton: true
	};
})(jQuery);

(function($){
	$.fn.jFocusFade = function(options) {
		var opts = $.extend({}, $.fn.jFocusFade.defaults, options);
		$(this).each(function(index, element) {
			var a = $(this).find("li");
			var b = a.length;
			var c = "<div class='focus-btn'>";
			for(var i=0; i<b ; i++){
				c += "<span></span>"
			}
			c += "</div>";
			$(this).append(c);
			var d = $(this).find(".focus-btn").find("span");
			var e = parseInt(a.find(".mSc-main").find("b").css("top"));
			d.on("mouseenter",function(){
				
				var _index = $(this).index();
				fn(_index);
			
			}).eq(0).trigger("mouseenter");
			var g = 0;
			var h = null;
			h = setInterval(function(){
				g++;
				if(g==b){
					g = 0;	
				}
				fn(g);
			},opts.pauseTime);
			$(this).on("mouseenter",function(){
				
				clearInterval(h);
				h = null;
				
			}).on("mouseleave",function(){
				
				h = setInterval(function(){
					g++;
					if(g==b){
						g = 0;	
					}
					fn(g);
				},opts.pauseTime);
					
			})
			
			function fn(_index){
				var f = a.eq(_index);
				f.stop(false,true).fadeIn("normal",function(){
					$(this).css("zIndex","9");
				}).siblings().stop(false,true).fadeOut("normal",function(){
					$(this).css("zIndex","1");
				});
				f.find("b").stop(false,true).animate({
					top:0,
					opacity:1
				},opts.animSpeed).end().siblings().find("b").stop(false,true).animate({
					top:e,
					opacity:0
				},opts.animSpeed);
				d.eq(_index).addClass("active").siblings().removeClass("active");
			}
			
		});
	};
	$.fn.jFocusFade.defaults = {
		animSpeed: 500,
		pauseTime: 3000,
	}
})(jQuery);

/*! Copyright (c) 2013 前端那些事儿 (http://www.webfuns8.com)
 *
 * Site: 输入框 占位符
 *
 * Author: 梁健
 *
 * Updated: 2013-11-11
 *
 * Updatedby: 梁健 
 *
 * Version: 1.0
 *
 * Requires: 1.8.0+
 */
(function($){
	$.fn.placeholder = function(options) {
		var opts = $.extend({}, $.fn.placeholder.defaults, options);
		if('placeholder' in document.createElement('input')){
			return ;
		}
		var _this = this;
		this.each(function(index,elem){
			var oInput = $(this).find("input").eq(0);
			var oInputP = oInput.attr("placeholder")
			var oSpanHtml = "<span>"+oInputP+"</span>";
			$(this).append(oSpanHtml);
			var oSpan = $(this).find("span")
			$(this).on("click focus",function(){
				oInput.focus();
			});
			if(oInput.val()!=""){
				oSpan.hide();
			}
			oInput.on("input",function(){
				if(oInput.val()!=""){
					oSpan.hide();
				}else{
					oSpan.show();
				}
			})
		})
		
	};
})(jQuery);
/*! Copyright (c) 2013 前端那些事儿 (http://www.webfuns8.com)
 *
 * Site: 滚动条
 *
 * Author: 梁健
 *
 * Updated: 2013-11-11
 *
 * Updatedby: 梁健 
 *
 * Version: 1.0
 *
 * Requires: 1.8.0+
 */
(function($){
	$.fn.lscroll = function(options) {
		var opts = $.extend({}, $.fn.lscroll.defaults, options);
		$(this).each(function(index, element) {
			var oPartent = $(this);
			var speed = opts.speed;
			var scrollBody = oPartent.find('.scroll-body').eq(0),
			    scrollBar = oPartent.find('.scroll-bar').eq(0),
			    scrollBarMid = scrollBar.find('.scroll-bar-mid').eq(0);
			var oPartentHeight = oPartent.innerHeight(),
				scrollBodyHeight = scrollBody.outerHeight(),
				scrollBarHeight = scrollBar.innerHeight();
			var scrollBarMidHeight = (oPartentHeight/scrollBodyHeight)*scrollBarHeight;
			if(scrollBodyHeight>oPartentHeight){
				scrollBarMid.css("height",scrollBarMidHeight)
			}else{
				scrollBar.hide();
			}
			scrollBody.mousewheel(function(event, delta){
				var a = parseInt(scrollBody.css("top"));
				var b = parseInt(scrollBarMid.css("top"));
				var c = 0;
				if(delta>0){
					c = b-speed;
				}else if(delta<0){
					c = b+speed;
				}
				scrollFn(c,false);
				return false;
			});
			scrollBar.on("click",function(ev){
				var a = ev.pageY;
				var b = $(this).offset().top;
				var c = a-b;
				var e = parseInt(scrollBarMid.css("top"));
				var f = 0;
				if(c<e){
					f = c;
				}else if(c>e+scrollBarMidHeight){
					f = c-scrollBarMidHeight;
				}
				scrollFn(f,true);
				return false;
			})
			scrollBarMid.bind("mousedown",function(ev){
				var a = ev.pageY;
				var b = parseInt($(this).css("top"));
				var c = a-b;
				$(document).bind("mousemove",function(ev){
					var d = ev.pageY;
					var e = d-c;
					scrollFn(e,false);
				}).bind("mouseup",function(){
					$(document).unbind("mousemove");
					$(document).unbind("up");
				})
				return false;
			}).bind("click",function(){
				return false;
			})
			
			function scrollFn(T,B){
				if(T<0){
					T = 0;
				}else if(T > scrollBarHeight - scrollBarMidHeight){
					T = scrollBarHeight - scrollBarMidHeight;
				}
				var S = -(T/scrollBarHeight)*scrollBodyHeight;
				if(B){
					scrollBarMid.stop(true).animate({"top":T},100);
					scrollBody.stop(true).animate({"top":S},100)
				}else{
					scrollBarMid.css({"top":T});
					scrollBody.css({"top":S})
				}
				
			}
		});
	};
	$.fn.lscroll.defaults = {
		speed : 10	
	}
})(jQuery);
/*! Copyright (c) 2013 前端那些事儿 (http://www.webfuns8.com)
 *
 * Site: 导航
 *
 * Author: 梁健
 *
 * Updated: 2013-11-11
 *
 * Updatedby: 梁健 
 *
 * Version: 1.0
 *
 * Requires: 1.8.0+
 */
(function($){
	$.fn.jNavExe = function(options) {
		var opts = $.extend({}, $.fn.jNavExe.defaults, options);
		$(this).each(function(index, element) {
			var a = $(this).find("li");
			var b = $(this).find(".nav-bar");
			var c = [];
			a.each(function(index, element) {
				
				var d = {};
				d.width = $(this).outerWidth();
				d.left = $(this).find("a").offset().left - b.offsetParent().offset().left;
				c.push(d);
				
			});
			a.on("mouseenter",function(){
				
				var _index = $(this).index();
				animateFn(_index);
				
			}).on("mouseleave",function(){
				a.each(function(index, element) {
					if($(this).attr("class") == "active"){
						
						var _index = $(this).index();
						animateFn(_index);
					}
				});
			}).trigger("mouseleave");
			
			
			function animateFn (_index){
				
				b.stop(true).animate({
					left	:	c[_index].left	
				},opts.duration,opts.easing)
				
			}
		});
	};
	$.fn.jNavExe.defaults = {
		duration	:	300,
		easing		:	"easeOutBack"
	}
})(jQuery);

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});
/*! Copyright (c) 2013 前端那些事儿 (http://www.webfuns8.com)
 *
 * Site: 展开收缩
 *
 * Author: 梁健
 *
 * Updated: 2013-11-11
 *
 * Updatedby: 梁健 
 *
 * Version: 1.0
 *
 * Requires: 1.8.0+
 */
 
/*开始*/
function fnShow(){

	var aUnfold = getByClass(document,"unfold");
	
	var aJShow = getByClass(document,"j-show");
	
	for(var i = 0; i < aUnfold.length; i++){
		
		aUnfold[i].index = i;
		
		aUnfold[i].onclick = function(){
		
			if(this.innerHTML == "【展开详情】"){
			
				this.innerHTML = "【收缩详情】";
				
				removeClass(aJShow[this.index],"list-a");
				
			}else{
				
				this.innerHTML = "【展开详情】";
				
				addClass(aJShow[this.index],"list-a");
				
			}
			
		}
		
	}	
		
}
/*结束*/
function getByClass(oParent, sClass) {
    var re = new RegExp('\\b' + sClass + '\\b', 'i');
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            aResult.push(aEle[i])
        }
    }
    return aResult
}
function removeClass(obj, sClassName) {
	var oldClassName = obj.className;
	if (oldClassName == '') {
		return ;
	} else {
		var arr = oldClassName.split(' ');
		var iPos = arrIndexOf(arr, sClassName);
		if (iPos == -1) {
			return ;
		} else {
			arr.splice(iPos, 1);
			obj.className = arr.join(' ');
		}
	}
}
function addClass(obj, sClassName) {
	var oldClassName = obj.className;
	if (oldClassName == '') {
		obj.className = sClassName;
	} else {
		var arr = oldClassName.split(' ');
		if (arrIndexOf(arr, sClassName) != -1) {	
			return ;
		} else {
			obj.className = oldClassName + ' ' + sClassName;
		}
	}
}

function arrIndexOf(arr, v) {
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == v) {
			return i;
		}
	}
	return -1;
}