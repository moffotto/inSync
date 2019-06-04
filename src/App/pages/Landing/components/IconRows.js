import React, { Component } from 'react';
import { Image, Row, Col } from 'react-bootstrap';

export class IconRows extends Component {
    render() {
        return (
            <Row key={"member" + this.props.index} className="row-margin-2" >
                <Col xs={{ span: 4, offset: 6 }}>
                    <Image src={this.props.member.src} fluid />
                </Col>
            </Row>
        );
    };
}
