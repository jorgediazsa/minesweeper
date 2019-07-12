const request = require('../request')

describe('when setting up a new game', () => {
  test.only('expect to response with a 5x5 board', async () => {
    const board = JSON.parse(await request('/board/new'))
    expect(board.length).toEqual(5)
    expect(board[0].length).toEqual(5)
    expect(board[4].length).toEqual(5)
  })
})