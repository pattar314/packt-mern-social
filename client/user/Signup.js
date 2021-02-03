import React, { useState } from 'react'
import { create } from './api-user'
import useStyles from './../core/Home'
import { Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Link, TextField, Typography, Button } from '@material-ui/core'


export default function Signup(){
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }


    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.name || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error: '', open: true})
            }
        })
    }

    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" placeholder="Name" className={classes.textField} value={values.name} onChange={handleChange('name')}
                    margin="normal" />
                    <br />
                    <TextField id="email" type="email" placeholder="Email"
                        className={classes.textField}
                        value={values.email} onChange={handleChange('email')}
                        margin="normal" />
                    <br/>
                    <TextField id="password" type="password" placeholder="Password"
                    className={classes.textField} value={values.password}
                    onChange={handleChange('password')} margin="normal" />
                    <br/>
                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}</Typography>
                        )
                    }
                </CardContent>
                < CardActions >
                    <Button color="primary" variant="contained" onClick={clickSubmit}
                    className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle> New Account </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus" variant="contained">Sign in</Button>
                    </Link>
                </DialogActions>
            </Dialog>

        </div>
    )

}