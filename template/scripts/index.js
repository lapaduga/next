'use strict';

// popup
var popupLinks = document.querySelectorAll('.popup-link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('.lock-padding');

var unlock = true;

var timeout = 400;

if (popupLinks.length > 0) {
	var _loop = function _loop(index) {
		var popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			var popupName = popupLink.getAttribute('href').replace('#', '');
			var currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupLinks.length; index++) {
		_loop(index);
	}
}
var popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	var _loop2 = function _loop2(index) {
		var el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupCloseIcon.length; index++) {
		_loop2(index);
	}
}
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		var popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive) {
	var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (var index = 0; index < lockPadding.length; index++) {
			var _el = lockPadding[index];
			_el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (var index = 0; index < lockPadding.length; index++) {
				var _el2 = lockPadding[index];
				_el2.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		var popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
	}
})();

document.addEventListener('DOMContentLoaded', function () {
	// input mask
	$("#request-phone").mask("+7 (999) 999-99-99");
	$("#popup-phone").mask("+7 (999) 999-99-99");
	$("#callback-phone").mask("+7 (999) 999-99-99");

	// smooth scroll
	$(".mainscreen__button").on('click', function (e) {
		var fixed_offset = -150;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});

	// parallax
	$('.parallax__list>li').addClass('layer');
	$('.parallax__list').parallax();
});
// map
function initMap() {

	var options = {
		center: { lat: 55.189241031789926, lng: 61.43007247523924 },
		zoom: 17
	};

	var map = new google.maps.Map(document.getElementById('contacts__map'), options);

	var marker = new google.maps.Marker({
		position: { lat: 55.189241031789926, lng: 61.43007247523924 },
		map: map,
		icon: "./template/images/mark.webp"
	});
}

// Обратный звонок и специальное предложение 
$('#request__form').on('submit', function (e) {
	e.preventDefault();

	if ($('#request-name').val() === '') {
		$('#request-name').addClass('_error');
		$('#request-name').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#request-name').removeClass('_error');
		$('#request-name').attr("placeholder", "Имя Фамилия Отчество");
	}
	if ($('#request-phone').val() === '') {
		$('#request-phone').addClass('_error');
		$('#request-phone').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#request-phone').removeClass('_error');
		$('#request-phone').attr("placeholder", "+7 (___) ___-__-__");
	}
	if ($('#request-email').val() === '') {
		$('#request-email').addClass('_error');
		$('#request-email').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#request-email').removeClass('_error');
		$('#request-email').attr("placeholder", "Ваш e-mail");
	}

	//берем из формы метод передачи данных
	var m_method = $(this).attr('method');
	var m_action = $(this).attr('action');
	var m_data = $(this).serialize();
	$('.request__form').addClass('_sending');
	$('#thx').fadeIn();
	$.ajax({
		type: m_method,
		url: m_action,
		data: m_data,
		resetForm: 'true',
		success: function success(result) {
			$('.request__form').removeClass('_sending');
			//$('#thx').addClass('open');
			setTimeout(function () {
				//$('#thx').removeClass('open');
				$('#request__form')[0].reset();
			}, 2000);
		}
	});
});

$('#popup__form').on('submit', function (e) {
	e.preventDefault();

	if ($('#popup-name').val() === '') {
		$('#popup-name').addClass('_error');
		$('#popup-name').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#popup-name').removeClass('_error');
		$('#popup-name').attr("placeholder", "Имя Фамилия Отчество");
	}
	if ($('#popup-phone').val() === '') {
		$('#popup-phone').addClass('_error');
		$('#popup-phone').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#popup-phone').removeClass('_error');
		$('#popup-phone').attr("placeholder", "+7 (___) ___-__-__");
	}
	if ($('#popup-email').val() === '') {
		$('#popup-email').addClass('_error');
		$('#popup-email').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#popup-email').removeClass('_error');
		$('#popup-email').attr("placeholder", "Ваш e-mail");
	}

	var m_method = $(this).attr('method');
	var m_action = $(this).attr('action');
	var m_data = $(this).serialize();
	$('#popup').addClass('_sending');
	$('#thx').fadeIn();
	$.ajax({
		type: m_method,
		url: m_action,
		data: m_data,
		resetForm: 'true',
		success: function success(result) {
			$('#popup').removeClass('_sending');
			//$('#thx').addClass('open');
			setTimeout(function () {
				//$('#thx').removeClass('open');
				$('#popup__form')[0].reset();
			}, 2000);
		}
	});
});

