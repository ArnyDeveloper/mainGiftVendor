import { useState } from "react";
import BrandingSide from "./BrandingSide";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import Footer from "./Footer";
import "./GmailLogin.css";

const GmailLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.trim()) {
            setShowPassword(true);
        } else {
            alert("Please enter your email or phone");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Login successful! (This is just a demo)");
    };

    return (
        <div className="gmail-login-page">
            <div className="login-card">
                <BrandingSide showPassword={showPassword} email={email} />

                <div className="form-side">
                    {!showPassword ? (
                        <EmailForm email={email} onEmailChange={setEmail} onNext={handleNext} />
                    ) : (
                        <PasswordForm onSubmit={handleSubmit} />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GmailLogin;
