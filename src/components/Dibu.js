import React, {Component} from 'react'
import {
    Container,
    Divider,
    Grid,
    Image,
    List,
    Segment
} from 'semantic-ui-react'

let myStyle1 = {fontSize:15}

class Dibu extends Component {
    render() {
        return (
            <Segment inverted style={{ margin: '4em 0em 0em', padding: '0em 0em' }} vertical>
                <Container textAlign='center'>
                    <Image src='/3.jpg' centered/>
                    <Divider inverted section />
                    <Grid columns={4} divided stackable inverted>
                        <Grid.Row>
                            <List link inverted >
                                <label style={myStyle1}>
                                    When we were young, we played a game, hammer, scissors, cloth. In fact, it is the most original and effective way to solve differences. But why don't we use this method when we grow up? Because it has two drawbacks. One is the speed of shooting, the other is the temporary change of hand shape. The advent of Block Chain  has overcome this problem at one stroke.
                                    <br/>
                                    ©2019-2023 Ether Bifurcation terminal. All Rights Reserved
                                </label>
                            </List>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}

export default Dibu