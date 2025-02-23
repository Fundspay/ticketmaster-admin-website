// src/RegisterTicket.js
import React, { useState } from 'react';

const RegisterTicket = () => {
  // Pre-fill the fields with the provided values
  const [userId, setUserId] = useState('7152ea68-789a-41d5-a02e-358e6f5365c4');
  const [eventId, setEventId] = useState('d2764f11-c768-46d1-b8a8-84d8f8afee5a');
  const [responseMessage, setResponseMessage] = useState('');
  const [ticket, setTicket] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const requestData = {
      user_id: userId,
      event_id: eventId,
    };

    try {
      const response = await fetch(
        "https://84f8b891-d16f-4dc7-a9c7-4b409123518d.mock.pstmn.io/api/v1/tickets/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      // Read and log the response data
      const data = await response.json();
      console.log("API response status:", response.status);
      console.log("API response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "API call failed");
      }

      setResponseMessage(data.message);
      setTicket(data.ticket);
    } catch (error) {
      console.error("Error registering ticket:", error);
      setResponseMessage("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>Register Ticket</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>User ID:</label><br />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <br />
        <div>
          <label>Event ID:</label><br />
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <br />
        <button type="submit">Register Ticket</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {ticket && (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <h3>Ticket Details:</h3>
          <p><strong>ID:</strong> {ticket.id}</p>
          <p><strong>User ID:</strong> {ticket.user_id}</p>
          <p><strong>Event ID:</strong> {ticket.event_id}</p>
          <p><strong>Created At:</strong> {ticket.createdAt}</p>
          <p><strong>Updated At:</strong> {ticket.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterTicket;
