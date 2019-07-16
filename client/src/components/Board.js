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

  renderBoard = (board) => {
    return (
      <table>
        {board.map((rows, x) => {
          return (
            <tr>
              {rows.map((cell, y) => 
                <td>
                  <Cell
                    key={`${x}${y}`}
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
        })}
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