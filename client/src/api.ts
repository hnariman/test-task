import axios from "axios";
import { APIRootPath } from "@fed-exam/config";
export interface TicketDto {
  id: string;
  title: string;
  content: string;
  creationTime: number;
  userEmail: string;
  labels?: string[];
}

export type ApiClient = {
  getTickets: () => Promise<TicketDto[]>;
};

export const createApiClient = (): ApiClient => {
  return {
    getTickets: () => {
      return axios.get(APIRootPath).then((res) => res.data);
    },
  };
};
