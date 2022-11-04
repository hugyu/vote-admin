import {
  Button,
  Divider,
  Form,
  Input,
  InputRef,
  message,
  Select,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { http } from "../../common/utils";
function AddData() {
  const [items, setItems] = useState<Array<string>>([]);
  const [name, setName] = useState("");
  const [addCount, setAddCount] = useState(1);
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (addCount === 1) {
      if (name !== "" && !items.includes(name)) {
        setItems([...items, name]);
      }
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      setAddCount((pre) => pre - 1);
    } else {
      return;
    }
  };
  const getOptionResult = async () => {
    const res = await http.get("/choice");
    const result = res.data.result;
    let Items: Array<string> = [];
    result.forEach((result: { label: string }) => {
      Items.push(result.label);
    });
    setItems(Items);
  };

  const handleSubmit = async (data: { [key: string]: string }) => {
    const newData = { ...data, added: addCount === 1 ? false : true };
    const res = await http.post("/addItem", newData);
    if (res.data.code === 1) {
      message.success("添加成功", 1);
    } else if (res.data.code === 2) {
      message.warning("重复添加", 1);
    } else {
      message.error("添加失败", 1);
    }
  };
  useEffect(() => {
    getOptionResult();
  }, []);
  return (
    <div className="container">
      <h1>添加饮品</h1>
      <Form
        style={{ width: "25em" }}
        layout={"vertical"}
        onFinish={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Item
          label={"类别"}
          name={"option"}
          rules={[{ required: true, message: "请选择饮料类别" }]}
        >
          <Select
            placeholder="请选择类别"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="请输入类别"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    添加类别
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
          />
        </Form.Item>
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
    </div>
  );
}
export default AddData;
