import React from 'react';
import {Container, Header, Button} from 'semantic-ui-react'
import Navbar from '../layouts/Navbar';
import Deck from '../forms/Deck';
import ClashCards from '../../json/cards.json';
import strings from '../../localization/strings';
import RestClient from '../services/RestClient';
const defaultCards = Object.assign({}, ClashCards);
class Create extends React.Component {
    state = {
        deck: [],
        cards: ClashCards
    }

    componentWillMount() {}

    addCardToDeck = (cardId) => {
        var name = this.state.cards[cardId].idName;
        if (this.state.deck.indexOf(name) < 0 && this.state.deck.length < 8) {

            var deck = this.state.deck;
            var cards = this.state.cards;

            deck.push(name);
            cards.splice(cardId, 1);
            this.setState({deck: deck, cards: cards});
        }
    }
    removeCardOfDeck = (cardId) => {
        const index = this.state.deck.indexOf(cardId);
        const deck = this.state.deck;
        const cards = this.state.cards;
        if (index > -1) {
            deck.splice(index, 1);
            this.setState({deck});
        }
        var cardObj;
        Object.keys(defaultCards).map(item => {
            if (defaultCards[item].idName === cardId) {
                cardObj = defaultCards[item];
                return;
            }
        });
        cards.unshift(cardObj);
        this.setState({deck: deck, cards: cards});
    }
    getDeckAverageCost = () => {
        let deckObjs = [];
        var averageInt = 0;
        for (var i = 0; i < this.state.deck.length; i++) {
            Object.keys(defaultCards).map(item => {
                if (defaultCards[item].idName === this.state.deck[i]) {
                    deckObjs.push(defaultCards[item]);
                    return;
                }
            });
        }
        for (var i = 0; i < deckObjs.length; i++) {
            averageInt += deckObjs[i].elixirCost;
        }
        averageInt = averageInt / this.state.deck.length;
        if (averageInt) {

            if (averageInt % 1 === 0) {
                return averageInt;
            } else {
                return averageInt.toFixed(1);
            }
        } else {
            return "0";
        }
    }
    getDeck = () => {
        return this.state.deck;
    }

    getAllCards = () => {
        return this.state.cards;
    }
    isDeckComplete = () => {
        return (this.state.deck.length === 8);
    }
    submitDeck = () => {
        RestClient.post('deck/create', {
            "deck": this.state.deck
        }).then(response => {
            console.log(response);
        }).then(err => {
            if(err) throw err;
        });
    }
    render() {
        const cardsList = Object.keys(this.state.cards).map((item, key) => {
            return (<img key={key} className="draggable-card" onClick={() => this.addCardToDeck(key)} alt={ClashCards[key].idName} width="60" src={`/images/cards/${ClashCards[key].idName}.png`}/>);
        });
        return (
            <div>
                <Navbar current='create'/>
                <div className="div-create">
                    <div className="ui one column grid container">
                        <Deck removeCard={this.removeCardOfDeck} cards={this.getDeck()}/>
                        <div className="div-cards-selector">
                            <div className="finalize">
                                <h3>Average cost: {this.getDeckAverageCost()}</h3>
                                <Button onClick={() => this.submitDeck()} disabled={!this.isDeckComplete()} className="finalizeBtn" primary>{strings.create.finalizeBtn}</Button>

                            </div>
                            <div className="cards-list">
                                <h2>{strings.create.chooseCards}</h2>
                                {cardsList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    onDrop(data) {
        console.log(data.card)
    }
}

export default Create;
