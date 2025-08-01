import React, {useState} from "react";
import './MyEnglishWords.css';
import axios from "axios";


const MyEnglishWords = () => {

    const [randomWord, setRandomWord] = useState(null);

    const [inputValues, setInputValues] = useState ({
        englishWord: "",
        hungarianWord: ""
    })

    const [hungarianInputValue, setHungarianInputValue] = useState(null);

    const [hungarianWordCorrect, setHungarianWordCorrect] = useState(false);

    const [showCorrectOrNot, setShowCorrectOrNot] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputValues({
            ...inputValues,
            [id]: value
        });
    }

    const createWord = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/create-word", inputValues)
            .then(response => {
                console.log("succes", inputValues);
                setInputValues({
                    englishWord: "",
                    hungarianWord: ""
                })
            })
            .catch(error => {
                console.log("error:", error);
            })
    }

    const randomEnglishWord = () => {
        axios.get("http://localhost:8080/random-english-word")
            .then(response => {
                console.log(response.data.id);
                console.log(response.data);
                setRandomWord(response.data);
                setShowCorrectOrNot(false);
            })
            .catch(error => {
                console.log("error:", error)
            })
    }

    const checkHungarianWord = (event) => {
        axios.get(`http://localhost:8080/get-hungarian-word/${randomWord.id}`)
            .then(response => {
                if(response.data.hungarianWord === hungarianInputValue) {
                    setHungarianWordCorrect(true);
                    setShowCorrectOrNot(true);
                }else{
                    setHungarianWordCorrect(false);
                    setShowCorrectOrNot(true);
                }
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div>    
                <div>
                    <div className="d-flex flex-row">
                        <div>
                            <p>Random English Word:</p>
                        </div>
                        <div>
                            {randomWord && (
                                <p>{randomWord.englishWord}</p>                            
                            )}
                        </div>
                    </div>
                    <button 
                    type="button" 
                    className="btn btn-secondary btn-lg mb-3"
                    onClick={randomEnglishWord}
                    >                   
                    new word
                    </button>  
                </div>
                <div class="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    onChange={(e) => setHungarianInputValue(e.target.value)}
                    />
                </div>
                <div>
                    {showCorrectOrNot && <p>{hungarianWordCorrect ? "correct!" : "not correct!"}</p>}
                </div>
                <div>
                    <button
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={checkHungarianWord}
                    >
                        check 
                    </button>
                </div>
                <div>
                    <p>new word:</p>
                </div>
                <div className >
                    <div className="mb-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="englishWord"
                        name="englishWord"
                        value={inputValues.englishWord}
                        onChange={handleInputChange}
                        placeholder="english word" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="hungarianWord"
                        name="hungarianWord"
                        value={inputValues.hungarianWord}
                        onChange={handleInputChange}
                        placeholder="hungarian word" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        />
                    </div>
                    <div>
                        <button 
                        type="button" 
                        className="btn btn-secondary btn-lg"
                        onClick={createWord}
                        >
                        add new word
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyEnglishWords;
