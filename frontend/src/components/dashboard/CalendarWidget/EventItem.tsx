import React from "react";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import styles from "./CallendarWidget.module.css";

interface EventItemProps {
  event: {
    _id: string;
    title: string;
    date: string;
    description: string;
  };
  Pcolor: string;
  onDelete: (id: string) => void;
  onEdit: (event: any) => void;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  Pcolor,
  onDelete,
  onEdit,
}) => (
  <li className={styles.eventItem} style={{ borderColor: Pcolor }}>
    <div className={styles.eventContent}>
      <span>{event.title}</span>
      <span>{format(new Date(event.date), "h:mm a")}</span>
      <span>{event.description}</span>
    </div>
    <div className={styles.eventActions}>
      <button onClick={() => onEdit(event)}>
        <Edit size={18} />
      </button>
      <button onClick={() => onDelete(event._id)}>
        <Trash size={18} />
      </button>
    </div>
  </li>
);

export default EventItem;
