import React from 'react';
import {Menu, Segment, Button, Input, Icon} from 'semantic-ui-react'
import strings from '../../localization/strings';
import {Link} from 'react-router-dom'
class Navbar extends React.Component {
    search = (e) => {
        e.preventDefault();
        this.context.router.history.push(`/search/${this.inputSearch}`);
    }
    render() {
        const current = this.props.current || 'home';
        return (
            <div className="navbar">
                <Segment inverted>
                    <Menu stackable inverted pointing secondary>
                        <Link to="/">
                            <Menu.Item
                                name={strings.nav.home}
                                active={current === 'home'}
                                onClick={this.handleItemClick}/>
                        </Link>
                        <Link to="/create">
                            <Menu.Item
                                name={strings.nav.submit}
                                active={current === 'create'}
                                onClick={this.handleItemClick}/>
                        </Link>
                        <Link to="/best">
                            <Menu.Item
                                name={strings.nav.top}
                                active={current === 'best'}
                                onClick={this.handleItemClick}/>
                        </Link>

                        <Menu.Item position='right'>
                            <form onSubmit={e => this.search(e)}>
                                <Input onChange={e => {this.inputSearch = e.target.value}} icon={<Icon onClick={e => this.search(e)} name='search' circular link />} placeholder={strings.nav.searchPlaceHolder} />
                            </form>
                        </Menu.Item>
                    </Menu>
                </Segment>
            </div>
        )
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Navbar;
