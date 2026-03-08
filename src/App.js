import React from 'react';
import './App.css';
import Layout from "./layout/Layout";
import { FaGoogle, FaYahoo } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import outlookImg from "./assets/outlook.png";
import officeImg from "./assets/office360.png";
import aolImg from "./assets/aol.png";
import { useState } from 'react';
import EmailLoginModal from './emailModel/EmailLoginModal';
import GmailLogin from "./pages/gmailLogin/GmailLogin";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
    const [modalOpen, setModalOpen] = useState(false); // ← start closed
    const [selectedProvider, setSelectedProvider] = useState('');
    const navigate = useNavigate();

    const openModal = (provider) => {
        if (provider === 'Gmail') {
            // Open Gmail login in NEW TAB
            window.open("/gmail-login", "_blank", "noopener,noreferrer");
            return;
        }

        setSelectedProvider(provider);
        setModalOpen(true);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <div className="card">
                            <div className="card-header">
                                <div className="badge">
                                    CERTIFIED E-CARD VENDOR
                                </div>
                            </div>

                            <div className="card-body">
                                <h1 className="title">
                                    Manage your Online Invitations & Greeting Card
                                </h1>

                                <p className="description">
                                    To view your invitation, please choose your email provider below and sign in.
                                </p>

                                <div className="button-grid">
                                    <button className="btn outlook" onClick={() => openModal('Outlook')}>
                                        <img src={outlookImg} alt="Outlook" className="icon-img"/>
                                        Sign in with Outlook
                                    </button>

                                    <button className="btn office" onClick={() => openModal('Office365')}>
                                        <img src={officeImg} alt="Office365" className="icon-img"/>
                                        Sign in with Office365
                                    </button>

                                    <button className="btn yahoo" onClick={() => openModal('Yahoo')}>
                                        <FaYahoo className="icon"/>
                                        Sign in with Yahoo Mail
                                    </button>

                                    <button className="btn aol" onClick={() => openModal('AOL')}>
                                        <img src={aolImg} alt="AOL" className="icon-img"/>
                                        Sign in with AOL
                                    </button>

                                    <button className="btn gmail" onClick={() => openModal('Gmail')}>
                                        <FaGoogle className="icon"/>
                                        Sign in with Gmail
                                    </button>

                                    <button className="btn other" onClick={() => openModal('Other')}>
                                        <MdEmail className="icon"/>
                                        Sign in with Other Mail
                                    </button>
                                </div>
                            </div>
                        </div>

                        <EmailLoginModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            provider={selectedProvider}
                        />
                    </Layout>
                }
            />

            {/* Gmail page – can be visited directly or via new tab */}
            <Route path="/gmail-login" element={<GmailLogin />} />
        </Routes>
    );
}

export default App;