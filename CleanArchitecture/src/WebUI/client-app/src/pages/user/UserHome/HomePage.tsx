import Post from "../../../components/user/Post";
import PostList from "../../../components/user/PostList";

const HomePage = () => {
  return (
    <div className="w-full bg-main-2">
      <div className="page-container">
        <div className="text-main-4 py-8 flex items-start justify-start gap-10">
          <div className="flex flex-col">
            <Post></Post>
          </div>
          <div className="w-[25%]">
            <PostList
              isImage={false}
              title={{ size: "1.25rem", height: "1.75rem" }}
              content={{ size: "0.8rem", height: "1.25rem" }}
              category={{ size: "0.75rem", height: "1rem" }}
              colorTextContent="#eeeeeeac"
              isContent={false}
            ></PostList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
