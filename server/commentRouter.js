const express = require('express');
const commentRouter = express.Router();

const db = require("./db.js");

//댓글조회
//쿼리형태로 받음
commentRouter.get("/",async(request,response)=>{
    let data = request.query.bno;
    let result = await db.connection('commentList',data);
    response.send(result);
  })

  module.exports = commentRouter;