import React, { Component } from 'react';
import {Container} from 'semantic-ui-react'

let myStyle = {fontSize:16}

export default class MyGames extends Component {

  renderMyGames() {
    if (this.props.myGames.length > 0) {
      return this.props.myGames.map(game => {
        return (
          <div key={game.gameId}>
            <p style={myStyle}>
              Game ID: {game.gameId}<br/>
              Wager: {game.wager} ETH<br/>
              Status: {this.props.gameStatusReference[game.status]}<br/>
              Creator: {game.creator}<br/>
              Challenger: {game.challenger == "0x0000000000000000000000000000000000000000" ? "" : game.challenger}<br/>
              Winner: {this.displayWinner(game)}<br/>
              <br/>
            </p>
          </div>
        )
      });
    } else {
      return ( <p style={myStyle} >You haven't played any games with this account!</p> )
    }
  }

  displayWinner(game) {
    if (game.winner == "0x0000000000000000000000000000000000000000" && game.status == 5) { return "Tie" } // game.status = Finished
    else if (game.winner == "0x0000000000000000000000000000000000000000") { return "" }
    else { return game.winner }
  }

  render() {
    return (
      <Container className="my-games">
        <br/>
        <h2>My Games</h2>
        {this.renderMyGames()}
      </Container>
    )
  }
}
