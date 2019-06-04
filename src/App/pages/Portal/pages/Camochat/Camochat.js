import React, { Fragment, Component } from 'react';
import './Camochat.css';
import { CamoThread } from './components/CamoThread';
import { Form, Button, Card, Row, Col, Modal, Alert } from 'react-bootstrap';
import { Route, Link } from "react-router-dom";
import { getAllThreads, postNewThread } from '../../../../utils/camochat';

const dice = [{ name: "dice-one" }, { name: "dice-two" }, { name: "dice-three" }, { name: "dice-four" }, { name: "dice-five" }, { name: "dice-six" }];

export class Camochat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            threads: null,
            showModal: false,
            newPostText: '',
            sendError: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    async componentDidMount() {
        let data = await getAllThreads();

        this.setState({
            threads: data
        });
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    closeModal() {
        this.setState({
            showModal: false,
            newPostText: '',
            sendError: false
        });
    }

    async handleNewPost() {
        let response = await postNewThread(this.state.newPostText);

        if (response === undefined) {
            this.setState({ sendError: true });
        } else {
            this.closeModal();
            this.setState({ threads: await getAllThreads() });
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.postsEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {

        return (

            <Fragment>

                <Modal id={((this.props.navToggle === false) ? "camochat__modal-toggle-off" : "camochat__modal-toggle-on")}
                    size="lg"
                    onHide={() => { this.closeModal() }}
                    show={this.state.showModal}
                    centered className >

                    {(this.state.sendError) && <Alert variant="danger"> Something went wrong. Please try again </Alert>}

                    <Modal.Header closeButton>
                        <Modal.Title className="white-text">Super Secret Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="postText">
                            <Form.Control
                                type="Text"
                                as="textarea" rows="3"
                                placeholder="Your thoughts, feelings, whatever..."
                                name="newPostText"
                                value={this.state.newPostText}
                                onChange={(event) => { this.handleChange(event) }} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="camochat__post-new-btn" onClick={() => { this.handleNewPost() }} block>Post</Button>
                    </Modal.Footer>
                </Modal>

                <Route exact path="/portal/camochat" render={() =>
                    <Fragment>
                        <div className={"camochat__camo-background " + ((this.props.navToggle === false) ? "camochat__background-toggle-off" : "camochat__background-toggle-on")} >
                            <Row className="camochat__heading">
                                <Col xs={7}>
                                    <Row><h1 className="white-text camochat__text-shadow">Camochat</h1></Row>
                                    <Row><p className="white-text camochat__text-shadow">Anonymous employee conversation. Don't worry! Your boss doesn't know it's you!</p></Row>
                                </Col>

                                <Col xs={5}>
                                    <div><i className="far fa-edit camochat__new-message-icon float-right" style={{ fontSize: '2em' }} onClick={() => this.setState({ showModal: true })} /> </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="camochat__body-padding">
                            {
                                (this.state.threads !== undefined && this.state.threads !== null) && (this.state.threads.map((member, index) => {
                                    let diceArray = [];
                                    let diceIndex = ((index + 1) % 6);
                                    let numSix = Math.floor((index + 1) / 6);

                                    for (let i = 0; i < numSix; i++) {
                                        diceArray.push(<i className="fa fa-dice-six float-left" style={{ fontSize: '2em' }} key={"six-die-" + i} />)
                                    }

                                    return (
                                        <Row key={"camochat-thread-card-" + member.topicID} className="camochat__message-box">
                                            <Card className={"camochat__card " + ((this.props.user.id === member.authorID) ? "camochat__card-user" : "camochat__card-other-user")}>
                                                <Card.Header>
                                                    <div>
                                                        {diceArray.map((member) => { return member; })}
                                                        {(diceIndex !== 0) && <i className={"fa float-left fa-" + dice[diceIndex - 1].name} style={{ fontSize: '2em' }} />}
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text>{member.topicName}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer className="camochat__text-muted camochat__card-footer"><Link to={"/portal/camochat/" + member.topicID}>Join the conversation <i className="fas fa-reply fa-flip-horizontal camochat__join-convo-icon" style={{ fontSize: '1.3em' }} /></Link></Card.Footer>
                                            </Card>
                                        </Row>
                                    );
                                }))
                            }
                            <div className="autoscroll-dummy" ref={(el) => { this.postsEnd = el; }} />
                        </div>

                    </Fragment>
                } />

                {
                    (this.state.threads !== undefined && this.state.threads !== null) && (this.state.threads.map((member) => {
                        return (
                            <Route key={"camochat-thread-" + member.topicID} path={"/portal/camochat/" + member.topicID} render={(props) => <CamoThread {...props} thread={member} user={this.props.user} navToggle={this.props.navToggle} />} />
                        );
                    }))
                }
            </Fragment>

        );
    }
}
