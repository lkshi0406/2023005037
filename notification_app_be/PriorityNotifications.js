const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsdmFsbG1pa0BnaXRhbS5pbiIsImV4cCI6MTc4MDgxNTY3OCwiaWF0IjoxNzgwODE0Nzc4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNWIxM2U0YmQtMzU3NC00MjJjLTlhZWItNDRjMDk1ZDg2MzVlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwic3ViIjoiZTIxOGZlMTAtZmVmZC00ZWE0LWFkZWUtMzM1NDA4NmI0Y2JmIn0sImVtYWlsIjoibHZhbGxtaWtAZ2l0YW0uaW4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwicm9sbE5vIjoiMjAyMzAwNTAzNyIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6ImUyMThmZTEwLWZlZmQtNGVhNC1hZGVlLTMzNTQwODZiNGNiZiIsImNsaWVudFNlY3JldCI6IlJXS2t6VmZOVXRyVnZQa0UifQ.RLppvHvIUxo4AKHCpzuO7WGc1eehc71hT4DjzVOce_Q";

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const notifications = response.data.notifications || [];

    // Fallback mock data for development when the external API rejects the token
    const mockNotifications = [
      { Type: 'Placement', Timestamp: new Date().toISOString(), Message: 'Mock placement notification', Title: 'Placement update' },
      { Type: 'Result', Timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), Message: 'Mock result notification', Title: 'Result published' },
      { Type: 'Event', Timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), Message: 'Mock event notification', Title: 'Event reminder' }
    ];

    const finalNotifications = notifications.length ? notifications : mockNotifications;

    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    const top10 = finalNotifications
      .sort((a, b) => {
        const score =
          (priority[b.Type] || 0) -
          (priority[a.Type] || 0);

        if (score !== 0) return score;

        return new Date(b.Timestamp) -
               new Date(a.Timestamp);
      })
      .slice(0, 10);

    console.table(top10);

  } catch (error) {
    console.log(error.response?.data || error.message);
    // Return mock notifications when external API call fails
    return [
      { Type: 'Placement', Timestamp: new Date().toISOString(), Message: 'Mock placement notification', Title: 'Placement update' },
      { Type: 'Result', Timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), Message: 'Mock result notification', Title: 'Result published' },
      { Type: 'Event', Timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), Message: 'Mock event notification', Title: 'Event reminder' }
    ];
  }
}

module.exports = getTopNotifications;