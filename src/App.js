import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addContact = async () => {
    try {
      const response = await axios.post(API_URL, newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const updateContact = async (id) => {
    try {
      const updatedContact = {
        name: "Updated Name",
        email: "updatedemail@example.com",
      };
      const response = await axios.put(`${API_URL}/${id}`, updatedContact);
      setContacts(
        contacts.map((contact) => (contact.id === id ? response.data : contact))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button onClick={addContact} className="bg-blue-500 text-white p-2">
          Add Contact
        </button>
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2 p-2 border">
            <span className="font-bold">{contact.name}</span> - {contact.email}
            <button
              onClick={() => updateContact(contact.id)}
              className="bg-yellow-500 text-white p-2 ml-2"
            >
              Update
            </button>
            <button
              onClick={() => deleteContact(contact.id)}
              className="bg-red-500 text-white p-2 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
