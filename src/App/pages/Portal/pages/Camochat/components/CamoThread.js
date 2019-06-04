import React, { Component, Fragment } from 'react';
import { Row, Card, Button, Form } from 'react-bootstrap';
import { getThreadReplies, postNewReply } from '../../../../../utils/camochat';

export class CamoThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            replies: null,
            newReplyText: ''
        }

        this.handleNewPost = this.handleNewPost.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    async componentDidMount() {
        this.setState({
            replies: await getThreadReplies(this.props.thread.topicID)
        });
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    async handleNewPost() {
        let response = await postNewReply(this.props.thread.topicID, this.state.newReplyText);

        if (response === undefined) {
            this.setState({ sendError: true });
        } else {
            this.setState({ replies: await getThreadReplies(this.props.thread.topicID), newReplyText: '' });
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.repliesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {

        return (
            <Fragment>
                <div className={"camochat__camothread-background " + ((this.props.navToggle === false) ? "camochat__background-toggle-off" : "camochat__background-toggle-on")} >

                    <div className="camochat__back-container"><Button className="camochat__back-button" onClick={() => this.props.history.push("/portal/camochat")}><i className="fas fa-chevron-left" style={{ fontSize: '1.75em' }} />Back</Button></div>

                    <Row className="camochat__heading-box">
                        <Card className={"camochat__topic-card " + ((this.props.user.id === this.props.thread.authorID) ? "camochat__card-user" : "camochat__card-other-user")}>
                            <Card.Body>
                                <p className="camochat__thread-topic-text">{this.props.thread.topicName}</p>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
                {
                    (this.state.replies !== undefined && this.state.replies !== null) && (this.state.replies.map((member) => {
                        return (
                            <Row key={member.ID} className="camochat__message-box">
                                <Card className={"camochat__card " + ((this.props.user.id === member.userID) ? "camochat__card-user" : "camochat__card-other-user")}>
                                    <Card.Body>
                                        <p>{member.content}</p>
                                    </Card.Body>
                                    <Card.Footer className="camochat__text-muted camochat__card-footer">{member.createdAt}</Card.Footer>
                                </Card>
                            </Row>
                        );
                    }))
                }

                <div className="autoscroll-dummy" ref={(el) => { this.repliesEnd = el; }} />

                <Row className="camochat__form-body">
                    <Card className="camochat__form-card">
                        <Form.Group controlId="replyText">
                            <Form.Control
                                type="Text"
                                as="textarea" rows="3"
                                placeholder="Your thoughts, feelings, whatever..."
                                name="newReplyText"
                                value={this.state.newReplyText}
                                onChange={(event) => { this.handleChange(event) }} />
                        </Form.Group>

                        <Button className="camochat__back-button" onClick={() => { this.handleNewPost() }} block>Post</Button>
                    </Card>
                </Row>

            </Fragment>
        );
    }
}

