import React, { Component } from 'react'

import bomb from '../images/bomb.png'
import flag from '../images/flag.png'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status
    }
  }
  renderIcon = (status, value, gameStatus) => {
    if (status === 'hidden' && gameStatus === 'playing') return ' '
    if (status === 'flag') {
      return <img src={flag} alt="flag" width="15" />
    }
    if (value === -1) {
      return <img src={bomb} alt="bomb" width="15" />
    }
    if (value === 0) {
      return ' '
    }
    return value
  }

  handleRightClick = (e) => {
    this.setState({
      status: this.state.status === 'flag' ? 'hidden' : 'flag'
    })
    e.preventDefault()
  }

  render() {
    const { handleCellClick, x, y, value, gameStatus } = this.props

    let { status } = this.state
    
    if (this.props.status === 'revealed') {
      status = this.props.status
    }

    return (
      <div
        className={`cell ${status === 'revealed' ? `cell-revealed` : `` }`}
        onClick={() => {if (status === "hidden") {handleCellClick(x, y)}}}
        onContextMenu={(e) => this.handleRightClick(e)}
      >
        {this.renderIcon(status, value, gameStatus)}
      </div>
    )
  }
}

export default Cell