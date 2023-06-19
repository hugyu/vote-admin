const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/query", async (req, res) => {
  const { str } = req.query;
  const strsql = `select * from ${str}`;
  try {
    const result = await sqlQuery(strsql);
    console.log(result);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (error) {
    res.send({
      code: -1,
      message: "失败",
    });
  }
});

module.exports = router;
