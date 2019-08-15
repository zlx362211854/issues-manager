import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
export default function Lists(props) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openMenuBool, setOpenMenuBool] = useState(false);
  const localAccount = JSON.parse(window.localStorage.getItem('account'));
  const handleMenu = e => {
    setOpenMenu(e.currentTarget);
    setOpenMenuBool(true);
  };
  const handleClose = () => {
    setOpenMenu(null);
    setOpenMenuBool(false);
  };
  const handleLogout = () => {
    window.localStorage.removeItem('account');
    window.localStorage.removeItem('token');
    handleClose();
    props.onOk();
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {localAccount.login}
          </Typography>
          <Avatar
            style={{ marginLeft: 50 }}
            onClick={handleMenu}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            alt={localAccount.login}
            src={localAccount.avatar_url}
          />
          <Menu
            id="menu-appbar"
            anchorEl={openMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={openMenuBool}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}