const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.post("/addItem", async (req, res) => {
  const { option, label, imgUrl, added } = req.body;
  if (added) {
    const strsql = `create table if not exists  ${option} (
            id int auto_increment,
           label varchar(255) not null,
           imgUrl char(255) not null,
        ticket_count int not null default 0,
           primary key (id)
        ) engine=innodb;`;

    try {
      await sqlQuery(strsql);
      const sql = `insert into choice (id,label) values(null,"${option}")`;
      await sqlQuery(sql);
      const addSql = `insert into ${option} (id,label,imgUrl) values(null,"${label}","${imgUrl}")`;
      const result = await sqlQuery(addSql);
      res.send({
        code: 1,
        message: "添加成功",
        result,
      });
    } catch (error) {
      console.log(error);
      res.send({
        code: -1,
        message: "失败",
      });
    }
  } else {
    const sql = `select * from ${option} `;
    const result = await sqlQuery(sql);
    for (let i = 0; i < result.length; i++) {
      if (result[i].label === label) {
        res.send({
          code: 2,
          message: "重复添加",
        });
        return;
      }
    }

    const addSql = `insert into ${option} (id,label,imgUrl) values(null,"${label}","${imgUrl}")`;
    try {
      await sqlQuery(addSql);
      res.send({
        code: 1,
        message: "添加成功",
      });
    } catch (error) {
      res.send({
        code: -1,
        message: "失败",
      });
      return;
    }
  }
});

module.exports = router;
