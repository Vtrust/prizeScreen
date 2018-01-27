//轮播图初始化
$(document).ready(function(){
	$(function(){
		$('.slick-for').slick({
			autoplay:false,
			arrows: false,
			dots: true,
			// autoplaySpeed:1000,
			arrows:true,
			draggable:false,
			touchMove:false,
			pauseOnHover:false
		});
	});	
});