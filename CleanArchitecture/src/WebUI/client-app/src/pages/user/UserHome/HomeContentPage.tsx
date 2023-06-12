import PostBox from "../../../components/user/PostBox";
import PostList from "../../../components/user/PostList";
const HomeContentPage = () => {
  return (
    <div className="page-container pt-12 pb-44">
      <h1 className="font-semibold text-2xl pb-6">LATEST STORIES </h1>
      <div className="w-full flex items-start justify-between gap-4">
        <div className="w-[70%]">
          <PostList isRate={true}></PostList>
          <button className=" bg-main-5 w-full hover:bg-gray-100 transition-all py-5 flex items-center justify-center border">
            <span>Load More</span>
          </button>
        </div>
        <div className="w-[25%]">
          <PostBox></PostBox>
        </div>
      </div>
    </div>
  );
};

export default HomeContentPage;
