import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure to import the CSS

function Login({ setAuth, setUserDetails }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState(""); // For login error response
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setEmailError("");
        setPasswordError("");
        setLoginError("");

        // Basic validation
        let valid = true;
        if (!email) {
            setEmailError("Please enter your email");
            valid = false;
        }
        if (!password) {
            setPasswordError("Please enter your password");
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await axios.post("/api/contacts/login", { email, password });
            if (response.data.success) {
                setAuth(true);
                setUserDetails({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    department: response.data.department,
                    qualification: response.data.qualification,
                    position: response.data.position,
                    photo: response.data.photo,
                    tableData: response.data.tableData,
                });
                localStorage.setItem('token', response.data.token); // Store JWT token (if using token-based auth)
                navigate("/"); // Redirect to the home page
            } else {
                setLoginError(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            setLoginError("An error occurred. Please try again.");
            console.error("Login error", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span style={{ color: "red" }}>{emailError}</span>
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span style={{ color: "red" }}>{passwordError}</span>
                    </div>
                    <button type="submit">Login</button>
                    <span style={{ color: "red" }}>{loginError}</span>
                </form>
            </div>
        </div>
    );
}

export default Login;
