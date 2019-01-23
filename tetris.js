window.onload = () => {
  const canvas = document.getElementById('my-canvas');
  const context = canvas.getContext('2d');
  
  context.scale(20, 20);

  let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  function createPiece(type)
  {
      if (type === 'I') {
          return [
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
          ];
      } else if (type === 'L') {
          return [
              [0, 2, 0],
              [0, 2, 0],
              [0, 2, 2],
          ];
      } else if (type === 'J') {
          return [
              [0, 3, 0],
              [0, 3, 0],
              [3, 3, 0],
          ];
      } else if (type === 'O') {
          return [
              [4, 4],
              [4, 4],
          ];
      } else if (type === 'Z') {
          return [
              [5, 5, 0],
              [0, 5, 5],
              [0, 0, 0],
          ];
      } else if (type === 'S') {
          return [
              [0, 6, 6],
              [6, 6, 0],
              [0, 0, 0],
          ];
      } else if (type === 'T') {
          return [
              [0, 7, 0],
              [7, 7, 7],
              [0, 0, 0],
          ];
      }
  }
  
  function collide(board, current) {
      for (let y = 0; y < current.matrix.length; y += 1) {
          for (let x = 0; x < current.matrix[y].length; x += 1) {
              if (current.matrix[y][x] !== 0 &&
                 (board[y + current.pos.y] &&
                  board[y + current.pos.y][x + current.pos.x]) !== 0) {
                  return true;
              }
          }
      }
      return false;
  }

  
  function drawMatrix(matrix, offset) {
      matrix.forEach((row, y) => {
          row.forEach((value, x) => {
              if (value !== 0) {
                  context.lineWidth = 0.08;
                  context.strokeStyle = '#C7FFEE';
                  context.fillStyle = colors[value];
                  context.fillRect(x + offset.x,
                                   y + offset.y,
                                   1, 1);
                  context.strokeRect(x + offset.x,
                  y + offset.y,
                  1, 1);
              }
          });
      });
  }
  
  function draw() {
      context.fillStyle = '#139096';
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      drawMatrix(board, {x: 0, y: 0});
      drawMatrix(current.matrix, current.pos);
  }
  
  function merge(board, current) {
      current.matrix.forEach((row, y) => {
          row.forEach((value, x) => {
              if (value !== 0) {
                board[y + current.pos.y][x + current.pos.x] = value;
              }
          });
      });
  }

//   function checkRows(){
//     board.forEach(function(element) {
//       if (element.indexOf('0') === -1) {
//         board.splice(board.indexOf(element), 1);
//         board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
//       };
//     });
//   };

function checkBoard() {
    // let rowCount = 1;
    check: for (let y = board.length -1; y > 0; y -= 1) {
        for (let x = 0; x < board[y].length; x += 1) {
            if (board[y][x] === 0) {
                continue check;
            }
        }

        // const row = board.splice(y, 1)[0].fill(0);
        // board.unshift(row);
        board.splice(y, 1);
        board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // y += 1;
        current.score += 10;
        document.getElementById("points").innerHTML = current.score;
        // player.score += rowCount * 10;
        // rowCount *= 2;
    }
}
  
  function rotate(matrix) {
    const origMatrix = matrix.slice();
    for (let i = 0; i < matrix.length; i += 1) {
      const row = matrix[i].map((x, j) => {
        const k = (matrix.length - 1) - j;
        return origMatrix[k][i];
      });
      matrix[i] = row;
    }

    return matrix;
  }
  
  function reset() {
      const pieces = 'TJLOSZI';
      current.matrix = createPiece(pieces[Math.floor(Math.random() * Math.floor(pieces.length))]); //pieces[getKey(pieces)]; //
      current.pos.y = 0;
      current.pos.x = 3;
      // console.log(Math.floor(Math.random() * Math.floor(pieces.length)));
  }
  
  let dropCounter = 0;
  let dropInterval = 1000;
  
  let lastTime = 0;
  function update(time = 0) {
      const deltaTime = time - lastTime;
  
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        current.pos.y += 1;
        if (collide(board, current)) {
            current.pos.y -= 1;
            merge(board, current);
            reset();
            checkBoard();
        }
        dropCounter = 0;
      }
  
      lastTime = time;
      draw();
      requestAnimationFrame(update);
  }
  
  document.addEventListener('keydown', event => {
      if (event.keyCode === 37) {
        current.pos.x -= 1;
        if (collide(board, current)){
          current.pos.x += 1;}
      } else if (event.keyCode === 39) {
        current.pos.x += 1;
        if (collide(board, current)) {
          current.pos.x -= 1;}
      } else if (event.keyCode === 40) {
        current.pos.y += 1;
        if (collide(board, current)) {
          current.pos.y -= 1;}
      } else if (event.keyCode === 38) {
        if (!collide(board, current)) {
          rotate(current.matrix);}
      }
  });
  
  const colors = [
      null,
      '#00122A',
      '#0A4958',
      '#000409',
      '#004C5C',
      '#37AEA8',
      '#96E5CD',
      '#003245',
  ];

  // const pieces = {
  //   I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  //   O: [[1, 1], [1, 1]],
  //   J: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  //   L: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  //   Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  //   S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  //   T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
  // };
  
  const current = {
      pos: {x: 0, y: 0},
      matrix: null,
      score: 0
  };

  reset();
  update();

  // https://data.whicdn.com/images/292942903/original.gif
};
