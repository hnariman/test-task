import React from "react";
import styles from "./App.module.scss";
import { createApiClient, TicketDto } from "./api";
import { Ticket } from "./Ticket";
import Spinner from "./components/Spinner";
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
  const [filteredTickets, setFilteredTickets] = React.useState<TicketDto[]>();
  const searchDebounce = React.useRef<any>(null);

  React.useEffect(() => {
    api.getTickets().then((tickets) => {
      setTickets(tickets);
      setFilteredTickets(tickets);
    });
  }, []);


  const onSearch = async (val: string) => {
    setSearch(val);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(async () => {
      const filteredTickets =
        tickets &&
        tickets.filter((t) =>
          (t.title.toLowerCase() + t.content.toLowerCase()).includes(
            val.toLowerCase()
          )
        );
      setFilteredTickets(filteredTickets);
    }, 300);
  };

  return (
    <main>
      <h1>Tickets List</h1>
      <header className={styles.header}>
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          autoFocus
        />
      </header>
      {filteredTickets ? (
        <div className={styles.results}>
          Showing {filteredTickets.length} results
        </div>
      ) : null}
      {filteredTickets ? RenderTickets(filteredTickets) : <Spinner />}
    </main>
  );
};

export default App;
