import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';

export default function Header() {
    return (
      <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
        <Navbar />
      </Box>
    );
}

