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
