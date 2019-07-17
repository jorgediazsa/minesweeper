import React, { Component } from 'react'
import { Notification, KIND } from 'baseui/notification'

class Message extends Component {

  renderMessage = (gameStatus) => {
    switch (gameStatus) {
      case 'lose':
        return <Notification kind={KIND.negative}>You lose!</Notification>
      case 'won':
        return <Notification kind={KIND.positive}>You won!</Notification>
      default:
        return 
    }
  }

  render() {
    const { gameStatus } = this.props
    return (
      <>
        {this.renderMessage(gameStatus)}
      </>
    );
  }
}

export default Message;