"use strict";

$(function () {});

function onPrint(id) {
  var initBody = document.body.innerHTML;

  window.onbeforeprint = function () {
    document.body.innerHTML = document.getElementById(id).innerHTML;
  };

  window.onafterprint = function () {
    document.body.innerHTML = initBody;
  };

  window.print();
  $("[rel=tooltip]").tooltip();
}

;

function encodeQueryData(data) {
  var ret = [];

  for (var d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }

  return ret.join('&');
}

function checkValidPhone(val) {
  if (val == "") return true;
  var reg = /^[-+0-9]{0,30}$/;

  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
}

function checkValidEmail(val) {
  if (val == "") return true;
  var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
}

var checkValidPeople = function checkValidPeople(object, callback) {
  if (!callback) callback = function callback() {};
  var type = {
    name: /^.{0,30}$/,
    phone: /^[-+0-9]{0,30}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    address_detail: /^.{0,30}$/,
    nationality: /^.{0,30}$/
  };
  var type_str = {
    name: '이름',
    phone: '연락처',
    email: '이메일',
    nationality: '국적',
    address_detail: '상세주소'
  };

  for (var key in object) {
    if (!object[key] || object[key] == '') {
      continue;
    }

    if (!type[key]) {
      continue;
    }

    if (!type[key].test(object[key])) {
      callback(type_str[key]);
      return type_str[key];
    }
  }

  callback(true);
  return null;
};