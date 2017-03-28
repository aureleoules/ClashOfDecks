import React from 'react';
import {Grid, Image} from 'semantic-ui-react'
import strings from '../../localization/strings';
class Deck extends React.Component {

    render() {
        const self = this;
        const cards = this.props.cards.map(function(key) {
            return (
                <div key={key} className="deck-card scale-up-center">
                    <img onClick={() => self.props.removeCard(key)} className="card draggable-card" src={`/images/cards/${key}.png`}/>
                </div>
            )
        });
        const missing = [];
        for (var i = 0; i < 8 - this.props.cards.length; i++) {
            missing.push(
                <div key={i}className="deck-card">
                    <div className="card missing-card">
                        <p className="missing-card-text">{strings.create.missingCard}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="deck">
                {cards}
                {missing}
            </div>

        )
    }

}

export default Deck;
