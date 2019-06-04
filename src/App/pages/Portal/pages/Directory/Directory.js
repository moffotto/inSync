import React, { Fragment, Component } from 'react';
import './Directory.css';
import { allUsers, searchUsers } from '../../../../utils/users';
import { Button, Container, Col, Row, InputGroup, FormControl, Card, Image } from 'react-bootstrap';

export class Directory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeesDisplayed: null,
            searchField: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount() {
        let employees = await allUsers();

        this.setState({
            employees: employees,
            employeesDisplayed: employees
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
        this.setState({ employeesDisplayed: searchUsers(this.state.employees, this.state.searchField) });
    }

    render() {
        return (
            <Fragment>
                <Container fluid className="directory__container">
                    <Row className="directory__search-row-1">
                        <h2>Employee Directory</h2>
                    </Row>
                    <Row className="directory__search-row-2">
                        <InputGroup className="mb-3 directory__input-group">
                            <FormControl
                                type="Text"
                                placeholder="Search Names"
                                name="searchField"
                                value={this.state.searchField}
                                onChange={(event) => { this.handleChange(event) }}
                                onKeyPress={(event) => { if (event.key === "Enter") { this.handleSearch() } }} />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => { if ((this.state.employeesDisplayed !== undefined && this.state.employeesDisplayed !== null)) { this.handleSearch() }}} > <i className="fa fa-search" /> </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                    {
                        (this.state.employeesDisplayed !== undefined && this.state.employeesDisplayed !== null) && (this.state.employeesDisplayed.map((member, index) => {
                            return (
                                <div key={"directory-user-" + member.user.id + index}>
                                    {(member.user.id !== this.props.user.id) && (
                                        <Card className="directory__card" >
                                            <Row>
                                                <Col xs={3}><Image src={member.user.photoURL} thumbnail className="directory__profile-img" /></Col>

                                                <Col xs={9} className="directory__user-info">
                                                    <h4>{member.user.firstName + " " + member.user.lastName}</h4>
                                                    <Row><Col xs={4}><p className="directory__info-sub-heading">Username:</p></Col><Col xs={8}><p>{member.user.userName}</p></Col></Row>
                                                    <Row><Col xs={4}><p className="directory__info-sub-heading">Team:</p></Col><Col xs={8}><p>{member.user.role}</p></Col></Row>
                                                    <Row><Col xs={4}><p className="directory__info-sub-heading">Role:</p></Col><Col xs={8}><p>{member.user.team}</p></Col></Row>
                                                </Col>
                                            </Row>
                                        </Card>)}
                                </div>
                            );
                        }))
                    }
                </Container>
            </Fragment >
        );
    }
}