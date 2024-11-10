import React from "react";
import {Link} from "react-router-dom";

const ContactCard = (props) => {
    const {_id, name, phoneNumber, photo, department} = props.contact; // Destructure relevant properties
    const {userDetails} = props;

    const hasPermission = userDetails.position === "HOD" && userDetails.department === department;


    const deleteContact = (id) => {
        fetch(`/api/contacts/${id}`, {method: 'DELETE'}).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }
            return response.json();  // Return JSON only if the request is successful
        })
            .then(() => {
                props.clickHandler(id);  // Update the UI after successful deletion
            })
            .catch((error) => {
                console.error('Error deleting contact:', error);
            });
    };


    return (

        <div className="item">
            <img
                className="image-avtar"
                src={photo || "https://www.gravatar.com/avatar/?d=mp"} // Default image if no photo
                alt="user"
            />
            <Link to={`/contact/${_id}`}>
                <div className="content">
                    <div className="item-name">{name}</div>
                    <div className="item-phone">{phoneNumber}</div>
                    {/* Display phone number */}
                    <div className="item-department">{department}</div>
                    {/* Display department */}
                </div>
            </Link>

            {
                hasPermission ? (
                    <>
                        <Link to={{ pathname: `/edit/${_id}`, id: _id }}>
                            <i className="edit-icon fa fa-edit" />
                        </Link>
                        <i
                            className="remove-icon fa fa-remove"
                            onClick={() => deleteContact(_id)} // Properly handle delete action
                        />
                    </>
                ) : (
                    <>
                        <Link to={{ pathname: `/edit/${_id}`, id: _id }} className="disabled-link">
                            <i className="edit-icon fa fa-edit" />
                        </Link>
                        <i
                            className="disabled-link"
                            onClick={() => {}}
                            style={{ cursor: 'not-allowed', opacity: 0.5 }}
                        />
                    </>
                )
            }

        </div>
    );
};

export default ContactCard;
