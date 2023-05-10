import React from "react";
import Button from "@mui/material/Button";
import {} from "@mui/material/Container";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <div class="logo">
        <img src=".../public/assets/image/logo.png" alt="logo" />
      </div>
      <div class="tittle">
        <h1>VEGAN BLOG</h1>
        <p>Блог о веган культуре и все что с ней связано</p>
      </div>
      <div class="authorization">
        <button class="login">ВОЙТИ</button>
        <button class="registration">РЕГИСТРАЦИЯ</button>
      </div>
    </header>
  );
};
