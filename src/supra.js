/*
 * This code handles the menu interaction and dynamics.
 */

import $ from 'jquery'
import Blazy from 'blazy'
import bxslider from 'bxslider/dist/jquery.bxslider'

function runrunrun (){
	console.debug("ranranran")

  let lazyTitles = new Blazy({
    selector: ".stretch.b-lazy",
    breakpoints: [
      {
        width: 768, // max-width
        src: 'data-src-small'
      }
    ]
  });
  let lazyScrollers = new Blazy({
    selector: ".project .b-lazy",
    breakpoints: [
      {
        width: 768, // max-width
        src: 'data-src-small'
      }
    ],
    loadInvisible: true
  });

  $('.bxslider').bxSlider({
    //mode: 'vertical',
    pager: false,
    preloadImages: 'all',
    captions: true,
    onSlideBefore: function() {
      lazyScrollers.revalidate();
    }
  });

	$('nav a, .arrow a').click(function(e) {
		e.preventDefault();
		//console.debug(e, $(e.target).attr("href"), $("" + $(e.target).attr("href")))

		const section = $(this).attr("href");
		const offset = $("" + section).offset().top;
		$('html,body').animate({
			scrollTop: offset - 0
		}, 1200);
		setHash(section.substr(1));
	});

	$(".archive").click(function(e) {
		const $wrapper = $(this);

		if ($wrapper.hasClass("open")) {
			$wrapper.removeClass("open")
		} else {
			//$wrappers.removeClass("open");
			$wrapper.addClass("open")
		}
	});

	// let page = 1
	let $el = $("main")
	let $win = $(window);

	if (window.location.hash.length > 0) {
		//
	} else {
		setHash("top");
	}
}

function setHash(_page) {
	if (history.pushState) {
		history.pushState(null, null, "#" + _page);
	} else {
		location.hash = _page;
	}
}

runrunrun();
