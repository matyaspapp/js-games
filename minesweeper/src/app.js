document.addEventListener('DOMContentLoaded', () =>{
  const grid = document.querySelector('.grid');
  const width = 10;
  const bombAmount = 20
  let squares = [];
  let isGameOver = false;

  const squareClick = (square) => {
    if (isGameOver) return;
    if (square.classList.contains('checked')
        ||square.classList.contains('flag')) return;
    if (square.classList.contains('bomb')) {
      alert('Game over');
    } else {
      const currentId = square.id;
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return
      } else {
        const isLeftEdge = currentId % width === 0;
        const isRightEdge = currentId % width === width-1;

        setTimeout(() => { // TODO: left bottom bug..
          if (currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId)-1].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId > 9 && !isRightEdge) {
            const newId = squares[parseInt(currentId)+1-width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId > 10) {
            const newId = squares[parseInt(currentId)-width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId > 11 && !isLeftEdge) {
            const newId = squares[parseInt(currentId)-1-width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId < 98 && !isRightEdge) {
            const newId = squares[parseInt(currentId)+1].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId)-1+width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId < 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId)+1+width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
          if (currentId < 89) {
            const newId = squares[parseInt(currentId)+width].id;
            const newSquare = document.getElementById(newId);
            square.classList.add('checked');
            squareClick(newSquare);
          }
        }, 10);
      }
    }
  }

  const createBoard = () => {
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      square.addEventListener('click', (e) => {
        squareClick(square);
      });
    }

    for(let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;
      if(squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
        if (i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++;
        if (i > 10 && squares[i-width].classList.contains('bomb')) total++;
        if (i > 11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++;
        if (i < 98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++;
        if (i < 90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++;
        if (i < 88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++;
        if (i < 89 && squares[i+width].classList.contains('bomb')) total++;
        squares[i].setAttribute('data', total);
      }
    }
  }

  createBoard();
});
