import { Empty, Select, Table, Button } from "antd";
import { useState } from "react";
import { http } from "../../common/utils";
import "./index.scss";
const { Option } = Select;

function HandleData() {
  const [data, setData] = useState<any>([]);

  const getOptionResult = async (str: string) => {
    const res = await http.get(`${str}`);
    const result = res.data.result;
    console.log(result);
    setData(result);
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
            columns={[
              { title: "种类", dataIndex: "label", key: "种类" },
              {
                title: "修改",
                key: "修改",
                render(value, item) {
                  return (
                    <Button type={"link"} onClick={() => {}}>
                      编辑
                    </Button>
                  );
                },
              },
              {
                title: "删除",
                key: "删除",
                render(value, item) {
                  return <Button type="link">删除</Button>;
                },
              },
            ]}
            dataSource={data}
            pagination={false}
            style={{ height: "200px",textAlign:'center', }}
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
export default HandleData;
