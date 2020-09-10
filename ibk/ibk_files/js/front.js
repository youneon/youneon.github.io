jQuery.noConflict();
var j$ = jQuery;

j$(function() {
	j$("[data-active]").tgActive();
	j$("[data-addactive]").tgAddActive();
	j$("[data-removeactive]").tgRemoveActive();
	j$("[data-mouseactive]").tgMouseActive();
	j$("[data-mouseremoveactive]").tgMouseRemoveActive();
	j$("[data-video]").tgVideo();
	j$("[data-selfactive]").selfActive();
	j$("[data-linkselect]").linkSelect();
	j$("[data-selflinkselect]").selfLinkSelect();
	j$("[data-text]").tgText();
	j$("[data-datepicker]").datep();
	j$("[data-followScroll]").followScroll();
	j$("[data-calendar]").datepicker();
	j$("[data-selftrigger]").selfTrigger();

	j$(".verticalBarChart").verticalChart();
	j$(".fileAttach").fileAttach();
	j$(".listFaq").faq();
	j$("#container").contentsHeight();
	j$(".headerNav").menuWidth();
});

// Toggle Active
j$.fn.tgActive = function() {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.on("click", function() {
		if (j$(this).attr("data-isflag") != "") {
			if (j$(this)[0].tagName == "INPUT") {
				if (j$(this).is(":checked")) {
					$tgt = j$(this).data("active");
					$tgt = $tgt.split(" ");
					for (i = 0; i <= $tgt.length; i++) {
						j$("[data-tgactive='"+$tgt[i]+"']").toggleClass("active");
					};
				};
			} else {
				$tgt = j$(this).data("active");
				$tgt = $tgt.split(" ");
				for (i = 0; i <= $tgt.length; i++) {
					j$("[data-tgactive^='"+$tgt[i]+"']").toggleClass("active");
				};
			}
		};
	});
};

// Toggle Mouse Active
j$.fn.tgMouseActive = function() {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.on("mouseenter", function() {
		$tgt = j$(this).data("mouseactive");
		$tgt = $tgt.split(" ");
		for (i = 0; i <= $tgt.length; i++) {
			j$("[data-tgmouseactive='"+$tgt[i]+"']").addClass("active");
		};
	});
};

// Toggle Mouse Active
j$.fn.tgMouseRemoveActive = function() {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.on("mouseleave", function() {
		$tgt = j$(this).data("mouseremoveactive");
		$tgt = $tgt.split(" ");
		for (i = 0; i <= $tgt.length; i++) {
			j$("[data-tgmouseactive='"+$tgt[i]+"']").removeClass("active");
		};
	});
};

// Self Active
j$.fn.selfActive = function() {
	var $obj;
	return this.each(function () {
		$obj = j$(this);

		if ($obj.find("> select").length) {
			// Select Box Control
			$obj.find("> select").on("focus", function () {
				j$(this).parent().addClass("active");
			});
			$obj.find("> select").on("change", function () {
				j$(this).blur();
			});
			$obj.find("> select").on("blur", function () {
				j$(this).parent().removeClass("active");
			});

			/*j$("select").on("click", function() {
				if(j$(this).data("click-count")) {
					j$(this).data("click-count", j$(this).data("click-count")+1);
					if(j$(this).data("click-count")%2==0){
					if(j$(this).val()==j$(this).data("prev-val")) j$(this).change();
					j$(this).data("prev-val", "");
					} else
					j$(this).data("prev-val", j$(this).val());
					} else {
					j$(this).data("click-count", 1);
					j$(this).data("prev-val",j$(this).val());
				};
			});*/
		} else {
			// Normal Control
			$obj.on("click", function () {
				j$(this).toggleClass("active");
			});
		};
	});
};

// Self Trigger
j$.fn.selfTrigger = function() {
	var $obj;
	return this.each(function () {
		$obj = j$(this);

		j$(this).trigger("click");
	});
};

// Add Active
j$.fn.tgAddActive = function () {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.on("click", function() {
		$tgt = j$(this).data("addactive");
		$tgt = $tgt.split(" ");
		for (i = 0; i <= $tgt.length; i++) {
			j$("[data-tgactive='"+$tgt[i]+"']").addClass("active");
		};
	});
};

// Remove Active
j$.fn.tgRemoveActive = function () {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.on("click", function() {
		$tgt = j$(this).data("removeactive");
		$tgt = $tgt.split(" ");
		for (i = 0; i <= $tgt.length; i++) {
			j$("[data-tgactive='"+$tgt[i]+"']").removeClass("active");
		};
	});
};

// Add Text
j$.fn.tgText = function () {
	var $obj = j$(this),
		$tgt,
		i
	;

	$obj.each(function () {
		$tgt = j$(this).data("text");
		j$("[data-tgtext='"+$tgt+"']").text(j$(this).text());
	});
};

// Video Control
j$.fn.tgVideo = function() {
	var $obj = j$(this),
		$tgt
	;

	$obj.on("click", function() {
		$tgt = j$(this).data("video");
		if (j$("[data-tgvideo='"+$tgt+"']").get(0).paused) {
			j$("[data-tgvideo='"+$tgt+"']").get(0).load();
			j$("[data-tgvideo='"+$tgt+"']").get(0).play();
		} else {
			j$("[data-tgvideo='"+$tgt+"']").get(0).pause();
		}
	});
};

// Link Select
j$.fn.linkSelect = function () {
	var $obj = j$(this);

	return this.each(function () {
		$obj.on("change", function () {
			window.open(j$(this).find("option:selected").val());
		});
	});
};