$('#callback__form').on('submit', function (e) {
	e.preventDefault();

	if ($('#callback-name').val() === '') {
		$('#callback-name').addClass('_error');
		$('#callback-name').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#callback-name').removeClass('_error');
		$('#callback-name').attr("placeholder", "Имя Фамилия Отчество");
	}
	if ($('#callback-phone').val() === '') {
		$('#callback-phone').addClass('_error');
		$('#callback-phone').attr("placeholder", "Ошибка заполнения");
	} else {
		$('#callback-phone').removeClass('_error');
		$('#callback-phone').attr("placeholder", "+7 (___) ___-__-__");
	}

	var m_method = $(this).attr('method');
	var m_action = $(this).attr('action');
	var m_data = $(this).serialize();
	$('#callback').addClass('_sending');
	//$('#thx').fadeIn();
	$.ajax({
		type: m_method,
		url: m_action,
		data: m_data,
		resetForm: 'true',
		success: function success(result) {
			$('#callback').removeClass('_sending');
			//$('#thx').addClass('open');
			setTimeout(function () {
				$('#thx').removeClass('open');
				$('#callback__form')[0].reset();
			}, 2000);
		}
	});
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (a) {
    var b,
        c = navigator.userAgent,
        d = /iphone/i.test(c),
        e = /chrome/i.test(c),
        f = /android/i.test(c);a.mask = { definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" }, autoclear: !0, dataName: "rawMaskFn", placeholder: "_" }, a.fn.extend({ caret: function caret(a, b) {
            var c;if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), { begin: a, end: b });
        }, unmask: function unmask() {
            return this.trigger("unmask");
        }, mask: function mask(c, g) {
            var h, i, j, k, l, m, n, o;if (!c && this.length > 0) {
                h = a(this[0]);var p = h.data(a.mask.dataName);return p ? p() : void 0;
            }return g = a.extend({ autoclear: a.mask.autoclear, placeholder: a.mask.placeholder, completed: null }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; m >= a; a++) {
                            if (j[a] && C[a] === p(a)) return;
                        }g.completed.call(B);
                    }
                }function p(a) {
                    return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
                }function q(a) {
                    for (; ++a < n && !j[a];) {}return a;
                }function r(a) {
                    for (; --a >= 0 && !j[a];) {}return a;
                }function s(a, b) {
                    var c, d;if (!(0 > a)) {
                        for (c = a, d = q(b); n > c; c++) {
                            if (j[c]) {
                                if (!(n > d && j[c].test(C[d]))) break;C[c] = C[d], C[d] = p(d), d = q(d);
                            }
                        }z(), B.caret(Math.max(l, a));
                    }
                }function t(a) {
                    var b, c, d, e;for (b = a, c = p(a); n > b; b++) {
                        if (j[b]) {
                            if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;c = e;
                        }
                    }
                }function u() {
                    var a = B.val(),
                        b = B.caret();if (o && o.length && o.length > a.length) {
                        for (A(!0); b.begin > 0 && !j[b.begin - 1];) {
                            b.begin--;
                        }if (0 === b.begin) for (; b.begin < l && !j[b.begin];) {
                            b.begin++;
                        }B.caret(b.begin, b.begin);
                    } else {
                        for (A(!0); b.begin < n && !j[b.begin];) {
                            b.begin++;
                        }B.caret(b.begin, b.begin);
                    }h();
                }function v() {
                    A(), B.val() != E && B.change();
                }function w(a) {
                    if (!B.prop("readonly")) {
                        var b,
                            c,
                            e,
                            f = a.which || a.keyCode;o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
                    }
                }function x(b) {
                    if (!B.prop("readonly")) {
                        var c,
                            d,
                            e,
                            g = b.which || b.keyCode,
                            i = B.caret();if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                            if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function k() {
                                        a.proxy(a.fn.caret, B, e)();
                                    };setTimeout(k, 0);
                                } else B.caret(e);i.begin <= m && h();
                            }b.preventDefault();
                        }
                    }
                }function y(a, b) {
                    var c;for (c = a; b > c && n > c; c++) {
                        j[c] && (C[c] = p(c));
                    }
                }function z() {
                    B.val(C.join(""));
                }function A(a) {
                    var b,
                        c,
                        d,
                        e = B.val(),
                        f = -1;for (b = 0, d = 0; n > b; b++) {
                        if (j[b]) {
                            for (C[b] = p(b); d++ < e.length;) {
                                if (c = e.charAt(d - 1), j[b].test(c)) {
                                    C[b] = c, f = b;break;
                                }
                            }if (d > e.length) {
                                y(b + 1, n);break;
                            }
                        } else C[b] === e.charAt(d) && d++, k > b && (f = b);
                    }return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
                }var B = a(this),
                    C = a.map(c.split(""), function (a, b) {
                    return "?" != a ? i[a] ? p(b) : a : void 0;
                }),
                    D = C.join(""),
                    E = B.val();B.data(a.mask.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null;
                    }).join("");
                }), B.one("unmask", function () {
                    B.off(".mask").removeData(a.mask.dataName);
                }).on("focus.mask", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);var a;E = B.val(), a = A(), b = setTimeout(function () {
                            B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
                        }, 10);
                    }
                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);B.caret(a), h();
                    }, 0);
                }), e && f && B.off("input.mask").on("input.mask", u), A();
            });
        } });
});
"use strict";

