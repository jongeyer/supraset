/*
 * This code handles the menu interaction and dynamics.
 */


$(document).ready(function () {
	var lazyTitles = new Blazy({
		selector: ".stretch.b-lazy",
		breakpoints: [{
			width: 768, // max-width
			src: 'data-src-small'
	    }]
	});
	var lazyScrollers = new Blazy({
		selector: ".project .b-lazy",
		breakpoints: [{
			width: 768, // max-width
			src: 'data-src-small'
	    }],
		loadInvisible: true
	});

	$('.bxslider').bxSlider({
		//mode: 'vertical',
		pager: false,
		preloadImages: 'all',
		captions: true,
		onSlideBefore: function(){
			lazyScrollers.revalidate();
		}
	});

    supra.init();
});


_.extend(supra, {
    el: $("main"),
    page: 1,

    init: function () {
        var self = this,
            $win = $(window);

        NProgress.configure({
            showSpinner: false
        });
        NProgress.start();


        //preload item?
        if (window.location.hash.length > 0) {
            self.loadPage();
        } else {
            self.setHash("top");
        }

		// menu + arrow interaction
		$('nav a, .arrow a').click(function(e) {
			e.preventDefault();
			//console.debug(e, $(e.target).attr("href"), $("" + $(e.target).attr("href")))

			var section = $(this).attr("href");
			var offset = $("" + section).offset().top;
			$('html,body').animate({ scrollTop: offset - 0 }, 1200);
			self.setHash(section.substr(1));
		});


        $win.bind('hashchange', function () {
            // TODO: set page title
            //self.loadPage();
        });

        $(".archive").click(function(e) {
			var $wrapper = $(this);
				//pid = $wrapper.data("project");

			if($wrapper.hasClass("open")){
				$wrapper.removeClass("open")
			}else{
				//$wrappers.removeClass("open");
				$wrapper.addClass("open")
			}
        });

		NProgress.done();
    },

    setHash: function (_page) {
        if(history.pushState) {
			history.pushState(null, null, "#" + _page);
		}
		else {
			location.hash = _page;
		}

		//window.location.hash = _page;
    },
    getHash: function () {
        var link = window.location.hash.substr(1),
            openParen = link.indexOf('('),
            closeParen = link.indexOf(')'),
            id = null;
        if (openParen > -1) {
            id = link.substr(openParen + 1, closeParen - openParen - 1);
            link = link.substr(0, openParen);
        }
        id = $.isEmptyObject(id) ? false : id;
        return {
            link: link,
            id: id
        };
    },
    loadPage: function () {
        //console.info("s:loadPage");

        var self = this;
        NProgress.start();


        NProgress.done();

    }
});
