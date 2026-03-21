import GoogleLogo from "./GoogleLogo";
import Footer from "./Footer";

interface TwoStepVerificationProps {
    email: string;
}

const TwoStepVerification = ({ email }: TwoStepVerificationProps) => {
    return (
        <div className="twostep-page">
            <div className="twostep-card">

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
                    <button className="twostep-resend" onClick={() => {}}>Resend it</button>
                </div>

                {/* ── DIVIDER ── */}
                <div className="twostep-divider" />

                {/* ── RIGHT SIDE ── */}
                <div className="twostep-right">
                    <h3 className="twostep-device-title">Open the Gmail app on your Device</h3>
                    <p className="twostep-device-desc">
                        Google sent a notification to your Device. Open the Gmail app and tap{" "}
                        <strong>Yes</strong> on the prompt to verify it's you.
                    </p>
                    <div className="twostep-checkbox-row">
                        <input type="checkbox" id="dont-ask" defaultChecked />
                        <label htmlFor="dont-ask">Don't ask again on this device</label>
                    </div>
                    <div className="twostep-try-another-wrap">
                        <button className="twostep-try-another" onClick={() => {}}>Try another way</button>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default TwoStepVerification