import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostComments } from "../../redux/slices/comment";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const AddComment = () => {
  const dispatch = useDispatch();
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

      await axios.post("/posts/comment/add", comment);
      dispatch(fetchPostComments(post.id));
      await axios.patch(`/comments/${post.id}`);
      setTextComment(" ");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при отправке комментария");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user ? `http://localhost:1488${user.avatarUrl}` : " "}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
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
