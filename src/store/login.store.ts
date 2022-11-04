import { makeAutoObservable } from "mobx";
import { clearToken, getToken, setToken } from "../common/token";

import { http } from "../common/utils";

class LoginStore {
  token = getToken() || "";
  constructor() {
    makeAutoObservable(this);
  }

  //登录
  login = async ({ mobile, code }: { mobile: string; code: string }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    //   console.log(res.data.data)
    this.token = res.data.data.token;
    setToken(this.token);
  };

  loginOut = () => {
    this.token = "";
    clearToken();
  };
}
export default LoginStore;