!function (T, y, u, d) {
  "use strict";
  function a(t, i) {
    this.element = t, this.$context = T(t).data("api", this), this.$layers = this.$context.find(".layer");var e = { calibrateX: this.$context.data("calibrate-x") || null, calibrateY: this.$context.data("calibrate-y") || null, invertX: this.$context.data("invert-x") || null, invertY: this.$context.data("invert-y") || null, limitX: parseFloat(this.$context.data("limit-x")) || null, limitY: parseFloat(this.$context.data("limit-y")) || null, scalarX: parseFloat(this.$context.data("scalar-x")) || null, scalarY: parseFloat(this.$context.data("scalar-y")) || null, frictionX: parseFloat(this.$context.data("friction-x")) || null, frictionY: parseFloat(this.$context.data("friction-y")) || null, originX: parseFloat(this.$context.data("origin-x")) || null, originY: parseFloat(this.$context.data("origin-y")) || null };for (var s in e) {
      null === e[s] && delete e[s];
    }T.extend(this, r, i, e), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depths = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise();
  }var o = "parallax",
      r = { relativeInput: !1, clipRelativeInput: !1, calibrationThreshold: 100, calibrationDelay: 500, supportDelay: 500, calibrateX: !1, calibrateY: !0, invertX: !0, invertY: !0, limitX: !1, limitY: !1, scalarX: 10, scalarY: 10, frictionX: .1, frictionY: .1, originX: .5, originY: .5, type: ["translate"] };a.prototype.transformSupport = function (t) {
    for (var i = u.createElement("div"), e = !1, s = null, a = !1, o = null, r = null, n = 0, h = this.vendors.length; n < h; n++) {
      if (null !== this.vendors[n] ? (o = this.vendors[n][0] + "transform", r = this.vendors[n][1] + "Transform") : r = o = "transform", i.style[r] !== d) {
        e = !0;break;
      }
    }switch (t) {case "2D":
        a = e;break;case "3D":
        if (e) {
          var l = u.body || u.createElement("body"),
              p = u.documentElement,
              c = p.style.overflow;u.body || (p.style.overflow = "hidden", p.appendChild(l), l.style.overflow = "hidden", l.style.background = ""), l.appendChild(i), i.style[r] = "translate3d(1px,1px,1px)", a = (s = y.getComputedStyle(i).getPropertyValue(o)) !== d && 0 < s.length && "none" !== s, p.style.overflow = c, l.removeChild(i);
        }}return a;
  }, a.prototype.ww = null, a.prototype.wh = null, a.prototype.wcx = null, a.prototype.wcy = null, a.prototype.wrx = null, a.prototype.wry = null, a.prototype.portrait = null, a.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), a.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]], a.prototype.motionSupport = !!y.DeviceMotionEvent, a.prototype.orientationSupport = !!y.DeviceOrientationEvent, a.prototype.orientationStatus = 0, a.prototype.transform2DSupport = a.prototype.transformSupport("2D"), a.prototype.transform3DSupport = a.prototype.transformSupport("3D"), a.prototype.propertyCache = {}, a.prototype.initialise = function () {
    this.accelerate(this.$context), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay);
  }, a.prototype.updateLayers = function () {
    this.$layers = this.$context.find(".layer"), this.depths = [], this.accelerate(this.$layers), this.$layers.each(T.proxy(function (t, i) {
      this.depths.push(T(i).data("depth") || 0);
    }, this));
  }, a.prototype.updateDimensions = function () {
    this.ww = y.innerWidth, this.wh = y.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy);
  }, a.prototype.updateBounds = function () {
    this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy);
  }, a.prototype.queueCalibration = function (t) {
    clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t);
  }, a.prototype.enable = function () {
    this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, y.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, y.addEventListener("mousemove", this.onMouseMove)), y.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame));
  }, a.prototype.disable = function () {
    this.enabled && (this.enabled = !1, this.orientationSupport ? y.removeEventListener("deviceorientation", this.onDeviceOrientation) : y.removeEventListener("mousemove", this.onMouseMove), y.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf));
  }, a.prototype.calibrate = function (t, i) {
    this.calibrateX = t === d ? this.calibrateX : t, this.calibrateY = i === d ? this.calibrateY : i;
  }, a.prototype.invert = function (t, i) {
    this.invertX = t === d ? this.invertX : t, this.invertY = i === d ? this.invertY : i;
  }, a.prototype.friction = function (t, i) {
    this.frictionX = t === d ? this.frictionX : t, this.frictionY = i === d ? this.frictionY : i;
  }, a.prototype.scalar = function (t, i) {
    this.scalarX = t === d ? this.scalarX : t, this.scalarY = i === d ? this.scalarY : i;
  }, a.prototype.limit = function (t, i) {
    this.limitX = t === d ? this.limitX : t, this.limitY = i === d ? this.limitY : i;
  }, a.prototype.origin = function (t, i) {
    this.originX = t === d ? this.originX : t, this.originY = i === d ? this.originY : i;
  }, a.prototype.clamp = function (t, i, e) {
    return t = Math.max(t, i), t = Math.min(t, e);
  }, a.prototype.css = function (t, i, e) {
    var s = this.propertyCache[i];if (!s) for (var a = 0, o = this.vendors.length; a < o; a++) {
      if (s = null !== this.vendors[a] ? T.camelCase(this.vendors[a][1] + "-" + i) : i, t.style[s] !== d) {
        this.propertyCache[i] = s;break;
      }
    }t.style[s] = e;
  }, a.prototype.accelerate = function (t) {
    for (var i = 0, e = t.length; i < e; i++) {
      var s = t[i];this.css(s, "transform", "translate3d(0,0,0)"), this.css(s, "transform-style", "preserve-3d"), this.css(s, "backface-visibility", "hidden");
    }
  }, a.prototype.setPosition = function (i, e, s) {
    var a = this,
        t = T(i).data("translate-calibration") || 1,
        o = T(i).data("rotate-calibration") || 1,
        r = T(i).data("scale-calibration") || 1,
        n = T(i).data("grayscale-calibration") || 1,
        h = T(i).data("blur-calibration") || 1,
        l = T(i).data("brightness-calibration") || 1,
        p = (T(i).data("contrast-calibration"), T(i).data("hue-rotate-calibration") || 1),
        c = T(i).data("opacity-calibration") || 1,
        y = T(i).data("saturate-calibration") || 1,
        u = T(i).data("sepia-calibration") || 1,
        d = T(i).data("skewX-calibration") || 1,
        m = (T(i).data("skewX-calibration"), T(i).data("perspective") || 0),
        b = (e + s) * o / 2 + "deg",
        v = 1 + (e + s) * r / 2,
        f = (e + s) * d / 2 + "deg",
        x = 100 - (e + s) * n / 2 + "%",
        w = Math.max((e + s) * h / 2, 0) + "px",
        g = 100 - (e + s) * l / 2 + "%",
        X = (e + s) * p / 2 + "deg",
        Y = 1 - (e + s) * c / 200,
        M = 100 - (e + s) * y / 2 + "%",
        D = 100 - (e + s) * u / 2 + "%";e = e * t + "px", s = s * t + "px";var F = "",
        $ = "",
        S = T(i).data("parallax-type") || "";if (0 < S.length) var k = S.split(",");else k = this.type;k.forEach(function (t) {
      "translate" == (t = t.trim()) && (a.transform3DSupport ? F = F + "translate3d(" + e + "," + s + ",0) " : a.transform2DSupport ? F = F + "translate(" + e + "," + s + ") " : (i.style.left = e, i.style.top = s)), "rotate" == t && (F = a.transform3DSupport ? F + "rotate3d(0, 0, 1, " + b + ") " : F + "rotate(" + b + ") "), "rotateX" == t && (F = F + "rotateX(" + b + ") "), "rotateY" == t && (F = F + "rotateY(" + b + ") "), "scale" == t && (F = a.transform3DSupport ? F + "scale3d(" + v + ", " + v + ", 1) " : F + "scale(" + v + ") "), "skewX" == t && (F = F + "skewX(" + f + ") "), "skewY" == t && (F = F + "skewX(" + f + ") "), "grayscale" == t && ($ = $ + "grayscale(" + x + ") "), "blur" == t && ($ = $ + "blur(" + w + ") "), "brightness" == t && ($ = $ + "brightness(" + g + ") "), "contrast" == t && ($ = $ + "contrast(" + g + ") "), "hue-rotate" == t && ($ = $ + "hue-rotate(" + X + ") "), "saturate" == t && ($ = $ + "saturate(" + M + ") "), "sepia" == t && ($ = $ + "sepia(" + D + ") "), "opacity" == t && (i.style.opacity = Y), "perspective" == t && (F = F + "perspective(" + m + ") ");
    }), this.css(i, "-webkit-transform", F), this.css(i, "transform", F), this.css(i, "-moz-filter", $), this.css(i, "-webkit-filter", $), this.css(i, "filter", $);
  }, a.prototype.onOrientationTimer = function (t) {
    this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable());
  }, a.prototype.onCalibrationTimer = function (t) {
    this.calibrationFlag = !0;
  }, a.prototype.onWindowResize = function (t) {
    this.updateDimensions();
  }, a.prototype.onAnimationFrame = function () {
    this.updateBounds();var t = this.ix - this.cx,
        i = this.iy - this.cy;(Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? i : this.iy, this.my = this.calibrateY ? t : this.ix) : (this.mx = this.calibrateX ? t : this.ix, this.my = this.calibrateY ? i : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;for (var e = 0, s = this.$layers.length; e < s; e++) {
      var a = this.depths[e],
          o = this.$layers[e],
          r = this.vx * a * (this.invertX ? -1 : 1),
          n = this.vy * a * (this.invertY ? -1 : 1);this.setPosition(o, r, n);
    }this.raf = requestAnimationFrame(this.onAnimationFrame);
  }, a.prototype.onDeviceOrientation = function (t) {
    if (!this.desktop && null !== t.beta && null !== t.gamma) {
      this.orientationStatus = 1;var i = (t.beta || 0) / 30,
          e = (t.gamma || 0) / 30,
          s = y.innerHeight > y.innerWidth;this.portrait !== s && (this.portrait = s, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = i, this.cy = e), this.ix = i, this.iy = e;
    }
  }, a.prototype.onMouseMove = function (t) {
    var i = t.clientX,
        e = t.clientY;!this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, this.iy = (e - this.wcy) / this.wry);
  };var n = { enable: a.prototype.enable, disable: a.prototype.disable, updateLayers: a.prototype.updateLayers, calibrate: a.prototype.calibrate, friction: a.prototype.friction, invert: a.prototype.invert, scalar: a.prototype.scalar, limit: a.prototype.limit, origin: a.prototype.origin };T.fn[o] = function (e) {
    var s = arguments;return this.each(function () {
      var t = T(this),
          i = t.data(o);i || (i = new a(this, e), t.data(o, i)), n[e] && i[e].apply(i, Array.prototype.slice.call(s, 1));
    });
  };
}(window.jQuery || window.Zepto, window, document);
//# sourceMappingURL=index.js.map
