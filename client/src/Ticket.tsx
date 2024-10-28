import React from "react";
import { TicketDto } from "./api";
import styles from "./Ticket.module.scss";

export interface TicketProps {
  ticket: TicketDto;
}
export const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  const magicValue = ticketMagicValue(ticket);
  return (
    <div className={styles.ticket}>
      <h5 className={styles.title}>{ticket.title}</h5>
      <span className={styles.ticketContent}>{ticket.content}</span>
      <footer>
        <div className={styles.metaData}>
          By {ticket.userEmail} |{" "}
          {new Date(ticket.creationTime).toLocaleString()}| {magicValue}
        </div>
      </footer>
    </div>
  );
};

/** special secret logic that we are not allowed to change, and is slow */
const ticketMagicValue = (ticket: TicketDto): number => {
  console.log("calculating magic value for ticket");
  let i = 0;
  while (i < 150000000) {
    i++;
  }
  return Math.round(Math.random() * 100000);
};
