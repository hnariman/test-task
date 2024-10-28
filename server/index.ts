import express, { RequestHandler } from "express";
import { json as bodyParserJson } from "body-parser";
import { dbClient } from "./db";
import { serverAPIPort, APIPath } from "@fed-exam/config";

console.log("starting server", { serverAPIPort, APIPath });

const app = express();

const db = dbClient({ filePath: "./data.sqlite" });

app.use(bodyParserJson());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("ok");
});

app.get(APIPath, async (req, res) => {
  const { searchText } = req.query;
  const data = searchText
    ? await db.getTicketsWithSearch(searchText as string)
    : await db.getTickets();
  res.json(data);
});

app.listen(serverAPIPort);
console.log("server running", serverAPIPort);
