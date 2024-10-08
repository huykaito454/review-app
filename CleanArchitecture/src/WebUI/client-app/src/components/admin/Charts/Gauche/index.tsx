import { Gauge } from "@ant-design/plots";

const GaugeMonitor = () => {
  const config: any = {
    percent: 0.75,
    type: "meter",
    height: 187,
    width: 187,
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: 16,
          lineHeight: "36px",
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export default GaugeMonitor;
