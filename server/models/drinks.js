const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
// const imgLists = [
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/fenda.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/guozhi.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/meizhiyuan.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/neneliang1.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/shuidongle.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/drinks/yangguang.png",
// ];
// const nameList=['芬达','大红袍','美汁源','能量饮料','水动乐','阳光柠檬']
// const createTable = async () => {
//   try {
//     //创建表
//     const createTableSql = `
//     create table if not exists drinks (
//         id int auto_increment,
//         label varchar(255) not null,
//         imgUrl char(255) not null,
//         ticket_count int not null default 0,
//         primary key (id)
//     ) engine=innodb;
//     `;
//     await sqlQuery(createTableSql);
//     //向表中插入图片
//     for (let i = 0; i < imgLists.length; i++) {
//       const insetSql = `insert into drinks(id,label,imgUrl) values(null,'${nameList[i]}','${imgLists[i]}')`;
//       await sqlQuery(insetSql);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// createTable();
router.get("/drinks", async (req, res) => {
  const strsql = "select * from drinks";
  try {
    const result = await sqlQuery(strsql);
    res.send({
      code: 1,
      message: "请求成功",
      result
    });
  } catch (error) {
    res.send({
      code: -1,
      message: "失败"
    });
  }
});
router.get("/drinks/vote", async (req, res) => {
  const { ticket_count, label } = req.query;
  const strsql = `update drinks set ticket_count = ${Number(ticket_count) +
    1} where label = '${label}'`;
  
  try {
    await sqlQuery(strsql);
    const strsql2 = "select * from drinks";
    const result = await sqlQuery(strsql2);
    console.log(result);
    res.send({
      code: 1, 
      message: "请求成功",
      result
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: -1,
      message: "失败"
    });
  }
});
module.exports = router;
