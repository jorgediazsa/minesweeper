const express = require('express')

const Board = require('../api/board')

const boardRouter = express.Router()

boardRouter
  .post('/new', (req, res) => {
    const difficulty = req.body.difficulty
    let size = 8
    switch (difficulty) {
      case 'medium':
        size = 16
        break
      case 'hard':
        size = 25
        break
    }
    const board = new Board(null, difficulty, size).board
    res.send({
      status: 'playing',
      board
    })
  })
  
boardRouter
  .post('/reveal', (req, res) => {
    const board = new Board(req.body.board)
    const result = board.reveal(req.body.x, req.body.y)
    console.log(board.board)
    const response = {
      board: board.board,
      status: 'playing'
    }
    if (!result) {
      response.status = 'lost'
    }
    res.send(response)
  })

module.exports = boardRouter