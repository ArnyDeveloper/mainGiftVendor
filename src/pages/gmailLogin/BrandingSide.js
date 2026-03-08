import GoogleLogo from "./GoogleLogo";
import EmailRow from "./EmailRow";

interface BrandingSideProps {
    showPassword: boolean;
    email: string;
}

const BrandingSide = ({ showPassword, email }: BrandingSideProps) => (
    <div className="branding-side">
        <GoogleLogo />
        <h1>{showPassword ? "Welcome" : "Sign in"}</h1>
        {!showPassword ? (
            <p className="subtitle">to continue to Gmail</p>
        ) : (
            <EmailRow email={email} />
        )}
    </div>
);

export default BrandingSide;
