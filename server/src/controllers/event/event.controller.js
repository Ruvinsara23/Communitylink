
const Event = require("../../models/event/event.model");
const Community = require("../../models/community/community.model");

exports.createEvent = async (req, res) => {
  const { title, description, startDate, endDate, location, coverImage, link, communityId } = req.body;

  try {
   
    const newEvent = new Event({
      title,
      description,
      startDate,
      endDate,
      location,
      coverImage,
      link,
      communityId,
    });

    await newEvent.save();

    
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    community.events.push(newEvent._id);
    await community.save();

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("communityId", "name"); // Optionally populate community name
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("communityId", "name");
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  const { title, description, startDate, endDate, location, coverImage, link } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }


    if (title) event.title = title;
    if (description) event.description = description;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (location) event.location = location;
    if (coverImage) event.coverImage = coverImage;
    if (link) event.link = link;

    await event.save();

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Remove the event reference from the community
    await Community.findByIdAndUpdate(event.communityId, {
      $pull: { events: event._id },
    });

    // Delete the event
    await event.deleteOne();

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
