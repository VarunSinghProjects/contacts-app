import { createContext, useContext, useState } from "react";
import api from "../api/contacts";


const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([]);
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/users");
    if (response.data) {
      setContacts(response.data);
    } 
  };

  const addContactHandler = async (contact) => {
    const request = {
      ...contact,
    };
    const response = await api.post("/users", request);
    setContacts([...contacts, response.data]);
  };

  //removing the selected contact
  const removeContactHandler = async (id) => {
    await api.delete(`/users/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  //to edit the contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/users/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  //to search a particular contact
  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contact,
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults
  }

    return (
        <contactsCrudContext.Provider value={ value }>
            {children}
        </contactsCrudContext.Provider>
    )
}

export function useContactsCrud() {
    return useContext(contactsCrudContext)
}