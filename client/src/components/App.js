import React, { Component } from 'react'
import { HeaderNavigation } from "baseui/header-navigation"
import { Block } from "baseui/block"
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import axios from 'axios'

import Form from './Form'
import Board from './Board'
import { getData, setData } from '../utils/common'

const engine = new Styletron();

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playing: getData('playing'),
      board: getData('board')
    }
  }

  handleNewGame = (difficulty) => {
    const payload = {
      difficulty
    }
    axios.post(`/board/new/`, payload)
      .then(response => {

        setData('playing', true)
        setData('board', response.data.board)

        this.setState({
          playing: true,
          board: response.data.board
        })
        console.log(response.data.board)
      })
      .catch(error => {
        console.error(error)
      });
  }

  handleCellClick = (x, y) => {
    const payload = {
      board: this.state.board,
      x,
      y
    }
    axios.post(`/board/reveal`, payload)
      .then(response => {

        
        setData('playing', response.data.status === 'playing')
        setData('board', response.data.board)

        this.setState({
          playing: response.data.status === 'playing',
          board: response.data.board
        })
        console.log(response.data.board)
      })
      .catch(error => {
        console.error(error)
      });
  }

  render() {

    const { board, playing } = this.state

    return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <HeaderNavigation>
            <Form handleNewGame={this.handleNewGame} />
          </HeaderNavigation>
          <Block
            display="block"
            gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            justifyItems="center"
            gridGap="scale1000"
            margin="scale1000"
          >
            <Board
              board={board}
              handleCellClick={this.handleCellClick}
              playing={playing}
            />
          </Block>
        </BaseProvider>
      </StyletronProvider>
    )
  }
}

