// layout the quiz
const quizBuilder = () => {
    fetch(`https://opentdb.com/api.php?amount=15&category=20&difficulty=medium`)
        .then(r => r.json())
        .then(r => {
            const setQuiz = document.getElementById('quizInfo');
            // initialize the array that will hold the question/answer group
            const quesGroup = []
            // object for question sets from API
            const quesObj = r.results

            // loop through the questions API
            quesObj.forEach(
                // curQues/value :quesNum/index
                (curQues, quesNum) => {
                    // initialize the answer.
                    let answers = []
                    // loop through the incorrect.answers array, store the input as an unordered list, as a radio button
                    for (val in curQues.incorrect_answers) {
                        answers.push(
                        `<li>
                            <input type="radio" name="question${quesNum}" value="${val}">
                            ${curQues.incorrect_answers[val]}
                        </li>`
                        )
                    }
                    // the API has the answer outside of the incorrect.answers array and needs to be pushed into the array
                    answers.push(
                        `<li>
                            <input type="radio" name="question${quesNum}" value="${parseInt(val) + 1}">
                            ${curQues.correct_answer}
                        </li>`
                    )
                    // sort the answers so the user doesnt find the pattern 
                    answers.sort(function () { return 0.5 - Math.random() })
                    
                    // group the questions and answers into an array
                    quesGroup.push(
                        `<div class="question"> ${curQues.question} </div>
                        <div class="answers"> ${answers.join('')} </div>`
                    );
                })
            // join the group and push it into the page
            setQuiz.innerHTML = quesGroup.join('');
            // r.results.forEach(ques => {
            //     let quesElem = document.createElement('h5')
            //     quesElem.textContent = ques.question
            //     document.querySelector('#quizInfo').append(quesElem)

            // })

        })
        .then(e => {
            console.log(e);
        })
}
// show the quiz
quizBuilder()

// Set the question data for the quiz
// const questionData = [
//     {
//         question: '',
//         answers: {
//             A: '',
//             B: '',
//             C: ''
//         },
//         correctAnswer: ''
//     },
//     {
//         question: '',
//         answers: {
//             A: '',
//             B: '',
//             C: ''
//         },
//         correctAnswer: ''
//     },
//     {
//         question: '',
//         answers: {
//             A: '',
//             B: '',
//             C: ''
//         },
//         correctAnswer: ''
//     },
//     {
//         question: '',
//         answers: {
//             A: '',
//             B: '',
//             C: ''
//         },
//         correctAnswer: ''
//     },
//     {
//         question: '',
//         answers: {
//             A: '',
//             B: '',
//             C: ''
//         },
//         correctAnswer: ''
//     }
// ]



// show the results to the quiz
const dispResults = _ => { }

// add event listener to process the results
submitButton.addEventListener('click', dispResults)
