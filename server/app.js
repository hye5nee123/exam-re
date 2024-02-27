require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
const comRouter = require("./commentRouter.js");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({ extended: false }));
//라우팅 분할해서 작성가능
app.use("/commnets", comRouter);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");
// REST API 기준

//기능은 함수로 따로 분리해서 작성
//전체조회
app.get("/boards", async (request, response) => {
  let result = await db.connection("boardList");
  response.send(result);
});

//단건조회
app.get("/boards/:bno", async (request, response) => {
  let data = request.params.bno;
  let result = (await db.connection("boardInfo", data))[0];
  response.send(result);
});

//등록 : post => body
app.post("/boards", async (request, response) => {
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection("board", "boardInsert", data);
  response.send(result);
});

//수정 : put => body
app.put("/boards/:bno", async (request, response) => {
  let data = [request.body.param, request.params.bno];
  let result = await db.connection("board", "boardUpdate", data);
  response.send(result);
});

//아...
