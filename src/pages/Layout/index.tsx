import { Layout, Popconfirm ,Menu} from "antd";
import { LogoutOutlined ,HomeOutlined,
  DiffOutlined,
  EditOutlined} from "@ant-design/icons";
import "./index.scss";
import ShowDataScreen from "../ShowData";
const { Header, Content, Footer, Sider } = Layout;
function LayoutScreen() {
  return (
    <Layout >
      <Header >
        <div className="logo" ></div>
        <div className="user-info">
          <span className="user-name">sca</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={()=>{}}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider style={{ minHeight: "100vh" }} width={200} className="site-layout-background"> <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[]}
            style={{ height: "100%", borderRight: 0 }}
           
          >
            <Menu.Item icon={<HomeOutlined />} key="/home" onClick={()=>{}}>
              数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article" onClick={()=>{}}>
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish" onClick={()=>{}}>
              发布饮品
            </Menu.Item>
          </Menu></Sider>
        <Content className="layout-content" style={{ padding: 20, minHeight: "100vh" }}>
          <ShowDataScreen/>
        </Content>
      </Layout>
    </Layout>
  );
}
export default LayoutScreen;
