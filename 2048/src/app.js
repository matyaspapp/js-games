document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const width = 4;
  let squares = [];

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



});
