"use strict"
let hero = document.getElementById('hero');
let food = document.getElementById('food');
let heroDirection = 'top';
let newLength = true;
let heroCharacter = {
	bottom: 0,
	left: 0,
	length: 1,
};
let foodCharacter = {
	bottom: 250,
	left: 250,
};

function eating(){
	if(foodCharacter.bottom == heroCharacter.bottom &&
	foodCharacter.left == heroCharacter.left){
	heroCharacter.length++;
	console.log(heroCharacter.length);
	foodCharacter.bottom = Math.floor(Math.random() * 20)*25;
	foodCharacter.left = Math.floor(Math.random()*20)*25;
	food.style.bottom = foodCharacter.bottom + 'px';
	food.style.left = foodCharacter.left + 'px';
	newLength = true;
	}
}

function move(){
 switch(heroDirection){
 	case 'top':
 		heroCharacter.bottom = heroCharacter.bottom + 25;
 		break;
 	case 'bottom':
 		heroCharacter.bottom = heroCharacter.bottom - 25;
 		break;
 	case 'left':
 		heroCharacter.left = heroCharacter.left - 25;
 		break;
 	case 'right':
 		heroCharacter.left = heroCharacter.left + 25;
 		break;
 	}
 	wall();
 	hero.style.bottom = heroCharacter.bottom + 'px';
 	hero.style.left = heroCharacter.left + 'px';
 }

 function length(){
 	let newBlock = '<div id="heroLength-'+ heroCharacter.length +'" style="bottom:'+ heroCharacter.bottom +'px; left:'+ heroCharacter.left + 'px" class="heroBody"><div class="inner-pixel"></div></div>';
 	document.querySelector('.section').insertAdjacentHTML('afterBegin',newBlock);
 	if( !newLength){
	 	for(let i = heroCharacter.length; i > 0 ; i--){;
	 		document.querySelectorAll('#heroLength-' + i)[1].id = 'heroLength-'+ (i-1);
	 	}
	 	document.querySelector('#heroLength-0').remove();
 	}
 	newLength = false;
 }

 function wall(){
	switch(heroCharacter.left){
		case 500:
			heroCharacter.left = 0;
			break;
		case -25:
			heroCharacter.left = 475;
			break;
		}

	switch(heroCharacter.bottom){
		case 500:
			heroCharacter.bottom = 0;
			break;
		case -25:
			heroCharacter.bottom = 475;
			break;
	}
}

function death(){
	for(let i = heroCharacter.length; i > 1 ; i--){
 		if(document.querySelector('#heroLength-' + i).style.bottom == heroCharacter.bottom + 'px' &&
 		 document.querySelector('#heroLength-' + i).style.left == heroCharacter.left + 'px'){
 			console.log('Death');
 			console.log(('#heroLength-' + i));
 			clearInterval(interval);
 			prompt('Земля пухом. Твой счет - '+ (heroCharacter.length - 1), 'Твое имя');
 		}
 	}
}

for(let bottom = 0; bottom < 500; bottom += 25){
	for(let left = 0; left < 500; left += 25){
		let empty = '<div class="empty-pixel" style="bottom:'+ bottom +'px;left:'+ left +'px"><div class="inner-empty-pixel"></div>';
		document.querySelector('.section').insertAdjacentHTML('beforeEnd',empty);
	}
}

function step(){
	move();
	death();
	eating();
	length();
}


food.style.bottom = foodCharacter.bottom + 'px';
food.style.left = foodCharacter.left + 'px';
let interval = setInterval(step, 150);


window.onkeypress = function(e){
	switch(e.keyCode){
		case 119:
		heroDirection = 'top';
		break;
		case 115:
		heroDirection = 'bottom';
		break;
		case 97:
		heroDirection = 'left';
		break;
		case 100:
		heroDirection = 'right';
		break;
	}
}