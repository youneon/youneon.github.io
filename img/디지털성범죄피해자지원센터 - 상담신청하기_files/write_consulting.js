"use strict";

var is_write = false;
var contentWidth; // ie11 nodelist type polyfill

if ("NodeList" in window && !NodeList.prototype.forEach) {
    console.info("polyfill for IE11");

    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

var radioTargetText = function radioTargetText(inputName) {
    for (var _len = arguments.length, text = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        text[_key - 1] = arguments[_key];
    }

    var element = $("input[name=".concat(inputName, "]"));
    element.change(function() {
        var target = $(this);
        var targetVal = $(this).val();
        var inputId = target.data("target");
        var targetEl = $(target).parents(".column").find("#".concat(inputId, ":not('.disabled_none')"));
        var allInputEl = $(target).parents(".column").find("input[type=text]:not('.disabled_none')");
        allInputEl.prop("disabled", true);
        allInputEl.val("");

        if (text.indexOf(targetVal) != -1) {
            targetEl.prop("disabled", false);
        }
    });
};

$(document).ready(function() {
    radioTargetText("req_victim_relation", "기타(가족관계)", "기타(피해자지원기관 관계자)", "기타(기타)");
    contentWidth = $("#default-warp").width();
    $(".term-step1-btngrp").attr("style", "margin-left : calc(".concat(contentWidth / 2, "px - 62.5px !important; height: 50px;"));
    $(window).resize(function() {
        $(".term-step1-btngrp").attr("style", "margin-left : calc(".concat(contentWidth / 2, "px - 62.5px !important; height: 50px"));
    });

    window.onbeforeunload = function() {
        $("input, select, textbox").blur(); // 모든포커스 제거

        if (is_write) {
            return "입력한 정보가 모두 지워집니다. 정말 페이지를 이동하시겠습니까?";
        }
    };

    $("input[type=text],textarea,select").attr("autocomplete", "off"); // 자동완성 제거

    $("input[type=text],textarea,select").val("");
    $("input[name=req_people_wanna_call]").change(function() {
        var value = getRadioData("req_people_wanna_call");

        if (value == "1") {
            $("#req_people_wanna_call_time").val("").prop("disabled", false);
        } else {
            $("#req_people_wanna_call_time").val("").prop("disabled", true);
        }
    });
    checkActivate("check_active", false);
    checkActivate("check_unknown_active", true, "알수없음");
    checkTargetRadio("check_target_radio"); // password 표시 방식 변경

    $("#password").mobilePassword();
    var inputPassword = document.querySelector("#passwordClone");
    inputPassword.setAttribute("oninput", "this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-핳]/gi,'')");
    inputPassword.setAttribute("maxlength", "15");


    captchaCheck();
}); //다음 화면

var nextStep = function nextStep(current, next) {
    $(current).removeClass("animated").removeClass("fadeIn").removeClass("fadeOut").addClass("animated  fadeOut");
    setTimeout(function() {
        $(current).addClass("d-none");
        $(next).removeClass("animated").removeClass("fadeIn").removeClass("fadeOut").removeClass("d-none").addClass("animated  fadeIn");
    }, 100);
    offsetElement(".content.write");
}; //이전 화면


var prevStep = function prevStep(current, prev) {
    $(current).removeClass("animated").removeClass("fadeIn").removeClass("fadeOut").addClass("animated  fadeOut");
    setTimeout(function() {
        $(current).addClass("d-none");
        $(prev).removeClass("animated").removeClass("fadeIn").removeClass("fadeOut").removeClass("d-none").addClass("animated  fadeIn");
    }, 100);
}; // 거부 클륵 메세지


var denialAlert = function denialAlert() {
    Swal.fire({
        type: "error",
        text: "개인정보 수집·이용 동의 시 서비스 지원이 가능합니다.",
        confirmButtonText: "확인"
    });
    return false;
}; // 필수사항 입력 메세지


var noRequiredAlert = function noRequiredAlert(message) {
    if (!message) message = "필수 사항을 모두 입력 해 주세요.";
    Swal.fire({
        type: "error",
        text: message,
        confirmButtonText: "확인"
    });
    return false;
}; // radio 박스만 체크함


var agreeCheck = function agreeCheck(step) {
    var agreeArea = document.querySelectorAll("".concat(step, " .agree input[type=\"radio\"]:checked"));
    var pass = true; // console.log(agreeArea);

    agreeArea.forEach(function(agree) {
        console.log(agree.value);

        if (agree.value !== "1") {
            Swal.fire({
                type: "info",
                customClass: {
                    container: "modal_guide"
                },
                html: "\n        <div class=\"modal_guide_area\">\n          <p class=\"title\">\uAC1C\uC778\uC815\uBCF4 \uBC0F \uBBFC\uAC10\uC815\uBCF4 \uC81C\uACF5 \uB3D9\uC758 \uC5EC\uBD80 \uC548\uB0B4</p>  \n          <p class=\"desc\">\uC548\uB0B4\uB4DC\uB9B0 \uAC1C\uC778\uC815\uBCF4 \uBC0F \uBBFC\uAC10\uC815\uBCF4\uB294 \uC628\uB77C\uC778 \uAC8C\uC2DC\uD310 \uC0C1\uB2F4 \uC2E0\uCCAD\uC11C \uC791\uC131\uC744 \uC704\uD55C \uD544\uC218 \uD56D\uBAA9\uC785\uB2C8\uB2E4.<br> \uC81C\uACF5\uC744 \uC6D0\uCE58 \uC54A\uC73C\uC2DC\uB294 \uACBD\uC6B0\uC5D0\uB294 24\uC2DC\uAC04 \uC804\uD654 \uC0C1\uB2F4\uC744 \uD1B5\uD574 \uC9C0\uC6D0\uC744 \uC2E0\uCCAD\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</p>\n          <ul>\n            <li>\n              <a href=\"tel:027358994\">\n                <p class=\"img\">\n                  <img src=\"/images/icon_digital.png\" alt=\"\uC0C1\uB2F4\uC804\uD654\">\n                </p>\n                <div class=\"tel_desc\">\n                  <div class=\"title\">\uB514\uC9C0\uD138\uC131\uBC94\uC8C4\uD53C\uD574\uC790\uC9C0\uC6D0\uC13C\uD130</div>\n                  <div class=\"tel\">\n                    <span>\uC0C1\uB2F4\uC804\uD654</span>\n                    <img src=\"/images/icon_tel_blue.png\" alt=\"\uC804\uD654\">\n                    02-735-8994\n                  </div>\n                </div>\n              </a>\n            </li>\n            <li>\n              <a href=\"tel:1366\">\n                <p class=\"img\">\n                  <img src=\"/images/icon_warning.png\" alt=\"\uC5EC\uC131\uAE34\uAE09\uC804\uD654\">\n                </p>\n                <div class=\"tel_desc\">\n                  <div class=\"title\">\uC5EC\uC131\uAE34\uAE09\uC804\uD654 1366</div>\n                  <div class=\"tel\">\n                    <span>\uC5EC\uC131\uAE34\uAE09\uC804\uD654</span>\n                    <img src=\"/images/icon_tel_blue.png\" alt=\"\uC804\uD654\">\n                    1366\n                  </div>\n                </div>  \n              </a>\n            </li>\n          </ul>\n        </div>\n          ",
                confirmButtonText: "확인하기"
            });
            pass = false;
            return false;
        }
    });

    if (pass) {
        switch (step) {
            case ".step1":
                nextStep(".step1", ".step2");
                break;

            case ".step2":
                agreeAlert(step);
                break;
        }
    }
}; // 서명 입력 메세지


var agreeAlert = function agreeAlert() {
    var passSignature = function passSignature(_) {
        Swal.fire({
            type: "success",
            text: "동의서에 모두 동의 하셨습니다.",
            confirmButtonText: "확인"
        }).then(function(result) {
            if (result.value) {
                is_write = true;
                nextStep(".step2", ".step4");
            }
        });
    };

    if (!$("#signature_name").val() || $("#signature_name").val().trim() === "") {
        noRequiredAlert("본인 성명을 입력해 주세요.");
        return false;
    }

    passSignature();
    return false;
}; // 상담신청서 등록 메세지


var successAlert = function successAlert() {
    Swal.fire({
        type: "success",
        text: "상담신청서가 등록 되었습니다.",
        confirmButtonText: "확인"
    }).then(function(result) {
        if (result.value) {
            window.onbeforeunload = null;
            location.href = "/";
        }
    });
    return false;
}; // 상담신청서 등록 실패 메세지


var failedAlert = function failedAlert() {
    Swal.fire({
        type: "error",
        text: "상담신청서 등록 실패 했습니다.",
        confirmButtonText: "확인"
    }).then(function(result) {
        if (result.value) {}
    });
    return false;
};

victimValidInit();

// 영문, 숫자, 특수 문자 중 2가지 이상을 혼합해서 쓸 수 있게 유도하는 유효성 검사
function mixPassFunc(value) {
    var num = value.search(/[0-9]/g);
    var eng = value.search(/[a-z]/ig);
    var spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
        return true;
    } else {
        return false;
    }
}

