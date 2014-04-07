$(document).ready(function(){
	console.log("js working");

	// Questions array
	var questions = [questionOne];
	
	questions[count].updateQuestion();
	
	$('.choice').on('click', function(){
		console.log('Click working');
	});
});

function Question(moviePosters) {
	// this.audio = audio;
	this.moviePosters = moviePosters;
	// this.descriptionText = descriptionText;
}

Question.prototype.updateQuestion = function(){
	$('.choices_container').append(this.moviePosters);
}

// Count variable for accessing array
var count = 0;

// Question 1 varibales

var $questionOneImageOne = ("<div class='choice' id='choice_1'><img src='images/shining.jpg'></div>");
var $questionOneImageTwo = ("<div class='choice' id='choice_2'><img src='images/alien.jpg'></div>");
var $questionOneImageThree = ("<div class='choice' id='choice_3'><img src='images/halloween.jpg'></div>");
var $questionOneImageFour = ("<div class='choice' id='choice_4'><img src='images/nightmare.jpg'></div>");
var questionOneImages = $questionOneImageOne + $questionOneImageTwo + $questionOneImageThree + $questionOneImageFour;

var questionOne = new Question(questionOneImages);