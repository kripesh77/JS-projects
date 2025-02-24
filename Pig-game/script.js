document.addEventListener('DOMContentLoaded', () => {
    let rollDice = document.querySelector('.btn--roll')
    let player0TotalScore = document.getElementById('score--0')
    let player1TotalScore = document.getElementById('score--1')
    let currentScore0 = document.getElementById('current--0')
    let currentScore1 = document.getElementById('current--1')
    let holdBtn = document.querySelector('.btn--hold')
    let newGame = document.querySelector('.btn--new')
    let dice = document.querySelector('.dice')
    let player0 = document.getElementById('name--0')
    let player1 = document.getElementById('name--1')

    let turn = 0
    let currentScore = 0
    let totalScore = 0

    rollDice.addEventListener('click', function(){
        let randomNumber = parseInt(Math.random() * 6 + 1)
        dice.setAttribute('src', `img/dice-${randomNumber}.png`)

        //adding rolled dice score into current score
        if(turn == 0){
            
            if (randomNumber == 1) {
                currentScore1.parentElement.parentElement.classList.add('player--active')
                currentScore0.parentElement.parentElement.classList.remove('player--active')
                turn = 1
                currentScore = 0
                currentScore0.innerText = '0'
                
            }
            else{
                currentScore += Number(randomNumber)
                currentScore0.innerText = currentScore
            }
        }
        else{
            if (randomNumber == 1) {
                currentScore1.parentElement.parentElement.classList.remove('player--active')
                currentScore0.parentElement.parentElement.classList.add('player--active')
                turn = 0
                currentScore = 0
                currentScore1.innerText = '0'
            }
            else{
                currentScore += randomNumber
                currentScore1.innerText = currentScore
            }
        }

    })

    holdBtn.addEventListener('click', function(){
        if (turn == 0) {
            totalScore = 0
            totalScore = parseInt(player0TotalScore.innerText)
            totalScore += currentScore
            player0TotalScore.innerText = totalScore
            currentScore = 0
            currentScore0.innerText = currentScore
            turn = 1
            
            //changing background color
            currentScore1.parentElement.parentElement.classList.add('player--active')
            currentScore0.parentElement.parentElement.classList.remove('player--active')

            //check Game Over
            gameOver(totalScore, turn)
        }
        else{
            totalScore = 0
            totalScore = parseInt(player1TotalScore.innerText)
            totalScore += currentScore
            player1TotalScore.innerText = totalScore
            currentScore = 0
            currentScore1.innerText = currentScore
            turn = 0
            
            //changing background color
            currentScore0.parentElement.parentElement.classList.add('player--active')
                currentScore1.parentElement.parentElement.classList.remove('player--active')
                gameOver(totalScore, turn)
        }
    })

    function gameOver(totalScore, turn){
        if (totalScore >= 20) {
            //Here turn == 1 is for player 0 because we have checked if game is over or not after changing the turn
            rollDice.style.display = 'none'
            holdBtn.style.display = 'none'
            if(turn == 1){
                player0.innerText = 'Player 1 Won!'
                player0.parentElement.classList.add('player--winner')
            }
            if(turn == 0){
                player1.innerText = 'Player 2 Won!'
                player1.parentElement.classList.add('player--winner')
                
            }
        }
    }
    
    newGame.addEventListener('click', function(){
        player0.parentElement.classList.remove('player--winner')
        player1.parentElement.classList.remove('player--winner')

        //changing text of players
        player0.innerText = 'Player 1'
        player1.innerText = 'Player 2'

        rollDice.style.display = 'block'
        holdBtn.style.display = 'block'
        turn = 0
        currentScore0.parentElement.parentElement.classList.add('player--active')
        currentScore1.parentElement.parentElement.classList.remove('player--active')

        //Leaving this will retain the black background color

        currentScore = 0
        totalScore = 0
        player0TotalScore.innerText = 0
        player1TotalScore.innerText = 0
        currentScore0.innerText = 0
        currentScore1.innerText = 0

    })
})