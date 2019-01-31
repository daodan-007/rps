import React, { Component } from 'react';
import {Button, Container, Form, Input} from "semantic-ui-react";

export default class CancelGame extends Component {

  render() {
    return (
        <Container className="cancel-game">
            <Form>
                <h2>Cancel Game</h2>
                <Input type="text" name="gameId" placeholder="Game ID" value={this.props.cancelGameId ? this.props.cancelGameId : ""} onChange={this.props.handleCancelGameIdChange} />
                &nbsp;<Button onClick={this.props.handleCancelGame} color='red'>&nbsp;&nbsp;Cancel Game&nbsp;&nbsp;&nbsp; </Button>
            </Form>
            <br/><br/>
            <hr />
        </Container>
    )
  }
}
