import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Calendar,
  MapPin,
  ImageIcon,
  ArrowLeft,
} from "lucide-react";

export function CreateEventDialog({ open, onOpenChange }) {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    location: "",
    communityId: "", // Replace this with the actual community ID
  });

  const [coverImage, setCoverImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { title, startDate, startTime, endDate, endTime, description, location, communityId } = form;

      // Combine date and time into ISO 8601 datetime strings
      const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
      const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();

      // Prepare the request payload
      const payload = {
        title,
        description,
        startDate: startDateTime,
        endDate: endDateTime,
        location,
        coverImage, // Base64 image
        communityId:"6780b95300ff81739896bb37",
      };

      // Send the POST request
      const response = await axios.post("http://localhost:8000/api/event", payload);

      console.log("Event created successfully:", response.data);
      alert("Event created successfully!");

      
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <DialogTitle className="text-center">New Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div
            className="group relative aspect-[2/1] cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-orange-300 to-yellow-300"
            onClick={() => document.getElementById("cover-image")?.click()}
          >
            {coverImage ? (
              <img
                src={coverImage || "/placeholder.svg"}
                alt="Event cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <input
              type="file"
              id="cover-image"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCoverImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="space-y-4">
            <Input
              name="title"
              placeholder="e.g. Weekly community meetup"
              className="text-lg"
              value={form.title}
              onChange={handleInputChange}
            />

            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Details</span>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Start</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="time"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">End</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="time"
                      name="endTime"
                      value={form.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Description{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Textarea
                    name="description"
                    placeholder="A short intro to let the members know why they should attend"
                    className="resize-none"
                    value={form.description}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  name="location"
                  placeholder="Location (e.g. Community Hall)"
                  value={form.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 flex justify-end border-t bg-background pt-4">
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={handleSubmit}
            >
              Create Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
