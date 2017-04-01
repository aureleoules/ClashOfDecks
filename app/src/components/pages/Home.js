import React from 'react';
import strings from '../../localization/strings';
import {Button, Header, Container} from 'semantic-ui-react'
import Navbar from '../layouts/Navbar';
import RestClient from '../services/RestClient';
import {ThreeBounce} from 'better-react-spinkit';
import Deck from '../forms/Deck';
class Home extends React.Component {
    state = {
        loading: false,
        showHome: true,
        deck: []
    }

    getDeck = () => {
        return this.state.deck || [];
    }

    start = () => {
        this.setState({loading: true, showHome: false});
        RestClient
            .get('deck/random')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    this.setState({loading: false, deck: response.data.body.deck});
                }
            })
            .catch(err => {
                if (err) 
                    throw err;
                }
            );
    }
    render() {
        return (
            <div>
                <Navbar current='home'/>
                {!this.state.loading && !this.state.showHome && 
                    <div className="home-div-deck">
                        <Deck cards={this.getDeck()}/>
                    </div>
                    }
                <div className="home tracking-in-expand">
                    {this.state.showHome &&
                    <Container text className="home-div-header">
                        <Header className="inverted homeHeader" as='h1'>{strings.app.name}</Header>
                        <h2 className="inverted homeSubtitle">{strings.app.desc}</h2>
                        <Button inverted onClick={() => this.start()}>{strings.home.startBtn}</Button>
                    </Container>
                    }
                    {this.state.loading &&
                        <ThreeBounce className="homeSpinner" color={'#fafafa'} size={50}/>
                    }
                    
                </div>
            </div>

        )
    }
}

export default Home;
