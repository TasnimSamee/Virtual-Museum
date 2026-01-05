const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./src/models/Quiz");

dotenv.config();

const newQuizzes = [
    {
        title: "Ancient Greek Mythology",
        description: "Test your knowledge on the gods and legends of Ancient Greece.",
        questions: [
            {
                question: "Who is the king of the Olympian gods?",
                options: ["Poseidon", "Hades", "Zeus", "Apollo"],
                correctAnswer: "Zeus",
            },
            {
                question: "Which goddess is associated with wisdom and war strategy?",
                options: ["Hera", "Athena", "Aphrodite", "Artemis"],
                correctAnswer: "Athena",
            },
            {
                question: "Who was the hero that performed twelve labors?",
                options: ["Achilles", "Perseus", "Hercules", "Odysseus"],
                correctAnswer: "Hercules",
            }
        ],
    },
    {
        title: "Impressionism Masters",
        description: "Focusing on the light and color of the 19th-century movement.",
        questions: [
            {
                question: "Who painted 'Impression, Sunrise', which gave the movement its name?",
                options: ["Edouard Manet", "Claude Monet", "Edgar Degas", "Pierre-Auguste Renoir"],
                correctAnswer: "Claude Monet",
            },
            {
                question: "Which Impressionist artist is famous for his paintings of ballet dancers?",
                options: ["Paul Cézanne", "Mary Cassatt", "Edgar Degas", "Camille Pissarro"],
                correctAnswer: "Edgar Degas",
            },
            {
                question: "What was a key characteristic of Impressionist painting?",
                options: ["Precise lines", "Dark shadows", "Short, thick brushstrokes", "Historical themes"],
                correctAnswer: "Short, thick brushstrokes",
            }
        ],
    },
    {
        title: "Sculptures Through the Ages",
        description: "From ancient figurines to modern abstracts.",
        questions: [
            {
                question: "Which ancient civilization created the 'Terracotta Army'?",
                options: ["Egypt", "Greece", "China", "Rome"],
                correctAnswer: "China",
            },
            {
                question: "Who is the sculptor of 'The Thinker'?",
                options: ["Auguste Rodin", "Henry Moore", "Alberto Giacometti", "Constantin Brâncuși"],
                correctAnswer: "Auguste Rodin",
            },
            {
                question: "The 'Venus de Milo' is an ancient masterpiece from which period?",
                options: ["Hellenistic Greek", "Archaic Greek", "Roman Imperial", "Egyptian New Kingdom"],
                correctAnswer: "Hellenistic Greek",
            }
        ],
    },
    {
        title: "Asian Art Heritage",
        description: "Explore the rich artistic traditions of Asia.",
        questions: [
            {
                question: "The 'Great Wave off Kanagawa' is a famous print from which country?",
                options: ["China", "Korea", "Japan", "Vietnam"],
                correctAnswer: "Japan",
            },
            {
                question: "Which color is traditionally prominent in Chinese imperial art and architecture?",
                options: ["Blue", "Yellow", "Red", "Green"],
                correctAnswer: "Yellow",
            },
            {
                question: "What is 'Ink wash painting' also known as in Japan?",
                options: ["Ukiyo-e", "Sumi-e", "Ikebana", "Origami"],
                correctAnswer: "Sumi-e",
            }
        ],
    },
    {
        title: "Prehistoric Cave Art",
        description: "Journey back to the earliest known expressions of human creativity.",
        questions: [
            {
                question: "In which country is the famous Lascaux Cave located?",
                options: ["Spain", "France", "Germany", "Italy"],
                correctAnswer: "France",
            },
            {
                question: "What was a common subject in prehistoric cave paintings?",
                options: ["Landscapes", "Buildings", "Animals", "People drinking tea"],
                correctAnswer: "Animals",
            },
            {
                question: "What material was typically used as a pigment in cave art?",
                options: ["Acrylic paint", "Ochre", "Oil paint", "Watercolors"],
                correctAnswer: "Ochre",
            }
        ],
    },
];

const seedMoreQuizzes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/virtual-museum");
        console.log("MongoDB Connected for Seeding More Quizzes");

        await Quiz.insertMany(newQuizzes);
        console.log("5 additional quizzes seeded successfully");

        process.exit();
    } catch (error) {
        console.error("Error seeding more quizzes:", error);
        process.exit(1);
    }
};

seedMoreQuizzes();
