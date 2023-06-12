import { SearchOutlined } from "@ant-design/icons";
const Header = () => {
  return (
    <header className="text-main-4 py-4 flex items-center justify-between gap-2 select-none">
      <div className="logo text-3xl font-medium"># reviewforlife</div>
      <div className="menu flex items-center justify-end gap-5 font-medium flex-wrap">
        <span className="cursor-pointer">Computing</span>
        <span className="cursor-pointer">Mobile</span>
        <span className="cursor-pointer">Gaming</span>
        <span className="cursor-pointer">Entertainment</span>
        <span className="cursor-pointer">News</span>
        <span className="cursor-pointer">More</span>
        <SearchOutlined className="cursor-pointer text-main-3" />
      </div>
    </header>
  );
};

export default Header;
