const console = require("console");
const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/deleteReq", async (req, res) => {
  const { item, id } = req.query;
  const strsql=`delete from ${item} where id = ${id}`;
  try { 
    const result = await sqlQuery(strsql);
    res.send({
      code: 1,
      message: "请求成功", 
      result
    });
  } catch (error) {
    console.log(error)
      
      res.send({
      code: -1,
      message: "失败"
    });
  }
});
module.exports = router;
