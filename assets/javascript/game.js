//grab reference to my DOM elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedletters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $score = document.getElementById("score");
var $gameover = document.getElementById("gameover");





//create variables for game (word bank, wins, losses, pick word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)

 var wordBank = ['Lion King', 'Beauty and The Beast', 'The Little Mermaid', 'Toy Story', 'Mary Poppins','Aladdin']
 var wins = 0;
 var losses = 0;
 var guessesLeft = 8;
 var gameRunning = false;
 var pickedWord = '';
 var pickedwordPlaceholderArr = [];
 var guessedLetterBank = [];
 var incorrectLetterBank = [];


// create newgame function, to reset all, pick new work and create placeholders

function newGame() {
    // reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedwordPlaceholderArr = [];

    // pick new word

    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create placehold out of the new pickedword

 for( var i = 0; i< pickedWord.length; i++) {
    if(pickedWord[i] === ' ') {
        pickedwordPlaceholderArr.push(' ');   
    }else{
        pickedwordPlaceholderArr.push('_');
    }
 }
// all new game into the DOM

$guessesLeft.textContent = guessesLeft;
$placeholders.textContent = pickedwordPlaceholderArr.join('');
$guessedletters.textContent = incorrectLetterBank;
}


//letterguesses function, takes in the letter you presed and sees if its in the selected word.
function letterGuess(letter) {

    console.log(letter)

    if(gameRunning === true && guessedLetterBank.indexOf(letter) === -1){
        //run game logic
        guessedLetterBank.push(letter);

        //check if guessed letter is in my picked word

        for(var i = 0; i < pickedWord.length; i++) {
            // convert both values to lower case so i can compare them correctly
            if (pickedWord[i].toLocaleLowerCase() === letter.toLocaleLowerCase()){

                // if a match, swap character in the placeholder with the actual letter
                pickedwordPlaceholderArr[i] = pickedWord[i];
            }
        }

        $placeholders.textContent = pickedwordPlaceholderArr.join('');
        checkIncorrect(letter);

    }
    else {
            if(!gameRunning){
                alert("THe game isn't running, click on new button to start over.");    
            } else{
                alert("you have already chosen this letter, try a new one!");
            }
        }
}

//check Incorrect (letter)

function checkIncorrect(letter) {
    //check to see if letter DID NOT make it into our pickwordplaceholder (therefore becomes incorrect guess)
    if (
        pickedwordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedwordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        //decrease guesses
      guessesLeft --;
      //add incorrect letter to incorrectLetterBank
      incorrectLetterBank.push(letter);
      // write new bank of incorrect letter guessed to DOM
      $guessedletters.textContent = incorrectLetterBank.join(' ');
      // write new amount of guesses left to DOM
      $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// Check Loss 
function checkLoss(){
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
        $gameover.play();
    }
    checkWin();
}

//check winning

function checkWin() {
    if(pickedWord.toLowerCase() === pickedwordPlaceholderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        $score.play();
    }
    
}



//add event listener for new game button

$newGameButton.addEventListener('click', newGame);

//add onkeyup event to trigger letterguess

document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90){
        letterGuess(event.key);
    }
}

