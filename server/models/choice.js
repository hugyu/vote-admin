const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/choice", async (req, res) => {
  const strsql = "select * from choice";
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
// router.get("/drinks/vote", async (req, res) => {
//   const { ticket_count, label } = req.query;
//   const strsql = `update drinks set ticket_count = ${Number(ticket_count) +
//     1} where label = '${label}'`;
  
//   try {
//     await sqlQuery(strsql);
//     const strsql2 = "select * from drinks";
//     const result = await sqlQuery(strsql2);
//     console.log(result);
//     res.send({
//       code: 1, 
//       message: "请求成功",
//       result
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       code: -1,
//       message: "失败"
//     });
//   }
// });
module.exports = router;
