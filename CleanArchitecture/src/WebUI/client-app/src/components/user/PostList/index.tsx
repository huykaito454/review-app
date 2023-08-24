import Post from "../../../components/user/Post";
const PostList = ({
  width = "320px",
  wrapper = "100%",
  type = "row",
  height = "180px",
  title = { size: "1.5rem", height: "1.8rem" },
  content = { size: "0.875rem", height: "1.25rem" },
  category = { size: "0.875rem", height: "1.25rem" },
  isImage = true,
  colorTextContent = "#565656",
  isContent = true,
  isAuthor = true,
  isRate = false,
  gap = "24px",
}: any) => {
  const posts = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col gap-6">
      {posts.map((_item: any, index: any) => (
        <div key={index} className="w-full last:border-b-0 border-b pb-6 ">
          <Post
            colorTextContent={colorTextContent}
            wrapper={wrapper}
            height={height}
            width={width}
            title={title}
            content={content}
            isImage={isImage}
            type={type}
            isContent={isContent}
            gap={gap}
            isAuthor={isAuthor}
            category={category}
            isRate={isRate}
          ></Post>
        </div>
      ))}
    </div>
  );
};

export default PostList;
