const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
    test('should generate a question with 2 randomized numbers and a randomized operator', () => {
        const question = getQuestion();

        expect(typeof question.num1).toBe('number');
        expect(typeof question.num2).toBe('number');
        expect(['+', '-', '*', '/']).toContain(question.operator);
    })
});

describe("Tests for isCorrectAnswer", () => {
    test('should return true for a correct addition equation', () => {
        const question = { num1: 5, num2: 8, operator: '+'};
        const answer = 13;
        expect(isCorrectAnswer(question, answer)).toBe(true);
    })
    test('should return false for a wrong addition equation', () => {
        const question = {num1: 8, num2: 5, operator: '+'};
        const answer = 15;
        expect(isCorrectAnswer(question, answer)).toBe(false);
    })
    test('should return true for a correct subtraction equation', () => {
        const question = { num1: 9, num2: 3, operator: '-'};
        const answer = 6;
        expect(isCorrectAnswer(question, answer)).toBe(true);
    })
    test('should return false for a wrong subtraction equation', () => {
        const question = {num1: 10, num2: 2, operator: '-'};
        const answer = 7;
        expect(isCorrectAnswer(question, answer)).toBe(false);
    })
    test('should return true for a correct multiplication equation', () => {
        const question = { num1: 3, num2: 2, operator: '*'};
        const answer = 6;
        expect(isCorrectAnswer(question, answer)).toBe(true);
    })
    test('should return false for a wrong multiplication equation', () => {
        const question = {num1: 5, num2: 4, operator: '*'};
        const answer = 21;
        expect(isCorrectAnswer(question, answer)).toBe(false);
    })
    test('should return true for a correct division equation', () => {
        const question = { num1: 8, num2: 2, operator: '/'};
        const answer = 4;
        expect(isCorrectAnswer(question, answer)).toBe(true);
    })
    test('should return false for a wrong division equation', () => {
        const question = {num1: 6, num2: 3, operator: '/'};
        const answer = 1;
        expect(isCorrectAnswer(question, answer)).toBe(false);
    })
});