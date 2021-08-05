// --- VARIABLES & CONSTANT --- 

// Variable that generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1

// Variable that counts attempts
let guessCount = 1

// Variable to reset the game
let resetButton

// Link to HTML elements
const guesses = document.querySelector('.guesses')
const lastResult = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const guessSubmit = document.querySelector('.guessSubmit')
const guessField = document.querySelector('.guessField')

// --- FUNCTIONS ---

// Function that check the attemp
function checkGuess () {
    // Variable that get the input user number
    let userGuess = Number(guessField.value)

    // If this is the first attemp
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: '
    }

    // Add the user number at previous guesses
    guesses.textContent += userGuess + ' '

    // If user win
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!'
        lastResult.style.backgroundColor = 'green'
        lowOrHi.textContent = ''
        setGameOver()

    // If user loses (no more attemps)
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!'
        lowOrHi.textContent = ''
        setGameOver()

    // If user is wrong, and fork possibilities
    } else {
        lastResult.textContent = 'Wrong!'
        lastResult.style.backgroundColor = 'red'
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!'            
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!'
        }
    }

    // Prepare the next attemp
    guessCount ++
    guessField.value = ''
    guessField.focus()
}

// Function that finish the game
function setGameOver () {
    // Disable input and submit button
    guessField.disabled = true
    guessSubmit.disabled = true

    // Create a new button Start new game
    resetButton = document.createElement('button')
    resetButton.textContent = 'Start new game'
    document.body.append(resetButton)

    resetButton.addEventListener('click', resetGame)
}

// Function that reset the game
function resetGame () {
    // Reset the count attemp
    guessCount = 1

    // Select all 'p' elements and reset them
    const resetParas = document.querySelectorAll('.resultParas p')
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = ''
    }

    // Delete reset button
    resetButton.parentNode.removeChild(resetButton)

    // Enable the input and submit button
    guessField.disabled = false
    guessSubmit.disabled = false
    guessField.reset()

    // Focus the cursor on input 
    guessField.focus()

    // Change color to last result paragraph
    lastResult.style.backgroundColor = 'white'

    // New random number
    randomNumber = Math.floor(Math.random() * 100) + 1
}

// --- EVENT ---

guessSubmit.addEventListener('click', checkGuess)