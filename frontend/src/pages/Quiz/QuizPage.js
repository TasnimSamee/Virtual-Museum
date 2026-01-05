import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function QuizPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({}); // Map of questionIndex -> selectedOption
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
            setQuiz(data);
            setLoading(false);
        } catch (err) {
            alert("Failed to load quiz");
            navigate("/quizzes");
        }
    };

    const handleOptionSelect = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    };

    const handleSubmit = async () => {
        // Ensure all questions answered
        if (Object.keys(answers).length !== quiz.questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            // Prepare payload: convert object map to array of answers ordered by index
            const answersArray = quiz.questions.map((_, index) => answers[index]);

            const config = userInfo ? {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            } : {};

            const { data } = await axios.post(
                `http://localhost:5000/api/quizzes/${id}/submit`,
                { answers: answersArray },
                config
            );
            setResult(data);
        } catch (err) {
            alert("Failed to submit quiz");
        }
    };

    if (loading) return <div style={styles.loading}>Loading Quiz...</div>;
    if (!quiz) return null;

    if (result) {
        return (
            <div style={styles.container}>
                <h2 style={styles.title}>Quiz Results</h2>
                <div style={styles.scoreCard}>
                    <p style={styles.scoreText}>You scored</p>
                    <h1 style={styles.score}>{result.score} / {result.total}</h1>
                    <button onClick={() => navigate("/quizzes")} style={styles.button}>Back to Quizzes</button>
                </div>

                <div style={styles.resultList}>
                    {result.results.map((res, index) => (
                        <div key={index} style={{
                            ...styles.resultItem,
                            borderLeft: res.isCorrect ? "5px solid #00b894" : "5px solid #d63031"
                        }}>
                            <p style={styles.questionText}><strong>Q{index + 1}:</strong> {res.question}</p>
                            <p style={{ color: res.isCorrect ? "#00b894" : "#d63031" }}>
                                Your Answer: {res.userAnswer} ({res.isCorrect ? "Correct" : "Incorrect"})
                            </p>
                            {!res.isCorrect && <p style={{ color: "#aaa" }}>Correct Answer: {res.correctAnswer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{quiz.title}</h2>
            <p style={styles.subtitle}>{quiz.description}</p>

            <div style={styles.questions}>
                {quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} style={styles.questionCard}>
                        <h4 style={styles.questionText}>{qIndex + 1}. {q.question}</h4>
                        <div style={styles.options}>
                            {q.options.map((option, oIndex) => (
                                <div
                                    key={oIndex}
                                    onClick={() => handleOptionSelect(qIndex, option)}
                                    style={{
                                        ...styles.option,
                                        background: answers[qIndex] === option ? "gold" : "#333",
                                        color: answers[qIndex] === option ? "black" : "white",
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.footer}>
                <button onClick={handleSubmit} style={styles.submitButton}>Submit Quiz</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        color: "#f5f5f5",
        fontFamily: "'Inter', sans-serif",
    },
    loading: { textAlign: "center", marginTop: "50px", color: "#aaa" },
    title: {
        textAlign: "center",
        color: "gold",
        fontSize: "2rem",
        marginBottom: "10px",
    },
    subtitle: {
        textAlign: "center",
        color: "#ccc",
        marginBottom: "30px",
    },
    questions: {
        display: "flex",
        flexDirection: "column",
        gap: "30px",
    },
    questionCard: {
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "8px",
    },
    questionText: {
        marginBottom: "15px",
        fontSize: "1.1rem",
    },
    options: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    option: {
        padding: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    footer: {
        marginTop: "40px",
        textAlign: "center",
    },
    submitButton: {
        padding: "12px 40px",
        background: "#00b894",
        color: "white",
        border: "none",
        borderRadius: "30px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        cursor: "pointer",
    },
    scoreCard: {
        textAlign: "center",
        marginBottom: "40px",
        background: "#1e1e1e",
        padding: "30px",
        borderRadius: "12px",
    },
    scoreText: { fontSize: "1.2rem", color: "#aaa" },
    score: { fontSize: "4rem", margin: "10px 0", color: "gold" },
    button: {
        padding: "10px 20px",
        background: "#333",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    resultList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    resultItem: {
        background: "#1a1a1a",
        padding: "20px",
        borderRadius: "8px",
    },
};

export default QuizPage;
