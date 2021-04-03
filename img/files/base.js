"use strict";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  var weekName = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();

      case "yy":
        return (d.getFullYear() % 1000).zf(2);

      case "MM":
        return (d.getMonth() + 1).zf(2);

      case "dd":
        return d.getDate().zf(2);

      case "E":
        return weekName[d.getDay()];

      case "HH":
        return d.getHours().zf(2);

      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);

      case "mm":
        return d.getMinutes().zf(2);

      case "ss":
        return d.getSeconds().zf(2);

      case "a/p":
        return d.getHours() < 12 ? "AM" : "PM";

      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
      i = 0;

  while (i++ < len) {
    s += this;
  }

  return s;
};

String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

jQuery.fn.extend({
  scrollToMe: function scrollToMe() {
    var x = jQuery(this).offset().top - 100;
    jQuery('html,body').animate({
      scrollTop: x
    }, 100);
  }
}); // 숫자 1000 단위마다 콤마 찍기 (ex, num.format();)

Number.prototype.format = function () {
  if (this == 0) return 0;
  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = this + '';

  while (reg.test(n)) {
    n = n.replace(reg, '$1' + ',' + '$2');
  }

  return n;
};

function numFormat(num) {
  if (num == 0) return 0;
  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = num + '';

  while (reg.test(n)) {
    n = n.replace(reg, '$1' + ',' + '$2');
  }

  return n;
}

function openNewTab(url) {
  window.open(url, '_blank');
}

function isTorrentFile(file) {
  if (file.size > 1024 * 1024 * 10) {
    toastr.error("Seed 파일은 10MB를 넘을 수 없습니다.");
    return false;
  } else if (file.name.split('.').pop().toUpperCase() != "TORRENT") {
    toastr.error(".torrent 확장자의 파일만 업로드할 수 있습니다.");
    return false;
  }

  return true;
}

;

function isDNAFile(file) {
  if (file.size > 1024 * 1024 * 1024 * 5) {
    toastr.error("DNA 파일은 5GB를 넘을 수 없습니다.");
    return false;
  } else if (file.name.split('.').pop().toUpperCase() != "DNA") {
    toastr.error(".dna 확장자의 파일만 업로드할 수 있습니다.");
    return false;
  }

  return true;
}

;

function isMagnetLink(mag) {
  if (mag.toLowerCase().indexOf("magnet:?xt=urn:btih:") != 0 || mag.length < 60) {
    toastr.error("마그넷 링크의 양식이 잘못됐습니다.");
    return false;
  }

  return true;
}

;

function isNum(str) {
  return /^\d+$/.test(str);
}

function basename(path) {
  return path.split(/[\\/]/).pop();
}

;

function convertSize(size) {
  if (!size || isNaN(size)) {
    return "0 B";
  } else if (size < 0) {
    return "0 B";
  } else if (size < 1024) {
    return parseInt(size) + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024.0).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024.0)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024.0)).toFixed(2) + " GB";
  }
}

function convertBps(rate) {
  rate *= 8; // Byte/s => Bit/s

  if (rate <= 0) {
    return "0 bps";
  } else if (rate < 1000) {
    return parseInt(rate) + " bps";
  } else if (rate < 1000 * 1000) {
    return (rate / 1000.0).toFixed(2) + " Kbps";
  } else if (rate < 1000 * 1000 * 1000) {
    return (rate / (1000 * 1000.0)).toFixed(2) + " Mbps";
  } else {
    return (rate / (1000 * 1000 * 1000.0)).toFixed(2) + " Gbsp";
  }
}

function convertSecond(totalSeconds) {
  totalSeconds = parseInt(totalSeconds);
  if (totalSeconds == 0) return "0초";
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  var result = "";
  if (hours > 0) result += hours + "시간 ";
  if (minutes > 0) result += minutes + "분 ";
  if (seconds > 0) result += seconds + "초";
  return result;
}

function convertTime(d) {
  if (!d || isNaN(d)) return "";
  return d.format("yyyy-MM-dd HH:mm:ss");
}

function convertDate(d) {
  if (!d || isNaN(d)) return "";
  return d.format("yyyy-MM-dd");
}

function convertMon(d) {
  if (!d || isNaN(d)) return "";
  return d.format("yyyy-MM");
}

function beforeTime(d, no_enter) {
  if (!d || isNaN(d)) return "";
  var now = new Date();
  var diff = parseInt((now.getTime() - d.getTime()) / 1000);
  if (diff <= 10) return "방금 전";

  if (diff < 60) {
    return diff + "초 전";
  } else if (diff < 60 * 60) {
    return parseInt(diff / 60) + "분 전";
  } else if (diff < 60 * 60 * 12) {
    return parseInt(diff / (60 * 60)) + "시간 " + parseInt(diff / 60) % 60 + "분 전";
  } else {
    if (no_enter) {
      return d.format("yyyy-MM-dd HH:mm:ss");
    } else {
      return d.format("yyyy-MM-dd<br/>HH:mm:ss");
    }
  }
}

