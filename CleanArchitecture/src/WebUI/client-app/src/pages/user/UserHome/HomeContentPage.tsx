import PostList from "../../../components/user/PostList";
const HomeContentPage = () => {
  return (
    <div className="page-container pt-12 pb-44">
      <div className="w-[70%]">
        <PostList></PostList>
      </div>
      <button className=" bg-main-5 w-[70%] hover:bg-gray-100 transition-all py-5 flex items-center justify-center border">
        <span>Load More</span>
      </button>
    </div>
  );
};

export default HomeContentPage;