// $.validator.addMethod("mixPass",function (value) {
//     var num = value.search(/[0-9]/g);
//     var eng = value.search(/[a-z]/ig);
//     var spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
//     if((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
//         return true;
//     } else {
//         return false;
//     }
// });

function victimValidInit() {

    $("form.personal_form").validate({
        onkeyup: function onkeyup(element) {
            $(element).valid();
        },
        rules: {
            title: {
                required: true,
            },
            password: {
                required: true,
                minlength: 8,
            },
            passwordClone: {
                required: true,
                minlength: 8,
            },
            name: {
                maxlength: 50,
                required: true
            },
            phone: {
                required: true,
                // matches: /^\d.*[0-9\-]{2}.*\d+$/,
                maxlength: 11
            },
            req_people_wanna_call: {
                required: true
            },
            email: {
                email: true,
                maxlength: 50,
                required: true
            },
            gender: {
                required: true
            },
            req_victim_relation: {
                required: true
            },
            content: {
                required: true
            }
        },
        messages: {
            title: {
                required: false,
            },
            password: {
                required: false,
                minlength: false,
                maxlength: false,
                mixPass: false,
            },
            passwordClone: {
                required: false,
                minlength: false,
                maxlength: false,
                mixPass: false,
            },
            name: {
                maxlength: false,
                required: false
            },
            phone: {
                required: false,
                // matches: false,
                maxlength: false
            },
            req_people_wanna_call: {
                required: false
            },
            email: {
                email: false,
                maxlength: false,
                required: false
            },
            gender: {
                required: false
            },
            req_victim_relation: {
                required: false
            },
            content: {
                required: false
            }
        },
        success: function success(error) {
            error.remove();
        },
        errorClass: "e-validation-error",
        validClass: "e-validation-success" // errorPlacement: function (error, element) {
        //   element.closest("dd").append($(error));
        // },

    });
    $("form.personal_form").valid();
} // const hiddenPassword = document.querySelector("#password2");
// 상담신청서 1페이지 필수항목 값 확인


