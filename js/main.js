$(document).ready(function(){
    
    $('#nav').on('mouseenter', function(){
        $('body').addClass('navActive');
        setTimeout(() => {
            if($('body').hasClass('navActive')){
                $('.nav_floor2').stop().slideDown(400);
            }
        }, 200);
    });

    $('#nav').on('mouseleave', function(){
        $('body').removeClass('navActive');
        if($('body').not('.navActive')){
            $('.nav_floor2').stop().slideUp(200);
        }
    });

    function mainTxtToSplitTxt(){
        var mainTxt = document.querySelectorAll('.mvs_txt h2');
        var mainSplitTxt = new SplitType(mainTxt, {types: 'words'});

        var xRes = 80;

        gsap.from(mainSplitTxt.words, {
            delay: 0.1,
            opacity: 0,
            x: xRes,
            filter: 'blur(8px)',
            duration: 0.9,
            stagger: {amount: 1},
        });
    }

const swiper1 = new Swiper('.main_visual_slider', {
  direction: 'horizontal',
  loop: true,
  effect: 'fade',
  crossFade: true,
  speed: 500,
  touchRatio: 0,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.mvs_pagination',
    clickable: true,
    renderBullet: function(index, className){
      var circleSvg1 = '<circle r="15" cx="15" cy="15" fill="none" stroke="#fff">';
      return '<span class="' + className + '">' +
      '<svg>' +
          circleSvg1 +
      '</svg>' +    
          '</span>';
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

function redefineMvsTxtHeight(){
  var mvsTxtHeight = $('.swiper-slide-active').children().find('.mvs_txt').innerHeight();
  var mvsTxtGap = 30;

  $('.mvs_pagination').css({
    'transform' : 'translateY(-' + (mvsTxtHeight + mvsTxtGap) + 'px)',
  });
}


$(window).on('load', function(){
  redefineMvsTxtHeight();
});

$(window).on('resize', function(){
  redefineMvsTxtHeight();
});


    swiper1.on('slideChangeTransitionEnd', function(){
        redefineMvsTxtHeight();
    });

    swiper1.on('slideChange', function(){
        mainTxtToSplitTxt();
    }); 

    let tl1 = gsap.timeline({

      scrollTrigger: {
        trigger: '#main',
        pin: '#main',
        scrub: 2,
        start: 'top top',
        end: '150% top',
        toggleActions: "play reverse none reverse",
        invalidateOnRefresh: true,
      }
    });

    tl1.to('.mtd1', {
      duration: 7,
      xPercent: 100,
      opacity: 0,
    });

    tl1.to('.mtd2', {
      delay: -7,
      duration: 7,
      xPercent: -100,
      opacity: 0,
    });

    tl1.to('.main_visual_slide_box', {
      delay: -7,
      duration: 7,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      top: 0,
    });

    tl1.to('#header', {
      delay: 2,
      onComplete: function(){
        $('#header').addClass('headerActive');
      },
      onReverseComplete: function(){
        $('#header').removeClass('headerActive');
      },
    });

    tl1.to('#main', {
      delay: -7,
      duration: 15,
    });

    tl1.to('#header', {
      delay: 2,
      duration: 0,
      y: -90,
    });

    var windowWidth = $(window).outerWidth();
    var swiper2 = undefined;

    function mainAboutSlide(){

      if(windowWidth < 1300 && swiper2 == undefined){
        const swiper2 = new Swiper('.about_list_slide', {
          direction: 'horizontal',
          loop: true,
          slidesPerView: 'auto',

        });
      }
      else if(windowWidth >= 1300 && swiper2 !== undefined){
        swiper2.destroy();
        swiper2 = undefined;
      }
    }

    mainAboutSlide();

    $(window).on('resize', function(){
      windowWidth = $(window).outerWidth();
      mainAboutSlide();
    });

    var sectionTitAni = document.querySelectorAll('.section_tit.ani');
    var sTAniRes = 30;

    sectionTitAni.forEach((sTAni) => {
      var sectionTitAniSpan = sTAni.querySelector('span');
      var sectionTitAniStrong = sTAni.querySelector('strong');
      var aniSpanActive = new SplitType(sectionTitAniSpan, { types: 'chars' });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section_tit.ani',
          start: '150% bottom',
        },
      });

      tl2.from(aniSpanActive.chars, {
        filter: 'blur(8px)',
        duration: 0.7,
        opacity: 0,
        x: sTAniRes,
        stagger: {amount: 0.8},
        once: true,
      });

      tl2.from(sectionTitAniStrong, {
        yPercent: 100,
        duration: 0.5,
        once: true,
      });

    });

    var circleClipAni = document.querySelectorAll('.circleClipAni');

    circleClipAni.forEach((cCa) => {
      var circleClipAniImg = cCa.querySelector('figure img');
        gsap.to(circleClipAniImg, {
        duration: 1.5,
        clipPath: 'circle(100% at 56% 41%)',
        opacity: 1,
        once: true,
        scrollTrigger: {
          trigger: circleClipAni,
          start: '70% bottom',
        },

      });
    });



    $('.overview_list ul li').on('mouseenter focusin keyup', function(){
      $(this).addClass('active').siblings().removeClass('active');
    });

    const swiper3 = new Swiper('.ud_slide', {
      direction: 'horizontal',
      slidesPerView: 4,
      loop: true,
      spaceBetween: 36,
      speed: 800,
      navigation: {
          nextEl: '.ud_next',
          prevEl: '.ud_prev',
        },
    });

    window.addEventListener("resize", ScrollTrigger.refresh());

});