// Self Link Select
j$.fn.selfLinkSelect = function () {
	var $obj = j$(this);

	$obj.on("change", function () {
		location.href = j$(this).find("option:selected").val();
	});
};

// Element Follow Scroll
j$.fn.followScroll = function () {
	var $obj = j$(this);

	j$(document).on("scroll", function () {
		$obj.stop().animate({
			top: j$(this).scrollTop()
		});
	});
};

// Vertical Chart
j$.fn.verticalChart = function () {
	var $obj = j$(this),
		$chart = $obj.find(".bar"),

		num = 0
	;

	$chart.each(function () {
		num = j$(this).data("percentage");

		j$(this).animate({
		  "height" : num + "%"
		}, 1000);
	});

	j$(".totalNumAvg").html("<span class='num'>"+$chart.eq(0).data("percentage")+"</span>%")
};

// Circle Chart
function fwChart (target, data, total, size, color) {
	var fwChartWidth = size, // 그래프 넓이
		fwChartHeight = size, // 그래프 높이
		fwChartData = data, // 데이터
		fwChartPie = d3.layout.pie(), // 파이 차트
		fwChartArc = d3.svg.arc().innerRadius(62).outerRadius(size/2), // 파이 차트 안쪽 반지름, 바깥쪽 반지름
		fwChartTarget = d3.select(target) // 대상 파이 차트 선택
	;

	// 배열 값 합치기 함수
	function sum(array) {
	  var result = 0.0;

	  for (var i = 0; i < array.length; i++)
		result += array[i];

	  return result;
	}

	// 전체에서 취득을 뺀 값을 배열에 푸시하여 나머지를 표시
	fwChartData.push(total - sum(fwChartData));

	// 파이 차트 설정
	fwChartTarget.selectAll("path")
		.data(fwChartPie(fwChartData))
		.enter()
		.append("path")
			.attr("class", "fw-chart-pie")
			.attr("d", fwChartArc)
			.attr("transform", "translate("+ fwChartWidth / 2 +", "+ fwChartHeight / 2 +")")
			.style("fill", function (data, index) {
				return [color, "#eaeaea"][index]
			})
	;
};

// Datepicker Setting
j$.datepicker.setDefaults({
	dateFormat: 'yy-mm-dd',
	prevText: '',
	nextText: '',
	monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	dayNames: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	showMonthAfterYear: true,
	yearSuffix: '.',
	showOtherMonths: true
});

// Date Picker
j$.fn.datep = function () {
	var $obj = j$(this);
	return this.each(function () {
		$obj.datepicker({
			showOn: "button",
			buttonImage: "/images/icon/icon_calendar.png",
			buttonImageOnly: true,
			dayNamesMin: [ "SUN", "MON", "THU", "WED", "THU", "FRI", "SAT" ],
			showMonthAfterYear: true,
			showButtonPanel: false,
			monthNames: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			monthNamesShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
			//currentText: "오늘"
		})
		j$(document).on('click', "button.ui-datepicker-current", function() {
			$.datepicker._curInst.input.datepicker('setDate', new Date()).datepicker('hide');
		});
	});
};

// Page Include
j$.fn.pageInclude = function() {
	var $obj = j$(this);

	$obj.load(j$(this).data("include"));
};

// File Attach
j$.fn.fileAttach = function () {
	return this.each(function () {
		var $obj = j$(this),
			$file = $obj.find("input[type='file']"),
			$fileNMInput = $obj.find("input[type='text']"),
			fileNM = ""
		;

		$file.on('change', function(){
			if (window.FileReader){
				fileNM = j$(this)[0].files[0].name;
			} else {
				fileNM = j$(this).val().split('/').pop().split('\\').pop();
			};
			$fileNMInput.val(fileNM);
		});
	});
};

// FAQ
j$.fn.faq = function () {
	var $obj = j$(this),
		$btnAll = $obj.find("[data-faqall]"),
		$btnType = $obj.find("[data-faqtype]"),
		$faqQ = $obj.find("[data-faqlist]"),
		$faqA
	;

	$btnAll.on("click", function () {$faqQ.addClass("active");});
	$btnType.on("click", function () {
		$faqA = $obj.find("[data-faqname]");

		$faqQ.removeClass("active");
		$faqA.removeClass("active");
		$obj.find("[data-faqlist="+j$(this).data('faqtype')+"]").addClass("active");
	});

	$faqQ.find("button").on("click", function () {
		$faqA = j$(this).closest("tr").next();

		$faqA.toggleClass("active");
	});

	$btnAll.trigger("click");
};

function loadingActive() {
	var $obj = j$("[data-popup]").data("popup", "popLoading");
	$obj.toggleClass("active");
};

// Container Min-Height (Not Calc(css) Work)
j$.fn.contentsHeight = function () {
	var $headW = j$("header").height(),
		$cont = j$("#container"),
		$footW = j$("footer").outerHeight()
	;
	$cont.css({
		minHeight: j$(window).height() - $headW - $footW
	})

	j$(window).on("resize", function () {
		$cont.css({
			minHeight: j$(window).height() - $headW - $footW
		})
	});
};

// Menu Width
j$.fn.menuWidth = function () {
	var $obj = j$(this),
		$odm = $obj.find(".headerNavIn"),
		$sdm = $obj.find(".headerAllMenuEach")
	;

	$odm.find("li").each(function () {
		$sdm.eq(j$(this).index()).outerWidth(j$(this).outerWidth());
	});
};
