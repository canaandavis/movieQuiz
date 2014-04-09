$(document).ready(function(){
	console.log("js working");

	// Questions array
	var questionsArray = [[questionOne, questionTwo, questionThree, questionFour, questionFive], [questionSix, questionSeven, questionEight, questionNine, questionTen]];
	var questions = questionsArray[game];

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
		styleUpdate(questions);
	});

	$('.final').find('#next_round').on('click', function(){
		nextRound();
		questions = questionsArray[game];
		questions[count].updateQuestion();
		styleUpdate(questions);
	});

	$('.final').find('#no_button').on('click', function(){
		endRoundOne();
	});

	$('.endGame').find('#start_over').on('click', function(){
		game = 0;
		questions = questionsArray[game];
		newGame(questions);
	});

	$('#instructions_link').on('click', function(){
		$('.instructions').find('#get_started').remove();
		$('.instructions').append("<button id='got_it'>Got It</button>");
		$('#got_it').on('click', function(){
			$('.instructions').fadeOut(450);
		});
		$('.instructions').slideDown(450);
	});


	styleUpdate(questions);

});

// Progress Bar array

var progressArray = [$('#progress_1'), $('#progress_2'), $('#progress_3'), $('#progress_4'), $('#progress_5')];
var clicked = false;

// Count variable for accessing array
var count = 0;

// Total correct variables
var correctCount = 0;
var totalCorrect = 0;

// Game number
var game = 0;

// The question object

function Question(audio, moviePosters, descriptionText) {
	this.audio = audio;
	this.moviePosters = moviePosters;
	this.descriptionText = descriptionText;
}

// Function to update and append question content

