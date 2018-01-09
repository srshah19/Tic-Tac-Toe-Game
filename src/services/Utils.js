export const flattenArray = (arr) => {
  return arr.reduce(function (a, b) {
    return a.concat(b);
  })
};

export const createNewBoard = (size) => {
  let i, j, row;
  let matrix = [];
  for (i = 0; i < size; i++) {
    row = []; //This is each row of the matrix in board
    for (j = 0; j < size; j++) {
      row.push(null);
    }
    matrix.push(row);
  }
  return matrix;
};