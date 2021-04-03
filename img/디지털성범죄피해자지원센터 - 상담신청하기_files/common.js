"use strict";

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
} // ie NodeList polyfill


if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

window.addEventListener("DOMContentLoaded", function () {
  //   const blind = document.querySelector(".blind");
  var menuButton = document.querySelector(".menu_btn");
  var sideArea = document.querySelector("header .side"); // 모바일 메뉴 토글

  menuButton.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
      e.target.classList.remove("close"); //   blind.classList.remove("on");

      sideArea.classList.remove("on");
    } else {
      e.target.classList.add("close"); //   blind.classList.add("on");

      sideArea.classList.add("on");
    }
  });
  var tabArea = document.querySelectorAll(".tab_area");
  var customRadio = document.querySelectorAll('.custom_radio_area input[type="radio"]');

  if (tabArea) {
    tabFunc(tabArea);
  }

  if (customRadio) {
    customRadioSet(customRadio);
  }

  currentPage();
});

function tabFunc(tabArea) {
  tabArea.forEach(function (tab) {
    var tabButtonList = tab.querySelectorAll(":scope> .tab_button_list > ul > li");
    var tabViewList = tab.querySelectorAll(":scope > .tab_view_list > div");
    var tabTitle = tab.querySelector(":scope> .tab_button_list > .tab_title"); // init

    tabTitle.innerHTML = tabButtonList[0].textContent;
    tabButtonList[0].classList.add("selected");
    tabViewList[0].classList.add("selected"); // function

    tabTitle.addEventListener("click", function (e) {
      e.target.nextElementSibling.classList.toggle("on");
    });
    tabButtonList.forEach(function (button, i) {
      button.addEventListener("click", function () {
        var windowWidth = window.innerWidth;

        if (windowWidth <= 1201) {
          button.parentNode.classList.remove("on");
        }

        tabButtonList.forEach(function (item) {
          item.classList.remove("selected");
        });
        button.classList.add("selected");
        tabTitle.innerHTML = button.textContent;
        tabViewList.forEach(function (tabView) {
          tabView.classList.remove("selected");
        });
        tabViewList[i].classList.add("selected");
      });
    });
  });
} // 현재 접속한 페이지를 header_nav에 표시


function currentPage() {
  var headerNav = document.querySelectorAll("header nav > ul > li"); // console.log(headerNav);

  headerNav.forEach(function (list) {
    var depth2List = list.querySelector("ul");

    if (depth2List) {
      var list2 = depth2List.querySelectorAll("li");
      list2.forEach(function (li) {
        addEffectNav(li);
      });
    }

    addEffectNav(list);
  });
}

function addEffectNav(li) {
  var nowPageLocation = location.pathname;
  var navLocation = li.querySelector("a").getAttribute("href").split("/").pop().replace(/[0-9]/gi, "").replace(/\.html/g, ""); // console.log(navLocation);

  if (nowPageLocation.indexOf(navLocation) >= 0) {
    li.classList.add("active");
  }
}

function replaceOnlyText(_this, selectType) {
  var onlyType = "";
  var number = /[^0-9]/g;

  switch (selectType) {
    case "number":
      onlyType = number;
      break;

    default:
      return;
  }

  return _this.value = _this.value.replace(onlyType, "");
} // 코드 정리 필요


function customRadioSet(customRadio) {
  // console.log(customRadio);
  customRadio.forEach(function (radio) {
    if (radio.checked) {
      radio.nextElementSibling.classList.add("selected");
    } else {
      radio.nextElementSibling.classList.remove("selected");
    }

    radio.addEventListener("change", function () {
      customRadio.forEach(function (radio2) {
        if (radio2.checked) {
          radio.nextElementSibling.classList.add("selected");
        } else {
          radio2.nextElementSibling.classList.remove("selected");
        }
      });
    });
  });
}

function controlClass(control, findElement, className) {
  var element = document.querySelector(findElement);

  switch (control) {
    case "add":
      element.classList.add(className);
      break;

    case "remove":
      element.classList.remove(className);
      break;

    default:
      return;
  }
}