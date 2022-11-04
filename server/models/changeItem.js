const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.post("/changeItem", async (req, res) => {
  const {  label, imgUrl,item,id } = req.body;
    const sql = `update ${item} set label='${label}' , imgUrl = '${imgUrl}' where id = ${id} `
    try {
        const result = await sqlQuery(sql);
        res.send({
            code: 1,
            message:'修改成功',
            result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            code: -1,
            message:'修改失败',
        })
    }
});

module.exports = router;
