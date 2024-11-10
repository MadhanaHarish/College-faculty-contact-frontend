import React, {useRef} from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";
import MyContactCard from "./MyContactCard";

const ContactList = (props) => {
    const inputE1 = useRef("");
    const {userDetails} = props;

    const deleteContactHandler = (id) => {
        props.getContactID(id);
    };

    // Filter contacts to exclude any that match userDetails
    const filteredContacts = props.contacts.filter(contact => contact._id !== userDetails.id);

    const renderContactList = filteredContacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact._id}
                userDetails={userDetails}
            />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value);
    };

    const fillSearchWithDept = (dept) => {
        inputE1.current.value = dept;
        props.searchKeyword(dept);
    };

    return (
        <div>
            <div className="contact-list">
                {/* Render MyContactCard with userDetails at the top */}
                { userDetails.email !== "student@kongu.edu" && (<div className="con-list">
                    {userDetails && (
                        <MyContactCard
                            contact={userDetails}
                            clickHandler={deleteContactHandler}
                            userDetails={userDetails}
                        />
                    )}
                </div>)}

                <div className="contact2-form-title2">
                    Contact list
                    {
                        userDetails.position === "HOD" ? (
                                   <Link to="/add" className="contact2-form-add" >
                                       <button className="btn2">Add contact</button>
                                   </Link>
                             ) : (
                            <h2>Hi, {userDetails.name}</h2>
                        )
                    }
                </div>

                {/* Display total contacts count excluding userDetails */}
                <div className="con-length">Total Contacts: {filteredContacts.length}</div>

                <div className="con-search">
                    <div className="con-search-input">
                        <input
                            ref={inputE1}
                            type="text"
                            placeholder="Search Contact"
                            className="Prompt"
                            value={props.term}
                            onChange={getSearchTerm}
                        />
                        <i className="fa fa-search"></i>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "100%",
                        marginBottom: "10px"
                    }}>
                        <button
                            className="btn-fill-search btn2"
                            onClick={() => fillSearchWithDept("BE.CSE")}
                        >
                            BE.CSE
                        </button>

                        <button
                            className="btn-fill-search btn2"
                            onClick={() => fillSearchWithDept("BE.ECE")}
                        >
                            BE.ECE
                        </button>

                        <button
                            className="btn-fill-search btn2"
                            onClick={() => fillSearchWithDept("BTech.IT")}
                        >
                            BTech.IT
                        </button>
                        <button
                            className="btn-fill-search btn2"
                            onClick={() => fillSearchWithDept("")}
                        >
                            Clear filter
                        </button>
                    </div>
                </div>

                {/* Render filtered contacts list */}
                <div className="con-list">
                    {renderContactList.length > 0 ? renderContactList :
                        <div className="con-list-empty">No Contacts Found</div>}
                </div>
            </div>
        </div>
    );
};

export default ContactList;
