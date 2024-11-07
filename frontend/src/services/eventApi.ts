// src/services/eventApiService.ts

import axios from "axios";

const EVENT_API_URL =
  `${process.env.REACT_APP_API_URL}/events` ||
  "http://localhost:5000/api/events";

// Type for an Event
interface Event {
  _id?: string;
  title: string;
  date: string; // ISO 8601 date format: YYYY-MM-DDTHH:mm:ssZ
  description?: string;
}

// Create a new Event
export const createEvent = async (event: Event) => {
  try {
    const response = await axios.post(EVENT_API_URL, event, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures credentials (cookies) are sent
    });
    return response.data;
  } catch (error: unknown) {
    // Handle Axios error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error creating event");
    } else {
      throw new Error("Internal server error while creating event");
    }
  }
};

// Get all events
export const getEvents = async () => {
  try {
    const response = await axios.get(EVENT_API_URL, {
      withCredentials: true, // Ensures credentials (cookies) are sent
    });
    return response.data;
  } catch (error: unknown) {
    // Handle Axios error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error getting events");
    } else {
      throw new Error("Internal server error while fetching events");
    }
  }
};

// Get a specific event by ID
export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${EVENT_API_URL}/${id}`, {
      withCredentials: true, // Ensures credentials (cookies) are sent
    });
    return response.data;
  } catch (error: unknown) {
    // Handle Axios error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Error getting event by ID"
      );
    } else {
      throw new Error("Internal server error while getting event by ID");
    }
  }
};

// Update an event by ID
export const updateEvent = async (id: string, event: Event) => {
  try {
    const response = await axios.patch(`${EVENT_API_URL}/${id}`, event, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures credentials (cookies) are sent
    });
    return response.data;
  } catch (error: unknown) {
    // Handle Axios error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error updating event");
    } else {
      throw new Error("Internal server error while updating event");
    }
  }
};

// Delete an event by ID
export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${EVENT_API_URL}/${id}`, {
      withCredentials: true, // Ensures credentials (cookies) are sent
    });
    return response.data;
  } catch (error: unknown) {
    // Handle Axios error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error deleting event");
    } else {
      throw new Error("Internal server error while deleting event");
    }
  }
};
