const setQuiz = document.getElementById('quizInfo');
const resultsContainer = document.getElementById('quizResults');
const submitButton = document.getElementById('submit');
let quesObj, x, i
let collection = []


// layout the quiz
const quesDB = _ => {
    fetch(`https://opentdb.com/api.php?amount=5&category=29&difficulty=medium`)
        .then(r => r.json())
        .then(r => {
            // object for question sets from API
            // initialize the question object
            quesObj = r.results
            console.log(quesObj);

            for (let x = 0; x < quesObj.length; x++) {
                collection[x] = new Object()
                collection[x].question = quesObj[x].question
                collection[x].answer = new Object()
                for (let i = 0; i < quesObj[x].incorrect_answers.length; i++) {
                    collection[x].answer[i] = quesObj[x].incorrect_answers[i]
                }
                collection[x].answer[quesObj[x].incorrect_answers.length] = quesObj[x].correct_answer
                collection[x].correctAnswer = quesObj[x].correct_answer
            }

        })
        .then(e => {
            console.log(e);
        })
}
// show the quiz
// quizBuilder()



// add event listener to process the results
// document.addEventListener('click', e => {
//     console.log(e.path);
//     console.log(e.path[1].innerText);

// })

// submitButton.addEventListener('click', showResults);