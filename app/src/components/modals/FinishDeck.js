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
    Dimmer
} from 'semantic-ui-react'
import strings from '../../localization/strings';
class FinishDeck extends React.Component {
    state = {
        modalOpen: false,
        confirmOpen: false
    }

    handleOpen = (e) => this.setState({modalOpen: true})

    handleClose = (e) => {
        this.setState({modalOpen: false});
    }
    finish = (e) => {
        if (!this.titleInput) {
            this.confirmOpen();
        } else {
            this
                .props
                .callback({title: this.titleInput, desc: this.descInput});
            this.handleClose(e);
        }
    }
    confirmCancel = () => {
        this.setState({confirmOpen: false})
    }
    confirmOpen = () => {
        this.setState({confirmOpen: true})
    }

    render() {
        return (
            <div>
                <Dimmer
                active={this.state.confirmOpen}
                onClickOutside={this.confirmCancel}
                page>
                    <Header as='h2' icon inverted>
                        {strings.FinishDeck.noTitleConfirm}
                        <Header.Subheader>{strings.FinishDeck.noTitleConfirmSub}</Header.Subheader>
                    </Header>
                </Dimmer>
                <Modal
                    trigger={<Button disabled = {
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