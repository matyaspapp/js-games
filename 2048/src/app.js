document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const width = 4;
  let squares = [];
  let score = 0;

  const generate = () => {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if(squares[randomNumber].innerHTML == 0) { // innerHTML contains a string value
      squares[randomNumber].innerHTML = 2;
    } else generate();
  }

  const createBoard = () => {
    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }
  createBoard();

  const moveRight = () => {
    for(let i = 0; i < 16; i++) {
      if(i % 4 === 0) {
        const totalOne = squares[i].innerHTML;
        const totalTwo = squares[i+1].innerHTML;
        const totalThree = squares[i+2].innerHTML;
        const totalFour = squares[i+3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        const filteredRow = row.filter(num => num);
        const missing = 4 - filteredRow.length;
        const zeros = Array(missing).fill(0);
        const newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i+1].innerHTML = newRow[1];
        squares[i+2].innerHTML = newRow[2];
        squares[i+3].innerHTML = newRow[3];
      }
    }
  }

  const moveLeft = () => {
    for(let i = 0; i < 16; i++) {
      if(i % 4 === 0) {
        const totalOne = squares[i].innerHTML;
        const totalTwo = squares[i+1].innerHTML;
        const totalThree = squares[i+2].innerHTML;
        const totalFour = squares[i+3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        const filteredRow = row.filter(num => num);
        const missing = 4 - filteredRow.length;
        const zeros = Array(missing).fill(0);
        const newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i+1].innerHTML = newRow[1];
        squares[i+2].innerHTML = newRow[2];
        squares[i+3].innerHTML = newRow[3];
      }
    }
  }

  const moveDown = () => {
    for(let i = 0; i < 4; i++) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i+width].innerHTML;
      const totalThree = squares[i+(width*2)].innerHTML;
      const totalFour = squares[i+(width*3)].innerHTML;
      const column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      const filteredColumn = column.filter(num => num);
      const missing = 4 - filteredColumn.length;
      const zeros = Array(missing).fill(0);
      const newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i+width].innerHTML = newColumn[1];
      squares[i+(width*2)].innerHTML = newColumn[2];
      squares[i+(width*3)].innerHTML = newColumn[3];
    }
  }

  const moveUp = () => {
    for(let i = 0; i < 4; i++) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i+width].innerHTML;
      const totalThree = squares[i+(width*2)].innerHTML;
      const totalFour = squares[i+(width*3)].innerHTML;
      const column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      const filteredColumn = column.filter(num => num);
      const missing = 4 - filteredColumn.length;
      const zeros = Array(missing).fill(0);
      const newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i+width].innerHTML = newColumn[1];
      squares[i+(width*2)].innerHTML = newColumn[2];
      squares[i+(width*3)].innerHTML = newColumn[3];
    }
  }

  const combineRow = () => {
    for(let i = 0; i < 15; i++) {
      const actualNumber = parseInt(squares[i].innerHTML);
      const nextNumber = parseInt(squares[i+1].innerHTML);
      if(actualNumber === nextNumber) {
        const combinedTotal = actualNumber + nextNumber;
        squares[i].innerHTML = combinedTotal;
        squares[i+1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  const combineColumn = () => {
    for(let i = 0; i < 12; i++) {
      const actualNumber = parseInt(squares[i].innerHTML);
      const nextNumber = parseInt(squares[i+width].innerHTML);
      if(actualNumber === nextNumber) {
        const combinedTotal = actualNumber + nextNumber;
        squares[i].innerHTML = combinedTotal;
        squares[i+width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  const keyRight = () => {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  const keyLeft = () => {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  const keyDown = () => {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  const keyUp = () => {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  const checkForWin = () => {
    if(squares.some(square => square.innerHTML === '2048')) {
      resultDisplay.innerHTML = 'You win!';
      document.removeEventListener('keyup', control);
    }
  }

  const checkForLose = () => {
    if(squares.every(square => square.innerHTML !== '0')) {
      resultDisplay.innerHTML = 'You lose!';
      document.removeEventListener('keyup', control);
    }
  }

  const control = (e) => {
    checkForLose();
    checkForWin();
    if(e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener('keyup', control);

});
