import React from 'react';
import RestClient from '../services/RestClient';
class Search extends React.Component {

    componentWillMount() {
        const request = this.props.match.params.req;
        if(request) {
            RestClient.get('deck/search', {
                params: {
                    request: request
                }
            }).then(response => {
                console.log(response);
            }).catch(err => {
                if(err) throw err;
            });
        }
    }

    render() {
        return (
            <div>
                <p>hey</p>
            </div>
        )
    }
}

export default Search;