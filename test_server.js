const express = require('express');
const getTopNotifications = require('./notification_app_be/PriorityNotifications');
const app = express();
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await getTopNotifications();
    res.json({ notifications });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.listen(4001, () => console.log('Test server listening on 4001'));
