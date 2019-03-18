const setQuiz = document.getElementById('quizInfo');
const resultsContainer = document.getElementById('quizResults');
const submitButton = document.getElementById('submit');
let quesObj, x, i
let collection = []

// document.getElementById('#startPage').innerHTML = "Lets Get Started"

// layout the quiz
const quesDB = () => {
    fetch(`https://opentdb.com/api.php?amount=5&category=29&difficulty=medium`)
        .then(r => r.json())
        .then(r => {
            // object for question sets from API
            // initialize the question object
            quesObj = r.results
            // Create an array of objects to store questions and answers
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
            // loop through the array created for the questions
            collection.forEach(
                (curQues, quesNum) => {
                    // we'll want to store the list of answer choices
                    const answers = [];
                    // loop through the answers
                    for (val in curQues.answer) {

                        // create a radio button for each answer
                        answers.push(
                            `<li>
                            <input type="radio" name="question${quesNum}" value="${val}">
                            ${curQues.answer[val]}
                        </li>`
                        );
                    }

                    // sort the answers so the user doesnt find the pattern 
                    answers.sort(function () { return 0.5 - Math.random() })

                    // add the question and answers to the output
                    output.push(
                        `<div class="question"> ${curQues.question} </div>
                        <div class="answers"> ${answers.join('')} </div>`
                    );
                }
            );
            // combine the question and answer divs 
            setQuiz.innerHTML = output.join('');

        })
        .catch(e => {
            console.error(e);
        })
}

// show the quiz
quesDB()

function dispResults() {

    // gather answer containers from our quiz
    const answerContainers = setQuiz.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    collection.forEach(
        (currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = 'input[name=question' + questionNumber + ']:checked';
            const userAnswer = collection[questionNumber].answer[(answerContainer.querySelector(selector) || {}).value];

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
            }
        });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${collection.length} correct`;
    // stop the timer when the function is run
    time = 0
    document.querySelector('#display').textContent = compTime()
    clearInterval(myTimer)
}

// set time to 60 seconds. +1 makes it an even number
let time = 61
let isRun = false
let myTimer

// function to display calculate the timer. 
const compTime = _ => {
    let minutes = Math.floor( time / 60)
    let seconds = time % 60
    minutes = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes.toString()[0]}${minutes.toString()[1]}`
    seconds = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds.toString()[0]}${seconds.toString()[1]}`
    return `${minutes}:${seconds}`
}
// function to start the count down timer. 
const starter = _ => {
    if (!isRun) {
        isRun = true
        myTimer = setInterval(() => {
            time--
            document.querySelector('#display').textContent = compTime()
            if (time < 0) {
                time = 0
                document.querySelector('#display').textContent = compTime()
                clearInterval(myTimer)
                dispResults()
            }
        }, 1000)
    }
}

starter()

submitButton.addEventListener('click', dispResults);