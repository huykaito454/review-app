import PostList from "../PostList";

const PostBox = ({
  titleBox = "Latest Posts",
  width = "70px",
  height = "70px",
  title = { size: "0.9rem", height: "1.2rem" },
  category = { size: "0.75rem", height: "1rem" },
  colorTextContent = "#000000",
  gap = "12px",
  isContent = false,
  isAuthor = false,
  isRate = true,
}: any) => {
  return (
    <div className="w-full rounded-md bg-main-6 flex flex-col items-start gap-4 p-5 text-black">
      <div className="w-full text-center font-semibold text-lg uppercase pb-2">
        {titleBox}
      </div>
      <PostList
        title={title}
        colorTextContent={colorTextContent}
        isContent={isContent}
        height={height}
        width={width}
        gap={gap}
        isAuthor={isAuthor}
        category={category}
        isRate={isRate}
      ></PostList>
    </div>
  );
};

export default PostBox;
