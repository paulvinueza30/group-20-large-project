import React, { useState } from "react";
import styles from "./AddEventModal.module.css";

interface AddEventModalProps {
  selectedDate: Date;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: {
    title: string;
    date: string;
    description: string;
    time: string;
  }) => void;
  Pcolor: string;
  Scolor: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  selectedDate,
  isOpen,
  onClose,
  onSubmit,
  Pcolor,
  Scolor,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  // Format the selected date to match the input's expected format
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const handleSubmit = () => {
    if (title && description && time) {
      onSubmit({
        title,
        date: `${formattedDate}T${time}`,
        description,
        time,
      });
      onClose(); // Close the modal after submitting
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h3 style={{ color: Pcolor }}>Add Event</h3>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
          />
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: Scolor }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{ backgroundColor: Pcolor }}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEventModal;
