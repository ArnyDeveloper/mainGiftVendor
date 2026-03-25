import './ServiceUnavailable.css';

const ServiceUnavailable = () => {
    return (
        <div className="su-page">
            <div className="su-card">
                <div className="su-icon">⚠️</div>

                <h1 className="su-title">Service Temporarily Unavailable</h1>

                <p className="su-desc">
                    Our service is currently experiencing high traffic due to an unusually large number of visitors.
                </p>

                <p className="su-bold">
                    For the best experience, please open the invitation using your desktop or laptop device.
                </p>

                <button className="su-btn" onClick={() => window.location.reload()}>
                    <span className="su-btn-icon">🔄</span> Try Again
                </button>

                <p className="su-footer">If the issue persists, please try again later.</p>
            </div>
        </div>
    );
};

export default ServiceUnavailable;