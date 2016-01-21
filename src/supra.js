/* 
 * This code handles the menu interaction and dynamics.
 * (menu items are loaded from content/menu.xml to smarty/smarty_includes.php)
 */


$(document).ready(function () {
    /*var s = skrollr.init({
        forceHeight: true,
		smoothScrolling: true
    });*/
 
	$('.bxslider').bxSlider({
		/*mode: 'vertical',*/
		hideControlOnEnd: true,
		pager: false
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

		
		
        /*
        $win.keyup(function(_e){
            console.debug(_e);
            
            if(_e.keyCode === 32){
                if(_e.shiftKey){
                    self.prev();
                }else{
                    self.next();
                }
            }else if(_e.keyCode === 38){
                self.prev();
            }else if(_e.keyCode === 40){
                self.next();
            }
            
        });
        */
		
		NProgress.done();
    },

    next: function () {
        if (this.page < 4) {
            console.debug("next", this.page);
            this.page++;
            this.movePage();
        }
    },
    prev: function () {
        if (this.page > 1) {
            console.debug("prev", this.page);
            this.page--;
            this.movePage();
        }
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
		
        /*
        $("section article").off("scroll");
        this.$el.scroll(function(){
            console.debug($(this), $(this).scrollTop());
            
            if(self.$el.scrollTop() === 0){
                self.prev();
            }else if (self.$el.height() + self.$el.scrollTop() === $(document).height()) {
                self.next();
            }
        });*/

        /*
        if(hash === "front"){
            $("section.front").removeClass("prev next hide").addClass("curr");
            $("section.profile").removeClass("prev curr hide").addClass("next");
            $("section.projects").removeClass("prev curr next").addClass("hide");
            $("section.contact").removeClass("prev curr next").addClass("hide");
        }else if(hash === "profile"){
            $("section.front").removeClass("curr next hide").addClass("prev");
            $("section.profile").removeClass("prev next hide").addClass("curr");
            $("section.projects").removeClass("prev curr hide").addClass("next");
            $("section.contact").removeClass("prev curr next").addClass("hide");
        }else if(hash === "projects"){
            $("section.front").removeClass("curr next hide").addClass("prev");
            $("section.profile").removeClass("prev next hide").addClass("curr");
            $("section.projects").removeClass("prev curr hide").addClass("next");
            $("section.contact").removeClass("prev curr next").addClass("hide");
        }else if(hash === "contact"){
            $("section.front").removeClass("curr next hide").addClass("prev");
            $("section.profile").removeClass("prev next hide").addClass("curr");
            $("section.projects").removeClass("prev curr hide").addClass("next");
            $("section.contact").removeClass("prev curr next").addClass("hide");
        }*/

        NProgress.done();
        /*
        $('.app-menu .link').each(function(){
            $(this).removeClass("active");
            if($(this).data("link") === hash.link && !hash.id.length){
                $(this).addClass("active");
            }
        });
        $.get(hash.link + '.html', { "_": $.now() }, function (data) {
            self.el.html(data);
            self.el.fadeIn();
            
            self.loadDataForPage(hash);
        }, 'html');
        */
    },
    movePage: function () {
        var self = this;
        //console.debug("supra :: movePage");

        $("section").each(function () {
            var o = 1 * $(this).data("order"),
                $this = $(this);

            //console.debug(o, $this);
            if (o === self.page - 1) {
                $this.removeClass("curr next hide").addClass("prev");
            } else if (o === self.page) {
                self.setHash($this.data("link"));
                $this.removeClass("prev next hide").addClass("curr");
            } else if (o === self.page + 1) {
                $this.removeClass("prev curr hide").addClass("next");
            } else {
                $this.removeClass("prev curr next").addClass("hide");
            }
        });
    },


    loadProject: function (_pid, _$li) {
        //console.info("s:loadProject");

        var $oldLi = $(".project-list li.active");
        var oldId = $oldLi.data("project");

        $(".project-list li").removeClass("active");
        _$li.addClass("active");

        var template = _.template($("#tmp-project").html());

        if (_pid > oldId) {
            $(".project").append($(template({
                title: "Project " + _pid
            })));
        } else {
            $(".project").append($(template({
                title: "Project " + _pid
            })));
        }

        $(".project .curr").toggleClass("curr old").addClass(_pid > oldId ? "up" : "down");
        setTimeout(function () {
            $(".project .old").remove();
            $(".project .new").toggleClass("curr new");
        }, 500);


        // slide out curr project
        // slide in curr project
    }
});