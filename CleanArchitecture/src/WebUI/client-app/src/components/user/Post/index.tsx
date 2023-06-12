import { Avatar } from "antd";
const Post = ({
  width = "640px",
  wrapper = "640px",
  type = "column",
  height = "360px",
  title = { size: "1.875rem", height: "2.25rem" },
  content = { size: "0.875rem", height: "1.25rem" },
  isImage = true,
  isContent = true,
  colorTextContent = "#eeeeeeac",
}: any) => {
  const styleWrapper = { width: wrapper, flexDirection: type };
  const styleImage = { width: width, height: height };
  const styleTitle = { fontSize: title.size, lineHeight: title.height };
  const styleContent = { fontSize: content.size, lineHeight: content.height };
  const styleTextContent = { color: colorTextContent };
  return (
    <div className="flex gap-6 cursor-pointer" style={styleWrapper}>
      {isImage && (
        <img
          className="object-cover select-none"
          src="https://images4.alphacoders.com/123/1238664.jpg"
          alt=""
          style={styleImage}
        />
      )}
      <div>
        <div className="flex flex-col gap-2 ">
          <span className="font-medium" style={styleTitle}>
            South Korean K-pop star IU accused of plagiarising songs, over
            ‘baseless’ rumours
          </span>
          <div style={styleTextContent}>
            {isContent && (
              <span className="font-normal mb-2" style={styleContent}>
                South Korean K-pop star IU accused of plagiarising songs, warns
                of legal action over ‘baseless’ rumours
              </span>
            )}
            <div className="flex items-center gap-2">
              <Avatar
                className="cursor-pointer select-none"
                size="small"
                src={
                  <img
                    src="https://yt3.googleusercontent.com/mm2-5anuZ6ghmK2zL6QM7wciD6kuupOfOagiAh5vZE1hx9tRhKEXTAExZUUY4PVq2RSw9jBpBQ=s900-c-k-c0x00ffffff-no-rj"
                    alt="avatar"
                  />
                }
              />
              <span className="font-light" style={styleContent}>
                By SonTung MTP, 7 minutes ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
