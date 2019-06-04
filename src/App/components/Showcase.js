import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { TeamCard } from '../pages/Landing/components/TeamCard';
import { IconRows } from '../pages/Landing/components/IconRows';

export class Showcase extends Component {
    render() {
        return (
            <Container>
                {
                    (this.props.group.map((member, index) => {
                        return (
                            <div key={this.props.type + "-showcase-" + index}>
                                {(this.props.type === "team") && <TeamCard member={member} index={index} key={"team-" + index} />}
                                {(this.props.type === "icon") && <IconRows member={member} index={index} key={"icon-" + index} />}
                            </div>
                            
                        );
                    }))
                }
            </Container>
        );
    };
}