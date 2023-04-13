import { Paper, Pagination, PaginationItem } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Paginate = () => {
  const { currentPage, totalNumberOfPages } = useSelector((state) => state.posts);
  return (
    <Paper elevation={6} sx={{ padding: '10px', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <Pagination 
            count={totalNumberOfPages || 1}
            variant="outlined"
            color="primary"
            page={currentPage || 1}
            renderItem={(item) => (
                <PaginationItem
                  {...item}
                  component={Link}
                  to={`/posts?page=${item.page}`}
                />
            )}
            defaultPage={1}
        />
    </Paper>
  )
}

export default Paginate;
