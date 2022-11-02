import { Empty, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { http } from "../../common/utils";
import Bar from "../../components/Bar";
import "./index.scss";
const { Option } = Select;
function ShowDataScreen() {
  const [data, setData] = useState<any>([]);
  const [eChartData, setEchartData] = useState<any>();
  const [columns, setColumns] = useState<ColumnsType<any>>([
    {
      title: "",
      dataIndex: "ticket_count",
    },
  ]);
  const getOptionResult = async (str: string) => {
    const res = await http.get(`${str}`);
    const result = res.data.result;
    setData(result);
    getColumns(result);
    handleDataSource(result);
    handleEchartsData(result);
  };
  const getColumns = (listData: any[]) => {
    const newColumns: ColumnsType<any> = [
      { title: "", dataIndex: "ticket_count" },
    ];
    listData.map((data, _index) => {
      const object = { title: data["label"], dataIndex: data["label"] };
      if (columns.includes(object)) return;
      newColumns.push(object);
    });
    setColumns(newColumns);
  };
  const handleDataSource = (listData: any[]) => {
    const object = { ticket_count: "ticket_count" };
    listData.map((data, _index) => {
      const label = data["label"];
      const ticket_count = data["ticket_count"];
      // @ts-ignore
      object[label] = ticket_count;
    });
    setData([object]);
  };
  const handleEchartsData = (dataList: { [x: string]: number }[]) => {
    console.log("handleEchartsData");

    const xData: Array<string> = [];
    const yData: Array<number> = [];
    dataList.forEach((data: any) => {
      xData.push(data["label"]);
      yData.push(data["ticket_count"]);
    });
    setEchartData([xData, yData]);

    return [xData, yData];
  };
  return (
    <div className="screenContainer">
      <div className="headerContainer">
        <h2>T公司饮品数据展示</h2>
      </div>
      <div className="selectContainer">
        <div className="info">请选择饮品种类:</div>
        <Select
          style={{ width: "100%" }}
          onSelect={(e: string) => {
            getOptionResult(e);
          }}
        >
          <Option value="mineral">矿泉水</Option>
          <Option value="pure_milk">牛奶</Option>
          <Option value="drinks">饮料</Option>
          <Option value="yoghurt">酸奶</Option>
        </Select>
      </div>
      <div
        className="table-container"
        style={{ marginTop: `${data.length > 0 ? "30px" : "90px"}` }}
      >
        {data.length > 0 ? (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            style={{ height: "200px" }}
          />
        ) : (
          <Empty />
        )}
      </div>
      <div className="echartContainer">
        {data.length > 0 && (
          <Bar
            style={{ width: "500px", height: "400px", margin: "0 auto" }}
            xData={eChartData[0]}
            sData={eChartData[1]}
            title="用户投票情况"
          />
        )}
      </div>
    </div>
  );
}
export default ShowDataScreen;
