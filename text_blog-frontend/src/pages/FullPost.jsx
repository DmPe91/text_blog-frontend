import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostComments } from "../redux/slices/comment";
import ReactMarkdown from "react-markdown";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentBlocks";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const { lastComments, postComments } = useSelector((state) => state.comments);

  const [isLoading, setLoading] = React.useState(true);
  const params = useParams();
  console.log(postComments, postComments.status);
  const dispatch = useDispatch();
  const isCommentsLoading = postComments.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPostComments(params.id));
    axios
      .get(`/posts/${params.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);

        alert("Ошибка при получении статьи");
      });
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:1488${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={postComments.items} isLoading={isCommentsLoading}>
        <AddComment />
      </CommentsBlock>
    </>
  );
};
