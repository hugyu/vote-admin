import {
  Empty,
  Select,
  Table,
  Button,
  message,
  Drawer,
  Form,
  Input,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { http } from "../../common/utils";
import "./index.scss";
export type ResultType = { [key: string]: string | number; id: number };
function HandleData() {
  const [form]=useForm()
  //控制drawer的显示
  const [open, setOpen] = useState(false);
  const showDrawer = (option:ResultType) => {
    setOpen(true);
    setId(option.id);
    for (const [key, value] of Object.entries(option)) {    
      form.setFieldValue(key, value);
    }
  };

  const onClose = () => {
    setOpen(false);
    getOptionResult(item);
  };
  const [data, setData] = useState<Array<ResultType>>([]);
  const [id, setId] = useState<number>();
  const [items, setItems] = useState<Array<string>>();
  // select哪个选中了
  const [item, setItem] = useState<string>("");
  const getOptionResult = async (str: string) => {
    const res = await http.get(`/itemReq?${str}`);
    const result = res.data.result;
    console.log(result);
    setData(result);
  };
  const getItems = async () => {
    const res = await http.get("/choice");
    const result = res.data.result;
    let Items: Array<string> = [];
    result.forEach((result: { label: string }) => {
      Items.push(result.label);
    });
    setItems(Items);
  };
  const handleSelect = (e: string) => {
    getOptionResult(e);
    setItem(e);
  };
  useEffect(() => {
    getItems();
  }, []);
  const deleteItem = async (id: number) => {
    const res = await http.get(`/deleteReq?item=${item}&id=${id}`);
    if (res.data.code === 1) {
      message.success("删除成功", 1);
      getOptionResult(item);
    } else {
      message.error("删除失败", 1);
    }
  };
  const handleSubmit = async (data: { [key: string]: string }) => {
    const newData = { ...data, item, id };
    const res = await http.post(`/changeItem`, newData);
    if (res.data.code === 1) {
      message.success("修改成功", 1);
      getOptionResult(item);
    } else {
      message.error("修改失败", 1);
    }
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
            handleSelect(e);
          }}
          options={items?.map((item: string) => ({ label: item, value: item }))}
        ></Select>
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
                render(_value, option) {
                  return (
                    <Button type={"link"} onClick={() => showDrawer(option)}>
                      编辑
                    </Button>
                  );
                },
              },
              {
                title: "删除",
                key: "删除",
                render(_value, option) {
                  return (
                    <Button type="link" onClick={() => deleteItem(option.id)}>
                      删除
                    </Button>
                  );
                },
              },
            ]}
            dataSource={data}
            pagination={false}
            style={{ height: "200px", textAlign: "center" }}
          />
        ) : (
          <Empty />
        )}
      </div>
      <Drawer
        title="修改饮品信息"
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <Form
          style={{ width: "25em" }}
          form={form}
          layout={"vertical"}
          onFinish={(e: { [key: string]: string }) => {
            handleSubmit(e);
          }}
        >
          <Form.Item
            label={"名称"}
            name={"label"}
            rules={[{ required: true, message: "请输入饮料名" }]}
          >
            <Input placeholder={"请输入饮料名称"} />
          </Form.Item>
          <Form.Item
            label={"imgUrl"}
            name={"imgUrl"}
            rules={[{ required: true, message: "请输入图片地址名" }]}
          >
            <Input placeholder={"请输入图片地址"} />
          </Form.Item>

          <Form.Item>
            <Button
              type={"primary"}
              style={{ width: "5rem" }}
              htmlType={"submit"}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
export default HandleData;
