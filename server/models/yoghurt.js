const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
// const imgLists = [
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/caomei.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/hetao.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/huangtao%20.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/lanmei.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/luhui.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/yanmai.png",
//   "https://serverless-project-static-files-hgy.oss-cn-hangzhou.aliyuncs.com/exsercise/yoghurt/yeguo.png"
// ];
// const nameList=['草莓','核桃','黄桃','蓝莓','芦荟','燕麦','椰果']
// const createTable = async () => {
//   try {
//     //创建表
//     const createTableSql = `
//     create table if not exists yoghurt (
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
//       const insetSql = `insert into yoghurt(id,label,imgUrl) values(null,'${nameList[i]}','${imgLists[i]}')`;
//       await sqlQuery(insetSql);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// createTable();
router.get("/yoghurt", async (req, res) => {
  const strsql = "select * from yoghurt";
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
router.get("/yoghurt/vote", async (req, res) => {
  const { ticket_count, label } = req.query;
  const strsql = `update yoghurt set ticket_count = ${Number(ticket_count) +
    1} where label = '${label}'`;
  try {
    await sqlQuery(strsql);
    const strsql2 = "select * from yoghurt"
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
