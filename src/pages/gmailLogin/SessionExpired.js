import GoogleLogo from "./GoogleLogo";
import Footer from "./Footer";
import "./SessionExpired.css";

const SessionExpired = () => {
    return (
        <div className="twostep-page">
            <div className="session-card">
                <GoogleLogo />
                <h2 className="session-title">You're not signed in</h2>
                <p className="session-desc">Your session has expired. Please sign in again.</p>

                <div className="session-actions">
                    <button className="session-try-btn" onClick={() => window.location.reload()}>
                        Try again
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SessionExpired;