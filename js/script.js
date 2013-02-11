/* Author:
	JK
*/

	$(document).ready(function() {
		ff.init();
	});
	
	var ff={};
	
	ff.currIndex=-1; //what question are we on?
	ff.max=-1;//number of questions
	ff.correct = 0;//you suck!
	ff.attempted = 0;//try harder!
	ff.htmlNext='<a href="#" class="btnnext">Next!</a>';
	
	ff.lang="en";
	
	ff.handleBtnClick = function(e){
		if($(e.target).parent().parent().hasClass('answered') == false){
			$(e.target).parent().parent().addClass('answered');
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
		}
		
		var y=$(window).scrollTop() + $(window).height();
		var myy = $('.btnnext:eq('+ff.currIndex+')').offset().top;
		if(myy+60>y){
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
		$('.fof:eq('+ff.currIndex+')').css('display','block');
		$('.choices:eq('+ff.currIndex+')').css('display','block');
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
			$('.fof:eq('+ff.currIndex+')').css('display','block');
			$('.choices:eq('+ff.currIndex+')').css('display','block');
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
			if(pct <= 10) comment = 'Wow, that was abysmal. We have got some serious Wax-On/Wax-Off to do.';
			if(pct>10) comment = 'Worse than guessing? You may have some misconceptions about nuclear. But that is why we are here. "';
			if(pct>=50) comment = 'Not too shabby. You are either lucky or quite a bit about nuclear! Still, I would not put you in charge of a nuclear plant or anything. Nothing personal.';
			if(pct>75) comment = 'Wow, you know a thing or two about nuclear. Our algorithms are impressed. Have you thought a bout a career in being Mostly Right about Stuff?';
			if(pct>99) comment = 'You are a living, breathing, genius. Or you Googled Wikipedia. We prefer to believe the first one. Bravo!';
			em+=comment;
			$('.finalscore').html(em);
			//show end screen:
			$('.finalscore').css('display','block');
			 $('body,html').animate({
				scrollTop: $('.finalscore').offset().top
			}, 400);
		}
		return false; // avoid jump to '#'
	}
	
	ff.init = function(){
	// all handlers before hiding elements (ie8 does not bind to hidden)
		$('.fof').append(ff.htmlNext);
		$('a.btnfact').on('click', $.proxy(ff.handleBtnClick, this));
		$('a.btnfiction').on('click', $.proxy(ff.handleBtnClick, this));
		$('.btnnext').on('click', $.proxy(ff.handleBtnNext, this));
		
		if($(window).height() > 380){
			$('body,html').css('font-size','16px');//14px is better suited to smaller screens like lt iphone 5
		}
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		//$('.factorfiction').hide(); 
		$('.fof').css('display','none');
		$('.answer').css('visibility','hidden');
		
		
		
		//define number of questions
		ff.max = $('.fof').length;
		
		//hide finish screen
		$('.finalscore').css('display','none');

		
		
		$('.btnnext').css('cursor','pointer');
		$('.btnnext').css('visibility','hidden');

		$('a').click(function(evt){
			//return false; // avoid jump to '#'
			if( $(evt.target).parent().parent().hasClass('share') == true){
			} else {
				evt.preventDefault(); 
			}
		})
		
		//start button handler
		$('.btnstart').on('click', $.proxy(ff.handleBtnStart, this));

		//show everything now:
		//$('header').css('background-color','blue');
		
	}
	

		
	
	





