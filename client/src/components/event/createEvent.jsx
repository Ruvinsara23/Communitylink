"use client";

import { useState } from "react";
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
  Clock,
  MapPin,
  Users,
  MessageSquare,
  ArrowLeft,
  ImageIcon,
} from "lucide-react";

export function CreateEventDialog( {open, onOpenChange} ) {
  const [coverImage, setCoverImage] = useState("");

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
            <div>
              <Input
                placeholder="e.g. Weekly community meetup"
                className="text-lg"
              />
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Details</span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Start</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">End</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Description{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Textarea
                    placeholder="A short intro to let the members know why they should attend"
                    className="resize-none"
                  />
                  <div className="text-right text-sm text-muted-foreground">
                    0/5000
                  </div>
                </div>

                <Input placeholder="nas.io/dollp..." />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <Users className="mr-2 h-4 w-4" />
              Pricing & Access
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <Clock className="mr-2 h-4 w-4" />
              Host
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {}}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Event chat group
            </Button>
          </div>
          <div className="sticky bottom-0 flex justify-end border-t bg-background pt-4">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              Create Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
