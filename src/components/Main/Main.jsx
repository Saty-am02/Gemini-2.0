import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import Voice from '../Main/Voice';
import { useState, useRef } from 'react';
import mic from '../../assets/mic/mic.wav';
import ProfileUser from '../model/ProfileUser';
import gemini_gem from '../../assets/googleIcons/gemini_gem.svg';
import profilee from '../../assets/SVGpatterns/profilee.png';




const Main = () => {
    const {
        onSent, recentPrompt, showResult, loading, resultData, setInput, input
    } = useContext(Context);
    const [showWave, setShowWave] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [listening, setListening] = useState(false);
    const audioRef = useRef();

    const profileImage = localStorage.getItem('profileImage') || profilee;
    const userName = localStorage.getItem('userName') || 'satyam';



    const keyDownHandler = (e) => {
        console.log(e.key);
        if (e.keyCode === 13) {
            onSent();
        }
    };

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
        <div className='main -ml-20'>
            {showProfile ? <ProfileUser /> : null}
            <div className="nav ml-3">
                <p className='smallText'>Gemini</p>
                <img src={profileImage} onClick={() => setShowProfile(prev => !prev)} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet tracking-tight">
                            <p className='head font-poppins font-normal'>Hello<span className='font-outfit'>,</span> {userName}</p>
                            <p className='bigText font-poppins -mt-5'>How can I help you today?</p>
                        </div>
                        <div className="cards mt-5">
                            <div className="card"
                                onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}
                            >
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <div className='imgs flex justify-center items-center'>
                                    <div className='compass dimension' alt='compass_icon' ></div>
                                </div>
                            </div>
                            <div className="card"
                                onClick={() => onSent("Briefly summarize this concept: urban planning")}
                            >
                                <p>Briefly summarize this concept: urban planning</p>
                                <div className='imgs flex justify-center items-center'>
                                    <div className='bulb dimension' alt='bulb_icon' />
                                </div>
                            </div>
                            <div className="card"
                                onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                            >
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <div className='imgs flex justify-center items-center'>
                                    <div className='draw dimension' alt='message_icon' />
                                </div>

                            </div>
                            <div className="card"
                                onClick={() => onSent("Improve the readability of the following code")}
                            >
                                <p>Improve the readability of the following code</p>
                                <div className='imgs flex justify-center items-center'>
                                    <div className='code dimension' alt='code_icon' />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={profileImage} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="">
                            <div className='w-full result-data'>
                                <img src={gemini_gem} className={`gemini-gem ${loading ? 'animate-spin' : ''}`} alt="" />
                                {loading ?
                                    <div className='loader'>
                                        <hr className='hr1' />
                                        <hr className='hr2' />
                                        <hr className='w-80 hr3' />
                                    </div>
                                    : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                    </div>
                )}
                <div className="main-bottom rounded-full">
                    {showWave && <Voice />}
                    <div className="search-box " >
                        <input type="text" placeholder='Enter a prompt here'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={keyDownHandler}
                        />
                        <div>
                            <div class="p-2  hov group transition-all rounded-full">
                                <div className='flex justify-center items-center'>
                                    <div className='upload_img dimension  ' alt='code_icon' />
                                    
                                </div>
                                <span
                                class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm translate-y-12 `}
                                >comming soon...
                                </span>
                            </div>

                            <div class="p-2 rounded-full hov group transition-all"
                                onClick={() => { handleVoiceInput(); setListening(true); playSound(); }}>
                                <div className='flex justify-center items-center'>
                                    <div className='mic_none dimension ' alt='code_icon' />
                                    <span
                                        class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm translate-y-12 `}
                                        >Use microphone
                                        </span>
                                </div>
                                

                            </div>

                            {
                                input ?
                                    <div
                                        className='hov group transition-all p-2 rounded-full flex justify-center items-center'
                                        onClick={() => onSent()}

                                    >
                                        <div className='flex justify-center items-center'>
                                        <div className='send dimension' alt='code_icon' />
                                        </div>
                                        
                                        <span
                                                class={`absolute opacity-0 px-2 py-1 rounded-md group-hover:opacity-100 background text-sm translate-y-12 `}
                                            >Submit
                                            </span>

                                    </div>

                                    :
                                    null
                            }

                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. <span>Your privacy and Gemini Apps</span>
                    </p>
                </div>
            </div>


            <audio ref={audioRef}>
                <source src={mic} type="audio/wav" />
                Your browser does not support the audio.
            </audio>
        </div>
    );
}

export default Main;
