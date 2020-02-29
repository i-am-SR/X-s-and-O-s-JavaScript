const X_class = 'X'
const O_class = 'O'
const winSet = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('WinningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('RestartButton')
let Xnow

letsPlay()

function letsPlay()
{
    Xnow = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_class)
        cell.classList.remove(O_class)
        cell.addEventListener('click', clickFunction, {once: true})
    })
    showHover()
    winningMessageElement.classList.remove('show')
}

function finish(winner)
{
    if(winner){
        winningMessageTextElement.innerText = `${Xnow ? "O" : "X"} is the WINNER!`
    }
    else{
        winningMessageTextElement.innerText = `It's a DRAW!`
    }
    winningMessageElement.classList.add('show')
}

restartButton.addEventListener('click', letsPlay)

cellElements.forEach(cell =>{
    cell.addEventListener('click', clickFunction, {once: true})
})

function clickFunction(e){
    const cell = e.target
    const currClass = Xnow ? O_class : X_class
    cell.classList.add(currClass)
    if(checkWin(currClass)){
        finish(true)
    } 
    else if(checkDraw()){
        finish(false)
    }
    else{
        Xnow = !Xnow
        showHover()
    }
}

function checkWin(currClass){
    return winSet.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currClass)
        })
    })
}

function checkDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(O_class)
    })
}

function showHover(){
    board.classList.remove(O_class)
    board.classList.remove(X_class)
    if(Xnow){
        board.classList.add(O_class)
    }
    else{
        board.classList.add(X_class)
    }
}

