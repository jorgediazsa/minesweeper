const Cell = require('./cell')

class Board {
  constructor(board = null, difficulty = 'easy', size = 8) {
    

    if (board) {
      this.cache = Array.from({length: board.length}, (_) => Array.from({length: board.length}, (_) => 0))
      this.size = board.length
      this.board = board
    } else {
      this.cache = Array.from({length: this.size}, (_) => Array.from({length: this.size}, (_) => 0))
      this.difficulty = difficulty
      this.size = size

      //initialize board with empty cells
      this.board = Array.from({length: this.size}, (_) => Array.from({length: this.size}, (_) => new Cell()))
      
      this.setMines()
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

  broadcastReveal(row, column) {
    //visited
    if (this.cache[row][column] === 1) return
    //number
    if (this.board[row][column].value > 0) {
      this.cache[row][column] = 1
      const cell = new Cell('revealed', this.board[row][column].value)
      this.board[row][column] = cell
      return
    }

    this.cache[row][column] = 1
    const cell = new Cell('revealed', this.board[row][column].value)
    this.board[row][column] = cell

    /**
     *    + * *
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column - 1)) {
      this.broadcastReveal(row - 1, column - 1)
    }

    /**
     *    * + *
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column)) {
      this.broadcastReveal(row - 1, column)
    }

    /**
     *    * * +
     *    * B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row - 1, column + 1)) {
      this.broadcastReveal(row - 1, column + 1)
    }

    /**
     *    * * *
     *    + B *
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row, column - 1)) {
      this.broadcastReveal(row, column - 1)
    }

    /**
     *    * * *
     *    * B +
     *    * * *
     */
    if(!this.isOutOfBoardOrBomb(row, column + 1)) {
      this.broadcastReveal(row, column + 1)
    }

    /**
     *    * * *
     *    * B *
     *    + * *
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column - 1)) {
      this.broadcastReveal(row + 1, column - 1)
    }

    /**
     *    * * *
     *    * B *
     *    * + *
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column)) {
      this.broadcastReveal(row + 1, column)
    }

    /**
     *    * * *
     *    * B *
     *    * * +
     */
    if(!this.isOutOfBoardOrBomb(row + 1, column + 1)) {
      this.broadcastReveal(row + 1, column + 1)
    }
  }

  reveal(row, column) {
    const cell = new Cell('revealed', this.board[row][column].value)
    this.board[row][column] = cell

    if (this.board[row][column].value === -1) {
      return false
    }
    
    if (this.board[row][column].value === 0) {
      this.broadcastReveal(row, column)
      this.cache = Array.from({length: this.size}, (_) => Array.from({length: this.size}, (_) => 0))
    }

    return true
  }

}

module.exports = Board