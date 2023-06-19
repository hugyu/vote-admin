const console = require("console");
const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/itemReq", async (req, res) => {
  const item = Object.keys(req.query);
  const strsql = `select * from ${item[0]}`;
  try {
    const result = await sqlQuery(strsql);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      code: -1,
      message: "失败",
    });
  }
});
module.exports = router;
