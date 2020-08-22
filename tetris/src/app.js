const GRID_WIDTH = 10;

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  let timerId;
  let score = 0;

  //the tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ]

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]

  const theTetronimoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ]

  let currentPosition = 4;
  let currentRotation = 0;

  // randomly selected tetromino with random rotation
  let randomTetromino = Math.floor(Math.random()*theTetronimoes.length);
  let current = theTetronimoes[randomTetromino][currentRotation];

  // draw
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  draw();

  // undraw
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;
  let nextRandomTetromino = 0;

  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
    [0, 1, displayWidth, displayWidth+1], // oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
  ]

  function displayTheNextTetromino() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino');
    });
    upNextTetrominoes[nextRandomTetromino].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }

  function addScore() {
    for(let i = 0; i < 199; i += GRID_WIDTH) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
      if(row.every(index => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
        });

        const squaresRemoved = squares.splice(i, GRID_WIDTH);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }

  function freeze() {
   if(current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    // randomly selected tetromino with random rotation
    randomTetromino = nextRandomTetromino;
    nextRandomTetromino = Math.floor(Math.random()*theTetronimoes.length);
    current = theTetronimoes[randomTetromino][currentRotation];
    currentPosition = 4;
    draw();
    displayTheNextTetromino();
    addScore();
    gameOver();
   }
  }

  function moveDown() {
    undraw();
    currentPosition += GRID_WIDTH;
    draw();
    freeze();
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === 0);

    if(!isAtLeftEdge) currentPosition -= 1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH-1);

    if(!isAtRightEdge) currentPosition += 1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if(currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetronimoes[randomTetromino][currentRotation];
    draw();
  }

  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'END';
      clearInterval(timerId);
    }
  }

  startBtn.addEventListener('click', () => {
    if(timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandomTetromino = Math.floor(Math.random()*theTetronimoes.length);
      displayTheNextTetromino();
    }
  });

  function control(e) {
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

});
