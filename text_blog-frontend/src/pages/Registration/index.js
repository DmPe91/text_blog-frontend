import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  fetchRegister,
  fetchUserData,
  selectAuth,
} from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import axios from "../../axios";

import styles from "./Registration.module.scss";

export const Registration = () => {
  const isAuth = useSelector(selectAuth);
  const inputFileRef = React.useRef(null);
  const [avatarUrl, setavatarUrl] = React.useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: " ",
      email: " ",
      password: " ",
    },
    mode: "onChange",
  });
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setavatarUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  };
  const onSubmit = async (values) => {
    const user = {
      ...values,
      avatarUrl,
    };
    console.log(user);
    const data = await dispatch(fetchRegister(user));
    if (!data.payload) {
      return alert("Не удалось зарегестрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <Button
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          добавить фото
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя" })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
