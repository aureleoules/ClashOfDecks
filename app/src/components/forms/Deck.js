import React from 'react';
import ClashCards from '../../json/cards.json';
import strings from '../../localization/strings';
const defaultCards = Object.assign({}, ClashCards);
class Deck extends React.Component {
    getCardFromDeck = (card) => {
        var cardObj;
        Object.keys(defaultCards).map(item => {
            if(defaultCards[item].idName === card) {
               cardObj = defaultCards[item];
               return cardObj;
            }
        });
        return cardObj;
    }

    getCardElixirCost = (card) => {
        var cardObj = this.getCardFromDeck(card);
        return cardObj.elixirCost || 0;
    }
    render() {
        const self = this;
        const cards = this
            .props
            .cards
            .map(function (key) {
                return (
                    <div key={key} className="deck-card scale-up-center">
                        <div className="cost">
                            {self.getCardElixirCost(key)}
                        </div>
                            {self.props.createDeck && 
                            <img
                                onClick={() => self.props.removeCard(key)}
                                className="card draggable-card"
                                src={`/images/cards/${key}.png`}
                                alt={key}/>
                            }
                            {!self.props.createDeck && 
                            <img
                                className="card draggable-card"
                                src={`/images/cards/${key}.png`}
                                alt={key}/>
                            }
                    </div>
                )
            });
        const missing = [];
        for (var i = 0; i < 8 - this.props.cards.length; i++) {
            missing.push(
                <div className="deck-card" key={i}>
                    <div className="card missing-card">
                        <p className="missing-card-text">{strings.create.missingCard}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className={'deck ' + this.props.className}>
                {cards}
                {missing}
            </div>
        )
    }
    // static propTypes = {     cards: React.PropTypes.array.isRequired }
}

export default Deck;
