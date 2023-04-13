import React, { useState } from 'react';
import { Button, Grid, Paper, Avatar, Typography, Container } from '@mui/material';
import Input from './Input';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const initialState = { fname: '', lname: '', email: '', password: '', cpassword: '' }

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [visible, setVisible] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (signUp) {
            dispatch(signin(formData, navigate));
        }else{
            dispatch(signup(formData, navigate));
        }

        setFormData(initialState);
    }
   
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const toggleVisibility = () => {
        setVisible((visible) => !visible);
    }
  
    const toggleSignUp = () => {
        setSignUp((signUp) => !signUp);

        setFormData(initialState);
    }

    return (
        <Container maxWidth='xs' sx={{ marginTop: '60px' }}>
            <Paper elevation={6} sx={{ padding: '20px' }}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: 'red' }}>
                                <LockIcon />
                            </Avatar>
                            <Typography variant='h5'>Sign Up</Typography>
                        </Grid>
                        {!signUp && (
                            <React.Fragment>
                                <Input onChange={onChange} label='First Name*' type='text' name='fname' value={formData.fname} half={true} autoFocus={true} />
                                <Input onChange={onChange} label='Last Name*' type='text' name='lname' value={formData.lname} half={true} />
                            </React.Fragment>
                        )}
                        <Input onChange={onChange} label='Email*' type='email' name='email' value={formData.email} half={false} />
                        <Input onChange={onChange} label='Password*' name='password' type={visible ? 'text' : 'password'} toggleVisibility={toggleVisibility} visible={visible} value={formData.password} half={false} />
                        {!signUp && (
                            <Input onChange={onChange} label='Confirm Password*' type={visible ? 'text' : 'password'} visible={visible} name='cpassword' value={formData.cpassword} half={false} />
                        )}
                        <Grid item xs={12}>
                            <Button size='large' type='submit' color='primary' variant='contained' fullWidth>{!signUp ? 'signup' : 'signin'}</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size='large' color='primary' onClick={toggleSignUp}>already have an account?</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  )
}

export default Auth;