import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/quizzes");
            setQuizzes(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading Quizzes...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Museum Quizzes</h2>
            <p style={styles.subtitle}>Test your knowledge about our artifacts!</p>

            {/* Admin Button */}
            {(function () {
                const userInfo = localStorage.getItem("userInfo");
                const user = userInfo ? JSON.parse(userInfo) : null;
                return user && user.role === 'admin' ? (
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Link to="/quiz/create" style={styles.createButton}>+ Create New Quiz</Link>
                    </div>
                ) : null;
            })()}

            <div style={styles.grid}>
                {quizzes.map((quiz) => (
                    <div key={quiz._id} style={styles.card}>
                        <h3 style={styles.cardTitle}>{quiz.title}</h3>
                        <p style={styles.cardDesc}>{quiz.description}</p>
                        <p style={styles.qCount}>{quiz.questions.length} Questions</p>
                        <Link to={`/quiz/${quiz._id}`} style={styles.button}>
                            Start Quiz
                        </Link>
                    </div>
                ))}
            </div>

            {quizzes.length === 0 && (
                <div style={styles.empty}>No quizzes available at the moment.</div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
        color: "#f5f5f5",
        fontFamily: "'Inter', sans-serif",
    },
    title: {
        textAlign: "center",
        fontSize: "2.5rem",
        color: "gold",
        marginBottom: "10px",
    },
    subtitle: {
        textAlign: "center",
        color: "#aaa",
        marginBottom: "40px",
    },
    loading: { textAlign: "center", marginTop: "50px", color: "#aaa" },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
    },
    card: {
        background: "#1e1e1e",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "transform 0.2s",
    },
    cardTitle: {
        color: "#fff",
        margin: "0 0 10px 0",
    },
    cardDesc: {
        color: "#ccc",
        fontSize: "0.9rem",
        marginBottom: "15px",
        flex: 1,
    },
    qCount: {
        color: "#00b894",
        fontWeight: "bold",
        fontSize: "0.85rem",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 25px",
        background: "gold",
        color: "#222",
        textDecoration: "none",
        fontWeight: "bold",
        borderRadius: "25px",
        display: "inline-block",
    },
    empty: {
        textAlign: "center",
        color: "#666",
        marginTop: "50px",
    },
    createButton: {
        padding: "10px 20px",
        background: "#00b894",
        color: "white",
        fontWeight: "bold",
        textDecoration: "none",
        borderRadius: "8px",
        border: "none",
    },
};

export default QuizList;
