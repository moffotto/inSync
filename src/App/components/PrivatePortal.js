import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivatePortal = ({ component: Component, user, isAuthed, handleSignOut, ...rest }) => (
    <Route
        {...rest}

        render={props =>
            isAuthed ? (
                <Component {...props} user={user} handleSignOut={() => handleSignOut()} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivatePortal; 