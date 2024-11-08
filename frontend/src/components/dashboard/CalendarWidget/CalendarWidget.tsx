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
  isBefore,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus as AddIcon,
} from "lucide-react";
import styles from "./CallendarWidget.module.css";
import useEvents from "../../../hooks/calendarEvent/useEvents";
import AddEventModal from "./AddEventModal";
import EventItem from "./EventItem";

interface CalendarWidgetProps {
  Pcolor: string;
  Scolor: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ Pcolor, Scolor }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const { events, handleCreateEvent, handleDeleteEvent, handleUpdateEvent } =
    useEvents(currentMonth);

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
  }, [currentMonth, events]);

  const selectedDateEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  const hasEvents = (day: Date) =>
    events.some((event) => isSameDay(new Date(event.date), day));

  const handleDateClick = (day: Date) => setSelectedDate(day);
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleEventSubmit = async (event: {
    title: string;
    date: string;
    description: string;
    time: string;
  }) => {
    await handleCreateEvent(event);
    setCurrentMonth(new Date(currentMonth));
  };

  const handleEditClick = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    handleDeleteEvent(id);
  };

  const openAddEventModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const isPastDay = (day: Date) =>
    isBefore(day, new Date()) && !isSameDay(day, new Date());

  return (
    <div
      className={styles.calendarWidget}
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.header} style={{ backgroundColor: Pcolor }}>
        <h2>
          <CalendarIcon className={styles.headerIcon} />
          Calendar
        </h2>
        <div className={styles.navContainer}>
          <button onClick={handlePrevMonth} className={styles.navButton}>
            <ChevronLeft />
          </button>
          <span className={styles.currentMonth}>
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button onClick={handleNextMonth} className={styles.navButton}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        className={styles.calendarBody}
        style={{ "--scolor": Scolor } as React.CSSProperties}
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
            const isDisabled = isPastDay(day);

            return (
              <button
                key={idx}
                onClick={() => !isDisabled && handleDateClick(day)}
                className={`${styles.dayCell} ${
                  isSelected ? styles.selected : ""
                } ${isToday ? styles.today : ""} ${
                  !isCurrentMonth ? styles.notCurrentMonth : ""
                } ${isDisabled ? styles.disabled : ""}`}
                style={{
                  backgroundColor: isSelected ? Pcolor : "transparent",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                disabled={isDisabled}
              >
                <span>{format(day, "d")}</span>
                {hasEvents(day) && (
                  <div
                    className={styles.eventDot}
                    style={{ backgroundColor: Scolor }}
                  ></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={styles.eventListHeader}
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <h3 style={{ color: Pcolor }}>
          Events on {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        <button
          className={styles.addEventButton}
          onClick={openAddEventModal}
          style={{ backgroundColor: Pcolor }}
        >
          <AddIcon className={styles.icon} />
        </button>
      </div>

      <div
        className={styles.eventList}
        style={{
          flex: 1,
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        {selectedDateEvents.length > 0 ? (
          <ul>
            {selectedDateEvents.map((event) => (
              <EventItem
                key={event._id}
                event={event}
                Pcolor={Pcolor}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.noEvents}>No events scheduled for this day.</p>
        )}
      </div>

      <AddEventModal
        selectedDate={selectedDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
        editingEvent={editingEvent}
        Pcolor={Pcolor}
        Scolor={Scolor}
        handleUpdateEvent={handleUpdateEvent}
      />
    </div>
  );
};

export default CalendarWidget;
