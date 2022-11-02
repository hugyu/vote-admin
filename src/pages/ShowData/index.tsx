import { Select } from "antd";
import { useState } from "react";
import { http } from "../../common/utils";
import "./index.scss";
const { Option } = Select;
function ShowDataScreen() {
    const [data,setData]=useState()
    const getOptionResult = async (str:string) => {
        const res = await http.get(`${str}`)
        setData(res.data.result)
    }
  return (
    <div className="screenContainer">
      <div className="headerContainer">
        <h2>T公司饮品数据展示</h2>
      </div>
      <div className="selectContainer">
        <div className="info">请选择饮品种类:</div>
        <Select style={{ width: "100%" }} onSelect={(e: string)=>{getOptionResult(e);
        }}>
          <Option value="mineral">矿泉水</Option>
          <Option value="pure_milk">牛奶</Option>
          <Option value="drinks">饮料</Option>
          <Option value="yoghurt">酸奶</Option>
        </Select>
      </div>
      <div className="table-container">
        
      </div>
    </div>
  );
}
export default ShowDataScreen;
