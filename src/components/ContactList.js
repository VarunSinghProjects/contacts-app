import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const {contacts, retrieveContacts, searchHandler, text, searchResults} = useContactsCrud();

  useEffect(() => {
    retrieveContacts();
  }, []);


  const renderContactList = (text.length < 1 ? contacts : searchResults).map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
      />
    );
  });

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  }

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button black right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={text}
            onChange={(e) => onUserSearch(e)}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      {/* to render the contacts list */}
      <div className="ui middle aligned selection list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
