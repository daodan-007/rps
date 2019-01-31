import React, {Component} from 'react'
import {Button, Container, Input, Label, List} from 'semantic-ui-react'

let myStyle = {fontSize:14}

export default class Balance extends Component {
    render() {
        const lowBalanceNumber = 0.0001;
        return (
            <Container>
                <h2>Your Infos</h2>
                <List divided selection style={myStyle}>
                    <List.Item>
                        <Label color='red' horizontal style={myStyle}>
                            Your wallet address:
                        </Label>
                        <label>{this.props.account}</label>
                    </List.Item>
                    <List.Item>
                        <Label color='red' horizontal style={myStyle}>
                            Your wallet balance:
                        </Label>
                        <label>{this.props.accountBalance > lowBalanceNumber ? this.props.accountBalance.toFixed(4) : 0} ETH</label>
                    </List.Item>
                    <List.Item>
                        <Label color='purple' horizontal style={myStyle}>
                            Your in-game balance:
                        </Label>
                        <label>{this.props.gameBalance > lowBalanceNumber ? this.props.gameBalance.toFixed(4) : 0 } ETH</label>
                    </List.Item>
                </List>
                <div>
                    <Input type="text" name="deposit1" placeholder="ETH..." value={this.props.deposit ? this.props.deposit : ""} onChange={this.props.handleDepositChange} />
                    &nbsp;<Button onClick={this.props.handleDeposit} color='red'>&nbsp;&nbsp;deposit&nbsp;&nbsp;&nbsp; </Button>
                    <br/>
                    <Input type="text" name="withdraw1" placeholder="ETH..." value={this.props.withdraw ? this.props.withdraw : ""} onChange={this.props.handleWithdrawChange} />
                    &nbsp;<Button onClick={this.props.handleWithdraw} color='red'>withdraw</Button>
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                </div>
            </Container>
        )
    }
}