$(document).ready(function(){
	console.log("js working");

	// Questions array
	var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

	instructionLoad(questions);

	$('#play').on('click', function(){
		console.log('play click');
		questions[count].playAudio();
	});

	$('#stop').on('click', function(){
		console.log('stop click');
		questions[count].stopAudio();
	});
	
	$('.answer').find('button').on('click', function(){
		nextQuestion(questions);
		itemClick(questions);
		itemHover();
	});

	itemClick(questions);
	itemHover();

});

// Progress Bar array

var progressArray = [$('#progress_1'), $('#progress_2'), $('#progress_3'), $('#progress_4'), $('#progress_5')];
var clicked = false;

// Count variable for accessing array
var count = 0;

// Total correct variable
var correctCount = 0;



// The question object

function Question(audio, moviePosters, descriptionText) {
	this.audio = audio;
	this.moviePosters = moviePosters;
	this.descriptionText = descriptionText;
}

// Function to update and append question content

Question.prototype.updateQuestion = function(){
	$('.choices_container').append(this.moviePosters);
	$(this.moviePosters).slideDown('5000');
	// this.playAudio();
};

// Function to play / stop audio

Question.prototype.playAudio= function(){
	this.audio[0].volume = 0.5;
	this.audio[0].load();
	this.audio[0].play();
};

Question.prototype.stopAudio = function(){
	this.audio[0].pause();
};

// Function to display instructions on page load

function instructionLoad(event){
	$('.instructions').show();
	$('.instructions').find('button').on('click', function(){
		event[count].updateQuestion();
		itemHover();
		itemClick(event);
		$(this).closest('.instructions').slideUp(475);
	});
	
}

// Function to add abality to click items

function itemClick(array) {
	$('.choice').on('click', function(){
		console.log('Click working');
		var correct = false;
		
		$(this).animate({opacity: 1}, 1);

		if (clicked === false) {
			if ($(this).hasClass('correct')){
				resultsUpdate('Correct!');
				correct = true;
				correctCount++;
			}
			else {
				resultsUpdate('Incorrect!');
			}
		}
		progressUpdate(correct);
		array[count].showInfo();
		clicked = true;
	});
}

// Function to update results text

function resultsUpdate(event){
	$('.answer_head').text(event);
}

// Function to add animation for mouse over

function itemHover(){
	console.log(clicked);
	$('.choice').on('mouseenter', function(){
		if (clicked === false) {
			$(this).animate({opacity: 0.5}, 250);
		}
	});
	$('.choice').on('mouseleave', function(){
		// if (clicked === false) {
			$(this).animate({opacity: 1}, 100);
		// }
	});
}

// Function to show info regarding question

Question.prototype.showInfo= function(){
	if (clicked === false) {
		$('.correct').clone().animate({opacity: 1}, 1).appendTo($('.poster'));
		$('.description').append(this.descriptionText);
		$('.answer').show();
	}
};

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

function nextQuestion(event){
	event[count].stopAudio();
	count++;
	clicked = false;
	$('.choices_container').empty();
	$('.answer').find('.poster').empty();
	$('.answer').find('.description').empty();
	$('.answer').hide();
	if (count > 4){
		finalResults(correctCount);
		// alert(correctCount + "/5");
	}
	else {
		event[count].updateQuestion();
	}
}

// Function to update final stats
 
 function finalResults(event){
	var $finalParagraph = $('.final').find('p');
	$('.final').find('#header').text(event + '/5');

	if (+event >= 4) {
		$finalParagraph.text("Well done.  Would you like to test your knowledge with some more films?");
	}
	else if (+event >=2) {
		$finalParagraph.text("Not too bad.  Lets try some more films.");
	}

	else {
		$finalParagraph.text("Maybe another set of films would suit you better.  Lets give it a try.");
	}

	$('.final').show();
 }

// HTML Variables
var divStart = "<div class='choice'>";
var divCorrect = "<div class='choice correct'>";
var divEnd = "'></div>";
var imageSrc = "<img src='images/";

