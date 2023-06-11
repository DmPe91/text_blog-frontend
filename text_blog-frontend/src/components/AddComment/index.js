import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const AddComment = () => {
  const post = useParams();
  const user = useSelector((state) => state.auth.data);
  const [text, setTextComment] = React.useState(" ");
  const onComment = async () => {
    try {
      const comment = {
        text: text,
        post: post.id,
        user: user._id,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      };
      console.log(comment);
      await axios.post("/posts/comment/add", comment);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при отправке комментария");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setTextComment(e.target.value)}
          />
          <Button variant="contained" onClick={onComment}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
