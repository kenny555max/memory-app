import React, { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import { fetchPosts } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Posts = ({ setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const location = useLocation();
  
  useEffect(() => {
    if (location.search) return;
    
    dispatch(fetchPosts());
  },[dispatch, currentId, posts, location]);

  return (
    !posts.length ? <CircularProgress /> : posts.map((post) => {
      return (
        <Grid item md={6} lg={4} key={post._id} xs={12} xl={3}>
          <Post post={post} setCurrentId={setCurrentId} currentId={currentId} />
        </Grid>
      )
    })
  )
}

export default Posts;