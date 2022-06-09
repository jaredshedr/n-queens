// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;

      for (var square of row) {
        if (square === 1) {
          count++;
        }
      }

      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardSize = this.get('n');

      // loop through board size
      for (var i = 0; i < boardSize; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // check if hasRowConflict at (i)
      //return true
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var column = [];
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        column.push(board[i][colIndex]);
      }

      for (var square of column) {
        if (square === 1) {
          count++;
        }
      }

      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardSize = this.get('n');

      for (var i = 0; i < boardSize; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var diagColumn = [];
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        diagColumn.push(board[i][majorDiagonalColumnIndexAtFirstRow]);
        majorDiagonalColumnIndexAtFirstRow++;
      }

      for (var square of diagColumn) {
        if (square === 1) {
          count++;
        }
      }

      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.get('n');

      for (var i = 0; i < boardSize; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      var board = this.rows();
      var oneCounter = 0;
      var count = 0;
      for (var i = 1; i <= board.length - 1; i++) {
        oneCounter += board[i][count];
        count++;
      }
      var secondCount = 0;
      for (var i = 2; i <= board.length - 2; i++) {
        oneCounter += board[i][secondCount];
        secondCount++;
      }


      return oneCounter > 1;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var diagColumn = [];
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        diagColumn.push(board[i][minorDiagonalColumnIndexAtFirstRow]);
        minorDiagonalColumnIndexAtFirstRow--;
      }

      for (var square of diagColumn) {
        if (square === 1) {
          count++;
        }
      }

      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var boardSize = this.get('n');

      for (var i = boardSize; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      var board = this.rows();
      var oneCounter = 0;
      var count = board.length - 1;
      for (var i = 1; i <= board.length - 1; i++) {
        oneCounter += board[i][count];
        count--;
      }
      var secondCount = board.length - 1;
      for (var i = 2; i <= board.length - 1; i++) {
        oneCounter += board[i][secondCount];
        secondCount--;
      }

      return oneCounter > 1;

      // var index = this.get('n');
      // while (index >= 1) {
      //   var innerArrayPos = index - 1;
      //   for (let j = this.get('n') - 2; j <= this.get('n') - 1  )
      // }

      //var index = this.get('n')
      // while index is greater than 0
        //inner variable for inner array length
        // loop through to get the whole diagnal column
      //increase index by one

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
