import React, { useState, useMemo } from "react";
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus as AddIcon, // Plus icon from lucide-react
} from "lucide-react";
import styles from "./CallendarWidget.module.css";
import useEvents from "../../../hooks/calendarEvent/useEvents";
import AddEventModal from "./AddEventModal";

interface CalendarWidgetProps {
  Pcolor: string;
  Scolor: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ Pcolor, Scolor }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    events,
    loading,
    handleCreateEvent,
    handleDeleteEvent,
    handleUpdateEvent,
  } = useEvents(currentMonth); // Custom hook fetches events based on currentMonth

  // Get all days of the month
  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [currentMonth]);

  // Get events for the selected date
  const selectedDateEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  // Check if a specific day has events
  const hasEvents = (day: Date) => {
    return events.some((event) => isSameDay(new Date(event.date), day));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleEventSubmit = (event: {
    title: string;
    date: string;
    description: string;
    time: string;
  }) => {
    handleCreateEvent(event); // Call the handleCreateEvent function from the hook
  };

  const openAddEventModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.calendarWidget}>
      <div
        className={styles.header}
        style={{ backgroundColor: Pcolor, color: "#fff" }}
      >
        <h2>
          <CalendarIcon className={styles.headerIcon} />
          Calendar
        </h2>
        <div className={styles.navContainer}>
          <button onClick={prevMonth} className={styles.navButton}>
            <ChevronLeft />
          </button>
          <span className={styles.currentMonth}>
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button onClick={nextMonth} className={styles.navButton}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        className={styles.calendarBody}
        style={{ "--scolor": Scolor } as React.CSSProperties} // Set dynamic color for event dots
      >
        <div className={styles.daysHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {daysInMonth.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={idx}
                onClick={() => onDateClick(day)}
                className={`${styles.dayCell} ${
                  isSelected ? styles.selected : ""
                } ${isToday ? styles.today : ""} ${
                  !isCurrentMonth ? styles.notCurrentMonth : ""
                }`}
                style={{ backgroundColor: isSelected ? Pcolor : "transparent" }}
              >
                <span>{format(day, "d")}</span>

                {/* Dot for events */}
                {hasEvents(day) && <div className={styles.eventDot}></div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* "Events on [day]" Section */}
      <div className={styles.eventListHeader}>
        <h3 style={{ color: Pcolor }}>
          Events on {format(selectedDate, "MMMM d, yyyy")}
        </h3>

        {/* Add Event Button with Plus Icon */}
        <button
          className={styles.addEventButton}
          onClick={openAddEventModal}
          style={{ backgroundColor: Scolor }}
        >
          <AddIcon className={styles.icon} />
        </button>
      </div>

      {/* Render the AddEventModal */}
      <AddEventModal
        selectedDate={selectedDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
        Pcolor={Pcolor}
        Scolor={Scolor}
      />

      {/* Event list */}
      <div className={styles.eventList}>
        {selectedDateEvents.length > 0 ? (
          <ul>
            {selectedDateEvents.map((event, idx) => (
              <li
                key={idx}
                className={styles.eventItem}
                style={{ borderColor: Pcolor }}
              >
                <span>{event.title}</span>
                <span>{format(new Date(event.date), "h:mm a")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
