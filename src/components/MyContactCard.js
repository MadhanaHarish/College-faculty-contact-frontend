import React from "react";
import {Link} from "react-router-dom";

const MyContactCard = (props) => {
    const {userDetails} = props;

    return (

        <div className="my-item">
            <img
                className="image-avtar"
                src={userDetails.photo || "https://www.gravatar.com/avatar/?d=mp"} // Default image if no photo
                alt="user"
            />
            <Link to={`/contact/${userDetails.id}`}>
                <div className="content">
                    <div className="item-name">{userDetails.name}</div>
                    <div className="item-phone">{userDetails.phoneNumber}</div>
                    {/* Display phone number */}
                    <div className="item-department">{userDetails.department}</div>
                    {/* Display department */}
                </div>
            </Link>
            <Link to={{pathname: `/edit/${userDetails.id}`, id: userDetails.id}}>
                <i className="edit-icon fa fa-edit"/>
            </Link>
            <i
                className="disabled-link"
                onClick={() => {
                }}
                style={{cursor: 'not-allowed', opacity: 0.5}}
            />
        </div>
    );
};

export default MyContactCard;