// Question 1 varibales

var questionOneImageOne = divCorrect + imageSrc + 'shining.jpg' + divEnd;
var questionOneImageTwo = divStart + imageSrc + 'alien.jpg' + divEnd;
var questionOneImageThree = divStart + imageSrc + 'halloween.jpg' + divEnd;
var questionOneImageFour = divStart + imageSrc + 'nightmare.jpg' + divEnd;
var questionOneImages = questionOneImageOne + questionOneImageTwo + questionOneImageThree + questionOneImageFour;

var questionOneAudio = $('#questionOneAudio');

var questionOneDescriptionText = ("The Shining is a 1980 British-American psychological horror \
	film produced and directed by Stanley Kubrick, co-written with novelist Diane Johnson, \
	and starring Jack Nicholson, Shelley Duvall, Danny Lloyd, and Scatman Crothers. The film \
	is based on Stephen King's novel of the same name, though there are significant changes.<br><br>\
	In the film, Jack Torrance, a writer and recovering alcoholic, takes a job as an off-season caretaker \
	at an isolated hotel called the Overlook Hotel. His young son possesses psychic abilities and is able \
	to see things from the past and future, such as the ghosts who inhabit the hotel. Soon after settling in, \
	the family is trapped in the hotel by a snowstorm, and Jack gradually becomes influenced by a supernatural \
	presence; he descends into madness and attempts to murder his wife and son.");

var questionOne = new Question(questionOneAudio, questionOneImages, questionOneDescriptionText);

// Question 2 variables

var questionTwoImageOne = divStart + imageSrc + 'bladerunner.jpg' + divEnd;
var questionTwoImageTwo = divCorrect + imageSrc + 'brazil.jpg' + divEnd;
var questionTwoImageThree = divStart + imageSrc + 'fifth.jpg' + divEnd;
var questionTwoImageFour = divStart + imageSrc + 'starwars.jpg' + divEnd;
var questionTwoImages = questionTwoImageOne + questionTwoImageTwo + questionTwoImageThree + questionTwoImageFour;

var questionTwoAudio = $('#questionTwoAudio');

var questionTwoDescriptionText = ("Brazil is a 1985 British film directed by Terry Gilliam and written \
	by Gilliam, Charles McKeown, and Tom Stoppard. British National Cinema by Sarah Street describes the \
	film as a 'fantasy/satire on bureaucratic society' while John Scalzi's Rough Guide to Sci-Fi Movies \
	describes it as a 'dystopian satire'. The film stars Jonathan Pryce and features Robert De Niro, Kim \
	Greist, Michael Palin, Katherine Helmond, Bob Hoskins, and Ian Holm.<br><br>\
	The film centres on Sam Lowry, \
	a man trying to find a woman who appears in his dreams while he is working in a mind-numbing job and living a \
	life in a small apartment, set in a consumer-driven dystopian world in which there is an over-reliance on poorly \
	maintained (and rather whimsical) machines. Brazil's bureaucratic, totalitarian government is reminiscent of the \
	government depicted in George Orwell's Nineteen Eighty-Four, except that it has a buffoonish, slapstick \
	quality and lacks a Big Brother figure.");

var questionTwo = new Question(questionTwoAudio, questionTwoImages, questionTwoDescriptionText);

// Question 3 variables

var questionThreeImageOne = divCorrect + imageSrc + 'robinhood.jpg' + divEnd;
var questionThreeImageTwo = divStart + imageSrc + 'spirited.jpg' + divEnd;
var questionThreeImageThree = divStart + imageSrc + 'fantastic.jpg' + divEnd;
var questionThreeImageFour = divStart + imageSrc + 'toystory.jpg' + divEnd;
var questionThreeImages = questionThreeImageOne + questionThreeImageTwo + questionThreeImageThree + questionThreeImageFour;

var questionThreeAudio = $('#questionThreeAudio');

