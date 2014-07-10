
// MoonGame namespace to contain all the variables. use revailing module pattern with IFFE.
// IFFE: function expression
var MoonGame = (function() {

var NUM_BIRDS = 30;
var MAX_TOP = 70;
var MAX_LEFT = 95;


// Bird constructor - creates the birds
	var Bird = function(){
	}

	Bird.prototype.create = function(){
		this.el= $('<i class="icon-twitter-bird"></i>');

		this.el.css({
			top: Math.random() * MAX_TOP + '%',
			left: Math.random() * MAX_LEFT  + '%'
		})
		return this.el;
	}


// declare array of free-flying birds
	var birds = [];
	var flock = null;


	var init = function(){

		//  create the flock
		var penguin = new Penguin();
		flock = new Flock(penguin);
		$('.sky').append(flock.create());	


	// create birds in sky
		for (var i = 0; i < NUM_BIRDS; i++) {
			var bird = new Bird();
			var birdEl = bird.create();
			$('.sky').append(birdEl);
			birds.push(bird);
			flock.addBirdClickHandler(bird);
			};	
	
		}

	



//  Penguin Constuructor

	var Penguin =function(){

	}
	Penguin.prototype.create = function(){
		this.el =$('<img src="http://whatculture.com/wp-content/uploads/2012/05/Penguin-Suit-Mario.png">');
		return this.el;
	}


// Flock Constructor
	var Flock = function(penguin){
		this.penguin=penguin;
		this.birds=[];

	}
	Flock.prototype.create = function(){
		var newEl =$('<div class="flock">');
		newEl.append(this.penguin.create());
		newEl.css('bottom', this.birds.length * 20)  

		// 	append all birds to flock
		for (var i = 0; i < this.birds.length; i++) {
			console.log(this.birds[i].el)
			newEl.append(this.birds[i].el)
		};
		// replaceWith OLD FLOCK WITH NEW FLOCK
		if(this.el){
			this.el.replaceWith(newEl);
		}
		this.el = newEl;

		return this.el;
	}
	Flock.prototype.addBirdClickHandler = function(bird){
		var self = this;
		bird.el.on('click', function(){
			self.birds.push(bird)
			self.create()
		})	
	};

// return object literal we wish to reveal to rest of program. all else remains private.
	return{
		init: init
	};


})();


$(document).on('ready', function() {
  MoonGame.init();
});