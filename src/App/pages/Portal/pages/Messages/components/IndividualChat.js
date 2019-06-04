import React, { Fragment, Component } from 'react';
import { getMessages, postMessage } from '../../../../../utils/messaging';
import { Container, Row, Card, Image, Button, FormControl, InputGroup } from 'react-bootstrap';

export class IndividualChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: null,
            messageText: ''
        }

        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    async componentDidMount() {
        let messages = await getMessages(this.props.chatId);

        this.setState({
            messages: messages
        });

        this.scrollToBottom();
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    async handleNewMessage() {
        let response = await postMessage(this.props.chatId, this.state.messageText);

        if (response !== undefined) {
            this.setState({
                messages: [...this.state.messages].concat([response]),
                messageText: ''
            });

            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {

        return (
            <Fragment>
                <Container fluid>
                    {
                        (this.state.messages !== undefined && this.state.messages !== null) && (this.state.messages.map((member) => {
                            return (
                                <Row key={member.MessageID} className="messages__message-box">
                                    <div className="messages__profile-img-container">
                                        {(this.props.otherUser.id === member.CubeEmployeesSenderID) &&
                                            <Image src={this.props.otherUser.photoURL} thumbnail className="app__profile-img" />
                                        }
                                    </div>
                                    <Card className={"messages__card " + ((this.props.user.id === member.CubeEmployeesSenderID) ? "messages__card-user" : "messages__card-other-user")}>
                                        <Card.Body><p>{member.content}</p></Card.Body>
                                        <Card.Footer className="text-muted messages__card-footer">{member.post_time.substring(0, 19)}</Card.Footer>
                                    </Card>
                                    <div className="messages__profile-img-container">
                                        {(this.props.user.id === member.CubeEmployeesSenderID) &&
                                            <Image src={this.props.user.photoURL} thumbnail className="app__profile-img" />
                                        }
                                    </div>
                                </Row>
                            );
                        }))
                    }
                    <div className="autoscroll-dummy" ref={(el) => { this.messagesEnd = el; }} />
                </Container >

                <InputGroup className="mb-3 messages__new-message">
                    <FormControl
                        className="messages__form-border-radius"
                        type="text"
                        // size="lg"
                        placeholder="Send a message..."
                        name="messageText"
                        value={this.state.messageText}
                        onChange={(event) => { this.handleChange(event) }}
                        onKeyPress={(event) => { if (event.key === "Enter") { this.handleNewMessage() } }} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" className="messages__form-border-radius" onClick={() => { this.handleNewMessage() }} > <i className="far fa-paper-plane" /> </Button>
                    </InputGroup.Append>
                </InputGroup>

            </Fragment>
        );
    }
}

