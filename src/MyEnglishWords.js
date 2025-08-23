import React, {useState, useEffect} from "react";
import './MyEnglishWords.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';



const MyEnglishWords = () => {

    const [allWords, setAllWords] = useState([]);

    const [randomWord, setRandomWord] = useState(null);

    const [inputValues, setInputValues] = useState ({
        englishWord: "",
        hungarianWord: "",
    })

    const [hungarianInputValue, setHungarianInputValue] = useState(null);

    const [hungarianWordCorrect, setHungarianWordCorrect] = useState(false);

    const [showCorrectOrNot, setShowCorrectOrNot] = useState(false);

    const [showHunWord, setShowHunWord] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/all-words")
            .then(response => {
                setAllWords(response.data);
                
            })
            .catch(error => {
          console.error('error:', error);
            });
    }, []);

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
                setShowCorrectOrNot(false);
                setShowHunWord(false);
                setHungarianInputValue("");
                console.log(response.data);
            })
            .catch(error => {
                console.log("error:", error)
            })
    }

    const checkHungarianWord = () => {
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

    const showHungarianWord = () => {
        setShowHunWord(true);
    }

    const deleteWord = (id) => {
        axios.delete(`http://localhost:8080/delete-word/${id}`)
          .then(response => {
            let newList = [...allWords];
            newList = newList.filter((randomWord) => randomWord.id !== id);
            setAllWords(newList);
          })
          .catch(error => {
            console.error('error:', error);
          });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">   
            <div className="d-flex flex-column">
                <div>
                    <div>
                        <div className="english-word-container d-flex justify-content-center align-items-center shadow p-3 mb-3 rounded ">
                            {randomWord && (
                                <p className="fs-3 fw-normal">{randomWord.englishWord}</p>                            
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-lg mb-3 w-50 me-2"
                            onClick={randomEnglishWord}
                            >                   
                            Word
                        </button>
                        <button
                            type="button" 
                            className="btn btn-secondary btn-lg mb-3 w-50"
                            onClick={showHungarianWord}
                            >
                            Show
                        </button>
                    </div>
                    <div className="show-word-container d-flex justify-content-center align-items-center shadow p-3 mb-3 rounded">
                        {
                            showHunWord ? <p className="fs-3">{randomWord.hungarianWord}</p> : null
                        }
                    </div>
                    <div class="input-group mb-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        value={hungarianInputValue}
                        placeholder="" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange={(e) => setHungarianInputValue(e.target.value)}
                        />
                    </div>
                    <div className="check-container d-flex justify-content-between">
                        <div className="d-flex">
                            <div className="me-4">
                                <button
                                type="button" 
                                className="btn btn-warning btn-lg"
                                onClick={checkHungarianWord}
                                >
                                    Check 
                                </button>
                            </div>
                            <div>
                                {showCorrectOrNot && <p className="fs-3">
                                    {hungarianWordCorrect ? <i className="bi bi-hand-thumbs-up"></i>
                                        : <i className="bi bi-hand-thumbs-down"></i>}</p>}
                            </div>
                        </div>     
                        <div>
                            <button 
                            className="btn btn-danger btn-lg"
                            onClick={() => deleteWord(randomWord.id)}
                            >
                                Delete Word
                            </button>
                        </div>
                    </div>
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
                        className="btn btn-success btn-lg new-word-button"
                        onClick={createWord}
                        >
                        New word
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyEnglishWords;
