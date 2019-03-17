const setQuiz = document.getElementById('quizInfo');
const resultsContainer = document.getElementById('quizResults');
const submitButton = document.getElementById('submit');
let quesObj, x, i
let collection = []


// layout the quiz
const quesDB = () => {
    fetch(`https://opentdb.com/api.php?amount=5&category=29&difficulty=medium`)
        .then(r => r.json())
        .then(r => {
            // object for question sets from API
            // initialize the question object
            quesObj = r.results

            for (let x = 0; x < quesObj.length; x++) {
                collection[x] = new Object()
                collection[x].answer = new Object()
                collection[x].question = quesObj[x].question
                for (let i = 0; i < quesObj[x].incorrect_answers.length; i++) {
                    collection[x].answer[i] = quesObj[x].incorrect_answers[i]
                }
                collection[x].answer[quesObj[x].incorrect_answers.length] = quesObj[x].correct_answer
                collection[x].correctAnswer = quesObj[x].correct_answer
            }

            // we'll need a place to store the HTML output
            const output = [];
            // for each question...
            collection.forEach(
                (curQues, quesNum) => {

                    // we'll want to store the list of answer choices
                    const answers = [];

                    // and for each available answer...
                    for (letter in curQues.answer) {

                        // ...add an HTML radio button
                        answers.push(
                        `<li>
                            <input type="radio" name="question${quesNum}" value="${letter}">
                            ${curQues.answer[letter]}
                        </li>`
                        );
                    }

                    // add this question and its answers to the output
                    output.push(
                        `<div class="question"> ${curQues.question} </div>
                        <div class="answers"> ${answers.join('')} </div>`
                    );
                }
            );
            // finally combine our output list into one string of HTML and put it on the page
            setQuiz.innerHTML = output.join('');

        })
        .catch(e => {
            console.error(e);
        })
}

// show the quiz
quesDB()



// add event listener to process the results
document.addEventListener('click', e => {
    console.log(e.path);
    // console.log(e.path[1].innerText);

})

// submitButton.addEventListener('click', showResults);