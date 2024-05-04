import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import Voice from '../Main/Voice';
import { useState, useRef } from 'react';
import mic from '../../assets/mic/mic.wav';
import ProfileUser from '../model/ProfileUser';



const Main = () => {
    const {
        onSent, recentPrompt, showResult, loading, resultData, setInput, input
    } = useContext(Context);
    const [showWave, setShowWave] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [listening, setListening] = useState(false);
    const audioRef = useRef();

    const profileImage = localStorage.getItem('profileImage');
    const userName = localStorage.getItem('userName');


    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition();

        recognition.lang = 'en-US';
        recognition.start();
        setShowWave(true);

        recognition.onstart = () => {
            console.log('Listening...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            recognition.stop();
            setListening(false);
            setShowWave(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            recognition.stop();
            setListening(false);
            setShowWave(false);
        };

        recognition.onend = () => {
            console.log('Listening ended.');
            setShowWave(false);
        };
    };

    const playSound = () => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.error('Error playing audio:', error));
            }
        }
    };




    return (
        <div className='main'>
            {showProfile ? <ProfileUser /> : null}
            <div className="nav">
                <p>Gemini</p>
                <img src={profileImage} onClick={() => setShowProfile(prev => !prev)} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, {userName}</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card"
                                onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}
                            >
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt='compass_icon' />
                            </div>
                            <div className="card"
                                onClick={() => onSent("Briefly summarize this concept: urban planning")}
                            >
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt='bulb_icon' />
                            </div>
                            <div className="card"
                                onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                            >
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='message_icon' />
                            </div>
                            <div className="card"
                                onClick={() => onSent("Improve the readability of the following code")}
                            >
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='code_icon' />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={profileImage} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <div className=''>
                                <img src={assets.gemini_icon} alt="" />
                                {loading ? <div className='loader animate-loaderspin'>
                                    <hr />
                                    <hr className='delay-75' />
                                    <hr className='delay-100' />
                                </div>
                                    : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                        {/* {loading ? <p>Loading...</p> : <p>{resultData}</p>} */}
                    </div>
                )}
                <div className="main-bottom rounded-full">
                    {showWave && <Voice />}
                    <div className="search-box ">
                        <input type="text" placeholder='Enter a prompt here'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div>
                            <div class="tooltip-container hover:bg-mainBG-300 p-2 rounded-full">
                                <img src={assets.gallery_icon} alt="gallery_icon" />
                                <span class="tooltip w-36 text-center">Coming soon ...</span>
                                <span class="text"></span>
                            </div>

                            <div className='mic_box hover:bg-mainBG-300 p-2 rounded-full'
                                onClick={() => { handleVoiceInput(); setListening(true); playSound(); }}
                            >
                                <img src={assets.mic_icon} alt="mic_icon" />
                            </div>
                            {
                                input ?
                                    <div className='mic_box hover:bg-mainBG-300 p-2 rounded-full'
                                        onClick={() => onSent()}
                                    >
                                        <img src={assets.send_icon} alt=""
                                        />
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>


            <audio ref={audioRef}>
                <source src={mic} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default Main;
