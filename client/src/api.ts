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
  getTickets: (searchText?: string) => Promise<TicketDto[]>;
};

export const createApiClient = (): ApiClient => {
  return {
    getTickets: (searchText?: string) => {
      return axios.get(APIRootPath, { params: { searchText } }).then((res) => res.data);
    },
  };
};
