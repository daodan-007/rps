import React, { Component } from 'react';
import {Button, Container, Form, Input} from "semantic-ui-react";

export default class JoinGame extends Component {

  render() {
    return (
      <Container className="join-game">
          <Form>
              <h2>Join Game</h2>
              <select onChange={this.props.handleJoinGameMoveChange}>
                  <option value="Rock">Rock</option>
                  <option value="Paper">Paper</option>
                  <option value="Scissors">Scissors</option>
              </select>
              <Input type="password" name="password" placeholder="Password" value={this.props.joinGamePassword ? this.props.joinGamePassword : ""} onChange={this.props.handleJoinGamePasswordChange} />
              &nbsp;<Input type="text" name="gameId" placeholder="Game ID" value={this.props.joinGameId ? this.props.joinGameId : ""} onChange={this.props.handleJoinGameIdChange}  />
              &nbsp;<Button onClick={this.props.handleJoinGame} color='red'>&nbsp;&nbsp;Join Game&nbsp;&nbsp;&nbsp; </Button>
          </Form>
      </Container>
    )
  }
}


