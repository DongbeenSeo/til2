import React from "react";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";

import _const from "../const";
import { LOAD_POST_REQUEST } from "./../reducers/post";

const Post = ({ id }) => {
  const { singlePost } = useSelector((state) => state.post);
  const imageSource = (path) => {
    return `http://localhost:${_const.port}/${path}`;
  };
  return (
    <>
      {/*
        Helmet
        웹 페이지가 검색엔진에 노출 될 수 있게
        페이지에 meta data를 넣어주는 라이브러리
       */}
      <Helmet
        title={`${singlePost.User.nickname}남의 글`}
        description={singlePost.content}
        meta={[
          {
            name: "description",
            content: singlePost.content,
          },
          {
            property: "og:title",
            content: `${singlePost.User.nickname}님의 게시글`,
          },
          {
            property: "og:description",
            content: singlePost.content,
          },
          {
            property: "og:image",
            content:
              singlePost.Images[0] && imageSource(singlePost.Images[0].src),
          },
          {
            property: "og:url",
            content: `http://localhost:${_const.port}/post/${id}}`,
          },
        ]}
      />
      <div>{singlePost.content}</div>
      <div>{singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && (
          <img
            src={imageSource(singlePost.Images[0].src)}
            alt={"singlepost"}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
    </>
  );
};

Post.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

export default Post;
