window.onload = () => {
  const canvas = document.getElementById('my-canvas');
  const context = canvas.getContext('2d');
  
  context.scale(20, 20);

  const board = [
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
  
  function collide(board, current) {
      const m = current.matrix;
      const o = current.pos;
      for (let y = 0; y < m.length; ++y) {
          for (let x = 0; x < m[y].length; ++x) {
              if (m[y][x] !== 0 &&
                 (board[y + o.y] &&
                  board[y + o.y][x + o.x]) !== 0) {
                  return true;
              }
          }
      }
      return false;
  }
  
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
  
  function drawMatrix(matrix, offset) {
      matrix.forEach((row, y) => {
          row.forEach((value, x) => {
              if (value !== 0) {
                  context.lineWidth = 0.05;
                  context.strokeStyle = 'white';
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
      context.fillStyle = '#e2eda6';
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
      console.log(Math.floor(Math.random() * Math.floor(pieces.length)));
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
          current.pos.y -= 1;
      }
      } else if (event.keyCode === 38) {
        if (!collide(board, current)) {
          rotate(current.matrix);
      }
      }
  });
  
  const colors = [
      null,
      '#FF0D72',
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF',
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
      matrix: null
  };
  
  reset();
  update();
};
