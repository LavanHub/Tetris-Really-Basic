document.addEventListener("DOMContentLoaded", () => {
    const Width = 10
    const Grid = document.querySelector(".grid")
    let squares = Array.from(document.querySelectorAll(".grid div"))
    const GameScore = document.querySelector("#score")
    const StartButton = document.querySelector("#start-game")
    console.log(StartButton)
    let timeId
    let nextRandom = 0
    let score = 0
    const Colors = [
        'orange',
        'yellow',
        'purple',
        'red',
        'blue'
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, Width+1, Width*2+1, 2],
        [Width, Width+1, Width+2, Width*2+2],
        [1, Width+1, Width*2+1, Width*2],
        [Width, Width*2, Width*2+1, Width*2+2]
    ]

    const zTetromino = [
        [0,Width,Width+1,Width*2+1],
        [Width+1, Width+2,Width*2,Width*2+1],
        [0,Width,Width+1,Width*2+1],
        [Width+1, Width+2,Width*2,Width*2+1]
    ]

    const tTetromino = [
        [1,Width,Width+1,Width+2],
        [1,Width+1,Width+2,Width*2+1],
        [Width,Width+1,Width+2,Width*2+1],
        [1,Width,Width+1,Width*2+1]
    ]

    const oTetromino = [
        [0,1,Width,Width+1],
        [0,1,Width,Width+1],
        [0,1,Width,Width+1],
        [0,1,Width,Width+1]
    ]

    const iTetromino = [
        [1,Width+1,Width*2+1,Width*3+1],
        [Width,Width+1,Width+2,Width+3],
        [1,Width+1,Width*2+1,Width*3+1],
        [Width,Width+1,Width+2,Width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    // const ITetromino = [
    //     [1, Width+1, Width*2+1, Width*3+1],
    //     [Width+1, Width+2, Width+3, Width+4],
    //     [1, Width+1, Width*2+1, Width*3+1],
    //     [Width+1, Width+2, Width+3, Width+4]
    // ]

    // const Ltetromino = [
    //     [1, Width+1, Width*2+1, 2],
    //     [Width, Width+1, Width+2, Width*2+2],
    //     [1, Width+1, Width*2+1, Width*2],
    //     [Width, Width*2, Width*2+1, Width*2+2]
    // ]

    // const Ttetromino = [
    //     [2, Width+1, Width+2, Width+3],
    //     [1, Width+1, Width*2+1, Width+2],
    //     [Width, Width+1, Width+2, Width*2+1],
    //     [Width, 2, Width+1, Width*2+1]
    // ]

    // const Stetromino = [
    //     [1, 2, Width+1, Width+2],
    //     [1, 2, Width+1, Width+2],
    //     [1, 2, Width+1, Width+2],
    //     [1, 2, Width+1, Width+2]
    // ]

    // const Ztetromino = [
    //     [Width+1, Width+2, Width*2, Width*2+1],
    //     [Width+1, Width*2, Width*2+1, Width*3],
    //     [Width+1, Width+2, Width*2, Width*2+1],
    //     [Width+1, Width*2, Width*2+1, Width*3]
    // ]

    // const theTetromino = [ITetromino, Ltetromino, Ttetromino, Stetromino, Ztetromino]

    let currentPosition = 4
    let currentRotation = 0

    //Randomly select tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length)

    let currentTeromino = theTetrominoes[random][currentRotation]
    
    // function draw for tetromino
    function draw() {
        currentTeromino.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino")
            squares[currentPosition + index].style.backgroundColor = Colors[random]
        })
    }

    // function undraw for tetromino
    function undraw(){
        currentTeromino.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino")
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    //set interval for moving the tetromino
    // timeId = setInterval(moveDown, 1000)

    // function for controling the evet
    function control(e) {
        if(e.keyCode === 37){
            moveLeft()
        } else if(e.keyCode === 38){
            rotate()
        } else if(e.keyCode === 39){
            moveRight()
        } else if(e.keyCode === 40) {
            moveDown()
        }
    }

    //Add a event listener for key press
    document.addEventListener('keyup', control)

    // Moving down the tetromino
    function moveDown() {
        undraw()
        currentPosition += Width
        draw()
        freeze()
    }

    // move the tetromino left unless is at edge or having blockage
    function moveLeft() {
        undraw()
        const isAfterLeftEdge = currentTeromino.some(index => (currentPosition + index) % Width === 0)
        if(!isAfterLeftEdge) currentPosition -= 1

        if(currentTeromino.some(index => squares[currentPosition + index].classList.contains("taken")))
            currentPosition += 1
        
        draw()
    }

    // move the tetromino right unless is at edge or having blockage
    function moveRight() {
        undraw()
        const isAfterRightEdge = currentTeromino.some(index => (currentPosition + index) % Width === Width - 1)
        if(!isAfterRightEdge) currentPosition += 1

        if(currentTeromino.some(index => squares[currentPosition + index].classList.contains("taken")))
            currentPosition -= 1
        
        draw()
    }

    // rotate the tetromino
    function rotate() {
        undraw()
        currentRotation ++
        // if current position is 4 then go back to 0
        if(currentRotation === currentTeromino.length) 
            currentRotation = 0
        currentTeromino = theTetrominoes[random][currentRotation]
        draw()
    }

    // Freeze function to top the tetromino
    function freeze() {
        if(currentTeromino.some(index => squares[currentPosition + index + Width].classList.contains("taken"))){
            currentTeromino.forEach(index => squares[currentPosition + index].classList.add("taken") )
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            currentTeromino = theTetrominoes[random][currentRotation]
            currentPosition = 4;
            draw()
            displayShape()
            addScore()
            gameOver()
        }

    }

    const DisplaySquares = document.querySelectorAll('.mini-grid div')
    const DisplayWidth = 4
    const DisplayIndex = 0

     //the Tetrominos without rotations
    const DisplayTetrominoes = [
        [1, DisplayWidth+1, DisplayWidth*2+1, 2], //lTetromino
        [0, DisplayWidth, DisplayWidth+1, DisplayWidth*2+1], //zTetromino
        [1, DisplayWidth, DisplayWidth+1, DisplayWidth+2], //tTetromino
        [0, 1, DisplayWidth, DisplayWidth+1], //oTetromino
        [1, DisplayWidth+1, DisplayWidth*2+1, DisplayWidth*3+1] //iTetromino
    ]

    //display the next upcomin tetromino
    function displayShape() {
        // remove the tetromino class if any trace in the whole grid
        DisplaySquares.forEach(square => {
            square.classList.remove("tetromino")
            square.style.backgroundColor = ''
        })
        DisplayTetrominoes[nextRandom].forEach(index => {
            DisplaySquares[DisplayIndex + index].classList.add('tetromino')
            DisplaySquares[DisplayIndex + index].style.backgroundColor = Colors[nextRandom]
        })

    }

    StartButton.addEventListener('click', () => {
        if(timeId){
            clearInterval(timeId)
            timeId = null
        } else {
            draw
            timeId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    function addScore() {
        for(let i = 0; i < 199; i+=Width){
            const Row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(Row.every(index => squares[index].classList.contains("taken"))){
                score += 10
                GameScore.innerHTML = score
                Row.forEach(index => {
                    squares[index].classList.remove("taken")
                    squares[index].classList.remove("tetromino")
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, Width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => Grid.appendChild(cell))
            }

        }
    }

    function gameOver(){
        if(currentTeromino.some(index => squares[currentPosition + index].classList.contains("taken"))){
            GameScore.innerHTML = 'The end'
            clearInterval(timeId)
        }
    }
})