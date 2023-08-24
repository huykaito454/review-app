import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="text-main-4 flex items-center justify-between gap-2 select-none">
      <div
        className="logo text-3xl font-medium cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        reviewforlife
      </div>
      <ul className="menu flex items-center justify-end gap-5  font-medium flex-wrap">
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all ">
          Computing
        </li>
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all">
          Mobile
        </li>
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all">
          Gaming
        </li>
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all">
          Entertainment
        </li>
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all">
          News
        </li>
        <li className="cursor-pointer py-5 border-y-4 border-main-1 hover:border-b-main-3 transition-all">
          More
        </li>
        <SearchOutlined className="cursor-pointer text-main-3" />
      </ul>
    </header>
  );
};

export default Header;
