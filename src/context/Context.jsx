import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setRecentPrompt("");
        setShowResult(false);
        setLoading(false);
    };

    const onSent = async (prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        if (prompt !== undefined) {
            setRecentPrompt(prompt)                       // jo prompt bharunga vo prompt (input) dikha dega in right side 
            response = await runChat(prompt)
        } else {
            setPrevPrompts((prev) => [...prev, input])   // left side me previous filled (input) show krdunga isse me
            setRecentPrompt(input)
            response = await runChat(input)
        }

        let responseArr = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArr.length; i++) {
            if (i === 0 || i % 2 === 1) {
                newResponse += responseArr[i];
            } else {
                newResponse += "<b>" + responseArr[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponse3 = newResponse2.split(" ");
        for (let i = 0; i < newResponse3.length; i++) {
            const word = newResponse3[i];
            delayPara(i, word + " ");
        }
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts, setPrevPrompts, onSent, setRecentPrompt, recentPrompt, showResult, loading, resultData, input, setInput, newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
