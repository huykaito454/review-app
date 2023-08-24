import { Liquid } from "@ant-design/plots";

const LiquidChart = () => {
  const config: any = {
    percent: 0.25,
    height: 150,
    width: 150,
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
    statistic: {
      content: {
        style: {
          fontSize: 16,
        },
      },
    },
  };
  return <Liquid {...config} />;
};

export default LiquidChart;
