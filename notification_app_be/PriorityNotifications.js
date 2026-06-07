const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsdmFsbG1pa0BnaXRhbS5pbiIsImV4cCI6MTc4MDgxMTQwOCwiaWF0IjoxNzgwODEwNTA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMmVmYWE3YmYtNzk5YS00ZjcxLTg2OWEtMDdlYmM4NDczYTI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwic3ViIjoiZTIxOGZlMTAtZmVmZC00ZWE0LWFkZWUtMzM1NDA4NmI0Y2JmIn0sImVtYWlsIjoibHZhbGxtaWtAZ2l0YW0uaW4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwicm9sbE5vIjoiMjAyMzAwNTAzNyIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6ImUyMThmZTEwLWZlZmQtNGVhNC1hZGVlLTMzNTQwODZiNGNiZiIsImNsaWVudFNlY3JldCI6IlJXS2t6VmZOVXRyVnZQa0UifQ.1XA0F5QzXVeNa3hx6qEMm9Lzi8yg4bkO4i0L6tDQ08k";

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

    const notifications = response.data.notifications;

    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    const top10 = notifications
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
  }
}

getTopNotifications();