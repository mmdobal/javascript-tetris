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

  const pieces = {
    I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    O: [[1, 1], [1, 1]],
    J: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    L: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
  };

  function getMatrix(obj) {
    const objkeys = Object.keys(obj);
    const value = objkeys[Math.floor(Math.random() * objkeys.length)];
    return obj[value];
  }
  console.log(getMatrix(pieces));

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
};
