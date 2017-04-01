import React from 'react';
import Deck from '../forms/Deck';
import Navbar from '../layouts/Navbar';
import RestClient from '../services/RestClient';
class DeckPage extends React.Component {
    state = {
        
    }
    getDeck = () => {
        return this.state.deck || [];
    }
    componentWillMount() {
        const deckId = this.props.match.params.deckId;

        RestClient.get('deck/get', {
            params: {
                id: deckId
            }
        }).then(response => {
            console.log(response);
            let deck = response.data.deck;
            this.setState({deck});
        }).catch(err => {
            if(err) throw(err);
        });

    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="ui one column grid container">
                    <Deck cards={this.getDeck()}/>
                </div>
            </div>
        );
    }
}

export default DeckPage;