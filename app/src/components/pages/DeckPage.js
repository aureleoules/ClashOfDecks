import React from 'react';
import Deck from '../forms/Deck';
import Navbar from '../layouts/Navbar';
import RestClient from '../services/RestClient';
import strings from '../../localization/strings';
class DeckPage extends React.Component {
    state = {
        deck: {}
    }
    getDeckProp = prop => {
        if(this.state.deck.infos) return this.state.deck.infos[prop];
    }
    getCards = () => {
        return this.state.deck.deck || [];
    }
    componentWillMount() {
        const deckId = this.props.match.params.deckId;

        RestClient.get('deck/get', {
            params: {
                id: deckId
            }
        }).then(response => {
            console.log(response);
            let deck = response.data;
            this.setState({deck: deck});
            console.log(deck);
        }).catch(err => {
            if(err) throw(err);
        });

    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="ui one column grid container block">
                    <Deck className="deckPage-deck" cards={this.getCards()}/>
                    <div className="text-center">
                        <div className="deckInfos font-supercell deckPage-infos">
                            <p>
                            {strings.search.infos.title}: <span className="text-teal">{this.getDeckProp("title")}</span><br></br>
                            {strings.search.infos.type}: <span className="text-teal">{this.getDeckProp("type")}</span><br></br>
                            {strings.search.infos.arena}: <span className="text-teal">{this.getDeckProp("arena")}</span><br></br>
                            {strings.search.infos.averageCost}: <span className="text-teal">{this.getDeckProp("averageCost")}</span><br></br>
                            {strings.search.infos.description}:<br></br> <span className="text-teal">{this.getDeckProp("description")}</span><br></br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeckPage;