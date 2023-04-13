import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../actions';
import { CircularProgress, Paper, Grid, Typography, Divider, TextField, Button } from '@mui/material';
import moment from 'moment';
import { fetchPostsBySearch } from '../../actions';

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.post);
    const [comment, setComment] = useState('');
    const { title, tags, message, name, createdAt, selectedFile } = post;
    
    useEffect(() => {
        dispatch(getPost(id));
    },[id, dispatch]);

    const makeComment = () => {

    }
    
    if (!Object.keys(post).length) return <Paper sx={{ padding: '40px', textAlign: 'center', borderRadius: '20px', marginTop: '20px' }} elevation={6}>
        <CircularProgress size='100px' />
    </Paper>

    const recommendedPosts = () => dispatch(fetchPostsBySearch({ search: 'none', tags: tags }));
    console.log(recommendedPosts);
    return (
        <Paper elevation={6} sx={{ marginTop: '20px', borderRadius: '20px' }}>
            <Grid container sx={{ padding: '20px' }}>
                <Grid item lg={7} sx={{ padding: '0 20px' }}>
                    <Typography gutterBottom variant='h4'>{title}</Typography>
                    <Typography gutterBottom variant='body2'>{tags.map(tag => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant='body2'>{message}</Typography>
                    <Typography gutterBottom variant='body2'>Created by: {name}</Typography>
                    <Typography gutterBottom variant='body2'>{moment(createdAt).fromNow()}</Typography>
                    <Divider />
                    <Typography variant='body1' sx={{ margin: '20px 0' }} fontWeight='bold'>Realtime Chat - coming soon</Typography>
                    <Divider />
                    <Grid item lg={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                        <div>
                            <Typography variant='body1' gutterBottom>Comment</Typography>
                            {[1, 2, 3].map(comment => {
                                return <Typography variant='body1' gutterBottom>Kehinde: This place is really nice</Typography>
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
                    <Divider />
                </Grid>
                <Grid item lg={5}>
                    <img src={selectedFile} alt="post-visual" width='100%' height='100%' style={{ borderRadius: '20px' }} />
                </Grid>
                <Grid item lg={12}>
                    <Divider />
                    <Typography sx={{ margin: '20px 0' }}>You may also like: </Typography>
                    <Divider />
                    <div>

                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PostDetails;