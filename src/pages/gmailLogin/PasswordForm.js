import { useState } from "react";

interface PasswordFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PasswordForm = ({ onSubmit }: PasswordFormProps) => {
    const [password, setPassword] = useState("");
    const [showPasswordText, setShowPasswordText] = useState(false);

    return (
        <form onSubmit={onSubmit}>
            <div className="password-container">
                <p className="verify-text">To continue, first verify it's you</p>

                <div className="input-wrapper">
                    <div className="input-field">
                        <input
                            type={showPasswordText ? "text" : "password"}
                            className="password-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            required
                        />
                        <span className={`input-label ${password ? "active" : ""}`}>
              Enter your password
            </span>
                    </div>
                </div>

                <div className="checkbox-row">
                    <input
                        type="checkbox"
                        id="show-password"
                        checked={showPasswordText}
                        onChange={(e) => setShowPasswordText(e.target.checked)}
                    />
                    <label htmlFor="show-password">Show password</label>
                </div>

                <div className="action-row">
                    <a href="#" className="forgot-link">
                        Try another way
                    </a>
                    <button type="submit" className="next-btn password-next">
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;
