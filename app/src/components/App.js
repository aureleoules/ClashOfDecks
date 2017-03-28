import React from 'react';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/create" component={Create}/>
                    {/* <Route path="/best" component={Best}/> */}
                </div>
            </Router>
        )
    }
}

export default App;
