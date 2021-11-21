import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@material-ui/icons/Home';


export default function TopBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Electric Conductivity Surrogate Model
                    </Typography>
                    <IconButton aria-label="home page" color="inherit" href="/">
                        <HomeIcon />
                    </IconButton>
                    {props.isAuthenticated ? <Button color="inherit" href="/update_password">Update Password</Button> : null}
                    {props.isAuthenticated ? <Button color="inherit" onClick={() => props.logout()}>Logout</Button> : null}                </Toolbar>
            </AppBar>
        </Box>
    );
}