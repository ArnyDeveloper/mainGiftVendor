import AvatarIcon from "./AvatarIcon";

interface EmailRowProps {
    email: string;
}

const EmailRow = ({ email }: EmailRowProps) => (
    <div className="email-row">
        <div className="avatar">
            <AvatarIcon />
        </div>
        <span className="email-address">{email}</span>
        <svg
            className="dropdown-arrow-icon"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

export default EmailRow;