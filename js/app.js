$(document).ready(function(){
	console.log("Hello from JS");
	
	showOverlay($('.instructions'));

	$('#instructions_link').on('click', function(){
		stopAudio();
		showOverlay($('.instructions'));
	});

	$('#get_started').on('click', function(){
		hideOverlay($('.instructions'));
		playAudio();
	});

	$('#play').on('click', function(){
		playAudio();
	});

	$('#stop').on('click', function(){
		stopAudio();
	});

	updateQuestion();
	
	$('#next_question').on('click', function(){
		nextQuestion();
	});

	$('#no_button').on('click', function(){
		hideOverlay($('.end_round'));
		endGame();
		showOverlay($('.endGame'));
	});

	$('#next_round').on('click', function(){
		gameCount++;
		hideOverlay($('.end_round'));
		questionCount--;
		correctCount = 0;
		progressReset();
		nextQuestion();
	});

	$('.endGame').find('#start_over').on('click', function(){
		console.log('click from start_over');
		newGame();
	});

});

var question1 = new Question($('#questionOneAudio'),["shining.jpg", "alien.jpg", "halloween.jpg", "nightmare.jpg"], $('#questionOneDescription'), "0");
var question2 = new Question($('#questionTwoAudio'), ["bladerunner.jpg", "brazil.jpg", "fifth.jpg", "starwars.jpg"], $('#questionTwoDescription'), "1");
var question3 = new Question($('#questionThreeAudio'), ["toystory.jpg", "spirited.jpg", "fantastic.jpg", "robinhood.jpg"], $('#questionThreeDescription'), "3");
var question4 = new Question($('#questionFourAudio'), ["batman.jpg", "scott.jpg", "v.jpg", "watchmen.jpg"], $('#questionFourDescription'), "1");
var question5 = new Question($('#questionFiveAudio'), ["diehard.jpg", "roadhouse.jpg", "bigtrouble.jpg", "conair.jpg"], $('#questionFiveDescription'), "3");
var question6 = new Question($('#questionSixAudio'),["ghost.jpg", "lost.jpg", "ground.jpg", "caddy.jpg"], $('#questionSixDescription'), "0");
var question7 = new Question($('#questionSevenAudio'),["royal.jpg", "rush.jpg", "life.jpg", "grand.jpg"], $('#questionSevenDescription'), "2");
var question8 = new Question($('#questionEightAudio'),["jurassic.jpg", "independence.jpg", "t2.jpg", "mi.jpg"], $('#questionEightDescription'), "0");
var question9 = new Question($('#questionNineAudio'),["et.jpg", "back.jpg", "gremlins.jpg", "goonies.jpg"], $('#questionNineDescription'), "1");
var question10 = new Question($('#questionTenAudio'),["thing.jpg", "dead.jpg", "deadalive.jpg", "cabin.jpg"], $('#questionTenDescription'), "0");
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

var questionCount = 0;
var correctCount = 0;
var totalCorrect = 0;
var clicked = false;
var gameCount = 0;

var progressArray = [$('#progress_1'), $('#progress_2'), $('#progress_3'), $('#progress_4'), $('#progress_5')];

// Question Object

function Question(audio, posters, descriptionText, correct){
	this.audio = audio;
	this.posters = posters;
	this.descriptionText = descriptionText;
	this.correct = correct;
}

// Functions for image manupuliation

	// Function to append images from Question object

	Question.prototype.updateImages = function(){
		for (i = 0; i < this.posters.length; i++){
			$('.choices_container').append(imageAdd(this.posters[i], i));
		}
	};

	// Function to add movie posters tempelate

	function imageAdd(file, count){
		return "<div class='choice' id='" + count + "'><img src='images/" + file + "'></div>";
	}

	// Function to allow image opacity changes

	function imageHover(event){
		$('.choice').on('mouseenter', function(){
			if ($('.answer').is(':hidden')) {
				$(this).animate({opacity: 0.5}, 250);
			}
		});
		$('.choice').on('mouseleave', function(){
			$(this).animate({opacity: 1}, 100);
		});
	}

	// function to change image opacity

	function changeOpacity(){
		$('.choice').animate({opacity: 1}, 1);
	}

// Functions for audio control

	// function to play audio

	function playAudio(){
		var currentQuestionAudio = questions[questionCount].audio[0];
		
		currentQuestionAudio.volume = 0.5;
		currentQuestionAudio.load();
		currentQuestionAudio.play();
	}

	// Function to stop audio

	function stopAudio(){
		var currentQuestionAudio = questions[questionCount].audio[0];

			currentQuestionAudio.pause();
	}

