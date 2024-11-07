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
  Clock,
} from "lucide-react";
import styles from "../CalendarWidget/CallendarWidget.module.css";

const events = [
  { date: new Date(2024, 10, 7), title: "Math Quiz" },
  { date: new Date(2024, 10, 9), title: "Science Review" },
  { date: new Date(2024, 10, 12), title: "History Test" },
  { date: new Date(2024, 10, 15), title: "English Essay Due" },
  { date: new Date(2024, 10, 20), title: "Art Project Presentation" },
];

interface CalendarWidgetProps {
  Pcolor: string; // Primary color
  Scolor: string; // Secondary color (e.g., used for hover or today)
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ Pcolor, Scolor }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const onDateClick = (day: Date) => setSelectedDate(day);
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const selectedDateEvents = events.filter((event) =>
    isSameDay(event.date, selectedDate)
  );

  return (
    <div
      className={styles.calendarWidget}
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
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
      <div className={styles.calendarBody}>
        <div className={styles.daysHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>
        <div
          className={styles.daysGrid}
          style={
            {
              "--hover-bg-color": `${Pcolor}20`, // Set hover background color as CSS variable
              "--selected-bg-color": Pcolor, // Set selected background color as CSS variable
              "--event-indicator-color": Pcolor, // Set event indicator color
            } as React.CSSProperties
          }
        >
          {daysInMonth.map((day, idx) => {
            const hasEvents = events.some((event) =>
              isSameDay(event.date, day)
            );
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
                style={{
                  backgroundColor: isSelected ? Pcolor : "transparent",
                  color: !isCurrentMonth
                    ? "#ccc"
                    : isSelected
                    ? "#fff"
                    : isToday
                    ? Scolor
                    : "#333",
                }}
              >
                <span>{format(day, "d")}</span>
                {hasEvents && (
                  <div
                    className={styles.eventIndicator}
                    style={{
                      backgroundColor: isSelected ? "#fff" : Pcolor,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.eventList}>
        <h3 style={{ color: Pcolor }}>
          Events on {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        {selectedDateEvents.length > 0 ? (
          <ul>
            {selectedDateEvents.map((event, idx) => (
              <li
                key={idx}
                className={styles.eventItem}
                style={{
                  borderColor: Pcolor,
                  backgroundColor: `${Pcolor}10`,
                }}
              >
                <span className={styles.eventTitle}>{event.title}</span>
                <span className={styles.eventTime}>
                  <Clock
                    className={styles.eventIcon}
                    style={{ color: Pcolor }}
                  />
                  {format(event.date, "h:mm a")}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noEvents}>No events scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
