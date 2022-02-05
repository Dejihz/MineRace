console.log('Javascript is working!');

let submitBtn = document.getElementById("CQ-startGame");
// add event click listener on form submit button
submitBtn.addEventListener("click", function(event) {
    // preventDefault to stop page from reloading
    event.preventDefault();

    // get value out of input
    let enteredPlayer1Name = (<HTMLInputElement>document.getElementById('player1Name')).value

    // check if entered text is not empty
    if(enteredPlayer1Name) {
        localStorage.setItem('player1Name', enteredPlayer1Name)
        document.location.href = '../game.html';
    } else {
        alert("Please enter your desired player name")
    }

    // get value out of input
    let enteredPlayer2Name = (<HTMLInputElement>document.getElementById('player2Name')).value

    // check if entered text is not empty
    if(enteredPlayer2Name) {
        localStorage.setItem('player2Name', enteredPlayer2Name)
        document.location.href = '../game.html';
    } else {
        alert("Please enter your desired player 2 name")
    }
    
});