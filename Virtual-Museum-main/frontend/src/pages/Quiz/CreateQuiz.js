import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        { question: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;

        // If the option being edited was the correct answer, update it? 
        // Ideally we store index of correct answer or value. Storing value for simplicity with backend model.
        // But if value changes, correct answer might mismatch. simpler to re-select or just bind to text.
        // For this implementation, we'll ask user to select correct answer from dropdown which updates dynamically.
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (questions.some(q => !q.question || q.options.some(o => !o) || !q.correctAnswer)) {
            alert("Please fill in all fields and select a correct answer for each question.");
            return;
        }

        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                "http://localhost:5000/api/quizzes",
                { title, description, questions },
                config
            );
            alert("Quiz Created Successfully!");
            navigate("/quizzes");
        } catch (err) {
            alert("Failed to create quiz");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create New Quiz</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.section}>
                    <label style={styles.label}>Quiz Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                        placeholder="e.g., Art History 101"
                    />

                    <label style={styles.label}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.textarea}
                        placeholder="Short description of the quiz..."
                    />
                </div>

                <h3 style={styles.subTitle}>Questions</h3>
                {questions.map((q, qIndex) => (
                    <div key={qIndex} style={styles.questionBlock}>
                        <div style={styles.qHeader}>
                            <h4 style={{ margin: 0, color: "gold" }}>Question {qIndex + 1}</h4>
                            {questions.length > 1 && (
                                <button type="button" onClick={() => removeQuestion(qIndex)} style={styles.removeButton}>X</button>
                            )}
                        </div>

                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            placeholder="Question Text"
                            style={styles.input}
                            required
                        />

                        <div style={styles.optionsGrid}>
                            {q.options.map((option, oIndex) => (
                                <input
                                    key={oIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    placeholder={`Option ${oIndex + 1}`}
                                    style={styles.input}
                                    required
                                />
                            ))}
                        </div>

                        <label style={styles.label}>Correct Answer:</label>
                        <select
                            value={q.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Correct Answer</option>
                            {q.options.map((opt, i) => (
                                opt && <option key={i} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <button type="button" onClick={addQuestion} style={styles.addButton}>+ Add Question</button>

                <div style={styles.footer}>
                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {loading ? "Creating..." : "Create Quiz"}
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        background: "#1e1e1e",
        borderRadius: "12px",
        color: "#f5f5f5",
        fontFamily: "'Inter', sans-serif",
    },
    title: { textAlign: "center", color: "gold", marginBottom: "30px" },
    subTitle: { color: "#fff", borderBottom: "1px solid #333", paddingBottom: "10px", marginTop: "30px" },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    section: { display: "flex", flexDirection: "column", gap: "15px" },
    label: { fontWeight: "bold", fontSize: "0.9rem", color: "#ccc", marginTop: "10px" },
    input: {
        padding: "10px",
        background: "#2c2c2c",
        border: "1px solid #444",
        borderRadius: "4px",
        color: "white",
        width: "100%",
        boxSizing: "border-box",
    },
    textarea: {
        padding: "10px",
        background: "#2c2c2c",
        border: "1px solid #444",
        borderRadius: "4px",
        color: "white",
        width: "100%",
        resize: "vertical",
        boxSizing: "border-box",
    },
    questionBlock: {
        background: "#252525",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    qHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
    removeButton: { background: "red", color: "white", border: "none", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer", fontWeight: "bold" },
    optionsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
    select: {
        padding: "10px",
        background: "#333",
        border: "1px solid #444",
        borderRadius: "4px",
        color: "white",
        width: "100%",
    },
    addButton: {
        padding: "10px",
        background: "#333",
        color: "gold",
        border: "1px dashed gold",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "10px",
    },
    footer: { marginTop: "30px", textAlign: "center" },
    submitButton: {
        padding: "12px 40px",
        background: "#00b894",
        color: "white",
        border: "none",
        borderRadius: "30px",
        fontSize: "1.1rem",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default CreateQuiz;
