import { RingProgress } from "@ant-design/plots";

const RingProgressChart = (props: any) => {
  const config: any = {
    height: 150,
    width: 150,
    autoFit: false,
    percent: 0.7,
    color: props.color,
  };
  return <RingProgress {...config} />;
};

export default RingProgressChart;
