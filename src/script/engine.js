const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    value:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.value.curretTime--;
    state.view.timeLeft.textContent = state.value.curretTime
    if (state.value.curretTime <= 0){
        clearInterval(state.actions.timerId)
        clearInterval(state.actions.countDownTimerId)
        alert("GAMER OVER! O seu score foi de: " + state.value.result)
        
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy')
    state.value.hitPosition = randomSquare.id
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id == state.value.hitPosition){
                state.value.result++
                state.view.score.textContent = state.value.result
                state.value.hitPosition = null
                playSound("hit")
            }
        })
    })
}

function initialize(){
    addListenerHitBox()

}

initialize()