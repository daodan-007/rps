import React, { Component } from 'react';
import {Button} from "semantic-ui-react";

export default class DisplayButton extends Component {

    render() {
        return (
            <div>
                <Button style={{display:this.props.getBalance}} onClick={this.props.handleGetBalance} color='green'>&nbsp;&nbsp;OwnerGetBalance </Button>
            </div>
        )
    }
}
