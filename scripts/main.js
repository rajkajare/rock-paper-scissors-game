let score = JSON.parse(localStorage.getItem('score'))
if (!score) {
    score = {wins:0, loses:0, tie:0};
} else {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} &nbsp; Loses: ${score.loses} &nbsp; Tie: ${score.tie}`;
}















function playGame(yourMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (yourMove === "Rock") {
        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else {
            result = 'You win.';
        }
    } else if (yourMove === "Paper") {
        if (computerMove === 'Rock') {
            result = 'You win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else {
            result = 'You lose.';
        }
    } else {
        if (computerMove === 'Rock') {
            result = 'You lose.';
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
        localStorage.setItem('score', JSON.stringify(score))
    } else if (result === 'You lose.') {
        score.loses += 1;
        localStorage.setItem('score', JSON.stringify(score))
    } else {
        score.tie += 1;
        localStorage.setItem('score', JSON.stringify(score))
    }

    document.querySelector('.js-result')
        .innerHTML = result;
    document.querySelector('.js-scene')
        .innerHTML = `You &nbsp;<img src="assets/images/${yourMove}-emoji.png"> &nbsp;&nbsp;&nbsp; <img src="assets/images/${computerMove}-emoji.png">&nbsp; Computer`;
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} &nbsp; Loses: ${score.loses} &nbsp; Tie: ${score.tie}`;
}


function pickComputerMove() {
    const value = Math.random();
    let computerMove = '';
    if (0 <= value && value < 1/3) {
        computerMove = 'Rock';
    } else if (1/3 <= value && value < 2/3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissor';
    }
    return computerMove;
}


function reset() {
    score.wins = 0;
    score.loses = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    document.querySelector('.js-result')
        .innerHTML = '';
    document.querySelector('.js-scene')
        .innerHTML = '';
    document.querySelector('.js-score')
            .innerHTML = `Wins: ${score.wins} &nbsp; Loses: ${score.loses} &nbsp; Tie: ${score.tie}`;
}


let autoplayButton = document.querySelector('.js-autoplay');
let isAutoPlaying = false;
let intervalId;
function autoplay() {
    if (isShowingPopup) {
        popup();
    };
    if (! isAutoPlaying) {
        autoplayButton.innerText = "Stop Playing";
        intervalId = setInterval(() => {
                        let yourMove = pickComputerMove();
                        playGame(yourMove);
                    }, 1000);
        isAutoPlaying = true;
    } else {
        autoplayButton.innerText = "Autoplay";
        clearInterval(intervalId);
        isAutoPlaying = false;
    }    
}


let isShowingPopup = false;
function popup() {
    if (! isShowingPopup) {
        document.querySelector('.js-popup').classList.add('popup');
        document.querySelector('.js-popup')
            .innerHTML = `
                <p class="popup-text">Are you sure you want to reset the score ?</p>
                <button class="js-yes popup-button">Yes</button> 
                <button class="js-no popup-button">No</button>
            `;
        document.querySelector('.js-yes').addEventListener('click', ()=>{
            reset();
            popup('hide');
        });
        document.querySelector('.js-no').addEventListener('click', ()=>{
            popup('hide');
        });
        isShowingPopup = true;
    } else {
        document.querySelector('.js-popup').classList.remove('popup');
        document.querySelector('.js-popup')
            .innerHTML = ``;
        isShowingPopup = false;
    }
}















document.querySelector('.js-rock').addEventListener('click', ()=>{
    if (isAutoPlaying) {
        autoplay();
    } else if (isShowingPopup) {
        popup();
    }
    playGame('Rock');
});

document.querySelector('.js-paper').addEventListener('click', ()=>{
    if (isAutoPlaying) {
        autoplay();
    } else if (isShowingPopup) {
        popup();
    }
    playGame('Paper');
});

document.querySelector('.js-scissor').addEventListener('click', ()=>{
    if (isAutoPlaying) {
        autoplay();
    } else if (isShowingPopup) {
        popup();
    }
    playGame('Scissor');
});


document.querySelector('.js-reset').addEventListener('click', ()=>{
    if (isAutoPlaying) {
        autoplay();
    }
    popup();
})

document.querySelector('.js-autoplay').addEventListener('click', ()=>{
    autoplay();
});


document.body.addEventListener('keydown', (event)=>{
    if (event.key === 'r' ) {
        if (isAutoPlaying) {
            autoplay();
        } else if (isShowingPopup) {
            popup();
        }
        playGame('Rock');
    } 
    if (event.key === 'p' ) {
        if (isAutoPlaying) {
            autoplay();
        } else if (isShowingPopup) {
            popup();
        }
        playGame('Paper');
    } 
    if (event.key === 's' ) {
        if (isAutoPlaying) {
            autoplay();
        } else if (isShowingPopup) {
            popup();
        }
        playGame('Scissor');
    } 
    if (event.key === 'Backspace' ) {
        if (isAutoPlaying) {
            autoplay();
        }
        popup();
    } 
    if (event.key === 'a') {
        autoplay();
    }
    if (event.key === 'y') {
        reset();
        popup();
    }
    if (event.key === 'n') {
        popup();
    }
})