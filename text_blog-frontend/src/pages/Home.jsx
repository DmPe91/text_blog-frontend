import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

//import axios from "../axios";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentBlocks";
import { fetchPosts, fetchTags } from "../redux/slices/post";
import { fetchComments } from "../redux/slices/comment";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { lastComments, postComments } = useSelector((state) => state.comments);
  const [sort, setSort] = React.useState(
    localStorage.getItem("sort") || "date"
  );
  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = lastComments.status === "loading";

  React.useEffect(() => {
    console.log(sort);
    dispatch(fetchPosts(sort));
    dispatch(fetchComments());
    dispatch(fetchTags());
  }, [sort]);

  const onDate = () => {
    setSort("date");
    localStorage.setItem("sort", "date");
  };

  const onRating = () => {
    setSort("rating");
    localStorage.setItem("sort", "rating");
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={onDate} />
        <Tab label="Популярные" onClick={onRating} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:1488${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastComments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
