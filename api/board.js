const Cell = require('./cell')

class Board {
  constructor(board = null, difficulty = 'easy', size = 8) {
    if (board) {
      this.board = board
    } else {
      this.difficulty = difficulty
      this.size = size

      //initialize board with empty cells
      this.board = Array.from({length: this.size}, (_) => Array.from({length: this.size}, (_) => new Cell()))
      
      this.setMines()
      // console.log(this.board)
    }
  }

  setMines() {
    const cells = this.size * this.size
    let mines = 0
  
    switch(this.difficulty) {
      case 'easy':
        mines = Math.floor(15 * cells / 100)
        break
      case 'medium':
          mines = Math.floor(20 * cells / 100)
        break
      case 'hard':
          mines = Math.floor(40 * cells / 100)
        break
    }
  
    while(mines) {
      let row = Math.floor(Math.random() * this.size)
      let column = Math.floor(Math.random() * this.size)
  
      if (this.board[row][column].value !== -1) {
        this.board[row][column].value = -1
        this.spreadCounters(row, column)
        mines--
      }
    }
  }

  isOutOfBoardOrBomb(row, column) {
    return  row >= this.size ||
            row < 0 ||
            column >= this.size ||
            column < 0 ||
            this.board[row][column].value === -1
          
  }

  spreadCounters(row, column) {
    /**
     *    + * *
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column - 1)) {
      this.board[row - 1][column - 1].value++
    }

    /**
     *    * + *
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column)) {
      this.board[row - 1][column].value++
    }

    /**
     *    * * +
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column + 1)) {
      this.board[row - 1][column + 1].value++
    }

    /**
     *    * * *
     *    + B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row, column - 1)) {
      this.board[row][column - 1].value++
    }

    /**
     *    * * *
     *    * B +
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row, column + 1)) {
      this.board[row][column + 1].value++
    }

    /**
     *    * * *
     *    * B *
     *    + * *
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column - 1)) {
      this.board[row + 1][column - 1].value++
    }

    /**
     *    * * *
     *    * B *
     *    * + *
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column)) {
      this.board[row + 1][column].value++
    }

    /**
     *    * * *
     *    * B *
     *    * * +
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column + 1)) {
      this.board[row + 1][column + 1].value++
    }
  }

  reveal(row, column) {
    const cell = new Cell('revealed', this.board[row][column].value)
    this.board[row][column] = cell
    if (this.board[row][column].value === -1) {
      return false
    }
    return true
  }

}

module.exports = Board