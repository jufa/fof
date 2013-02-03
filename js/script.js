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
	
	ff.handleBtnStart = function(e){
		ff.currIndex=0;
		var tgt = $('.btnnext').index(ff.currIndex);
		var e = jQuery.Event('click',{target:tgt, currentTarget:tgt, delegateTarget:tgt});
		//show next Q:
		$('.fof:eq('+ff.currIndex+')').css('display','inherit');
		$('.choices:eq('+ff.currIndex+')').css('display','inherit');
		//scroll to it:
		 $('html, body').animate({
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
			 $('html, body').animate({
				scrollTop: $('.fof:eq('+(idx+1)+')').offset().top
			}, 400);
		} else {
			//update end screen score:
			var em = '';//end message
			var pct = Math.floor(100.0*ff.correct/ff.attempted);
			var comment='';
			em='Thanks for playing!<br/>Your Score:<br/><span style="font-size:3em;font-weight:bold;">'+pct+'%</span><br/>';
			if(pct <= 10) comment = 'Wow, that was abysmal. We have got some serious Wax-On/Wax-Off to do.';
			if(pct>10) comment = 'These questions are designed such that a score worse than chance (50%) indicates you have some misconceptions about nuclear. But that is why we are here. As Yoda said, "...you must unlearn what you have learned..."';
			if(pct>=50) comment = 'Not too shabby, you are either lucky, or know a bit about nuclear. Still, I wouldn not put you in charge of a nuclear plant or anything';
			if(pct>75) comment = 'Wow, you know a thing or two about nuclear. Our algorithms are impressed. Have you thought a bout a career in being Mostly Right about Stuff?';
			if(pct>99) comment = 'You are a living, breathing, genius. Or you clicked View Source.';
			em+=comment;
			$('.finalscore').html(em);
			//show end screen:
			$('.finalscore').css('display','inherit');
			 $('html, body').animate({
				scrollTop: $('.finalscore').offset().top
			}, 400);
		}
			
		
	}
	
	ff.init = function(){
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		$('.factorfiction').hide(); 
		//$('.choices:eq('+ff.currIndex+')').css('display','inherit');
		$('.fof').css('display','none');
		//$('.fof:eq('+ff.currIndex+')').css('display','inherit');
		$('.answer').css('visibility','hidden');
		
		//$('a.btnfact').css('background-color','#dd0');
		$('a').click(function(evt){
			//... do stuff
			return false; // avoid jump to '#'
		})
		$('a.btnfact').bind('click', $.proxy(ff.handleBtnClick, this));
		$('a.btnfiction').bind('click', $.proxy(ff.handleBtnClick, this));
		
		//define number of questions
		ff.max = $('.fof').length;
		
		//hide finish screen
		$('.finalscore').css('display','none');

		//$(ff.htmlNext).appendTo('.fof');
		$('.fof').append(ff.htmlNext);
		$('.btnnext').bind('click', $.proxy(ff.handleBtnNext, this));
		$('.btnnext').css('cursor','pointer');
		$('.btnnext').css('visibility','hidden');
		
		//start button handler
		$('.btnstart').bind('click', $.proxy(ff.handleBtnStart, this));
		//show everything now:
		$('.factorfiction').fadeIn(400);
		
	}
	

		
	
	





