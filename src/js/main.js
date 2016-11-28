

$('.nav').on('click', 'a', function(e){
	var a = $(this);
	var open = $(e.toElement).hasClass('open'); // click on icon to slideUp

	if( a.next().length && !open && $('.nav-toggle').is(':visible'))
	{
		a.toggleClass('open').next().slideToggle(150);
		e.preventDefault();
	}
});


$('.js-toggle').on('click', function(e){
	$(this).toggleClass('open');
	var target = $(this).data('toggle');
	$(target).slideToggle(150);
	e.preventDefault();
});


$('a[rel="external"], a.blank').click( function(e) {
	window.open( $(this).attr('href') );
	e.preventDefault();
});


/* animated scroll */
$(".js-scrollto").click(function(e){
	e.preventDefault();
	var pos = this.hash ? $(this.hash).offset().top : 0 ;
	$('html,body').animate({scrollTop:pos}, 500);
});

/* show scroll to top */
$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();
	var btn_top = $('.btn-scrolltop');

	if(scrollTop > 100) {
		btn_top.addClass('btn-scrolltop--show');
	}else{
		btn_top.removeClass('btn-scrolltop--show');
	}
});


$(".js-clickblock").clickblock();


if( $('#search_field').length ){
   $("#search_result").highlight( $('#search_field').val() );
}


/*

$('input, textarea').placeholder();


$('.js-popup').magnificPopup({
	type:'image',
	gallery:{enabled:true}
});


$(".slider").slick({

  infinite: false,
  dots: true,
  arrows: true,

  responsive: [{
	  breakpoint: 1024,
	  settings: {
		slidesToShow: 3,
		infinite: true
	  }
	}, {
	  breakpoint: 600,
	  settings: {
		slidesToShow: 2,
		dots: true
	  }
	}]
});

*/