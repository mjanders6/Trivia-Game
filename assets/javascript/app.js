fetch(`https://opentdb.com/api.php?amount=10&category=20&difficulty=medium`)
    .then(r => r.json())
    .then(r => {
        console.log(r.results[0].question);
        
        r.results.forEach(ques => {
            let quesElem = document.createElement('h5')
            quesElem.textContent = ques.question
            document.querySelector('#quizInfo').append(quesElem)
        })
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
        console.log(r);

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
const quizBuilder = _ => {}

// show the results to the quiz
const dispResults = _ => {}

// add event listener to process the results
submitButton.addEventListener('click', dispResults)
