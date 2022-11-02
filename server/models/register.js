const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// post请求req.query是拿不到数据的 要在req.body
router.post("/register", async (req, res) => {
  try {
    
    const { userPhone, nickName, password } = req.body;
    // 查询表中是否有手机号
    const sqlStr = `select userPhone from user where userPhone =${userPhone}`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      //有对应的手机号 注册失败
      res.send({
        code: -2,
        message: "手机号已被注册"
      });
    } else {
      //没有手机号 走注册流程
      const insertUser = `insert into user (userPhone,nickName,password) values("${userPhone}","${nickName}","${password}")`;
      await sqlQuery(insertUser);
      res.send({
        code: 1,
        message: "注册成功",
        result:{
          nickName,
          userPhone
        }
      });
    }
  } catch (err) {
    res.send({
      code: -1,
      message: "请求失败",
      result: err
    });
  }
});
module.exports = router;
