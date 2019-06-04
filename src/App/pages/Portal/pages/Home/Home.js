import React, { Fragment, Component } from 'react';
import './Home.css';
import { Card, CardColumns } from 'react-bootstrap';
import hire from './img/hire.png';
import fence from './img/fence.jpg';
import brick from './img/brick.jpg';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: null,
        }
    }

    render() {

        return (
            <Fragment>
                <Card className="home__main-card">
                    <Card.Header as="h5">Welcome back!</Card.Header>
                    <Card.Body>
                        <Card.Title>Check out what's important today</Card.Title>

                        <CardColumns>
                            <Card>
                                <Card.Img variant="top" src={hire} />
                                <Card.Body>
                                    <Card.Title>New Hire?</Card.Title>
                                    <Card.Text>
                                        If you're an incoming hire and haven't checked out the orientation document, you should! We're so proud that our team (or should I say... family?) has been growing so quickly!
                                    </Card.Text>
                                    <Card.Link onClick={() => this.props.history.push("/portal/documents")} className="home__custom-card-link">Go to document</Card.Link>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src={fence} />
                                <Card.Body>
                                    <Card.Title>Know the Doctrine</Card.Title>
                                    <Card.Text>
                                        The "Cube Rule" is the inspiration for this platform. Company policy is to know what it is.
                                    </Card.Text>
                                    <Card.Link href="http://cuberule.com/">Check it out</Card.Link>
                                </Card.Body>
                            </Card>

                            <Card className="p-3">
                                <blockquote className="blockquote mb-0 card-body">
                                    <p>
                                        “The privilege of a lifetime is being who you are.”
                                    </p>
                                    <footer className="blockquote-footer">
                                        <small className="text-muted">
                                            Joseph Campbell
                                        </small>
                                    </footer>
                                </blockquote>
                            </Card>

                            <Card className="text-right">
                                <blockquote className="blockquote mb-0 card-body">
                                    <p>
                                        "If your compassion does not include yourself, it is incomplete."
                                    </p>
                                    <footer className="blockquote-footer">
                                        <small className="text-muted">
                                            Jack Kornfield
                                        </small>
                                    </footer>
                                </blockquote>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src={brick} />
                                <Card.Body>
                                    <Card.Title>AWS Security</Card.Title>
                                    <Card.Text>
                                        Have you thought about security today? If not, consider this article on securing your AWS environment in the cloud.
                                    </Card.Text>
                                    <Card.Link href="https://www.sumologic.com/aws/aws-security/">AWS Security 101</Card.Link>
                                </Card.Body>
                            </Card>

                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>Daily Reminder</Card.Title>
                                    <Card.Text>
                                        Give your food the attention it deserves.
                                    </Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">-Your CEO</small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </CardColumns>
                    </Card.Body>
                </Card>
            </Fragment >
        );
    }
}
