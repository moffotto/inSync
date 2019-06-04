import React, { Fragment, Component } from 'react';
import './Login.css';
import { Redirect } from "react-router-dom";
import { Button, Form, Image, Container, Row, Col, Card } from 'react-bootstrap';
import { signIn } from '../../utils/users';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            errorMessage: ''
        };
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if (this.props.isAuthed) {
            return <Redirect to={from} />;
        }

        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col xs={8} className="no-left-padding">
                            <Image src="./img/Login/login_1.png" fluid />
                        </Col>
                        <Col xs={4}>
                            <Col xs={{ span: 10, offset: 1 }}>
                                <Card className="login__card">
                                    <Card.Body>
                                        <Form>
                                            {(from.pathname !== "/") && <p>You must log in to view the page at {from.pathname}</p>}

                                            <h3>Sign In</h3>
                                            <Form.Group controlId="loginEmail">
                                                <Form.Control
                                                    type="Username"
                                                    placeholder="Username"
                                                    name="username"
                                                    value={this.state.username}
                                                    onChange={(event) => { this.handleChange(event) }} />
                                            </Form.Group>

                                            <Form.Group controlId="loginPassword">
                                                <Form.Control
                                                    type="Password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={(event) => { this.handleChange(event) }} />
                                            </Form.Group>

                                            <Button className="login__login-button" onClick={() => { signIn(this.state.username, this.state.password, this.props.handleSignIn) }} block>Log In</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Fragment >
        );
    }
}