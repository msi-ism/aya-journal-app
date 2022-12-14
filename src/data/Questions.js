
class Question {
    constructor(id, category, body){
        this.id = id
        this.category = category
        this.body = body
    }
}

let sQ1 = new Question(1, 'Childhood',  "How has your relationship with your parents shaped who you are?")
let sQ2 = new Question(2, 'Self-Care', 'What priority does self-care take in your life?')
let sQ3 = new Question(3, 'Self-Inquiry', 'What am I willing to suffer for?')
let sQ4 = new Question(4, 'Self-Inquiry', 'Do you think that you are beautiful? Why or why not.')
let sQ5 = new Question(5, 'Self-Discovery', "What's your biggest dream?")
let sQ6 = new Question(6, 'Self-Honesty', "What's something you wish others knew about you?")
let sQ7 = new Question(7, 'Fear', "What are you most afraid of?")



const questionBank = [sQ1, sQ2, sQ3, sQ4, sQ5, sQ6, sQ7];

export default questionBank