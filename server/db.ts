import { TicketDto } from "../client/src/api";
import Knex from "knex";

export interface DbClient {
  getTickets: () => Promise<TicketDto[]>;
  getTicketsWithSearch: (text: string) => Promise<TicketDto[]>;
}

export const dbClient = (opts: { filePath: string }): DbClient => {
  const knex = Knex({
    client: "sqlite3",
    connection: {
      filename: opts.filePath,
    },
  });
  knex
    .raw(
      `CREATE TABLE IF NOT EXISTS 'data' (
    id TEXT,
    title TEXT,
    content TEXT,
    userEmail TEXT,
    creationTime INTEGER,
    labels TEXT);`
    )
    .then(() => void 0);
  return {
    getTickets(): Promise<TicketDto[]> {
      // If you are unfamiliar with knex, you can uncomment the next line and use raw sql in your code
      // return knex.raw('select * from data limit 20');
      return knex("data").select().limit(20);
    },
    async getTicketsWithSearch(text: string): Promise<TicketDto[]> {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000));
      return knex("data")
        .whereLike("title", `%${text}%`)
        .orWhereLike("content", `%${text}`)
        .limit(20);
    },
  };
};
