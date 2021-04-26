import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import { ArrowForward, Person } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { list } from './api-user.js'



export default function Users() {
    const [users, setUsers] = useState([])
    
    
    const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
      }),
      title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
      }
    }))

    const classes = useStyles()
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then( (data) => {
            if (data && data.error){
                console.log(data.error)
            } else {
                console.log('users found: ', data)
                setUsers(data)
                console.log('users set')
            }
        })


        return function cleanup(){
            abortController.abort()
        }
    }, [])
    
    
    
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users 
            </Typography>
            <List dense>
                {users.map((item, i) => {
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
