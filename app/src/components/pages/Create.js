/* eslint-disable */
import React from 'react';
import {Button, Input, Select} from 'semantic-ui-react'
import Navbar from '../layouts/Navbar';
import Deck from '../forms/Deck';
import ClashCards from '../../json/cards.json';
import strings from '../../localization/strings';
import RestClient from '../services/RestClient';
import FinishDeck from '../modals/FinishDeck';
const defaultCards = Object.assign({}, ClashCards);

class Create extends React.Component {
    state = {
        deck: [],
        cards: ClashCards,
        orderMethod: "elixirCost"
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
        const index = this
            .state
            .deck
            .indexOf(cardId);
        const deck = this.state.deck;
        const cards = this.state.cards;
        if (index > -1) {
            deck.splice(index, 1);
            this.setState({deck});
        }
        var cardObj;
        Object
            .keys(defaultCards)
            .map(item => {
                if (defaultCards[item].idName === cardId) {
                    cardObj = defaultCards[item];
                    return cardObj;
                }
            });
        cards.unshift(cardObj);
        this.setState({deck: deck, cards: cards});
    }
    getDeckAverageCost = () => {
        let deckObjs = [];
        var averageInt = 0;
        for (var i = 0; i < this.state.deck.length; i++) {
            Object
                .keys(defaultCards)
                .map(item => {
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
    submitDeck = (infos) => {
        RestClient
            .post('deck/create', {
            "deck": this.state.deck,
            infos: infos
        })
            .then(response => {
                if(response.data.success) {
                    this.context.router.history.push(`/deck/${response.data.body._id}`);
                }
            })
            .then(err => {
                if (err) 
                    throw err;
                }
            );
    }
    modalCallBack = (infos) => {
        this.submitDeck(infos);
    }
    orderBy = method => {
        if(method === "elixir") {

        }
    }

    getCards = () => {
        var filteredCards = this.state.cards.sort((a, b) => {
            var keyA = a[this.state.orderMethod];
            var keyB = b[this.state.orderMethod];
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });
        const cardsList = Object
            .keys(filteredCards)
            .map((item, key) => {
                return (
                    <div key={key} className="card-group">
                        <span className="small-cost">{filteredCards[key].elixirCost}</span>
                        <img
                            className="draggable-card"
                            onClick={() => this.addCardToDeck(key)}
                            alt={filteredCards[key].idName}
                            width="60"
                            src={`/images/cards/${filteredCards[key].idName}.png`}/>
                    </div>
                );
            });
        return cardsList;
    }
    render() {

        const orderOptions = [
            {
                key: 0,
                value: "elixirCost",
                text: strings.create.orderBy.elixirCost
            }, {
                key: 1,
                value: "rarity",
                text: strings.create.orderBy.rarity
            }, {
                key: 2,
                value: "arena",
                text: strings.create.orderBy.arena
            }, {
                key: 3,
                value: "type",
                text: strings.create.orderBy.type
            }, {
                key: 4,
                value: "idName",
                text: strings.create.orderBy.name
            }
        ]
        return (
            <div>
                <Navbar current='create'/>
                <div className="div-create">
                    <div className="ui one column grid container">
                        <Deck createDeck removeCard={this.removeCardOfDeck} cards={this.getDeck()}/>
                        <div className="div-cards-selector">
                            <div className="finalize">
                                <h3>{strings.create.averageCost}: {this.getDeckAverageCost() + ' '}
                                    <img className="elixir" src="/images/cost.png"/>
                                </h3>
                                <FinishDeck
                                    disabled={!this.isDeckComplete()}
                                    text={strings.create.finalizeBtn}
                                    callback={this.modalCallBack}/>

                            </div>
                            <div className="cards-list">
                                <div>
                                    <h2>{strings.create.chooseCards}</h2>
                                    <Select
                                        onChange={(e, {value}) => {this.setState({orderMethod: value})}}
                                        className="select-orderby"
                                        placeholder='Trier par'
                                        options={orderOptions}/>
                                </div>
                                {this.getCards()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Create;
