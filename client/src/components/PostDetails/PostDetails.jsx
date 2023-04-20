import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../../actions';
import { CircularProgress, Paper, Grid, Typography, Divider, TextField, Button, ButtonBase } from '@mui/material';
import moment from 'moment';
import { fetchPostsBySearch } from '../../actions';

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { post, posts, isLoading } = useSelector(state => state.posts);
    const [comment, setComment] = useState('');
    const { title, tags, message, name, createdAt, selectedFile } = post;
    
    useEffect(() => {
        dispatch(getPost(id));
    },[id, dispatch]);

    useEffect(() => {
        dispatch(fetchPostsBySearch({ search: 'none', tags: tags }));
    }, [post, dispatch, tags]);

    const makeComment = () => {

    }
    
    if (!Object.keys(post).length || isLoading) return <Paper sx={{ padding: '40px', textAlign: 'center', borderRadius: '20px', marginTop: '20px' }} elevation={6}>
        <CircularProgress size='100px' />
    </Paper>

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper elevation={6} sx={{ margin: '40px 0', borderRadius: '20px' }}>
            <Grid container sx={{ padding: '20px' }} columnSpacing={4}>
                <Grid item lg={7}>
                    <Typography gutterBottom variant='h4'>{title}</Typography>
                    <Typography gutterBottom variant='body2'>{tags.map(tag => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant='body2'>{message}</Typography>
                    <Typography gutterBottom variant='body2'>Created by: {name}</Typography>
                    <Typography gutterBottom variant='body2'>{moment(createdAt).fromNow()}</Typography>
                    <Divider sx={{ margin: '10px 0' }} />
                    <Typography variant='body1' fontWeight='bold'>Realtime Chat - coming soon</Typography>
                    <Divider sx={{ margin: '10px 0' }} />
                    <Grid item lg={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                        <div>
                            <Typography variant='body1' gutterBottom>Comment</Typography>
                            {[1, 2, 3].map((comment, index) => {
                                return <Typography key={index} variant='body1' gutterBottom>Kehinde: This place is really nice</Typography>
                            })}
                        </div>
                        <div>
                            <Typography variant='body2' gutterBottom>Write a comment</Typography>
                            <TextField
                                fullWidth
                                rows={4}
                                multiline
                                label='Comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button type='button' fullWidth sx={{ marginTop: '10px' }} variant='contained' onClick={makeComment} color='primary'>Comment</Button>
                        </div>
                    </Grid>
                    <Divider sx={{ marginBottom: '20px' }} />
                </Grid>
                <Grid item lg={5}>
                    <img src={selectedFile} alt="post-visual" width='100%' height='100%' style={{ borderRadius: '20px' }} />
                </Grid>
                <Grid item lg={12}>
                    <Typography>You may also like: </Typography>
                    <Divider sx={{ margin: '20px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                        {recommendedPosts.map(({ _id, message, title, selectedFile, tags, name, createdAt }) => {
                            return <ButtonBase key={_id} sx={{ textAlign: 'justify', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} component={Link} to={`/posts/${_id}/postDetails`}>
                                    <Typography variant='h6' gutterBottom>{title}</Typography>
                                    <Typography variant='body2' gutterBottom>{tags.map(tag => `#${tag} `)}</Typography>
                                    <Typography variant='body2' gutterBottom>Created By: {name}</Typography>
                                    <Typography variant='body2' gutterBottom>{moment(createdAt).fromNow()}</Typography>
                                    <div style={{ width: '150px', height: '150px' }}>
                                        <img src={selectedFile} width='100%' height='100%' alt="post visual" />
                                    </div>
                                    <Typography variant='body2' gutterBottom>{message}</Typography>
                            </ButtonBase>
                        })}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PostDetails;