Question.prototype.updateQuestion = function(){
	$('.choices_container').append(this.moviePosters).hide().fadeIn(500);
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

// Function to show info regarding question

Question.prototype.showInfo= function(){
	if (clicked === false) {
		$('.correct').clone().animate({opacity: 1}, 1).appendTo($('.poster'));
		$('.description').append(this.descriptionText);
		$('.answer').fadeIn(350);
	}
};

// Function to display instructions on page load

function instructionLoad(event){
	$('.instructions').show();
	$('.instructions').find('#get_started').on('click', function(){
		event[count].updateQuestion();
		styleUpdate(event);
		$(this).closest('.instructions').fadeOut(450);
	});
	
}

// Function to add abality to click items

function itemClick(array) {
	$('.choice').on('click', function(){
		// console.log('Click working');
		var correct = false;
		
		$(this).animate({opacity: 1}, 1);

		if (clicked === false) {
			if ($(this).hasClass('correct')){
				resultsUpdate('Correct!');
				correct = true;
				correctCount++;
				totalCorrect++;
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
	// console.log(clicked);

	$('.choice').on('mouseenter', function(){
		if (clicked === false) {
			$(this).animate({opacity: 0.5}, 250);
		}
	});
	$('.choice').on('mouseleave', function(){
		$(this).animate({opacity: 1}, 100);
	});
}

// function calling itemClick and itemHove, to update styles 

function styleUpdate(event){
	itemClick(event);
	itemHover();
}

// Function to update progress bar

function progressUpdate(event) {
	var progressItem = progressArray[count];
	if (clicked === false) {
		if (event) {
			progressItem.append('<i class="fa fa-check-circle"></i>')
			.addClass('progress_correct');
		}
		else {
			progressItem.append('<i class="fa fa-times-circle"></i>')
			.addClass('progress_incorrect');
		}
	}
}

// Function to reset progress bar
function progressReset(){
	for (i=0; i<progressArray.length; i++){
		progressArray[i].removeClass('progress_correct progress_incorrect')
		.empty();
	}
}

// Function to load next question

function nextQuestion(event){
	event[count].stopAudio();
	count++;
	clicked = false;
	$('.choices_container').fadeOut(200).empty();
	$('.answer').find('.poster').fadeOut(150, function(){
		$(this).empty().show();
	});
	$('.answer').find('.description').fadeOut(150, function(){
		$(this).empty().show();
	});
	$('.answer').fadeOut(150);
	
	if (game === 1 && count > 4) {
		console.log(totalCorrect + "/" + correctCount);
		endResults();
		$('.endGame').slideDown(450);
	}
	else if (count > 4){
		finalResults(correctCount);
	}
	else {
		console.log(event);
		event[count].updateQuestion();
	}
}

// function to move to next round

function nextRound(){
	game++;
	count = 0;
	correctCount = 0;
	progressReset();
	$('.final').slideUp(450);
}

// function for a new game 

function newGame(event){
	count = 0;
	correctCount = 0;
	game = 0;
	totalCorrect = 0;
	$('.endGame').slideUp(450);
	progressReset();
	event[count].updateQuestion();
	styleUpdate(event);
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

	$('.final').slideDown(450);
 }

 // Function for end results after one round

 function endRoundOne(){
	var faStar = "<i class='fa fa-star'></i>";
	var $stars = $('#stars');
	var $tagline = $('#tagLine');

	$('.endGame').find('#total').remove();

	$('.endGame').find('#header').text(correctCount + "/5 this round");
	if (+correctCount === 5) {
		$stars.empty().append("\"" + faStar + faStar + faStar + faStar + faStar + "\"");
		$tagline.text("Great Job! You did it, you really did it!");
	}
	else if (+correctCount === 4) {
		$stars.empty().append("\"" + faStar + faStar + faStar + faStar + "\"");
		$tagline.text("Well done, you know your stuff, dude");
	}
	else if(+correctCount === 3) {
		$stars.empty().append("\"" + faStar + faStar + faStar + "\"");
		$tagline.text("Good job, you should feel good about yourself, really");
	}
	else if(+correctCount === 2){
		$stars.empty().append("\"" + faStar + faStar + "\"");
		$tagline.text("You did ok, just ok though");
	}
	else if(+correctCount === 1){
		$stars.empty().append("\"" + faStar + "\"");
		$tagline.text("'Maybe you're just not a movie buff' - everyone");
	}
	else {
		$stars.empty().append("\"" + "<i class='fa fa-star-half'></i>" + "\"");
		$tagline.text("Lets just forget this happened");
	}
	$('.final').slideUp(450);
	$('.endGame').fadeIn(700);
 }

 // Function to update End Game results

 function endResults(){
	var faStar = "<i class='fa fa-star'></i>";
	var $stars = $('#stars');
	var $tagline = $('#tagLine');
	$('.endGame').find('#header').text(correctCount + "/5 this round");
	
	$('.endGame').find('#total').text(totalCorrect + "/10 for the game");

	if (+totalCorrect === 10) {
		$stars.empty().append("\"" + faStar + faStar + faStar + faStar + faStar + "\"");
		$tagline.text("Great Job! You did it, you really did it!");
	}
	else if (+totalCorrect > 7) {
		$stars.empty().append("\"" + faStar + faStar + faStar + faStar + "\"");
		$tagline.text("Well done, you know your stuff, dude");
	}
	else if(+totalCorrect > 4) {
		$stars.empty().append("\"" + faStar + faStar + faStar + "\"");
		$tagline.text("Good job, you should feel good about yourself");
	}
	else if(+totalCorrect > 2){
		$stars.empty().append("\"" + faStar + faStar + "\"");
		$tagline.text("You did ok, just ok though");
	}
	else if(+totalCorrect > 1){
		$stars.empty().append("\"" + faStar + "\"");
		$tagline.text("'Maybe you're just not a movie buff' - everyone");
	}
	else {
		$stars.empty().append("\"" + "<i class='fa fa-star-half'></i>" + "\"");
		$tagline.text("Lets just forget this happened");
	}
 }

// Function to add Image as poster

function imageAdd(file, correctClass){
	correctClass = typeof correctClass !== 'undefined' ? correctClass : false;

	if (correctClass) {
		return "<div class='choice correct'><img src='images/" + file + "'></div>";
	}
	else {
		return "<div class='choice'><img src='images/" + file + "'></div>";
	}
}

// Question One Variables

var questionOneImages = imageAdd('shining.jpg', true) + imageAdd('alien.jpg') + imageAdd('halloween.jpg') + imageAdd('nightmare.jpg');

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

var questionTwoImages = imageAdd('bladerunner.jpg') + imageAdd('brazil.jpg', true) + imageAdd('fifth.jpg') + imageAdd('starwars.jpg');

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

var questionThreeImages = imageAdd('toystory.jpg') + imageAdd('spirited.jpg') + imageAdd('fantastic.jpg') + imageAdd('robinhood.jpg', true);

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

var questionFourImages = imageAdd('batman.jpg') + imageAdd('scott.jpg', true) + imageAdd('v.jpg') + imageAdd('watchmen.jpg');

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

var questionFiveImages = imageAdd('diehard.jpg') + imageAdd('roadhouse.jpg') + imageAdd('bigtrouble.jpg') + imageAdd('conair.jpg', true);

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

// Question 6 Variables

var questionSixImages = imageAdd('ghost.jpg', true) + imageAdd('lost.jpg') + imageAdd('ground.jpg') + imageAdd('caddy.jpg');

var questionSixAudio = $('#questionSixAudio');

var questionSixDescriptionText = ("Ghostbusters is a 1984 American supernatural comedy film directed and produced by \
	Ivan Reitman and written by Dan Aykroyd and Harold Ramis. It stars Bill Murray, Aykroyd, and Ramis as three eccentric \
	parapsychologists in New York City who start a ghost-catching business. Sigourney Weaver and Rick Moranis co-star as \
	a potential client and her neighbor. The Ghostbusters business booms after initial skepticism, but when an uptown \
	high-rise apartment building becomes the focal point of spirit activity linked to the ancient god Gozer, it \
	threatens to overwhelm the team and the entire world.");

var questionSix = new Question(questionSixAudio, questionSixImages, questionSixDescriptionText);

// Question 7 variables

var questionSevenImages = imageAdd('royal.png') + imageAdd('rush.jpg') + imageAdd('life.jpg', true) + imageAdd('grand.jpg');

var questionSevenAudio = $('#questionSevenAudio');

var questionSevenDescriptionText = ("he Life Aquatic with Steve Zissou is a 2004 American comedy-drama \
	film directed, co-written, and co-produced by Wes Anderson. It is Anderson's fourth feature \
	length film, released in the U.S. on Christmas 2004. It was written by Anderson and Noah Baumbach \
	and was filmed in and around Naples, Ponza, and the Italian Riviera.\
	The film stars Bill Murray as the eponymous Zissou, an eccentric oceanographer who \
	sets out to exact revenge on the 'Jaguar shark' that ate his partner Esteban. \
	Zissou is both a parody of and homage to French diving pioneer Jacques-Yves Cousteau (1910–1997), \
	to whom the film is dedicated. Cate Blanchett, Willem Dafoe, Michael Gambon, Jeff Goldblum, Anjelica \
	Huston, Owen Wilson, Seu Jorge, and Bud Cort are also featured in the film.");

var questionSeven = new Question(questionSevenAudio, questionSevenImages, questionSevenDescriptionText);

// Question 8 variables

var questionEightImages = imageAdd('jurassic.jpg', true) + imageAdd('independence.jpg') + imageAdd('t2.jpg') + imageAdd('mi.jpg');

var questionEightAudio = $('#questionEightAudio');

var questionEightDescriptionText = ("Jurassic Park is a 1993 American science fiction action film \
	that incorporates some horror elements as well. The film was directed by Steven Spielberg and is \
	the first installment of the Jurassic Park franchise. It is based on the 1990 novel of the same name \
	by Michael Crichton, with a screenplay written by Crichton and David Koepp. It stars Sam Neill, Laura Dern, \
	Jeff Goldblum, Richard Attenborough, Ariana Richards, Joseph Mazzello, Martin Ferrero, Wayne Knight, \
	Samuel L. Jackson and Bob Peck. The film centers on the fictional Isla Nublar, an islet located off \
	Costa Rica's Pacific Coast, where a billionaire philanthropist and a small team of genetic scientists \
	have created a wildlife park of cloned dinosaurs.");

var questionEight = new Question(questionEightAudio, questionEightImages, questionEightDescriptionText);

// Question 9 variables

var questionNineImages = imageAdd('et.jpg') + imageAdd('back.jpg', true) + imageAdd('gremlins.jpg') + imageAdd('goonies.jpg');

var questionNineAudio = $('#questionNineAudio');

var questionNineDescriptionText = ("Back to the Future is a 1985 American science fiction comedy film. \
	It was directed by Robert Zemeckis, written by Zemeckis and Bob Gale, produced by Steven Spielberg, \
	and stars Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover and Thomas F. Wilson. \
	Fox plays Marty McFly, a teenager who is accidentally sent back in time to 1955. He meets his future \
	parents in high school and accidentally attracts his mother's romantic interest. Marty must repair the \
	damage to history by causing his parents-to-be to fall in love, and with the help of scientist \
	Dr. Emmett \"Doc\" Brown (Lloyd), he must find a way to return to 1985.");

var questionNine = new Question(questionNineAudio, questionNineImages, questionNineDescriptionText);

// Question 10 variables

var questionTenImages = imageAdd('thing.jpg', true) + imageAdd('dead.jpg') + imageAdd('deadalive.jpg') + imageAdd('cabin.jpg');

var questionTenAudio = $('#questionTenAudio');

var questionTenDescriptionText = ("The Thing (also known as John Carpenter's The Thing) is a 1982 \
	American science fiction horror film directed by John Carpenter, written by Bill Lancaster, and \
	starring Kurt Russell. The film's title refers to its primary antagonist: a parasitic extraterrestrial \
	lifeform that assimilates other organisms and in turn imitates them. The Thing infiltrates an Antarctic \
	research station, taking the appearance of the researchers that it absorbs, and paranoia develops within the group.");

var questionTen = new Question(questionTenAudio, questionTenImages, questionTenDescriptionText);