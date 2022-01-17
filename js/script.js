(function($){

        //change nav while scrolling
        if ($(window).width() > 991){
            $(".header .baseline").hide();
            $(window).scroll(function() {
              if ($(window).scrollTop() >= 200) {
                  $(".header .baseline").show();
                  $(".header").addClass("header_sticky");
            
              } else {
                $(".header .baseline").hide();
                $(".header").removeClass("header_sticky");
              }
            });
          };


    $('#__Questions').slick({
        arrows: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        swipe: false
    });
    $('#__Questions').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('#__Questions').find('.question').removeClass('on');
        $('#__Questions').find('.answer').slideUp();
    });
    $('.question .label').on('click', function(ev){
        ev.preventDefault();

        var $parent = $(this).parents('.question');

        $parent.toggleClass('on');
        $parent.find('.answer').slideToggle('700    ');
    
        setTimeout(function(){
            $parent.siblings('.question').removeClass('on');
            $parent.siblings('.question').find('.answer').slideUp();
        }, 700);
    });
    $('input[type="text"]').on('input', function(ev){
        $(this).attr('value', $(this).val());
    })

    $('.calculator .forms .form .step-title').on('click', function (ev) { 
        ev.preventDefault();

        if(window.innerWidth < 992){
            $(this).next().slideToggle();
            $(this).toggleClass('on');
        }
    })

    // 
    var win = $(window);
    var slider = $(".fiscalite .list > ul");
    var soutienSlider = $(".soutien .items");
    var init = {
        autoplay: true,
        infinite: true,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true 
    };
    win.on("load resize", function () {
        if (win.width() < 576) {
        slider.not(".slick-initialized").slick(init);
        } else if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
        }
        if (win.width() < 992) {
            soutienSlider.not(".slick-initialized").slick({
                infinite: true,
                arrows: false,
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '30px',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            centerPadding: '20px'
                        }
                    }
                ]
            });
        } else if (soutienSlider.hasClass("slick-initialized")) {
        soutienSlider.slick("unslick");
        }
    });

    let lastPoint = 0;
    $(window).scroll(function (ev) { 
        const scrollTop = $(this).scrollTop();
        const winheight = this.innerHeight;

        if(scrollTop > lastPoint){
            $('body').addClass('hideNavMenu');
        }else{
            $('body').removeClass('hideNavMenu');
        }

        $elems = $('.animate');

        $elems.each(function(ind, elem){
            const offset = $(elem).offset().top;
             
            if((scrollTop + winheight - 150) > offset){
                $(elem).addClass('on');
            }
        });
        lastPoint = scrollTop;
    })

    $(document).on('click', '.goto[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    let currentPopupwrap; 
    let currentPopupItem; 
    // Fiscalite Pop-ups
    $('.fiscalite .list ul li:not(.clickable)').on('click', function(){
        const $this = $(this);
        currentPopupwrap = $this;

        $this.addClass('on');
        setTimeout(function(){
            //const pos = $this[0].getBoundingClientRect();
            // console.log((pos.x + (pos.width / 2)));
            // console.log((pos.x + (pos.width / 2)));
            const popup = $this.find('.popup');
            currentPopupItem = popup;

            if($this.parents('ul').hasClass('slick-initialized') ){
                popup.appendTo('#wrapFiscalite');
            }

                popup.animate({
                    opacity   : '1',
                }, {
                    duration: 500,
                    step: function(now,fx) {
                        $(this).css({
                            '-webkit-transform': 'translate(-50%, -50%) scale(1)',
                            'visibility': 'visible',
                        }); 
                    }
                });
                
                popup.find('.close').on('click', function(ev){
                    ev.stopPropagation();
                    popup.animate({
                        opacity   : '0',
                    }, {
                        duration: 500,
                        step: function(now,fx) {
                            $(this).css({
                                '-webkit-transform': 'translate(-50%, -50%) scale(0)',
                                'visibility': 'hidden',
                            }); 
                        }
                    });

                    setTimeout(function(){
                        popup.appendTo($this);
                        $this.removeClass('on');
                    }, 500);
                    

                });
        }, 700);
    });

    $('.lireplus').on('click', function(ev){
        ev.preventDefault();
        if($('.readmore').is(':visible')){
            $('.readmore').slideUp();
            $(this).text($(this).attr('toggleon'));
        }else{
            $('.readmore').slideDown();
            $(this).text($(this).attr('toggleoff'));
        }

    });
})(jQuery);



/**
 * 
 * Youtube Video API 
 */
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: document.getElementById('player').getAttribute('video-id'),
        playerVars: {rel: 0, showinfo: 1, modestbranding : 1},
        events: {
        //'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });

    // player.addEventListener("onStateChange", function(state){
    //     if(state === 0){
    //         $('#player').removeClass('on')
    //         $('#player').find('.play__btn').fadeIn(250);
    //     }
    // });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }

    if(event === 0){
        $('#player').removeClass('on')
        $('#player').find('.play__btn').fadeIn(250);
    }
}

function stopVideo() {
    player.stopVideo();
}
function PlayVideo() {
    player.playVideo();
}

jQuery('#player + .play__btn').on('click', function(){
    PlayVideo();
    $(this).parent().addClass('on')
    $(this).fadeOut(250);
})