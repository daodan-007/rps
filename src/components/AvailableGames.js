import React, { Component } from 'react';
import { Container} from 'semantic-ui-react'

let myStyle = {fontSize:16}

export default class AvailableGames extends Component {
  renderAvailableGames() {
    if (this.props.availableGames.length > 0) {
      return this.props.availableGames.map(game => {
        return (
          <div key={game.gameId}>
            <p style={myStyle}>Game ID: {game.gameId} | Wager: {game.wager} ETH | Creator: {game.creator}</p>
          </div>
        )
      });
    } else {
      return ( <p style={myStyle} >No available games. Try creating one!</p> )
    }
  }

  render() {
    return (
      <Container>
        <br/>
        <h2>Available Games</h2>
        {this.renderAvailableGames()}
      </Container>
    )
  }
}
