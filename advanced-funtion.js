/*
we will copy the code from function-ojects.js and improve it with our advanced funtion knowledge
*/
function pickComputerMove() {

  const randomNumber = Math.random();

  let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {computerMove = 'paper';}
    else if (randomNumber >= 2 / 3 && randomNumber < 1) 
    {computerMove = 'scissors';}

    return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = ''

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {result = 'You lose';}
      else if (computerMove === 'paper') {result = 'You win';}
      else if (computerMove === 'scissors') {result = 'Tie';}
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {result = 'You win';}
      else if (computerMove === 'paper') {result = 'Tie';}
      else if (computerMove === 'scissors') {result = 'You lose';}
    }

    else if (playerMove === 'rock') {
      if (computerMove === 'rock') {result = 'Tie';}
      else if (computerMove === 'paper') {result = 'You lose';}
      else if (computerMove === 'scissors') {result = 'You win';}
    }

    if (result === 'You win') {score.wins === score.wins ++;}
    else if (result === 'Tie') {score.ties === score.ties ++;}
    else if (result === 'You lose') {score.losses === score.losses ++;}

    localStorage.setItem('score', JSON.stringify(score));
    
    updateScoreElement();

    document.querySelector('.my-result').innerHTML = result;

    document.querySelector('.my-move').innerHTML = `You
    <img src="./images/${playerMove}-emoji.png" id="img-icon" alt="">
    <img src="./images/${computerMove}-emoji.png" id="img-icon" alt="">
    Computer`
}


function updateScoreElement() {
  document.querySelector('.my')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

// this is where we applied our advanced function knowledge from the tutorial

let isAutoPlaying = false;
let stopPlay;

function autoPlay() {
  if (!isAutoPlaying) {
    stopPlay = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(stopPlay);
    isAutoPlaying = false;
  };

  if (document.querySelector('.js-auto').innerText === 'Auto play') {document.querySelector('.js-auto').innerHTML = 'Stop play'}
  else{
    document.querySelector('.js-auto').innerHTML = 'Auto play'
  }
}

// clearInterval() is also a function with an interval id that is used to stop the interval

/*
let isAutoPlay = false;
function autoPlay() {
setInterval(function() {
  const playerMove = pickComputerMove();
  playGame(playerMove);
}, 2000);
}
*/
/*we learnt about event listener in this section*/

document.querySelector('.js-rock').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }else if (event.key === 'p') {
    playGame('paper');
  }else if(event.key === 's') {
    playGame('scissors');
  }else if (event.key === 'a') {
    autoPlay();
  }else if (event.key === 'Backspace') {
    score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  // to remove the saved score in the localStorage
  localStorage.removeItem('score');
  updateScoreElement();  
  }
});

document.querySelector('.js-reset').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  // to remove the saved score in the localStorage
  localStorage.removeItem('score');
  updateScoreElement();
})

document.querySelector('.js-auto').addEventListener('click', () => {
  autoPlay();
})