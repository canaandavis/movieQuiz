$(document).ready(function(){
	console.log("Hello from JS");
	updateQuestion();
});

var question1 = new Question($('#questionOneAudio'),["shining.jpg", "alien.jpg", "halloween.jpg", "nightmare.jpg"], $('#questionOneDescription'), "0");
var questions = [question1];
var questionCount = 0;
var clicked = false;

var progressArray = [$('#progress_1'), $('#progress_2'), $('#progress_3'), $('#progress_4'), $('#progress_5')];

// Question Object
function Question(audio, posters, descriptionText, correct){
	this.audio = audio;
	this.posters = posters;
	this.descriptionText = descriptionText;
	this.correct = correct;
}

Question.prototype.updateImages = function(){
	for (i = 0; i < this.posters.length; i++){
		$('.choices_container').append(imageAdd(this.posters[i], i));
	}
};

// Function to add movie posters

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

// Function to check answer on click

function correctCheck(){
	var correct = false;

	$('.choice').on('click', function(){
		if ($(this).attr('id') === questions[questionCount].correct){
			correct = true;
		}
		changeOpacity();
		progressUpdate(correct);
		// correctAnswer(correct);
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
	$('.answer').show();
}

// Function to update progress bar

function progressUpdate(event){
	var progressItem = progressArray[questionCount];

	if(event && progressItem.find('#incorrect_circle').is(':hidden')){
		progressItem.addClass('progress_correct');
		progressItem.find('#correct_circle').show();
	}
	else {
		progressItem.addClass('progress_incorrect');
		progressItem.find('#incorrect_circle').show();
	}
}

// Function to update a question

function updateQuestion(){
	questions[questionCount].updateImages();
	correctCheck();
	imageHover(clicked);

}