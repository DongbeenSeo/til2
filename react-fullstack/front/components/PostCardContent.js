import React from "react";
import Link from "next/link";

const PostCardContent = ({ post }) => {
  return (
    // 게시글의 hashtag를 a tag가 아니라 next의 Link로
    <div>
      {post.split(/(#[^\s]+)/g).map((v) => {
        if (v.match(/#[^\s]+/)) {
          return (
            <Link
              key={v}
              href={{
                pathname: "/hashtag",
                query: { tag: v.slice(1) },
              }}
              as={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
