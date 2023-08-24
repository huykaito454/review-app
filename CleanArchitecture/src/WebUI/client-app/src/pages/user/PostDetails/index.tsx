import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetPostQuery, PostClient } from "../../../services/web-api-client";
import ReactQuill from "react-quill";
import PostContent from "../../../components/user/PostContent";

const PostDetails = () => {
  let { category, post } = useParams();
  const [posts, setPosts] = useState<any>(null);
  useEffect(() => {
    if (!posts) {
      handleGetPost();
    }
  }, []);
  const handleGetPost = async () => {
    try {
      const client = new PostClient();
      const data = new GetPostQuery();
      data.path = `${category}/${post}`;
      const rs = await client.getPost(data);
      if (rs) {
        setPosts(rs);
      } else {
      }
    } catch (error) {}
  };
  return (
    <div className="page-container pt-12 pb-44 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 w-[55%] px-[15px] font-semibold text-xs mb-5 uppercase text-main-3">
        <span>Home</span>
        <span>Entertainment</span>
        <span>New</span>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[55%]">
          {posts && (
            <PostContent
              content={posts.content}
              title={posts.title}
            ></PostContent>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
