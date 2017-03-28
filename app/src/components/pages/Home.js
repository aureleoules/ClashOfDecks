import React from 'react';
import strings from '../../localization/strings';
import {Button, Header, Container} from 'semantic-ui-react'
import Deck from '../forms/Deck';
import Navbar from '../layouts/Navbar';
import {ThreeBounce} from 'better-react-spinkit';
class Home extends React.Component {
    state = {
        started: false
    }
    start = () => {
        this.setState({started: true});
    }
    render() {
        const cards = [
            'giant',
            'archers',
            'skeletons',
            'lightning',
            'poison',
            'arrows',
            'rocket'
        ];
        return (
            <div>
                <Navbar current='home'/>
                <div className="home tracking-in-expand">
                    {/* <Deck cards={cards}/> */}
                    {!this.state.started &&
                        <Container text className="home-div-header">
                            <Header className="inverted homeHeader" as='h1'>{strings.app.name}</Header>
                            <h2 className="inverted homeSubtitle">{strings.app.desc}</h2>
                            <Button inverted onClick={() => this.start()}>{strings.home.startBtn}</Button>
                        </Container>
                    }
                    {this.state.started &&
                        <ThreeBounce className="homeSpinner" color={'#fafafa'} size={50}/>
                    }
                </div>
            </div>

        )
    }
}

export default Home;
