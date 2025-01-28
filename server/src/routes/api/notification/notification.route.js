// routes/notificationRoutes.js
const express = require('express');
const {
  createNotification,
  getNotificationsByUser,
  markAsRead,
} = require('../../../controllers/notification/notification.controller');

const router = express.Router();

// Create a new notification
router.post('/notifications', createNotification);

// Get notifications for a user
router.get('/notifications/:userId', getNotificationsByUser);

// Mark a notification as read
router.put('/notifications/:id/read', markAsRead);

module.exports = router;
