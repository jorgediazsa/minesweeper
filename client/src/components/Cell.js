import React, { Component } from 'react'

import bomb from '../images/bomb.png'

export default class Cell extends Component {
  renderIcon = (status, value, gameStatus) => {
    if (status === 'hidden' && gameStatus) return ' '
    if (value === -1) {
      return <img src={bomb} alt="bomb" width="15" />
    }
    return value
  }

  render() {
    const { handleCellClick, x, y, status, value, gameStatus } = this.props
    return (
      <div className="cell" onClick={() => {if (status === "hidden") {handleCellClick(x, y)}}}>
        {this.renderIcon(status, value, gameStatus)}
      </div>
    )
  }
}
