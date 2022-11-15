import questionBank from "../data/Questions";

const questions = questionBank

const QuestionSelector = ({setQuestion}) => {
    let questionOption = document.querySelector('.question-selector')
    
    const onChange = () => {
        let output = questionOption.value
        setQuestion(output)
        console.log(output)
    }

    return (
        <div>
            <select className='question-selector' name="question" id="question" onChange={onChange}>
                {questions.map((question, id) =>
                    <option className='question-option' id={id} value={question.body} >{question.body}</option>
                )}
            </select>

        </div>
    );
}

export default QuestionSelector;
