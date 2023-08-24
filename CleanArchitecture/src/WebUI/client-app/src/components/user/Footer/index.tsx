import {
  FacebookFilled,
  TwitterOutlined,
  InstagramFilled,
  YoutubeFilled,
  LinkedinFilled,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <footer className="text-main-4 py-12 flex flex-col justify-between gap-6">
      <div className="w-full items-center flex justify-between mb-4">
        <div className="logo text-3xl font-medium">reviewforlife</div>
        <div className="flex items-center gap-4">
          <FacebookFilled className=" cursor-pointer hover:text-main-3 transition-all text-2xl" />
          <TwitterOutlined className=" cursor-pointer hover:text-main-3 transition-all text-2xl" />
          <InstagramFilled className=" cursor-pointer hover:text-main-3 transition-all text-2xl" />
          <YoutubeFilled className=" cursor-pointer hover:text-main-3 transition-all text-2xl" />
          <LinkedinFilled className=" cursor-pointer hover:text-main-3 transition-all text-2xl" />
        </div>
      </div>
      <div className="flex items-start justify-between mb-12">
        <div className="flex flex-col gap-2 w-[30%]">
          Welcome to our website - the place where you can find detailed
          information and unbiased reviews about a wide range of products. With
          a commitment to transparency and honesty, we aim to help you make
          smart and efficient shopping decisions.
        </div>
        <div className="flex flex-col gap-3 border-l pl-6 border-gray-500">
          <span className=" font-medium text-xl text-main-3 mb-1">About</span>
          <span className=" cursor-pointer hover:text-white transition-all">
            About Us
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Advertise
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            FAQ
          </span>
        </div>
        <div className="flex flex-col gap-3 border-l pl-6 border-gray-500">
          <span className=" font-medium text-xl text-main-3 mb-1">
            Sections
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Computing
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Mobile
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Gaming
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Entertainment
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            News
          </span>
        </div>
        <div className="flex flex-col gap-3 border-l pl-6 border-gray-500">
          <span className=" font-medium text-xl text-main-3 mb-1">Support</span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Account Settings
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Make a Donation
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Give a Gift
          </span>
        </div>
        <div className="flex flex-col gap-3 border-l pl-6 border-gray-500">
          <span className=" font-medium text-xl text-main-3 mb-1">More</span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Video
          </span>
          <span className=" cursor-pointer hover:text-white transition-all">
            Sitemap
          </span>
        </div>
      </div>
      <div className="border-b w-full"></div>
      <div className="flex justify-between w-full">
        <div className=" text-sm">© 2023 Review For Life, Inc.</div>
        <div className="flex gap-4 items-center text-sm">
          <span className="hover:text-main-3 cursor-pointer transition-all">
            Contact Us
          </span>
          <span className="hover:text-main-3 cursor-pointer transition-all">
            Terms and Privacy Policy
          </span>
          <span className="hover:text-main-3 cursor-pointer transition-all">
            Do Not Sell or Share My Personal Information
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
