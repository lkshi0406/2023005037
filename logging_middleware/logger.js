const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsdmFsbG1pa0BnaXRhbS5pbiIsImV4cCI6MTc4MDgxMTQwOCwiaWF0IjoxNzgwODEwNTA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMmVmYWE3YmYtNzk5YS00ZjcxLTg2OWEtMDdlYmM4NDczYTI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwic3ViIjoiZTIxOGZlMTAtZmVmZC00ZWE0LWFkZWUtMzM1NDA4NmI0Y2JmIn0sImVtYWlsIjoibHZhbGxtaWtAZ2l0YW0uaW4iLCJuYW1lIjoibGFrc2htaSBzcnVqYW5hIiwicm9sbE5vIjoiMjAyMzAwNTAzNyIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6ImUyMThmZTEwLWZlZmQtNGVhNC1hZGVlLTMzNTQwODZiNGNiZiIsImNsaWVudFNlY3JldCI6IlJXS2t6VmZOVXRyVnZQa0UifQ.1XA0F5QzXVeNa3hx6qEMm9Lzi8yg4bkO4i0L6tDQ08k";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;