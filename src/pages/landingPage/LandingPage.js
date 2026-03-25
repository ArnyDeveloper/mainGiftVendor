import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Layout from "../../layout/Layout";

const TARGET_DATE = new Date(process.env.REACT_APP_TARGET_DATE); // April 15, 2026 01:00 EST

const LandingPage = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date();
        const diff = TARGET_DATE - now;

        if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        return { months, days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Layout>
        <div className="landing-page">
            {/* Background texture overlay */}
            <div className="landing-overlay" />

            <div className="landing-content">
                {/* Main heading */}
                <h1 className="landing-title">Celebrate Life's Beautiful Moments</h1>

                <p className="landing-subtitle">
                    Join us for an evening filled with joy, laughter, and warm memories.
                </p>
                <p className="landing-subtitle-small">
                    For the best experience, we suggest viewing this invite on your computer.
                </p>
                <p className="landing-note">
                    Take a moment to check out the "View Party Highlights" below for all the exciting details, and don't forget to RSVP!
                </p>

                {/* CTA Button */}
                <button
                    className="landing-cta-btn"
                    onClick={() => navigate("/home")}
                >
                    View Party Highlights
                </button>

                {/* Countdown */}
                <div className="landing-countdown">
                    {[
                        { label: "mo", value: timeLeft.months },
                        { label: "d", value: timeLeft.days },
                        { label: "h", value: timeLeft.hours },
                        { label: "m", value: timeLeft.minutes },
                        { label: "s", value: timeLeft.seconds },
                    ].map(({ label, value }) => (
                        <div key={label} className="countdown-unit">
                            <span className="countdown-value">{value}</span>
                            <span className="countdown-label">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Event details */}
                <div className="landing-details">
                    <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span className="detail-label">When</span>
                        <span className="detail-value">April 15, 2026</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-label">Where</span>
                        <span className="detail-value">TBD</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-icon">🕐</span>
                        <span className="detail-label">Time</span>
                        <span className="detail-value">01:00 EST</span>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default LandingPage;