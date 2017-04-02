import React from 'react';
import Home from './pages/Home';
import Create from './pages/Create';
import DeckPage from './pages/DeckPage';
import Search from './pages/Search';
import {BrowserRouter as Router, Route} from 'react-router-dom'
class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/create" component={Create}/>
                    <Route path="/deck/:deckId" component={DeckPage}/>
                    <Route path="/search/:req" component={Search}/> {/* <Route path="/best" component={Best}/> */}
                </div>
            </Router>
        )
    }
}

export default App;
