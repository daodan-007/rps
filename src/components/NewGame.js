import React, { Component } from 'react';
import { Form, Button, Input, Container} from 'semantic-ui-react'

let myStyle = {fontSize:16}

export default class NewGame extends Component {
    render() {
        return (
            <Container>
                <Form>
                    <h2>Create New Game</h2>
                    <p style={myStyle}>Minimum wager: {this.props.minimumWager} ETH</p>
                    <select onChange={this.props.handleNewGameMoveChange}>
                        <option value="Rock">Rock</option>
                        <option value="Paper">Paper</option>
                        <option value="Scissors">Scissors</option>
                    </select>
                    <Input type="password" name="password" placeholder="Password" value={this.props.newGamePassword ? this.props.newGamePassword : ""} onChange={this.props.handleNewGamePasswordChange}  />
                    &nbsp;<Input type="text" name="wager" placeholder="Wager (in ETH)" value={this.props.wager ? this.props.wager : ""} onChange={this.props.handleWagerChange} />
                    &nbsp;<Button onClick={this.props.handleNewGame} color='red'>&nbsp;&nbsp;Create Game&nbsp;&nbsp;&nbsp; </Button>
                </Form>
            </Container>
        )
    }
}