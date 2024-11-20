import { useState, useEffect, useCallback } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/eventApi";

const useEvents = (currentMonth: Date) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch events from the server
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      const fetchedEvents = response.events;
      if (Array.isArray(fetchedEvents)) {
        // Sort events by date before updating state
        const sortedEvents = fetchedEvents.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setEvents(sortedEvents);
      } else {
        console.warn("API response is not an array:", fetchedEvents);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, fetchEvents]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // This will be triggered when 'refresh' changes
    // You can perform side effects here, such as fetching new data
  }, [refresh]);

  const handleCreateEvent = async (event: any) => {
    try {
      const newEvent = await createEvent(event);
      if (newEvent) {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setRefresh((prev) => !prev); // Toggle refresh state
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Update an existing event
  const handleUpdateEvent = async (id: string, updatedEvent: any) => {
    try {
      // Optimistic UI update: immediately update the event in the state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, ...updatedEvent } : event
        )
      );

      // Perform the actual update
      const updated = await updateEvent(id, updatedEvent);

      // If the API response differs from the optimistic update, update the state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, ...updated } : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);

      // If the update fails, revert the optimistic update
      fetchEvents();
    }
  };
  // Refresh function for manually fetching events
  const refreshEvents = async () => {
    await fetchEvents();
  };

  return {
    events,
    loading,
    handleCreateEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    refreshEvents,
  };
};

export default useEvents;
