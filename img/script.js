// variables
var accordionBtn = document.querySelectorAll('.accordionTitle');
var allTexts = document.querySelectorAll('.text');
var accIcon = document.querySelectorAll('.accIcon');

// event listener
accordionBtn.forEach(function (el) {
  el.addEventListener('click', toggleAccordion);
});

// function
function toggleAccordion(el) {
  var targetText = el.currentTarget.nextElementSibling.classList;
  var targetAccIcon = el.currentTarget.children[0];
  var target = el.currentTarget;

  if (targetText.contains('show')) {
    targetText.remove('show');
    targetAccIcon.classList.remove('anime');
    target.classList.remove('accordionTitleActive');
  } else {
    accordionBtn.forEach(function (el) {
      el.classList.remove('accordionTitleActive');

      allTexts.forEach(function (el) {
        el.classList.remove('show');
      });

      accIcon.forEach(function (el) {
        el.classList.remove('anime');
      });
    });

    targetText.add('show');
    target.classList.add('accordionTitleActive');
    targetAccIcon.classList.add('anime');
  }
}

const contentBox = document.querySelectorAll('.box__theme-contents');
const optionTitle = document.querySelectorAll(
  '.box__option--long-round--1-3-1'
);

contentBox.forEach(function (el) {
  el.addEventListener('click', toggleBoxAccordion);
});

function toggleBoxAccordion(el) {
  const targetBox = el.currentTarget.nextElementSibling.classList;
  const targetAccIcon = el.currentTarget.children[0];
  const target = el.currentTarget;

  if (
    target.children[0].classList.contains('anime') &&
    target.classList.contains('open')
  ) {
    targetBox.remove('show');
    targetAccIcon.classList.remove('anime');
    target.classList.remove('open');
  } else if (
    !target.children[0].classList.contains('anime') &&
    !target.classList.contains('open')
  ) {
    targetBox.add('show');
    target.classList.add('open');
    targetAccIcon.classList.add('anime');
  }
}

optionTitle.forEach(function (el) {
  el.addEventListener('click', toggleOptionAccordion);
});

function toggleOptionAccordion(el) {
  const targetOptions = el.currentTarget.nextElementSibling.classList;
  const targetAccIcon = el.currentTarget.children[0];
  console.log(targetAccIcon);
  const target = el.currentTarget;

  if (target.classList.contains('open')) {
    targetOptions.remove('show');
    targetAccIcon.classList.remove('anime');
    target.classList.remove('open');
  } else {
    targetOptions.add('show');
    targetAccIcon.classList.add('anime');
    target.classList.add('open');
  }
}

const details = document.querySelectorAll('details');

details.forEach((targetDetail) => {
  targetDetail.addEventListener('click', () => {
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute('open');
      }
    });
  });
});

// content
$(".wrap__theme--1-1-1 button").click(function(){
  $(this).toggleClass('on');
  var theParent = $(this).closest('.box__option--pressed');
});

$(".container__main button").click(function(){
  $(this).toggleClass('on');
  var theParent = $(this).closest('.tile--select');
});

// sns share
$(window).ready(function(){ 
  $(".sns-list li a").click(function(){
          shareAct(this);
      });
  });

  function shareAct(a){
  var snsCode = $(a).attr('id');
  var cUrl = "https://sen.go.kr/schoolwithyou/";

  switch(snsCode){
      case"vIconTw":
          //트위터
          cUrl = 'https://twitter.com/intent/tweet?text=스쿨위드유:&url='+cUrl;
      break;
      case"vIconFb":
          //페이스북
          cUrl = 'http://www.facebook.com/sharer/sharer.php?u='+cUrl;
      break;
  }

  window.open(cUrl,'','width=600,height=300,top=100,left=100,scrollbars=yes');
};

// dim layer
$('.btn-share').click(function(){
  var $href = $(this).attr('href');
  layer_popup($href);
});

function layer_popup(el){

  var $el = $(el);
  var isDim = $el.prev().hasClass('dimBg');	

  isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

  var $elWidth = ~~($el.outerWidth()),
      $elHeight = ~~($el.outerHeight()),
      docWidth = $(document).width(),
      docHeight = $(document).height();

  if ($elHeight < docHeight || $elWidth < docWidth) {
      $el.css({
          marginTop: -$elWidth/8,
          marginLeft: -$elWidth/2
      })
  } else {
      $el.css({top: 0, left: 0});
  }

  $el.find('a.btn-layerClose').click(function(){
      isDim ? $('.dim-layer').fadeOut() : $el.fadeOut();
      return false;
  });

  $('.layer .dimBg').click(function(){
      $('.dim-layer').fadeOut();
      return false;
  });

};

// kakao
// Kakao.init('4dc76908be5d88021b7292835f4614fa');
//       Kakao.Link.createDefaultButton({
//         container: '#create-kakao-link-btn',
//         objectType: 'feed',
//         content: {
//           title: '#스쿨위드유',
//           description: '서울특별시교육청 학교 성폭력 온라인 신고센터 #스쿨위드유',
//           imageUrl:
//             'https://sen.go.kr/schoolwithyou/img/logo.png',
//           link: {
//             mobileWebUrl: 'https://sen.go.kr/schoolwithyou/',
//             webUrl: 'https://sen.go.kr/schoolwithyou/',
//           },
//         },
//         buttons: [
//           {
//             title: '웹으로 보기',
//            link: {
//               mobileWebUrl: 'https://sen.go.kr/schoolwithyou/',
//               webUrl: 'https://sen.go.kr/schoolwithyou/',
//             },
//           },
//         ],
//       });