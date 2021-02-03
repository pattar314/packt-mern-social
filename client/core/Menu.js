import { AppBar, Button, IconButton,  Toolbar, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import auth from './../auth/auth-helper';
import React from 'react';
import { Link } from 'react-router-dom'


const Menu = withRouter(({history}) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                Mern Skeleton
            </Typography>
            <Link to='/'>
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    Home
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>Users</Button>
            </Link>
            {
                !auth.isAuthenticated() && (
                    <span>
                        <Link to="/signup">
                            <Button style={isActive(history, "/signup")}>Sign up</Button>
                        </Link>
                        <Link to="/signin">
                            <Button style={isActive(history, "/signin")}>Sign in</Button>
                        </Link>
                    </span>
                )
            }
            {
                auth.isAuthenticated() && (
                    <span>
                        <Link to={"/user/" + auth.isAuthenticated().user._id}>
                            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                My Profile
                            </Button>
                        </Link>
                        <Button color="inherit" onClick={() => { auth.clearJWT(() => history.push('/'))}}>
                            Sign Out
                        </Button>
                    </span>
                )
            }
        </Toolbar>
    </AppBar>
))

const isActive = (history, path) => {
    if (history.location.pathname  == path){
        return({color: '#ff4081'})
    } else {
        return({color: '#fff'})
    }
}

export default Menu