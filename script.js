const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;

const questions = [
    {
        section: "Les Bases Cellulaires de la Vie",
        question: "Quelle est la principale différence entre les cellules unicellulaires et pluricellulaires?",
        answers: [
            { text: 'Le nombre de noyaux', correct: false },
            { text: 'La quantité d\'ADN', correct: false },
            { text: 'Le nombre de cellules', correct: true },
            { text: 'Le type de membrane cellulaire', correct: false }
        ],
    },
    {
        section: "Les Bases Cellulaires de la Vie",
        question: "Combien de chromosomes sont présents dans le caryotype humain?",
        answers: [
            { text: '23', correct: false },
            { text: '46', correct: true },
            { text: '92', correct: false },
            { text: '44', correct: false }
        ],
    },
    {
        section: "Fonctions Vitales des Cellules",
        question: "Quelle est la principale molécule énergétique des cellules?",
        answers: [
            { text: 'ADN', correct: false },
            { text: 'ATP', correct: true },
            { text: 'Glucose', correct: false },
            { text: 'Amino Acide', correct: false }
        ],
    },
    {
        section: "Nutrition",
        question: "Quel processus permet aux plantes de convertir la matière minérale en matière organique?",
        answers: [
            { text: 'Respiration', correct: false },
            { text: 'Photosynthèse', correct: true },
            { text: 'Digestion', correct: false },
            { text: 'Osmose', correct: false }
        ],
    },
    {
        section: "Organisation Spécifique",
        question: "Comment s'appelle un ensemble de cellules similaires qui exécutent une fonction spécifique?",
        answers: [
            { text: 'Organe', correct: false },
            { text: 'Tissu', correct: true },
            { text: 'Système', correct: false },
            { text: 'Organite', correct: false }
        ],
    },
    {
        section: "Zoom sur les Cellules Animales et Végétales",
        question: "Qu'est-ce qu'un organite?",
        answers: [
            { text: 'Une cellule spécialisée', correct: false },
            { text: 'Une structure à l\'intérieur des cellules avec une fonction spécifique', correct: true },
            { text: 'Un type de cellule unicellulaire', correct: false },
            { text: 'Un tissu végétal', correct: false }
        ],
    },
    {
        section: "Tissus Végétaux",
        question: "Où a principalement lieu la photosynthèse dans les feuilles des plantes?",
        answers: [
            { text: 'Épiderme', correct: false },
            { text: 'Mésophylle', correct: true },
            { text: 'Fibres', correct: false },
            { text: 'Cortex', correct: false }
        ],
    },
    {
        section: "Cellules Spécialisées",
        question: "Quelle est la fonction principale des globules rouges?",
        answers: [
            { text: 'Transporter le dioxyde de carbone', correct: false },
            { text: 'Transporter l\'oxygène', correct: true },
            { text: 'Produire des anticorps', correct: false },
            { text: 'Protéger contre les infections', correct: false }
        ],
    },
];

startQuiz();

function startQuiz() {
    questionContainerElement.classList.remove('hide');
    nextButton.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