var questionThreeDescriptionText = ("An imaginative Disney version of the Robin Hood legend. \
	Fun and romance abounds as the swashbuckling hero of Sherwood Forest, and his valiant \
	sidekick plot one daring adventure after another to outwit the greedy prince and his \
	partner as they put the tax squeeze on the poor.<br><br>\
	Prince John, an immature lion, rules England as heartlessly tyrannical regent for his \
	crusader brother John Lionheart. Robin Hood, Little John and Friar Tuck cleverly revolt \
	against over-taxation and general oppression by the sheriff of Nottingham and other royal \
	men. Robin wins the heart of royal ward Marian. Regular methods failing catch Robin, the king \
	organizes an archery tournament, which the country's best archer just can't resist.");

var questionThree = new Question(questionThreeAudio, questionThreeImages, questionThreeDescriptionText);

// Question 4 variables

var questionFourImageOne = divStart + imageSrc + 'batman.jpg' + divEnd;
var questionFourImageTwo = divCorrect + imageSrc + 'scott.jpg' + divEnd;
var questionFourImageThree = divStart + imageSrc + 'v.jpg' + divEnd;
var questionFourImageFour = divStart + imageSrc + 'watchmen.jpg' + divEnd;
var questionFourImages = questionFourImageOne + questionFourImageTwo + questionFourImageThree + questionFourImageFour;

var questionFourAudio = $('#questionFourAudio');

var questionFourDescriptionText = ("Scott Pilgrim (Michael Cera) is an unemployed 23-year-old bass guitarist \
	in an up-and-coming garage rock band who is dating a cute 17-year-old high school girl, \
	Knives Chau (Ellen Wong). He is having fun in life and rolling along at a nice even tempo \
	until one day Ramona Flowers (Mary Elizabeth Winstead) roller-blades into his life. Ramona \
	moved to Toronto from New York City to find peace and quiet and leave her past behind. \
	No one knows what her past is, but Scott will find out very soon as he tries to make Ramona his \
	new girlfriend.<br><br>\
	Before Scott can begin dating Ramona, he must prove himself by defeating the league \
	of her seven exes who controls her love life. They will do anything to get rid of and destroy any new \
	boyfriend Ramona may consider. If Scott wants to find true love with Ramona, he must defeat all seven, \
	before the game is over.");

var questionFour = new Question(questionFourAudio, questionFourImages, questionFourDescriptionText);

// Question 5 variables

var questionFiveImageOne = divStart + imageSrc + 'diehard.jpg' + divEnd;
var questionFiveImageTwo = divStart + imageSrc + 'roadhouse.jpg' + divEnd;
var questionFiveImageThree = divCorrect + imageSrc + 'conair.jpg' + divEnd;
var questionFiveImageFour = divStart + imageSrc + 'bigtrouble.jpg' + divEnd;
var questionFiveImages = questionFiveImageOne + questionFiveImageTwo + questionFiveImageThree + questionFiveImageFour;

var questionFiveAudio = $('#questionFiveAudio');

var questionFiveDescriptionText = ("Cameron Poe, who is a highly decorated United States Army Ranger came to his home of \
	Alabama to his wife, Tricia. only to run into a few drunken regulars at where Tricia works. \
	Cameron unknowingly kills one of the drunks and was sent to a federal penitentiary for \
	involuntary manslaughter for seven years. Then, Cameron became eligible for parole and can now \
	go home to his wife and daughter, Casey.<br><br> \
	Unfortunately, Cameron has to share a prison airplane \
	with some of the most dangerous criminals in the country, who somehow took control of the plane and \
	are now planning to escape the country with the plane. Cameron has to find a way to stop them while \
	playing along. Meanwhile, United States Marshal Vincent Larkin is trying to help Cameron get free and \
	stop the criminals including, Cyrus 'The Virus' Grissom.");

var questionFive = new Question(questionFiveAudio, questionFiveImages, questionFiveDescriptionText);