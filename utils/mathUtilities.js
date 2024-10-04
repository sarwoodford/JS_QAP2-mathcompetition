/**
 * Gets a random math question
 * 
 * @returns {} The random math question
 */

// generates a random operator to use in questions
function getOperator(){
    const operators = ['-', '+', '*', '/'];
    const randomOperatorIndex = Math.floor(Math.random() * operators.length) // randomizes given operator

    return operators[randomOperatorIndex];
}
function getQuestion() {
    const num1 = Math.floor(Math.random() * 10 + 1); // generates a random number 1-10
    const num2 = Math.floor(Math.random() * 10 + 1); // generates a random 2nd number 1-10
    const operator = getOperator();

    return { num1, num2, operator, };
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 * 
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
    return false;
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}