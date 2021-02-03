import { Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Link, TextField, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import useStyles from './../core/Home'


export default function Signin(props){
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }


        signin(user).then((data) => {
            if (data.error){
                setValues({...values, error: data.error})
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true})
                })
            }
        })
    }

    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }

    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }
    const {redirectToReferrer} = values
    if (redirectToReferrer){
        return(<Redirect to={from}/>)
    }

    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign In
                    </Typography>
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
                    className={classes.submit}>Sign in</Button>
                </CardActions>
            </Card>

        </div>
    )

}