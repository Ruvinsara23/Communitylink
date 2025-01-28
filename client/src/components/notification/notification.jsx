import { Bell, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import axios from 'axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility
  const dropdownRef = useRef(null);

  useEffect(() => {
    
    axios.get(`http://localhost:8000/api/notifications/6797b1599c75bd4a3a6a8ade`)
      .then((response) => {
        setNotifications(response.data.notifications);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      });
  }, []);

  const markAsRead = (id) => {
    axios.patch(`/api/notifications/${id}/read`)
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === id ? { ...notif, isRead: true } : notif
          )
        );
      })
      .catch((error) => console.error('Error marking notification as read:', error));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Icon */}
      <Button variant="ghost" size="icon" onClick={toggleDropdown}>
        <Bell className="h-5 w-5" />
        {notifications.some((notif) => !notif.isRead) && (
          <span className="absolute right-0 top-0 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
          <h3 className="p-2 text-sm font-semibold">Notifications</h3>
          <ul>
            {loading ? (
              <li className="p-2 text-center">Loading...</li>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <li
                  key={notif._id}
                  className={`p-2 border-b flex items-center justify-between ${
                    notif.isRead ? 'text-gray-500' : 'text-black'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs">{notif.message}</p>
                  </div>
                  {!notif.isRead && (
                    <Button
                      onClick={() => markAsRead(notif._id)}
                      variant="ghost"
                      size="icon"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-center">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
