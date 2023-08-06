import { Avatar } from "antd";
import { Rate } from "antd";
const Post = ({
  width = "640px",
  wrapper = "640px",
  type = "column",
  height = "360px",
  gap = "24px",
  title = { size: "1.875rem", height: "2.25rem" },
  content = { size: "0.875rem", height: "1.25rem" },
  category = { size: "0.875rem", height: "1.25rem" },
  isImage = true,
  isContent = true,
  colorTextContent = "#eeeeeeac",
  isAuthor = true,
  isRate = false,
}: any) => {
  const styleWrapper = { width: wrapper, flexDirection: type, gap: gap };
  const styleImage = { width: width, height: height };
  const styleTitle = { fontSize: title.size, lineHeight: title.height };
  const styleContent = { fontSize: content.size, lineHeight: content.height };
  const styleTextContent = { color: colorTextContent };
  const styleTextCategory = {
    fontSize: category.size,
    lineHeight: category.height,
  };
  return (
    <div className="flex cursor-pointer" style={styleWrapper}>
      {isImage && (
        <img
          className="object-cover select-none"
          src="https://images4.alphacoders.com/123/1238664.jpg"
          alt=""
          style={styleImage}
        />
      )}
      <div>
        <div className="flex flex-col gap-1">
          <span
            className="uppercase text-main-3 font-semibold text-sm"
            style={styleTextCategory}
          >
            Review
          </span>
          <span className="font-medium" style={styleTitle}>
            South Korean K-pop star IU accused of plagiarising songs
          </span>
          <div style={styleTextContent}>
            {isContent && (
              <div className="font-normal mb-2" style={styleContent}>
                South Korean K-pop star IU accused of plagiarising songs, warns
                of legal action over ‘baseless’ rumours
              </div>
            )}
            <div className="flex items-center gap-2">
              {isAuthor && (
                <Avatar
                  className="cursor-pointer select-none"
                  size="small"
                  src={
                    <img
                      src="/images/avatar/e5edf887-fc44-4f21-a743-bd609d1b2624.jpeg"
                      alt="avatar"
                    />
                  }
                />
              )}

              <div className="flex items-center gap-3">
                {isAuthor && (
                  <span className="font-light" style={styleContent}>
                    By SonTung MTP, 7 minutes ago
                  </span>
                )}
                {isRate && <Rate disabled defaultValue={2.5} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
