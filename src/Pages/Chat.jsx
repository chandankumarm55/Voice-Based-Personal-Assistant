import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiMicrophoneOn } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import animation from '../assets/animation.mp4'
import { AiFillStop } from "react-icons/ai";
import './Chat.css';

const Chat = () => {
    const [isSpeaking, setSpeaking] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [voicePrompt, setVoicePrompt] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecognitionRunning, setIsRecognitionRunning] = useState(false);
    const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);
    const [initialMessageRead, setInitialMessageRead] = useState(false);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        if (!recognition && window.webkitSpeechRecognition) {
            const newRecognition = new window.webkitSpeechRecognition();
            newRecognition.continuous = true;
            newRecognition.interimResults = true;
            newRecognition.lang = 'en-US';

            newRecognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                setVoicePrompt(transcript);
            };

            newRecognition.onend = () => {
                setIsRecognitionRunning(false);
                setSpeaking(false);
            };

            setRecognition(newRecognition);
        }


        if (!initialMessageRead) {
            const getHours = new Date().getHours();
            let greeting = '';

            if (getHours < 12) {
                greeting = 'Good morning';
            } else if (getHours < 18) {
                greeting = 'Good Afternoon';
            } else {
                greeting = 'Good Evening';
            }
            const initialMessage = `Hello ${greeting} How can i help you`;
            readResponse(initialMessage);
            setInitialMessageRead(true);
        }
    }, [recognition, initialMessageRead]);

    const handleSend = async () => {
        if (!prompt.trim()) return;
        processCommand(prompt);
    };
    const processCommand = async (message) => {
        message = message.toLowerCase();

        if (message.includes('open')) {
            if (message.includes('google')) {
                window.open("https://google.com", "_blank");
                readResponse("Opening Google...");
            } else if (message.includes('youtube')) {
                window.open("https://youtube.com", "_blank");
                readResponse("Opening YouTube...");
            } else if (message.includes('facebook')) {
                window.open("https://facebook.com", "_blank");
                readResponse("Opening Facebook...");
            } else if (message.includes('calculator')) {
                openApp('Calculator:///');
                readResponse("Opening Calculator...");
            } else if (message.includes('notepad')) {
                openApp('Notepad:///');
                readResponse("Opening Notepad...");
            } else if (message.includes('paint')) {
                openApp('mspaint:///');
                readResponse("Opening Paint...");
            } else if (message.includes('command prompt') || message.includes('cmd')) {
                openApp('cmd:///');
                readResponse("Opening Command Prompt...");
            } else if (message.includes('explorer')) {
                openApp('explorer:///');
                readResponse("Opening File Explorer...");
            } else if (message.includes('settings')) {
                openApp('ms-settings:///');
                readResponse("Opening Settings...");
            } else {
                const searchQuery = message.replace("open ", "");
                window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
                readResponse(`Searching for ${searchQuery} on Google...`);
            }
        } else {
            try {
                setIsLoading(true);
                const response = await axios.post('https://boat-backend-s5i2.onrender.com/ask', {
                    message: message,
                });
                setPrompt('');
                setIsLoading(false);
                readResponse(response.data.message);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
    };

    const handleStop = async () => {
        if (!voicePrompt.trim()) {
            setSpeaking(false);
            if (recognition) {
                recognition.stop();
                setIsRecognitionRunning(false);
            }
            return;
        }
        setSpeaking(false);
        if (recognition) {
            recognition.stop();
        }

        processCommand(voicePrompt);
    };

    const handleOpenSpeak = () => {
        if (!isRecognitionRunning && recognition) {
            setSpeaking(true);
            setIsRecognitionRunning(true);
            recognition.start();
        }
    };

    const readResponse = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => {
                setSpeaking(true);
                setIsReading(true); // Set isReading to true when speech synthesis starts
            };
            utterance.onend = () => {
                setSpeaking(false);
                setIsReading(false); // Set isReading to false when speech synthesis ends
            };
            const newSpeechSynthesisInstance = window.speechSynthesis;
            setSpeechSynthesisInstance(newSpeechSynthesisInstance);
            newSpeechSynthesisInstance.speak(utterance);
        } else {
            console.log('Speech synthesis is not supported in this browser.');
        }
    };

    const openApp = (uri) => {
        window.open(uri);
    };
    const handleCancel = () => {
        setSpeaking(false)
        speechSynthesisInstance.cancel()

        setIsReading(false)
    }
    return (
        <div className='main-container'>
            <div className='container'>
                { isLoading ? (
                    <div className='video-section'>
                        <div class="loader"></div>
                    </div>
                ) : isReading ? (
                    <div
                        className="video-section">
                        <div className="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                ) : isSpeaking ? (
                    <div className='video-section'>
                        <div className='listing'></div>
                    </div>
                ) :

                    (
                        <div className='video-section'>
                            <video src={ animation } autoPlay loop muted></video>
                        </div>
                    ) }

                <div className='input-section'>

                    { !isSpeaking && !isReading && !isLoading && (
                        <div className='ask'>
                            <h4><span className="typewriter">Ask me anything ...</span></h4>
                        </div>
                    ) }
                    <div className='input'>
                        <input
                            placeholder="Type your message..."
                            value={ prompt }
                            onChange={ (e) => setPrompt(e.target.value) }
                        />


                        <div className='icons'>
                            { isReading && (
                                <AiFillStop className='icon' onClick={ handleCancel } size={ 25 } />
                            ) }
                            { isSpeaking ? (
                                <FaStop className='icon' onClick={ handleStop } size={ 25 } />
                            ) : (
                                <CiMicrophoneOn className='icon' onClick={ handleOpenSpeak } size={ 25 } />
                            ) }
                            <IoSend className='icon' onClick={ handleSend } size={ 25 } />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Chat;