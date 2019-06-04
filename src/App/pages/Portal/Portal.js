import React, { Component } from 'react';
import './Portal.css';
import { Route } from "react-router-dom";
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { signOut } from '../../utils/users';

import { Home } from './pages/Home/Home';
import { Camochat } from './pages/Camochat/Camochat';
import { Documents } from './pages/Documents/Documents';
import { Messages } from './pages/Messages/Messages';
import { Directory } from './pages/Directory/Directory';

const portalRoutes = [
    { pathKey: "home", faIcon: "fas fa-home", navText: "Home" }, 
    { pathKey: "camochat", faIcon: "fas fa-rss", navText: "Camochat" }, 
    { pathKey: "documents", faIcon: "far fa-file-alt", navText: "Documents" }, 
    { pathKey: "directory", faIcon: "fas fa-users", navText: "Employee Directory" }, 
    { pathKey: "messages", faIcon: "fas fa-comment", navText: "Messages" }
]

export class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navToggle: true
        }
    }

    render() {
        return (
            <div className={"bounded-screen " + ((this.props.location.pathname.includes("/portal/camochat") === true) ? "portal__camochat-background" : "white-background")}>
                <SideNav
                    onToggle={() => {
                        this.setState(prevState => ({
                            navToggle: !prevState.navToggle
                        }));
                    }}

                    onSelect={(selected) => {
                        let path = '/portal'
                        if (selected !== 'home') path = path + '/' + selected;
                        if (this.props.location.pathname !== path && path !== '/portal/signout') this.props.history.push(path);
                    }}

                    expanded={this.state.navToggle}
                    className="portal__side-nav"
                >
                    <Toggle />

                    <SideNav.Nav defaultSelected="home">
                        {
                            portalRoutes.map((member) => {
                                return (
                                    <NavItem eventKey={member.pathKey} key={member.pathKey}>
                                        <NavIcon><i className={member.faIcon} style={{ fontSize: '1.75em' }} /></NavIcon>
                                        <NavText>{member.navText}</NavText>
                                    </NavItem>
                                );
                            })
                        }

                        <NavItem eventKey="signout" onClick={() => { signOut(this.props.handleSignOut) }} className={"portal__nav-log-out " + ((this.state.navToggle === false) ? "portal__nav-off" : "portal__nav-on")}>
                            <NavIcon><i className="fa fa-hand-peace" style={{ fontSize: '1.75em' }} /></NavIcon>
                            <NavText>Sign Out</NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>

                <div className={"portal__fixed-content " + ((this.state.navToggle === false) ? "portal__box-toggle-off" : "portal__box-toggle-on")}>
                    <Route exact path="/portal" component={Home} />
                    <Route path="/portal/camochat" render={(props) => <Camochat {...props} user={this.props.user} navToggle={this.state.navToggle} />} />
                    <Route path="/portal/documents" render={(props) => <Documents {...props} user={this.props.user} />} />
                    <Route path="/portal/directory" render={(props) => <Directory {...props} user={this.props.user} />} />
                    <Route path="/portal/messages" render={(props) => <Messages {...props} user={this.props.user} />} />
                </div>
            </div>
        );
    }
}