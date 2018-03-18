$(function() {

    jQuery.extend( jQuery.easing,{
        def: 'easeOutQuad',
        easeOutBounce: function (x,t,b,c,d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
    });


	var menu = $(".menu");
    var indicator = $('<span class="indicator"></span>');
    var main = $('#main');
	menu.append(indicator);
	position_indicator(menu.find("li.active"));
	setTimeout(function() {
		indicator.css("opacity", 1);
	}, 500);
	menu.find("li").mouseenter(function() {
		position_indicator($(this));
	});
	menu.find("li").mouseleave(function() {
		position_indicator(menu.find("li.active"));
	});

	function scrollTo(jElement) {
		if (jElement) {
			console.log(jElement)
			$('html, body').animate({
				scrollTop: jElement.offset().top - 75
			}, 2000);
		}
	}

	function position_indicator(ele) {
		var left = ele.offset().left - 0;
		var width = ele.width();
		indicator.stop().animate({
			left: left,
			width: width,
			duration: 50,
			specialEasing: {
				"width": 'easeOutBounce'
			}
		});
    }
    
    function closeMenu(){
        $(main).animate({
            marginLeft:'0px'
        }, 750, function(){
            console.log("menu closed!");
        })
    }

    var toggle = false;

	$('li').click(function() {
		if (!$(this).hasClass('active')) {
			$('.active').removeClass('active').removeClass('hvr');
			$(this).addClass('active').addClass('hvr');
            toggle = true;
            setTimeout(function(){
                toggle = false;
            },2000)
        }

        var id = $(this).get(0).getAttribute('scroll-to');
        if($('.menu-small').is(":visible")){
            console.log("menu is visible!");
            closeMenu();
            setTimeout(function(){
                scrollTo($(`#${id}`));
                $('.menu-small-click').fadeIn();
            },750)
        } else {
            console.log(id, $(`#${id}`));
            if (id) {
                scrollTo($(`#${id}`));
            }
        }
        
    })
    
    $('.menu-small-click').click(function(){
        //Hide the click button and animate the main window moving right
        $(this).hide();
        $(main).animate({
            marginLeft:"275px",
            ease:'swing'
        }, 750,  function(){
            console.log("menu opened!");
        })
    })

	$(window).scroll(function() {
		// 100 = The point you would like to fade the nav in.
		if ($(window).scrollTop() > 100) {
			$('.bg').addClass('show');
			$('.menu').addClass('scrolled');

		} else {

			$('.bg').removeClass('show');
			$('.menu').removeClass('scrolled');

        };
        
        var win = $(window).scrollTop();

        var arr = [
            {
                "winObj":'#intro',
                "menuObj":'.menuIntro'
            },
            {
                "winObj":'#resume',
                "menuObj":'.menuResume'
            },
            {
                "winObj":'#cover',
                "menuObj":'.menuCover'
            },
            {
                "winObj":'#openings',
                "menuObj":'.menuOpenings'
            },
            {
                "winObj":'#interviews',
                "menuObj":'.menuInterviews'
            },
            {
                "winObj":'#generator',
                "menuObj":'.menuGenerator'
            }
        ]


       for(var i = 4; i >= 0; i--){
            console.log(win, i,arr[i], arr[i].winObj, $(arr[i].winObj),$(arr[i].winObj).offset());
            if($(arr[i].winObj).offset()){
                if(win >= $(arr[i].winObj).offset().top - 150){
                    if(!$(arr[i].menuObj).hasClass('active') && !toggle){
                        $('.active').removeClass('active').removeClass('hvr');
                    
                        console.log("adding classes to ", arr[i].menuObj)
                        $(arr[i].menuObj).addClass('active').addClass('hvr');
                        position_indicator(menu.find("li.active"));
                    }

                    break;
                    
                }
            }
       }
	});

	$('.scroll').on('click', function(e) {
		e.preventDefault()

		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 1500);
	});

});