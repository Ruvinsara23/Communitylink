import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { X } from "lucide-react";
import SuccessDialog from "./successDialog";

export default function PollCreator() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollType, setPollType] = useState("multiple"); // Added state for poll type
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [requireNames, setRequireNames] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const pollData = {
      title,
      options: options.map((text) => ({ text })), 
      communityId: "6798836edab2a02f8899e7ba", 
    };

    try {
    
      const response = await axios.post("http://localhost:8000/api/poll/create", pollData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Poll created successfully:", response.data);
        setShowSuccessDialog(true);
      }

      const notificationPayload = {
        title: `New Event: ${title}`,
        message: `Don't miss the upcoming event: ${title}. It's scheduled for ${startDateTime}.`,
        userId:'6797b1599c75bd4a3a6a8ade',
      };
  
      const notificationResponse = await axios.post("http://localhost:8000/api/notifications/notifications", notificationPayload);
      console.log("Notification sent successfully:", notificationResponse.data);
    } catch (error) {
      console.error("Error creating poll:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter poll title" />
        </div>

        <div className="space-y-2">
          <Label>Poll type</Label>
          <Select value={pollType} onValueChange={setPollType}>
            <SelectTrigger>
              <SelectValue placeholder="Select poll type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple">Multiple choice</SelectItem>
              <SelectItem value="single">Single choice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Answer Options</Label>
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              {options.length > 2 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button"  variant="outline" onClick={addOption}>
            Add option
          </Button>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Settings</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="multiple">Allow selection of multiple options</Label>
            <Switch id="multiple" checked={allowMultiple} onCheckedChange={setAllowMultiple} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="names">Require participant names</Label>
            <Switch id="names" checked={requireNames} onCheckedChange={setRequireNames} />
          </div>
        </div>

        <Button type="submit"  className="w-full bg-blue-600">
          Create poll
        </Button>
      </form>
      <SuccessDialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} pollTitle={title} />
    </div>
  );
}
