import { Share2, MoreHorizontal } from "lucide-react";

export function EventCard({ event }) {
  console.log(event);
  return (
    <div className="p-4 rounded-md shadow-md bg-white border border-pink-300 flex flex-col gap-3">
      {/* Title and Cover Image */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{event.name}</h3>
        <img
          src={event.coverImage || "/placeholder.svg"} // Fallback image if coverImage is missing
          alt={event.name}
          className="h-16 w-full object-cover rounded-md"
        />
      </div>

      {/* Event Description */}
      <p className="text-sm text-gray-600">{event.description || "No description available"}</p>

      {/* Event Details */}
      <div className="text-sm text-gray-500">
        <p>{event.createdAt ? new Date(event.createdAt).toLocaleString() : "Date not specified"}</p>
        
        <p>Location: {event.location|| "Not specified"}</p>
      </div>

      {/* Host and Buttons */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-600">Hosted by: {event.title|| "Demo User"}</p>
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
        
        <button className="bg-blue-50 text-blue-600  px-3 py-1 rounded-md">
          Manage
        </button>
      </div>
    </div>
  );
}
