/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n });

  var row = 0;
  var col = 0;

  while (row < n) {
    solution.togglePiece(row, col);
    row++;
    col++;
  }
  // as n grows place another piece diagonally in the next row and column
  //increment row and column by one
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n });
  var solutionCount = 0;
  var row = 0;

  var innerFunc = function (row, n) {

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, j);
      } else {
        innerFunc(row + 1, n);
        board.togglePiece(row, j);
      }
    }
  };
  innerFunc(0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


  var board = new Board({n: n });

  if (n === 2 || n === 3) {
    return board.rows();
  }

  var solutionCount = false;
  var fixedBoard;
  // debugger;

  var innerFunc = function (row, n) {

    if (row === n) {
      solutionCount = true;
      fixedBoard = JSON.parse(JSON.stringify(board.rows()));
      return;
    }

    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);

      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, j);
      } else {
        innerFunc(row + 1, n);
        board.togglePiece(row, j);
      }
    }
  };
  innerFunc(0, n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(fixedBoard));
  if (solutionCount) {
    return fixedBoard;
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n });
  var solutionCount = 0;
  var row = 0;

  var innerFunc = function (row, n) {

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);

      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, j);
      } else {
        innerFunc(row + 1, n);
        board.togglePiece(row, j);
      }
    }
  };
  innerFunc(0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
