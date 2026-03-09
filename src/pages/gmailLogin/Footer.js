const LANGUAGES = [
    { value: "en-US", label: "English (United States)" },
    { value: "en-GB", label: "English (United Kingdom)" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
];

const FOOTER_LINKS = [
    { label: "Help", href: "https://support.google.com" },
    { label: "Privacy", href: "https://policies.google.com/privacy" },
    { label: "Terms", href: "https://policies.google.com/terms" },
];

const Footer = () => (
    <footer className="page-footer">
        <select className="language-select" defaultValue="en-US">
            {LANGUAGES.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>

        <div className="footer-links">
            {FOOTER_LINKS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                </a>
            ))}
        </div>
    </footer>
);

export default Footer;