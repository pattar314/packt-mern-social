import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import { ArrowForward, Person } from '@material-ui/icons'
import useStyles from './../core/Home'
import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import {list} from './api-user'

export default function Users() {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error){
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })


        return function cleanup(){
            abortController.abort()
        }
    }, [])
    
    const classes = useStyles()
    
    
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users && users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
            </List>
        </Paper>
    ) 
}
