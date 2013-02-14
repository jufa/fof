/* Author:
	JK
*/

var fofgame = (function( $ ){
	
	var currIndex=-1; //what question are we on?
	var max=-1;//number of questions
	var correct = 0;//you suck!
	var attempted = 0;//try harder!
	var htmlNext='<a href="#" class="btnnext">Next!</a>';
	var lang="en";
	
	return {
		handleBtnClick: function(e){
			if($(e.target).parent().parent().hasClass('answered') == false){
				$(e.target).parent().parent().addClass('answered');
				$(e.target).parent().parent().find('.answer').css('visibility','visible');
				attempted++;
				if( $(e.target).hasClass('correct') ){
					$(e.target).css('background-color','#0d0');
					correct++;
				} else {
					$(e.target).css('background-color','#d00');
				}
				$('.btnnext:eq('+currIndex+')').html('Your Score:'+correct+'/'+attempted+'<br>Next question!');
				$('.btnnext:eq('+currIndex+')').css('visibility','visible');
			}
			
			var y=$(window).scrollTop() + $(window).height();
			var myy = $('.btnnext:eq('+currIndex+')').offset().top;
			if(myy+60>y){
				//hidden below; scroll down to top of photo:
				console.log('scrolling');
				 $('body,html').animate({
					scrollTop: $('.btnnext:eq('+(currIndex)+')').offset().top - $(window).height() + $('.btnnext:eq('+(currIndex)+')').height()
				}, 200);
			}
		},
		
		handleBtnStart: function(e){
			currIndex=0;
			var tgt = $('.btnnext').index(currIndex);
			var e = jQuery.Event('click',{target:tgt, currentTarget:tgt, delegateTarget:tgt});
			//show next Q:
			$('.fof:eq('+currIndex+')').css('display','block');
			$('.choices:eq('+currIndex+')').css('display','block');
			//scroll to it:
			 $('body,html').animate({
				scrollTop: $('.fof:eq(0)').offset().top
			}, 400);
		},
		
		
		handleBtnNext: function(e){
			//get the index number of this fof compared to the list:
			var $thisfof = $(e.target).parent(); 
			var idx = $('.fof').index($thisfof);
			currIndex = idx+1;
			if (currIndex < max) {
				//show next Q:
				$('.fof:eq('+currIndex+')').css('display','block');
				$('.choices:eq('+currIndex+')').css('display','block');
				//scroll to the next fof:
				//$('.factorfiction').scrollTo('.fof:eq(idx+1)');
				 $('body,html').animate({
					scrollTop: $('.fof:eq('+(idx+1)+')').offset().top
				}, 400);
			} else {
				//update end screen score:
				var em = '';//end message
				var pct = Math.floor(100.0*correct/attempted);
				var comment='';
				if(lang=="en"){
					em='Thanks for playing!<br/>Your Score:<br/><span style="font-size:3em;font-weight:bold;">'+pct+'%</span><br/>';
					if(pct <= 10) comment = 'Wow, that was abysmal. We have got some serious Wax-On/Wax-Off to do.';
					if(pct>10) comment = 'Worse than guessing? You may have some misconceptions about nuclear. But that is why we are here.';
					if(pct>=50) comment = 'Not too shabby. You are either lucky or quite a bit about nuclear! Still, I would not put you in charge of a nuclear plant.';
					if(pct>75) comment = 'Wow, you know a thing or two about nuclear. Our algorithms are impressed. Have you thought a bout a career in being Mostly Right about Stuff?';
					if(pct>99) comment = 'You are a living, breathing, genius. Or you Googled Wikipedia. We prefer to believe the first one. Bravo!';
				} else {
					em='Merci d’avoir joué! <br/>Ton résultat:<br/><span style="font-size:3em;font-weight:bold;">'+pct+'%</span><br/>';
					if(pct <= 10) comment = 'Eh bien, c’est catastrophique. Nous avons encore pas mal de chemin à faire. ';
					if(pct>10) comment = 'Tu n’aurais pas fait pire en devinant les réponses? Tu as peut-être certaines idées fausses concernant le nucléaire.';
					if(pct>=50) comment = 'Pas trop mal. Ou bien tu es chanceux, ou tu t’y connais un peu en nucléaire. Mais je ne te confierais pas la responsabilité d’une centrale ou d’une activité nucléaire. Cela n’a rien de personnel.';
					if(pct>75) comment = 'Wow! Tu en connais pas mal sur le nucléaire. Nos algorithmes sont impressionnés. As-tu déjà pensé à faire carrière comme la personne qui sait pratiquement tout sur tout?';
					if(pct>99) comment = 'Tu es un génie en chair et en os. Ou tu as fait des recherches dans Wikipédia. Nous préférons croire que tu es un génie. Bravo!';
				}
				
				em+=comment;
				$('.finalscore').html(em);
				//show end screen:
				$('.finalscore').css('display','block');
				 $('body,html').animate({
					scrollTop: $('.finalscore').offset().top
				}, 400);
			}
			return false; // avoid jump to '#'
		},
		
		init: function(){
			lang = $('html').attr('lang');
			console.log('lang: '+lang);
		// all handlers before hiding elements (ie8 does not bind to hidden)
			$('.fof').append(htmlNext);
			$('a.btnfact').on('click', this.handleBtnClick);
			$('a.btnfiction').on('click', this.handleBtnClick);
			$('.btnnext').on('click', this.handleBtnNext);
			
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
			max = $('.fof').length;
			
			//hide finish screen
			$('.finalscore').css('display','none');

			
			
			$('.btnnext').css('cursor','pointer');
			$('.btnnext').css('visibility','hidden');

			$('a').click(function(evt){
				//return false; // avoid jump to '#'
				if( $(evt.target).parent().parent().hasClass('share') == true || $(evt.target).hasClass('btnlang') == true)
				{
				} else {
					evt.preventDefault(); 
				}
			})
			
			//start button handler
			$('.btnstart').on('click', this.handleBtnStart);

			//show everything now:
			//$('header').css('background-color','blue');
			
		}
	};
}(jQuery));

$(document).ready(function() {
	fofgame.init();
});

	

		
	
	





