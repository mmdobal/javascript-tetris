function checkMatrix(matrix){
    for (let i = 0; i <= matrix.length; i += 1) {
      // for (let j = 0; j <= i.length; j += 1) {
        if (matrix[i].indexOf('0') === -1) {
          matrix.splice(i, 1);
          matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          console.log(matrix);
        };
      // }
      // if (array[i] === [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]){
      //   // array.splice(i, 1);
      //   array.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      //   return array;
      // };
      // return array.splice(i, 1);;
    }
  };

  // for (let i = 0; i < arrayLength; i += 1) {
  //   if (array[i] === [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]){
  //     array.splice(i, 1);
  //     array.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  //   }
  //   return array;
  // }
  //
  ///
  //
  ///
  //

  function checkRows(matrix){
    matrix.forEach(function(element) {
      const test = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      if (element.length === test.length && element.sort().every(function(value, index) { return value === test.sort()[index]})) {
        matrix.splice(matrix.indexOf(element), 1);
        matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        console.log(matrix);
      }
    })
  };

  let testMatrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  // newMatrix(testMatrix);

  // function checkBoard(){

  

  function checkRows(matrix){
    matrix.forEach(function(element) {
      // const test = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      if (matrix.indexOf('0') === -1) {
        matrix.splice(matrix.indexOf(element), 1);
        matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        console.log(matrix);
      }
    })
  };

  checkMatrix(testMatrix);
