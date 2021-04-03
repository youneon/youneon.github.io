"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// IE에서 :scope 사용 가능하게 해주는 polyfill
try {
  // test for scope support
  document.querySelector(":scope *");
} catch (error) {
  (function (ElementPrototype) {
    // scope regex
    var scope = /:scope(?![\w-])/gi; // polyfill Element#querySelector

    var querySelectorWithScope = polyfill(ElementPrototype.querySelector);

    ElementPrototype.querySelector = function querySelector(selectors) {
      return querySelectorWithScope.apply(this, arguments);
    }; // polyfill Element#querySelectorAll


    var querySelectorAllWithScope = polyfill(ElementPrototype.querySelectorAll);

    ElementPrototype.querySelectorAll = function querySelectorAll(selectors) {
      return querySelectorAllWithScope.apply(this, arguments);
    }; // polyfill Element#matches


    if (ElementPrototype.matches) {
      var matchesWithScope = polyfill(ElementPrototype.matches);

      ElementPrototype.matches = function matches(selectors) {
        return matchesWithScope.apply(this, arguments);
      };
    } // polyfill Element#closest


    if (ElementPrototype.closest) {
      var closestWithScope = polyfill(ElementPrototype.closest);

      ElementPrototype.closest = function closest(selectors) {
        return closestWithScope.apply(this, arguments);
      };
    }

    function polyfill(qsa) {
      return function (selectors) {
        // whether the selectors contain :scope
        var hasScope = selectors && scope.test(selectors);

        if (hasScope) {
          // fallback attribute
          var attr = "q" + Math.floor(Math.random() * 9000000) + 1000000; // replace :scope with the fallback attribute

          arguments[0] = selectors.replace(scope, "[" + attr + "]"); // add the fallback attribute

          this.setAttribute(attr, ""); // results of the qsa

          var elementOrNodeList = qsa.apply(this, arguments); // remove the fallback attribute

          this.removeAttribute(attr); // return the results of the qsa

          return elementOrNodeList;
        } else {
          // return the results of the qsa
          return qsa.apply(this, arguments);
        }
      };
    }
  })(Element.prototype);
}

$(document).ready(function () {
  var innerWidth = $(window).width(); // changeImage();

  $(window).resize(function () {// changeImage();
  });

  if (location.pathname != "/") {
    $("#logo_img").attr("src", "/images/logo.png");
    $("#gnbWrap .gnb li a").addClass("gnb-text"); // $('#gnbWrap .gnb li a').hover( function(){$(this).css({'color':'#ffffff','text-shadow':'0 0 2px #000'})}, function(){$(this).css({'color':'#ffffff','text-shadow':'0 0 2px #000'})});

    $("#headerWrap").css("background", "#ffffff");
    $(window).scroll(function () {
      var scrollValue = $(document).scrollTop();
      var headerHeight = $("#headerWrap").height();

      if (scrollValue >= 90) {
        $("#headerWrap").addClass("compact").addClass("animate").addClass("fast").addClass("fadeInDown");
      } else {
        $("#headerWrap").removeClass("compact").removeClass("animate").removeClass("fast").removeClass("fadeInDown");
      }
    });
  }

  $(document).on("click", "#toggleBtn", function () {
    var mobileNav = $("#mobile");
    var target = $(this);

    if (!mobileNav.hasClass("show")) {
      var parentNavHeight = $(".navbar").css("height");
      mobileNav.css("top", parentNavHeight);
      target.find("i").removeClass("fa").removeClass("fa-bars");
      target.find("i").addClass("fas").addClass("fa-times-circle");
    } else {
      target.find("i").removeClass("fas").removeClass("fa-times-circle");
      target.find("i").addClass("fa").addClass("fa-bars");
    }

    mobileNav.toggleClass("show");
  });
}); // 해당 element로 화면 이동

function offsetElement(target) {
  var offset = $(target).offset();
  $("html, body").animate({
    scrollTop: offset.top
  }, 100);
} // 체크박스에 체크 된 데이터 값 가져오기


var getCheckData = function getCheckData(name) {
  var array = new Array();

  if ($("input[name=".concat(name, "]")).is(":checked") == false) {
    return array;
  }

  $("input[name=".concat(name, "]:checked")).each(function () {
    var value = $(this).val();
    array.push(value);
  });
  return array;
}; // 라디오박스에 체크 된 데이터 값 가져오기


var getRadioData = function getRadioData(name) {
  if ($("input[name=".concat(name, "]")).is(":checked") == false) {
    return "";
  }

  var value = $("input[name=".concat(name, "]:checked")).val();
  return value;
}; // 체크박스 체크시 input 항목 disalbe 제거


var checkActivate = function checkActivate(className, isConverse, comment) {
  if (!isConverse) isConverse = false;
  var element = $(".".concat(className));
  element.change(function () {
    var target = $(this);
    var data_target = target.attr("data-target");
    var targetElement = $(".".concat(data_target));
    var checked = isConverse ? true : false;
    targetElement.val("");

    if (target.is(":checked")) {
      if (comment) targetElement.val(comment);
      targetElement.attr("disabled", checked);
    } else {
      targetElement.attr("disabled", !checked);
    }
  });
};

var checkTargetRadio = function checkTargetRadio(className) {
  var element = $(".".concat(className));
  element.change(function () {
    var target = $(this);
    var data_target = target.attr("data-target");
    var targetElement = $(".".concat(data_target));

    if (target.is(":checked")) {
      targetElement.attr("disabled", false);
    } else {
      targetElement.attr("disabled", true);

      var _iterator = _createForOfIteratorHelper(targetElement),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _element = _step.value;
          $(_element).prop("checked", false);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });
};

var emptyRadioData = function emptyRadioData(name) {
  $("input:radio[name='".concat(name, "']")).each(function () {
    $(this).prop("checked", false);
  });
};

var emptyCheckData = function emptyCheckData(name) {
  $("input[name='".concat(name, "']")).each(function () {
    $(this).prop("checked", false);
  });
}; // date picker


var viewDatePicker = function viewDatePicker() {
  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
    var element = _elements[_i];
    $(element).datepicker({
      dateFormat: "yy-mm-dd",
      prevText: "<",
      nextText: ">",
      yearRange: "1900:",
      maxDate: new Date(),
      monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      dayNames: ["일", "월", "화", "수", "목", "금", "토"],
      monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      showMonthAfterYear: true,
      changeMonth: true,
      changeYear: true,
      yearSuffix: "년"
    });
  }
}; // 한국 현재시간 년월일 구하기


var getKrDate = function getKrDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return "".concat(year, "\uB144 ").concat(month, "\uC6D4 ").concat(day, "\uC77C");
}; // 필수항목 확인


var requiredData = function requiredData() {
  for (var _len2 = arguments.length, elements = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    elements[_key2] = arguments[_key2];
  }

  for (var _i2 = 0, _elements2 = elements; _i2 < _elements2.length; _i2++) {
    var element = _elements2[_i2];

    if (!$(element).val() || $(element).val().trim() == "") {
      return false;
    }
  }

  return true;
}; // 너비 사이즈 별 메인 안내 이미지 변경


var changeImage = function changeImage() {
  var windowWidth = $(window).width();

  if (windowWidth <= 900) {
    $("#contentsWrap .img01-wrap .img1 img").attr("src", "/images/mobile-consulting.png");
  } else {
    $("#contentsWrap .img01-wrap .img1 img").attr("src", "/images/consulting.png");
  }
};