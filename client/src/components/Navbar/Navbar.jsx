import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, MenuItem, Menu, IconButton, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import image from '../../images/photo-1423784346385-c1d4dac9893a.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import decode from 'jwt-decode';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const Logout = () => {
        setUser(null);
        setAnchorEl(null);
        dispatch(logout(navigate));
    };

    useEffect(() => {
        let token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout(navigate));
        }
    },[user?.token, dispatch, navigate]);
  
    return (
        <AppBar position="static" sx={{ borderRadius: '20px', background: '#fff', height: 'auto' }}>
            <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', height: 'inherit' }}>
                <Avatar
                    alt="Remy Sharp"
                    src={image}
                    sx={{ width: 40, height: 40, marginRight: '20px' }}
                    component={Link}
                    to='/'
                />
                <Typography variant="h6" marginRight='auto' color='primary' component={Link} to='/' sx={{ textDecoration: 'none', color: '#000' }}>
                    Memories
                </Typography>
                <div style={{ display: 'flex' }}>
                    {user && (
                        <div>
                            <Typography variant='h6' marginTop='10px' sx={{ color: '#000' }}>{user.result.email}</Typography>
                        </div>
                    )}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {user ? (
                            <MenuItem onClick={Logout}>Logout</MenuItem>
                        ) : (
                            <MenuItem onClick={handleClose} component={Link} to='/auth'>Login</MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;