import React, { Component } from 'react';
import { Image, Row, Col, Card } from 'react-bootstrap';

export class TeamCard extends Component {
    render() {
        return (
            <Row key={"member" + this.props.index} className="row-margin-1" >
                <Col xs={{ span: 8, offset: 2 }}>
                    <Card body className="team-card">
                        <Row>
                            <Col xs={3}><Image src={this.props.member.image} thumbnail fluid /></Col>
                            <Col xs={8}>
                                <Row><h4>{this.props.member.name}</h4></Row>
                                <Row>{this.props.member.bio}</Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    };
}
