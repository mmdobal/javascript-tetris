// /**
//  * @param {number[][]} matrix
//  * @return {void} Do not return anything, modify matrix in-place instead.
//  */

// var matrix = [['a', 'b'], ['c', 'd']];

// let rotate = function(matrix) {
// // reverse the rows
//     matrix = matrix.reverse();

//     // swap the symmetric elements
//     for (var i = 0; i < matrix.length; i++) {
//     for (var j = 0; j < i; j++) {
//         var temp = matrix[i][j];
//         matrix[i][j] = matrix[j][i];
//         matrix[j][i] = temp;
//     }
//     }
// };

// // let test = [[0, 0, 0], [0, 1, 0], [1, 1, 1]];
// // let newmatrix = rotate(test);
// console.log(rotate(matrix));

// função de rotação que funciona (https://codereview.stackexchange.com/questions/186805/rotate-an-n-%C3%97-n-matrix-90-degrees-clockwise);
const testmatrix = [['a', 'b'], ['c', 'd']];
const rotate = function (matrix) {
// Copy the original matrix
  const origMatrix = matrix.slice();
  for (var i = 0; i < matrix.length; i++) {
    // Map each row entry to its rotated value
    const row = matrix[i].map((x, j) => {
      let k = (matrix.length - 1) - j;
      return origMatrix[k][i];
    });
    matrix[i] = row;
  }
  return matrix;
};

// peça O
const drawO = function (x, y) {
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = '#FF0000';
  ctx.strokeRect(x, y, 20, 20);
  ctx.strokeRect(x + 20, y, 20, 20);
  ctx.strokeRect(x + 20, y + 20, 20, 20);
  ctx.strokeRect(x, y + 20, 20, 20);
};


window.onload = () => {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');

  // grid https://codereview.stackexchange.com/questions/114702/drawing-a-grid-on-canvas
  function drawGrid(ctx, w, h, step) {
    canvas.width = w;
    canvas.height = h;
    ctx.beginPath();
    for (let x = 0; x <= w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.strokeStyle = 'rgb(187, 181, 181';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.beginPath();
    for (let y = 0; y <= h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.strokeStyle = 'rgb(187, 181, 181';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  drawGrid(ctx, 200, 480, 20);

  function drawO(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, 20, 20);
    ctx.fillRect(x + 20, y, 20, 20);
    ctx.fillRect(x + 20, y + 20, 20, 20);
    ctx.fillRect(x, y + 20, 20, 20);
  }

  function fall() {
    let y = 0;
    let x = 0;
    const fallInterval = setInterval(() => {
      y += 20;
      x += 1;
      drawGrid(ctx, 200, 480, 20);
      drawO(x, y);
    }, 1000);
  }

  //   function moveLeft(x) {
  //       x -= 20;
  //       fall(x);
  //   }


  //   function moveRight() {
  //     x += 20;
  //     fall(x);
  //   }

  //   function move(direction) {
  //     switch (direction) {
  //       case 'left':
  //         moveLeft();
  //         break;
  //       case 'right':
  //         moveRight();
  //         break;
  //     }
  //   }

  //   document.onkeydown = function (e) {
  //     switch (e.keyCode) {
  //       case 37:
  //         move('left');
  //         break;
  //       case 39:
  //         move('right');
  //         break;
  //     }
  //   };

  // };

  drawGrid(ctx, 200, 480, 20);
  //   drawO(0, 0);
  fall();
};

// A PARTIR DAQUI É QUE REALMENTE IMPORTA
//  ......................

const pieces = {
  I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  O: [[1, 1], [1, 1]],
  J: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  L: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
};
//  função para pegar uma propriedade aleatoria de um objeto
function randomPiece(obj) {
  const objkeys = Object.keys(obj);
  return objkeys[Math.floor(Math.random() * objkeys.length)];
}
//  testando se consigo imprimir uma matriz aleatoria dentre as peças
console.log(pieces[randomPiece(pieces)]);
// .............................

// adaptação das coisas acima p uma função só que já retorna uma das matrizes direto
function getMatrix(obj) {
  const objkeys = Object.keys(obj);
  const value = objkeys[Math.floor(Math.random() * objkeys.length)];
  return obj[value];
}
console.log(getMatrix(pieces));
// ..............

// desenha uma peça
function drawMatrix(matrixObj, offset) {
  const matrix = getMatrix(matrixObj); // vai ter que sair daqui
  ctx.scale(20, 20);
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + offset.x,
          y + offset.y,
          1, 1);
      }
    });
  });
}
drawMatrix(pieces, { x: 1, y: 1 });

drawMatrix(rotate(getMatrix(pieces)), { x: 5, y: 5 });
console.log(rotate(getMatrix(pieces)));


