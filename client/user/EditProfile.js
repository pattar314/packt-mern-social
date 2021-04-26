import { TextField } from '@material-ui/core';
import React from 'react'
import { Redirect } from 'react-router'
import useStyles from './../core/Home';



const EditProfile = () => { 

    const classes = useStyles()

    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        const value = name === 'photo'
        ? event.target.files[0]
        : event.target.value
        setValues({ ...values, [name]: value})
    }

    

    const clickSubmit = () => {
        let userData = new FormData()
        values.name && userData.append('name', values.name)
        values.email && userData.append('email', values.email)
        values.password && userData.append('password', values.email)
        values.about && userData.append('about', values.about)
        values.photo && userData.append('photo', values.photo)
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.email || undefined
        }    

        const jwt = auth.isAuthenticated()

        update({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, userData).then((data) => {
            if (data && data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true})
            }
        })
        if (values.redirectToProfile){
            return (<Redirect to={'/user/' + values.userId} />)
        }
    }


    return (
        
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" placeholder="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
                    
                    <TextField id="email" type="email" placeholder="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br/>
                    
                    <TextField id="password" type="password" placeholder="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" /><br/>
                    
                    <TextField id="about" placeholder="About" multiline rows="2" value={values.about} onChange={handleChange('about')} />
                    
                    <input accept="image/*" type="file" onChange={handleChange('photo')} style={{display: 'none'}} id="icon-button-file" />
                    <label htmlFor="icon-button-file">
                    <Button variant="contained" color="default" content="span"> Upload <FileUpload /></Button>
                    </label>
                    <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>

                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}</Typography>
                        )
                    }
                </CardContent>
                < CardActions >
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle> Account Action </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Account successfully Updated.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/editProfile">
                        <Button color="primary" autoFocus="autoFocus" variant="contained">Save</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )

}



export default EditProfile
