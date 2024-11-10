import React from "react";

// Define constants outside the class to avoid re-creating them on every render
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = Array.from({length: 8}, (_, i) => i + 1);
const departments = ["BE.CSE", "BTech.IT", "BE.ECE", "BE.EEE"];
const positions = ["HOD", "Staff"];

class EditContact extends React.Component {
    constructor(props) {
        super(props);
        const location = window.location;
        const _id = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

        const contact = props.contacts.find((contact) => contact._id === _id) || {};
        const {name, phoneNumber, photo, department, position, qualification, tableData, password} = contact;

        this.state = {
            _id,
            name: name || "",
            phoneNumber: phoneNumber || "",
            photo: photo || "",
            department: department || "",
            position: position || "",
            qualification: qualification || "",
            password: password || "",
            confirmPassword: "", // for password confirmation only
            tableData: tableData || Array.from({length: 8}, () => Array(6).fill("")),
            errors: {
                name: "",
                phoneNumber: "",
                department: "",
                position: "",
                qualification: "",
                photo: "",
                password: "",
                confirmPassword: ""
            }
        };
    }

    handleTableChange = (rowIndex, colIndex, value) => {
        const newTableData = [...this.state.tableData];
        newTableData[rowIndex][colIndex] = value;
        this.setState({tableData: newTableData});
    };

    validateInputs = () => {
        const {name, phoneNumber, department, position, qualification, photo, password, confirmPassword} = this.state;
        let errors = {
            name: "",
            phoneNumber: "",
            department: "",
            position: "",
            qualification: "",
            photo: "",
            password: "",
            confirmPassword: ""
        };
        let isValid = true;

        if (!/^[A-Za-z\s.]+$/.test(name)) {
            errors.name = "Name should contain only alphabets and spaces";
            isValid = false;
        }

        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone number must be exactly 10 digits";
            isValid = false;
        }

        if (department === "") {
            errors.department = "Please select a department";
            isValid = false;
        }

        if (position === "") {
            errors.position = "Please select a position";
            isValid = false;
        }

        if (!/^[A-Za-z\s.,]+$/.test(qualification)) {
            errors.qualification = "Qualification should contain only alphabets, spaces, dots, and commas";
            isValid = false;
        }

        if (photo === "" || !/^https?:\/\/.+/.test(photo)) {
            errors.photo = "Please provide a valid URL for the photo";
            isValid = false;
        }

        if (password === "" || password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        this.setState({errors});
        return isValid;
    };

    update = (e) => {
        e.preventDefault();

        if (this.validateInputs()) {
            // Pass updated contact data including password to parent handler
            const {confirmPassword, ...contactData} = this.state; // Exclude confirmPassword
            this.props.updateContactHandler(contactData);
        }
    };

    render() {
        return (
            <div className="container-contact2">

                <div className="wrap-contact2">
                    <form className="contact2-form" onSubmit={this.update}>
                        <span className="contact2-form-title">Edit Contact</span>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.name}</span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Phone Number"
                                type="text"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={(e) => this.setState({phoneNumber: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.phoneNumber}</span>
                        </div>

                        <div className="wrap-input2">
                            <select
                                className="input2"
                                name="department"
                                value={this.state.department}
                                onChange={(e) => this.setState({department: e.target.value})}
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <span style={{color: "red"}}>{this.state.errors.department}</span>
                        </div>

                        {
                            this.state.position === "HOD" && <div className="wrap-input2">
                                <select
                                    className="input2"
                                    name="position"
                                    value={this.state.position}
                                    onChange={(e) => this.setState({position: e.target.value})}
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((pos, index) => (
                                        <option key={index} value={pos}>{pos}</option>
                                    ))}
                                </select>
                                <span style={{color: "red"}}>{this.state.errors.position}</span>
                            </div>
                        }

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Qualification"
                                type="text"
                                name="qualification"
                                value={this.state.qualification}
                                onChange={(e) => this.setState({qualification: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.qualification}</span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Photo URL"
                                type="text"
                                name="photo"
                                value={this.state.photo}
                                onChange={(e) => this.setState({photo: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.photo}</span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.password}</span>
                        </div>

                        <div className="wrap-input2">
                            <input
                                className="input2"
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({confirmPassword: e.target.value})}
                            />
                            <span style={{color: "red"}}>{this.state.errors.confirmPassword}</span>
                        </div>

                        {/* Editable 7x9 Table */}
                        <table className="contact-table">
                            <thead>
                            <tr>
                                <th></th>
                                {daysOfWeek.map((day, index) => (
                                    <th key={index}>{day}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {periods.map((period, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td><strong>{period}</strong></td>
                                    {daysOfWeek.map((_, colIndex) => (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={this.state.tableData[rowIndex][colIndex] || ""}
                                                onChange={(e) =>
                                                    this.handleTableChange(rowIndex, colIndex, e.target.value)
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button className="btn">Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditContact;