var step1Validation = function step1Validation() {
    var title = $("#title").val().trim();
    var pass = $("#password").val().trim();
    var name = $("#req_people_name").val().trim();
    var phone = $("#req_people_phone").val().trim();
    var wanna_call = getRadioData("req_people_wanna_call");
    var wanna_call_time = $("#req_people_wanna_call_time").val().trim();
    var email = $("#req_people_email").val().trim();
    var req_contents = $("#req_contents").val().trim();
    var check_phone = checkValidPhone(phone);
    var check_email = checkValidEmail(email);
    var check_gender = requiredData("input[name=req_people_gender]:checked");
    var check_relation = requiredData("input[name=req_victim_relation]:checked");

    if (title.length === 0) {
        noRequiredAlert("게시물 제목이 필요합니다.");
        return;
    }

    if (pass.length < 8 || pass.length > 15) {
        noRequiredAlert("비밀번호는 8자 이상 15자 이하로 입력해주세요.");
        return;
    }
    console.log(mixPassFunc(pass));
    console.log("pass: " + pass);
    console.log("test: " + mixPassFunc(pass));
    if (mixPassFunc(pass) === true) {
        noRequiredAlert("비밀번호는 영문,숫자,특수문자 중 2종류 이상 혼합해서 설정하셔야 합니다.");
        return;
    }

    if (name.length === 0) {
        noRequiredAlert("의뢰자 성명이 필요합니다.");
        return;
    }

    if (req_contents.length === 0) {
        noRequiredAlert("주요 피해 및 호소 내용이 필요합니다.");
        return;
    }

    if (!check_phone || phone.length === 0) {
        noRequiredAlert("연락처를 잘못 입력했습니다. 예) 01000000000");
        return;
    }

    if (!check_email || email.length === 0) {
        noRequiredAlert("이메일을 잘못 입력했습니다. 예) user@email.com");
        return;
    }

    if (!wanna_call) {
        noRequiredAlert("전화상담 희망 여부를 선택해주세요.");
        return;
    }

    if (!check_gender) {
        noRequiredAlert("성별 지정이 필요합니다.");
        return;
    }

    if (!check_relation) {
        noRequiredAlert("피해자와의 관계 지정이 필요합니다.");
        return;
    }
    submitData();
}; // 모든 입력 내용 전송


