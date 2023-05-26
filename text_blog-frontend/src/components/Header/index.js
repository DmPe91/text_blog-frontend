import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import style from "./Header.module.scss";
import { selectAuth, logout } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы уверены что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <Container maxWidth="xl">
      <header>
        <div className={style.logo}>
          <Link to="/">
            <img src="././assets/image/logo.png" alt="logo" />
          </Link>
        </div>
        <div className={style.tittle}>
          <h1>VEGAN BLOG</h1>
          <p>Блог о веган культуре и все что с ней связано</p>
        </div>
        <div className={style.authorization}>
          {isAuth ? (
            <>
              <Link to="/posts/create">
                <Button variant="contained">Написать статью</Button>
              </Link>
              <Button onClick={onClickLogout} variant="contained" color="error">
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outlined">ВОЙТИ</Button>
              </Link>
              <Link to="/register">
                <Button variant="contained">РЕГИСТРАЦИЯ</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </Container>
  );
};
