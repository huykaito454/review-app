import "./index.scss";
const Loading = () => {
  return (
    <div className="w-full h-[100vh] relative bg-transparent">
      <div className="lds-ellipsis absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
