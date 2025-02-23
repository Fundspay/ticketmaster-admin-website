// src/AddEvent.js
import React, { useState } from 'react';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      date: new Date(date).toISOString(),
      created_by: "d518c603-d3f2-4366-ba00-6402ac81e3dd" 
    };

    try {
      const response = await fetch("https://c38b-150-129-156-34.ngrok-free.app/api/v1/events/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);
      
      if (!response.ok) throw new Error("API call failed");
      await response.json();
      alert("Event added successfully!");
      // Clear form fields
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      alert("Error adding event: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'left' }}>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br/>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>Description:</label><br/>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>Date:</label><br/>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
