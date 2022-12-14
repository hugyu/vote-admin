import { Empty, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { http } from "../../common/utils";
import Bar from "../../components/Bar";
import { ResultType } from "../HandleData";
import "./index.scss";
const { Option } = Select;
function ShowDataScreen() {
  const [data, setData] = useState<Array<Omit<ResultType, "id">>>([]);
  const [eChartData, setEchartData] = useState<Array<any>>([]);
  const [columns, setColumns] = useState<ColumnsType<{}>>([
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
  const getColumns = (listData: Array<ResultType>) => {
    const newColumns: ColumnsType<{ [key: string]: string }> = [
      { title: "", dataIndex: "ticket_count" },
    ];
    listData.forEach((data, _index) => {
      const object = { title: data["label"], dataIndex: data["label"] };
      if (columns.includes(object)) return;
      newColumns.push(object);
    });
    setColumns(newColumns);
  };
  const handleDataSource = (listData: Array<ResultType>) => {
    const object = { ticket_count: "ticket_count" };
    listData.forEach((data, _index) => {
      const label = data["label"];
      const ticket_count = data["ticket_count"];
      // @ts-ignore
      object[label] = ticket_count;
    });
    setData([object]);
  };
  const handleEchartsData = (
    dataList: { label: string; ticket_count: number }[]
  ) => {
    console.log("handleEchartsData");

    const xData: Array<string> = [];
    const yData: Array<number> = [];
    dataList.forEach((data: { label: string; ticket_count: number }) => {
      xData.push(data["label"]);
      yData.push(data["ticket_count"]);
    });
    setEchartData([xData, yData]);

    return [xData, yData];
  };

  return (
    <div className="screenContainer">
      <div className="headerContainer">
        <h2>T????????????????????????</h2>
      </div>
      <div className="selectContainer">
        <div className="info">?????????????????????:</div>
        <Select
          style={{ width: "100%" }}
          onSelect={(e: string) => {
            getOptionResult(e);
          }}
        >
          <Option value="mineral">?????????</Option>
          <Option value="pure_milk">??????</Option>
          <Option value="drinks">??????</Option>
          <Option value="yoghurt">??????</Option>
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
            title="??????????????????"
          />
        )}
      </div>
    </div>
  );
}
export default ShowDataScreen;