function secondToTimeString(second) {
  function printTime(d, h, m, s) {
    var str = "";

    if (d) {
      str += d + "일 ";
    }

    if (h) {
      str += h + "시 ";
    }

    if (m) {
      str += m + "분 ";
    }

    if (s) {
      str += s + "초 ";
    }

    return str;
  }

  if (second < 60) {
    return second + "초";
  } else if (second < 60 * 60) {
    var s = second % 60;
    var m = parseInt(second / 60);
    return printTime(0, 0, m, s);
  } else if (second < 60 * 60 * 24) {
    var s = second % 60;
    var m = parseInt(second / 60) % 60;
    var h = parseInt(second / (60 * 60)) % 24;
    return printTime(0, h, m, s);
  } else {
    var s = second % 60;
    var m = parseInt(second / 60) % 60;
    var h = parseInt(second / (60 * 60)) % 24;
    var d = parseInt(second / (60 * 60 * 24));
    return printTime(d, h, m, s);
  }
}

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function imagePreview() {
  $(document).delegate("img.preview", "mouseover mouseout", function (e) {
    if (e.type == "mouseover") {
      var pos = $(this).offset();
      var ph = 360;
      var pw = 640;
      var top = document.documentElement.scrollTop + 30;
      var left = pos.left;
      var h = $(this).height();
      var w = $(this).width();

      if ($(window).width() / 2 > left) {
        left += w + 10;
      } else {
        left -= pw + 10;
      }

      $("body").append("<p id='imgpreview'><img src='" + this.src + "' class='img-thumbnail' onerror='this.src=\"/images/image-not-found.png\"' /></p>");
      $("#imgpreview").css("top", top + "px").css("left", left + "px").fadeIn("fast");
    } else if (e.type == "mouseout") {
      $("#imgpreview").remove();
    }
  });
}

;

function imagePopupInit() {
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    // class to remove default margin from left and right side
    image: {
      verticalFit: false
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS

    }
  });
}

function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}

function isShowBlockPage() {
  return $(".blockUI.blockPage").length > 0;
}

function blockPageProgress(progress, text) {
  if (!text) text = progress + '%'; // block이 꺼진경우

  if ($('#blockpage_progress').length <= 0) {
    blockPage(true);
  }

  $("#blockpage_progress_div").removeClass("hidden");
  $('#blockpage_progress').css('width', progress + '%').prop('aria-valuenow', progress).text(text);
}

function blockPageTopProgress(top_progress, progress, top_text, text) {
  if (!top_text) top_text = top_progress + '%';
  if (!text) text = progress + '%'; // block이 꺼진경우

  if ($('#blockpage_progress').length <= 0) {
    blockPage(true);
  }

  $("#blockpage_top_progress_div").removeClass("hidden");
  $("#blockpage_progress_div").removeClass("hidden");
  $('#blockpage_top_progress').css('width', top_progress + '%').prop('aria-valuenow', top_progress).text(top_text);
  $('#blockpage_progress').css('width', progress + '%').prop('aria-valuenow', progress).text(text);
}

function blockPageText(text) {
  // block이 꺼진경우
  if ($('#blockpage_progress').length <= 0) {
    blockPage(true);
  }

  $("#blockpage_title").text(text);
}

function blockPage(onoff, message) {
  if (!message) message = '<span id="blockpage_title">잠시만 기다려주세요...</span>';
  message += '<div class="progress hidden" style="margin-top:10px;" id="blockpage_top_progress_div">' + '	<div class="progress-bar progress-bar-success notransition" id="blockpage_top_progress" role="progressbar" style="width: 0%;"' + '		aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>' + '</div>' + '<div class="progress hidden" style="margin-top:10px;" id="blockpage_progress_div">' + '	<div class="progress-bar progress-bar-success notransition" id="blockpage_progress" role="progressbar" style="width: 0%;"' + '		aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>' + '</div>';

  if (onoff) {
    $("#blockpage_progress").remove();
    $("#blockpage_progress_div").remove();
    $.blockUI({
      css: {
        border: 'none',
        padding: '15px',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#fff'
      },
      message: '<h2>' + message + '</h2>'
    });
  } else {
    $.unblockUI();
  }
}

function SHA256(s) {
  var chrsz = 8;
  var hexcase = 0;

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  }

  function S(X, n) {
    return X >>> n | X << 32 - n;
  }

  function R(X, n) {
    return X >>> n;
  }

  function Ch(x, y, z) {
    return x & y ^ ~x & z;
  }

  function Maj(x, y, z) {
    return x & y ^ x & z ^ y & z;
  }

  function Sigma0256(x) {
    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
  }

  function Sigma1256(x) {
    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
  }

  function Gamma0256(x) {
    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
  }

  function Gamma1256(x) {
    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
  }

  function core_sha256(m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      a = HASH[0], b = HASH[1], c = HASH[2], d = HASH[3], e = HASH[4], f = HASH[5], g = HASH[6], h = HASH[7];

      for (var j = 0; j < 64; j++) {
        if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }

      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }

    return HASH;
  }

  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;

    for (var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
    }

    return bin;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }

    return utftext;
  }

  function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";

    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
    }

    return str;
  }

  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

