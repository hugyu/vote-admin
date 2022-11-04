import { Layout, Popconfirm, Menu } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store";
type VisibleType = { [key: string]: boolean };
const { Header, Content, Sider } = Layout;
const { Item } = Menu;
function LayoutScreen() {
  //设置状态 管理是否显示
  const [visible, setVisible] = useState<VisibleType>({
    "/home": false,
    "/article": false,
    "/publish": false,
  });
  const handleSelect = (e: { key: string }) => {
    console.log(e);

    setVisible((prev: VisibleType) => {
      if (prev[e.key]) return prev;
      return { ...visible, [e.key]: true };
    });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { userStore, loginStore } = useStore();

  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname;
  const onLogout = () => {
    loginStore.loginOut();
    navigate("/login");
  };
  useEffect(() => {
    try {
      userStore.getUserInfo();
    } catch {}
  }, [userStore]);
  return (
    <Layout>
      <Header>
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">
            {userStore.userInfo ? userStore.userInfo : "用户"}
          </span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider
          style={{ minHeight: "100vh" }}
          width={200}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            theme="dark"
            style={{ height: "100%", borderRight: 0 }}
            selectedKeys={[selectedKey]}
          >
            <Item
              icon={<HomeOutlined />}
              key="/showData"
              onClick={handleSelect}
            >
              <Link to="/showData">数据概览</Link>
            </Item>
            <Item
              icon={<DiffOutlined />}
              key="/handleData"
              onClick={handleSelect}
            >
              <Link to="/handleData"> 内容管理</Link>
            </Item>
            <Item
              icon={<EditOutlined />}
              key="/deleteData"
              onClick={handleSelect}
            >
              <Link to="/addData">发布饮品</Link>
            </Item>
          </Menu>
        </Sider>
        <Content
          className="layout-content"
          style={{ padding: 20, minHeight: "100vh" }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
export default LayoutScreen;
