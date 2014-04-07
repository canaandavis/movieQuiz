$(document).ready(function(){
	console.log("js working");

	// Questions array
	var questions = [questionOne];
	
	questions[count].updateQuestion();

	$('#play').on('click', function(){
		console.log('play click');
		questions[count].playAudio();
	});

	$('#stop').on('click', function(){
		console.log('stop click');
		questions[count].stopAudio();
	})
	
	$('.choice').on('click', function(){
		console.log('Click working');
	});
});

function Question(audio, moviePosters) {
	this.audio = audio;
	this.moviePosters = moviePosters;
	// this.descriptionText = descriptionText;
}

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

// Count variable for accessing array
var count = 0;

// Question 1 varibales

var $questionOneImageOne = ("<div class='choice' id='choice_1'><img src='images/shining.jpg'></div>");
var $questionOneImageTwo = ("<div class='choice' id='choice_2'><img src='images/alien.jpg'></div>");
var $questionOneImageThree = ("<div class='choice' id='choice_3'><img src='images/halloween.jpg'></div>");
var $questionOneImageFour = ("<div class='choice' id='choice_4'><img src='images/nightmare.jpg'></div>");
var questionOneImages = $questionOneImageOne + $questionOneImageTwo + $questionOneImageThree + $questionOneImageFour;

var questionOneAudio = $('#questionOneAudio');

var questionOne = new Question(questionOneAudio, questionOneImages);