import React, { Component } from 'react';

import Cell from './Cell'
import '../styles/Cell.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board
    }
  }

  renderCell = (rows, x) => {
    return (
      <tr key={`tr-${x}`}>
        {rows.map((cell, y) => 
          <td key={`td-${x}${y}`}>
            <Cell
              key={`cell-${x}${y}`}
              x={x}
              y={y}
              status={cell.status}
              value={cell.value}
              handleCellClick={this.props.handleCellClick}
              playing={this.props.playing}
            />
          </td>
        )}
      </tr>
    ) 
  }

  renderBoard = (board) => {
    return (
      <table>
        <tbody>
          {board.map((rows, x) => this.renderCell(rows, x))}
        </tbody>
      </table>
    )
  }
  
  render() {
    
    const { board } = this.props

    return (
      <>
        {board && this.renderBoard(board)}
        {!board && (
          <h4>Select difficulty</h4>
        )}
      </>
    );
  }
}

export default Board;