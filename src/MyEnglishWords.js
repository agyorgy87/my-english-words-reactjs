import React, {useState} from "react";
import './MyEnglishWords.css';
import axios from "axios";


const MyEnglishWords = () => {

    const [randomWord, setRandomWord] = useState(null);

    const [inputValues, setInputValues] = useState ({
        englishWord: "",
        hungarianWord: ""
    })

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
                setRandomWord(response.data);
            })
            .catch(error => {
                console.log("error:", error)
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <div>
                    <p>the english word</p>
                </div>
                <div class="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"/>
                </div>
                <div>
                    <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={randomEnglishWord}
                    >                   
                    new word
                    </button>
                    {randomWord && (
                        <div>
                            <p><strong>Random English Word:</strong> {randomWord.englishWord}</p>
                        </div>
                    )}
                </div>
                <div>
                    <p>response - correct or not, if not correct show the word.</p>
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