[0, 1, 0, 0], 
[0, 1, 0, 0], 
[0, 1, 0, 0], 
[0, 1, 0, 0]]

[0, 1, 0], 
[1, 1, 1], 
[0, 0, 0]

[1, 1, 0], 
[0, 1, 1], 
[0, 0, 0]


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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
// https://codereview.stackexchange.com/questions/114702/drawing-a-grid-on-canvas
// https://stackoverflow.com/questions/21316084/requestanimationframe-what-exactly-is-the-timestamp
// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript

function merge(boardArg, currentArg) {
  const matrix = pieces[currentArg.key];
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        boardArg[y + currentArg.pos.y][x + currentArg.pos.x] = value;
      }
    });
  });
}


function collide(boardArg, currentArg) {
  const m = pieces[currentArg.key];
  const o = currentArg.pos;
  for (let y = 0; y < m.length; y += 1) {
    for (let x = 0; x < m[y].length; x += 1) {
      if (m[y][x] !== 0
             && (boardArg[y + o.y]
              && boardArg[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}


// codigo

window.onload = () => {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');

  function drawGrid(w, h, step) {
    canvas.width = w;
    canvas.height = h;
    ctx.beginPath();
    for (let x = 0; x <= w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.strokeStyle = 'rgb(187, 181, 181';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.beginPath();
    for (let y = 0; y <= h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.strokeStyle = 'rgb(187, 181, 181';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const pieces = {
    I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    O: [[1, 1], [1, 1]],
    J: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    L: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
  };

  const colors = {
    I: 'red',
    O: 'green',
    J: 'blue',
    L: 'yellow',
    Z: 'orange',
    S: 'pink',
    T: 'purple'
  };

  let current = { 
    pos: { x: 3, y: 0 }, // para começar no meio
    key: getKey(pieces) // gerando uma chave que vai servir pra pegar valores dos objs pieces e colors
    // matrix: pieces[getKey(pieces)]
  };

  // pega uma chave aleatória do objeto
  function getKey(obj) {
    const objkeys = Object.keys(obj);
    return objkeys[Math.floor(Math.random() * objkeys.length)];
  }

  function newPiece() {
    current.key= getKey(pieces);
    current.pos.y = 0;
    current.pos.x = 3;
}

  function drawMatrix(matrix, offsetx, offsety) {
    ctx.scale(20, 20);
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.lineWidth = 0.01;
          ctx.fillStyle = 'black';
          ctx.strokeStyle = 'white';
          ctx.fillRect(x + offsetx,
            y + offsety,
            1, 1);
          ctx.strokeRect(x + offsetx,
            y + offsety,
            1, 1);
        }
      });
    });
  }

  // desenha a peça atual e o grid
  function draw() {
    // ctx.fillStyle = '#000';
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawMatrix(board, 0, 0);
    drawGrid(200, 480, 20);
    // drawMatrix(board, 0, 0);
    drawMatrix(pieces[current.key], current.pos.x, current.pos.y);
    drawMatrix(board, 0, 0);
    // drawPiece(current.key, current.pos);
  }

  function rotate(key) {
    const matrix = pieces[key];
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

  function merge(boardArg, currentArg) {
    const matrix = pieces[currentArg.key];
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          boardArg[y + currentArg.pos.y][x + currentArg.pos.x] = value;
        }
      });
    });
  }
  
  
  function collide(boardArg, currentArg) {
    const m = pieces[currentArg.key];
    const o = currentArg.pos;
    for (let y = 0; y < m.length; y += 1) {
      for (let x = 0; x < m[y].length; x += 1) {
        if (m[y][x] !== 0
               && (boardArg[y + o.y]
                && boardArg[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  let dropCounter = 0;
  const dropInterval = 1000;
  let lastTime = 0;
  function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        current.pos.y += 1;
        if (collide(board, current)) {
            current.pos.y -= 1;
            merge(board, current);
            newPiece();
        }
      dropCounter = 0;
      // drawMatrix(board, { x: 0, y: 0 });
      // console.log(board);
    }
    lastTime = time;

    draw();
    requestAnimationFrame(update);
  }


  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
      current.pos.x -= 1;
    } else if (event.keyCode === 38) {
      current.matrix = rotate(current.key);
    } else if (event.keyCode === 39) {
      current.pos.x += 1;
    } else if (event.keyCode === 40) {
      current.pos.y += 1;
    }
  });

  update();
};

array.forEach(function(item) {
  if (item === [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]){
    array = array.splice(array.indexOf(item), 1).unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  return array;
})


function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = board.length -1; y > 0; --y) {
      for (let x = 0; x < board[y].length; ++x) {
          if (board[y][x] === 0) {
              continue outer;
          }
      }

      const row = board.splice(y, 1)[0].fill(0);
      board.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
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