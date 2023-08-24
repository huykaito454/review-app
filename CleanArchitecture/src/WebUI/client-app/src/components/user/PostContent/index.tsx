import ReactQuill from "react-quill";
import { Avatar, Tooltip } from "antd";
import "./style.scss";
import { Rate } from "antd";
import { EyeOutlined, ShareAltOutlined } from "@ant-design/icons";
const PostContent = (props: any) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 px-[15px]">
        <h1 className=" text-4xl font-semibold">{props.title}</h1>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Avatar
              className="cursor-pointer select-none"
              size="medium"
              src={
                <img
                  src="/images/avatar/e5edf887-fc44-4f21-a743-bd609d1b2624.jpeg"
                  alt="avatar"
                />
              }
            />
            <div className=" flex flex-col gap-1">
              <span className="text-sm font-medium ">Son Tung MTP</span>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <EyeOutlined />
                  <span>1068</span>
                </div>
                <span>June 19, 2023 7:00AM</span>
              </div>
            </div>
          </div>
          <Tooltip
            title="Share this Post!"
            trigger="hover"
            placement="bottom"
            style={{ fontSize: "10px" }}
          >
            <div className="p-2 border-gray-300 flex items-center justify-center border cursor-pointer">
              <ShareAltOutlined />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="border-b pb-6 mb-5"></div>
      <ReactQuill value={props.content} readOnly={true} theme={"bubble"} />
      <div className="w-full flex items-center justify-end gap-2">
        <Rate disabled defaultValue={2.5} />
        <span className="text-xs">2.5/5</span>
      </div>
      <div className="w-full flex items-center justify-start gap-2"></div>
    </div>
  );
};

export default PostContent;