function downloadUrl(dataurl, filename) {
  var a = document.createElement("a");
  a.href = dataurl;
  a.setAttribute("download", filename);
  var b = document.createEvent("MouseEvents");
  b.initEvent("click", false, true);
  a.dispatchEvent(b);
  a.remove();
}

function makeDayDic(n) {
  var d = new Date();
  var dic = {};

  for (var i = 0; i < n; i++) {
    dic[d.format("yyyy-MM-dd")] = 0;
    d.setDate(d.getDate() - 1);
  }

  return dic;
}

function makeMonthDic(n) {
  var d = new Date();
  var dic = {};

  for (var i = 0; i < n; i++) {
    dic[d.format("yyyy-MM")] = 0;
    d.setMonth(d.getMonth() - 1);
  }

  return dic;
}

function heightRestrctur() {
  var headHeight = $('#header').height();
  var ribbonHeight = $('#ribbon').height();
  var footerHeight = $('.page-footer').height();
  var otherElementHeight = headHeight + ribbonHeight + footerHeight;
  var pageHeight = window.innerHeight;
  $('#content').css('min-height', pageHeight - otherElementHeight);
  $('#main').css('background-color', '#0c5aa6');
}

function isAdmin() {
  return $('.login-info').find('#show-shortcut span').attr('data-auth');
}

function offsetElement(target) {
  var offset = $(target).offset();
  $('html, body').animate({
    scrollTop: offset.top
  }, 400);
}

var hideToast = function hideToast() {
  if ($('#toast-container').length == 1) {
    $('#toast-container').remove();
  } else {
    showGlobalShortcutInfo();
  }
}; // body 사이즈 재조정 ( fixed footer 보정 )


var heightRestruct = function heightRestruct() {
  setTimeout(function () {
    if (location.pathname == '/unclassified_video' || location.pathname == '/classified_video' || location.pathname == '/manage_video') {
      return false;
    } else {
      var bodyHeight = $('body').height();
      var footerHeight = $('.page-footer').height();
      var fixBodyHeight = bodyHeight + footerHeight;
      $('body').css('height', "".concat(fixBodyHeight + 20, "px"));
    }
  }, 100);
}; // 원하는 element 요소 높이 계산 ( ex : calCustomHeight('#header', '.content'); )


var calCustomHeight = function calCustomHeight() {
  var currentHeight = 0;

  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
    var element = _elements[_i];
    currentHeight += $("".concat(element)).height();
  }

  return currentHeight;
}; // body 높이 재조정


var resizeBodyHeight = function resizeBodyHeight(size) {
  $('body').css('height', "".concat(size, "px"));
  $('#left-panel').css('height', "".concat(size, "px"));
};

var getArrayString = function getArrayString(type, input_data) {
  if (!type || type.length == 0 || !input_data || input_data.length == 0) return;
  var result = [];
  type.map(function (v, i) {
    if (input_data[i] == 1) result.push(v);
  });
  return result;
};

function MessageBox(title, contents, callback) {
  setTimeout(function () {
    messageBox({
      title: title,
      contents: contents,
      buttons: '취소,확인'
    }, function (buttonPressed) {
      if (buttonPressed === "확인") {
        callback(true);
      } else {
        callback(false);
      }
    });
  }, 100);
}

function messageBox(object, callback) {
  var title = object.title;
  var contents = object.contents;
  var buttons = object.buttons;
  var btnList = buttons.split(",").map(function (item) {
    return item.trim();
  });
  var btnObj = {
    "확인": {
      "id": "btnConfirm",
      "class": "btn btn-primary btn-message"
    },
    "취소": {
      "id": "btnCancel",
      "class": "btn btn-default btn-message"
    }
  };
  var btnCode = btnList.map(function (item) {
    return '<button class="' + btnObj[item]["class"] + '" id="' + btnObj[item].id + '">' + item + '</button>';
  });
  var containerEl = $('#message-container');
  var headerEl = containerEl.find('.message-header');
  var backdropEl = containerEl.find('.message-backdrop');
  var titleEl = containerEl.find('.message-title');
  var contentEl = containerEl.find('.message-content');
  var footerEl = containerEl.find('.message-footer');

  function initMessageBox() {
    containerEl.removeClass('d-none');
    backdropEl.removeClass('d-none');
    headerEl.removeClass('d-none');
    titleEl.html('');
    contentEl.html('');
    footerEl.html('');
  }
  initMessageBox();
  titleEl.html(title);
  contentEl.html(contents);
  footerEl.append(btnCode);

  if (!title) {
    headerEl.addClass('d-none');
  }

  $(document).off('focusin.modal');
  $('#message-container .btn').on('click', function () {
    var type = $(this).text();
    callback(type);
    closeMessage();
  });
}

function closeMessage() {
  $('#message-container').addClass('d-none');
}

function MessageBoxOk(title, contents, callback) {
  if (!callback) callback = function callback() {};
  messageBox({
    title: title,
    contents: contents,
    buttons: '확인'
  }, function (buttonPressed) {
    callback();
    closeMessage();
  });
}

function isUrl(u) {
  var pattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  return pattern.test(u);
}
