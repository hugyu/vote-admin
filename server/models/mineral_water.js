const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// const imgLists = ["https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/mineral%20water/binglu.png", "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/mineral%20water/chunyue.png"]
// const nameList=['冰露','纯悦']
// const createTable = async () => {
//   try {
//     //创建表
//     const createTableSql = `
//     create table if not exists mineral_water (
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
//       const insetSql = `insert into mineral_water(id,label,imgUrl) values(null,'${nameList[i]}','${imgLists[i]}')`;
//       await sqlQuery(insetSql);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// createTable();
router.get("/mineral", async (req, res) => {
  const strsql = "select * from mineral_water";
  try {
    const result = await sqlQuery(strsql);
    console.log(result);
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
router.get("/mineral/vote", async (req, res) => {
  const { ticket_count, label } = req.query;
  const strsql = `update mineral_water set ticket_count = ${Number(
    ticket_count
  ) + 1} where label = '${label}'`;
  try {
    await sqlQuery(strsql);
    const strsql2 = "select * from mineral_water";
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
