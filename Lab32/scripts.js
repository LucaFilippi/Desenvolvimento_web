const questions = [
    {
        question: "1. Quando o palmeiras ganhou seu primeiro titulo oficial?",
        answers: ["1914", "1918", "1916", "1900", "1920"],
        correctAnswer: 4
    },
    {
        question: "2. Qantos titulos nacionais o Palmeiras tem?",
        answers: ["2", "15", "18", "12", "4"],
        correctAnswer: 2
    },
    {
        question: "3. Quantas vezes o Palmeiras foi campeão do Brasileirão na era dos pontos corridos",
        answers: ["1","12","4","6","10"],
        correctAnswer: 2
    },
    {
        question: "4. Em que ano o Palmeiras ganhou o titulo mundial?",
        answers: ["1951", "1914", "2021", "1999","1920"],
        correctAnswer: 0
    },
    {
        question: "5. Quem foi o heroi do gol da Libertadores de 2021?",
        answers: ["Breno Lopes", "Deyverson", "Weverton", "Raphael Veiga", "Marcos Assunção"],
        correctAnswer: 1
    },
    {
        question: "6. Quem foram os dois herois da copa do Brasil de 2015?",
        answers: [
            "Weverton e Marcos",
            "Djalma e Endrick",
            "Borja e Valdivia",
            "Fernando Prass e Raphael Veiga", 
            "Dudu e Fernando Prass",],
        correctAnswer: 4
    },
    {
        question: "7. Qual o nome da principal torcida organizada do Palmeiras?",
        answers: [
            "Mancha Verde",
            "Torcida do Palmeiras",
            "Palmeiras minha Vida",
            "Sou Palmeiras sim senhor", 
            "AVANTI PALESTRA",],
        correctAnswer: 4
    }
];

// Carrega perguntas na página
function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${q.question}</h3>`;
        q.answers.forEach((answer, i) => {
            div.innerHTML += `<label>
                <input type="radio" name="question${index}" value="${i}"> ${answer}
            </label><br>`;
        });
        questionContainer.appendChild(div);
    });
}

// Avalia as respostas fornecidas pelo usuário
function submitAnswers() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++;
        }
    });
    let message = '';
    if (score === questions.length) {
        message = 'Boaa, isso sim é palmeirense de verdade! AVANTI 🐷';
    } else if (score >= questions.length / 2) {
        message = 'Acertou mais da metade, da pra melhorar! AVANTI 🐷';
    } else if(score <= 0){
        message = 'Errou tudo? Só pode ser corinthiano. 🔪🦨';
    }
    else {
        message = 'Não acertou nem metade... certeza que é palmeirense?';
    }
    document.getElementById('result').innerHTML = `Você acertou ${score} de ${questions.length} perguntas. ${message}`;
    
}
window.onload = loadQuestions;