// Functions to check and respond to answers

	// Function to check answer on click

	function correctCheck(){
		var correct = false;

		$('.choice').on('click', function(){
			console.log(clicked);
			if (clicked === false) {
				if ($(this).attr('id') === questions[questionCount].correct){
					correct = true;
					correctCount++;
					totalCorrect++;
				}
				clicked = true;
				changeOpacity();
				progressUpdate(correct);
				correctAnswer(correct);
			}
		});
	}

	// Function to show correct answer

	function correctAnswer(event){
		var currentQuestion = questions[questionCount];
		if ($('.answer').is(':hidden')) {
			if(event){
				$('.answer_head').text('Correct!');
			}
			else {
				$('.answer_head').text('Incorrect!');
			}
		}
		currentQuestion.descriptionText.show();
		$('.poster').append(imageAdd(currentQuestion.posters[currentQuestion.correct], "answer_show"));
		$('.answer').fadeIn(500);
	}

// Functions for progress bar updates

	// Function to update progress bar

	function progressUpdate(event){
		console.log(questionCount);
		if (gameCount > 0) {
			progressCount = questionCount - 5;
		}
		else {
			progressCount = questionCount;
		}

		var progressItem = progressArray[progressCount];

		if(event && progressItem.find('#incorrect_circle').is(':hidden')){
			progressItem.addClass('progress_correct');
			progressItem.find('#correct_circle').show();
		}
		else {
			progressItem.addClass('progress_incorrect');
			progressItem.find('#incorrect_circle').show();
		}
	}

	// Function to reset all progress bar

		function progressReset(){
			$('.progress_indicator').removeClass('progress_incorrect progress_correct');
			$('.progress_indicator').find('i').hide();
		}

// Functions to move to next question 

	// Function to clear answer box

	function clearAnswerBox(){
		$('.movie_info').find('.poster').empty();
		$('.movie_info').find(questions[questionCount].descriptionText).fadeOut(500);
	}

	// Function to hide answerbox

	function hideAnswerBox(){
		$('.answer').fadeOut(500);
		clearAnswerBox();
	}

	// Function to remove current movie posters

	function removePosters(){
		$('.choices_container').empty();
	}

	// Function to update a question

	function updateQuestion(){
		console.log("UpdateQuestion: " + questionCount)
		questions[questionCount].updateImages();
		correctCheck();
		imageHover();
		clicked = false;
	}

	// Function to load the next Question

	function nextQuestion(){	
		hideAnswerBox();
		removePosters();
		stopAudio();
		questionCount++;
		
		if (questionCount > 9) {
			endGame();
			showOverlay($('.endGame'));
		}
		else if (questionCount > 4 && gameCount < 1) {
			endRound();
			showOverlay($('.end_round'));
		}
		else {
			updateQuestion();
			playAudio();
		}
	}

// Funciton to start newgame
	
	function newGame(){
		gameCount = 0;
		clicked = false;
		totalCorrect = 0;
		correctCount = 0;
		questionCount = 0;
		progressReset();
		resetOverlays();
		hideOverlay($('.endGame'));
		showOverlay($('.instructions'));
		updateQuestion();
	}

// Functions for overlay displays

	// Function to show overlay

	function showOverlay(item){
		item.fadeIn(1000);
		changeOpacity();
	}

	// Function to hide overlay

	function hideOverlay(item){
		item.slideUp(500);
	}

	// Function to populate end of round overlay

	function endRound(){
		$('.end_round').find('#header')
		.append(correctCount + "/5");
		if (correctCount >= 4){
			$('.end_round').find('#good').show();
		}
		else if (correctCount >= 2) {
			$('.end_round').find('#ok').show();
		}
		else {
			$('.end_round').find('#bad').show();
		}
	}

	// Function to populate end of game overlay

	function endGame(){
		
		if (gameCount > 0){
			$('.endGame').find('#header')
			.prepend(correctCount + "/5 this round")
			.prepend(totalCorrect + "/10 for the game <br>");
		}
		else {
			$('.endGame').find('#header')
			.prepend(correctCount + "/5");
		}

		if ((correctCount === 5 && gameCount < 1) || totalCorrect === 10) {
			$('.endGame').find('#five_stars').show();
		}
		else if ((correctCount === 4 && gameCount < 1) || totalCorrect > 7) {
			$('.endGame').find('#four_stars').show();
		}
		else if ((correctCount === 3 && gameCount < 1) || totalCorrect > 5) {
			$('.endGame').find('#three_stars').show();
		}
		else if ((correctCount === 2 && gameCount < 1) || totalCorrect > 2 ) {
			$('.endGame').find('#two_stars').show();
		}
		else if ((correctCount === 1 && gameCount < 1) || totalCorrect > 0) {
			$('.endGame').find('#one_star').show();
		}
		else {
			$('.endGame').find('#half_star').show();
		}
		
	}

	// Function to reset overlays

	function resetOverlays(){
		$('.endGame').find('#header').empty();
		$('.end_round').find('#header').empty();
		$('.stars').hide();
	}