import { Share2, MoreHorizontal } from "lucide-react";

export function EventCard({ event }) {
  return (
    <div className="p-4 rounded-md shadow-md bg-white border border-gray-200 flex flex-col gap-3">
      {/* Title and Cover Image */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{event.name}</h3>
        <img
          src={event.coverImage || "/placeholder.svg"} // Fallback image if coverImage is missing
          alt={event.name}
          className="h-16 w-32 object-cover rounded-md"
        />
      </div>

      {/* Event Description */}
      <p className="text-sm text-gray-600">{event.description || "No description available"}</p>

      {/* Event Details */}
      <div className="text-sm text-gray-500">
        <p>{event.date ? new Date(event.date).toLocaleString() : "Date not specified"}</p>
        <p>{event.isFree ? "Free" : `$${event.price || "0.00"}`}</p>
        <p>Location: {event.location || "Not specified"}</p>
      </div>

      {/* Host and Buttons */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-600">Hosted by: {event.host || "Unknown"}</p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 size={16} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Attendees and Manage Button */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          {event.attendees && event.attendees.length > 0
            ? `${event.attendees.length} attending`
            : "No attendees yet"}
        </p>
        <button className="bg-black text-white px-3 py-1 rounded-md">
          Manage
        </button>
      </div>
    </div>
  );
}
