const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./src/models/Quiz");

dotenv.config();

const quizzes = [
    {
        title: "Masterpieces of the Renaissance",
        description: "Test your knowledge on the most famous era of art history.",
        questions: [
            {
                question: "Who painted the Mona Lisa?",
                options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
                correctAnswer: "Leonardo da Vinci",
            },
            {
                question: "Which artist sculpted David?",
                options: ["Donatello", "Bernini", "Michelangelo", "Rodin"],
                correctAnswer: "Michelangelo",
            },
            {
                question: "The 'Creation of Adam' is located in which building?",
                options: ["St. Peter's Basilica", "The Louvre", "Sistine Chapel", "Uffizi Gallery"],
                correctAnswer: "Sistine Chapel",
            }
        ],
    },
    {
        title: "Modern Art Movements",
        description: "Do you know your Impressionism from your Surrealism?",
        questions: [
            {
                question: "Who is known for painting 'The Starry Night'?",
                options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dalí"],
                correctAnswer: "Vincent van Gogh",
            },
            {
                question: "Salvador Dalí is associated with which art movement?",
                options: ["Cubism", "Surrealism", "Impressionism", "Abstract Expressionism"],
                correctAnswer: "Surrealism",
            },
            {
                question: "Who co-founded Cubism along with Georges Braque?",
                options: ["Henri Matisse", "Pablo Picasso", "Paul Cézanne", "Juan Gris"],
                correctAnswer: "Pablo Picasso",
            }
        ],
    },
];

const seedQuizzes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/virtual-museum");
        console.log("MongoDB Connected for Seeding");

        await Quiz.deleteMany();
        console.log("Existing quizzes cleared");

        await Quiz.insertMany(quizzes);
        console.log("Sample quizzes seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding quizzes:", error);
        process.exit(1);
    }
};

seedQuizzes();
