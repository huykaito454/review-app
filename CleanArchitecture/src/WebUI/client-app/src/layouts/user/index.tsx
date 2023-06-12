import { Outlet } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const UserLayout = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-main-1 fixed z-50">
        <div className="page-container shadow">
          <Header></Header>
        </div>
      </div>
      <div className="pt-[68px]">
        <Outlet></Outlet>
      </div>
      <div className="w-full bg-main-2">
        <div className="page-container">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
