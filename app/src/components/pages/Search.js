import React from 'react';
import RestClient from '../services/RestClient';
import Navbar from '../layouts/Navbar';
import Deck from '../forms/Deck';
import {Button} from 'semantic-ui-react'
import {ThreeBounce} from 'better-react-spinkit';
import strings from '../../localization/strings';
class Search extends React.Component {
    state = {
        decks: [],
        isLoading: false
    }
    fetchDecks = request => {
        if (request) {
            this.setState({isLoading: true});
            RestClient
                .get('deck/search', {
                params: {
                    request: request
                }
            })
                .then(response => {
                    this.setState({decks: response.data.body, isLoading: false});
                })
                .catch(err => {
                    if (err) 
                        throw err;
                    this.setState({isLoading: false});
                });
        }
    }
    componentWillMount() {
        const request = this.props.match.params.req;
        this.fetchDecks(request);

    }
    componentWillReceiveProps(nextProps) {
        const request = nextProps.match.params.req;
        this.fetchDecks(request)
    }

    goToDeck = deckId => {
        this
            .context
            .router
            .history
            .push(`/deck/${deckId}`);
    }

    getDecks = () => {
        var decks = Object
            .keys(this.state.decks)
            .map(key => {
                var item = this.state.decks[key];
                return (
                    <div key={key} className="text-center">
                        <Deck cards={item.deck}/>
                        <div className="deckInfos font-supercell">
                            <p>
                                {strings.search.infos.averageCost}: {item.infos.averageCost + ' '}
                                <img className="elixir small-elixir" src="/images/cost.png"/>
                                <br></br>
                                {item.infos.title &&
                                    strings.search.infos.title + ': ' + item.infos.title
                                }
                                <br></br>
                                {strings.search.infos.arena}: {item.infos.arena}
                                <br></br>
                                {strings.search.infos.type}: {strings.FinishDeck.TypeOptions[item.infos.type]}
                                <br></br>
                                <Button
                                    secondary
                                    onClick={() => this.goToDeck(item._id)}
                                    style={{
                                    marginTop: "3px"
                                }}>{strings.search.moreInfos}</Button>
                            </p>
                        </div>
                    </div>
                );
            });
        return decks;
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="search-div">
                    <div className="listofdecks">
                        {this.getDecks()}
                        {this.state.isLoading &&
                            <ThreeBounce color={'#fafafa'} size={50}/>
                        }
                    </div>
                    {this.getDecks().length < 1 &&
                        <div className="search-nodeck">
                            <h1>{strings.search.noDeck}</h1>
                        </div>
                    }
                </div>
            </div>
        )
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Search;