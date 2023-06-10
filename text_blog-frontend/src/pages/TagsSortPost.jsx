import React from "react";

import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { fetchSearchTags } from "../redux/slices/post";
import { Post } from "../components/Post";

export const TagsSortPost = () => {
  const params = useParams();
  console.log(params.id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchSearchTags(params.id));
  }, []);
  return <></>;
};
