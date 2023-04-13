import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { Container, Grid } from '@mui/material';
import Paginate from '../Paginate/Paginate';
import { useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import { useDispatch } from 'react-redux';
import { fetchPost } from '../../actions';

const Home = () => {
    const [currentId, setCurrentId] = useState('');
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const page = searchParams.get("page");
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(fetchPost(page));
    },[page, dispatch, search]);

    return (
        <Container maxWidth='false'>
            <Grid container justifyContent='space-between' marginTop='40px' marginBottom='40px' paddingRight='20px' paddingLeft='20px' columnSpacing={4}>
                <Grid item container spacing={2} xs={12} sm={6} md={8} lg={9}>
                    <Posts setCurrentId={setCurrentId} currentId={currentId} />
                </Grid>
                <Grid item sm={6} xs={12} md={4} lg={3}>
                    <Search />
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paginate />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;
