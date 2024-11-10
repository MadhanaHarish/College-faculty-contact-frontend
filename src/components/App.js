import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import DarkMode from "./darkmode";
import ContactDetail from "./ContactDetail";
import Login from "./Login";

function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isAuth, setAuth] = useState(false);
    const [userDetails, setUserDetails] = useState({
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        department: "",
        qualification: "",
        position: "",
        photo: "",
        tableData: Array.from({ length: 6 }, () => Array(8).fill("")),
    });


    const getContacts = async () => {
        try {
            const res = await axios.get("/api/contacts");
            setContacts(res.data);
        } catch (err) {
            console.log("Error from ContactList", err);
        }
    };

    const addContactHandler = async (contact) => {
        try {
            await axios.post("/api/contacts", contact);
            alert("Successfully added contact");
            getContacts();
        } catch (err) {
            console.log("Error from AddContact", err);
        }
    };

    const updateContactHandler = async (contact) => {
        try {
            await axios.put("/api/contacts/" + contact._id, contact);
            alert("Successfully updated contact");
            getContacts();
        } catch (err) {
            console.log("Error from UpdateContactInfo", err);
        }
    };

    const removeContactHandler = async (id) => {
        try {
            await axios.delete("/api/contacts/" + id);
            getContacts();
        } catch (err) {
            console.log("Error from RemoveContact", err);
        }
    };

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm.length > 0) {
            const keywords = searchTerm.toLowerCase().split(',').map(keyword => keyword.trim());
            const newContactList = contacts.filter((contact) => {
                const searchableContent = `${contact.name} ${contact.email} ${contact.phoneNumber} ${contact.department} ${contact.qualification} ${contact.position}`.toLowerCase();
                return keywords.every(keyword => searchableContent.includes(keyword));
            });
            setSearchResults(newContactList);
        } else {
            setSearchResults(contacts);
        }
    };



    useEffect(() => {
        if (isAuth) {
            getContacts();
        }
    }, [isAuth]);

    return (
        <div className="App-container">
            <Router>
                {isAuth ? (
                    <>
                        <Header />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ContactList
                                        contacts={searchTerm.length < 1 ? contacts : searchResults}
                                        getContactID={removeContactHandler}
                                        term={searchTerm}
                                        searchKeyword={searchHandler}
                                        userDetails={userDetails} // Pass authenticated user details
                                    />
                                }
                            />
                            <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
                            <Route
                                path="/edit/:id"
                                element={<EditContact contacts={contacts} updateContactHandler={updateContactHandler} />}
                            />
                            <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
                        </Routes>
                        <DarkMode />
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login setAuth={setAuth} setUserDetails={setUserDetails} />} />
                    </Routes>
                )}
            </Router>
        </div>
    );
}

export default App;
