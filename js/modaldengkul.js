/*! ===========================================================
 * modalDengkul.js
 * version: 1.0
 * http://takien.com/modal-dengkul
 * Inspired by Facebook image modal.
 * ===========================================================
 * Copyright 2013 Takien.
 * Follow me @cektkp
 * License GNU GPL v3
 * ========================================================== */

(function ($) {

    $.fn.modalDengkul = function (customOptions) {
        var o = $.extend({}, $.fn.modalDengkul.defaultOptions, customOptions);

        $('body').append('<div id="modalDengkul" style="display:none"><div class="modalDengkul-inner"><a class="modalDengkul-close" href="#">&times;</a><div class="modalDengkul-left"><div class="modalDengkul-left-inner"></div></div><div class="modalDengkul-right"></div></div></div><div id="modalDengkul-overlay" style="display:none"></div>');
        return this.each(function (index) {
            var $this = $(this);
			
            $this.addClass('modalDengkul-link').click(function (e) {
                modalDengkul.open($this);
                e.preventDefault();
            });



        }); /* end loop*/


    };

    var modalDengkul = {

        open: function ($this) {
			if($this.length < 1) {
				return false;
			}
            var large = $this.attr('href'),
                title = $this.data().title,
                desc = $this.data().description,
                modal = $('#modalDengkul'),
                mleft = $('#modalDengkul .modalDengkul-left'),
                mleftinner = $('#modalDengkul .modalDengkul-left-inner'),
                mright = $('#modalDengkul .modalDengkul-right'),
                inner = $('#modalDengkul .modalDengkul-inner'),
				next = $this.nextAll('.modalDengkul-link'),
				prev = $this.prevAll('.modalDengkul-link'),
                cright = '',
				overlay = $('#modalDengkul-overlay'),
				navHTML = '<a href="#" class="modalDengkul-nav modalDengkul-navLeft">&laquo;</a><a href="#" class="modalDengkul-nav modalDengkul-navRight">&raquo;</a>';
				

            cright += '<h2>' + title + '</h2>';
            cright += '<p>' + desc + '</p>';
			
            mright.html('<div class="modalDengkul-right-inner">'+cright+'</div>');
			mleftinner.html(navHTML);
			
			var nav  = $('#modalDengkul .modalDengkul-nav'),
			navl  = $('#modalDengkul .modalDengkul-navLeft'),
			navr  = $('#modalDengkul .modalDengkul-navRight');
			
		
			
            var resizei = function () {
                modal.css({
                    top: ($(window).height() - modal.height()) / 2,
                    left: ($(window).width() - modal.width()) / 2
                });

                mleftinner.css({
                    width: modal.innerWidth() - mright.width(),
                    height: modal.innerHeight()
                });
				
				nav.css({
					'font-weight':'bold',
					'height':modal.innerHeight()
				});
            };
            resizei();
            $(window).resize(function () {
                resizei();
            });

            //create image bro
            var $img = $('<img />', {
                src: large,
                'class': 'modalDengkul-img-large'
            }).on('load', function () {

                var i = $(this);
                i.css({
                    top: (mleftinner.height() - i.height()) / 2,
                    left: (mleftinner.width() - i.width()) / 2
                });


                $(window).resize(function () {
                    i.css({
                        top: (mleftinner.height() - i.height()) / 2,
                        left: (mleftinner.width() - i.width()) / 2
                    });
                });
            });
			

            mleftinner.append($img);
			mleftinner.mouseenter(function() {
				nav.fadeIn('slow');
			}).mouseleave(function(){
				nav.fadeOut('slow');
			});
			
			//nav clik
			navl.click(function(e) {
				modalDengkul.open(prev);
				e.preventDefault();
			});
			
			navr.click(function(e) {
				modalDengkul.open(next);
				e.preventDefault();
			});

            $('#modalDengkul-overlay,#modalDengkul').fadeIn('slow');

            //close
            $('body').on('click', '.modalDengkul-close', function (e) {
                modalDengkul.close();
                e.preventDefault();
            });

            //esc
            $(document).keyup(function (e) {
                if (e.which == 27) {
                    modalDengkul.close();
                }
				//next
				if (e.which == 39) { 
                   modalDengkul.open(next);
                }
				//prev
				if (e.which == 37) {
                    modalDengkul.open(prev);
                }
            });
			//click overlay
			overlay.click(function (e) {
				 modalDengkul.close();
			});
        },
        /*open*/
        /*close*/
        close: function () {
            $('#modalDengkul-overlay,#modalDengkul').fadeOut('slow');
        }

    };



    $.fn.modalDengkul.defaultOptions = {
       /* no option at the moment :p*/

    };
})(jQuery);