import React, { useEffect, useState } from 'react';
import { Paper, TextField, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchPostsBySearch } from '../../actions/index';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

const Search = () => {
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(useLocation().search);
    const searchQuery = searchParams.get("searchQuery");
    const tagQuery = searchParams.get("tags");

    const onSubmit = (e) => {
        e.preventDefault();

        if (search.trim() || tags.length !== 0) navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);

        if (searchQuery || tagQuery) dispatch(fetchPostsBySearch({ search: searchQuery, tags: tagQuery.split(',') }));

        setTags([]);
        setSearch('');
    };

    const handleAddChip = (chip) => setTags([ ...tags, chip ]);

    const handleDeleteChip = (chip) => setTags([ ...tags.filter(tag => tag !== chip) ]);
    
    useEffect(() => {
        if (searchQuery || tagQuery) dispatch(fetchPostsBySearch({ search: searchQuery, tags: tagQuery.split(',') }));
    },[searchQuery, tagQuery, dispatch]);

    return (
        <Paper elevation={6} sx={{ padding: '20px', marginBottom: '10px' }}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={search}
                            label='title'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ChipInput
                            value={tags}
                            onAdd={handleAddChip}
                            onDelete={handleDeleteChip}
                            label='Tags'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' color='primary' sixe='large' fullWidth>submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default Search;