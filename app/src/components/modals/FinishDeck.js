import React from 'react';
import {
    Button,
    Header,
    Modal,
    Input,
    Icon,
    TextArea,
    Form,
    Confirm,
    Select
} from 'semantic-ui-react'
import strings from '../../localization/strings';
class FinishDeck extends React.Component {
    state = {
        modalOpen: false
    }

    handleOpen = (e) => this.setState({modalOpen: true})

    handleClose = (e) => {
        this.setState({modalOpen: false});
    }
    finish = (e) => {
        this
            .props
            .callback({title: this.titleInput, desc: this.descInput, type: this.typeInput});
        this.handleClose(e);
    }

    render() {
        const options = [
            {
                key: 'offensive',
                value: 'offensive',
                text: strings.FinishDeck.TypeOptions.offensive
            }, {
                key: 'defensive',
                value: 'defensive',
                text: strings.FinishDeck.TypeOptions.defensive
            }, {
                key: 'rush',
                value: 'rush',
                text: strings.FinishDeck.TypeOptions.rush
            }, {
                key: 'spawner',
                value: 'spawner',
                text: strings.FinishDeck.TypeOptions.spawner
            }, {
                key: 'tank',
                value: 'tank',
                text: strings.FinishDeck.TypeOptions.tank
            }, {
                key: 'buildings',
                value: 'buildings',
                text: strings.FinishDeck.TypeOptions.buildings
            }, {
                key: 'none',
                value: 'none',
                text: strings.FinishDeck.TypeOptions.none
            }
        ]
        return (
            <div>
                <Modal
                    trigger={< Button disabled = {
                    this.props.disabled
                }
                onClick = {
                    () => this.handleOpen()
                }
                primary className = "finalizeBtn" > {
                    this.props.text
                } </Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Header content={strings.FinishDeck.header}/>
                    <Modal.Content>
                        <Form className="inputs">
                            <Input
                                onChange={input => {
                                this.titleInput = input.target.value
                            }}
                                fluid
                                placeholder={strings.FinishDeck.inputTitle}/>
                            <Select
                                fluid
                                onChange={(e, {value}) => {
                                this.typeInput = value
                            }}
                                placeholder={strings.FinishDeck.TypeOptions.placeholder}
                                options={options}/>
                            <TextArea
                                onChange={input => {
                                this.descInput = input.target.value
                            }}
                                placeholder={strings.FinishDeck.inputDesc}/>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.finish} inverted>
                            <Icon name='checkmark'/> {strings.FinishDeck.close}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default FinishDeck;