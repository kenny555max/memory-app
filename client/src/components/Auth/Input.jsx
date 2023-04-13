import React from 'react';
import { Grid, TextField } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ name, label, onChange, value, half, autoFocus, visible, toggleVisibility, type }) => {
  return (
    <Grid item xs={half ? 6 : 12}>
        <TextField
            fullWidth
            name={name}
            label={label}
            type={type}
            onChange={onChange}
            value={value}
            autoFocus={autoFocus}
            InputProps={name === 'password' ? {
             endAdornment: (
              <InputAdornment position="end">
               <IconButton onClick={toggleVisibility}>
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
               </IconButton>
              </InputAdornment>
             )
            } : null}
        />
    </Grid>
  )
}

export default Input;
