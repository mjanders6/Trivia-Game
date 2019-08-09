const setQuiz = document.getElementById('quizInfo');
const resCont = document.getElementById('quizResults');
const submitButton = document.getElementById('submit');

let quesObj, x, i
let quizDB = []
// set time to 60 seconds. +1 makes it an even number
let time = 61
let isRun = false
let myTimer

// layout the quiz
const quesDB = () => {
    fetch(`https://opentdb.com/api.php?amount=5&category=29&difficulty=medium`)
        .then(r => r.json())
        .then(r => {
            // object for question sets from API
            quesObj = r.results
            // Create an array of objects to store questions and answers
            for (let x = 0; x < quesObj.length; x++) {
                quizDB[x] = new Object()
                quizDB[x].answer = new Object()
                quizDB[x].question = quesObj[x].question
                for (let i = 0; i < quesObj[x].incorrect_answers.length; i++) {
                    quizDB[x].answer[i] = quesObj[x].incorrect_answers[i]
                }
                quizDB[x].answer[quesObj[x].incorrect_answers.length] = quesObj[x].correct_answer
                quizDB[x].correctAnswer = quesObj[x].correct_answer
            }
            const output = [];
            quizDB.forEach(
                (curQues, quesNum) => {
                    const answers = [];
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

const dispResults = () => {
    // gather answer from our quiz
    const gatherAnswers = setQuiz.querySelectorAll('.answers');
    console.log(gatherAnswers)
    let numCorrect = 0;

    quizDB.forEach(
        (currQues, quesNum) => {
            // find selected answer
            const answerContainer = gatherAnswers[quesNum];
            const selector = 'input[name=question' + quesNum + ']:checked';
            const userAnswer = quizDB[quesNum].answer[(answerContainer.querySelector(selector) || {}).value];
            // if answer is correct
            if (userAnswer === currQues.correctAnswer) {
                numCorrect++;
            }
        });
    // show number of correct answers out of total
    resCont.innerHTML = `You got ${numCorrect} out of ${quizDB.length} correct`;
    // stop the timer when the function is run
    time = 0
    document.querySelector('#display').textContent = compTime()
    clearInterval(myTimer)
}
// function to display timer. 
const compTime = _ => {
    let minutes = Math.floor(time / 60)
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
submitButton.addEventListener('click', dispResults)
