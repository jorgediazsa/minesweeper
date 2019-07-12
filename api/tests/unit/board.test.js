const Board = require('../../board')

describe('when creating a board', () => {
  // test('true = true', () => {
  //   
  //   for (let i = 0; i < board.length; i++) {
  //     let row = ``
  //     for (let j = 0; j < board[i].length; j++) {
  //       row += `${board[i][j].value}\t`
  //     }
  //     console.log(row)
  //   }
  //   expect(true).toEqual(true)
  // })
  describe('with default values', () => {
    const board = new Board().board

    test('expect a 5x5 board', () => {
      expect(board.length).toEqual(5)
      expect(board[0].length).toEqual(5)
      expect(board[4].length).toEqual(5)
    })

    const firtsCell = board[0][0]
    const lastCell = board[4][4]
    test('cell contains hidden state', () => {
      expect(firtsCell.status).toEqual('hidden')
      expect(lastCell.status).toEqual('hidden')
    })

    test('cell contains a bomb(-1), nothing(0) or a number between 1 and 8', () => {
      expect(firtsCell.value).toBeWithinRange(-1, 8)
      expect(lastCell.value).toBeWithinRange(-1, 8)
    })

    test('expect 7 bombs', () => {
      let bombs = 0
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].value === -1) {
            bombs++
          }
        }
      }
      expect(bombs).toBe(7)
    })
  })

  describe('with difficulty: easy', () => {
    describe('and size 10', () => {
      const board = new Board(null, 'easy', 10).board
      test('expect 30 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(30)
      })
    })
    describe('and size 15', () => {
      const board = new Board(null, 'easy', 15).board
      test('expect 67 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(67)
      })
    })
  })

  describe('with difficulty: medium', () => {
    describe('and size 10', () => {
      const board = new Board(null, 'medium', 10).board
      test('expect 50 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(50)
      })
    })
    describe('and size 15', () => {
      const board = new Board(null, 'medium', 15).board
      test('expect 112 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(112)
      })
    })
  })

  describe('with difficulty: hard', () => {
    describe('and size 10', () => {
      const board = new Board(null, 'hard', 10).board
      test('expect 80 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(80)
      })
    })
    describe('and size 15', () => {
      const board = new Board(null, 'hard', 15).board
      test('expect 180 bombs', () => {
        let bombs = 0
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value === -1) {
              bombs++
            }
          }
        }
        expect(bombs).toBe(180)
      })
    })
  })
})

describe('when revealing a cell', () => {
  const board = new Board()
  // console.log(board.reveal(1, 2))
})