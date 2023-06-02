import React from 'react';

const ContactList = ({ filterContacts, handleDelete }) => {
    return (
    <div>
        <ul>
        {filterContacts.map(contact => (
            <li key={contact.id}>
            <p>
                Name: {contact.name}, Number: {contact.number}
            </p>
            <button type="button" onClick={() => handleDelete(contact.id)}>Delete</button>
            </li>
        ))}
        </ul>
    </div>
    );
};


export default ContactList;
