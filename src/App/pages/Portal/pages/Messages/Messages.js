import React, { Fragment, Component } from 'react';
import './Messages.css';
import { getChats, postNewMessageThread, getNewMessageParticipants, searchMessageParticipants } from '../../../../utils/messaging';
import { Route, Link } from "react-router-dom";
import { Container, Alert, Row, Col, Image, ListGroup, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { IndividualChat } from './components/IndividualChat';

export class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chats: null,
            showModal: false,
            newMessageText: '',
            employeesDisplayed: null,
            searchField: '',
            searchDropdown: false
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleNewMessageThread = this.handleNewMessageThread.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    async componentDidMount() {
        this.setState({
            chats: await getChats(),
        });
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleSearch() {
        if (Array.isArray(this.state.employees)) {
            this.setState({ employeesDisplayed: searchMessageParticipants(this.state.employees, this.state.searchField) });
        } else {
            this.setState({noParticipantsError: true})
        }

        this.setState({searchDropdown: true})
    }

    closeModal() {
        this.setState({ showModal: false, newMessageText: '', searchDropdown: false, searchField: '' });
    }

    async openModal() {
        this.setState({ employees: await getNewMessageParticipants(), showModal: true, newMessageUserID: 0, noParticipantsError: false, sendError: false});
    }

    async handleNewMessageThread() {
        let response = await postNewMessageThread(this.state.newMessageUserID, this.state.newMessageText);

        if (response === undefined) {
            this.setState({ sendError: true});
        } else {
            this.closeModal();
            this.setState({chats: await getChats(),});
        }
    }

    render() {
        return (
            <Fragment>

                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={() => { this.closeModal() }} show={this.state.showModal} centered >

                    {(this.state.sendError) && <Alert variant="danger"> Something went wrong. Please try again </Alert>}

                    <Modal.Header closeButton>
                        <div className="messages__new-recipient">
                            <InputGroup className="mb-3 messages__input-group">
                                <FormControl
                                    type="Text"
                                    placeholder="To:"
                                    name="searchField"
                                    value={this.state.searchField}
                                    onChange={(event) => { this.handleChange(event); this.handleSearch() }}
                                    onKeyPress={(event) => { if (event.key === "Enter") { this.handleSearch() } }} />
                            </InputGroup>

                            {(this.state.searchDropdown === true) && <ListGroup>
                                {
                                    (this.state.employeesDisplayed !== undefined && this.state.employeesDisplayed !== null) && (this.state.employeesDisplayed.map((member, index) => {
                                        let name = member.firstName + " " + member.lastName;
                                        return (
                                            <ListGroup.Item key={"messages-user-" + member.id + index} onClick={() => { this.setState({ newMessageUserID: member.id, searchField: name, searchDropdown: false }) }} action>
                                                <Row>
                                                    <Col xs={2}><Image src={member.photoURL} className="messages__search-profile-img" roundedCircle /></Col>
                                                    <Col xs={10}><p>{name}</p></Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    }))
                                }
                                {(this.state.noParticipantsError) && <ListGroup.Item>
                                    <Row>
                                        <p>No valid message participants found...</p>
                                    </Row>
                                </ListGroup.Item>}

                            </ListGroup>}

                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="postText">
                            <Form.Control
                                type="Text"
                                as="textarea" rows="3"
                                placeholder="New message content..."
                                name="newMessageText"
                                value={this.state.newMessageText}
                                onChange={(event) => { this.handleChange(event) }} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => { this.handleNewMessageThread() }} className="messages__send-new-btn" block>Send</Button>
                    </Modal.Footer>
                </Modal>


                <ListGroup variant="flush" className="messages__chats-column">
                    <div><h3 className="messages__heading float-left ">Messages</h3><i className="far fa-edit messages__new-message-icon float-right" style={{ fontSize: '2em' }} onClick={() => this.openModal()} /></div>
                    {
                        (this.state.chats !== undefined && this.state.chats !== null) && (this.state.chats.map((member, index) => {
                            return (
                                <ListGroup.Item key={"chat-" + member.chat.chat_id} className={(index === 0) ? "messages__no-top-border" : "messages__normal-list"} action >
                                    <Link to={"/portal/messages/" + member.chat.chat_id} style={{ textDecoration: 'none' }}>
                                        <Row>
                                            <Col xs={3}>
                                                <Image src={member.OtherParticipant.photoURL} thumbnail className="messages__profile-img" />
                                            </Col>
                                            <Col xs={9}>
                                                <Row>
                                                    <Col xs={9}>
                                                        <h4 className="messages__text-orange">{member.OtherParticipant.firstName + " " + member.OtherParticipant.lastName}</h4>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <p className="messages__text-muted">{member.chat.Most_Recent_Message_Time.substring(5, 10)}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <p className="messages__text-muted">{member.chat.Most_Recent_Message_Content}</p>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Link>
                                </ListGroup.Item>
                            );
                        }))
                    }
                </ListGroup>

                <div className="messages__fixed-content">
                    {
                        (this.state.chats !== undefined && this.state.chats !== null) && (this.state.chats.map((member) => {
                            return (
                                <Route key={"individual-chat-" + member.chat.chat_id} path={"/portal/messages/" + member.chat.chat_id} render={(props) => <IndividualChat {...props} chatId={member.chat.chat_id} otherUser={member.OtherParticipant} user={this.props.user} />} />
                            );
                        }))
                    }

                    <Route exact path="/portal/messages" render={() => (
                        <Container fluid>
                            <h3 className="messages__heading">Select a chat.</h3>
                        </Container>
                    )} />
                </div>

            </Fragment >
        );
    }
}

