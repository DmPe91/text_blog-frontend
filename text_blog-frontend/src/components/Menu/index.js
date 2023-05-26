import React from "react";
import styles from "./SideBlock.module.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const Menu = () => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  );
};
