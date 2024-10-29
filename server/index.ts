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

app.get("/", (_, res) => {
  res.send("ok");
});

app.get(APIPath, async (req, res) => {
  const searchText = req.query.searchText as string;
  const page = Number(req.query?.page) || 0;
  const limit = Number(req.query?.limit) || 2;

  const data = searchText
    ? await db.getTicketsWithSearch({ searchText, limit, page })
    : await db.getTickets({ limit, page });
  res.json(data);
});

app.listen(serverAPIPort);
console.log("server running", serverAPIPort);
