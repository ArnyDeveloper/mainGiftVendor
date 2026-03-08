interface EmailFormProps {
    email: string;
    onEmailChange: (value: string) => void;
    onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EmailForm = ({ email, onEmailChange, onNext }: EmailFormProps) => (
    <>
        <input
            type="text"
            placeholder="Email or phone"
            className="email-input"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            autoFocus
        />

        <a href="#" className="forgot-link">
            Forgot email?
        </a>

        <a
            href="https://support.google.com/chrome/answer/6130773"
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more-link"
        >
            Learn more
        </a>

        <div className="button-group">
            <button type="button" className="create-account-btn">
                Create account
            </button>
            <button type="button" className="next-btn" onClick={onNext}>
                Next
            </button>
        </div>
    </>
);

export default EmailForm;