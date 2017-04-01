import React from 'react';
import {Menu, Segment, Button} from 'semantic-ui-react'
import strings from '../../localization/strings';
import {Link} from 'react-router-dom'
class Navbar extends React.Component {

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
                            <Button inverted>Random</Button>
                        </Menu.Item>
                    </Menu>
                </Segment>
            </div>
        )
    }
}

export default Navbar;
