const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// post请求req.query是拿不到数据的 要在req.body
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { userPhone, nickName, password } = req.body;
    const createTableSql = `
        create table if not exists user (
            id int auto_increment not null,
            userPhone char(11) not null,
            password char(10) not null,
            nickName char(50) not null,
            primary key (id)
        ) engine=innodb;
        `;
    await sqlQuery(createTableSql);
    // 查询表中是否有手机号
    const sqlStr = `select userPhone from user where userPhone =${userPhone}`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      //有对应的手机号 走登录流程
      const sqlStr2 = `select nickName,password from user where userPhone =${userPhone}`;
      const userInfoRes = await sqlQuery(sqlStr2);
      if (userInfoRes.length && userInfoRes[0].password === password &&userInfoRes[0].nickName === "admin") {
        //登录成功
        // if (nickName !== userPhone[0]["nickName"]) {
        //   //如果nickName不一致 就更新nickName
        //   const updateNickNameSql = `update user set nickName='${nickName}' where userPhone = ${userPhone}`;
        //   await sqlQuery(updateNickNameSql);
        // }
        res.send({
          code: 1,
          message: "登录成功",
          result: {
            nickName,
            userPhone
            },
          admin:true
        });
      } else if (
        userInfoRes.length &&
        userInfoRes[0].password === password 
      ) {
        res.send({
          code: 1,
          message: "登录成功",
          result: {
            nickName,
            userPhone
          },
        });
      } else {
        //登录失败
        res.send({
          code: 1,
          message: "手机号码或密码错误"
        });
      }
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
