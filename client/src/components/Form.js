import React, { Component } from 'react'
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';


export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      difficulty: 'easy'
    }
  }

  handleChange = (difficulty) => {
    this.setState({
      difficulty
    })
  }

  handleSubmit = () => {
    this.props.handleNewGame(this.state.difficulty)
  }

  render() {
    return (
      <>
        <ButtonGroup>
          <Button onClick={() => this.handleChange('easy')}>Easy</Button>
          <Button onClick={() => this.handleChange('medium')}>Medium</Button>
          <Button onClick={() => this.handleChange('hard')}>Hard</Button>
        </ButtonGroup>
        <Button onClick={() => this.handleSubmit()}>New Game</Button>
      </>
    )
  }
}
