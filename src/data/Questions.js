
class Question {
    constructor(id, category, body){
        this.id = id
        this.category = category
        this.body = body
    }
}

let sQ1 = new Question(1, 'Childhood',  "How has your relationship with your parents shaped who you are?")
let sQ2 = new Question(2, 'Self-Care', 'What priority does self-care take in your life?')



const questionBank = [sQ1, sQ2];

export default questionBank