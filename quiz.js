document.addEventListener("DOMContentLoaded", () => {
  const myQuestions = [
    {
      question: "What is 10/2?",
      answers: {
        a: "3",
        b: "5",
        c: "115",
        d: "20",
      },
      correctAnswer: "b",
    },
    {
      question: "Which language runs in a web browser?",
      answers: {
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
      },
      correctAnswer: "d",
    },
    {
      question: "What does CSS stand for?",
      answers: {
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
      },
      correctAnswer: "b",
    },
    {
      question: "What does HTML stand for?",
      answers: {
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
      },
      correctAnswer: "a",
    },
    {
      question: "What year was JavaScript launched?",
      answers: {
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
      },
      correctAnswer: "b",
    },
  ];

  let currentSlide = 0;
  let numCorrect = 0;
  const scorePerQuestion = 10;
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const startButton = document.getElementById("start-quiz");
  const nextButton = document.getElementById("next");
  const restartButton = document.getElementById("restart");

  nextButton.style.display = "none";

  function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (const letter in currentQuestion.answers) {
        answers.push(
          `<label style="display: block; margin-top: 10px;">
              <input type="radio" name="question${questionNumber}" value="${letter}" onclick="activateNextButton('${letter}', '${currentQuestion.correctAnswer}', ${questionNumber})">
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }
      output.push(
        `<div class="slide" style="display: none;">
            <div class="question" style="margin-bottom: 32px; font-size: 32px; font-weight: 700">${
              currentQuestion.question
            }</div>
            <div class="answers" style="display: grid; grid-gap: 24px; margin-bottom: 32px; font-size: 24px;">${answers.join(
              ""
            )}</div>
          </div>`
      );
    });
    quizContainer.innerHTML = output.join("");
    showSlide(currentSlide);
  }

  window.activateNextButton = function (
    selectedAnswer,
    correctAnswer,
    questionNumber
  ) {
    if (selectedAnswer === correctAnswer) {
      numCorrect++;
    }

    nextButton.disabled = false;
    nextButton.classList.add("enabled");
    nextButton.style.display = "inline-block";
  };

  function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    slides[currentSlide].style.display = "none";
    currentSlide = n;
    slides[currentSlide].style.display = "block";

    nextButton.disabled = true;
    nextButton.classList.remove("enabled");
    if (currentSlide === slides.length - 1) {
      nextButton.textContent = "Show Results";
      nextButton.onclick = showResults;
    } else {
      nextButton.textContent = "Next Question";
      nextButton.onclick = showNextSlide;
    }
  }

  function showNextSlide() {
    if (currentSlide < myQuestions.length - 1) {
      showSlide(currentSlide + 1);
    } else {
      showResults();
    }
  }

  function showResults() {
    quizContainer.style.display = "none";
    nextButton.style.display = "none";
    resultsContainer.style.display = "flex";
    restartButton.style.display = "inline-block";

    const totalScore = numCorrect * scorePerQuestion;
    const totalPossibleScore = myQuestions.length * scorePerQuestion;

    resultsContainer.innerHTML = `Correct answers : ${numCorrect} out of ${
      myQuestions.length
    }  (${Math.round(
      (numCorrect / myQuestions.length) * 100
    )}%)<br>Total Score : ${totalScore} / ${totalPossibleScore}.`;
  }

  function startQuiz() {
    startButton.style.display = "none";
    nextButton.style.display = "inline-block";
    nextButton.disabled = true;
    nextButton.classList.remove("enabled");
    buildQuiz();
    showSlide(0);
  }

  function resetQuiz() {
    window.location.reload();
  }

  startButton.addEventListener("click", startQuiz);
  restartButton.addEventListener("click", resetQuiz);
});
