import { useState, useEffect, useCallback } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/eventApi";

const useEvents = (currentMonth: Date) => {
  const [events, setEvents] = useState<any[]>([]); // Store events here
  const [loading, setLoading] = useState<boolean>(true); // Loading state for events

  // Fetch events on mount and when the currentMonth changes
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      const fetchedEvents = response.events;
      // Ensure fetchedEvents is an array before setting state
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
      } else {
        console.warn("API response is not an array:", fetchedEvents);
        setEvents([]); // Fallback to empty array if the response is invalid
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]); // In case of an error, set events to empty array
    } finally {
      setLoading(false);
    }
  }, []);

  // Call fetchEvents when currentMonth changes or on mount
  useEffect(() => {
    fetchEvents();
  }, [currentMonth, fetchEvents]);

  // Handle creating an event
  const handleCreateEvent = async (event: any) => {
    try {
      const newEvent = await createEvent(event);
      // Re-fetch events after adding a new one
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      // Re-fetch events after deleting one
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle updating an event (for example, toggling event status)
  const handleUpdateEvent = async (id: string, updatedEvent: any) => {
    try {
      await updateEvent(id, updatedEvent);
      // Re-fetch events after updating one
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return {
    events,
    loading,
    handleCreateEvent,
    handleDeleteEvent,
    handleUpdateEvent,
  };
};

export default useEvents;
