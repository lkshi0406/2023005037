import axios from "axios";

export const getNotifications = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/notifications"
    );

    return response.data.notifications;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
};