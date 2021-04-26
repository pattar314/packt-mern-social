import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, Paper } from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import useStyles from './../core/Home';
import auth from './../auth/auth-helper';
import { read } from './api-user';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';



export default function Profile({match}){
    const classes = useStyles();
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()



    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error){
                setRedirectToSignin(true)
            }else {
                console.log('user: ', data)
                setUser(data)
            }
        })
        return function cleanup(){
            abortController.abort()
        }
    }, [match.params.userId])

    if (redirectToSignin){
        return <Redirect to='/signin' />
    }

    const photoUrl = user._id
        ? `/api/users/photo/${user._id}?${new Date().getTime()}`
        : '/api/users/defaultphoto'


    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoUrl}>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id && (
                        <ListItemSecondaryAction>
                            <Link to={"/user/edit/" + user._id}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={user._id} />
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                </ListItem>
                <ListItem> 
                    <ListItemText primary={user.about} />
                </ListItem>
            </List>
        </Paper>
    )
}