var submitData = function submitData() {
    var data = {
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {}
    }; // step1 서명

    data.step1.signature_name = $("#signature_name").val().trim(); // step2 의뢰자 정보

    data.step2.title = $("#title").val().trim();
    data.step2.password = $("#password").val().trim();
    data.step2.req_people_name = $("#req_people_name").val().trim();
    data.step2.req_people_phone = $("#req_people_phone").val();
    data.step2.req_people_email = $("#req_people_email").val();
    data.step2.req_people_wanna_call = getRadioData("req_people_wanna_call") == "1" ? 1 : 0;
    data.step2.req_people_wanna_call_time = $("#req_people_wanna_call_time").val();
    data.step2.req_people_gender = getRadioData("req_people_gender");
    data.step2.req_victim_relation = getRadioData("req_victim_relation");
    data.step2.req_victim_relation_fam_etc = $("#req_victim_relation_fam_etc").val().trim();
    data.step2.req_victim_relation_organ_etc = null;
    data.step2.req_victim_relation_vic_sup_etc = null;
    data.step2.req_victim_relation_etc = $("#req_victim_relation_etc").val();
    data.step2.req_contents = $("#req_contents").val();
    data.recaptcha = $("#g-recaptcha-response").val();

    if (!data.recaptcha) {
        Swal.fire({
            type: "error",
            text: '"로봇이 아닙니다." 를 수행해 주세요.',
            confirmButtonText: "확인"
        });
        return;
    }

    $.ajax({
        type: "POST",
        headers: {
            "X-CSRF-Token": $("[name=_csrf]").val()
        },
        url: "/rest/add_consulting_data",
        data: {
            data: data
        },
        success: function success(result) {
            successAlert();
        },
        error: function error(e) {
            failedAlert();
        },
        complete: function complete(data) {}
    });
};

// 웹접근성을 맞추기위해 캡챠영역에 title 속성 추가
function captchaCheck() {
    let interval = setInterval(function() {
        let googleCaptcha = document.querySelector(".g-recaptcha iframe[role='presentation']");
        if (googleCaptcha) {
            googleCaptcha.setAttribute("title", "구글 리캡챠 자동 글 쓰기 방지");
            clearInterval(interval);
        }
    }, 500);
}