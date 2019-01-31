import React from 'react'
import { Container, Divider } from 'semantic-ui-react'

let myStyle = {fontSize:18}
let liStyle = {lineHeight:1.8,fontSize:16}
const Toubu = () => (
    <div>
        <Container textAlign='justified' style={myStyle}>
            <h1>Rock Paper Scissors</h1>
            <Divider />
            <p>
                first log into your <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=zh-CN" style={{color:"red"}}>MetaMask</a> browser extension.
            </p>
            <p>
                Win money from strangers! This blockchain-based rock-paper-scissors game is provably fair and guarantees immediate payouts.
            </p>
            <Divider />
            <h1>Rules</h1>
            <ul style={liStyle}>
                <li>Deposit some Ether into the game's secure contract. You can withdraw it at any time it's not being used as a wager.</li>
                <li>Create a game by setting a wager. If you win, your opponent will pay you that wager. If you lose, you'll pay them.</li>
                <li>You and your opponent each submit a password-encrypted move (rock, paper, or scissors) that no human or computer is capable of reverse-encrypting.</li>
                <li>Make sure you remember your move and password! You will need to re-enter both later.</li>
                <li>Once both players submit their moves, their wagers are locked in the game.</li>
                <li>Both players must then reveal their moves by entering their password and move to prove that it matches their original one.</li>
                <li>You have 24 hours to complete the game.</li>
                <li>If only one player has revealed their move by the game's expiration, they automatically win regardless of their opponent's move.</li>
                <li>If neither player reveals their move, or if both players reveal a tie, both players get their wagers back.</li>
                <li>If you created a game and no one joins it, you can always cancel that game and get your wager back.</li>
            </ul>
            <Divider />
        </Container>
    </div>
)

export default Toubu