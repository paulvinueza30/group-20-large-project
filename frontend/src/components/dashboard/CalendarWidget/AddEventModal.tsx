import React, { useState, useEffect } from "react";
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
  editingEvent?: {
    _id: string;
    title: string;
    date: string;
    description: string;
  } | null;
  handleUpdateEvent?: (
    id: string,
    eventData: {
      title: string;
      date: string;
      description: string;
      time: string;
    }
  ) => void; // Ensure handleUpdateEvent is optional
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  selectedDate,
  isOpen,
  onClose,
  onSubmit,
  Pcolor,
  Scolor,
  editingEvent,
  handleUpdateEvent,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [amPm, setAmPm] = useState("AM");

  const formattedDate = selectedDate.toISOString().split("T")[0];

  // Pre-fill fields if editing an existing event
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      const eventTime = new Date(editingEvent.date);
      setHours((eventTime.getHours() % 12 || 12).toString());
      setMinutes(eventTime.getMinutes().toString().padStart(2, "0"));
      setAmPm(eventTime.getHours() >= 12 ? "PM" : "AM");
    } else {
      setTitle("");
      setDescription("");
      setHours("12");
      setMinutes("00");
      setAmPm("AM");
    }
  }, [editingEvent]);

  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = () => {
    // Check if required fields are filled
    if (!title || !description || !hours || !minutes || !amPm) {
      setShowWarning(true); // Show the warning message
      return;
    }

    let formattedHour = hours;

    // Convert 12 AM to 00 and keep 12 PM as 12
    if (hours === "12" && amPm === "AM") {
      formattedHour = "00"; // Midnight
    } else if (hours === "12" && amPm === "PM") {
      formattedHour = "12"; // Noon
    }

    const eventData = {
      title,
      date: `${formattedDate}T${formattedHour}:${minutes}:00`, // Use the corrected hour
      description,
      time: `${hours}:${minutes} ${amPm}`, // Display the time in AM/PM format
    };

    if (editingEvent && handleUpdateEvent) {
      handleUpdateEvent(editingEvent._id, eventData);
    } else {
      onSubmit(eventData);
    }

    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setHours("12");
    setMinutes("00");
    setAmPm("AM");

    // Close the modal or form after submission
    onClose();
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h3 style={{ color: Pcolor }}>
            {editingEvent ? "Edit Event" : "Add Event"}
          </h3>
          {/* Warning message if form is incomplete */}
          {showWarning && (
            <span className={styles.errorMessage}>
              Please fill in all fields.
            </span>
          )}
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
            maxLength={40}
          />

          <label>Time:</label>
          <div className={styles.timeInput}>
            <select value={hours} onChange={(e) => setHours(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {["00", "15", "30", "45"].map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

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
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default AddEventModal;
