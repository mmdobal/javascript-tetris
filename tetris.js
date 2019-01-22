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

  drawGrid(200, 480, 20);

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

  // pega uma chave aleatória do objeto
  function getKey(obj) {
    const objkeys = Object.keys(obj);
    return objkeys[Math.floor(Math.random() * objkeys.length)];
  }

  // desenha uma peça de acordo com a matriz recebida
  function drawPiece(key, offset) {
    const matrix = pieces[key];
    const color = colors[key];
    ctx.scale(20, 20);
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.lineWidth = 0.05;
          ctx.fillStyle = color
          ctx.strokeStyle = 'white';
          ctx.fillRect(x + offset.x,
            y + offset.y,
            1, 1);
          ctx.strokeRect(x + offset.x,
            y + offset.y,
            1, 1);
        }
      });
    });
  }

  let current = { 
    pos: { x: 3, y: 0 }, // para começar no meio
    key: getKey(pieces) // gerando uma chave que vai servir pra pegar valores dos objs pieces e colors
    // matrix: pieces[getKey(pieces)]
  };

  function draw() {
    drawGrid(200, 480, 20);
    drawPiece(current.key, current.pos);
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

  let dropCounter = 0;
  const dropInterval = 1000;
  let lastTime = 0;
  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval && current.pos.y < 22) {
      current.pos.y += 1;
      dropCounter = 0;
    }

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
    } else if (event.keyCode === 40 && current.pos.y < 22) {
      current.pos.y += 1;
    }
  });

  update();
};
