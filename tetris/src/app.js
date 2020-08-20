const GRID_WIDTH = 10;

document.addEventListener('DOMContentLoaded', () => {
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');

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

  function moveDown() {
    undraw();
    currentPosition += GRID_WIDTH;
    draw();
    freeze();
  }

  timerId = setInterval(moveDown, 1000)

  function freeze() {
   if(current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    // randomly selected tetromino with random rotation
    randomTetromino = Math.floor(Math.random()*theTetronimoes.length);
    current = theTetronimoes[randomTetromino][currentRotation];
    currentPosition = 4;
    draw();
   }
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
