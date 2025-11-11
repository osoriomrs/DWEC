const quizContainer = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");

let questions = [];
let current = 0;
let score = 0;
let userAnswers = [];

startBtn.addEventListener("click", () => {
  fetch("json/preguntas.json")
    .then(res => res.json())
    .then(data => {
      questions = data;
      current = 0;
      score = 0;
      userAnswers = [];
      renderQuestion();
    })
    .catch(() => {
      quizContainer.innerHTML = '<p class="text-danger">Error al cargar las preguntas.</p>';
    });
});

function renderQuestion() {
  const q = questions[current];
  quizContainer.innerHTML = `
    <h5>${q.text}</h5>
    <form id="options-form">
      ${q.options.map(opt => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="option" id="${opt.id}" value="${opt.id}" required>
          <label class="form-check-label" for="${opt.id}">${opt.text}</label>
        </div>
      `).join("")}
      <button type="submit" class="btn btn-primary mt-3">${current === questions.length -1 ? "Finalizar" : "Siguiente"}</button>
    </form>
  `;

  document.getElementById("options-form").addEventListener("submit", function(e){
    e.preventDefault();
    const selected = document.querySelector('input[name="option"]:checked').value;
    userAnswers.push({questionId: q.questionId, selected, correct: q.correctAnswer, explanation: q.explanation});
    if(selected === q.correctAnswer) score++;
    current++;
    if(current < questions.length) renderQuestion();
    else showResults();
  });
}

function showResults(){
  quizContainer.innerHTML = `
    <h5>Resultados</h5>
    <p>Puntuación: ${score} / ${questions.length}</p>
    ${userAnswers.map(a => a.selected === a.correct ? '' : `<p><strong>${a.questionId}:</strong> ${a.explanation}</p>`).join("")}
    <button id="restart-btn" class="btn btn-primary mt-3">Reiniciar Quiz</button>
  `;
  document.getElementById("restart-btn").addEventListener("click", () => location.reload());
}
