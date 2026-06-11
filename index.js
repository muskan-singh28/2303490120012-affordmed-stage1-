const axios = require("axios");

// Apna latest access token yahan paste karo
const TOKEN = ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaW5naG11c2thbjE0MjVAZ21haWwuY29tIiwiZXhwIjoxNzgxMTY4NTA5LCJpYXQiOjE3ODExNjc2MDksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2MjhmODg4NS1iYjg0LTRiNmUtOGYzMS1mMmVkZTgwMjRlZmQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtdXNrYW4gc2luZ2giLCJzdWIiOiIwOTgwZmY2ZC01MGVlLTQ3M2MtOWI4MC0wOTIyY2U5MWM3MmIifSwiZW1haWwiOiJzaW5naG11c2thbjE0MjVAZ21haWwuY29tIiwibmFtZSI6Im11c2thbiBzaW5naCIsInJvbGxObyI6IjIzMDM0OTAxMjAwMTIiLCJhY2Nlc3NDb2RlIjoiQkFWRFNoIiwiY2xpZW50SUQiOiIwOTgwZmY2ZC01MGVlLTQ3M2MtOWI4MC0wOTIyY2U5MWM3MmIiLCJjbGllbnRTZWNyZXQiOiJOdkNBckVtVFZNbnd0VldQIn0.I3ElWJ1olNUXQWMio2hnvLVqiVbZS-NeszOgLyeRARo";

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    console.log("FULL RESPONSE:");
    console.log(response.data);

    const notifications = response.data.notifications || [];

    const top10 = notifications
      .sort((a, b) => {
        const priorityA = PRIORITY[a.Type] || 0;
        const priorityB = PRIORITY[b.Type] || 0;

        if (priorityA !== priorityB) {
          return priorityB - priorityA;
        }

        return (
          new Date(b.Timestamp).getTime() -
          new Date(a.Timestamp).getTime()
        );
      })
      .slice(0, 10);

    console.log("\n===== TOP 10 NOTIFICATIONS =====");
    console.table(top10);

  } catch (error) {
    console.log("\n===== ERROR =====");
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("HEADERS:", error.response?.headers);
    console.log("MESSAGE:", error.message);
  }
}

getTopNotifications();