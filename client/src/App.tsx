import React, { useCallback } from "react";
import styles from "./App.module.scss";
import { createApiClient, TicketDto } from "./api";
import { Ticket } from "./Ticket";
import Spinner from "./components/spinner/Spinner";
import Input from "./components/input/Input";

export type AppState = {
  tickets?: TicketDto[];
  search: string;
  filteredTickets?: TicketDto[];
};

const api = createApiClient();
function RenderTickets(filteredTickets: TicketDto[]) {
  return (
    <ul className={styles.tickets}>
      {filteredTickets.map((ticket) => (
        <li key={ticket.id}>
          <Ticket ticket={ticket} />
        </li>
      ))}
    </ul>
  );
}

export const App: React.FC<{}> = () => {
  const [search, setSearch] = React.useState("");
  const [tickets, setTickets] = React.useState<TicketDto[]>();
  const searchDebounce = React.useRef<any>(null);

  const getTicket = useCallback(
    (searchText?: string) => api.getTickets(searchText).then(setTickets), []);

  React.useEffect(() => { getTicket() }, [getTicket]);


  const onSearch = async (val: string) => {
    setSearch(val);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(async (ticket: string) => {
      getTicket(val);
    }, 300);
  };

  return (
    <main>
      <h1>Tickets List</h1>
      <header className={styles.header}>
        <Input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          autoFocus
        />
      </header>
      {tickets ? (
        <div className={styles.results}>
          Showing {tickets.length} results
        </div>
      ) : null}
      {tickets ? RenderTickets(tickets) : <Spinner />}
    </main>
  );
};

export default App;
