import React, { useState, useContext, useEffect } from 'react';
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

    useEffect(() => {
        let timer;
        if (showTheme) {
            timer = setTimeout(() => {
                setShowTheme(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showTheme]);

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
            <div className={`sidebar ${extended ? 'expanded' : ''}`} style={{ background: selectedBg }}>
                <div className="top">
                    <div className='relative -top-2 -mt-1.5 hov w-fit rounded-full p-3'>
                        <div onClick={() => setExtended(prev => !prev)} className='dimension menu' alt="" />
                    </div>


                    <div className="new-chat" onClick={() => newChat()}>

                        <div className='add dimension' alt='code_icon' />

                        {extended ? <p className={` font-bold ${extended ? 'newspan' : ''}`}>New Chat</p> : null}
                    </div>
                    {extended ?
                        <div className='recent'>
                            <p className="recent-title font-bold">Recent</p>
                            <div className='h-96 overflow-auto'>
                                {prevPrompts.map((item, index) => (
                                    <div key={index} className="recent-entry" onClick={() => loadPrompt(item)}>
                                        <div className='flex justify-center items-center'>
                                            <div className='message dimension' alt='code_icon' />
                                        </div>
                                        <p title={item}>{item.slice(0, 18)}...</p>
                                    </div>
                                ))}
                            </div>
                        </div> : null
                    }
                </div>
                
                <div className="bottom">
                    <div className="bottom-item recent-entry hov group transition-all "onClick={toggleHelp}>

                        <div className='flex justify-center items-center'>
                            <div className='helps dimension' alt='code_icon' />
                        </div>
                        {extended ? <p className='w-36'>Help</p> : null}
                        {showHelp ? null  : <span
                            class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm ${extended ? 'group-hover:translate-x-60' : 'group-hover:translate-x-16'}`}
                            >Help
                        </span>}
                    </div>

                    <div className="bottom-item recent-entry hov group transition-all " onClick={toggleBGTheme}>

                        <div className=' flex justify-center items-center'>
                            <div className='style dimension' alt='code_icon' />
                        </div>
                        {extended ? <p className='w-36'>Theme</p> : null}
                        {showBGTheme ? null  : <span
                            class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm ${extended ? 'group-hover:translate-x-60' : 'group-hover:translate-x-16'}`}
                            >Theme
                        </span>}
                    </div>

                    <div className="bottom-item recent-entry hov group transition-all " onClick={toggleTheme}>

                        <div className='flex justify-center items-center'>
                            <div className='settings dimension' alt='code_icon' />
                        </div>

                        {extended ? <p className='w-36'>Setting</p> : null}
                        {showTheme ? null  : <span
                            class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm ${extended ? 'group-hover:translate-x-60' : 'group-hover:translate-x-16'}`}
                            >settings
                        </span>}
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
