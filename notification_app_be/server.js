const express = require('express');
const cors = require('cors');
const Log = require('../logging_middleware/logger');
const getTopNotifications = require('./PriorityNotifications');

const app = express();

// Enable CORS for development so Vite frontend can call this API
app.use(cors());

app.get('/', async (req, res) => {
  try {
    await Log('backend', 'info', 'handler', 'Home route accessed');
  } catch (e) {
    // logging failure shouldn't block response
  }
  res.send('Server Running');
});

app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await getTopNotifications();
    res.json({ notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
