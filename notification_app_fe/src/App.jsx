import { useEffect, useState } from "react";
import { getNotifications } from "./api";

function App() {
  const [notifications, setNotifications] = useState([]);

  const loadData = async () => {
    try {
      const data = await getNotifications();

      console.log("DATA RECEIVED:", data);

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  const fetchData = async () => {
    await loadData();
  };

  fetchData();
}, []);

  return (
    <div>
      <h1>Campus Notification System</h1>

      <h2>Total Notifications: {notifications.length}</h2>

      {notifications.map((item, idx) => (
        <div
          key={item.ID ?? item.Timestamp ?? idx}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;