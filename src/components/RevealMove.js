import React, { Component } from 'react';
import {Button, Container, Form, Input} from "semantic-ui-react";

export default class RevealMove extends Component {

  render() {
    return (
        <Container className="reveal-move">
            <Form>
                <h2>Reveal Move</h2>
                <select onChange={this.props.handleRevealMoveChange}>
                    <option value="Rock">Rock</option>
                    <option value="Paper">Paper</option>
                    <option value="Scissors">Scissors</option>
                </select>
                <Input type="password" name="password" placeholder="Password" value={this.props.revealMovePassword ? this.props.revealMovePassword : ""} onChange={this.props.handleRevealMovePasswordChange} />
                &nbsp;<Input type="text" name="gameId" placeholder="Game ID" value={this.props.revealMoveGameId ? this.props.revealMoveGameId : ""} onChange={this.props.handleRevealMoveGameIdChange} />
                &nbsp;<Button onClick={this.props.handleRevealMove} color='red'>&nbsp;&nbsp;Reveal Move&nbsp;&nbsp;&nbsp; </Button>
            </Form>
            <br/><br/><br/>
            <hr/>
        </Container>
    )
  }
}
