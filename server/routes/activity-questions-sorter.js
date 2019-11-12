import activityQuestions from './activity-questions.json';
import randomItem from 'random-item';

export const activityQuestionsSorter = ({
    isCorrect
}) => {
    let question = {};
    if (isCorrect) {
        question = randomItem(activityQuestions.nonDistractor);
    } else {
        question = randomItem(activityQuestions.distractor);
    }
    return question;
};