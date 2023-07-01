import React from "react";

import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchTags } from "../redux/slices/post";
import { Post } from "../components/Post";

import Grid from "@mui/material/Grid";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentBlocks";
export const TagsSortPost = () => {
  const params = useParams();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { lastComments, postComments } = useSelector((state) => state.comments);
  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = lastComments.status === "loading";
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchSearchTags(params.id));
  }, [params.id]);
  return (
    <>
      <h1>{params.id}</h1>
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
