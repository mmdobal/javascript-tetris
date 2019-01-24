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
  
    function newPiece(type) {
      switch(type){
        case 'I':
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];
        break;
      case 'L':
        return [
          [0, 2, 0],
          [0, 2, 0],
          [0, 2, 2],
        ];
        break;
      case 'J':
        return [
          [0, 3, 0],
          [0, 3, 0],
          [3, 3, 0],
        ];
        break;
      case 'O':
        return [
          [4, 4],
          [4, 4],
        ];
        break;
      case 'Z':
        return [
          [5, 5, 0],
          [0, 5, 5],
          [0, 0, 0],
        ];
        break;
      case 'S':
        return [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0],
        ];
        break;
      case 'T':
        return [
          [0, 7, 0],
          [7, 7, 7],
          [0, 0, 0],
        ];
      }
    }
  
    function collide(board, current) {
      for (let y = 0; y < current.piece.length; y += 1) {
        for (let x = 0; x < current.piece[y].length; x += 1) {
          if (current.piece[y][x] !== 0 && (board[y + current.pos.y] && board[y + current.pos.y][x + current.pos.x]) !== 0) {
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
  
      drawMatrix(board, {
        x: 0,
        y: 0
      });
      drawMatrix(current.piece, current.pos);
    }
  
    function merge(board, current) {
      current.piece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            board[y + current.pos.y][x + current.pos.x] = value;
          }
        });
      });
    }
  
    function checkBoard() {
      check: for (let y = board.length - 1; y > 0; y -= 1) {
        for (let x = 0; x < board[y].length; x += 1) {
          if (board[y][x] === 0) {
            continue check;
          }
        }
        board.splice(y, 1);
        board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        current.score += 10;
        document.getElementById("points").innerHTML = current.score;
      }
    }
  
  
    function checkFill() {
      for (let i = 0; i < board[0].length; i += 1) {
        if (board[0][i] !== 0) {
          alert("GAME OVER");
        }
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
      current.piece = newPiece(pieces[Math.floor(Math.random() * Math.floor(pieces.length))]); //pieces[getKey(pieces)]; //
      current.pos.y = 0;
      current.pos.x = 3;
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
          checkFill();
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
        if (collide(board, current)) {
          current.pos.x += 1;
        }
      } else if (event.keyCode === 39) {
        current.pos.x += 1;
        if (collide(board, current)) {
          current.pos.x -= 1;
        }
      } else if (event.keyCode === 40) {
        current.pos.y += 1;
        if (collide(board, current)) {
          current.pos.y -= 1;
        }
      } else if (event.keyCode === 38) {
        if (!collide(board, current)) {
          rotate(current.piece);
        }
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
  
    let current = {
      pos: {
        x: 0,
        y: 0
      },
      piece: null,
      score: 0
    };
  
    reset();
    update();
  
    // https://data.whicdn.com/images/292942903/original.gif
  };