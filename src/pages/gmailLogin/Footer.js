const LANGUAGES = [
    { value: "en-US", label: "English (United States)" },
    { value: "en-GB", label: "English (United Kingdom)" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
];

const FOOTER_LINKS = ["Help", "Privacy", "Terms"];

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
            {FOOTER_LINKS.map((link) => (
                <a key={link} href="#">
                    {link}
                </a>
            ))}
        </div>
    </footer>
);

export default Footer;
