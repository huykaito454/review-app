import { Card } from "antd";
import ColumnChart from "../../../components/admin/Charts/ColumnChart";
import PieChart from "../../../components/admin/Charts/PieChart";
import RingProgressChart from "../../../components/admin/Charts/RingProgressChart";
import LiquidChart from "../../../components/admin/Charts/LiquidChart";
import WorldChart from "../../../components/admin/Charts/WorldChart";
const AdminDashboard = () => {
  return (
    <div className="flex items-start flex-col gap-4 w-full h-full">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-1/2">
          <Card title="Progress">
            <div className="w-full flex items-center justify-between">
              <RingProgressChart
                color={["#fab120", "#E8EDF3"]}
              ></RingProgressChart>
              <RingProgressChart
                color={["#3ac563", "#E8EDF3"]}
              ></RingProgressChart>
              <RingProgressChart
                color={["#5b8ff9", "#E8EDF3"]}
              ></RingProgressChart>
            </div>
          </Card>
        </div>
        <div className="w-1/4">
          <Card title="Liquid">
            <LiquidChart></LiquidChart>
          </Card>
        </div>
        <div className="w-1/4">
          <Card title="Trending">
            <WorldChart></WorldChart>
          </Card>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-1/2">
          <Card title="Column Chart">
            <ColumnChart></ColumnChart>
          </Card>
        </div>
        <div className="w-1/2">
          <Card title="Pie Chart">
            <PieChart></PieChart>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
