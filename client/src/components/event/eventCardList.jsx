import { useEffect, useState } from "react";
import axios from "axios";
import { EventCard } from "./EventCard";

export function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:8000/api/event");
        
        // Assuming response.data is the main object containing success and data properties
        if (response.data.success) {
          setEvents(response.data.data);
        } else {
          setError("Failed to fetch events. Server returned an error.");
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
