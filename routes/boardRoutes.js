const Board = require('../api/board')
module.exports = app => {
  app.get('/board/new', (req, res) => {
    const board = new Board().board
    res.send(board)
  })
}