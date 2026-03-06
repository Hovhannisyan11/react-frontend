import React from "react";
import img1_2x from "../pictures/nature1@2x.png";
import img2_2x from "../pictures/nature2@2x.png";
import img3_2x from "../pictures/nature3@2x.png";

function PostCard({ posts, onPostClick }) {
  const images = {
    1: img1_2x,
    2: img2_2x,
    3: img3_2x,
    4: img1_2x,
    5: img2_2x,
    6: img3_2x,
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post" onClick={() => onPostClick(post)}>
          <img src={images[post.id]} alt={post.title} />
          <h3>{post.title}</h3>
          <p>
            {post.body.length > 100
              ? post.body.slice(0, 100) + "..."
              : post.body}
          </p>
          <small>Post ID: {post.id}</small>
        </div>
      ))}
    </>
  );
}

export default PostCard;
