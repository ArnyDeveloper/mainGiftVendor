import { useState } from "react";

interface PasswordFormProps {
    password: string;
    onPasswordChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error?: string; // new
}

const PasswordForm = ({ password, onPasswordChange, onSubmit, error }: PasswordFormProps) => {
    const [showPasswordText, setShowPasswordText] = useState(false);

    return (
        <form onSubmit={onSubmit}>
            <div className="password-container">
                <p className="verify-text">To continue, first verify it's you</p>

                <div className="input-wrapper">
                    <div className="input-field">
                        <input
                            type={showPasswordText ? "text" : "password"}
                            className={`password-field ${error ? "input-error" : ""}`}
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            autoFocus
                            required
                        />
                        <span className={`input-label ${password ? "active" : ""}`}>
                            Enter your password
                        </span>
                    </div>
                    {/* show error message if present */}
                    {error && <p className="error-text">{error}</p>}
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
                    <a href="#" className="forgot-link">Try another way</a>
                    <button type="submit" className="next-btn password-next">
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;