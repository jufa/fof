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
	
	ff.currIndex=-1; //what question are we on?
	ff.max=-1;//number of questions
	ff.correct = 0;//you suck!
	ff.attempted = 0;//try harder!
	ff.htmlNext='<a href="#" class="btnnext">Next!</a>';
	
	ff.handleBtnClick = function(e){
		$(e.target).parent().parent().find('.answer').css('visibility','visible');
		ff.attempted++;
		if( $(e.target).hasClass('correct') ){
			$(e.target).css('background-color','#0d0');
			ff.correct++;
		} else {
			$(e.target).css('background-color','#d00');
		}
		$('.btnnext:eq('+ff.currIndex+')').html('Your Score:'+ff.correct+'/'+ff.attempted+'<br>Next question!');
		$('.btnnext:eq('+ff.currIndex+')').css('visibility','visible');
		var y=$(window).scrollTop() + $(window).height();
		var myy = $('.btnnext:eq('+ff.currIndex+')').offset().top;
		if(myy+40>y){
			//hidden below; scroll down to top of photo:
			console.log('scrolling');
			 $('body,html').animate({
				scrollTop: $('.btnnext:eq('+(ff.currIndex)+')').offset().top - $(window).height() + $('.btnnext:eq('+(ff.currIndex)+')').height()
			}, 200);
		}
	}
	
	ff.handleBtnStart = function(e){
		ff.currIndex=0;
		var tgt = $('.btnnext').index(ff.currIndex);
		var e = jQuery.Event('click',{target:tgt, currentTarget:tgt, delegateTarget:tgt});
		//show next Q:
		$('.fof:eq('+ff.currIndex+')').css('display','inherit');
		$('.choices:eq('+ff.currIndex+')').css('display','inherit');
		//scroll to it:
		 $('body,html').animate({
			scrollTop: $('.fof:eq(0)').offset().top
		}, 400);
	}
	
	
	ff.handleBtnNext = function(e){
		//get the index number of this fof compared to the list:
		var $thisfof = $(e.target).parent(); 
		var idx = $('.fof').index($thisfof);
		ff.currIndex = idx+1;
		if (ff.currIndex < ff.max) {
			//show next Q:
			$('.fof:eq('+ff.currIndex+')').css('display','inherit');
			$('.choices:eq('+ff.currIndex+')').css('display','inherit');
			//scroll to the next fof:
			//$('.factorfiction').scrollTo('.fof:eq(idx+1)');
			 $('body,html').animate({
				scrollTop: $('.fof:eq('+(idx+1)+')').offset().top
			}, 400);
		} else {
			//update end screen score:
			var em = '';//end message
			var pct = Math.floor(100.0*ff.correct/ff.attempted);
			var comment='';
			em='Thanks for playing!<br/>Your Score:<br/><span style="font-size:3em;font-weight:bold;">'+pct+'%</span><br/>';
			if(pct <= 10) comment = 'Wow, that was abysmal. We have got some serious Wax-On/Wax-Off to do. Or you were just butt-dialing this whole quiz.';
			if(pct>10) comment = 'Worse than guessing (50%)? That indicates you have some misconceptions about nuclear. But that is why we are here. As Yoda said, "...you must unlearn what you have learned..."';
			if(pct>=50) comment = 'Not too shabby, you are either lucky, or know a bit about nuclear. Still, I would not put you in charge of a nuclear plant or anything, nothing personal.';
			if(pct>75) comment = 'Wow, you know a thing or two about nuclear. Our algorithms are impressed. Have you thought a bout a career in being Mostly Right about Stuff?';
			if(pct>99) comment = 'You are a living, breathing, genius. Or you clicked View Source.';
			em+=comment;
			$('.finalscore').html(em);
			//show end screen:
			$('.finalscore').css('display','inherit');
			 $('body,html').animate({
				scrollTop: $('.finalscore').offset().top
			}, 400);
		}
		return false; // avoid jump to '#'
	}
	
	ff.init = function(){
	// all handlers before hiding elements (ie8 does not bind to hidden)
		$('a.btnfact').on('click', $.proxy(ff.handleBtnClick, this));
		$('a.btnfiction').on('click', $.proxy(ff.handleBtnClick, this));
		
		if($(window).height() > 380){
			$('body,html').css('font-size','16px');//14px is better suited to smaller screens like lt iphone 5
		}
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		$('.factorfiction').hide(); 
		$('.fof').css('display','none');
		$('.answer').css('visibility','hidden');
		
		
		//define number of questions
		ff.max = $('.fof').length;
		
		//hide finish screen
		$('.finalscore').css('display','none');

		$('.fof').append(ff.htmlNext);
		$('.btnnext').on('click', $.proxy(ff.handleBtnNext, this));
		
		$('.btnnext').css('cursor','pointer');
		$('.btnnext').css('visibility','hidden');

		$('a').click(function(evt){
			return false; // avoid jump to '#'
			//TO DO: evt.preventDefault();  instead?
		})
		
		//start button handler
		$('.btnstart').on('click', $.proxy(ff.handleBtnStart, this));

		//show everything now:
		$('.factorfiction').fadeIn(400);
		
	}
	

		
	
	





