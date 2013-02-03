/* Author:
	JK
*/
	$(document).load(function() {
		$('.factorfiction').hide();
	});
	$(document).ready(function() {
		ff.init();
	});
	
	var ff={};
	
	ff.currIndex=0; //what question are we on?
	ff.correct = 0;//you suck!
	ff.attempted = 0;//try harder!
	ff.htmlNext='<div class="btnnext">Next!</div>';
	
	ff.handleBtnClick = function(e){
		$(e.target).parent().parent().find('.answer').css('visibility','visible');
		ff.attempted++;
		if( $(e.target).hasClass('correct') ){
			$(e.target).css('background-color','#0d0');
			ff.correct++;
		} else {
			$(e.target).css('background-color','#d00');
		}
		$('.btnnext:eq('+ff.currIndex+')').html('Your Score:'+ff.correct+'/'+ff.attempted+'<br>Cool, next question please!');
		$('.btnnext:eq('+ff.currIndex+')').css('visibility','visible');
		var y=$(window).scrollTop() + $(window).height();
		var myy = $('.btnnext:eq('+ff.currIndex+')').offset().top;
		//myy+=$('.btnnext:eq('+ff.currIndex+')').height();
		console.log('lowest visible row of window:'+y);
		console.log('start row of next btn:'+myy);
		if(myy+40>y){
			//hidden below; scroll down to top of photo:
			console.log('scrolling');
			 $('html, body').animate({
				scrollTop: $('.btnnext:eq('+(ff.currIndex)+')').offset().top - $(window).height() + $('.btnnext:eq('+(ff.currIndex)+')').height()
			}, 200);
		}
		//$('.btnnext:eq('+ff.currIndex+')').css('position','relative');
		//$('.btnnext:eq('+ff.currIndex+')').css('top',y-40+'px');
		
	}
	ff.handleBtnNext = function(e){
		//get the index number of this fof compared to the list:
		var $thisfof = $(e.target).parent(); 
		var idx = $('.fof').index($thisfof);
		ff.currIndex = idx+1;
		$('.fof:eq('+ff.currIndex+')').css('display','inherit');
		$('.choices:eq('+ff.currIndex+')').css('display','inherit');
		//scroll to the next fof:
		//$('.factorfiction').scrollTo('.fof:eq(idx+1)');
		 $('html, body').animate({
			scrollTop: $('.fof:eq('+(idx+1)+')').offset().top
		}, 400);
		
	}
	
	ff.init = function(){
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		$('.factorfiction').hide(); 
		$('.choices:eq('+ff.currIndex+')').css('display','inherit');
		$('.fof').css('display','none');
		$('.fof:eq('+ff.currIndex+')').css('display','inherit');
		$('.answer').css('visibility','hidden');
		
		//$('a.btnfact').css('background-color','#dd0');
		$('a').click(function(evt){
			//... do stuff
			return false; // avoid jump to '#'
		})
		$('a.btnfact').bind('click', $.proxy(ff.handleBtnClick, this));
		$('a.btnfiction').bind('click', $.proxy(ff.handleBtnClick, this));
		
		//$(ff.htmlNext).appendTo('.fof');
		$('.fof').append(ff.htmlNext);
		$('.btnnext').bind('click', $.proxy(ff.handleBtnNext, this));
		$('.btnnext').css('cursor','pointer');
		$('.btnnext').css('visibility','hidden');
		//show everything now:
		$('.factorfiction').fadeIn(400);
		
	}
	

		
	
	





