import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import DarkTheme from '../model/DarkTheme';
import BGtheme from '../model/BGtheme';
import Help from '../model/Help';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    const [showBGTheme, setShowBGTheme] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
    const [selectedBg, setSelectedBg] = useState(null);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        let timer;
        if (showHelp) {
            timer = setTimeout(() => {
                setShowHelp(false);
            }, 3000);  
        }
        return () => clearTimeout(timer);
    }, [showHelp]);

    const handleBgSelect = (bg) => {
        setSelectedBg(bg);
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const toggleTheme = () => {
        setShowTheme(prev => !prev);
        setShowBGTheme(false);
        setShowHelp(false); // Close BG theme when toggling theme
    };

    const toggleBGTheme = () => {
        setShowBGTheme(prev => !prev);
        setShowTheme(false);
        setShowHelp(false); // Close theme when toggling BG theme
    };

    const toggleHelp = () => {
        setShowBGTheme(false);
        setShowTheme(false);
        setShowHelp(prev => !prev);
    };

    return (
        <>
            <div className={`sidebar ${extended ? 'extended' : ''}`} style={{ background: selectedBg }}>
                <div className="top">
                    <img onClick={() => setExtended(prev => !prev)} className='sideImg ml-3' src={assets.menu_icon} alt="" />
                    {extended ? <span className='newspan'></span> : null}

                    <div className="new-chat" onClick={() => newChat()}>
                        <img className='w-4' src={assets.plus_icon} alt="" />
                        {extended ? <p>New Chat</p> : null}
                    </div>
                    {extended ?
                        <div className='recent'>
                            <p className="recent-title">Recent</p>
                            {prevPrompts.map((item, index) => (
                                <div key={index} className="recent-entry" onClick={() => loadPrompt(item)}>
                                    <img src={assets.message_icon} className="sideImg" alt="message_icon" />
                                    <p title={item}>{item.slice(0, 18)}...</p>
                                </div>
                            ))}
                        </div> : null
                    }
                </div>
                <div className="bottom">
                    <div className="bottom-item recent-entry" onClick={toggleHelp}>
                        <img className="sideImg drop-shadow-lg" src={assets.history_icon} alt="" />
                        {extended ? <p>Help</p> : null}
                    </div>
                    <div className="bottom-item recent-entry" onClick={toggleBGTheme}>
                        <img className="sideImg drop-shadow-lg" src={assets.theme} alt="" />
                        {extended ? <p>Theme</p> : null}
                    </div>
                    <div className="bottom-item recent-entry" onClick={toggleTheme}>
                        <img className="sideImg" src={assets.setting_icon} alt="" />
                        {extended ? <p>Setting</p> : null}
                    </div>
                </div>
            </div>
            <div className='Darkmode'>
                {showTheme ? <DarkTheme /> : null}
            </div>
            <div className='Bgmode'>
                {showBGTheme ? <BGtheme onBgSelect={handleBgSelect} /> : null}
            </div>
            <div className='Helpmode'>
                {showHelp ? <Help /> : null}
            </div>
        </>
    );
}

export default Sidebar;
