'use strict';
document.addEventListener('DOMContentLoaded', function(){
    const guessNumber = document.getElementById('number')
    const message = document.getElementById('message')
    const totalScore = document.getElementById('score')
    const highScore = document.getElementById('highscore')
    const checkBtn = document.getElementById('check')
    const guessInput = document.getElementById('guess')
    const Again = document.getElementById('again')
    const body = document.querySelector('body')
    const reset = document.getElementById('reset')


    //extracting highscore from localstorage
    let allTimeHighScore = JSON.parse(localStorage.getItem('highScore'))

    let randomNumber = parseInt((Math.random() * 20) + 1)
    console.log(randomNumber);

    //if want to increase life
    let score = 3
    
    if (allTimeHighScore) {
        highScore.innerText = allTimeHighScore
    }

    checkBtn.addEventListener('click', function(){
        let inputValue = Number(guessInput.value)
        if (!inputValue) {
            message.innerText = 'Enter the number first...'
        }
        else if(inputValue < 1 || inputValue >20){
            message.innerText = 'Just enter the number between 1 and 20...'
        }
        else{
            if(inputValue < randomNumber){
                message.innerText = 'Too low'
                score --
                totalScore.innerText = score

                //checking if score is less than 1 or not
                checkGameLost()
            }
            else if(inputValue > randomNumber){
                message.innerText = 'Too high'
                score --
                totalScore.innerText = score

                //checking if score is less than 1 or not
                checkGameLost()
            }
            else{
                message.innerText = 'Correct Number !'
                body.style.backgroundColor = '#60b347'
                checkBtn.style.display = 'none'
                guessNumber.innerText = inputValue
                Again.style.display = 'block'
                

                //setting highscore in local storage for the first time
                if(!allTimeHighScore){
                    localStorage.setItem('highScore', JSON.stringify(score))
                    highScore.innerText = score
                    
                }
                //if high score is already set
                else{
                    if(score > parseInt(highScore.innerText)){
                        localStorage.setItem('highScore', JSON.stringify(score))
                        highScore.innerText = score
                    }
                }
            }
        }
    })

    function checkGameLost(){
        if(score < 1){
            message.innerText = 'You lost the game...'
            checkBtn.style.display = 'none'
            guessInput.value = ''
            Again.style.display = 'block'
            body.style.backgroundColor = '#ff0000'
        }
    }
    
    Again.addEventListener('click', function(){
        Again.style.display = 'none'
        body.style.backgroundColor = '#222'
        randomNumber = parseInt((Math.random() * 20) + 1)
        checkBtn.style.display = 'block'

        //if want to increase life
        score = 3
        guessInput.value = ''

        //if want to increase life
        totalScore.innerText = '3'
        console.log(randomNumber);
        message.innerText = 'Start guessing...'
        guessNumber.innerText = '?'

    })
    reset.addEventListener('click', function(){
        Again.style.display = 'none'
        body.style.backgroundColor = '#222'
        randomNumber = parseInt((Math.random() * 20) + 1)
        checkBtn.style.display = 'block'

        highScore.innerText = '0'
        localStorage.removeItem('highScore')

        //if want to increase life
        score = 3
        guessInput.value = ''

        //if want to increase life
        totalScore.innerText = '3'
        console.log(randomNumber);
        message.innerText = 'Start guessing...'
        guessNumber.innerText = '?'
    })
})