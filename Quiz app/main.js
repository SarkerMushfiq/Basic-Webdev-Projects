 const questions = [
            {
                question: "Which is largest animal in the world?",
                answers: [
                    { text: "Shark", correct: false },
                    { text: "Blue whale", correct: true },
                    { text: "Elephant", correct: false },
                    { text: "Giraffe", correct: false },
                ]
            },
            {
                question: "Which is the smallest continent in the world?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "Australia", correct: true },
                    { text: "Arctic", correct: false },
                    { text: "Africa", correct: false },
                ]
            },
            {
                question: "Which is largest desert in the world?",
                answers: [
                    { text: "Kalahari", correct: false },
                    { text: "Gobi", correct: false },
                    { text: "Sahara", correct: true },
                    { text: "Antarctica", correct: false },
                ]
            },
            {
                question: "Which is largest country in the world?",
                answers: [
                    { text: "Canada", correct: false },
                    { text: "China", correct: false },
                    { text: "Russia", correct: true },
                    { text: "India", correct: false },
                ]
            },
            {
                question: "Which is largest sea in the world?",
                answers: [
                    { text: "Pasific", correct: true },
                    { text: "Atlantic", correct: false },
                    { text: "Indian ocean", correct: false },
                    { text: "Dead sea", correct: false },
                ]
            },
            {
                question: "Which is king of animal in the world?",
                answers: [
                    { text: "Tiger", correct: false },
                    { text: "Bear", correct: false },
                    { text: "Elephant", correct: false },
                    { text: "Lion", correct: true },
                ]
            }
        ];

        const questionElement = document.getElementById("questions");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const timerElement = document.getElementById("time");
        const progressBar = document.getElementById("progress-bar");

        let currentQuestionIndex = 0;
        let score = 0;
        let timer;
        let timeLeft = 10;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
                answerButtons.appendChild(button);
            });

            startTimer();
            updateProgress();
        }

        function resetState() {
            clearInterval(timer);
            timeLeft = 10;
            timerElement.textContent = timeLeft;
            nextButton.style.display = "none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(e) {
            clearInterval(timer);
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
            }

            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
            });
            nextButton.style.display = "block";
        }

        function showScore() {
            resetState();
            questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
            progressBar.style.width = "100%";
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

       function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableAnswers();
            nextButton.style.display = "block";
        }
    }, 1000);
}

        function autoSelectAnswer() {
            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
            });
            nextButton.style.display = "block";
        }

        function updateProgress() {
            let progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                startQuiz();
            }
        });

        startQuiz();