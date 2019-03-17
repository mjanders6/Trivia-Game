// fetch(`https://opentdb.com/api_category.php`)
fetch(`https://opentdb.com/api.php?amount=15&category=20&difficulty=medium`)
    .then(r => r.json())
    .then(r => {
        const quizContainer = document.getElementById('quizInfo');
        // initialize the array that will hold the question/answer group
        const quesGroup = []
        // object for question sets from API
        const quesObj = r.results
        console.log(quesObj);

        // loop through the questions API
        quesObj.forEach(
            // curQues/value :quesNum/index
            (curQues, quesNum) => {
                // initialize the answer. the API has the answer outside of the answers array and needs to be pushed into the array
                let answers = []
                // loop through the 
                for (val in curQues.incorrect_answers) {
                    answers.push(
                        `<li>
                        <input type="radio" name="question${quesNum}" value="${val}">
                        ${curQues.incorrect_answers[val]}
                    </li>`
                    )
                }
                answers.push(
                    `<li>
                        <input type="radio" name="question${quesNum}" value="${parseInt(val) + 1}">
                        ${curQues.correct_answer}
                    </li>`
                )

                answers.sort(function() { return 0.5 - Math.random() })

                quesGroup.push(
                    `<div class="question"> ${curQues.question} </div>
                    <div class="answers"> ${answers.join('')} </div>`
                );
            })

        quizContainer.innerHTML = quesGroup.join('');
        // r.results.forEach(ques => {
        //     let quesElem = document.createElement('h5')
        //     quesElem.textContent = ques.question
        //     document.querySelector('#quizInfo').append(quesElem)

        // })
        // category: "Mythology"
        // correct_answer: "Participating in cannibalism."
        // difficulty: "medium"
        // incorrect_answers: Array(3)
        // 0: "Excessive mutilation of animal corpses."
        // 1: "Performing a ritual involving murder."
        // 2: "Drinking the blood of many slain animals."
        // length: 3
        // __proto__: Array(0)
        // question: "According to Algonquian folklore, how does one transform into a Wendigo?"
        // type: "multiple"

    })
    .then(e => {
        console.log(e);

    })

// Set the question data for the quiz
const questionData = [
    {
        question: '',
        answers: {
            A: '',
            B: '',
            C: ''
        },
        correctAnswer: ''
    },
    {
        question: '',
        answers: {
            A: '',
            B: '',
            C: ''
        },
        correctAnswer: ''
    },
    {
        question: '',
        answers: {
            A: '',
            B: '',
            C: ''
        },
        correctAnswer: ''
    },
    {
        question: '',
        answers: {
            A: '',
            B: '',
            C: ''
        },
        correctAnswer: ''
    },
    {
        question: '',
        answers: {
            A: '',
            B: '',
            C: ''
        },
        correctAnswer: ''
    }
]

// layout the quiz
const quizBuilder = _ => { }

// show the results to the quiz
const dispResults = _ => { }

// add event listener to process the results
submitButton.addEventListener('click', dispResults)
