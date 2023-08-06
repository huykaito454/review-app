import { Card } from "antd";
import MapChart from "../../../components/admin/Charts/MapChart";
import RingDiagramChart from "../../../components/admin/Charts/RingDiagramChart";
import GaugeMonitor from "../../../components/admin/Charts/Gauche";

const AdminMonitor = () => {
  return (
    <div className="flex items-start flex-col gap-4 page-admin">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-2/3 h-[600px]">
          <Card
            title="United State Map"
            className="w-full h-full"
            bodyStyle={{
              width: "100%",
              height: "100%",
              paddingBottom: "60px",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingLeft: "5px",
            }}
          >
            <MapChart></MapChart>
          </Card>
        </div>
        <div className="w-1/3 h-[600px] flex flex-col gap-4 justify-between">
          <Card title="Monitor">
            <GaugeMonitor></GaugeMonitor>
          </Card>
          <Card title="RingDiagram Chart">
            <RingDiagramChart></RingDiagramChart>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMonitor;
