window.onload = () => {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');

  // grid https://codereview.stackexchange.com/questions/114702/drawing-a-grid-on-canvas
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

  drawGrid(200, 480, 20);

  const pieces = {
    I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    O: [[1, 1], [1, 1]],
    J: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    L: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
  };

  // recebe um objeto e pega o valor de uma propriedade aleatoria
  function getMatrix(obj) {
    const objkeys = Object.keys(obj);
    const value = objkeys[Math.floor(Math.random() * objkeys.length)];
    return obj[value];
  }
  //   console.log(getMatrix(pieces));

  // desenha uma peça de acordo com a matriz recebida
  function drawMatrix(matrix, offset) {
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

  const player = {
    pos: { x: 3, y: 0 },
    matrix: getMatrix(pieces)
  };

  function draw() {
    drawGrid(200, 480, 20);
    drawMatrix(player.matrix, player.pos);
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

  let dropCounter = 0;
  const dropInterval = 1000;
  let lastTime = 0;
  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      player.pos.y += 1;
      dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
  }

  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
      player.pos.x -= 1;
    } else if (event.keyCode === 39) {
      player.pos.x += 1;
    } else if (event.keyCode === 38) {
      player.matrix = rotate(player.matrix);
    }
  });

  update();
//   draw();
};
