import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPosts } from '../../actions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const post = useSelector(state => currentId ? state.posts.posts.find(post => post._id === currentId) : null);
    const [values, setValues] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        creator: '',
    });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    
    const clear = (e) => {
        setValues({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
            creator: '',
            name: ''
        });
        
        setCurrentId('');
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(editPosts(currentId, { ...values, tags: values.tags.split(','), name: user?.result?.name }, navigate));
        }else{
            dispatch(createPost({ ...values, tags: values.tags.split(','), name: user?.result?.name }, navigate));
        }

        setValues({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
            creator: ''
        });

        setCurrentId('');
    }
    
    useEffect(() => {
        if (currentId){
            const { creator, title, selectedFile, message, tags } = post;
            
            setValues({
                title: title,
                message: message,
                tags: tags.join(','),
                selectedFile: selectedFile,
                creator: creator
            });
        }

    },[currentId, post]);
    
    return (
        <Paper elevation={4} sx={{ padding: '20px' }}>
            {user ? (
                <form autoComplete='off' noValidate onSubmit={onSubmit}>
                    <Grid container>
                        <Typography variant='h6' style={{ marginBottom: '10px' }} fontWeight='bolder' textAlign='center'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                        <TextField label="Title" style={{ marginBottom: '10px' }} name='title' value={values.title} onChange={onChange} variant="outlined" fullWidth />
                        <TextField minRows={3} style={{ marginBottom: '10px' }} name='message' value={values.message} onChange={onChange} label="Message" fullWidth multiline={true} variant="outlined" />
                        <TextField label="Tags (coma separated)" style={{ marginBottom: '10px' }} name='tags' value={values.tags} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} fullWidth variant="outlined" />
                        <FileBase64
                            multiple={ false }
                            type='file'
                            onDone={({ base64 }) => setValues({ ...values, selectedFile: base64 }) }
                        />
                        <Button color='primary' style={{ marginBottom: '10px', marginTop: '10px' }} type='submit' variant='contained' fullWidth size='large'>SUBMIT</Button>
                        <Button fullWidth type='button' color='secondary' onClick={clear} variant='contained' size='small'>CLEAR</Button>
                    </Grid>
                </form>
            ) : (
                <Typography variant='body2' sx={{ color: '#000' }}>Please you have to be loggedIn to be able to post something. Click here to <Link to='/auth'>login</Link></Typography>
            )}
        </Paper>
    )
}

export default Form;