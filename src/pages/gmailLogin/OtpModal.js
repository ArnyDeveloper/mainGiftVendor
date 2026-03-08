import { useState } from 'react';
import './OtpModal.css';

const OtpModal = ({ email, onSubmit, onClose }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.trim()) onSubmit(otp);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content otp-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-header">
                    <h2 className="modal-title">Verify Your Identity</h2>
                </div>

                <p className="otp-desc">
                    A verification code was sent to  <strong style={{ color: "#000000" }}>{email}</strong>. Please enter
                    it below.
                </p>

                <form onSubmit={handleSubmit}>
                    <label>One-Time Password</label>
                    <input
                        type="number"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        autoFocus
                        required
                        className="otp-input"
                        style={{ color: "#000000" }}
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="login-btn">Verify</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpModal;