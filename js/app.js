$(document).ready(function(){
	console.log("js working");

	// Questions array
	var questions = [questionOne, questionTwo];
	
	questions[count].updateQuestion();

	$('#play').on('click', function(){
		console.log('play click');
		questions[count].playAudio();
	});

	$('#stop').on('click', function(){
		console.log('stop click');
		questions[count].stopAudio();
	});
	
	$('.answer').find('button').on('click', function(){
		nextQuestion();
		questions[count].updateQuestion();
		itemClick(questions);
	});

	itemClick(questions);

});



// The question object

function Question(audio, moviePosters, descriptionText) {
	this.audio = audio;
	this.moviePosters = moviePosters;
	this.descriptionText = descriptionText;
}

// Function to update and append question content

Question.prototype.updateQuestion = function(){
	$('.choices_container').append(this.moviePosters);
	// this.playAudio();
}

// Function to play / stop audio

Question.prototype.playAudio= function(){
	this.audio[0].volume = 0.5;
	this.audio[0].load();
	this.audio[0].play();
}

Question.prototype.stopAudio = function(){
	this.audio[0].pause();
}

// Function to add abality to click items

function itemClick(array) {
	$('.choice').on('click', function(){
		console.log('Click working');
		var correct = false;
		if (clicked === false) {
			if ($(this).hasClass('correct')){
				$('.answer_head').text('Correct!')
				correct = true;
			}
			else {
				$('.answer_head').text('Incorrect!')
			}
		}
		progressUpdate(correct);
		array[count].showInfo();
		clicked = true;
	})
}

// Function to show info regarding question

Question.prototype.showInfo= function(){
	if (clicked === false) {
		$('.correct').clone().appendTo($('.poster'));
		$('.description').append(this.descriptionText);
		$('.answer').show();
	}
}

// Progress Bar array

var progressArray = [$('#progress_1'), $('#progress_2'), $('#progress_3'), $('#progress_4'), $('#progress_5')];
var clicked = false;

// Function to update progress bar

function progressUpdate(event) {
	var progressItem = progressArray[count];
	if (clicked === false) {
		if (event) {
			progressItem.addClass('progress_correct');
		}
		else {
			progressItem.addClass('progress_incorrect');
		}
	}
}

// Function to load next question

function nextQuestion(){
	count++;
	clicked = false;
	if (count > 4){
		// Will add code to display results
	}
	else {
		$('.choices_container').empty();
		$('.answer').find('.poster').empty();
		$('.answer').find('.description').empty();
		$('.answer').hide();
	}
}

// Count variable for accessing array
var count = 0;

// Question 1 varibales

var $questionOneImageOne = ("<div class='choice correct' id='choice_1'><img src='images/shining.jpg'></div>");
var $questionOneImageTwo = ("<div class='choice' id='choice_2'><img src='images/alien.jpg'></div>");
var $questionOneImageThree = ("<div class='choice' id='choice_3'><img src='images/halloween.jpg'></div>");
var $questionOneImageFour = ("<div class='choice' id='choice_4'><img src='images/nightmare.jpg'></div>");
var questionOneImages = $questionOneImageOne + $questionOneImageTwo + $questionOneImageThree + $questionOneImageFour;

var questionOneAudio = $('#questionOneAudio');

var questionOneDescriptionText = ("The Shining is a 1980 British-American psychological horror film produced and directed by Stanley Kubrick, co-written with novelist Diane Johnson, and starring Jack Nicholson, Shelley Duvall, Danny Lloyd, and Scatman Crothers. The film is based on Stephen King's novel of the same name, though there are significant changes.<br><br>In the film, Jack Torrance, a writer and recovering alcoholic, takes a job as an off-season caretaker at an isolated hotel called the Overlook Hotel. His young son possesses psychic abilities and is able to see things from the past and future, such as the ghosts who inhabit the hotel. Soon after settling in, the family is trapped in the hotel by a snowstorm, and Jack gradually becomes influenced by a supernatural presence; he descends into madness and attempts to murder his wife and son.")

var questionOne = new Question(questionOneAudio, questionOneImages, questionOneDescriptionText);

// Question 2 variables

var $questionTwoImageOne = ("<div class='choice correct' id='choice_1'><img src='images/shining.jpg'></div>");
var $questionTwoImageTwo = ("<div class='choice' id='choice_2'><img src='images/alien.jpg'></div>");
var $questionTwoImageThree = ("<div class='choice' id='choice_3'><img src='images/halloween.jpg'></div>");
var $questionTwoImageFour = ("<div class='choice' id='choice_4'><img src='images/nightmare.jpg'></div>");
var questionTwoImages = $questionTwoImageOne + $questionTwoImageTwo + $questionTwoImageThree + $questionTwoImageFour;

var questionTwoAudio = $('#questionTwoAudio');

var questionTwoDescriptionText = ("The Shining is a 1980 British-American psychological horror film produced and directed by Stanley Kubrick, co-written with novelist Diane Johnson, and starring Jack Nicholson, Shelley Duvall, Danny Lloyd, and Scatman Crothers. The film is based on Stephen King's novel of the same name, though there are significant changes.<br><br>In the film, Jack Torrance, a writer and recovering alcoholic, takes a job as an off-season caretaker at an isolated hotel called the Overlook Hotel. His young son possesses psychic abilities and is able to see things from the past and future, such as the ghosts who inhabit the hotel. Soon after settling in, the family is trapped in the hotel by a snowstorm, and Jack gradually becomes influenced by a supernatural presence; he descends into madness and attempts to murder his wife and son.")

var questionTwo = new Question(questionTwoAudio, questionTwoImages, questionTwoDescriptionText);